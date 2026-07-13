import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

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

// Comma-separated allowlist read at request time, e.g.
// "https://card.wbdigitalsolutions.com,http://localhost:3000,https://card-x.vercel.app"
function allowedOrigins(): string[] {
  return (process.env.CARD_ORIGIN || 'https://card.wbdigitalsolutions.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function destEmail(): string {
  return process.env.CARD_CONTACT_EMAIL || 'bruno@wbdigitalsolutions.com';
}

function setCors(req: NextApiRequest, res: NextApiResponse) {
  // Access-Control-Allow-Origin can't be a list — echo the request origin when
  // it's allowed, otherwise fall back to the canonical card origin.
  const list = allowedOrigins();
  const origin = req.headers.origin;
  const allow = origin && list.includes(origin) ? origin : list[0];
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-card-token');
  res.setHeader('Vary', 'Origin');
}

const looksRandom = (str: string) =>
  str.length > 8 && /^[A-Z]{6,}/.test(str) && !/\s/.test(str);

const esc = (s: string) =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));

// Escape a value for a vCard field (RFC 6350): backslash, newline, comma, semicolon.
const vesc = (s: string) =>
  String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

// Build a vCard (.vcf) for the visitor so Bruno can save the contact in one tap.
function buildVCard(
  { name, phone, email, company, note }: { name: string; phone?: string; email?: string; company?: string; note?: string },
) {
  const parts = String(name).trim().split(/\s+/);
  const given = parts[0] || '';
  const family = parts.slice(1).join(' ');
  // Mirror the card's known-working bruno.vcf: FN before N, TYPE=WORK email, no REV.
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${vesc(name)}`,
    `N:${vesc(family)};${vesc(given)};;;`,
  ];
  if (company) lines.push(`ORG:${vesc(company)}`);
  if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${vesc(phone)}`);
  if (email) lines.push(`EMAIL;TYPE=WORK:${vesc(email)}`);
  if (note) lines.push(`NOTE:${vesc(note)}`);
  lines.push('URL:https://card.wbdigitalsolutions.com');
  lines.push('END:VCARD');
  return lines.join('\r\n') + '\r\n';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CARD_URL = 'https://card.wbdigitalsolutions.com';

type Lang = 'pt-BR' | 'en' | 'es' | 'it';

// Resolve the visitor's language: explicit form `language` wins, then the
// browser's Accept-Language, then English.
function resolveLang(bodyLang: unknown, acceptLanguage?: string): Lang {
  const norm = (v: string): Lang | null => {
    const s = v.toLowerCase();
    if (s.startsWith('pt')) return 'pt-BR';
    if (s.startsWith('es')) return 'es';
    if (s.startsWith('it')) return 'it';
    if (s.startsWith('en')) return 'en';
    return null;
  };
  if (typeof bodyLang === 'string') {
    const m = norm(bodyLang);
    if (m) return m;
  }
  if (acceptLanguage) {
    const first = acceptLanguage.split(',')[0]?.split(';')[0]?.trim();
    if (first) {
      const m = norm(first);
      if (m) return m;
    }
  }
  return 'en';
}

// Auto thank-you email sent to the visitor (only with a valid email).
const THANKYOU: Record<
  Lang,
  { subject: string; greeting: (n: string) => string; body: string; cta: string; signoff: string }
> = {
  'pt-BR': {
    subject: 'Que bom te conhecer! 🙌',
    greeting: (n) => `Oi ${n}! 👋`,
    body: 'Muito obrigado por deixar seu contato — já está comigo! 🙌<br><br>Pra facilitar a nossa conexão, no meu cartão digital estão <strong>todos os meus contatos</strong>, com um botão <strong>Salvar contato</strong> que adiciona o meu direto no seu celular:',
    cta: 'Ver meu cartão · Salvar contato',
    signoff: 'Um abraço,<br><strong>Bruno Vieira</strong><br>WB Digital Solutions',
  },
  en: {
    subject: 'Great to connect! 🙌',
    greeting: (n) => `Hi ${n}! 👋`,
    body: 'Thanks so much for leaving your contact — I’ve got it! 🙌<br><br>To make connecting easy, my digital card has <strong>all my contacts</strong>, with a <strong>Save contact</strong> button that adds me straight to your phone:',
    cta: 'Open my card · Save contact',
    signoff: 'Cheers,<br><strong>Bruno Vieira</strong><br>WB Digital Solutions',
  },
  es: {
    subject: '¡Un gusto conocerte! 🙌',
    greeting: (n) => `¡Hola ${n}! 👋`,
    body: '¡Muchas gracias por dejar tu contacto — ya lo tengo! 🙌<br><br>Para facilitar nuestra conexión, en mi tarjeta digital están <strong>todos mis contactos</strong>, con un botón <strong>Guardar contacto</strong> que me añade directo a tu celular:',
    cta: 'Ver mi tarjeta · Guardar contacto',
    signoff: 'Un abrazo,<br><strong>Bruno Vieira</strong><br>WB Digital Solutions',
  },
  it: {
    subject: 'Che piacere conoscerti! 🙌',
    greeting: (n) => `Ciao ${n}! 👋`,
    body: 'Grazie mille per aver lasciato il tuo contatto — ce l’ho! 🙌<br><br>Per semplificare il collegamento, sul mio biglietto digitale trovi <strong>tutti i miei contatti</strong>, con un pulsante <strong>Salva contatto</strong> che mi aggiunge direttamente sul tuo telefono:',
    cta: 'Apri il biglietto · Salva contatto',
    signoff: 'Un caro saluto,<br><strong>Bruno Vieira</strong><br>WB Digital Solutions',
  },
};

