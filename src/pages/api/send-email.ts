import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

// Email templates by language
const emailTemplates = {
  'en': {
    subject: (name: string) => `New contact message - ${name}`,
    autoReplySubject: 'Thank you for your contact - WB Digital Solutions',
    mainEmailHtml: (name: string, email: string, message: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">New Contact Message</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Language: English 🇬🇧</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Name:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Message:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Sent through WB Digital Solutions website</p>
          </div>
        </div>
      </div>
    `,
    autoReplyHtml: (name: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Thank you for your contact!</h2>
          <p style="color: #333; line-height: 1.6;">Hello ${name},</p>
          <p style="color: #333; line-height: 1.6;">We have received your message and will get back to you soon.</p>
          <p style="color: #333; line-height: 1.6;">Best regards,<br>WB Digital Solutions Team</p>
        </div>
      </div>
    `
  },
  'pt-BR': {
    subject: (name: string) => `Nova mensagem de contato - ${name}`,
    autoReplySubject: 'Obrigado pelo seu contato - WB Digital Solutions',
    mainEmailHtml: (name: string, email: string, message: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nova Mensagem de Contato</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Idioma: Português 🇧🇷</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Nome:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Mensagem:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Enviado através do site WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    autoReplyHtml: (name: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Obrigado pelo seu contato!</h2>
          <p style="color: #333; line-height: 1.6;">Olá ${name},</p>
          <p style="color: #333; line-height: 1.6;">Recebemos sua mensagem e entraremos em contato em breve.</p>
          <p style="color: #333; line-height: 1.6;">Atenciosamente,<br>Equipe WB Digital Solutions</p>
        </div>
      </div>
    `
  },
  'es': {
    subject: (name: string) => `Nuevo mensaje de contacto - ${name}`,
    autoReplySubject: 'Gracias por su contacto - WB Digital Solutions',
    mainEmailHtml: (name: string, email: string, message: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Idioma: Español 🇪🇸</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Nombre:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Correo:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Mensaje:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Enviado a través del sitio web de WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    autoReplyHtml: (name: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">¡Gracias por su contacto!</h2>
          <p style="color: #333; line-height: 1.6;">Hola ${name},</p>
          <p style="color: #333; line-height: 1.6;">Hemos recibido su mensaje y nos pondremos en contacto pronto.</p>
          <p style="color: #333; line-height: 1.6;">Saludos cordiales,<br>Equipo WB Digital Solutions</p>
        </div>
      </div>
    `
  },
  'it': {
    subject: (name: string) => `Nuovo messaggio di contatto - ${name}`,
    autoReplySubject: 'Grazie per il suo contatto - WB Digital Solutions',
    mainEmailHtml: (name: string, email: string, message: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nuovo Messaggio di Contatto</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Lingua: Italiano 🇮🇹</p>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Nome:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #792990; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; margin: 5px 0;"><strong>Messaggio:</strong></p>
            <p style="color: #333; margin: 5px 0 15px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">Inviato tramite il sito web di WB Digital Solutions</p>
          </div>
        </div>
      </div>
    `,
    autoReplyHtml: (name: string) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #792990;">Grazie per il suo contatto!</h2>
          <p style="color: #333; line-height: 1.6;">Ciao ${name},</p>
          <p style="color: #333; line-height: 1.6;">Abbiamo ricevuto il suo messaggio e la contatteremo presto.</p>
          <p style="color: #333; line-height: 1.6;">Cordiali saluti,<br>Team WB Digital Solutions</p>
        </div>
      </div>
    `
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message, language = 'pt-BR' } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Get templates for the current language (fallback to pt-BR)
  const templates = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates['pt-BR'];

  try {
    // Create transporter directly in the API route
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: templates.subject(name),
      html: templates.mainEmailHtml(name, email, message),
      text: `
        ${language === 'en' ? 'New Contact Message' : 
          language === 'es' ? 'Nuevo Mensaje de Contacto' :
          language === 'it' ? 'Nuovo Messaggio di Contatto' :
          'Nova Mensagem de Contato'}
        
        ${language === 'en' ? 'Language' : 
          language === 'es' ? 'Idioma' :
          language === 'it' ? 'Lingua' :
          'Idioma'}: ${language}
        
        ${language === 'en' ? 'Name' : 
          language === 'es' ? 'Nombre' :
          language === 'it' ? 'Nome' :
          'Nome'}: ${name}
        Email: ${email}
        
        ${language === 'en' ? 'Message' : 
          language === 'es' ? 'Mensaje' :
          language === 'it' ? 'Messaggio' :
          'Mensagem'}:
        ${message}
        
        ---
        ${language === 'en' ? 'Sent through WB Digital Solutions website' :
          language === 'es' ? 'Enviado a través del sitio web de WB Digital Solutions' :
          language === 'it' ? 'Inviato tramite il sito web di WB Digital Solutions' :
          'Enviado através do site WB Digital Solutions'}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully (${language}):`, info.messageId);
    
    // Send auto-reply to the sender
    // Note: Using a Gmail address as sender to avoid SPF/DKIM issues
    const autoReplyOptions = {
      from: `"WB Digital Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL,
      subject: templates.autoReplySubject,
      html: templates.autoReplyHtml(name),
      text: `
        ${language === 'en' ? 'Thank you for your contact!' :
          language === 'es' ? '¡Gracias por su contacto!' :
          language === 'it' ? 'Grazie per il suo contatto!' :
          'Obrigado pelo seu contato!'}
        
        ${language === 'en' ? `Hello ${name},` :
          language === 'es' ? `Hola ${name},` :
          language === 'it' ? `Ciao ${name},` :
          `Olá ${name},`}
        
        ${language === 'en' ? 'We have received your message and will get back to you soon.' :
          language === 'es' ? 'Hemos recibido su mensaje y nos pondremos en contacto pronto.' :
          language === 'it' ? 'Abbiamo ricevuto il suo messaggio e la contatteremo presto.' :
          'Recebemos sua mensagem e entraremos em contato em breve.'}
        
        ${language === 'en' ? 'Best regards,' :
          language === 'es' ? 'Saludos cordiales,' :
          language === 'it' ? 'Cordiali saluti,' :
          'Atenciosamente,'}
        ${language === 'en' ? 'WB Digital Solutions Team' :
          language === 'es' ? 'Equipo WB Digital Solutions' :
          language === 'it' ? 'Team WB Digital Solutions' :
          'Equipe WB Digital Solutions'}
      `,
    };
    
    // Only send auto-reply to non-Yahoo addresses to avoid SPF/DKIM issues
    // Yahoo, Hotmail and some providers are strict about authentication
    const problematicDomains = ['yahoo.com', 'yahoo.com.br', 'hotmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const isProblematicDomain = problematicDomains.some(domain => emailDomain?.includes(domain));
    
    if (!isProblematicDomain) {
      try {
        await transporter.sendMail(autoReplyOptions);
        console.log(`Auto-reply sent successfully (${language})`);
      } catch (autoReplyError: any) {
        // Don't fail the main request if auto-reply fails
        console.error('Auto-reply failed (non-critical):', autoReplyError.message);
      }
    } else {
      console.log(`Skipping auto-reply for problematic domain (${emailDomain}) - Language: ${language}`);
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // More detailed error message
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check Gmail credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check internet connection.';
    } else if (error.response) {
      errorMessage = `Gmail error: ${error.response}`;
    }
    
    return res.status(500).json({ 
      success: false, 
      message: errorMessage
    });
  }
}