import React from 'react';
import styles from '../ProjectModal.module.css';
import { ModalContent, ProjectSlide } from './types';

const SlideText: React.FC<{ slide: ProjectSlide; content: ModalContent }> = ({ slide, content }) => (
  <div className={`h-[calc(100vh-600px)] md:h-[calc(100vh-520px)] lg:h-[400px] overflow-y-auto ${styles.customScrollbar} pr-2 md:pr-3 lg:pr-4 pb-20 md:pb-16 lg:pb-24`}>
    <div className="space-y-3 md:space-y-4">
      {slide.description && (
        <p className="text-secondary text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
          {slide.description}
        </p>
      )}

      {slide.features && slide.features.length > 0 && (
        <div>
          <h4 className="text-white font-semibold text-sm md:text-base mb-2 md:mb-3">{content.features}:</h4>
          <ul className="space-y-1.5 md:space-y-2">
            {slide.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="text-yellowcustom mt-0.5 md:mt-1 flex-shrink-0 text-sm md:text-base" aria-hidden="true">•</span>
                <span className="text-secondary text-sm md:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default SlideText;
