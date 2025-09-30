/**
 * International SEO & Multi-language Support
 * 
 * Implements hreflang tags, geo-targeting, and multi-language SEO
 * for better international search visibility and user experience.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Supported languages and regions
const supportedLocales = [
  { code: 'en-IN', name: 'English (India)', flag: '🇮🇳', currency: 'INR' },
  { code: 'hi-IN', name: 'हिंदी (भारत)', flag: '🇮🇳', currency: 'INR' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸', currency: 'USD' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧', currency: 'GBP' },
  { code: 'en-AU', name: 'English (Australia)', flag: '🇦🇺', currency: 'AUD' },
  { code: 'en-CA', name: 'English (Canada)', flag: '🇨🇦', currency: 'CAD' }
];

// Regional content variations
const regionalContent = {
  'en-IN': {
    currency: 'INR',
    pricePrefix: '₹',
    shipping: 'Free shipping across India',
    availability: 'Available in 500+ cities across India',
    testimonials: 'Indian customer testimonials',
    certifications: ['FSSAI', 'ISO 22000', 'BIS'],
    localBusiness: {
      address: 'Mumbai, Maharashtra, India',
      phone: '+91-98765-43210',
      businessHours: '9:00 AM - 6:00 PM IST'
    }
  },
  'en-US': {
    currency: 'USD',
    pricePrefix: '$',
    shipping: 'Free shipping on orders over $50',
    availability: 'Available nationwide in the US',
    testimonials: 'US customer testimonials',
    certifications: ['FDA Approved', 'USDA Organic', 'Non-GMO'],
    localBusiness: {
      address: 'New York, NY, USA',
      phone: '+1-555-123-4567',
      businessHours: '9:00 AM - 6:00 PM EST'
    }
  },
  'hi-IN': {
    currency: 'INR',
    pricePrefix: '₹',
    shipping: 'भारत भर में मुफ्त शिपिंग',
    availability: 'भारत के 500+ शहरों में उपलब्ध',
    testimonials: 'भारतीय ग्राहक प्रशंसापत्र',
    certifications: ['FSSAI', 'ISO 22000', 'BIS'],
    localBusiness: {
      address: 'मुंबई, महाराष्ट्र, भारत',
      phone: '+91-98765-43210',
      businessHours: 'सुबह 9:00 - शाम 6:00 IST'
    }
  }
};

// Translated content for key pages
const translations = {
  'en-IN': {
    title: 'The Healthy Sugar Company — Premium Stevia Sweeteners | Natural Sugar Alternative',
    description: 'India\'s #1 stevia-based sweeteners in tablets, syrup, powder, and sachets. Zero calories, diabetes-friendly, plant-based sugar alternative starting from ₹299.',
    keywords: ['stevia sweetener India', 'natural sugar alternative', 'diabetes-friendly sweetener'],
    navigation: {
      home: 'Home',
      benefits: 'Benefits',
      products: 'Products',
      science: 'Science',
      contact: 'Contact'
    }
  },
  'hi-IN': {
    title: 'हेल्दी शुगर कंपनी — प्रीमियम स्टीविया स्वीटनर | प्राकृतिक चीनी विकल्प',
    description: 'भारत का #1 स्टीविया-आधारित स्वीटनर टैबलेट, सिरप, पाउडर और सैशे में। शून्य कैलोरी, मधुमेह-अनुकूल, पौधे-आधारित चीनी विकल्प ₹299 से शुरू।',
    keywords: ['स्टीविया स्वीटनर भारत', 'प्राकृतिक चीनी विकल्प', 'मधुमेह-अनुकूल स्वीटनर'],
    navigation: {
      home: 'होम',
      benefits: 'फायदे',
      products: 'उत्पाद',
      science: 'विज्ञान',
      contact: 'संपर्क'
    }
  },
  'en-US': {
    title: 'The Healthy Sugar Company — Premium Stevia Sweeteners | Natural Sugar Alternative',
    description: 'America\'s premium stevia-based sweeteners in tablets, syrup, powder, and sachets. Zero calories, diabetes-friendly, plant-based sugar alternative starting from $12.99.',
    keywords: ['stevia sweetener USA', 'natural sugar alternative', 'diabetes-friendly sweetener'],
    navigation: {
      home: 'Home',
      benefits: 'Benefits',
      products: 'Products',
      science: 'Science',
      contact: 'Contact'
    }
  }
};

interface InternationalSEOProps {
  currentLocale?: string;
  alternateLocales?: string[];
}

export function InternationalSEO({ 
  currentLocale = 'en-IN', 
  alternateLocales = ['en-IN', 'hi-IN', 'en-US'] 
}: InternationalSEOProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Add hreflang tags
    addHreflangTags(pathname, alternateLocales);
    
    // Set language-specific meta tags
    setLanguageMetaTags(currentLocale);
    
    // Configure geo-targeting
    configureGeoTargeting(currentLocale);
    
    return () => {
      // Cleanup hreflang tags
      removeHreflangTags();
    };
  }, [pathname, currentLocale, alternateLocales]);

  return (
    <>
      {/* Hreflang Schema Markup */}
      <HreflangSchema currentLocale={currentLocale} pathname={pathname} />
      
      {/* Regional Business Schema */}
      <RegionalBusinessSchema locale={currentLocale} />
      
      {/* Currency and Regional Indicators */}
      <RegionalIndicators locale={currentLocale} />
    </>
  );
}

