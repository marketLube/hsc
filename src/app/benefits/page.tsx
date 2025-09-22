"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Shield, Leaf, TrendingUp, Users, Award, ChevronRight, Clock, User, Calendar } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Get blog articles from the centralized data
const blogArticles = getAllArticles();

// Impact statistics
const impactStats = [
  { number: "50,000+", label: "Lives Improved", icon: Heart },
  { number: "2M+", label: "Sugar Servings Replaced", icon: Shield },
  { number: "15+", label: "Countries Served", icon: Users },
  { number: "98%", label: "Customer Satisfaction", icon: Award }
];

// Health benefits data
const healthBenefits = [
  {
    icon: Heart,
    title: "Cardiovascular Health",
    description: "Stevia helps maintain healthy blood pressure and supports heart health without the cardiovascular risks associated with refined sugar.",
    details: ["Reduces inflammation", "Supports healthy blood pressure", "No impact on cholesterol levels"]
  },
  {
    icon: Shield,
    title: "Blood Sugar Control",
    description: "Unlike refined sugar, stevia doesn't spike blood glucose levels, making it ideal for diabetes management and metabolic health.",
    details: ["Zero glycemic index", "Supports insulin sensitivity", "Helps prevent blood sugar spikes"]
  },
  {
    icon: Leaf,
    title: "Weight Management",
    description: "With zero calories and no artificial additives, stevia supports healthy weight management without sacrificing sweetness.",
    details: ["Zero calories", "No artificial chemicals", "Supports metabolism"]
  },
  {
    icon: TrendingUp,
    title: "Dental Health",
    description: "Stevia doesn't feed harmful bacteria in your mouth, helping maintain oral health and preventing tooth decay.",
    details: ["Doesn't cause cavities", "Antimicrobial properties", "Supports oral hygiene"]
  }
];

export default function BenefitsPage() {
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

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand/5 via-white to-brand/10">
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
              The Complete Guide to
              <span className="text-brand block mt-2">Healthy Sugar Benefits</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Discover why millions are making the switch from refined sugar to stevia-based alternatives. 
              Learn about the science, health benefits, and positive impact on your life and the environment.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="mr-4">
                Shop Healthy Sugar
              </Button>
              <Button variant="outline" size="lg">
                Download Health Guide
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Why Avoid Refined Sugar Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Why You Should Avoid Refined Sugar
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the hidden dangers of refined sugar is the first step toward better health. 
                Here's what science tells us about its impact on your body.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div variants={fadeInUp}>
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/banners/refined-sugar-dangers.jpg"
                    alt="Refined Sugar Health Risks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">The Hidden Truth</h3>
                    <p className="text-white/90">About refined sugar's impact on your health</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-red-800 mb-2">Blood Sugar Spikes</h4>
                  <p className="text-red-700">Refined sugar causes rapid blood glucose spikes, leading to energy crashes and increased diabetes risk.</p>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-orange-800 mb-2">Weight Gain & Obesity</h4>
                  <p className="text-orange-700">High calorie content and metabolic disruption contribute to weight gain and difficulty losing weight.</p>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">Dental Problems</h4>
                  <p className="text-yellow-700">Feeds harmful bacteria in your mouth, leading to cavities, gum disease, and tooth decay.</p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-purple-800 mb-2">Addiction & Cravings</h4>
                  <p className="text-purple-700">Triggers dopamine release, creating addictive patterns and constant sugar cravings.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Health Benefits Section */}
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
                The Health Benefits of Stevia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how switching to stevia can transform your health and wellbeing. 
                Backed by scientific research and trusted by healthcare professionals worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card hover className="h-full p-8 hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                          <benefit.icon className="w-6 h-6 text-brand" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ink mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 mb-4">{benefit.description}</p>
                        <ul className="space-y-2">
                          {benefit.details.map((detail, idx) => (
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

      {/* HSC Impact Section */}
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
                Our Impact on Global Health
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                At The Healthy Sugar Company, we're not just selling products – we're leading a movement 
                toward healthier living and sustainable practices that benefit everyone.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {impactStats.map((stat, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <p className="text-white/90">
                    To make healthy, plant-based sweeteners accessible to everyone, 
                    promoting better health outcomes and sustainable living practices.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                  <p className="text-white/90">
                    A world where everyone has access to healthy sugar alternatives, 
                    reducing the global burden of diet-related diseases.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Our Values</h3>
                  <p className="text-white/90">
                    Transparency, sustainability, and unwavering commitment to 
                    improving lives through natural, science-backed solutions.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Scientific Evidence Section */}
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
                Backed by Science
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our claims aren't just marketing – they're supported by extensive scientific research 
                and clinical studies from leading institutions worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Clinical Studies</h3>
                  <p className="text-gray-600 mb-4">
                    Over 200 peer-reviewed studies confirm stevia's safety and health benefits.
                  </p>
                  <Button variant="outline" size="sm">View Research</Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Medical Approval</h3>
                  <p className="text-gray-600 mb-4">
                    Approved by FDA, WHO, and healthcare organizations in 60+ countries.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-4">Doctor Recommended</h3>
                  <p className="text-gray-600 mb-4">
                    Recommended by nutritionists and doctors for diabetes and weight management.
                  </p>
                  <Button variant="outline" size="sm">Find Doctors</Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Blog Articles Section */}
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
                Latest Health Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed with the latest research, tips, and insights about healthy living, 
                nutrition science, and the benefits of natural sweeteners.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Link href={`/articles/${article.slug}`}>
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
                             index % 6 === 1 ? '🌿' :
                             index % 6 === 2 ? '💊' :
                             index % 6 === 3 ? '🌍' :
                             index % 6 === 4 ? '👨‍🍳' :
                             '🧠'}
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
                              {article.author}
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
                        
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button size="lg">
                View All Articles
              </Button>
            </motion.div>
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
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of people who have already made the switch to healthier living. 
              Start your journey today with our premium stevia-based sweeteners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
                Get Free Sample
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
