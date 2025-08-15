import imageMapping from '../../image-mapping.json';

// Helper to get optimized image path with fallback
export function getOptimizedImagePath(originalPath: string): string {
  // If already pointing to optimized folder, return as is
  if (originalPath.includes('/optimized/')) {
    return originalPath;
  }
  
  // Check if we have an optimized version
  const optimizedPath = (imageMapping as Record<string, string>)[originalPath];
  
  if (optimizedPath) {
    return optimizedPath;
  }
  
  // Try with /img/ prefix if not found
  if (!originalPath.startsWith('/img/')) {
    const withPrefix = `/img/${originalPath}`;
    const optimizedWithPrefix = (imageMapping as Record<string, string>)[withPrefix];
    if (optimizedWithPrefix) {
      return optimizedWithPrefix;
    }
  }
  
  // If no optimized version exists, return original
  return originalPath;
}

// Component for responsive optimized images with fallback
export function getImageSrcSet(imagePath: string): {
  src: string;
  fallback?: string;
} {
  const optimized = getOptimizedImagePath(imagePath);
  
  // If it's a WebP image, provide the original as fallback
  if (optimized.endsWith('.webp') && !imagePath.endsWith('.webp')) {
    return {
      src: optimized,
      fallback: imagePath
    };
  }
  
  return { src: optimized };
}

// Preload critical images
export function preloadImage(imagePath: string): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImagePath(imagePath);
    link.type = 'image/webp';
    document.head.appendChild(link);
  }
}

// Check WebP support
export function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(true); // Assume support on server
      return;
    }
    
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}