// Auto thank-you email sent to the visitor (only with a valid email).
export type CardLang = 'pt-BR' | 'en' | 'es' | 'it';

export interface CardThankYou {
  subject: string;
  greeting: (n: string) => string;
  body: string;
  cta: string;
  signoff: string;
}

/** Auto thank-you copy sent to whoever leaves their contact on the digital card. */
export const cardThankYou: Record<CardLang, CardThankYou> = {
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
