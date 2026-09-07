import nodemailer from 'nodemailer';
import { escapeHtml } from '@/lib/escapeHtml';
import { emailTemplates, emailTextLabels, NewsletterLang } from '@/content/newsletterEmails';

// These providers routinely bounce or spam-bin the auto-reply, so we skip it for them.
const PROBLEMATIC_DOMAINS = ['yahoo.com', 'yahoo.com.br', 'hotmail.com', 'outlook.com'];

interface Subscription {
  email: string;
  name: string;
  company: string;
  /** Template language (always one we have copy for). */
  lang: NewsletterLang;
  /** What the visitor's browser actually asked for, reported as-is to the team. */
  requestedLang: string;
}

/**
 * Notifies the team of a new subscription and (when the provider tolerates it)
 * sends the subscriber a welcome auto-reply. A failed auto-reply is logged but
 * never fails the subscription.
 */
export const sendNewsletterEmails = async ({ email, name, company, lang, requestedLang }: Subscription) => {
  const templates = emailTemplates[lang];
  const labels = emailTextLabels[lang];

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const adminMailOptions = {
    from: `"Newsletter Subscription" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    subject: templates.subject,
    // Escape user input before it enters the notification HTML (name/company/email
    // are otherwise interpolated raw).
    html: templates.mainEmailHtml(escapeHtml(email), escapeHtml(name), escapeHtml(company)),
    text: `
        ${labels.adminTitle}

        ${labels.languageLabel}: ${requestedLang}

        Email: ${email}

        ${labels.dateLabel}: ${new Date().toLocaleString()}

        ---
        ${labels.adminFooter}
      `,
  };

  await transporter.sendMail(adminMailOptions);

  const emailDomain = email.split('@')[1]?.toLowerCase();
  if (PROBLEMATIC_DOMAINS.some((domain) => emailDomain?.includes(domain))) return;

  try {
    await transporter.sendMail({
      from: `"WB Digital Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL,
      subject: templates.autoReplySubject,
      html: templates.autoReplyHtml(email),
      text: `
        ${labels.welcomeTitle}

        ${labels.thanks}

        ${labels.regards}
        ${labels.team}
      `,
    });
  } catch (autoReplyError) {
    // Don't fail the main request if auto-reply fails.
    console.error(
      'Newsletter auto-reply failed (non-critical):',
      autoReplyError instanceof Error ? autoReplyError.message : autoReplyError,
    );
  }
};
