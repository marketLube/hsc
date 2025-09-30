import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Stevia vs Sugar vs Artificial Sweeteners - Complete Comparison | The Healthy Sugar Company",
  description: "Comprehensive comparison of stevia, sugar, and artificial sweeteners. Discover why stevia is the healthiest choice for diabetes, weight loss, and overall wellness. Scientific data included.",
  keywords: [
    "stevia vs sugar comparison",
    "stevia vs artificial sweeteners",
    "natural sweetener comparison",
    "diabetes sweetener comparison",
    "stevia vs aspartame",
    "stevia vs sucralose",
    "healthy sweetener comparison chart",
    "zero calorie sweetener comparison",
    "plant based sweetener vs artificial",
    "stevia health benefits vs sugar",
    "sweetener comparison India",
    "best sugar alternative comparison"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/compare",
    title: "Stevia vs Sugar vs Artificial Sweeteners - Complete Comparison",
    description: "Comprehensive comparison of stevia, sugar, and artificial sweeteners. Discover why stevia is the healthiest choice for diabetes, weight loss, and overall wellness.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/sweetener-comparison.jpg",
        width: 1200,
        height: 630,
        alt: "Stevia vs Sugar vs Artificial Sweeteners Comparison Chart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevia vs Sugar vs Artificial Sweeteners - Complete Comparison",
    description: "Comprehensive comparison guide showing why stevia is the healthiest sweetener choice. Scientific data and health impact analysis included.",
    images: ["/images/og/sweetener-comparison.jpg"],
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

export default function ComparePage() {
  return (
    <>
      <CompareClient />
      
      {/* JSON-LD Structured Data for Comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sweetener Comparison Guide",
            "description": "Comprehensive comparison of stevia, sugar, and artificial sweeteners",
            "url": "https://healthysugar.com/compare",
            "mainEntity": {
              "@type": "Article",
              "headline": "Stevia vs Sugar vs Artificial Sweeteners - Complete Comparison",
              "description": "Scientific comparison of different sweetener types and their health impacts",
              "author": {
                "@type": "Organization",
                "name": "The Healthy Sugar Company"
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Healthy Sugar Company",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://healthysugar.com/brand/logo.svg"
                }
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Stevia Comparison",
                  "description": "Natural plant-based sweetener comparison with sugar and artificial alternatives"
                },
                {
                  "@type": "Thing",
                  "name": "Sweetener Health Effects",
                  "description": "Health impact analysis of different sweetener types"
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://healthysugar.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Compare Sweeteners",
                  "item": "https://healthysugar.com/compare"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
