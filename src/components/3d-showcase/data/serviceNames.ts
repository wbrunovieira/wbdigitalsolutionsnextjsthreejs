import { ServiceType } from './codeSnippets';

const SERVICE_NAMES: Record<string, Record<ServiceType, string>> = {
  pt: { websites: 'SITES', automation: 'AUTOMAÇÃO', ai: 'I.A.' },
  es: { websites: 'SITIOS WEB', automation: 'AUTOMATIZACIÓN', ai: 'I.A.' },
  it: { websites: 'SITI WEB', automation: 'AUTOMAZIONE', ai: 'I.A.' },
  en: { websites: 'WEBSITES', automation: 'AUTOMATION', ai: 'A.I.' },
};

const toKey = (language: string) => {
  switch (language) {
    case 'pt-BR':
    case 'pt':
      return 'pt';
    case 'es':
      return 'es';
    case 'it':
      return 'it';
    default:
      return 'en';
  }
};

/** Localized label engraved on each desk. */
export const getServiceName = (service: ServiceType, language: string) =>
  SERVICE_NAMES[toKey(language)][service] ?? service;
