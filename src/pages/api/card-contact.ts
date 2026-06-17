import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

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
  rev: string
) {
  const parts = String(name).trim().split(/\s+/);
  const given = parts[0] || '';
  const family = parts.slice(1).join(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vesc(family)};${vesc(given)};;;`,
    `FN:${vesc(name)}`,
  ];
  if (company) lines.push(`ORG:${vesc(company)}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${vesc(phone)}`);
  if (email) lines.push(`EMAIL;TYPE=WORK:${vesc(email)}`);
  if (note) lines.push(`NOTE:${vesc(note)}`);
  lines.push('SOURCE:card.wbdigitalsolutions.com');
  lines.push(`REV:${rev}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Optional shared secret: enforced only when CARD_SHARE_TOKEN is configured.
  const expectedToken = process.env.CARD_SHARE_TOKEN;
  if (expectedToken && req.headers['x-card-token'] !== expectedToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { name, phone, email, company, note, _hp, _t } = req.body ?? {};

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
    const vcard = buildVCard({ name, phone, email, company, note }, new Date().toISOString());
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

    return res.status(200).json({ success: true, message: 'Contato enviado com sucesso!' });
  } catch (err) {
    console.error('card-contact error:', err);
    return res.status(500).json({ success: false, message: 'Falha ao enviar. Tente novamente.' });
  }
}
