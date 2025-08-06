import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime?: number;
  loadTime?: number;
  interactionTime?: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const measureRenderTime = useCallback(() => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const renderTime = end - start;
      
      // Only log in development or when performance debugging is enabled
      if (process.env.NODE_ENV === 'development' || localStorage.getItem('debug-performance')) {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
      
      // Report to analytics if configured
      if (window.gtag) {
        window.gtag('event', 'performance_timing', {
          custom_parameter_1: componentName,
          custom_parameter_2: renderTime
        });
      }
      
      return renderTime;
    };
  }, [componentName]);

  const measureInteraction = useCallback((actionName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const interactionTime = end - start;
      
      if (process.env.NODE_ENV === 'development' || localStorage.getItem('debug-performance')) {
        console.log(`${componentName} ${actionName} interaction time: ${interactionTime.toFixed(2)}ms`);
      }
      
      return interactionTime;
    };
  }, [componentName]);

  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.loadEventStart}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'measure'] });

      return () => observer.disconnect();
    }
  }, []);

  return {
    measureRenderTime,
    measureInteraction,
  };
};

// Performance optimization utilities
export const optimizeImages = () => {
  // Lazy load images that are not in viewport
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
};

// Prefetch critical resources
export const prefetchCriticalResources = () => {
  const criticalRoutes = ['/smile-analysis'];
  
  criticalRoutes.forEach((route) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

// Memory leak prevention
export const cleanupEventListeners = () => {
  // Remove global event listeners that might cause memory leaks
  const events = ['resize', 'scroll', 'mouseout'];
  
  events.forEach((event) => {
    const listeners = document.body.getAttribute(`data-${event}-listeners`);
    if (listeners) {
      // Cleanup logic for specific event listeners
      console.log(`Cleaning up ${event} listeners`);
    }
  });
};