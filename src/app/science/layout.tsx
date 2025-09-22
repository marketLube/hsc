import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science of Stevia | Research & Clinical Studies | The Healthy Sugar Company",
  description: "Explore the fascinating science behind stevia sweetness. Discover molecular structure, clinical research, extraction methods, and health benefits backed by 200+ scientific studies.",
  keywords: [
    "stevia science",
    "steviol glycosides", 
    "stevia research",
    "clinical studies stevia",
    "stevia molecular structure",
    "stevia extraction methods",
    "stevia health benefits",
    "stevia biochemistry",
    "natural sweetener science",
    "stevia FDA approval",
    "stevia safety studies",
    "stevia vs sugar research"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  alternates: {
    canonical: "/science",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "/science",
    title: "The Science of Stevia | Research & Clinical Studies | HSC",
    description: "Comprehensive guide to stevia science including molecular structure, clinical research, extraction methods, and health benefits. Backed by 200+ scientific studies and FDA approval.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/science-page.jpg",
        width: 1200,
        height: 630,
        alt: "The Science of Stevia - Research and Clinical Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Science of Stevia | Research & Clinical Studies | HSC",
    description: "Explore stevia science: molecular structure, clinical research, extraction methods, and health benefits. 200+ studies, FDA approved, zero glycemic index.",
    images: ["/images/og/science-page.jpg"],
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

export default function ScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* Schema.org JSON-LD for Science Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Science Behind Stevia Sweetness",
            "description": "Comprehensive scientific guide covering stevia molecular structure, clinical research, extraction methods, health benefits, and safety studies backed by 200+ scientific publications.",
            "image": "https://healthysugar.com/images/og/science-page.jpg",
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
            "dateModified": "2024-01-20",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://healthysugar.com/science"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Stevia Science"
              },
              {
                "@type": "Thing", 
                "name": "Steviol Glycosides"
              },
              {
                "@type": "Thing",
                "name": "Natural Sweetener Research"
              },
              {
                "@type": "Thing",
                "name": "Clinical Studies"
              }
            ],
            "mentions": [
              {
                "@type": "Organization",
                "name": "FDA"
              },
              {
                "@type": "Organization",
                "name": "WHO"
              },
              {
                "@type": "Organization",
                "name": "EFSA"
              }
            ]
          })
        }}
      />

      {/* Research Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ResearchProject",
            "name": "Stevia Science Research",
            "description": "Comprehensive research on stevia molecular structure, health benefits, safety, and applications",
            "funding": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company"
            },
            "result": [
              {
                "@type": "ScholarlyArticle",
                "headline": "Molecular Structure Behind Stevia's Sweetness",
                "about": "Steviol glycosides molecular architecture and taste receptor interaction"
              },
              {
                "@type": "ScholarlyArticle", 
                "headline": "Stevia and Blood Sugar Research",
                "about": "Clinical studies on glycemic index and metabolic effects"
              },
              {
                "@type": "ScholarlyArticle",
                "headline": "Stevia Extraction and Purification Methods",
                "about": "Food science and processing technology for stevia production"
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
                "name": "What makes stevia sweet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stevia's sweetness comes from steviol glycosides, complex molecules with a tetracyclic diterpene backbone and glucose attachments. These compounds are 200-300 times sweeter than sugar and activate T1R2/T1R3 sweet taste receptors."
                }
              },
              {
                "@type": "Question",
                "name": "How many scientific studies support stevia safety?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Over 200 peer-reviewed scientific studies have been conducted on stevia safety and benefits. It has been approved by FDA, WHO, EFSA, and health authorities in 60+ countries worldwide."
                }
              },
              {
                "@type": "Question",
                "name": "What is stevia's glycemic index?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stevia has a glycemic index of 0, meaning it has no measurable impact on blood glucose levels. Clinical studies confirm it doesn't trigger insulin responses or affect blood sugar control."
                }
              },
              {
                "@type": "Question",
                "name": "How is stevia extracted and purified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stevia is extracted using hot water extraction, then purified through ion exchange chromatography, activated carbon treatment, and crystallization to produce 95%+ pure steviol glycosides."
                }
              },
              {
                "@type": "Question",
                "name": "What health benefits does stevia research show?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Research indicates stevia may support cardiovascular health, improve insulin sensitivity, provide antioxidant benefits, and help with weight management while having zero calories and no blood sugar impact."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}

