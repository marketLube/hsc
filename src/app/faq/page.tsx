import { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Stevia Sweeteners | The Healthy Sugar Company",
  description: "Get answers to common questions about stevia sweeteners, health benefits, usage, safety, and more. Expert answers to help you make informed decisions about natural sugar alternatives.",
  keywords: [
    "stevia FAQ",
    "stevia questions and answers",
    "is stevia safe",
    "stevia side effects",
    "stevia vs sugar questions",
    "stevia for diabetes",
    "stevia dosage",
    "stevia taste questions",
    "stevia baking questions",
    "natural sweetener FAQ",
    "stevia health questions",
    "stevia safety questions"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/faq",
    title: "Stevia FAQ - Common Questions Answered | The Healthy Sugar Company",
    description: "Get expert answers to common questions about stevia sweeteners, health benefits, usage, and safety. Make informed decisions about natural sugar alternatives.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/faq-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Stevia FAQ - Common Questions Answered",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevia FAQ - Common Questions Answered",
    description: "Expert answers to common stevia questions. Learn about health benefits, usage, safety, and more.",
    images: ["/images/og/faq-guide.jpg"],
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

export default function FAQPage() {
  return (
    <>
      <FAQClient />
      
      {/* JSON-LD Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Stevia Sweetener FAQ",
            "description": "Frequently asked questions about stevia sweeteners and natural sugar alternatives",
            "url": "https://healthysugar.com/faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is stevia safe for daily consumption?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, stevia is safe for daily consumption. It has been approved by major health organizations including the FDA, WHO, and EFSA. Studies show no adverse effects from regular stevia consumption within recommended limits."
                }
              },
              {
                "@type": "Question",
                "name": "Can diabetics use stevia sweeteners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, stevia is excellent for diabetics. It has zero glycemic index, meaning it doesn't raise blood sugar levels. Many healthcare professionals recommend stevia for diabetes management."
                }
              },
              {
                "@type": "Question",
                "name": "Does stevia have any side effects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stevia is generally well-tolerated with no significant side effects for most people. Some individuals may experience a slight aftertaste initially, but this typically diminishes with regular use."
                }
              },
              {
                "@type": "Question",
                "name": "How much stevia can I consume per day?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The acceptable daily intake (ADI) for stevia is 4 mg per kg of body weight. For a 70kg adult, this equals about 280mg per day, which is equivalent to approximately 40 packets of stevia sweetener."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use stevia for baking and cooking?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, stevia is heat-stable and works well for baking and cooking. However, you'll need to adjust recipes since stevia is much sweeter than sugar and doesn't provide bulk. Use conversion guides for best results."
                }
              }
            ],
            "publisher": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company",
              "logo": {
                "@type": "ImageObject",
                "url": "https://healthysugar.com/brand/logo.svg"
              }
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
                  "name": "FAQ",
                  "item": "https://healthysugar.com/faq"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
