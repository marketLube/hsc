import { Metadata } from "next";
import BenefitsClient from "./BenefitsClient";

export const metadata: Metadata = {
  title: "Health Benefits of Stevia | Natural Sugar Alternative | The Healthy Sugar Company",
  description: "Discover the proven health benefits of stevia sweeteners. Learn how switching from refined sugar to natural stevia supports diabetes management, weight control, and overall wellness.",
  keywords: [
    "stevia health benefits",
    "natural sugar alternative",
    "diabetes-friendly sweetener",
    "zero calorie sweetener",
    "blood sugar control",
    "weight management",
    "heart health",
    "dental health",
    "stevia vs sugar",
    "plant-based sweetener",
    "healthy lifestyle",
    "sugar addiction recovery"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/benefits",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/benefits",
    title: "Health Benefits of Stevia - Complete Guide | The Healthy Sugar Company",
    description: "Discover the proven health benefits of stevia sweeteners. Learn how switching from refined sugar to natural stevia supports diabetes management, weight control, and overall wellness.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/benefits-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Health Benefits of Stevia - Complete Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Benefits of Stevia - Complete Guide | The Healthy Sugar Company",
    description: "Discover the proven health benefits of stevia sweeteners. Learn how switching from refined sugar to natural stevia supports diabetes management, weight control, and overall wellness.",
    images: ["/images/og/benefits-guide.jpg"],
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

export default function BenefitsPage() {
  return (
    <>
      <BenefitsClient />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Health Benefits of Stevia",
            "description": "Complete guide to the health benefits of stevia sweeteners and natural sugar alternatives",
            "url": "https://healthysugar.com/benefits",
            "mainEntity": {
              "@type": "Article",
              "headline": "The Complete Guide to Healthy Sugar Benefits",
              "description": "Discover why millions are making the switch from refined sugar to stevia-based alternatives",
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
                  "name": "Stevia Health Benefits",
                  "description": "Natural sweetener with zero calories and no blood sugar impact"
                },
                {
                  "@type": "Thing",
                  "name": "Diabetes Management",
                  "description": "Blood sugar control and diabetes-friendly sweetening solutions"
                },
                {
                  "@type": "Thing",
                  "name": "Weight Management",
                  "description": "Zero-calorie sweetener supporting healthy weight goals"
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
                  "name": "Benefits",
                  "item": "https://healthysugar.com/benefits"
                }
              ]
            }
          })
        }}
      />
    </>
  );
