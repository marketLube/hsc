import { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Health & Wellness Blog | Natural Sweetener Insights | The Healthy Sugar Company",
  description: "Explore our comprehensive blog covering stevia benefits, natural sweeteners, healthy recipes, and wellness tips. Expert insights on sugar-free living and natural health.",
  keywords: [
    "stevia blog",
    "natural sweeteners blog",
    "healthy sugar alternatives",
    "sugar-free recipes",
    "stevia benefits",
    "diabetes-friendly sweeteners",
    "weight loss sweeteners",
    "healthy living blog",
    "nutrition blog",
    "wellness articles"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/blogs",
    title: "Health & Wellness Blog - Natural Sweetener Insights | The Healthy Sugar Company",
    description: "Explore our comprehensive blog covering stevia benefits, natural sweeteners, healthy recipes, and wellness tips. Expert insights on sugar-free living and natural health.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/blogs-hub.jpg",
        width: 1200,
        height: 630,
        alt: "Health & Wellness Blog - Natural Sweetener Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health & Wellness Blog - Natural Sweetener Insights | The Healthy Sugar Company",
    description: "Explore our comprehensive blog covering stevia benefits, natural sweeteners, healthy recipes, and wellness tips. Expert insights on sugar-free living and natural health.",
    images: ["/images/og/blogs-hub.jpg"],
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

export default function BlogsPage() {
  return (
    <>
      <BlogsClient />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "The Healthy Sugar Company Blog",
            "description": "Comprehensive blog covering stevia benefits, natural sweeteners, healthy recipes, and wellness tips",
            "url": "https://healthysugar.com/blogs",
            "publisher": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company",
              "logo": {
                "@type": "ImageObject",
                "url": "https://healthysugar.com/brand/logo.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://healthysugar.com/blogs"
            },
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "Stevia Benefits: The Complete Guide to Natural Sweetness",
                "description": "Comprehensive health benefits of stevia including blood sugar control, weight management, and more",
                "url": "https://healthysugar.com/blogs/stevia-benefits-complete-guide",
                "datePublished": "2024-02-01",
                "author": {
                  "@type": "Person",
                  "name": "Dr. Sarah Johnson"
                }
              },
              {
                "@type": "BlogPosting",
                "headline": "Natural Sweeteners Comparison: Which is Best for Your Health?",
                "description": "Compare stevia, monk fruit, honey, and other natural sweeteners for health benefits",
                "url": "https://healthysugar.com/blogs/natural-sweeteners-comparison-guide",
                "datePublished": "2024-01-28",
                "author": {
                  "@type": "Person",
                  "name": "Maria Rodriguez"
                }
              }
            ],
            "about": [
              {
                "@type": "Thing",
                "name": "Stevia Health Benefits",
                "description": "Natural sweetener with zero calories and comprehensive health benefits"
              },
              {
                "@type": "Thing",
                "name": "Natural Sweeteners",
                "description": "Plant-based alternatives to refined sugar for healthier living"
              },
              {
                "@type": "Thing",
                "name": "Sugar-Free Living",
                "description": "Lifestyle and dietary approaches to reducing sugar consumption"
              }
            ],
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
                  "name": "Blog",
                  "item": "https://healthysugar.com/blogs"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
