// Shared types for the projects page. The content shape mirrors the
// `projectsPage` key in src/locales/{en,es,it,ptbr}.json.

export type ProjectCategory =
  | 'all'
  | 'sistemas'
  | 'website'
  | 'automation'
  | 'ai'
  | 'ecommerce'
  | 'education';

export interface ProjectSlide {
  type: 'image' | 'video' | 'mixed';
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
}

export interface Project {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  icon?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: Exclude<ProjectCategory, 'all'>;
  categories?: Exclude<ProjectCategory, 'all'>[];
  slides?: ProjectSlide[];
}

export interface ProjectsStat {
  value: string;
  label: string;
}

export interface ProjectsPageContent {
  title: string;
  subtitle: string;
  featuredLabel: string;
  technologies: string;
  viewProject: string;
  noProjects: string;
  filters: {
    all: string;
    sistemas: string;
    website: string;
    ecommerce: string;
    education: string;
  };
  stats: {
    title: string;
    items: ProjectsStat[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  items: Project[];
}

// Accent color per category, reused by cards/badges/filters.
export const CATEGORY_ACCENT: Record<string, string> = {
  sistemas: 'text-yellowcustom border-yellowcustom/40 bg-yellowcustom/15',
  website: 'text-custom-purple border-custom-purple/40 bg-custom-purple/15',
  education: 'text-yellowcustom border-yellowcustom/40 bg-yellowcustom/15',
  automation: 'text-yellowcustom border-yellowcustom/40 bg-yellowcustom/15',
  ai: 'text-yellowcustom border-yellowcustom/40 bg-yellowcustom/15',
  ecommerce: 'text-custom-purple border-custom-purple/40 bg-custom-purple/15',
};
