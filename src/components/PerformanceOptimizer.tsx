"use client";

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance Optimizer Component
 * 
 * Implements Core Web Vitals monitoring and optimization for better SEO rankings.
 * Google uses Core Web Vitals as a ranking factor since 2021.
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const sendToAnalytics = (metric: any) => {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Send to console for development
      console.log('Core Web Vital:', metric.name, metric.value);
    };

    // Measure all Core Web Vitals
    onCLS(sendToAnalytics);  // Cumulative Layout Shift
    onINP(sendToAnalytics);  // Interaction to Next Paint (replaced FID)
    onFCP(sendToAnalytics);  // First Contentful Paint
    onLCP(sendToAnalytics);  // Largest Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLinks: Array<{href: string; as: string; type: string; crossorigin?: string}> = [];

      fontLinks.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font.href;
        link.as = font.as;
        link.type = font.type;
        link.crossOrigin = font.crossorigin;
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = [
        '/images/hero-1.png',
        '/images/hero-2.png',
        '/brand/logo.svg',
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      ];

      hints.forEach(hint => {
        const existing = document.querySelector(`link[href="${hint.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
          document.head.appendChild(link);
        }
      });
    };

    // Optimize images for better LCP
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Reduce layout shift
    const preventLayoutShift = () => {
      // Add aspect ratio containers for images
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const container = img.parentElement;
        if (container && !container.style.aspectRatio) {
          // Set default aspect ratio to prevent CLS
          container.style.aspectRatio = '16/9';
          container.style.overflow = 'hidden';
        }
      });

      // Ensure fonts don't cause layout shift
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }
    };

    // Execute optimizations
    preloadCriticalResources();
    addResourceHints();
    optimizeImages();
    preventLayoutShift();

    // Service Worker registration for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

  }, []);

  return null; // This component doesn't render anything
}

/**
 * Image Optimization Component
 * Provides optimized image loading with WebP support and lazy loading
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  className = '',
  sizes = '100vw'
}: OptimizedImageProps) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
}

/**
 * Critical CSS Inliner
 * Inlines critical CSS to improve First Contentful Paint
 */
export function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .brand-logo {
          width: 2rem;
          height: 2rem;
          background-color: #e7404a;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-primary {
          background-color: #e7404a;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        
        .btn-primary:hover {
          background-color: #d63384;
          transform: translateY(-1px);
        }
        
        /* Prevent layout shift */
        .lazy {
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .lazy.loaded {
          opacity: 1;
        }
        
        /* Font loading optimization */
        .fonts-loading {
          visibility: hidden;
        }
        
        .fonts-loaded {
          visibility: visible;
        }
      `
    }} />
  );
}
