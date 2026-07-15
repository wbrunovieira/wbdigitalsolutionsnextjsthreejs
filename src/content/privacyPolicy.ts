/**
 * Privacy Policy content (LGPD-oriented), one entry per app locale.
 *
 * Pure data (Record) — exempt from the 200-line rule. The page component in
 * pages/privacy-policy.tsx renders these sections generically.
 *
 * Scope reflects what the site actually does: the contact form emails the team
 * with lead-source attribution (referrer/UTM/landing, navigation journey,
 * device, approximate location from the Vercel IP headers) and the granular
 * cookie consent (Google Analytics/Tag Manager, Vercel Analytics, Meta Pixel).
 * Keep this in sync with CookieConsent.tsx, src/lib/attribution.ts and the
 * send-email.ts attribution block.
 */

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PolicyContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  intro: string;
  sections: PolicySection[];
  backHome: string;
};

const CONTACT_EMAIL = 'bruno@wbdigitalsolutions.com';

export const PRIVACY_CONTENT: Record<'pt-BR' | 'en' | 'es' | 'it', PolicyContent> = {
  'pt-BR': {
    metaTitle: 'Política de Privacidade | WB Digital Solutions',
    metaDescription:
      'Como a WB Digital Solutions coleta, usa, compartilha e protege seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).',
    title: 'Política de Privacidade',
    lastUpdatedLabel: 'Última atualização',
    lastUpdatedDate: '15 de julho de 2026',
    intro:
      'Esta Política explica como a WB Digital Solutions trata seus dados pessoais quando você usa este site ou entra em contato conosco, de acordo com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).',
    backHome: '← Voltar para o site',
    sections: [
      {
        heading: '1. Quem é o controlador',
        paragraphs: [
          `A WB Digital Solutions (50.288.751 Walter Bruno Prado Vieira, CNPJ 50.288.751/0001-23) é a controladora dos seus dados, ou seja, quem decide como e por que eles são tratados. Para qualquer questão sobre privacidade, ou para exercer seus direitos, fale com nosso encarregado pelo e-mail ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '2. Quais dados coletamos',
        paragraphs: ['Coletamos apenas o necessário para responder você e melhorar o site:'],
        bullets: [
          'Dados que você fornece no formulário de contato: nome, e-mail e o conteúdo da sua mensagem.',
          'Dados de origem e navegação (atribuição): página de entrada, site ou anúncio que te trouxe (referrer e parâmetros UTM), páginas visitadas nesta sessão com o tempo de permanência, e o tipo de dispositivo (celular ou computador). Anexamos esses dados ao seu envio de contato para entender de onde veio sua solicitação e respondê-la melhor.',
          'Localização aproximada: cidade, região e país estimados a partir do seu endereço IP no momento do envio. Não coletamos sua localização precisa por GPS.',
          'Dados de análise e marketing (cookies): páginas visitadas, dispositivo e desempenho do site, coletados por Google Analytics, Vercel Analytics e, com seu consentimento, Meta Pixel.',
          'Dados do chatbot: se você usar nosso assistente virtual, o conteúdo das mensagens que você digita, a página em que você está e um identificador anônimo do navegador são enviados para gerar as respostas e melhorar o atendimento.',
          'Dados da newsletter: se você assinar, guardamos seu nome, empresa e e-mail para enviar nossos conteúdos. É opcional, baseado no seu consentimento, e você pode cancelar quando quiser.',
        ],
      },
      {
        heading: '3. Para que usamos seus dados',
        bullets: [
          'Responder, entender e qualificar sua solicitação de contato.',
          'Identificar a origem dos contatos (qual canal ou campanha os gerou) para direcionar melhor nossos esforços.',
          'Manter o site seguro e prevenir spam e envios automatizados.',
          'Medir o tráfego e melhorar a experiência do site.',
          'Medir campanhas de marketing e exibir anúncios relevantes (apenas com o seu consentimento).',
        ],
      },
      {
        heading: '4. Com que base legal tratamos seus dados',
        paragraphs: ['Cada tratamento tem uma base legal da LGPD (art. 7 e art. 11):'],
        bullets: [
          'Procedimentos preliminares e execução de contrato (art. 7, V): para responder ao contato que você mesmo iniciou.',
          'Legítimo interesse (art. 7, IX): para os dados de origem e navegação anexados ao contato, e para a segurança contra spam, sempre respeitando suas expectativas e direitos.',
          'Consentimento (art. 7, I): para os cookies de análise e marketing e para o registro da jornada de navegação, que só ocorrem se você aceitar no banner de cookies. Você pode retirar o consentimento a qualquer momento.',
          'Consentimento específico para o chatbot (art. 7, I e art. 33, VIII): para processar as mensagens que você envia no assistente virtual e transferi-las ao provedor de IA fora do Brasil, com base no consentimento que você fornece ao iniciar o chat.',
        ],
      },
      {
        heading: '5. Cookies e suas escolhas',
        paragraphs: [
          'Ao acessar o site, um banner permite aceitar, recusar ou personalizar os cookies em três categorias: necessários (sempre ativos), análise e marketing. Os cookies necessários fazem o site funcionar (idioma, segurança, envio de formulários) e não identificam você.',
          'A jornada de navegação anexada ao formulário só é registrada se você aceitar a categoria de análise. Você pode alterar ou retirar sua escolha a qualquer momento pelo link "Gerenciar cookies" no rodapé do site.',
        ],
      },
      {
        heading: '6. Com quem compartilhamos',
        paragraphs: [
          'Não vendemos seus dados. Compartilhamos apenas com prestadores (operadores) que nos ajudam a operar o site e responder você, cada um tratando os dados conforme nossas instruções:',
        ],
        bullets: [
          'Vercel: hospedagem do site e analytics sem cookies; fornece a localização aproximada a partir do IP.',
          'Google: Google Analytics (análise) e, quando aplicável, Google Ads (marketing).',
          'Meta (Facebook): Meta Pixel, carregado apenas com o consentimento de marketing.',
          'Google Workspace / Gmail: entrega das mensagens do formulário de contato à nossa equipe.',
          'Assistente virtual (chatbot): as mensagens enviadas no chat são processadas por um provedor de inteligência artificial (atualmente a DeepSeek) para gerar as respostas. Esse provedor está localizado fora do Brasil, inclusive em país sem decisão de adequação (ver seção 7).',
        ],
      },
      {
        heading: '7. Transferência internacional',
        paragraphs: [
          'Alguns desses prestadores estão localizados fora do Brasil (por exemplo, nos Estados Unidos). Nesses casos, a transferência ocorre com as garantias exigidas pela LGPD (art. 33), por meio de cláusulas contratuais e padrões de segurança adequados.',
          'O provedor de inteligência artificial do assistente virtual (DeepSeek) está localizado na China, país que não possui decisão de adequação da ANPD. Por isso, o conteúdo que você envia no chat só é transferido a esse provedor com base no seu consentimento específico e destacado (art. 33, VIII), solicitado antes de você usar o chat, e limitado ao necessário para gerar a resposta. Se preferir não usar o chat, fale conosco pelo formulário de contato ou pelos canais diretos.',
        ],
      },
      {
        heading: '8. Por quanto tempo guardamos',
        paragraphs: [
          'Mantemos os dados do contato pelo tempo necessário para responder e dar seguimento à sua solicitação, em geral por até 24 meses após a última interação, e, depois, pelo prazo exigido por obrigações legais. Os dados de análise seguem os períodos de retenção das ferramentas usadas. Quando não forem mais necessários, os dados são eliminados ou anonimizados. As mensagens trocadas com o assistente virtual são mantidas por até 12 meses e depois eliminadas.',
        ],
      },
      {
        heading: '9. Seus direitos',
        paragraphs: ['Nos termos do art. 18 da LGPD, você pode a qualquer momento:'],
        bullets: [
          'Confirmar a existência de tratamento e acessar seus dados.',
          'Corrigir dados incompletos, inexatos ou desatualizados.',
          'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.',
          'Solicitar a portabilidade dos dados.',
          'Revogar o consentimento e se opor a tratamentos, quando aplicável.',
          'Ser informado sobre com quem compartilhamos seus dados.',
        ],
      },
      {
        heading: '10. Como exercer seus direitos',
        paragraphs: [
          `Para exercer qualquer desses direitos, escreva para ${CONTACT_EMAIL}. Responderemos no menor prazo possível. Você também tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
        ],
      },
      {
        heading: '11. Alterações desta Política',
        paragraphs: [
          'Podemos atualizar esta Política para refletir mudanças no site ou na legislação. A versão vigente é sempre a publicada nesta página, com a data de atualização indicada acima.',
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Privacy Policy | WB Digital Solutions',
    metaDescription:
      'How WB Digital Solutions collects, uses, shares and protects your personal data, in line with Brazil’s LGPD (Law 13.709/2018).',
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated',
    lastUpdatedDate: 'July 15, 2026',
    intro:
      'This Policy explains how WB Digital Solutions handles your personal data when you use this site or get in touch with us, in accordance with the Brazilian General Data Protection Law (LGPD, Law No. 13.709/2018).',
    backHome: '← Back to website',
    sections: [
      {
        heading: '1. Who the controller is',
        paragraphs: [
          `WB Digital Solutions (50.288.751 Walter Bruno Prado Vieira, CNPJ 50.288.751/0001-23) is the controller of your data, meaning it decides how and why your data is processed. For any privacy question, or to exercise your rights, contact our data protection officer at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '2. What data we collect',
        paragraphs: ['We collect only what we need to reply to you and improve the site:'],
        bullets: [
          'Data you provide in the contact form: your name, email and the content of your message.',
          'Source and navigation data (attribution): the landing page, the site or ad that brought you (referrer and UTM parameters), the pages you visited in this session with the time spent, and your device type (mobile or desktop). We attach this to your contact submission to understand where your request came from and respond to it better.',
          'Approximate location: city, region and country estimated from your IP address at the moment of submission. We do not collect precise GPS location.',
          'Analytics and marketing data (cookies): pages visited, device and site performance, collected via Google Analytics, Vercel Analytics and, with your consent, the Meta Pixel.',
          'Chatbot data: if you use our virtual assistant, the content of the messages you type, the page you are on and an anonymous browser identifier are sent to generate the answers and improve support.',
          'Newsletter data: if you subscribe, we keep your name, company and email to send our content. It is optional, based on your consent, and you can unsubscribe anytime.',
        ],
      },
      {
        heading: '3. How we use your data',
        bullets: [
          'Reply to, understand and qualify your contact request.',
          'Identify where inquiries come from (which channel or campaign generated them) to focus our efforts.',
          'Keep the site secure and prevent spam and automated submissions.',
          'Measure traffic and improve the site experience.',
          'Measure marketing campaigns and show relevant ads (only with your consent).',
        ],
      },
      {
        heading: '4. The legal basis for processing',
        paragraphs: ['Each processing activity has a legal basis under the LGPD (art. 7 and art. 11):'],
        bullets: [
          'Pre-contract steps and contract performance (art. 7, V): to answer the contact you initiated.',
          'Legitimate interest (art. 7, IX): for the source and navigation data attached to your contact and for anti-spam security, always respecting your expectations and rights.',
          'Consent (art. 7, I): for analytics and marketing cookies and for recording your navigation journey, which only happen if you accept in the cookie banner. You can withdraw consent at any time.',
          'Specific consent for the chatbot (art. 7, I and art. 33, VIII): to process the messages you send in the virtual assistant and transfer them to the AI provider outside Brazil, based on the consent you give when you start the chat.',
        ],
      },
      {
        heading: '5. Cookies and your choices',
        paragraphs: [
          'When you visit the site, a banner lets you accept, decline or customize cookies in three categories: necessary (always on), analytics and marketing. Necessary cookies make the site work (language, security, form submissions) and do not identify you.',
          'The navigation journey attached to the form is only recorded if you accept the analytics category. You can change or withdraw your choice at any time using the "Manage cookies" link in the site footer.',
        ],
      },
      {
        heading: '6. Who we share with',
        paragraphs: [
          'We do not sell your data. We share it only with the providers (processors) that help us run the site and reply to you, each processing data under our instructions:',
        ],
        bullets: [
          'Vercel: site hosting and cookieless analytics; provides the approximate location from the IP.',
          'Google: Google Analytics (analytics) and, where applicable, Google Ads (marketing).',
          'Meta (Facebook): the Meta Pixel, loaded only with marketing consent.',
          'Google Workspace / Gmail: delivery of contact-form messages to our team.',
          'Virtual assistant (chatbot): the messages sent in the chat are processed by an artificial-intelligence provider (currently DeepSeek) to generate the answers. This provider is located outside Brazil, including in a country without an adequacy decision (see section 7).',
        ],
      },
      {
        heading: '7. International transfer',
        paragraphs: [
          'Some of these providers are located outside Brazil (for example, in the United States). In those cases, the transfer takes place with the safeguards required by the LGPD (art. 33), through contractual clauses and adequate security standards.',
          'The virtual assistant’s artificial-intelligence provider (DeepSeek) is located in China, a country without an adequacy decision from the ANPD. For that reason, the content you send in the chat is only transferred to this provider based on your specific, highlighted consent (art. 33, VIII), requested before you use the chat, and limited to what is needed to generate the answer. If you prefer not to use the chat, reach us through the contact form or our direct channels.',
        ],
      },
      {
        heading: '8. How long we keep it',
        paragraphs: [
          'We keep contact data for as long as needed to reply to and follow up on your request, generally up to 24 months after the last interaction, and afterwards for the period required by legal obligations. Analytics data follows the retention periods of the tools used. When no longer needed, data is deleted or anonymized. Messages exchanged with the virtual assistant are kept for up to 12 months and then deleted.',
        ],
      },
      {
        heading: '9. Your rights',
        paragraphs: ['Under art. 18 of the LGPD, you may at any time:'],
        bullets: [
          'Confirm that processing exists and access your data.',
          'Correct incomplete, inaccurate or outdated data.',
          'Request anonymization, blocking or deletion of unnecessary or excessive data.',
          'Request data portability.',
          'Withdraw consent and object to processing where applicable.',
          'Be informed about who we share your data with.',
        ],
      },
      {
        heading: '10. How to exercise your rights',
        paragraphs: [
          `To exercise any of these rights, write to ${CONTACT_EMAIL}. We will respond as soon as possible. You also have the right to lodge a complaint with the Brazilian data protection authority (ANPD).`,
        ],
      },
      {
        heading: '11. Changes to this Policy',
        paragraphs: [
          'We may update this Policy to reflect changes to the site or the law. The version in force is always the one published on this page, with the update date shown above.',
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Política de Privacidad | WB Digital Solutions',
    metaDescription:
      'Cómo WB Digital Solutions recopila, usa, comparte y protege tus datos personales, conforme a la LGPD brasileña (Ley 13.709/2018).',
    title: 'Política de Privacidad',
    lastUpdatedLabel: 'Última actualización',
    lastUpdatedDate: '15 de julio de 2026',
    intro:
      'Esta Política explica cómo WB Digital Solutions trata tus datos personales cuando usas este sitio o te pones en contacto con nosotros, conforme a la Ley General de Protección de Datos brasileña (LGPD, Ley n.º 13.709/2018).',
    backHome: '← Volver al sitio',
    sections: [
      {
        heading: '1. Quién es el responsable',
        paragraphs: [
          `WB Digital Solutions (50.288.751 Walter Bruno Prado Vieira, CNPJ 50.288.751/0001-23) es la responsable de tus datos, es decir, quien decide cómo y por qué se tratan. Para cualquier consulta sobre privacidad, o para ejercer tus derechos, contacta a nuestro encargado en ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '2. Qué datos recopilamos',
        paragraphs: ['Recopilamos solo lo necesario para responderte y mejorar el sitio:'],
        bullets: [
          'Datos que proporcionas en el formulario de contacto: nombre, correo electrónico y el contenido de tu mensaje.',
          'Datos de origen y navegación (atribución): la página de entrada, el sitio o anuncio que te trajo (referrer y parámetros UTM), las páginas que visitaste en esta sesión con el tiempo de permanencia, y el tipo de dispositivo (móvil o computadora). Adjuntamos esto a tu envío de contacto para entender de dónde vino tu solicitud y responderla mejor.',
          'Ubicación aproximada: ciudad, región y país estimados a partir de tu dirección IP en el momento del envío. No recopilamos tu ubicación precisa por GPS.',
          'Datos de análisis y marketing (cookies): páginas visitadas, dispositivo y rendimiento del sitio, recopilados por Google Analytics, Vercel Analytics y, con tu consentimiento, el Meta Pixel.',
          'Datos del chatbot: si usas nuestro asistente virtual, el contenido de los mensajes que escribes, la página en la que estás y un identificador anónimo del navegador se envían para generar las respuestas y mejorar la atención.',
          'Datos de la newsletter: si te suscribes, guardamos tu nombre, empresa y correo para enviarte nuestros contenidos. Es opcional, basado en tu consentimiento, y puedes cancelar cuando quieras.',
        ],
      },
      {
        heading: '3. Para qué usamos tus datos',
        bullets: [
          'Responder, entender y cualificar tu solicitud de contacto.',
          'Identificar el origen de los contactos (qué canal o campaña los generó) para orientar mejor nuestros esfuerzos.',
          'Mantener el sitio seguro y prevenir spam y envíos automatizados.',
          'Medir el tráfico y mejorar la experiencia del sitio.',
          'Medir campañas de marketing y mostrar anuncios relevantes (solo con tu consentimiento).',
        ],
      },
      {
        heading: '4. Con qué base legal tratamos tus datos',
        paragraphs: ['Cada tratamiento tiene una base legal de la LGPD (art. 7 y art. 11):'],
        bullets: [
          'Procedimientos preliminares y ejecución de contrato (art. 7, V): para responder al contacto que iniciaste.',
          'Interés legítimo (art. 7, IX): para los datos de origen y navegación adjuntos al contacto y para la seguridad contra spam, siempre respetando tus expectativas y derechos.',
          'Consentimiento (art. 7, I): para las cookies de análisis y marketing y para el registro de la jornada de navegación, que solo ocurren si aceptas en el banner de cookies. Puedes retirar el consentimiento en cualquier momento.',
          'Consentimiento específico para el chatbot (art. 7, I y art. 33, VIII): para procesar los mensajes que envías en el asistente virtual y transferirlos al proveedor de IA fuera de Brasil, con base en el consentimiento que otorgas al iniciar el chat.',
        ],
      },
      {
        heading: '5. Cookies y tus opciones',
        paragraphs: [
          'Al acceder al sitio, un banner te permite aceptar, rechazar o personalizar las cookies en tres categorías: necesarias (siempre activas), análisis y marketing. Las cookies necesarias hacen que el sitio funcione (idioma, seguridad, envío de formularios) y no te identifican.',
          'La jornada de navegación adjunta al formulario solo se registra si aceptas la categoría de análisis. Puedes cambiar o retirar tu elección en cualquier momento mediante el enlace "Gestionar cookies" en el pie del sitio.',
        ],
      },
      {
        heading: '6. Con quién compartimos',
        paragraphs: [
          'No vendemos tus datos. Los compartimos solo con los proveedores (encargados) que nos ayudan a operar el sitio y responderte, cada uno tratando los datos según nuestras instrucciones:',
        ],
        bullets: [
          'Vercel: alojamiento del sitio y analítica sin cookies; proporciona la ubicación aproximada a partir de la IP.',
          'Google: Google Analytics (análisis) y, cuando corresponda, Google Ads (marketing).',
          'Meta (Facebook): el Meta Pixel, cargado solo con el consentimiento de marketing.',
          'Google Workspace / Gmail: entrega de los mensajes del formulario de contacto a nuestro equipo.',
          'Asistente virtual (chatbot): los mensajes enviados en el chat son procesados por un proveedor de inteligencia artificial (actualmente DeepSeek) para generar las respuestas. Ese proveedor está ubicado fuera de Brasil, incluso en un país sin decisión de adecuación (ver sección 7).',
        ],
      },
      {
        heading: '7. Transferencia internacional',
        paragraphs: [
          'Algunos de estos proveedores están ubicados fuera de Brasil (por ejemplo, en Estados Unidos). En esos casos, la transferencia se realiza con las garantías exigidas por la LGPD (art. 33), mediante cláusulas contractuales y estándares de seguridad adecuados.',
          'El proveedor de inteligencia artificial del asistente virtual (DeepSeek) está ubicado en China, un país sin decisión de adecuación de la ANPD. Por eso, el contenido que envías en el chat solo se transfiere a ese proveedor con base en tu consentimiento específico y destacado (art. 33, VIII), solicitado antes de usar el chat, y limitado a lo necesario para generar la respuesta. Si prefieres no usar el chat, contáctanos por el formulario de contacto o por nuestros canales directos.',
        ],
      },
      {
        heading: '8. Cuánto tiempo los guardamos',
        paragraphs: [
          'Conservamos los datos del contacto durante el tiempo necesario para responder y dar seguimiento a tu solicitud, en general hasta 24 meses después de la última interacción, y, después, durante el plazo exigido por obligaciones legales. Los datos de análisis siguen los períodos de retención de las herramientas usadas. Cuando ya no son necesarios, los datos se eliminan o anonimizan. Los mensajes intercambiados con el asistente virtual se conservan hasta 12 meses y luego se eliminan.',
        ],
      },
      {
        heading: '9. Tus derechos',
        paragraphs: ['Según el art. 18 de la LGPD, en cualquier momento puedes:'],
        bullets: [
          'Confirmar la existencia de tratamiento y acceder a tus datos.',
          'Corregir datos incompletos, inexactos o desactualizados.',
          'Solicitar la anonimización, bloqueo o eliminación de datos innecesarios o excesivos.',
          'Solicitar la portabilidad de los datos.',
          'Revocar el consentimiento y oponerte a tratamientos, cuando corresponda.',
          'Ser informado sobre con quién compartimos tus datos.',
        ],
      },
      {
        heading: '10. Cómo ejercer tus derechos',
        paragraphs: [
          `Para ejercer cualquiera de estos derechos, escribe a ${CONTACT_EMAIL}. Responderemos en el menor plazo posible. También tienes derecho a presentar una reclamación ante la Autoridad Nacional de Protección de Datos (ANPD).`,
        ],
      },
      {
        heading: '11. Cambios en esta Política',
        paragraphs: [
          'Podemos actualizar esta Política para reflejar cambios en el sitio o en la legislación. La versión vigente es siempre la publicada en esta página, con la fecha de actualización indicada arriba.',
        ],
      },
    ],
  },
  it: {
    metaTitle: 'Informativa sulla Privacy | WB Digital Solutions',
    metaDescription:
      'Come WB Digital Solutions raccoglie, usa, condivide e protegge i tuoi dati personali, in conformità alla LGPD brasiliana (Legge 13.709/2018).',
    title: 'Informativa sulla Privacy',
    lastUpdatedLabel: 'Ultimo aggiornamento',
    lastUpdatedDate: '15 luglio 2026',
    intro:
      'Questa Informativa spiega come WB Digital Solutions tratta i tuoi dati personali quando usi questo sito o ci contatti, in conformità alla Legge Generale sulla Protezione dei Dati brasiliana (LGPD, Legge n. 13.709/2018).',
    backHome: '← Torna al sito',
    sections: [
      {
        heading: '1. Chi è il titolare',
        paragraphs: [
          `WB Digital Solutions (50.288.751 Walter Bruno Prado Vieira, CNPJ 50.288.751/0001-23) è il titolare dei tuoi dati, ovvero chi decide come e perché vengono trattati. Per qualsiasi domanda sulla privacy, o per esercitare i tuoi diritti, contatta il nostro responsabile all’indirizzo ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '2. Quali dati raccogliamo',
        paragraphs: ['Raccogliamo solo ciò che serve per risponderti e migliorare il sito:'],
        bullets: [
          'Dati che fornisci nel modulo di contatto: nome, e-mail e il contenuto del tuo messaggio.',
          'Dati di origine e navigazione (attribuzione): la pagina di ingresso, il sito o l’annuncio che ti ha portato (referrer e parametri UTM), le pagine visitate in questa sessione con il tempo di permanenza, e il tipo di dispositivo (cellulare o computer). Alleghiamo questi dati al tuo invio di contatto per capire da dove è arrivata la tua richiesta e rispondere meglio.',
          'Posizione approssimativa: città, regione e paese stimati dal tuo indirizzo IP al momento dell’invio. Non raccogliamo la tua posizione precisa tramite GPS.',
          'Dati di analisi e marketing (cookie): pagine visitate, dispositivo e prestazioni del sito, raccolti tramite Google Analytics, Vercel Analytics e, con il tuo consenso, il Meta Pixel.',
          'Dati del chatbot: se usi il nostro assistente virtuale, il contenuto dei messaggi che scrivi, la pagina in cui ti trovi e un identificativo anonimo del browser vengono inviati per generare le risposte e migliorare il servizio.',
          'Dati della newsletter: se ti iscrivi, conserviamo il tuo nome, azienda ed e-mail per inviarti i nostri contenuti. È facoltativo, basato sul tuo consenso, e puoi annullare quando vuoi.',
        ],
      },
      {
        heading: '3. Come usiamo i tuoi dati',
        bullets: [
          'Rispondere, comprendere e qualificare la tua richiesta di contatto.',
          'Identificare l’origine dei contatti (quale canale o campagna li ha generati) per indirizzare meglio i nostri sforzi.',
          'Mantenere il sito sicuro e prevenire spam e invii automatizzati.',
          'Misurare il traffico e migliorare l’esperienza del sito.',
          'Misurare le campagne di marketing e mostrare annunci pertinenti (solo con il tuo consenso).',
        ],
      },
      {
        heading: '4. Su quale base giuridica trattiamo i dati',
        paragraphs: ['Ogni trattamento ha una base giuridica prevista dalla LGPD (art. 7 e art. 11):'],
        bullets: [
          'Procedure preliminari ed esecuzione del contratto (art. 7, V): per rispondere al contatto che hai avviato tu.',
          'Legittimo interesse (art. 7, IX): per i dati di origine e navigazione allegati al contatto e per la sicurezza anti-spam, sempre nel rispetto delle tue aspettative e dei tuoi diritti.',
          'Consenso (art. 7, I): per i cookie di analisi e marketing e per la registrazione del percorso di navigazione, che avvengono solo se accetti nel banner dei cookie. Puoi revocare il consenso in qualsiasi momento.',
          'Consenso specifico per il chatbot (art. 7, I e art. 33, VIII): per elaborare i messaggi che invii nell’assistente virtuale e trasferirli al fornitore di IA fuori dal Brasile, in base al consenso che fornisci quando avvii la chat.',
        ],
      },
      {
        heading: '5. Cookie e le tue scelte',
        paragraphs: [
          'Quando accedi al sito, un banner ti permette di accettare, rifiutare o personalizzare i cookie in tre categorie: necessari (sempre attivi), analisi e marketing. I cookie necessari fanno funzionare il sito (lingua, sicurezza, invio dei moduli) e non ti identificano.',
          'Il percorso di navigazione allegato al modulo viene registrato solo se accetti la categoria di analisi. Puoi modificare o revocare la tua scelta in qualsiasi momento tramite il link "Gestisci i cookie" nel piè di pagina del sito.',
        ],
      },
      {
        heading: '6. Con chi condividiamo',
        paragraphs: [
          'Non vendiamo i tuoi dati. Li condividiamo solo con i fornitori (responsabili del trattamento) che ci aiutano a gestire il sito e a risponderti, ognuno dei quali tratta i dati secondo le nostre istruzioni:',
        ],
        bullets: [
          'Vercel: hosting del sito e analisi senza cookie; fornisce la posizione approssimativa dall’IP.',
          'Google: Google Analytics (analisi) e, ove applicabile, Google Ads (marketing).',
          'Meta (Facebook): il Meta Pixel, caricato solo con il consenso di marketing.',
          'Google Workspace / Gmail: consegna dei messaggi del modulo di contatto al nostro team.',
          'Assistente virtuale (chatbot): i messaggi inviati nella chat sono elaborati da un fornitore di intelligenza artificiale (attualmente DeepSeek) per generare le risposte. Questo fornitore si trova fuori dal Brasile, anche in un paese senza decisione di adeguatezza (vedi sezione 7).',
        ],
      },
      {
        heading: '7. Trasferimento internazionale',
        paragraphs: [
          'Alcuni di questi fornitori si trovano fuori dal Brasile (ad esempio, negli Stati Uniti). In tali casi, il trasferimento avviene con le garanzie richieste dalla LGPD (art. 33), tramite clausole contrattuali e standard di sicurezza adeguati.',
          'Il fornitore di intelligenza artificiale dell’assistente virtuale (DeepSeek) si trova in Cina, un paese senza decisione di adeguatezza dell’ANPD. Per questo, il contenuto che invii nella chat viene trasferito a questo fornitore solo in base al tuo consenso specifico ed evidenziato (art. 33, VIII), richiesto prima di usare la chat, e limitato a quanto necessario per generare la risposta. Se preferisci non usare la chat, contattaci tramite il modulo di contatto o i nostri canali diretti.',
        ],
      },
      {
        heading: '8. Per quanto tempo li conserviamo',
        paragraphs: [
          'Conserviamo i dati del contatto per il tempo necessario a rispondere e dare seguito alla tua richiesta, in genere fino a 24 mesi dopo l’ultima interazione, e, in seguito, per il periodo richiesto da obblighi legali. I dati di analisi seguono i periodi di conservazione degli strumenti usati. Quando non sono più necessari, i dati vengono eliminati o anonimizzati. I messaggi scambiati con l’assistente virtuale sono conservati fino a 12 mesi e poi eliminati.',
        ],
      },
      {
        heading: '9. I tuoi diritti',
        paragraphs: ['Ai sensi dell’art. 18 della LGPD, in qualsiasi momento puoi:'],
        bullets: [
          'Confermare l’esistenza del trattamento e accedere ai tuoi dati.',
          'Correggere dati incompleti, inesatti o non aggiornati.',
          'Richiedere l’anonimizzazione, il blocco o l’eliminazione di dati non necessari o eccessivi.',
          'Richiedere la portabilità dei dati.',
          'Revocare il consenso e opporti ai trattamenti, ove applicabile.',
          'Essere informato su con chi condividiamo i tuoi dati.',
        ],
      },
      {
        heading: '10. Come esercitare i tuoi diritti',
        paragraphs: [
          `Per esercitare uno di questi diritti, scrivi a ${CONTACT_EMAIL}. Risponderemo nel più breve tempo possibile. Hai inoltre il diritto di presentare un reclamo all’Autorità nazionale per la protezione dei dati (ANPD).`,
        ],
      },
      {
        heading: '11. Modifiche a questa Informativa',
        paragraphs: [
          'Possiamo aggiornare questa Informativa per riflettere modifiche al sito o alla normativa. La versione in vigore è sempre quella pubblicata in questa pagina, con la data di aggiornamento indicata sopra.',
        ],
      },
    ],
  },
};
