export interface NewsletterPageContent {
  badge: string;
  headline: string;
  headlineSub: string;
  description: string;
  namePlaceholder: string;
  companyPlaceholder: string;
  emailPlaceholder: string;
  cta: string;
  loading: string;
  successTitle: string;
  successMsg: string;
  errorMsg: string;
  privacy: string;
  policyLink: string;
  backHome: string;
  nameRequired: string;
  emailRequired: string;
}

/** Copy for the standalone /newsletter landing page. */
export const newsletterPageContent: Record<string, NewsletterPageContent> = {
  'pt-BR': {
    badge: 'Newsletter',
    headline: 'Tecnologia e estratégia',
    headlineSub: 'a serviço do seu negócio.',
    description:
      'Toda semana, notícias e uma ideia prática de tecnologia, IA, automação e vendas para aplicar no mesmo dia. Menos jargão, mais resultado.',
    namePlaceholder: 'Seu nome',
    companyPlaceholder: 'Nome da empresa',
    emailPlaceholder: 'Seu melhor e-mail',
    cta: 'Quero receber',
    loading: 'Enviando...',
    successTitle: 'Obrigado! Você está dentro.',
    successMsg: 'Cadastro realizado com sucesso. Em breve você receberá nossos conteúdos na sua caixa de entrada.',
    errorMsg: 'Algo deu errado. Tente novamente.',
    privacy: 'Sem spam. Cancele quando quiser.',
    policyLink: 'Política de Privacidade',
    backHome: '← Voltar para o site',
    nameRequired: 'Nome é obrigatório',
    emailRequired: 'E-mail é obrigatório',
  },
  en: {
    badge: 'Newsletter',
    headline: 'Technology and strategy',
    headlineSub: 'at the service of your business.',
    description:
      'Every week, news and one practical idea on technology, AI, automation and sales to apply the same day. Less jargon, more results.',
    namePlaceholder: 'Your name',
    companyPlaceholder: 'Company name',
    emailPlaceholder: 'Your best email',
    cta: 'Subscribe now',
    loading: 'Sending...',
    successTitle: "Thank you! You're in.",
    successMsg: "You're successfully subscribed. You'll receive our content in your inbox soon.",
    errorMsg: 'Something went wrong. Please try again.',
    privacy: 'No spam. Unsubscribe anytime.',
    policyLink: 'Privacy Policy',
    backHome: '← Back to website',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
  },
  es: {
    badge: 'Newsletter',
    headline: 'Tecnología y estrategia',
    headlineSub: 'al servicio de tu negocio.',
    description:
      'Cada semana, noticias y una idea práctica de tecnología, IA, automatización y ventas para aplicar el mismo día. Menos jerga, más resultados.',
    namePlaceholder: 'Tu nombre',
    companyPlaceholder: 'Nombre de la empresa',
    emailPlaceholder: 'Tu mejor correo',
    cta: 'Quiero recibirla',
    loading: 'Enviando...',
    successTitle: '¡Gracias! Ya estás dentro.',
    successMsg: 'Registro exitoso. Pronto recibirás nuestros contenidos en tu bandeja de entrada.',
    errorMsg: 'Algo salió mal. Inténtalo de nuevo.',
    privacy: 'Sin spam. Cancela cuando quieras.',
    policyLink: 'Política de Privacidad',
    backHome: '← Volver al sitio',
    nameRequired: 'El nombre es obligatorio',
    emailRequired: 'El correo es obligatorio',
  },
  it: {
    badge: 'Newsletter',
    headline: 'Tecnologia e strategia',
    headlineSub: 'al servizio del tuo business.',
    description:
      "Ogni settimana, notizie e un'idea pratica su tecnologia, IA, automazione e vendite da applicare lo stesso giorno. Meno tecnicismi, più risultati.",
    namePlaceholder: 'Il tuo nome',
    companyPlaceholder: "Nome dell'azienda",
    emailPlaceholder: 'La tua migliore email',
    cta: 'Voglio riceverla',
    loading: 'Invio in corso...',
    successTitle: 'Grazie! Sei dentro.',
    successMsg: 'Iscrizione completata con successo. Presto riceverai i nostri contenuti nella tua casella di posta.',
    errorMsg: 'Qualcosa è andato storto. Riprova.',
    privacy: 'Niente spam. Cancellati quando vuoi.',
    policyLink: 'Informativa sulla Privacy',
    backHome: '← Torna al sito',
    nameRequired: 'Il nome è obbligatorio',
    emailRequired: "L'email è obbligatoria",
  },
};
