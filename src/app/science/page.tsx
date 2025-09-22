"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Microscope, FlaskConical, Dna, TrendingUp, Users, Award, ChevronRight, Clock, User, Calendar, BookOpen, Beaker, Atom, TestTube, Zap, Shield, Heart, Brain, Leaf } from "lucide-react";
import { getAllScienceArticles } from "@/lib/science-articles";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

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

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Get science articles from the centralized data
const scienceArticles = getAllScienceArticles();

// Research statistics
const researchStats = [
  { number: "200+", label: "Clinical Studies", icon: Microscope },
  { number: "60+", label: "Countries Approved", icon: Users },
  { number: "2008", label: "FDA Approved", icon: Award },
  { number: "300x", label: "Sweeter than Sugar", icon: TrendingUp }
];

// Scientific discoveries data
const discoveries = [
  {
    icon: Atom,
    title: "Molecular Structure",
    description: "Steviol glycosides are complex molecules with unique binding properties that activate sweet taste receptors without triggering metabolic responses.",
    details: ["40+ different glycoside compounds", "Tetracyclic diterpene backbone", "Glucose chain attachments", "Heat-stable up to 200°C"]
  },
  {
    icon: Dna,
    title: "Genetic Research",
    description: "Advanced plant breeding and genetic studies have identified key genes responsible for steviol glycoside production and sweetness profiles.",
    details: ["UGT gene family mapping", "Biosynthetic pathway elucidation", "Variety development", "Quality optimization"]
  },
  {
    icon: TestTube,
    title: "Extraction Science",
    description: "Modern extraction methods use water-based processes, chromatography, and crystallization to produce pure, high-quality stevia sweeteners.",
    details: ["Water extraction methods", "Ion exchange purification", "Crystallization techniques", "Quality control systems"]
  },
  {
    icon: Brain,
    title: "Neurological Response",
    description: "Research shows stevia activates T1R2/T1R3 sweet taste receptors without triggering dopamine pathways associated with sugar addiction.",
    details: ["Taste receptor binding", "Neural pathway studies", "Addiction research", "Behavioral analysis"]
  }
];

// Infographic data
const infographics = [
  {
    title: "Stevia vs Sugar: The Science",
    items: [
      { label: "Glycemic Index", stevia: "0", sugar: "65", better: "stevia" },
      { label: "Calories per gram", stevia: "0", sugar: "4", better: "stevia" },
      { label: "Sweetness intensity", stevia: "300x", sugar: "1x", better: "stevia" },
      { label: "Blood sugar impact", stevia: "None", sugar: "High", better: "stevia" },
      { label: "Insulin response", stevia: "None", sugar: "Significant", better: "stevia" }
    ]
  },
  {
    title: "Processing Journey",
    steps: [
      { step: "1", title: "Harvest", description: "Stevia leaves picked at peak glycoside content" },
      { step: "2", title: "Extract", description: "Hot water extraction of sweet compounds" },
      { step: "3", title: "Purify", description: "Ion exchange and filtration remove impurities" },
      { step: "4", title: "Crystallize", description: "Pure steviol glycosides form white crystals" }
    ]
  }
];

