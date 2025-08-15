import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
}) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate blur placeholder for images without one
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

  if (!isInView && !priority) {
    return (
      <div 
        ref={imgRef} 
        className={`${className} bg-gray-800/20 animate-pulse`}
        style={{ width, height }}
      />
    );
  }

  // Use Next.js Image for automatic optimization
  if (width && height) {
    return (
      <div ref={imgRef}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          className={className}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          onLoad={onLoad}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  // For responsive images
  return (
    <div ref={imgRef} className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        quality={quality}
        priority={priority}
        className={className}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoad={onLoad}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

// Progressive video loading component with automatic optimization
export const OptimizedVideo: React.FC<{
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  quality?: 'low' | 'optimized' | 'auto';
}> = ({ src, poster, className = '', autoPlay = false, muted = true, loop = true, playsInline = true, quality = 'auto' }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return (
      <div 
        ref={videoRef} 
        className={`${className} bg-gray-800/20 animate-pulse`}
      />
    );
  }

  // Automatically select best video version based on quality setting
  const getOptimizedSrc = () => {
    // If already optimized, use as is
    if (src.includes('_optimized') || src.includes('_lowbitrate')) {
      return src;
    }
    
    // Choose quality based on setting or connection
    if (quality === 'low') {
      return src.replace('.mp4', '_lowbitrate.mp4');
    } else if (quality === 'optimized') {
      return src.replace('.mp4', '_optimized.mp4');
    } else {
      // Auto: check connection speed (if available)
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType) {
          // Use low quality for slow connections
          if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return src.replace('.mp4', '_lowbitrate.mp4');
          }
        }
      }
      // Default to optimized version
      return src.replace('.mp4', '_optimized.mp4');
    }
  };
  
  const optimizedSrc = getOptimizedSrc();

  return (
    <div ref={videoRef}>
      <video
        poster={poster}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="metadata"
        onError={(e) => {
          // Try fallback versions
          const video = e.currentTarget;
          const currentSrc = video.src;
          
          if (currentSrc.includes('_lowbitrate')) {
            // Try optimized version
            video.src = src.replace('.mp4', '_optimized.mp4');
          } else if (currentSrc.includes('_optimized')) {
            // Fall back to original
            video.src = src;
          }
        }}
      >
        {/* Provide multiple sources for better compatibility */}
        <source src={optimizedSrc} type="video/mp4" />
        <source src={src.replace('.mp4', '_optimized.mp4')} type="video/mp4" />
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};