import React from 'react';
import Image from 'next/image';
import { ProjectSlide } from './types';

// These two assets are logos, not screenshots: contain them instead of cropping.
const CONTAINED_ASSETS = ['aws.svg', 'quality-shield.svg'];

const SlideVisual: React.FC<{ slide: ProjectSlide }> = ({ slide }) => {
  if ((slide.type === 'image' || slide.type === 'mixed') && slide.imageUrl) {
    const isLogo = CONTAINED_ASSETS.some((asset) => slide.imageUrl!.includes(asset));

    return (
      <div className="relative h-full bg-black/20 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent z-10" />
        {isLogo ? (
          <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-contain"
              quality={85}
            />
          </div>
        ) : (
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={85}
          />
        )}
      </div>
    );
  }

  if (slide.type === 'video' && slide.videoUrl) {
    return (
      <div className="relative h-full bg-black/20 rounded-lg overflow-hidden">
        <video src={slide.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return null;
};

export default SlideVisual;
