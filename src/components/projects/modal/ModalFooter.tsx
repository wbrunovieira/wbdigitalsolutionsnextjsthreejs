import React from 'react';
import { ModalContent, ModalProject } from './types';

interface ModalFooterProps {
  project: ModalProject;
  content: ModalContent;
  slideCount: number;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  project, content, slideCount, currentSlide, onSelectSlide,
}) => (
  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-primary via-primary/95 to-transparent pointer-events-none">
    <div className="flex items-center justify-between pointer-events-auto">
      {/* Slide Indicators */}
      <div className="flex gap-2">
        {Array.from({ length: slideCount }, (_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-yellowcustom' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
            aria-current={idx === currentSlide}
          />
        ))}
      </div>

      {/* Action Buttons - Only show GitHub if available */}
      <div className="flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary/70 hover:bg-primary text-white rounded-lg font-semibold transition-all border border-custom-purple/30"
          >
            {content.viewCode}
          </a>
        )}
      </div>
    </div>

    {/* Slide counter */}
    <div className="text-center mt-4">
      <span className="text-secondary text-sm">
        {currentSlide + 1} / {slideCount}
      </span>
    </div>
  </div>
);

export default ModalFooter;