function thankYouHtml(lang: Lang, name: string): string {
  const t = THANKYOU[lang];
  return `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
      <div style="background:linear-gradient(135deg,#350545,#792990);padding:26px 30px;">
        <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:.5px;">WB Digital Solutions</h1>
      </div>
      <div style="padding:30px;">
        <p style="color:#333;font-size:16px;margin:0 0 14px;">${t.greeting(esc(name))}</p>
        <p style="color:#444;line-height:1.6;margin:0;">${t.body}</p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${CARD_URL}" style="display:inline-block;background-color:#350545;color:#ffb947 !important;font-weight:bold;font-size:15px;text-decoration:none;padding:15px 30px;border-radius:999px;border:2px solid #ffb947;">${t.cta}</a>
        </div>
        <p style="color:#444;line-height:1.6;margin:0;">${t.signoff}</p>
      </div>
      <div style="background:#1a0526;padding:16px 30px;text-align:center;">
        <a href="${CARD_URL}" style="color:#aaa6c3;font-size:12px;text-decoration:none;">card.wbdigitalsolutions.com</a>
      </div>
    </div>
  </div>`;
}

function thankYouText(lang: Lang, name: string): string {
  const t = THANKYOU[lang];
  const strip = (s: string) => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');
  return `${t.greeting(name)}\n\n${strip(t.body)}\n\n${CARD_URL}\n\n${strip(t.signoff)}`;
}

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

  const { name, phone, email, company, note, language, _hp, _t } = req.body ?? {};
  const lang = resolveLang(language, req.headers['accept-language']);

  // Honeypot — bots fill the hidden field. Pretend success.
  if (_hp) return res.status(200).json({ success: true, message: 'OK' });

  // Timing — submitted in under 3s = bot. Pretend success.
  if (_t && typeof _t === 'number' && Date.now() - _t < 3000) {
    return res.status(200).json({ success: true, message: 'OK' });
  }

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

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Novo contato do cartão digital</h2>
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Nome:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background:#f9f9f9; border-radius:5px;">${esc(name)}</p>
          </div>
          ${phone ? `<div style="margin: 20px 0;">
            <p style="color:#666;margin:5px 0;"><strong>Telefone:</strong></p>
            <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;"><a href="tel:${esc(phone)}" style="color:#792990;text-decoration:none;">${esc(phone)}</a></p>
          </div>` : ''}
          ${email ? `<div style="margin: 20px 0;">
            <p style="color:#666;margin:5px 0;"><strong>Email:</strong></p>
            <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;"><a href="mailto:${esc(email)}" style="color:#792990;text-decoration:none;">${esc(email)}</a></p>
          </div>` : ''}
          ${company ? `<div style="margin: 20px 0;">
            <p style="color:#666;margin:5px 0;"><strong>Empresa:</strong></p>
            <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;">${esc(company)}</p>
          </div>` : ''}
          ${note ? `<div style="margin: 20px 0;">
            <p style="color:#666;margin:5px 0;"><strong>Nota:</strong></p>
            <p style="color:#333;margin:5px 0 15px 0;padding:15px;background:#f9f9f9;border-radius:5px;white-space:pre-wrap;">${esc(note)}</p>
          </div>` : ''}
          <div style="margin: 20px 0; padding: 12px 15px; background:#f3eafa; border-radius:5px; text-align:center;">
            <p style="color:#792990; margin:0; font-size:13px;">📎 Contato anexado (.vcf) — abra o anexo no celular para salvar na agenda.</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Enviado pelo cartão digital — card.wbdigitalsolutions.com</p>
          </div>
        </div>
      </div>`;

    // vCard of the visitor, attached so Bruno saves the contact in one tap.
    const vcard = buildVCard({ name, phone, email, company, note });
    const safeName = String(name).replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'contato';

    await transporter.sendMail({
      from: `"Cartão Digital WB" <${process.env.GMAIL_USER}>`,
      to: destEmail(),
      replyTo: email || undefined,
      subject: `Novo contato do cartão digital - ${name}`,
      html,
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
        subject: THANKYOU[lang].subject,
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
