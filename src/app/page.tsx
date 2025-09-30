"use client";

import { useState, useEffect } from "react";
import { NoticeBar } from "@/components/NoticeBar";
import { FloatingNav } from "@/components/FloatingNav";
import { BannerCarousel } from "@/components/BannerCarousel";
import { USPStrip } from "@/components/USPStrip";
import { BannerGrid } from "@/components/BannerGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { UseCases } from "@/components/UseCases";
import { SteviaScience } from "@/components/SteviaScience";
import { PopularBlogs } from "@/components/PopularBlogs";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error("Error parsing cart:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates from custom events
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.totalItems);
    };

    // Listen for storage changes (from other tabs)
    const handleStorageChange = () => {
      updateCartCount();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Notice Bar */}
      <NoticeBar />
      
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />
      
      {/* Main Content */}
      <main id="main-content" role="main" aria-label="Main content">
        {/* Hero Section */}
        <section id="home" aria-label="Hero banner and main product introduction">
          <BannerCarousel />
        </section>
        
        {/* USP Strip */}
        <section aria-label="Key product benefits">
          <USPStrip />
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" aria-label="Health benefits of stevia sweeteners">
          <BannerGrid />
        </section>
        
        {/* Products Section */}
        <section id="products" aria-label="Our stevia product range">
          <ProductGrid />
        </section>
        
        {/* Use Cases Section */}
        <section aria-label="How to use stevia products">
          <UseCases />
        </section>
        
        {/* Science Section */}
        <section id="science" aria-label="Scientific evidence and research">
          <SteviaScience />
        </section>
        
        {/* Popular Blogs Section */}
        <section id="blogs" aria-label="Popular health and wellness articles">
          <PopularBlogs />
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" aria-label="Customer reviews and testimonials">
          <Testimonials />
        </section>
        
        {/* Newsletter Section */}
        <section aria-label="Newsletter signup">
          <Newsletter />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Healthy Sugar Company",
            "url": (process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysugarcompany.com'),
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysugarcompany.com'}/brand/logo.svg`,
            "description": "Stevia-based sweeteners in tablets, syrup, powder, and sachets. Sugar-like taste, diabetes-friendly choice, affordable from ₹299.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressRegion": "Maharashtra",
              "addressLocality": "Mumbai"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-98765-43210",
              "contactType": "customer service",
              "email": "hello@healthysugar.com"
            },
            "sameAs": [
              "https://facebook.com/healthysugarcompany",
              "https://instagram.com/healthysugarcompany",
              "https://twitter.com/healthysugarco"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Healthy Sugar Products",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Healthy Sugar (Tablets)",
                  "description": "Instantly sweetens tea & coffee. 100 tablets.",
                  "brand": "The Healthy Sugar Company",
                  "offers": {
                    "@type": "Offer",
                    "price": "299",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Product", 
                  "name": "Healthy Sugar Syrup",
                  "description": "Perfect for cold drinks & desserts. 100 ml.",
                  "brand": "The Healthy Sugar Company",
                  "offers": {
                    "@type": "Offer",
                    "price": "499",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Product",
                  "name": "Healthy Sugar Powder", 
                  "description": "Measure & mix for baking. 100 g.",
                  "brand": "The Healthy Sugar Company",
                  "offers": {
                    "@type": "Offer",
                    "price": "299",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Product",
                  "name": "Healthy Sugar Sachets",
                  "description": "Precise dose, on the go. 30 sticks.",
                  "brand": "The Healthy Sugar Company", 
                  "offers": {
                    "@type": "Offer",
                    "price": "299",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            }
          })
        }}
      />
    </div>
  );
}
