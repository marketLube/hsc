/**
 * Advanced Analytics & Conversion Optimization
 * 
 * Implements comprehensive tracking for SEO performance, user behavior,
 * and conversion optimization to improve search rankings through user signals.
 */

"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 Enhanced Ecommerce Events
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
}

export function AdvancedAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState({
    startTime: Date.now(),
    pageViews: 0,
    scrollDepth: 0,
    timeOnPage: 0,
    interactions: 0
  });

  useEffect(() => {
    // Initialize Google Analytics 4
    initializeGA4();
    
    // Track page view
    trackPageView();
    
    // Setup scroll tracking
    setupScrollTracking();
    
    // Setup engagement tracking
    setupEngagementTracking();
    
    // Setup conversion tracking
    setupConversionTracking();
    
    // Setup Core Web Vitals tracking
    setupCoreWebVitalsTracking();
    
    // Setup search tracking
    setupSearchTracking();
    
    return () => {
      // Cleanup event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, searchParams]);

  const initializeGA4 = () => {
    if (typeof window === 'undefined') return;
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
      content_group1: getContentGroup(),
      custom_map: {
        'custom_parameter_1': 'user_type',
        'custom_parameter_2': 'content_category'
      }
    });
  };

  const trackPageView = () => {
    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      content_group1: getContentGroup(),
      content_group2: getPageType(),
      user_engagement: 'page_view'
    };

    sendAnalyticsEvent({
      event: 'page_view',
      custom_parameters: pageData
    });

    // Track page performance
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        sendAnalyticsEvent({
          event: 'page_performance',
          event_category: 'Performance',
          value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          custom_parameters: {
            dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            connect_time: Math.round(navigation.connectEnd - navigation.connectStart),
            response_time: Math.round(navigation.responseEnd - navigation.responseStart),
            dom_load_time: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)
          }
        });
      }
    }
  };

  const setupScrollTracking = () => {
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);
      
      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          sendAnalyticsEvent({
            event: 'scroll',
            event_category: 'Engagement',
            event_label: `${milestone}%`,
            value: milestone
          });
        }
      });

      setSessionData(prev => ({ ...prev, scrollDepth: maxScroll }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  const setupEngagementTracking = () => {
    let startTime = Date.now();
    let isEngaged = false;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementText = target.textContent?.substring(0, 100) || '';
      const elementClass = target.className;

      sendAnalyticsEvent({
        event: 'click',
        event_category: 'Engagement',
        event_label: `${elementType}: ${elementText}`,
        custom_parameters: {
          element_type: elementType,
          element_class: elementClass,
          click_text: elementText
        }
      });

      setSessionData(prev => ({ ...prev, interactions: prev.interactions + 1 }));
      
      // Track specific interactions
      if (target.matches('button, a, [role="button"]')) {
        sendAnalyticsEvent({
          event: 'cta_click',
          event_category: 'Conversion',
          event_label: elementText,
          custom_parameters: {
            cta_type: elementType,
            cta_position: getElementPosition(target)
          }
        });
      }
    };

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      sendAnalyticsEvent({
        event: 'session_end',
        event_category: 'Engagement',
        value: Math.round(timeOnPage / 1000),
        custom_parameters: {
          time_on_page: Math.round(timeOnPage / 1000),
          scroll_depth: sessionData.scrollDepth,
          interactions: sessionData.interactions,
          engaged_session: timeOnPage > 10000 && sessionData.scrollDepth > 50
        }
      });
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Track engaged sessions
    setTimeout(() => {
      if (!isEngaged) {
        isEngaged = true;
        sendAnalyticsEvent({
          event: 'engaged_session',
          event_category: 'Engagement',
          value: 1
        });
      }
    }, 10000); // 10 seconds
  };

  const setupConversionTracking = () => {
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        const formName = form.getAttribute('name') || form.id || 'unknown_form';
        sendConversionEvent({
          event_name: 'form_submit',
          custom_parameters: {
            form_name: formName,
            form_location: pathname
          }
        });
      });
    });

    // Track newsletter signups
    const newsletterForms = document.querySelectorAll('[data-newsletter-form]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', () => {
        sendConversionEvent({
          event_name: 'newsletter_signup',
          value: 5, // Assign value to newsletter signup
          custom_parameters: {
            signup_location: pathname
          }
        });
      });
    });

    // Track product interactions
    const productCards = document.querySelectorAll('[data-product-id]');
    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        const productName = card.querySelector('h3')?.textContent || 'Unknown Product';
        
        sendAnalyticsEvent({
          event: 'select_item',
          event_category: 'Ecommerce',
          custom_parameters: {
            item_id: productId,
            item_name: productName,
            content_type: 'product'
          }
        });
      });
    });
  };

  const setupCoreWebVitalsTracking = () => {
    if ('web-vitals' in window) {
      // This would integrate with the web-vitals library
      // Already implemented in PerformanceOptimizer component
    }
  };

  const setupSearchTracking = () => {
    // Track internal site searches
    const searchForms = document.querySelectorAll('[data-search-form]');
    searchForms.forEach(form => {
      form.addEventListener('submit', (event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const searchTerm = formData.get('q') || formData.get('search') || '';
        
        sendAnalyticsEvent({
          event: 'search',
          event_category: 'Site Search',
          event_label: searchTerm.toString(),
          custom_parameters: {
            search_term: searchTerm.toString(),
            search_location: pathname
          }
        });
      });
    });
  };

  const sendAnalyticsEvent = (eventData: AnalyticsEvent) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', eventData.event, {
      event_category: eventData.event_category,
      event_label: eventData.event_label,
      value: eventData.value,
      ...eventData.custom_parameters
    });
  };

  const sendConversionEvent = (eventData: ConversionEvent) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', eventData.event_name, {
      currency: eventData.currency || 'INR',
      value: eventData.value,
      items: eventData.items,
      ...eventData
    });
  };

  const getContentGroup = () => {
    if (pathname.includes('/articles/')) return 'Blog';
    if (pathname.includes('/benefits')) return 'Benefits';
    if (pathname.includes('/products')) return 'Products';
    if (pathname.includes('/compare')) return 'Comparison';
    if (pathname.includes('/faq')) return 'Support';
    return 'General';
  };

  const getPageType = () => {
    if (pathname === '/') return 'Homepage';
    if (pathname.includes('/articles/')) return 'Article';
    if (pathname.includes('/product/')) return 'Product';
    return 'Page';
  };

  const getElementPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (rect.top < viewportHeight * 0.5) return 'above_fold';
    if (rect.top < viewportHeight) return 'below_fold';
    return 'far_below_fold';
  };

  return null; // This component doesn't render anything
}

