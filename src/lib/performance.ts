// Performance optimization utilities

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload critical images
export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/src/assets/dental-ai-hero.jpg',
    // Add other critical images here
  ];

  try {
    await Promise.allSettled(
      criticalImages.map(src => preloadImage(src))
    );
  } catch (error) {
    console.warn('Failed to preload some images:', error);
  }
};

// Resource hint utilities
export const addResourceHints = () => {
  // Add preconnect hints for external domains
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://api.supabase.co' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      if (key === 'crossorigin') {
        link.setAttribute(key, '');
      } else {
        link.setAttribute(key, value);
      }
    });
    document.head.appendChild(link);
  });
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memory management utilities
export const cleanupResources = () => {
  // Clear any stored data that's no longer needed
  if (typeof window !== 'undefined') {
    // Clear any cached data
    sessionStorage.clear();
    // Clear any stored images that might be taking up memory
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lazy === 'true') {
        img.src = '';
      }
    });
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
};

// Bundle size optimization helpers
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isProduction = () => process.env.NODE_ENV === 'production';

// Cache management
export const cacheKey = (key: string, version: string = '1.0') => 
  `${key}_v${version}`;

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && isProduction()) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};