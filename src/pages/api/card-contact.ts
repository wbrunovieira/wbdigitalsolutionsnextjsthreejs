import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { passesBotGuard } from '@/lib/formGuard';
import { destEmail, setCors } from '@/lib/cardContact/cors';
import { resolveLang } from '@/lib/cardContact/lang';
import { buildVCard } from '@/lib/cardContact/vcard';
import { adminNotificationHtml, thankYouHtml, thankYouText } from '@/lib/cardContact/emails';
import { cardThankYou } from '@/content/cardThankYou';

/**
 * Contact-exchange webhook for the digital business card (card.wbdigitalsolutions.com).
 *
 * The card has no email service of its own. It POSTs the visitor's contact here
 * and this endpoint emails it to Bruno using the site's existing Gmail/nodemailer
 * setup — so we avoid Resend's one-domain-per-free-account limit.
 *
 * Security: CORS locked to the card origin, optional shared token, honeypot,
 * timing check and a random-string heuristic.
 */

type Data = { success: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Spam heuristic: an all-caps run with no spaces is a bot, not a name.
const looksRandom = (str: string) =>
  str.length > 8 && /^[A-Z]{6,}/.test(str) && !/\s/.test(str);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limit per IP (defense-in-depth against spam relay / email amplification).
  const rl = rateLimit(`card-contact:${getClientIp(req)}`);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfterSeconds));
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  // Optional shared secret: enforced only when CARD_SHARE_TOKEN is configured.
  const expectedToken = process.env.CARD_SHARE_TOKEN;
  if (expectedToken && req.headers['x-card-token'] !== expectedToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Honeypot + non-omittable timing gate (shared with send-email/newsletter).
  // Fake success so bots learn nothing. The card client sends _hp + a numeric _t.
  if (!passesBotGuard(req.body ?? {})) {
    return res.status(200).json({ success: true, message: 'OK' });
  }

  const { name, phone, email, company, note, language } = req.body ?? {};
  const lang = resolveLang(language, req.headers['accept-language']);

  if (!name || (!email && !phone)) {
    return res
      .status(400)
      .json({ success: false, message: 'Informe ao menos nome e (email ou telefone).' });
  }

  if (looksRandom(name) || (note && looksRandom(note))) {
    return res.status(200).json({ success: true, message: 'OK' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });

    // vCard of the visitor, attached so Bruno saves the contact in one tap.
    const vcard = buildVCard({ name, phone, email, company, note });
    const safeName = String(name).replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'contato';

    await transporter.sendMail({
      from: `"Cartão Digital WB" <${process.env.GMAIL_USER}>`,
      to: destEmail(),
      replyTo: email || undefined,
      subject: `Novo contato do cartão digital - ${name}`,
      html: adminNotificationHtml({ name, phone, email, company, note }),
      text: `Novo contato do cartão digital\n\nNome: ${name}\nTelefone: ${phone || '-'}\nEmail: ${email || '-'}\nEmpresa: ${company || '-'}\nNota: ${note || '-'}\n\nContato anexado (.vcf) para salvar no celular.\n\n— card.wbdigitalsolutions.com`,
      attachments: [
        {
          filename: `${safeName}.vcf`,
          content: vcard,
          contentType: 'text/vcard; charset=utf-8',
        },
      ],
    });

    // Auto thank-you to the visitor, in their language — only with a valid email.
    if (email && EMAIL_RE.test(String(email))) {
      await transporter.sendMail({
        from: `"Bruno Vieira — WB Digital Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: cardThankYou[lang].subject,
        html: thankYouHtml(lang, name),
        text: thankYouText(lang, name),
      });
    }

    return res.status(200).json({ success: true, message: 'Contato enviado com sucesso!' });
  } catch (err) {
    console.error('card-contact error:', err);
    return res.status(500).json({ success: false, message: 'Falha ao enviar. Tente novamente.' });
  }
}
