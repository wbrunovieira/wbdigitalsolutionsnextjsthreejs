import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

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
      subject: `Nova mensagem de contato - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Nova Mensagem de Contato</h2>
            
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
      text: `
        Nova Mensagem de Contato
        
        Nome: ${name}
        Email: ${email}
        
        Mensagem:
        ${message}
        
        ---
        Enviado através do site WB Digital Solutions
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    // Send auto-reply to the sender
    // Note: Using a Gmail address as sender to avoid SPF/DKIM issues
    const autoReplyOptions = {
      from: `"WB Digital Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL,
      subject: 'Obrigado pelo seu contato - WB Digital Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #792990;">Obrigado pelo seu contato!</h2>
            <p style="color: #333; line-height: 1.6;">Olá ${name},</p>
            <p style="color: #333; line-height: 1.6;">Recebemos sua mensagem e entraremos em contato em breve.</p>
            <p style="color: #333; line-height: 1.6;">Atenciosamente,<br>Equipe WB Digital Solutions</p>
          </div>
        </div>
      `,
      text: `
        Obrigado pelo seu contato!
        
        Olá ${name},
        
        Recebemos sua mensagem e entraremos em contato em breve.
        
        Atenciosamente,
        Equipe WB Digital Solutions
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
        console.log('Auto-reply sent successfully');
      } catch (autoReplyError: any) {
        // Don't fail the main request if auto-reply fails
        console.error('Auto-reply failed (non-critical):', autoReplyError.message);
      }
    } else {
      console.log('Skipping auto-reply for problematic domain:', emailDomain);
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