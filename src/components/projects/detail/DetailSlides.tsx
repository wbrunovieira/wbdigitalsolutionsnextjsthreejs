import React from 'react';
import Image from 'next/image';
import type { Project } from '../types';
import BulletList from './BulletList';

type Slide = NonNullable<Project['slides']>[number];

const SlideMedia: React.FC<{ slide: Slide; project: Project }> = ({ slide, project }) => {
  if (slide.type === 'video' && slide.videoUrl) {
    return <video src={slide.videoUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />;
  }

  const image = slide.imageUrl ?? project.imageUrl;
  if (image) {
    return (
      <Image
        src={image}
        alt={slide.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={85}
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary">
      <span className="text-6xl" aria-hidden>{project.icon ?? '🗂️'}</span>
    </div>
  );
};

/** Slides rendered as alternating media/text sections. */
const DetailSlides: React.FC<{ slides: Slide[]; project: Project }> = ({ slides, project }) => (
  <section className="px-6 py-20">
    <div className="container mx-auto max-w-5xl space-y-24">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-custom-purple/30 shadow-xl">
            <SlideMedia slide={slide} project={project} />
          </div>

          <div>
            <span className="font-mono text-xs text-yellowcustom">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">{slide.title}</h2>
            {slide.description?.split('\n\n').map((para) => (
              <p key={para} className="mt-4 text-sm leading-relaxed text-secondary md:text-base">
                {para}
              </p>
            ))}
            {slide.features && slide.features.length > 0 && <BulletList items={slide.features} />}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DetailSlides;
