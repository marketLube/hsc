import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - The Healthy Sugar Company | Get in Touch",
  description: "Contact The Healthy Sugar Company for questions about our natural stevia sweeteners. Multiple ways to reach us including email, phone, and visit our headquarters.",
  keywords: [
    "contact healthy sugar company",
    "stevia customer support",
    "natural sweetener questions",
    "healthy sugar contact",
    "stevia company contact",
    "customer service",
    "product support",
    "natural sweetener help"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Contact Us - The Healthy Sugar Company",
    description: "Get in touch with The Healthy Sugar Company. We're here to help with questions about our natural stevia sweeteners and healthy sugar alternatives.",
    url: "https://healthysugar.com/contact",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact The Healthy Sugar Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - The Healthy Sugar Company",
    description: "Get in touch with The Healthy Sugar Company. We're here to help with questions about our natural stevia sweeteners.",
    images: ["/images/og/contact-og.jpg"],
    creator: "@healthysugarco",
  },
  alternates: {
    canonical: "https://healthysugar.com/contact",
  },
  other: {
    "contact:phone_number": "+1-555-123-4567",
    "contact:email": "hello@healthysugar.com",
    "contact:address": "123 Health Street, Wellness City, WC 12345",
    "business:hours": "Monday-Friday 9AM-6PM, Saturday 10AM-4PM",
  },
};

// Structured Data for Contact Page
const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "The Healthy Sugar Company",
    "url": "https://healthysugar.com",
    "logo": "https://healthysugar.com/brand/logo.svg",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "availableLanguage": "English",
        "hoursAvailable": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "16:00"
          }
        ]
      },
      {
        "@type": "ContactPoint",
        "email": "hello@healthysugar.com",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Health Street",
      "addressLocality": "Wellness City",
      "addressRegion": "WC",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "foundingDate": "2018",
    "numberOfEmployees": "50-100",
    "industry": "Food & Beverage",
    "description": "Leading manufacturer of natural stevia-based sweeteners and healthy sugar alternatives.",
    "sameAs": [
      "https://facebook.com/healthysugarco",
      "https://twitter.com/healthysugarco",
      "https://instagram.com/healthysugarco",
      "https://linkedin.com/company/healthy-sugar-company"
    ]
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      {children}
    </>
  );
}
