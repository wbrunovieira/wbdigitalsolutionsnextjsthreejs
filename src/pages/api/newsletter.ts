import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

type Data = {
  success: boolean;
  message: string;
};

// Email templates by language
const emailTemplates = {
  'en': {
    subject: 'New newsletter subscription',
    autoReplySubject: 'Welcome to WB Digital Solutions Newsletter',
    mainEmailHtml: (email: string, name: string, company: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">New Newsletter Subscription</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Language: English 🇬🇧</p>
          ${name ? `<div style="margin: 20px 0;"><p style="color: #666; margin: 5px 0;"><strong>Name:</strong></p><p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p></div>` : ''}
          ${company ? `<div style="margin: 20px 0;"><p style="color: #666; margin: 5px 0;"><strong>Company:</strong></p><p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${company}</p></div>` : ''}
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Date:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${new Date().toLocaleString('en-US')}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Newsletter subscription from WB Digital Solutions website</p>
          </div>
        </div>
      </div>
    `,
    // Underscore param: the signature must stay uniform across all locale
    // templates because the handler calls them generically.
    autoReplyHtml: (_email: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Welcome to Our Newsletter!</h2>
          <p style="color: #333; line-height: 1.6;">Hello,</p>
          <p style="color: #333; line-height: 1.6;">Thank you for subscribing to the WB Digital Solutions newsletter!</p>
          <p style="color: #333; line-height: 1.6;">You'll receive updates about:</p>
          <ul style="color: #333; line-height: 1.8;">
            <li>Latest technology trends</li>
            <li>Web development tips</li>
            <li>AI and automation insights</li>
            <li>Exclusive offers and promotions</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">Best regards,<br>WB Digital Solutions Team</p>
        </div>
      </div>
    `,
  },
  'pt-BR': {
    subject: 'Nova inscrição na newsletter',
    autoReplySubject: 'Bem-vindo à Newsletter da WB Digital Solutions',
    mainEmailHtml: (email: string, name: string, company: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nova Inscrição na Newsletter</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Idioma: Português 🇧🇷</p>
          ${name ? `<div style="margin: 20px 0;"><p style="color: #666; margin: 5px 0;"><strong>Nome:</strong></p><p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p></div>` : ''}
          ${company ? `<div style="margin: 20px 0;"><p style="color: #666; margin: 5px 0;"><strong>Empresa:</strong></p><p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${company}</p></div>` : ''}
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Data:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${new Date().toLocaleString('pt-BR')}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Inscrição na newsletter através do site WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    // Underscore param: the signature must stay uniform across all locale
    // templates because the handler calls them generically.
    autoReplyHtml: (_email: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Bem-vindo à Nossa Newsletter!</h2>
          <p style="color: #333; line-height: 1.6;">Olá,</p>
          <p style="color: #333; line-height: 1.6;">Obrigado por se inscrever na newsletter da WB Digital Solutions!</p>
          <p style="color: #333; line-height: 1.6;">Você receberá atualizações sobre:</p>
          <ul style="color: #333; line-height: 1.8;">
            <li>Últimas tendências em tecnologia</li>
            <li>Dicas de desenvolvimento web</li>
            <li>Insights sobre IA e automação</li>
            <li>Ofertas e promoções exclusivas</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">Atenciosamente,<br>Equipe WB Digital Solutions</p>
        </div>
      </div>
    `,
  },
  'es': {
    subject: 'Nueva suscripción al boletín',
    autoReplySubject: 'Bienvenido al Boletín de WB Digital Solutions',
    // Underscore params: uniform template signature; this locale's card does
    // not render name/company.
    mainEmailHtml: (email: string, _name: string, _company: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nueva Suscripción al Boletín</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Idioma: Español 🇪🇸</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Correo:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Fecha:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              ${new Date().toLocaleString('es-ES')}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Suscripción al boletín desde el sitio web de WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    // Underscore param: the signature must stay uniform across all locale
    // templates because the handler calls them generically.
    autoReplyHtml: (_email: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">¡Bienvenido a Nuestro Boletín!</h2>
          <p style="color: #333; line-height: 1.6;">Hola,</p>
          <p style="color: #333; line-height: 1.6;">¡Gracias por suscribirse al boletín de WB Digital Solutions!</p>
          <p style="color: #333; line-height: 1.6;">Recibirá actualizaciones sobre:</p>
          <ul style="color: #333; line-height: 1.8;">
            <li>Últimas tendencias tecnológicas</li>
            <li>Consejos de desarrollo web</li>
            <li>Perspectivas sobre IA y automatización</li>
            <li>Ofertas y promociones exclusivas</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">Saludos cordiales,<br>Equipo WB Digital Solutions</p>
        </div>
      </div>
    `,
  },
  'it': {
    subject: 'Nuova iscrizione alla newsletter',
    autoReplySubject: 'Benvenuto alla Newsletter di WB Digital Solutions',
    // Underscore params: uniform template signature; this locale's card does
    // not render name/company.
    mainEmailHtml: (email: string, _name: string, _company: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nuova Iscrizione alla Newsletter</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Lingua: Italiano 🇮🇹</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Data:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              ${new Date().toLocaleString('it-IT')}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Iscrizione alla newsletter dal sito web di WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    // Underscore param: the signature must stay uniform across all locale
    // templates because the handler calls them generically.
    autoReplyHtml: (_email: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Benvenuto alla Nostra Newsletter!</h2>
          <p style="color: #333; line-height: 1.6;">Ciao,</p>
          <p style="color: #333; line-height: 1.6;">Grazie per esserti iscritto alla newsletter di WB Digital Solutions!</p>
          <p style="color: #333; line-height: 1.6;">Riceverai aggiornamenti su:</p>
          <ul style="color: #333; line-height: 1.8;">
            <li>Ultime tendenze tecnologiche</li>
            <li>Consigli di sviluppo web</li>
            <li>Approfondimenti su IA e automazione</li>
            <li>Offerte e promozioni esclusive</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">Cordiali saluti,<br>Team WB Digital Solutions</p>
        </div>
      </div>
    `,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limit per IP (defense-in-depth against spam relay / email amplification).
  const rl = rateLimit(`newsletter:${getClientIp(req)}`);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfterSeconds));
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  const { email, name = '', company = '', language = 'pt-BR' } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format', 
    });
  }

  // Handle both "pt" and "pt-BR"
  const langKey = language === 'pt' ? 'pt-BR' : language;
  
  // Get templates for the current language (fallback to pt-BR)
  const templates = emailTemplates[langKey as keyof typeof emailTemplates] || emailTemplates['pt-BR'];

  try {
    // Create transporter directly in the API route
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: `"Newsletter Subscription" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      subject: templates.subject,
      html: templates.mainEmailHtml(email, name, company),
      text: `
        ${langKey === 'en' ? 'New Newsletter Subscription' : 
          langKey === 'es' ? 'Nueva Suscripción al Boletín' :
          langKey === 'it' ? 'Nuova Iscrizione alla Newsletter' :
          'Nova Inscrição na Newsletter'}
        
        ${langKey === 'en' ? 'Language' : 
          langKey === 'es' ? 'Idioma' :
          langKey === 'it' ? 'Lingua' :
          'Idioma'}: ${langKey}
        
        Email: ${email}
        
        ${langKey === 'en' ? 'Date' : 
          langKey === 'es' ? 'Fecha' :
          langKey === 'it' ? 'Data' :
          'Data'}: ${new Date().toLocaleString()}
        
        ---
        ${langKey === 'en' ? 'Newsletter subscription from WB Digital Solutions website' :
          langKey === 'es' ? 'Suscripción al boletín desde el sitio web de WB Digital Solutions' :
          langKey === 'it' ? 'Iscrizione alla newsletter dal sito web di WB Digital Solutions' :
          'Inscrição na newsletter através do site WB Digital Solutions'}
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Send auto-reply to the subscriber
    const autoReplyOptions = {
      from: `"WB Digital Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL,
      subject: templates.autoReplySubject,
      html: templates.autoReplyHtml(email),
      text: `
        ${langKey === 'en' ? 'Welcome to Our Newsletter!' :
          langKey === 'es' ? '¡Bienvenido a Nuestro Boletín!' :
          langKey === 'it' ? 'Benvenuto alla Nostra Newsletter!' :
          'Bem-vindo à Nossa Newsletter!'}
        
        ${langKey === 'en' ? 'Thank you for subscribing to the WB Digital Solutions newsletter!' :
          langKey === 'es' ? '¡Gracias por suscribirse al boletín de WB Digital Solutions!' :
          langKey === 'it' ? 'Grazie per esserti iscritto alla newsletter di WB Digital Solutions!' :
          'Obrigado por se inscrever na newsletter da WB Digital Solutions!'}
        
        ${langKey === 'en' ? 'Best regards,' :
          langKey === 'es' ? 'Saludos cordiales,' :
          langKey === 'it' ? 'Cordiali saluti,' :
          'Atenciosamente,'}
        ${langKey === 'en' ? 'WB Digital Solutions Team' :
          langKey === 'es' ? 'Equipo WB Digital Solutions' :
          langKey === 'it' ? 'Team WB Digital Solutions' :
          'Equipe WB Digital Solutions'}
      `,
    };
    
    // Check for problematic domains
    const problematicDomains = ['yahoo.com', 'yahoo.com.br', 'hotmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const isProblematicDomain = problematicDomains.some(domain => emailDomain?.includes(domain));
    
    if (!isProblematicDomain) {
      try {
        await transporter.sendMail(autoReplyOptions);
      } catch (autoReplyError) {
        // Don't fail the main request if auto-reply fails
        console.error(
          'Newsletter auto-reply failed (non-critical):',
          autoReplyError instanceof Error ? autoReplyError.message : autoReplyError,
        );
      }
    }

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