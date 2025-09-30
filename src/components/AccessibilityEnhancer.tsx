"use client";

import { useEffect } from 'react';

/**
 * AccessibilityEnhancer Component
 * 
 * Provides comprehensive ARIA and accessibility enhancements for SEO and user experience.
 * This component should be included in the root layout to provide global accessibility features.
 */
export function AccessibilityEnhancer() {
  useEffect(() => {
    // Skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:no-underline';
    skipLink.setAttribute('aria-label', 'Skip navigation and go to main content');
    
    // Insert skip link as first element in body
    if (document.body.firstChild) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    } else {
      document.body.appendChild(skipLink);
    }

    // Add focus management for better keyboard navigation
    const handleFocusManagement = () => {
      // Enhance focus visibility for interactive elements
      const interactiveElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      interactiveElements.forEach((element) => {
        if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
          // Add basic aria-label for elements without proper labeling
          const text = element.textContent?.trim() || element.getAttribute('title') || '';
          if (text) {
            element.setAttribute('aria-label', text);
          }
        }
      });
    };

    // Run focus management after DOM is ready
    setTimeout(handleFocusManagement, 100);

    // Add keyboard navigation enhancements
    const handleKeyboardNavigation = (event: KeyboardEvent) => {
      // Escape key to close modals/menus
      if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
        const openMenus = document.querySelectorAll('[aria-expanded="true"]');
        
        openModals.forEach((modal) => {
          const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]');
          if (closeButton && closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        });

        openMenus.forEach((menu) => {
          if (menu instanceof HTMLElement) {
            menu.click();
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyboardNavigation);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * ARIA Helper Functions for Components
 */
export const ariaHelpers = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,
  
  // Common ARIA attributes for different component types
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    'aria-label': label,
    ...(pressed !== undefined && { 'aria-pressed': pressed }),
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
    role: 'button',
    tabIndex: 0,
  }),
  
  link: (label: string, current?: boolean) => ({
    'aria-label': label,
    ...(current && { 'aria-current': 'page' }),
  }),
  
  heading: (level: number, label?: string) => ({
    role: 'heading',
    'aria-level': level,
    ...(label && { 'aria-label': label }),
  }),
  
  list: (label?: string) => ({
    role: 'list',
    ...(label && { 'aria-label': label }),
  }),
  
  listItem: () => ({
    role: 'listitem',
  }),
  
  navigation: (label: string) => ({
    role: 'navigation',
    'aria-label': label,
  }),
  
  region: (label: string) => ({
    role: 'region',
    'aria-label': label,
  }),
  
  banner: () => ({
    role: 'banner',
  }),
  
  main: () => ({
    role: 'main',
    id: 'main-content',
  }),
  
  contentinfo: () => ({
    role: 'contentinfo',
  }),
  
  dialog: (label: string, describedBy?: string) => ({
    role: 'dialog',
    'aria-label': label,
    'aria-modal': true,
    ...(describedBy && { 'aria-describedby': describedBy }),
  }),
  
  form: (label: string) => ({
    role: 'form',
    'aria-label': label,
  }),
  
  search: (label: string = 'Search') => ({
    role: 'search',
    'aria-label': label,
  }),
  
  status: (label?: string) => ({
    role: 'status',
    'aria-live': 'polite',
    ...(label && { 'aria-label': label }),
  }),
  
  alert: (label?: string) => ({
    role: 'alert',
    'aria-live': 'assertive',
    ...(label && { 'aria-label': label }),
  }),
  
  // For decorative elements that should be hidden from screen readers
  decorative: () => ({
    'aria-hidden': true,
    role: 'presentation',
  }),
  
  // For images
  image: (alt: string, decorative: boolean = false) => ({
    role: decorative ? 'presentation' : 'img',
    'aria-label': decorative ? undefined : alt,
    'aria-hidden': decorative,
  }),
  
  // For loading states
  loading: (label: string = 'Loading content') => ({
    role: 'status',
    'aria-live': 'polite',
    'aria-label': label,
  }),
  
  // For tabs
  tab: (selected: boolean, controls: string, label?: string) => ({
    role: 'tab',
    'aria-selected': selected,
    'aria-controls': controls,
    tabIndex: selected ? 0 : -1,
    ...(label && { 'aria-label': label }),
  }),
  
  tabPanel: (labelledBy: string, hidden: boolean = false) => ({
    role: 'tabpanel',
    'aria-labelledby': labelledBy,
    'aria-hidden': hidden,
    tabIndex: hidden ? -1 : 0,
  }),
  
  tabList: (label: string) => ({
    role: 'tablist',
    'aria-label': label,
  }),
};

/**
 * SEO-focused ARIA attributes for common e-commerce elements
 */
export const ecommerceAria = {
  productCard: (productName: string, price: string) => ({
    role: 'article',
    'aria-label': `${productName} - ${price}`,
  }),
  
  addToCart: (productName: string) => ({
    'aria-label': `Add ${productName} to shopping cart`,
    role: 'button',
  }),
  
  priceDisplay: (price: string, originalPrice?: string) => ({
    'aria-label': originalPrice 
      ? `Current price ${price}, was ${originalPrice}` 
      : `Price ${price}`,
  }),
  
  rating: (rating: number, maxRating: number = 5) => ({
    role: 'img',
    'aria-label': `Rated ${rating} out of ${maxRating} stars`,
  }),
  
  quantitySelector: (current: number, product: string) => ({
    'aria-label': `Quantity of ${product}, currently ${current}`,
    role: 'spinbutton',
    'aria-valuemin': 1,
    'aria-valuenow': current,
  }),
  
  cartSummary: (itemCount: number, total: string) => ({
    role: 'region',
    'aria-label': `Shopping cart summary: ${itemCount} items, total ${total}`,
  }),
  
  breadcrumb: () => ({
    role: 'navigation',
    'aria-label': 'Breadcrumb navigation',
  }),
  
  productGallery: (currentImage: number, totalImages: number) => ({
    role: 'region',
    'aria-label': `Product image gallery, showing image ${currentImage} of ${totalImages}`,
  }),
  
  filterSection: (filterType: string) => ({
    role: 'region',
    'aria-label': `${filterType} filter options`,
  }),
  
  searchResults: (resultCount: number, query?: string) => ({
    role: 'region',
    'aria-label': query 
      ? `Search results for "${query}": ${resultCount} products found`
      : `${resultCount} products found`,
    'aria-live': 'polite',
  }),
};

/**
 * Utility function to combine ARIA attributes
 */
export const combineAria = (...ariaObjects: Array<Record<string, any>>) => {
  return ariaObjects.reduce((combined, current) => ({ ...combined, ...current }), {});
};