function addHreflangTags(pathname: string, locales: string[]) {
  // Remove existing hreflang tags
  removeHreflangTags();
  
  const baseUrl = 'https://healthysugar.com';
  
  locales.forEach(locale => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hrefLang = locale;
    link.href = locale === 'en-IN' 
      ? `${baseUrl}${pathname}` 
      : `${baseUrl}/${locale}${pathname}`;
    link.className = 'hreflang-tag';
    document.head.appendChild(link);
  });
  
  // Add x-default for international targeting
  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hrefLang = 'x-default';
  defaultLink.href = `${baseUrl}${pathname}`;
  defaultLink.className = 'hreflang-tag';
  document.head.appendChild(defaultLink);
}

function removeHreflangTags() {
  const existingTags = document.querySelectorAll('.hreflang-tag');
  existingTags.forEach(tag => tag.remove());
}

function setLanguageMetaTags(locale: string) {
  const translation = translations[locale as keyof typeof translations];
  if (!translation) return;
  
  // Update page title
  document.title = translation.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', translation.description);
  }
  
  // Update language attribute
  document.documentElement.lang = locale.split('-')[0];
  
  // Add content language meta tag
  let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
  if (!contentLanguage) {
    contentLanguage = document.createElement('meta');
    contentLanguage.setAttribute('http-equiv', 'content-language');
    document.head.appendChild(contentLanguage);
  }
  contentLanguage.setAttribute('content', locale);
}

function configureGeoTargeting(locale: string) {
  const region = locale.split('-')[1];
  
  // Add geo meta tags
  let geoRegion = document.querySelector('meta[name="geo.region"]');
  if (!geoRegion) {
    geoRegion = document.createElement('meta');
    geoRegion.setAttribute('name', 'geo.region');
    document.head.appendChild(geoRegion);
  }
  geoRegion.setAttribute('content', region);
  
  // Add geo placename for major cities
  const placenames = {
    'IN': 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad',
    'US': 'New York, Los Angeles, Chicago, Houston, Phoenix',
    'GB': 'London, Manchester, Birmingham, Leeds, Glasgow',
    'AU': 'Sydney, Melbourne, Brisbane, Perth, Adelaide',
    'CA': 'Toronto, Vancouver, Montreal, Calgary, Ottawa'
  };
  
  let geoPlacename = document.querySelector('meta[name="geo.placename"]');
  if (!geoPlacename) {
    geoPlacename = document.createElement('meta');
    geoPlacename.setAttribute('name', 'geo.placename');
    document.head.appendChild(geoPlacename);
  }
  geoPlacename.setAttribute('content', placenames[region as keyof typeof placenames] || '');
}

