import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { addResourceHints, preloadCriticalImages, registerServiceWorker } from './lib/performance'

// Add performance optimizations
addResourceHints();

// Preload critical images
preloadCriticalImages();

// Register service worker for caching
registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
