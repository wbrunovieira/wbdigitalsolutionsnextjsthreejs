// i18n content Records for the contact page. Pure data — exempt from the
// 200-line rule (extracted out of Contact.tsx during the #323 refactor).

export type CopyUi = { copy: string; copied: string };
export type SuccessUi = { title: string; body: string; backHome: string; sendAnother: string };
export type PrivacyNotice = { before: string; link: string; after: string };

export const CONTACT_DIRECT: Record<string, string> = {
  'pt-BR': 'Ou fale direto com a gente',
  en: 'Or reach us directly',
  es: 'O habla directamente con nosotros',
  it: 'Oppure contattaci direttamente',
};

export const PHONE_LABEL: Record<string, string> = {
  'pt-BR': 'Telefone',
  en: 'Phone',
  es: 'Teléfono',
  it: 'Telefono',
};

export const COPY_UI: Record<string, CopyUi> = {
  'pt-BR': { copy: 'Copiar', copied: 'Copiado!' },
  en: { copy: 'Copy', copied: 'Copied!' },
  es: { copy: 'Copiar', copied: '¡Copiado!' },
  it: { copy: 'Copia', copied: 'Copiato!' },
};

export const SUCCESS_UI: Record<string, SuccessUi> = {
  'pt-BR': { title: 'Mensagem enviada!', body: 'Obrigado pelo contato. Retornaremos para você em breve.', backHome: 'Voltar para a home', sendAnother: 'Enviar outra mensagem' },
  en: { title: 'Message sent!', body: "Thanks for reaching out. We'll get back to you soon.", backHome: 'Back to home', sendAnother: 'Send another message' },
  es: { title: '¡Mensaje enviado!', body: 'Gracias por contactarnos. Te responderemos muy pronto.', backHome: 'Volver al inicio', sendAnother: 'Enviar otro mensaje' },
  it: { title: 'Messaggio inviato!', body: 'Grazie per averci contattato. Ti risponderemo a breve.', backHome: 'Torna alla home', sendAnother: 'Invia un altro messaggio' },
};

// Consent/transparency note under the submit button: sending the form attaches
// lead-source attribution (origin, navigation, approximate location) to the
// message, so we point to the privacy policy at the point of collection.
export const PRIVACY_NOTICE: Record<string, PrivacyNotice> = {
  'pt-BR': { before: 'Ao enviar, você está ciente da nossa ', link: 'Política de Privacidade', after: '.' },
  en: { before: 'By submitting, you acknowledge our ', link: 'Privacy Policy', after: '.' },
  es: { before: 'Al enviar, reconoces nuestra ', link: 'Política de Privacidad', after: '.' },
  it: { before: 'Inviando, prendi atto della nostra ', link: 'Informativa sulla Privacy', after: '.' },
};
