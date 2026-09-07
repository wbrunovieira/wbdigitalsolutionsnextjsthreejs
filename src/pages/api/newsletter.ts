import type { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { isTrustedOrigin } from '@/lib/originCheck';
import { passesBotGuard } from '@/lib/formGuard';
import { sendNewsletterEmails } from '@/lib/newsletterMailer';
import { emailTemplates, NewsletterLang } from '@/content/newsletterEmails';

type Data = {
  success: boolean;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Handles both "pt" and "pt-BR", and falls back to pt-BR for anything unknown. */
const toNewsletterLang = (language: string): NewsletterLang => {
  const key = language === 'pt' ? 'pt-BR' : language;
  return key in emailTemplates ? (key as NewsletterLang) : 'pt-BR';
};

const normalizeLanguage = (language: string) => (language === 'pt' ? 'pt-BR' : language);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Reject cross-site (CSRF) POSTs from non-allow-listed origins.
  if (!isTrustedOrigin(req)) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  // Rate limit per IP (defense-in-depth against spam relay / email amplification).
  const rl = rateLimit(`newsletter:${getClientIp(req)}`);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfterSeconds));
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  // Honeypot + non-omittable timing gate. Fake success so bots learn nothing.
  if (!passesBotGuard(req.body ?? {})) {
    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  }

  const { email, name = '', company = '', language = 'pt-BR' } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    await sendNewsletterEmails({
      email,
      name,
      company,
      lang: toNewsletterLang(language),
      requestedLang: normalizeLanguage(language),
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    // Log the full error (incl. any SMTP response) server-side only; never
    // surface mail-infrastructure detail to the client.
    console.error('Error processing newsletter subscription:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe, please try again later.',
    });
  }
}
