/**
 * Privacy policy for the "rclone" OAuth client that WB Digital Solutions runs
 * against Google Drive, published at /privacidade.
 *
 * This is NOT the website's LGPD policy (that one lives in privacyPolicy.ts and
 * is served at /privacy-policy). Google requires the OAuth consent screen's
 * privacy URL to sit on the same domain as the app's homepage, so this page
 * exists separately and must stay reachable, indexable and free of auth.
 *
 * Pure data (Record) — exempt from the 200-line rule. The pt-BR entry is the
 * authoritative wording; the other locales are faithful translations and must
 * not change its meaning, since Google reviews what the text actually says.
 */

export type OAuthSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered as an external anchor under the paragraphs. */
  link?: { label: string; href: string };
};

export type OAuthDocContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  intro: string;
  sections: OAuthSection[];
  backHome: string;
};

export type DocLocale = 'pt-BR' | 'en' | 'es' | 'it';

const CONTACT_EMAIL = 'bruno@wbdigitalsolutions.com';
const RCLONE_URL = 'https://rclone.org';
const REVOKE_URL = 'https://myaccount.google.com/permissions';
const OPERATOR = 'WB Digital Solutions (Walter Bruno Prado Vieira)';

export const OAUTH_PRIVACY: Record<DocLocale, OAuthDocContent> = {
  'pt-BR': {
    metaTitle: 'Política de Privacidade do aplicativo rclone | WB Digital Solutions',
    metaDescription:
      'Como a aplicação OAuth rclone, operada pela WB Digital Solutions, trata dados ao acessar o Google Drive: finalidade, dados acessados, armazenamento, retenção e revogação.',
    title: 'Política de Privacidade',
    lastUpdatedLabel: 'Última atualização',
    lastUpdatedDate: '20 de outubro de 2026',
    intro: `Esta política descreve como a aplicação OAuth "rclone", operada por ${OPERATOR}, trata dados ao acessar o Google Drive.`,
    sections: [
      {
        heading: 'Finalidade',
        paragraphs: [
          'A aplicação é de uso estritamente interno e pessoal. Ela existe apenas para permitir que a ferramenta de código aberto rclone envie e recupere cópias de segurança no Google Drive da própria conta que autoriza o acesso.',
          'A aplicação não é distribuída publicamente e não possui usuários além do titular da conta.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Dados acessados',
        paragraphs: [
          'A aplicação acessa arquivos do Google Drive da conta que concede a autorização, exclusivamente para enviar e recuperar arquivos de backup.',
        ],
      },
      {
        heading: 'Uso e compartilhamento',
        paragraphs: [
          'Os dados não são lidos, analisados, indexados, compartilhados, vendidos ou transferidos a terceiros. Não há servidor intermediário: a comunicação ocorre diretamente entre o dispositivo do titular e a API do Google.',
        ],
      },
      {
        heading: 'Armazenamento',
        paragraphs: [
          'A aplicação não armazena dados em infraestrutura própria. As credenciais de acesso (token OAuth) permanecem apenas no dispositivo do titular, em arquivo de configuração local com permissão restrita.',
        ],
      },
      {
        heading: 'Retenção',
        paragraphs: [
          'Os arquivos de backup enviados ao Google Drive seguem política de retenção de 7 dias, após a qual são removidos automaticamente.',
        ],
      },
      {
        heading: 'Revogação',
        paragraphs: ['O acesso pode ser revogado a qualquer momento na página de permissões da conta Google.'],
        link: { label: REVOKE_URL, href: REVOKE_URL },
      },
      {
        heading: 'Contato',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Voltar para a página inicial',
  },

  en: {
    metaTitle: 'rclone application privacy policy | WB Digital Solutions',
    metaDescription:
      'How the rclone OAuth application, operated by WB Digital Solutions, handles data when accessing Google Drive: purpose, data accessed, storage, retention and revocation.',
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated',
    lastUpdatedDate: '20 October 2026',
    intro: `This policy describes how the "rclone" OAuth application, operated by ${OPERATOR}, handles data when accessing Google Drive.`,
    sections: [
      {
        heading: 'Purpose',
        paragraphs: [
          'The application is for strictly internal and personal use. It exists only so that the open-source tool rclone can upload and retrieve backup copies on the Google Drive of the very account that authorises the access.',
          'The application is not publicly distributed and has no users other than the account holder.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Data accessed',
        paragraphs: [
          'The application accesses Google Drive files belonging to the account that grants the authorisation, exclusively to upload and retrieve backup files.',
        ],
      },
      {
        heading: 'Use and sharing',
        paragraphs: [
          'The data is not read, analysed, indexed, shared, sold or transferred to third parties. There is no intermediary server: communication happens directly between the account holder’s device and the Google API.',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'The application stores no data on infrastructure of its own. The access credentials (OAuth token) stay only on the account holder’s device, in a local configuration file with restricted permissions.',
        ],
      },
      {
        heading: 'Retention',
        paragraphs: [
          'Backup files uploaded to Google Drive follow a 7-day retention policy, after which they are removed automatically.',
        ],
      },
      {
        heading: 'Revocation',
        paragraphs: ['Access can be revoked at any time on the Google account permissions page.'],
        link: { label: REVOKE_URL, href: REVOKE_URL },
      },
      {
        heading: 'Contact',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Back to the homepage',
  },

  es: {
    metaTitle: 'Política de Privacidad de la aplicación rclone | WB Digital Solutions',
    metaDescription:
      'Cómo la aplicación OAuth rclone, operada por WB Digital Solutions, trata los datos al acceder a Google Drive: finalidad, datos accedidos, almacenamiento, retención y revocación.',
    title: 'Política de Privacidad',
    lastUpdatedLabel: 'Última actualización',
    lastUpdatedDate: '20 de octubre de 2026',
    intro: `Esta política describe cómo la aplicación OAuth "rclone", operada por ${OPERATOR}, trata los datos al acceder a Google Drive.`,
    sections: [
      {
        heading: 'Finalidad',
        paragraphs: [
          'La aplicación es de uso estrictamente interno y personal. Existe únicamente para permitir que la herramienta de código abierto rclone envíe y recupere copias de seguridad en el Google Drive de la misma cuenta que autoriza el acceso.',
          'La aplicación no se distribuye públicamente y no tiene usuarios además del titular de la cuenta.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Datos a los que se accede',
        paragraphs: [
          'La aplicación accede a archivos de Google Drive de la cuenta que concede la autorización, exclusivamente para enviar y recuperar archivos de copia de seguridad.',
        ],
      },
      {
        heading: 'Uso y comunicación de datos',
        paragraphs: [
          'Los datos no se leen, analizan, indexan, comparten, venden ni transfieren a terceros. No hay servidor intermediario: la comunicación ocurre directamente entre el dispositivo del titular y la API de Google.',
        ],
      },
      {
        heading: 'Almacenamiento',
        paragraphs: [
          'La aplicación no almacena datos en infraestructura propia. Las credenciales de acceso (token OAuth) permanecen solo en el dispositivo del titular, en un archivo de configuración local con permisos restringidos.',
        ],
      },
      {
        heading: 'Retención',
        paragraphs: [
          'Los archivos de copia de seguridad enviados a Google Drive siguen una política de retención de 7 días, tras la cual se eliminan automáticamente.',
        ],
      },
      {
        heading: 'Revocación',
        paragraphs: ['El acceso puede revocarse en cualquier momento en la página de permisos de la cuenta de Google.'],
        link: { label: REVOKE_URL, href: REVOKE_URL },
      },
      {
        heading: 'Contacto',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Volver a la página de inicio',
  },

  it: {
    metaTitle: 'Informativa sulla privacy dell’applicazione rclone | WB Digital Solutions',
    metaDescription:
      'Come l’applicazione OAuth rclone, gestita da WB Digital Solutions, tratta i dati quando accede a Google Drive: finalità, dati consultati, archiviazione, conservazione e revoca.',
    title: 'Informativa sulla privacy',
    lastUpdatedLabel: 'Ultimo aggiornamento',
    lastUpdatedDate: '20 ottobre 2026',
    intro: `Questa informativa descrive come l’applicazione OAuth "rclone", gestita da ${OPERATOR}, tratta i dati quando accede a Google Drive.`,
    sections: [
      {
        heading: 'Finalità',
        paragraphs: [
          'L’applicazione è a uso strettamente interno e personale. Esiste soltanto per permettere allo strumento open source rclone di caricare e recuperare copie di sicurezza sul Google Drive dello stesso account che autorizza l’accesso.',
          'L’applicazione non è distribuita pubblicamente e non ha utenti oltre al titolare dell’account.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Dati consultati',
        paragraphs: [
          'L’applicazione accede ai file Google Drive dell’account che concede l’autorizzazione, esclusivamente per caricare e recuperare file di backup.',
        ],
      },
      {
        heading: 'Uso e condivisione',
        paragraphs: [
          'I dati non vengono letti, analizzati, indicizzati, condivisi, venduti o trasferiti a terzi. Non esiste un server intermedio: la comunicazione avviene direttamente tra il dispositivo del titolare e l’API di Google.',
        ],
      },
      {
        heading: 'Archiviazione',
        paragraphs: [
          'L’applicazione non archivia dati su infrastruttura propria. Le credenziali di accesso (token OAuth) restano solo sul dispositivo del titolare, in un file di configurazione locale con permessi ristretti.',
        ],
      },
      {
        heading: 'Conservazione',
        paragraphs: [
          'I file di backup caricati su Google Drive seguono una politica di conservazione di 7 giorni, trascorsi i quali vengono rimossi automaticamente.',
        ],
      },
      {
        heading: 'Revoca',
        paragraphs: ['L’accesso può essere revocato in qualsiasi momento dalla pagina dei permessi dell’account Google.'],
        link: { label: REVOKE_URL, href: REVOKE_URL },
      },
      {
        heading: 'Contatti',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Torna alla pagina iniziale',
  },
};
