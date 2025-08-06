import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { prefetchCriticalResources, optimizeImages } from './hooks/usePerformanceMonitor'

// Performance monitoring
const startTime = performance.now();

// Initialize performance optimizations
const initializeOptimizations = () => {
  // Prefetch critical resources
  prefetchCriticalResources();
  
  // Optimize images on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeImages);
  } else {
    optimizeImages();
  }
  
  // Report initial load performance
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
    
    // Report Core Web Vitals if available (optional import)
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }).catch(() => {
        console.log('Web Vitals not available');
      });
    } catch (error) {
      console.log('Web Vitals import failed:', error);
    }
  });
};

// Error boundary for performance monitoring
const handleError = (error: Error, errorInfo: any) => {
  console.error('Performance: Unhandled error', error, errorInfo);
  
  // Report to monitoring service if available
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false
    });
  }
};

// Initialize optimizations
initializeOptimizations();

// Enhanced root rendering with error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Render with error boundary
try {
  root.render(<App />);
} catch (error) {
  handleError(error as Error, { component: 'App' });
  // Fallback UI
  rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Something went wrong. Please refresh the page.</div>';
}