// Heat mapping and user behavior tracking
export function HeatmapTracking() {
  useEffect(() => {
    // Initialize heatmap tracking (would integrate with Hotjar, Crazy Egg, etc.)
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://static.hotjar.com/c/hotjar-SITE_ID.js?sv=6';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

// A/B Testing component
export function ABTestingProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Simple A/B testing logic
    const savedVariant = localStorage.getItem('ab_test_variant');
    if (savedVariant) {
      setVariant(savedVariant as 'A' | 'B');
    } else {
      const newVariant = Math.random() < 0.5 ? 'A' : 'B';
      setVariant(newVariant);
      localStorage.setItem('ab_test_variant', newVariant);
      
      // Track A/B test assignment
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assignment', {
          event_category: 'Experiment',
          event_label: `Variant ${newVariant}`,
          custom_parameters: {
            experiment_id: 'homepage_cta_test',
            variant: newVariant
          }
        });
      }
    }
  }, []);

  return (
    <div data-ab-variant={variant}>
      {children}
    </div>
  );
}

// Conversion rate optimization utilities
export const CROUtils = {
  trackConversion: (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'CRO',
        event_label: conversionType,
        value: value,
        send_to: 'GA_CONVERSION_ID'
      });
    }
  },

  trackMicroConversion: (action: string, category: string = 'Micro Conversion') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        value: 1
      });
    }
  },

  optimizeForMobileConversions: () => {
    // Mobile-specific conversion optimizations
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Track mobile-specific events
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'mobile_user', {
          event_category: 'Device',
          custom_parameters: {
            screen_size: `${window.innerWidth}x${window.innerHeight}`,
            user_agent: navigator.userAgent
          }
        });
      }
    }
  }
};
