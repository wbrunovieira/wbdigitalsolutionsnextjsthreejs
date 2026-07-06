import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getContactEmails } from '@/lib/contactEmail';

type Data = {
  success: boolean;
  message: string;
};

// Nodemailer transport errors are Error instances extended with SMTP details.
type MailTransportError = Error & { code?: string; response?: string };

const isMailTransportError = (e: unknown): e is MailTransportError => e instanceof Error;

const SUPPORTED = ['en', 'pt-BR', 'es', 'it'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message, language: rawLang = 'pt-BR', _hp, _t } = req.body;
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

  // Reject obviously random/bot-generated content (all uppercase random strings)
  const looksRandom = (str: string) => str.length > 8 && /^[A-Z]{6,}/.test(str) && !/\s/.test(str);
  if (looksRandom(name) || looksRandom(message)) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  const mail = getContactEmails(language, { name, email, message });

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
    console.error('Error sending email:', error);
    let errorMessage = 'Failed to send email';
    if (isMailTransportError(error)) {
      if (error.code === 'EAUTH') {
        errorMessage = 'Authentication failed. Please check Gmail credentials.';
      } else if (error.code === 'ECONNECTION') {
        errorMessage = 'Connection failed. Please check internet connection.';
      } else if (error.response) {
        errorMessage = `Gmail error: ${error.response}`;
      }
    }
    return res.status(500).json({ success: false, message: errorMessage });
  }
}
