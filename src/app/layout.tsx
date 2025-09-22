import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "The Healthy Sugar Company — Plant-Based Sweetness",
  description: "Stevia-based sweeteners in tablets, syrup, powder, and sachets. Sugar-like taste, diabetes-friendly choice†, affordable from ₹299.",
  keywords: ["stevia", "sugar alternative", "healthy sweetener", "diabetes-friendly", "plant-based", "natural sweetener"],
  authors: [{ name: "The Healthy Sugar Company" }],
  creator: "The Healthy Sugar Company",
  publisher: "The Healthy Sugar Company",
  metadataBase: new URL("https://healthysugar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "The Healthy Sugar Company — Plant-Based Sweetness",
    description: "Stevia-based sweeteners in tablets, syrup, powder, and sachets. Sugar-like taste, diabetes-friendly choice†, affordable from ₹299.",
    siteName: "The Healthy Sugar Company",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Healthy Sugar Company - Plant-Based Sweeteners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Healthy Sugar Company — Plant-Based Sweetness",
    description: "Stevia-based sweeteners in tablets, syrup, powder, and sachets. Sugar-like taste, diabetes-friendly choice†, affordable from ₹299.",
    images: ["/opengraph-image.png"],
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
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#e7404a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.variable} bg-brand-fg text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
