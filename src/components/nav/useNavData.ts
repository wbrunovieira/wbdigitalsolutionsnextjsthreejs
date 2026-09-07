import { useTranslations } from '@/contexts/TranslationContext';

export interface NavItem {
  name: string;
  path: string;
  subItems?: NavItem[];
}

/** The main menu, in order, labelled from the active locale's messages. */
export const useNavData = (): NavItem[] => {
  const m = useTranslations();

  return [
    { name: m.home, path: '/' },
    { name: m.websites, path: '/websites' },
    { name: m.systems || 'Plataformas e Sistemas', path: '/systems', subItems: [] },
    { name: m.automation, path: '/automation', subItems: [] },
    { name: m.ai, path: '/ai', subItems: [] },
    { name: m.projects || 'Projects', path: '/projects', subItems: [] },
    { name: m.blog, path: '/blog', subItems: [] },
    { name: m.contact, path: '/contact', subItems: [] },
  ];
};