export default function SciencePage() {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
      setCartCount(totalItems);
    }

    // Listen for cart updates
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
        setCartCount(totalItems);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
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
              className="text-4xl md:text-6xl font-bold text-ink mb-6"
            >
              The Science Behind
              <span className="text-brand block mt-2">Stevia Sweetness</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Discover the fascinating world of stevia science. From molecular structure to clinical research, 
              explore how nature created the perfect sugar alternative backed by decades of scientific study.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="mr-4">
                Explore Research
              </Button>
              <Button variant="outline" size="lg">
                Download Studies
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Research Statistics */}
      <section className="py-20 bg-gradient-to-br from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Decades of Scientific Research
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Stevia is one of the most extensively studied natural sweeteners, with research spanning 
                biochemistry, nutrition, safety, and health benefits.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {researchStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  custom={index}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Global Scientific Recognition</h3>
                <p className="text-white/90 mb-6">
                  Stevia has been approved by major health authorities worldwide including FDA, EFSA, WHO, 
                  and health agencies in over 60 countries, making it one of the most globally accepted natural sweeteners.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">FDA (USA)</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">EFSA (Europe)</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">WHO (Global)</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">FSSAI (India)</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Health Canada</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Scientific Discoveries Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Scientific Discoveries
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Breakthrough research has unlocked the secrets of stevia's sweetness, revealing the complex 
                science behind this remarkable natural compound.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {discoveries.map((discovery, index) => (
                <motion.div
                  key={discovery.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card hover className="h-full p-8 hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                          <discovery.icon className="w-6 h-6 text-brand" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ink mb-3">{discovery.title}</h3>
                        <p className="text-gray-600 mb-4">{discovery.description}</p>
                        <ul className="space-y-2">
                          {discovery.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-500">
                              <ChevronRight className="w-4 h-4 text-brand mr-2" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Infographics Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Science at a Glance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visual representations of key scientific data that demonstrate stevia's superior properties 
                and the sophisticated processes behind its production.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Comparison Infographic */}
              <motion.div variants={fadeInUp}>
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-ink mb-6 text-center">
                    {infographics[0]?.title}
                  </h3>
                  <div className="space-y-4">
                    {infographics[0]?.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-700 flex-1 min-w-0">{item.label}</div>
                        <div className="flex items-center space-x-4 flex-shrink-0">
                          <div className="text-center min-w-[60px]">
                            <div className="text-sm text-gray-500">Stevia</div>
                            <div className={`font-bold ${item.better === 'stevia' ? 'text-green-600' : 'text-gray-600'}`}>
                              {item.stevia}
                            </div>
                          </div>
                          <div className="text-gray-400 px-2">vs</div>
                          <div className="text-center min-w-[60px]">
                            <div className="text-sm text-gray-500">Sugar</div>
                            <div className={`font-bold ${item.better === 'sugar' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.sugar}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Process Infographic */}
              <motion.div variants={fadeInUp} className="flex flex-col h-full">
                <Card className="p-8 flex-1">
                  <h3 className="text-2xl font-bold text-ink mb-6 text-center">
                    {infographics[1]?.title}
                  </h3>
                  <div className="space-y-6">
                     {infographics[1]?.steps?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-ink mb-1">{step.title}</h4>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                {/* Health Message Banner */}
                <div className="mt-6">
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-brand/5 border-brand/20">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-6 h-6 text-brand" />
                      </div>
                      <h4 className="text-lg font-bold text-ink mb-2">Choose Healthy Sugar</h4>
                      <p className="text-brand font-medium">for a Healthy Life</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Make the switch to natural stevia sweetness
                      </p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Science-Backed Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our stevia products are the result of advanced extraction science and rigorous quality control, 
                delivering the purest, most consistent sweetening experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <ProductCard product={product} onAddToCart={() => {}} />
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button size="lg">
                Shop All Products
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Research Articles Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Latest Scientific Research
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dive deep into the latest research findings, clinical studies, and scientific breakthroughs 
                that continue to validate stevia's safety and benefits.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scienceArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Link href={`/science/articles/${article.slug}`}>
                    <Card hover className="h-full overflow-hidden group cursor-pointer hover-lift">
                      <div className="relative h-48 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br ${
                          index % 6 === 0 ? 'from-blue-100 to-blue-200' :
                          index % 6 === 1 ? 'from-green-100 to-green-200' :
                          index % 6 === 2 ? 'from-purple-100 to-purple-200' :
                          index % 6 === 3 ? 'from-orange-100 to-orange-200' :
                          index % 6 === 4 ? 'from-pink-100 to-pink-200' :
                          'from-indigo-100 to-indigo-200'
                        } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                          <span className="text-4xl">
                            {index % 6 === 0 ? '🔬' :
                             index % 6 === 1 ? '🧪' :
                             index % 6 === 2 ? '🧬' :
                             index % 6 === 3 ? '⚗️' :
                             index % 6 === 4 ? '🔍' :
                             '📊'}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {article.author.split(',')[0]}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(article.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-brand text-sm font-medium">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Research
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button size="lg">
                View All Research
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Health Benefits Science */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Health Benefits Backed by Science
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Clinical research has identified multiple health benefits of stevia beyond just sweetness, 
                making it a functional ingredient for better health outcomes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Cardiovascular Health</h3>
                  <p className="text-gray-600 mb-4">
                    Studies show stevia may help lower blood pressure and support heart health through 
                    vasodilation and anti-inflammatory effects.
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>• 6-14% reduction in blood pressure</div>
                    <div>• Improved endothelial function</div>
                    <div>• Anti-inflammatory properties</div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Metabolic Health</h3>
                  <p className="text-gray-600 mb-4">
                    Zero glycemic index and potential insulin sensitivity improvements make stevia 
                    ideal for metabolic health and diabetes management.
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>• Zero blood sugar impact</div>
                    <div>• Improved insulin sensitivity</div>
                    <div>• Weight management support</div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Antioxidant Properties</h3>
                  <p className="text-gray-600 mb-4">
                    Stevia contains natural antioxidants that may help protect cells from oxidative 
                    stress and support overall health and longevity.
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>• Free radical scavenging</div>
                    <div>• Cellular protection</div>
                    <div>• Anti-aging potential</div>
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience Science-Backed Sweetness
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join the millions who have discovered the perfect balance of taste, health, and science. 
              Try our premium stevia products backed by decades of research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
                Download Research Papers
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

