export type NewsletterLang = 'en' | 'es' | 'it' | 'pt-BR';

export interface NewsletterTemplate {
  subject: string;
  autoReplySubject: string;
  mainEmailHtml: (email: string, name: string, company: string) => string;
  autoReplyHtml: (email: string) => string;
}

/** Localized HTML bodies for the newsletter notification and auto-reply. */
export const emailTemplates: Record<NewsletterLang, NewsletterTemplate> = {
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

export interface NewsletterTextLabels {
  adminTitle: string;
  languageLabel: string;
  dateLabel: string;
  adminFooter: string;
  welcomeTitle: string;
  thanks: string;
  regards: string;
  team: string;
}

/** Plain-text counterparts of the HTML bodies above. */
export const emailTextLabels: Record<NewsletterLang, NewsletterTextLabels> = {
  'en': {
    adminTitle: 'New Newsletter Subscription',
    languageLabel: 'Language',
    dateLabel: 'Date',
    adminFooter: 'Newsletter subscription from WB Digital Solutions website',
    welcomeTitle: 'Welcome to Our Newsletter!',
    thanks: 'Thank you for subscribing to the WB Digital Solutions newsletter!',
    regards: 'Best regards,',
    team: 'WB Digital Solutions Team',
  },
  'es': {
    adminTitle: 'Nueva Suscripción al Boletín',
    languageLabel: 'Idioma',
    dateLabel: 'Fecha',
    adminFooter: 'Suscripción al boletín desde el sitio web de WB Digital Solutions',
    welcomeTitle: '¡Bienvenido a Nuestro Boletín!',
    thanks: '¡Gracias por suscribirse al boletín de WB Digital Solutions!',
    regards: 'Saludos cordiales,',
    team: 'Equipo WB Digital Solutions',
  },
  'it': {
    adminTitle: 'Nuova Iscrizione alla Newsletter',
    languageLabel: 'Lingua',
    dateLabel: 'Data',
    adminFooter: 'Iscrizione alla newsletter dal sito web di WB Digital Solutions',
    welcomeTitle: 'Benvenuto alla Nostra Newsletter!',
    thanks: 'Grazie per esserti iscritto alla newsletter di WB Digital Solutions!',
    regards: 'Cordiali saluti,',
    team: 'Team WB Digital Solutions',
  },
  'pt-BR': {
    adminTitle: 'Nova Inscrição na Newsletter',
    languageLabel: 'Idioma',
    dateLabel: 'Data',
    adminFooter: 'Inscrição na newsletter através do site WB Digital Solutions',
    welcomeTitle: 'Bem-vindo à Nossa Newsletter!',
    thanks: 'Obrigado por se inscrever na newsletter da WB Digital Solutions!',
    regards: 'Atenciosamente,',
    team: 'Equipe WB Digital Solutions',
  },
};
