import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getContactEmails } from '@/lib/contactEmail';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// Matches the validation used in newsletter.ts / card-contact.ts.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Data = {
  success: boolean;
  message: string;
};

const SUPPORTED = ['en', 'pt-BR', 'es', 'it'];

const header = (req: NextApiRequest, name: string): string | undefined => {
  const v = req.headers[name];
  return Array.isArray(v) ? v[0] : v;
};

// The client attribution is untrusted input: clip strings, cap the journey, and
// coerce dwell to sane numbers. HTML escaping happens in the email builder.
function sanitizeAttribution(a: unknown, req: NextApiRequest) {
  const geo = {
    city: (() => {
      try {
        return decodeURIComponent(header(req, 'x-vercel-ip-city') || '') || undefined;
      } catch {
        return undefined;
      }
    })(),
    region: header(req, 'x-vercel-ip-country-region') || undefined,
    country: header(req, 'x-vercel-ip-country') || undefined,
  };
  const clip = (v: unknown, n = 200) => (typeof v === 'string' ? v.slice(0, n) : undefined);
  if (!a || typeof a !== 'object') return { firstTouch: null, journey: [], geo, consented: false };
  const src = a as Record<string, unknown>;
  const ft = src.firstTouch && typeof src.firstTouch === 'object' ? (src.firstTouch as Record<string, unknown>) : null;
  const utm = ft && ft.utm && typeof ft.utm === 'object' ? (ft.utm as Record<string, string>) : {};
  const journey = Array.isArray(src.journey)
    ? src.journey.slice(0, 30).map((h) => {
        const hop = (h ?? {}) as Record<string, unknown>;
        return { p: clip(hop.p, 120) || '', s: Math.max(0, Math.min(86400, Number(hop.s) || 0)) };
      })
    : [];
  return {
    firstTouch: ft ? { referrer: clip(ft.referrer), landing: clip(ft.landing, 120), utm } : null,
    journey,
    currentPage: clip(src.currentPage, 120),
    device: clip(src.device, 20),
    consented: !!src.consented,
    geo,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limit per IP (defense-in-depth against spam relay / email amplification).
  const rl = rateLimit(`send-email:${getClientIp(req)}`);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfterSeconds));
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  const { name, email, message, language: rawLang = 'pt-BR', _hp, _t, attribution } = req.body;
  const language = SUPPORTED.includes(rawLang) ? rawLang : 'pt-BR';

  // Honeypot: bots fill this hidden field
  if (_hp) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  // Timing: reject if form was submitted in under 3 seconds (bot behavior)
  if (_t && typeof _t === 'number' && Date.now() - _t < 3000) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Validate email format (mirrors newsletter.ts / card-contact.ts).
  if (!EMAIL_RE.test(String(email))) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Reject obviously random/bot-generated content (all uppercase random strings)
  const looksRandom = (str: string) => str.length > 8 && /^[A-Z]{6,}/.test(str) && !/\s/.test(str);
  if (looksRandom(name) || looksRandom(message)) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  const mail = getContactEmails(language, {
    name,
    email,
    message,
    attribution: sanitizeAttribution(attribution, req),
  });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Internal notification to the team
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: mail.subject,
      html: mail.mainHtml,
      text: mail.mainText,
    });

    // Auto-reply to the visitor (skip strict providers to avoid SPF/DKIM bounces)
    const problematicDomains = ['yahoo.com', 'yahoo.com.br', 'hotmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const isProblematicDomain = problematicDomains.some((d) => emailDomain?.includes(d));

    if (!isProblematicDomain) {
      try {
        await transporter.sendMail({
          from: `"WB Digital Solutions" <${process.env.GMAIL_USER}>`,
          to: email,
          replyTo: process.env.CONTACT_EMAIL,
          subject: mail.autoReplySubject,
          html: mail.autoReplyHtml,
          text: mail.autoReplyText,
        });
      } catch (autoReplyError) {
        // Don't fail the main request if the auto-reply fails
        console.error(
          'Auto-reply failed (non-critical):',
          autoReplyError instanceof Error ? autoReplyError.message : autoReplyError,
        );
      }
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    // Log the full error (incl. any SMTP response) server-side only; never
    // surface mail-infrastructure detail to the client.
    console.error('Error sending email:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send email, please try again later.' });
  }
}
