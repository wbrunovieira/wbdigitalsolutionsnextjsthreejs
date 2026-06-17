'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { useStaggerReveal } from './useProjectReveal';
import type { Project, ProjectCategory, ProjectsPageContent } from './types';

interface ProjectsGridProps {
  projects: Project[];
  content: ProjectsPageContent;
  filter: ProjectCategory;
  onSelect: (project: Project) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, content, filter, onSelect }) => {
  const gridRef = useStaggerReveal<HTMLDivElement>([filter]);

  return (
    <section id="projects-grid" className="px-6 pb-20 pt-4">
      <div className="container mx-auto">
        {projects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                content={content}
                priority={i < 3}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-xl text-secondary">{content.noProjects}</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;
