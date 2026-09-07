import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ModalFooter from './modal/ModalFooter';
import ModalHeader from './modal/ModalHeader';
import SlideNav from './modal/SlideNav';
import SlideText from './modal/SlideText';
import SlideVisual from './modal/SlideVisual';
import { getModalContent } from './modal/modalContent';
import { ModalProject, ProjectSlide } from './modal/types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ModalProject;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  // Default slide if the project ships none.
  const defaultSlides: ProjectSlide[] = [
    {
      type: 'mixed',
      title: 'Overview',
      description: project.description,
      imageUrl: '/images/placeholder.jpg',
      features: project.technologies,
    },
  ];

  const slides = project.slides || defaultSlides;
  const content = getModalContent(language);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleNext, handlePrevious]);

  if (!isOpen) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-[calc(100vw-2rem)] md:max-w-5xl lg:max-w-6xl max-h-[85vh] md:max-h-[90vh] bg-gradient-to-br from-primary via-primary/95 to-custom-purple/20 rounded-xl md:rounded-2xl overflow-hidden border border-custom-purple/30 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader project={project} content={content} onClose={onClose} />

            {/* Slide Content */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col p-4 md:p-6 lg:p-8"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 lg:hidden">
                    {currentSlideData.title}
                  </h3>
                  <h3 className="hidden lg:block text-2xl font-bold text-white mb-4">
                    {currentSlideData.title}
                  </h3>

                  {/* Stack on mobile, side-by-side on desktop */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-8 flex-1 min-h-0">
                    <div className="relative h-[200px] md:h-[250px] lg:h-[200px]">
                      <SlideVisual slide={currentSlideData} />
                      <SlideNav variant="desktop" content={content} onPrevious={handlePrevious} onNext={handleNext} />
                    </div>

                    <SlideNav variant="mobile" content={content} onPrevious={handlePrevious} onNext={handleNext} />

                    <SlideText slide={currentSlideData} content={content} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <ModalFooter
              project={project}
              content={content}
              slideCount={slides.length}
              currentSlide={currentSlide}
              onSelectSlide={setCurrentSlide}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