function HreflangSchema({ currentLocale, pathname }: { currentLocale: string; pathname: string }) {
  const baseUrl = 'https://healthysugar.com';
  
  const alternateUrls = supportedLocales.map(locale => ({
    "@type": "WebPage",
    "@id": locale.code === 'en-IN' 
      ? `${baseUrl}${pathname}` 
      : `${baseUrl}/${locale.code}${pathname}`,
    "inLanguage": locale.code,
    "name": translations[locale.code as keyof typeof translations]?.title || "The Healthy Sugar Company"
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${pathname}`,
    "inLanguage": currentLocale,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "inLanguage": currentLocale
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": alternateUrls.map(url => url["@id"])
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function RegionalBusinessSchema({ locale }: { locale: string }) {
  const regional = regionalContent[locale as keyof typeof regionalContent];
  if (!regional) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "The Healthy Sugar Company",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": regional.localBusiness.address
    },
    "telephone": regional.localBusiness.phone,
    "openingHours": regional.localBusiness.businessHours,
    "currenciesAccepted": regional.currency,
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
    "priceRange": locale.includes('IN') ? "₹299-₹999" : "$12.99-$49.99",
    "areaServed": {
      "@type": "Country",
      "name": locale.includes('IN') ? "India" : 
             locale.includes('US') ? "United States" :
             locale.includes('GB') ? "United Kingdom" :
             locale.includes('AU') ? "Australia" :
             locale.includes('CA') ? "Canada" : "India"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function RegionalIndicators({ locale }: { locale: string }) {
  const regional = regionalContent[locale as keyof typeof regionalContent];
  if (!regional) return null;

  return (
    <div className="hidden" data-regional-content={locale}>
      <span data-currency={regional.currency}>{regional.pricePrefix}</span>
      <span data-shipping>{regional.shipping}</span>
      <span data-availability>{regional.availability}</span>
    </div>
  );
}

// Language Switcher Component
export function LanguageSwitcher({ currentLocale = 'en-IN' }: { currentLocale?: string }) {
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const baseUrl = window.location.origin;
    const newUrl = newLocale === 'en-IN' 
      ? `${baseUrl}${pathname}`
      : `${baseUrl}/${newLocale}${pathname}`;
    
    window.location.href = newUrl;
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-brand transition-colors">
        <span>{supportedLocales.find(l => l.code === currentLocale)?.flag}</span>
        <span>{supportedLocales.find(l => l.code === currentLocale)?.name.split(' ')[0]}</span>
      </button>
      
      <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2 min-w-48">
          {supportedLocales.map(locale => (
            <button
              key={locale.code}
              onClick={() => handleLanguageChange(locale.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                currentLocale === locale.code ? 'bg-brand text-white' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{locale.flag}</span>
              <span>{locale.name}</span>
              <span className="text-xs text-gray-500">({locale.currency})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Regional Price Display Component
export function RegionalPrice({ 
  basePrice, 
  locale = 'en-IN' 
}: { 
  basePrice: number; 
  locale?: string; 
}) {
  const regional = regionalContent[locale as keyof typeof regionalContent];
  if (!regional) return <span>₹{basePrice}</span>;

  // Currency conversion rates (in real app, fetch from API)
  const conversionRates = {
    'INR': 1,
    'USD': 0.012,
    'GBP': 0.0095,
    'AUD': 0.018,
    'CAD': 0.016
  };

  const convertedPrice = Math.round(
    basePrice * (conversionRates[regional.currency as keyof typeof conversionRates] || 1)
  );

  return (
    <span>
      {regional.pricePrefix}{convertedPrice.toLocaleString()}
    </span>
  );
}

// Regional Content Component
export function RegionalContent({ locale = 'en-IN' }: { locale?: string }) {
  const regional = regionalContent[locale as keyof typeof regionalContent];
  const translation = translations[locale as keyof typeof translations];
  
  if (!regional || !translation) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">
          {supportedLocales.find(l => l.code === locale)?.flag}
        </span>
        <h3 className="font-semibold text-blue-800">
          Regional Information
        </h3>
      </div>
      
      <div className="space-y-2 text-sm text-blue-700">
        <p><strong>Shipping:</strong> {regional.shipping}</p>
        <p><strong>Availability:</strong> {regional.availability}</p>
        <p><strong>Certifications:</strong> {regional.certifications.join(', ')}</p>
        <p><strong>Contact:</strong> {regional.localBusiness.phone}</p>
        <p><strong>Business Hours:</strong> {regional.localBusiness.businessHours}</p>
      </div>
    </div>
  );
}
