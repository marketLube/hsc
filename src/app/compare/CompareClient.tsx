"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Heart, Shield, Leaf, TrendingUp } from "lucide-react";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { NoticeBar } from "@/components/NoticeBar";
import { Footer } from "@/components/Footer";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Comparison data
const comparisonData = [
  {
    category: "Health Impact",
    stevia: { value: "Zero calories, supports blood sugar control", icon: Check, color: "text-green-600" },
    sugar: { value: "High calories, spikes blood sugar", icon: X, color: "text-red-600" },
    artificial: { value: "Zero calories, potential side effects", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Glycemic Index",
    stevia: { value: "0 (No blood sugar impact)", icon: Check, color: "text-green-600" },
    sugar: { value: "65 (High impact)", icon: X, color: "text-red-600" },
    artificial: { value: "0-5 (Varies by type)", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Calories per Serving",
    stevia: { value: "0 calories", icon: Check, color: "text-green-600" },
    sugar: { value: "16 calories (1 tsp)", icon: X, color: "text-red-600" },
    artificial: { value: "0-4 calories", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Natural Origin",
    stevia: { value: "100% plant-based", icon: Check, color: "text-green-600" },
    sugar: { value: "Natural but highly processed", icon: AlertTriangle, color: "text-yellow-600" },
    artificial: { value: "Synthetic chemicals", icon: X, color: "text-red-600" }
  },
  {
    category: "Diabetes Friendly",
    stevia: { value: "Recommended by doctors", icon: Check, color: "text-green-600" },
    sugar: { value: "Not recommended", icon: X, color: "text-red-600" },
    artificial: { value: "Generally accepted", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Weight Management",
    stevia: { value: "Supports weight loss", icon: Check, color: "text-green-600" },
    sugar: { value: "Contributes to weight gain", icon: X, color: "text-red-600" },
    artificial: { value: "Mixed research results", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Dental Health",
    stevia: { value: "Doesn't cause cavities", icon: Check, color: "text-green-600" },
    sugar: { value: "Major cause of tooth decay", icon: X, color: "text-red-600" },
    artificial: { value: "Generally tooth-safe", icon: Check, color: "text-green-600" }
  },
  {
    category: "Environmental Impact",
    stevia: { value: "Sustainable, low water use", icon: Check, color: "text-green-600" },
    sugar: { value: "High water use, deforestation", icon: X, color: "text-red-600" },
    artificial: { value: "Chemical manufacturing", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Taste Profile",
    stevia: { value: "Natural sweetness, slight aftertaste", icon: Check, color: "text-green-600" },
    sugar: { value: "Standard sweet taste", icon: Check, color: "text-green-600" },
    artificial: { value: "Varies, often chemical aftertaste", icon: AlertTriangle, color: "text-yellow-600" }
  },
  {
    category: "Cost Effectiveness",
    stevia: { value: "Higher upfront, lower per use", icon: Check, color: "text-green-600" },
    sugar: { value: "Low cost, high usage", icon: AlertTriangle, color: "text-yellow-600" },
    artificial: { value: "Moderate cost", icon: AlertTriangle, color: "text-yellow-600" }
  }
];

// Health benefits comparison
const healthBenefits = [
  {
    icon: Heart,
    title: "Cardiovascular Health",
    stevia: "May help lower blood pressure and reduce inflammation",
    sugar: "Increases risk of heart disease and inflammation",
    artificial: "Neutral to potentially negative effects"
  },
  {
    icon: Shield,
    title: "Metabolic Health",
    stevia: "Supports healthy metabolism and insulin sensitivity",
    sugar: "Disrupts metabolism and causes insulin resistance",
    artificial: "May affect gut bacteria and glucose metabolism"
  },
  {
    icon: Leaf,
    title: "Natural Processing",
    stevia: "Minimal processing from stevia leaf extract",
    sugar: "Heavily refined and processed",
    artificial: "Synthetic laboratory creation"
  },
  {
    icon: TrendingUp,
    title: "Long-term Safety",
    stevia: "Centuries of safe use, extensive research",
    sugar: "Known health risks with overconsumption",
    artificial: "Limited long-term studies, ongoing research"
  }
];

export default function CompareClient() {
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

    updateCartCount();

    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.totalItems);
    };

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
    <div className="min-h-screen bg-brand-fg">
      <NoticeBar />
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-brand/5 via-white to-brand/10">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Link 
                href="/"
                className="inline-flex items-center text-brand hover:text-brand-dark transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight"
            >
              Stevia vs Sugar vs Artificial Sweeteners
              <span className="text-brand block mt-1 text-2xl md:text-3xl lg:text-4xl">Complete Comparison Guide</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              Make an informed choice for your health. Compare stevia with sugar and artificial sweeteners 
              across health impact, taste, cost, and environmental factors.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
              <Button size="default" className="px-6">
                Shop Stevia Products
              </Button>
              <Button variant="outline" size="default" className="px-6">
                Download Comparison Chart
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Side-by-Side Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how stevia compares to sugar and artificial sweeteners across key health and lifestyle factors.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="font-bold text-lg text-ink p-4">Comparison Factor</div>
                  <div className="font-bold text-lg text-green-600 p-4 text-center bg-green-50 rounded-lg">
                    Stevia (Natural)
                  </div>
                  <div className="font-bold text-lg text-gray-600 p-4 text-center bg-gray-50 rounded-lg">
                    Regular Sugar
                  </div>
                  <div className="font-bold text-lg text-blue-600 p-4 text-center bg-blue-50 rounded-lg">
                    Artificial Sweeteners
                  </div>
                </div>

                {comparisonData.map((row, index) => (
                  <motion.div
                    key={row.category}
                    variants={fadeInUp}
                    custom={index}
                    className="grid grid-cols-4 gap-4 mb-2 items-center"
                  >
                    <div className="font-medium text-ink p-4 bg-gray-50 rounded-lg">
                      {row.category}
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <row.stevia.icon className={`w-5 h-5 ${row.stevia.color}`} />
                        <span className="text-sm">{row.stevia.value}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <row.sugar.icon className={`w-5 h-5 ${row.sugar.color}`} />
                        <span className="text-sm">{row.sugar.value}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <row.artificial.icon className={`w-5 h-5 ${row.artificial.color}`} />
                        <span className="text-sm">{row.artificial.value}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Health Benefits Comparison */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Health Impact Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understand the long-term health implications of your sweetener choice.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card className="h-full p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mr-4">
                        <benefit.icon className="w-6 h-6 text-brand" />
                      </div>
                      <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                        <div className="font-medium text-green-800 mb-1">Stevia</div>
                        <p className="text-green-700 text-sm">{benefit.stevia}</p>
                      </div>
                      
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <div className="font-medium text-red-800 mb-1">Sugar</div>
                        <p className="text-red-700 text-sm">{benefit.sugar}</p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                        <div className="font-medium text-yellow-800 mb-1">Artificial Sweeteners</div>
                        <p className="text-yellow-700 text-sm">{benefit.artificial}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Scientific Evidence */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Scientific Evidence
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our comparison is backed by peer-reviewed research and clinical studies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-4">200+ Studies</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Over 200 peer-reviewed studies confirm stevia's safety and health benefits compared to sugar and artificial alternatives.
                  </p>
                  <Button variant="outline" size="sm" className="text-sm px-4 py-2">View Research</Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-4">Clinical Data</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Clinical trials show stevia's superior health profile for diabetes management and cardiovascular health.
                  </p>
                  <Button variant="outline" size="sm" className="text-sm px-4 py-2">See Data</Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-4">Doctor Approved</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Recommended by healthcare professionals worldwide for patients with diabetes and metabolic conditions.
                  </p>
                  <Button variant="outline" size="sm" className="text-sm px-4 py-2">Find Doctors</Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Ready to Make the Healthy Switch?
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Choose the natural, healthy sweetener that's backed by science. 
              Start your journey to better health with our premium stevia products.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="default" variant="secondary" className="px-6">
                Shop Stevia Products
              </Button>
              <Button size="default" variant="outline" className="border-white text-white hover:bg-white hover:text-brand px-6">
                Get Free Sample
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
