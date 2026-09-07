import React from 'react';
import { ModalContent, ModalProject } from './types';

interface ModalHeaderProps {
  project: ModalProject;
  content: ModalContent;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ project, content, onClose }) => (
  <div className="relative p-4 md:p-6 border-b border-custom-purple/30 bg-primary/50 backdrop-blur">
    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 pr-10">{project.title}</h2>
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      <span className="text-secondary text-xs md:text-sm">{project.category.toUpperCase()}</span>
      <div className="flex gap-1 md:gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-custom-purple/20 text-secondary rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>

    <button
      onClick={onClose}
      className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors"
      aria-label={content.close}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export default ModalHeader;
