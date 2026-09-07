export interface ConsentUI {
  bannerText: string;
  title: string;
  intro: string;
  formNote: string;
  policy: string;
  alwaysOn: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  cats: { necessary: [string, string]; analytics: [string, string]; marketing: [string, string] };
}

/** Banner and preference-panel copy, per locale. */
export const consentUI: Record<string, ConsentUI> = {
  'pt-BR': {
    bannerText: 'Usamos cookies para fazer o site funcionar, medir o tráfego e (com sua permissão) personalizar marketing. Você escolhe o que aceitar.',
    title: 'Suas preferências de privacidade',
    intro: 'Controle como coletamos e usamos seus dados neste site. Os cookies necessários são sempre ativos; os demais dependem da sua escolha.',
    formNote: 'Ao enviar o formulário de contato, anexamos à sua mensagem dados de navegação e origem (páginas visitadas, referência e localização aproximada) para entender e responder melhor sua solicitação.',
    policy: 'Política de Privacidade',
    alwaysOn: 'Sempre ativo',
    acceptAll: 'Aceitar tudo',
    rejectAll: 'Recusar',
    customize: 'Personalizar',
    save: 'Salvar preferências',
    cats: {
      necessary: ['Necessários', 'Essenciais para o site funcionar: idioma, segurança e envio de formulários. Não identificam você.'],
      analytics: ['Análise', 'Google Analytics e Vercel Analytics: páginas visitadas, dispositivo, origem do acesso e localização aproximada, para melhorar o site.'],
      marketing: ['Marketing', 'Facebook Pixel e, quando ativo, Google Ads: medem campanhas e ajudam a mostrar anúncios relevantes. Só com seu consentimento.'],
    },
  },
  en: {
    bannerText: 'We use cookies to run the site, measure traffic and (with your permission) personalize marketing. You choose what to allow.',
    title: 'Your privacy preferences',
    intro: 'Control how we collect and use your data on this site. Necessary cookies are always on; the rest depend on your choice.',
    formNote: 'When you submit the contact form, we attach navigation and source data (pages visited, referrer and approximate location) to your message to understand and respond to your request better.',
    policy: 'Privacy Policy',
    alwaysOn: 'Always on',
    acceptAll: 'Accept all',
    rejectAll: 'Decline',
    customize: 'Customize',
    save: 'Save preferences',
    cats: {
      necessary: ['Necessary', "Essential for the site to work: language, security and form submissions. They don't identify you."],
      analytics: ['Analytics', 'Google Analytics & Vercel Analytics: pages visited, device, traffic source and approximate location, to improve the site.'],
      marketing: ['Marketing', 'Facebook Pixel and, when active, Google Ads: measure campaigns and help show relevant ads. Only with your consent.'],
    },
  },
  es: {
    bannerText: 'Usamos cookies para que el sitio funcione, medir el tráfico y (con tu permiso) personalizar el marketing. Tú eliges qué aceptar.',
    title: 'Tus preferencias de privacidad',
    intro: 'Controla cómo recopilamos y usamos tus datos en este sitio. Las cookies necesarias siempre están activas; el resto depende de tu elección.',
    formNote: 'Al enviar el formulario de contacto, adjuntamos a tu mensaje datos de navegación y origen (páginas visitadas, referencia y ubicación aproximada) para entender y responder mejor tu solicitud.',
    policy: 'Política de Privacidad',
    alwaysOn: 'Siempre activo',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    cats: {
      necessary: ['Necesarias', 'Esenciales para que el sitio funcione: idioma, seguridad y envío de formularios. No te identifican.'],
      analytics: ['Análisis', 'Google Analytics y Vercel Analytics: páginas visitadas, dispositivo, origen del acceso y ubicación aproximada, para mejorar el sitio.'],
      marketing: ['Marketing', 'Facebook Pixel y, cuando está activo, Google Ads: miden campañas y ayudan a mostrar anuncios relevantes. Solo con tu consentimiento.'],
    },
  },
  it: {
    bannerText: 'Usiamo i cookie per far funzionare il sito, misurare il traffico e (col tuo permesso) personalizzare il marketing. Scegli tu cosa accettare.',
    title: 'Le tue preferenze sulla privacy',
    intro: 'Controlla come raccogliamo e usiamo i tuoi dati su questo sito. I cookie necessari sono sempre attivi; gli altri dipendono dalla tua scelta.',
    formNote: 'Quando invii il modulo di contatto, alleghiamo al tuo messaggio dati di navigazione e origine (pagine visitate, referrer e posizione approssimativa) per capire e rispondere meglio alla tua richiesta.',
    policy: 'Informativa sulla Privacy',
    alwaysOn: 'Sempre attivo',
    acceptAll: 'Accetta tutto',
    rejectAll: 'Rifiuta',
    customize: 'Personalizza',
    save: 'Salva preferenze',
    cats: {
      necessary: ['Necessari', 'Essenziali per il funzionamento del sito: lingua, sicurezza e invio dei moduli. Non ti identificano.'],
      analytics: ['Analisi', 'Google Analytics e Vercel Analytics: pagine visitate, dispositivo, origine del traffico e posizione approssimativa, per migliorare il sito.'],
      marketing: ['Marketing', 'Facebook Pixel e, quando attivo, Google Ads: misurano le campagne e aiutano a mostrare annunci pertinenti. Solo col tuo consenso.'],
    },
  },
};

// Facebook Pixel command queue: callable, with bootstrap metadata attached.
