'use client';

import React from 'react';
import type { ProjectCategory, ProjectsPageContent } from './types';

interface ProjectFiltersProps {
  value: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
  labels: ProjectsPageContent['filters'];
}

// Only categories that actually have projects are offered.
const FILTERS: { key: ProjectCategory; labelKey: keyof ProjectsPageContent['filters'] }[] = [
  { key: 'all', labelKey: 'all' },
  { key: 'sistemas', labelKey: 'sistemas' },
  { key: 'website', labelKey: 'website' },
  { key: 'ecommerce', labelKey: 'ecommerce' },
  { key: 'education', labelKey: 'education' },
];

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ value, onChange, labels }) => {
  return (
    <section className="px-6 py-10">
      <div className="container mx-auto flex flex-wrap justify-center gap-3">
        {FILTERS.map(({ key, labelKey }) => {
          const active = value === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-pressed={active}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-gradient-to-r from-custom-purple to-yellowcustom text-white shadow-lg shadow-custom-purple/30 scale-105'
                  : 'border border-custom-purple/30 bg-primary/40 text-secondary hover:border-custom-purple/70 hover:text-white'
              }`}
            >
              {labels[labelKey]}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectFilters;
