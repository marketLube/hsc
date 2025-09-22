import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Benefits of Stevia vs Refined Sugar | The Healthy Sugar Company",
  description: "Discover why stevia is superior to refined sugar. Learn about blood sugar control, weight management, dental health, and cardiovascular benefits. Science-backed evidence and expert insights.",
  keywords: [
    "stevia benefits",
    "refined sugar dangers", 
    "blood sugar control",
    "diabetes-friendly sweetener",
    "weight management",
    "natural sweetener health benefits",
    "stevia vs sugar",
    "healthy sugar alternative",
    "plant-based sweetener",
    "zero calorie sweetener"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  alternates: {
    canonical: "/benefits",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "/benefits",
    title: "Complete Guide to Stevia Health Benefits | The Healthy Sugar Company",
    description: "Comprehensive guide to stevia benefits vs refined sugar dangers. Learn about blood sugar control, weight management, and cardiovascular health. Expert insights and scientific evidence.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/benefits-page.jpg",
        width: 1200,
        height: 630,
        alt: "Health Benefits of Stevia - The Healthy Sugar Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Guide to Stevia Health Benefits | HSC",
    description: "Discover why stevia is superior to refined sugar. Blood sugar control, weight management, dental health benefits. Science-backed evidence.",
    images: ["/images/og/benefits-page.jpg"],
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

export default function BenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* Schema.org JSON-LD for Benefits Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to Healthy Sugar Benefits",
            "description": "Comprehensive guide covering stevia health benefits, refined sugar dangers, blood sugar control, weight management, and cardiovascular health.",
            "image": "https://healthysugar.com/images/og/benefits-page.jpg",
            "author": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company",
              "url": "https://healthysugar.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company",
              "logo": {
                "@type": "ImageObject",
                "url": "https://healthysugar.com/brand/logo.svg"
              }
            },
            "datePublished": "2024-01-01",
            "dateModified": "2024-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://healthysugar.com/benefits"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Stevia Health Benefits"
              },
              {
                "@type": "Thing", 
                "name": "Refined Sugar Dangers"
              },
              {
                "@type": "Thing",
                "name": "Blood Sugar Control"
              },
              {
                "@type": "Thing",
                "name": "Weight Management"
              }
            ],
            "mentions": [
              {
                "@type": "MedicalCondition",
                "name": "Diabetes"
              },
              {
                "@type": "MedicalCondition",
                "name": "Obesity"
              },
              {
                "@type": "MedicalCondition",
                "name": "Cardiovascular Disease"
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is stevia safe for diabetics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, stevia is safe for diabetics. It has zero glycemic index and doesn't affect blood sugar levels, making it an ideal sweetener for diabetes management."
                }
              },
              {
                "@type": "Question",
                "name": "What are the main dangers of refined sugar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Refined sugar causes blood sugar spikes, contributes to weight gain and obesity, promotes tooth decay, and can lead to addiction-like cravings. It also increases risk of cardiovascular disease and diabetes."
                }
              },
              {
                "@type": "Question",
                "name": "How does stevia help with weight management?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stevia contains zero calories and doesn't trigger insulin responses, making it easier to maintain healthy weight. It provides sweetness without the metabolic disruption caused by sugar."
                }
              },
              {
                "@type": "Question",
                "name": "Is stevia approved by health authorities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, stevia is approved by FDA, WHO, and health authorities in over 60 countries. It's backed by over 200 peer-reviewed studies confirming its safety and benefits."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
