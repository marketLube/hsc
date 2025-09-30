import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { PerformanceOptimizer, CriticalCSS } from "@/components/PerformanceOptimizer";
import { AdvancedSchemaMarkup } from "@/components/AdvancedSchemaMarkup";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthysugar.com";

export const metadata: Metadata = {
  title: "The Healthy Sugar Company — Premium Stevia Sweeteners | Natural Sugar Alternative",
  description: "India's #1 stevia-based sweeteners in tablets, syrup, powder, and sachets. Zero calories, diabetes-friendly, plant-based sugar alternative starting from ₹299. Free shipping across India.",
  keywords: [
    "stevia sweetener India",
    "natural sugar alternative",
    "diabetes-friendly sweetener",
    "zero calorie sweetener",
    "plant-based sweetener",
    "healthy sugar substitute",
    "stevia tablets",
    "stevia syrup",
    "stevia powder",
    "sugar-free products",
    "weight loss sweetener",
    "keto-friendly sweetener",
    "organic stevia",
    "blood sugar control",
    "healthy lifestyle products"
  ],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "The Healthy Sugar Company — Premium Stevia Sweeteners | Natural Sugar Alternative",
    description: "India's #1 stevia-based sweeteners in tablets, syrup, powder, and sachets. Zero calories, diabetes-friendly, plant-based sugar alternative starting from ₹299.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/images/og/homepage-hero.jpg",
        width: 1200,
        height: 630,
        alt: "The Healthy Sugar Company - Premium Stevia Sweeteners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Healthy Sugar Company — Premium Stevia Sweeteners",
    description: "India's #1 stevia-based sweeteners. Zero calories, diabetes-friendly, plant-based sugar alternative starting from ₹299.",
    images: ["/images/og/homepage-hero.jpg"],
    creator: "@healthysugarco",
    site: "@healthysugarco",
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
  verification: {
    google: "your-google-verification-code-here",
    bing: "your-bing-verification-code-here",
  },
  category: "Health & Wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <CriticalCSS />
        <meta name="theme-color" content="#e7404a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Healthy Sugar Co" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#e7404a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preload" href="/images/hero-1.png" as="image" />
        <link rel="preload" href="/brand/logo.svg" as="image" />
      </head>
      <body className={`${poppins.variable} bg-brand-fg text-ink antialiased`}>
        <AccessibilityEnhancer />
        <PerformanceOptimizer />
        <AdvancedSchemaMarkup type="homepage" />
        {children}
      </body>
    </html>
  );
}
