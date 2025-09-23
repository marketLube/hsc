import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - The Healthy Sugar Company | Our Story & Mission",
  description: "Learn about The Healthy Sugar Company's journey since 2018. Discover our mission to revolutionize health through natural stevia sweeteners and our commitment to quality.",
  keywords: [
    "about healthy sugar company",
    "stevia company story",
    "natural sweetener mission",
    "healthy sugar history",
    "stevia company values",
    "natural sweetener company",
    "health food company",
    "stevia manufacturer story"
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
    title: "About Us - The Healthy Sugar Company",
    description: "Discover our story, mission, and commitment to revolutionizing health through natural stevia sweeteners since 2018.",
    url: "https://healthysugar.com/about",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About The Healthy Sugar Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - The Healthy Sugar Company",
    description: "Discover our story, mission, and commitment to revolutionizing health through natural stevia sweeteners since 2018.",
    images: ["/images/og/about-og.jpg"],
    creator: "@healthysugarco",
  },
  alternates: {
    canonical: "https://healthysugar.com/about",
  },
};

// Structured Data for About Page
const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "The Healthy Sugar Company",
    "url": "https://healthysugar.com",
    "logo": "https://healthysugar.com/brand/logo.svg",
    "foundingDate": "2018",
    "foundingLocation": {
      "@type": "Place",
      "name": "Mumbai, Maharashtra, India"
    },
    "numberOfEmployees": "50-100",
    "industry": "Food & Beverage",
    "description": "Leading manufacturer of natural stevia-based sweeteners and healthy sugar alternatives, committed to revolutionizing global health through plant-based solutions.",
    "mission": "To make healthy, natural sweeteners accessible to everyone while promoting better health choices without sacrificing taste.",
    "founder": {
      "@type": "Person",
      "name": "Health Enthusiasts and Nutrition Experts"
    },
    "awards": [
      "Natural Products Excellence Award 2022",
      "Health Innovation Leader 2021",
      "Sustainable Business Award 2020"
    ],
    "sameAs": [
      "https://facebook.com/healthysugarco",
      "https://twitter.com/healthysugarco",
      "https://instagram.com/healthysugarco",
      "https://linkedin.com/company/healthy-sugar-company"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-6282342985",
      "email": "hello@healthysugar.com",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      {children}
    </>
  );
}
