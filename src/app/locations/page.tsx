import { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "Stevia Sweeteners Available Across India | The Healthy Sugar Company Locations",
  description: "Find The Healthy Sugar Company stevia products in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and other major Indian cities. Free shipping nationwide.",
  keywords: [
    "stevia sweetener Mumbai",
    "stevia sweetener Delhi",
    "stevia sweetener Bangalore",
    "stevia sweetener Chennai",
    "stevia sweetener Hyderabad",
    "stevia sweetener Pune",
    "stevia sweetener Kolkata",
    "stevia sweetener Ahmedabad",
    "stevia sweetener Jaipur",
    "stevia sweetener Lucknow",
    "stevia sweetener Kochi",
    "stevia sweetener Gurgaon",
    "natural sweetener India cities",
    "healthy sugar company locations",
    "stevia products India delivery"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/locations",
    title: "Stevia Sweeteners Available Across India | The Healthy Sugar Company",
    description: "Find premium stevia products in major Indian cities. Free shipping nationwide from Mumbai to Chennai, Delhi to Bangalore.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/india-locations.jpg",
        width: 1200,
        height: 630,
        alt: "The Healthy Sugar Company - Available Across India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevia Sweeteners Available Across India",
    description: "Premium stevia products delivered to major Indian cities. Free shipping nationwide.",
    images: ["/images/og/india-locations.jpg"],
    creator: "@healthysugarco",
  },
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
};

export default function LocationsPage() {
  return (
    <>
      <LocationsClient />
      
      {/* JSON-LD Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Healthy Sugar Company",
            "description": "Premium stevia sweeteners available across India with free shipping",
            "url": "https://healthysugar.com",
            "logo": "https://healthysugar.com/brand/logo.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-98765-43210",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              {
                "@type": "City",
                "name": "Delhi",
                "addressRegion": "Delhi",
                "addressCountry": "IN"
              },
              {
                "@type": "City",
                "name": "Bangalore",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              },
              {
                "@type": "City",
                "name": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              {
                "@type": "City",
                "name": "Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              },
              {
                "@type": "City",
                "name": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Stevia Sweetener Products",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Stevia Tablets",
                    "description": "Natural stevia sweetener tablets for tea and coffee"
                  },
                  "availability": "https://schema.org/InStock",
                  "areaServed": "IN"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
