/**
 * Terms of use for the "rclone" OAuth client, published at /termos.
 *
 * Google's OAuth consent screen has an optional terms-of-service field; this
 * page fills it from the same domain as the homepage. Shares the shape and the
 * renderer with oauthPrivacy.ts.
 *
 * Pure data (Record) — exempt from the 200-line rule. pt-BR is authoritative.
 */

import type { DocLocale, OAuthDocContent } from './oauthPrivacy';

const CONTACT_EMAIL = 'bruno@wbdigitalsolutions.com';
const RCLONE_URL = 'https://rclone.org';
const PRIVACY_PATH = '/privacidade';
const OPERATOR = 'WB Digital Solutions (Walter Bruno Prado Vieira)';

export const OAUTH_TERMS: Record<DocLocale, OAuthDocContent> = {
  'pt-BR': {
    metaTitle: 'Termos de Uso do aplicativo rclone | WB Digital Solutions',
    metaDescription:
      'Termos de uso da aplicação OAuth rclone operada pela WB Digital Solutions: uso interno, responsabilidades, ausência de garantia e encerramento.',
    title: 'Termos de Uso',
    lastUpdatedLabel: 'Última atualização',
    lastUpdatedDate: '20 de outubro de 2026',
    intro: `Estes termos regem o uso da aplicação OAuth "rclone", operada por ${OPERATOR}, para enviar e recuperar cópias de segurança no Google Drive.`,
    sections: [
      {
        heading: 'Escopo',
        paragraphs: [
          'A aplicação é de uso estritamente interno e pessoal do titular da conta que concede a autorização. Não é oferecida a terceiros, não é distribuída publicamente e não possui outros usuários.',
        ],
      },
      {
        heading: 'Uso permitido',
        paragraphs: [
          'A autorização concedida serve exclusivamente para que a ferramenta de código aberto rclone envie e recupere arquivos de backup no Google Drive da própria conta. Qualquer outra finalidade está fora do escopo destes termos.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Responsabilidades do titular',
        paragraphs: [
          'O titular é responsável por manter o arquivo de configuração local protegido, por respeitar os Termos de Serviço do Google e por revogar o acesso quando ele deixar de ser necessário.',
        ],
      },
      {
        heading: 'Ausência de garantia',
        paragraphs: [
          'A aplicação é fornecida no estado em que se encontra, sem garantias de disponibilidade ou de resultado. O backup não substitui outras cópias de segurança do titular.',
        ],
      },
      {
        heading: 'Encerramento',
        paragraphs: [
          'O acesso pode ser encerrado a qualquer momento pelo titular, na página de permissões da conta Google, ou pelo operador, sem aviso prévio.',
        ],
      },
      {
        heading: 'Privacidade',
        paragraphs: ['O tratamento de dados está descrito na política de privacidade da aplicação.'],
        link: { label: 'Política de Privacidade', href: PRIVACY_PATH },
      },
      {
        heading: 'Contato',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Voltar para a página inicial',
  },

  en: {
    metaTitle: 'rclone application terms of use | WB Digital Solutions',
    metaDescription:
      'Terms of use for the rclone OAuth application operated by WB Digital Solutions: internal use, responsibilities, no warranty and termination.',
    title: 'Terms of Use',
    lastUpdatedLabel: 'Last updated',
    lastUpdatedDate: '20 October 2026',
    intro: `These terms govern the use of the "rclone" OAuth application, operated by ${OPERATOR}, to upload and retrieve backup copies on Google Drive.`,
    sections: [
      {
        heading: 'Scope',
        paragraphs: [
          'The application is for the strictly internal and personal use of the account holder who grants the authorisation. It is not offered to third parties, is not publicly distributed and has no other users.',
        ],
      },
      {
        heading: 'Permitted use',
        paragraphs: [
          'The authorisation granted serves exclusively so that the open-source tool rclone can upload and retrieve backup files on that same account’s Google Drive. Any other purpose falls outside these terms.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Account holder responsibilities',
        paragraphs: [
          'The account holder is responsible for keeping the local configuration file protected, for complying with Google’s Terms of Service, and for revoking access once it is no longer needed.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The application is provided as is, with no guarantee of availability or outcome. The backup does not replace the account holder’s other copies.',
        ],
      },
      {
        heading: 'Termination',
        paragraphs: [
          'Access can be terminated at any time by the account holder, on the Google account permissions page, or by the operator, without prior notice.',
        ],
      },
      {
        heading: 'Privacy',
        paragraphs: ['Data handling is described in the application’s privacy policy.'],
        link: { label: 'Privacy Policy', href: PRIVACY_PATH },
      },
      {
        heading: 'Contact',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Back to the homepage',
  },

  es: {
    metaTitle: 'Términos de Uso de la aplicación rclone | WB Digital Solutions',
    metaDescription:
      'Términos de uso de la aplicación OAuth rclone operada por WB Digital Solutions: uso interno, responsabilidades, ausencia de garantía y terminación.',
    title: 'Términos de Uso',
    lastUpdatedLabel: 'Última actualización',
    lastUpdatedDate: '20 de octubre de 2026',
    intro: `Estos términos rigen el uso de la aplicación OAuth "rclone", operada por ${OPERATOR}, para enviar y recuperar copias de seguridad en Google Drive.`,
    sections: [
      {
        heading: 'Alcance',
        paragraphs: [
          'La aplicación es de uso estrictamente interno y personal del titular de la cuenta que concede la autorización. No se ofrece a terceros, no se distribuye públicamente y no tiene otros usuarios.',
        ],
      },
      {
        heading: 'Uso permitido',
        paragraphs: [
          'La autorización concedida sirve exclusivamente para que la herramienta de código abierto rclone envíe y recupere archivos de copia de seguridad en el Google Drive de esa misma cuenta. Cualquier otra finalidad queda fuera de estos términos.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Responsabilidades del titular',
        paragraphs: [
          'El titular es responsable de mantener protegido el archivo de configuración local, de cumplir los Términos del Servicio de Google y de revocar el acceso cuando deje de ser necesario.',
        ],
      },
      {
        heading: 'Ausencia de garantía',
        paragraphs: [
          'La aplicación se ofrece tal cual, sin garantías de disponibilidad ni de resultado. La copia de seguridad no sustituye a las demás copias del titular.',
        ],
      },
      {
        heading: 'Terminación',
        paragraphs: [
          'El acceso puede terminarse en cualquier momento por el titular, en la página de permisos de la cuenta de Google, o por el operador, sin aviso previo.',
        ],
      },
      {
        heading: 'Privacidad',
        paragraphs: ['El tratamiento de datos se describe en la política de privacidad de la aplicación.'],
        link: { label: 'Política de Privacidad', href: PRIVACY_PATH },
      },
      {
        heading: 'Contacto',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Volver a la página de inicio',
  },

  it: {
    metaTitle: 'Termini di utilizzo dell’applicazione rclone | WB Digital Solutions',
    metaDescription:
      'Termini di utilizzo dell’applicazione OAuth rclone gestita da WB Digital Solutions: uso interno, responsabilità, assenza di garanzia e cessazione.',
    title: 'Termini di utilizzo',
    lastUpdatedLabel: 'Ultimo aggiornamento',
    lastUpdatedDate: '20 ottobre 2026',
    intro: `Questi termini regolano l’uso dell’applicazione OAuth "rclone", gestita da ${OPERATOR}, per caricare e recuperare copie di sicurezza su Google Drive.`,
    sections: [
      {
        heading: 'Ambito',
        paragraphs: [
          'L’applicazione è a uso strettamente interno e personale del titolare dell’account che concede l’autorizzazione. Non viene offerta a terzi, non è distribuita pubblicamente e non ha altri utenti.',
        ],
      },
      {
        heading: 'Uso consentito',
        paragraphs: [
          'L’autorizzazione concessa serve esclusivamente a permettere allo strumento open source rclone di caricare e recuperare file di backup sul Google Drive dello stesso account. Qualsiasi altra finalità esula da questi termini.',
        ],
        link: { label: 'rclone.org', href: RCLONE_URL },
      },
      {
        heading: 'Responsabilità del titolare',
        paragraphs: [
          'Il titolare è responsabile di proteggere il file di configurazione locale, di rispettare i Termini di servizio di Google e di revocare l’accesso quando non è più necessario.',
        ],
      },
      {
        heading: 'Assenza di garanzia',
        paragraphs: [
          'L’applicazione è fornita così com’è, senza garanzie di disponibilità o di risultato. Il backup non sostituisce le altre copie del titolare.',
        ],
      },
      {
        heading: 'Cessazione',
        paragraphs: [
          'L’accesso può cessare in qualsiasi momento per volontà del titolare, dalla pagina dei permessi dell’account Google, oppure del gestore, senza preavviso.',
        ],
      },
      {
        heading: 'Privacy',
        paragraphs: ['Il trattamento dei dati è descritto nell’informativa sulla privacy dell’applicazione.'],
        link: { label: 'Informativa sulla privacy', href: PRIVACY_PATH },
      },
      {
        heading: 'Contatti',
        paragraphs: [CONTACT_EMAIL],
      },
    ],
    backHome: 'Torna alla pagina iniziale',
  },
};
