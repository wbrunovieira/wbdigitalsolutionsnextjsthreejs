'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORY_ACCENT, type Project, type ProjectsPageContent } from './types';

interface ProjectCardProps {
  project: Project;
  content: ProjectsPageContent;
  priority?: boolean;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, content, priority, onSelect }) => {
  const accent = CATEGORY_ACCENT[project.category] ?? CATEGORY_ACCENT.website;

  return (
    <article
      onClick={() => onSelect(project)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-custom-purple/20 bg-primary/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-custom-purple/60 hover:shadow-2xl hover:shadow-custom-purple/20"
    >
      {/* Full-bleed cover */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
            quality={85}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary">
            <span className="text-6xl">{project.icon ?? '🗂️'}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold capitalize backdrop-blur-sm ${accent}`}
        >
          {content.filters[project.category as keyof ProjectsPageContent['filters']] ?? project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 text-xl font-bold text-white">{project.title}</h3>
        {project.subtitle && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-yellowcustom">
            {project.subtitle}
          </p>
        )}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-secondary">{project.description}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-custom-purple/30 bg-custom-purple/10 px-2.5 py-1 text-[11px] text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full border border-custom-purple/30 bg-custom-purple/10 px-2.5 py-1 text-[11px] text-secondary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-yellowcustom transition-transform duration-300 group-hover:gap-3">
          {content.viewProject}
          <span aria-hidden>→</span>
        </span>
      </div>
    </article>
  );
};

export default ProjectCard;
