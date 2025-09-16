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
          viewLive: 'Ver Projeto',
          viewCode: 'Ver Código',
          features: 'Recursos',
          technologies: 'Tecnologias',
          next: 'Próximo',
          previous: 'Anterior',
        };
      case 'es':
        return {
          close: 'Cerrar',
          viewLive: 'Ver Proyecto',
          viewCode: 'Ver Código',
          features: 'Características',
          technologies: 'Tecnologías',
          next: 'Siguiente',
          previous: 'Anterior',
        };
      case 'it':
        return {
          close: 'Chiudi',
          viewLive: 'Vedi Progetto',
          viewCode: 'Vedi Codice',
          features: 'Caratteristiche',
          technologies: 'Tecnologie',
          next: 'Prossimo',
          previous: 'Precedente',
        };
      default:
        return {
          close: 'Close',
          viewLive: 'View Live',
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
            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-primary via-primary/95 to-custom-purple/20 rounded-2xl overflow-hidden border border-custom-purple/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-custom-purple/30 bg-primary/50 backdrop-blur">
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-secondary text-sm">{project.category.toUpperCase()}</span>
                <div className="flex gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-custom-purple/20 text-secondary rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                aria-label={content.close}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Slide Content */}
            <div className="relative h-[60vh] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="h-full p-8"
                >
                  {/* Slide Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentSlideData.title}
                  </h3>

                  {/* Content based on type */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-4rem)]">
                    {/* Visual Content (Image/Video) */}
                    {(currentSlideData.type === 'image' || currentSlideData.type === 'mixed') && currentSlideData.imageUrl && (
                      <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent z-10" />
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="text-6xl opacity-50">📸</div>
                          {/* Replace with actual image when available */}
                          {/* <Image
                            src={currentSlideData.imageUrl}
                            alt={currentSlideData.title}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                      </div>
                    )}

                    {currentSlideData.type === 'video' && currentSlideData.videoUrl && (
                      <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                        <video
                          src={currentSlideData.videoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="flex flex-col justify-center space-y-4">
                      {currentSlideData.description && (
                        <p className="text-secondary text-lg leading-relaxed">
                          {currentSlideData.description}
                        </p>
                      )}

                      {currentSlideData.features && currentSlideData.features.length > 0 && (
                        <div>
                          <h4 className="text-white font-semibold mb-3">{content.features}:</h4>
                          <ul className="space-y-2">
                            {currentSlideData.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellowcustom mt-1">•</span>
                                <span className="text-secondary">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary to-transparent">
              <div className="flex items-center justify-between">
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

                {/* Navigation Buttons */}
                <div className="flex gap-4">
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gradient-to-r from-custom-purple to-primary hover:from-custom-purple/90 hover:to-primary/90 text-white rounded-lg font-semibold transition-all shadow-lg"
                    >
                      {content.viewLive}
                    </a>
                  )}
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