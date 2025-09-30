// Service Worker for The Healthy Sugar Company
// Implements caching strategies for better performance and offline functionality

const CACHE_NAME = 'healthy-sugar-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
const IMAGE_CACHE = 'images-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/benefits',
  '/compare',
  '/faq',
  '/manifest.json',
  '/brand/logo.svg',
  '/images/hero-1.png',
  '/images/hero-2.png',
  '/images/hero-3.png'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: [
    '/brand/',
    '/icons/',
    '/_next/static/'
  ],
  
  // Network first for dynamic content
  dynamic: [
    '/api/',
    '/articles/',
    '/product/'
  ],
  
  // Cache first for images with fallback
  images: [
    '/images/',
    '/og/'
  ]
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Determine cache strategy based on URL
    if (isStaticAsset(pathname)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    } else if (isImage(pathname)) {
      return await cacheFirstStrategy(request, IMAGE_CACHE);
    } else if (isDynamicContent(pathname)) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    } else {
      // Default: Network first with cache fallback
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    }
  } catch (error) {
    console.error('Service Worker: Fetch error', error);
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      return await caches.match('/') || new Response('Offline', { status: 503 });
    }
    
    // Return cached version or error
    return await caches.match(request) || new Response('Resource not available offline', { status: 503 });
  }
}

// Cache first strategy - good for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Update cache in background
    fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {
      // Ignore network errors for background updates
    });
    
    return cached;
  }
  
  // Fetch from network and cache
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Network first strategy - good for dynamic content
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Utility functions to determine cache strategy
function isStaticAsset(pathname) {
  return CACHE_STRATEGIES.static.some(pattern => pathname.startsWith(pattern));
}

function isImage(pathname) {
  return CACHE_STRATEGIES.images.some(pattern => pathname.startsWith(pattern)) ||
         /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(pathname);
}

function isDynamicContent(pathname) {
  return CACHE_STRATEGIES.dynamic.some(pattern => pathname.startsWith(pattern));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignup());
  } else if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncNewsletterSignup() {
  try {
    // Get pending newsletter signups from IndexedDB
    const pendingSignups = await getPendingNewsletterSignups();
    
    for (const signup of pendingSignups) {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup.data)
        });
        
        if (response.ok) {
          await removePendingSignup(signup.id);
          console.log('Newsletter signup synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync newsletter signup:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function syncContactForm() {
  try {
    // Get pending contact forms from IndexedDB
    const pendingForms = await getPendingContactForms();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removePendingForm(form.id);
          console.log('Contact form synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications for updates
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New updates available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Updates',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('The Healthy Sugar Company', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Placeholder functions for IndexedDB operations
// These would be implemented with actual IndexedDB code
async function getPendingNewsletterSignups() {
  // Implementation would use IndexedDB to get pending signups
  return [];
}

async function removePendingSignup(id) {
  // Implementation would remove the signup from IndexedDB
  console.log('Removing pending signup:', id);
}

async function getPendingContactForms() {
  // Implementation would use IndexedDB to get pending forms
  return [];
}

async function removePendingForm(id) {
  // Implementation would remove the form from IndexedDB
  console.log('Removing pending form:', id);
}

// Cache size management
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // Remove oldest items
    const itemsToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(
      itemsToDelete.map(key => cache.delete(key))
    );
  }
}

// Periodic cache cleanup
setInterval(() => {
  limitCacheSize(DYNAMIC_CACHE, 50);
  limitCacheSize(IMAGE_CACHE, 100);
}, 60000); // Run every minute
