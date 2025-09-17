import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectSlide {
  type: 'image' | 'video' | 'mixed';
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    category: string;
    slides?: ProjectSlide[];
    liveUrl?: string;
    githubUrl?: string;
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  // Default slides if none provided
  const defaultSlides: ProjectSlide[] = [
    {
      type: 'mixed',
      title: 'Overview',
      description: project.description,
      imageUrl: '/images/placeholder.jpg',
      features: project.technologies
    }
  ];

  const slides = project.slides || defaultSlides;

  const getContent = () => {
    switch(language) {
      case 'pt-BR':
        return {
          close: 'Fechar',
          viewLive: 'Saber Mais',
          viewCode: 'Ver Código',
          features: 'Recursos',
          technologies: 'Tecnologias',
          next: 'Próximo',
          previous: 'Anterior',
        };
      case 'es':
        return {
          close: 'Cerrar',
          viewLive: 'Saber Más',
          viewCode: 'Ver Código',
          features: 'Características',
          technologies: 'Tecnologías',
          next: 'Siguiente',
          previous: 'Anterior',
        };
      case 'it':
        return {
          close: 'Chiudi',
          viewLive: 'Scopri di Più',
          viewCode: 'Vedi Codice',
          features: 'Caratteristiche',
          technologies: 'Tecnologie',
          next: 'Prossimo',
          previous: 'Precedente',
        };
      default:
        return {
          close: 'Close',
          viewLive: 'Learn More',
          viewCode: 'View Code',
          features: 'Features',
          technologies: 'Technologies',
          next: 'Next',
          previous: 'Previous',
        };
    }
  };

  const content = getContent();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('keydown', handleArrows);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', handleArrows);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
            {/* Header */}
            <div className="relative p-4 md:p-6 border-b border-custom-purple/30 bg-primary/50 backdrop-blur">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 pr-10">{project.title}</h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="text-secondary text-xs md:text-sm">{project.category.toUpperCase()}</span>
                <div className="flex gap-1 md:gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-custom-purple/20 text-secondary rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors"
                aria-label={content.close}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

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
                  {/* Slide Title - Hidden on mobile, shown in header area */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 lg:hidden">
                    {currentSlideData.title}
                  </h3>
                  <h3 className="hidden lg:block text-2xl font-bold text-white mb-4">
                    {currentSlideData.title}
                  </h3>

                  {/* Content based on type - Stack on mobile, side-by-side on desktop */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-8 flex-1 min-h-0">
                    {/* Visual Content (Image/Video) with Navigation */}
                    <div className="relative h-[200px] md:h-[250px] lg:h-[200px]">
                      {(currentSlideData.type === 'image' || currentSlideData.type === 'mixed') && currentSlideData.imageUrl && (
                        <div className="relative h-full bg-black/20 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent z-10" />
                          {/* Special handling for SVG logos */}
                          {(currentSlideData.imageUrl.includes('aws.svg') || currentSlideData.imageUrl.includes('quality-shield.svg')) ? (
                            <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
                              <Image
                                src={currentSlideData.imageUrl}
                                alt={currentSlideData.title}
                                fill
                                sizes="(max-width: 768px) 80vw, 40vw"
                                className="object-contain"
                                quality={85}
                              />
                            </div>
                          ) : (
                            <Image
                              src={currentSlideData.imageUrl}
                              alt={currentSlideData.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              quality={85}
                            />
                          )}
                        </div>
                      )}

                      {currentSlideData.type === 'video' && currentSlideData.videoUrl && (
                        <div className="relative h-full bg-black/20 rounded-lg overflow-hidden">
                          <video
                            src={currentSlideData.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Navigation Buttons - Below the image on desktop only */}
                      <div className="hidden lg:flex gap-4 mt-4 justify-center">
                        <button
                          onClick={handlePrevious}
                          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                          aria-label={content.previous}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                          aria-label={content.next}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons for Mobile - Between image and text */}
                    <div className="flex lg:hidden gap-4 justify-center my-3">
                      <button
                        onClick={handlePrevious}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                        aria-label={content.previous}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                        aria-label={content.next}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Text Content with custom scroll */}
                    <div className="h-[calc(100vh-600px)] md:h-[calc(100vh-520px)] lg:h-[400px] overflow-y-auto custom-scrollbar pr-2 md:pr-3 lg:pr-4 pb-20 md:pb-16 lg:pb-24">
                      <div className="space-y-3 md:space-y-4">
                        {currentSlideData.description && (
                          <p className="text-secondary text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
                            {currentSlideData.description}
                          </p>
                        )}

                        {currentSlideData.features && currentSlideData.features.length > 0 && (
                          <div>
                            <h4 className="text-white font-semibold text-sm md:text-base mb-2 md:mb-3">{content.features}:</h4>
                            <ul className="space-y-1.5 md:space-y-2">
                              {currentSlideData.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-yellowcustom mt-0.5 md:mt-1 flex-shrink-0 text-sm md:text-base">•</span>
                                  <span className="text-secondary text-sm md:text-base">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-primary via-primary/95 to-transparent pointer-events-none">
              <div className="flex items-center justify-between pointer-events-auto">
                {/* Slide Indicators */}
                <div className="flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-yellowcustom'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
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
                  {currentSlide + 1} / {slides.length}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;