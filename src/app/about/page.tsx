"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  Award, 
  Leaf, 
  Heart, 
  Globe, 
  Shield,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Star,
  Factory,
  Microscope,
  Handshake,
  Clock,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
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

// Company milestones
const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Started with a vision to revolutionize the sweetener industry with natural alternatives.",
    icon: Lightbulb
  },
  {
    year: "2019",
    title: "First Product Launch",
    description: "Introduced our flagship stevia powder, setting new standards for natural sweeteners.",
    icon: Star
  },
  {
    year: "2020",
    title: "International Expansion",
    description: "Expanded to serve customers across 15+ countries with our healthy products.",
    icon: Globe
  },
  {
    year: "2021",
    title: "50,000+ Customers",
    description: "Reached a major milestone of serving over 50,000 satisfied customers worldwide.",
    icon: Users
  },
  {
    year: "2022",
    title: "Innovation Awards",
    description: "Received multiple awards for innovation in natural food products and sustainability.",
    icon: Award
  },
  {
    year: "2023",
    title: "Product Line Expansion",
    description: "Launched tablets, syrup, and sachets to meet diverse customer preferences.",
    icon: TrendingUp
  }
];

// Company values
const values = [
  {
    icon: Heart,
    title: "Health First",
    description: "Every decision we make prioritizes the health and wellbeing of our customers. We believe that healthy choices shouldn't require sacrificing taste or convenience."
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "We source only the finest natural ingredients, ensuring our products are free from artificial additives, preservatives, and harmful chemicals."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control processes ensure every product meets our exceptionally high standards before reaching your table."
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do. We continuously innovate and improve based on their feedback and needs."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We're committed to making a positive impact on global health by making natural sweeteners accessible to people worldwide."
  },
  {
    icon: Handshake,
    title: "Transparency",
    description: "We believe in complete transparency about our ingredients, processes, and business practices. What you see is what you get."
  }
];

// Team stats
const teamStats = [
  { number: "50+", label: "Team Members", icon: Users },
  { number: "15+", label: "Countries Served", icon: Globe },
  { number: "50,000+", label: "Happy Customers", icon: Heart },
  { number: "100%", label: "Natural Products", icon: Leaf }
];

// Certifications
const certifications = [
  {
    title: "ISO 22000",
    description: "Food Safety Management System",
    icon: Shield
  },
  {
    title: "HACCP",
    description: "Hazard Analysis Critical Control Points",
    icon: CheckCircle
  },
  {
    title: "Organic Certified",
    description: "Certified Organic by Leading Bodies",
    icon: Leaf
  },
  {
    title: "FDA Approved",
    description: "Food and Drug Administration Approved",
    icon: Award
  }
];

// Image Skeleton Component
const ImageSkeleton = ({ className = "", aspectRatio = "aspect-video" }: { className?: string; aspectRatio?: string }) => (
  <div className={`${aspectRatio} ${className} bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse flex items-center justify-center`}>
    <div className="text-center text-gray-500">
      <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4 animate-pulse"></div>
      <p className="text-sm font-medium">Image Placeholder</p>
      <p className="text-xs text-gray-400">Content Loading...</p>
    </div>
  </div>
);

export default function AboutPage() {
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
    <div className="min-h-screen bg-brand-fg">
      {/* Notice Bar */}
      <NoticeBar />
      
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section with Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand/8 via-white to-brand/4 relative overflow-hidden">
        <Container>
          <motion.div
            className="max-w-5xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Link 
                href="/"
                className="inline-flex items-center text-brand hover:text-brand-dark transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h1 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight"
                >
                  About Us
                  <span className="text-brand block mt-1 text-2xl md:text-3xl lg:text-4xl">Our Sweet Journey</span>
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                >
                  Since 2018, we've revolutionized sweeteners with natural alternatives. 
                  From humble beginnings to 50,000+ customers across 15+ countries, 
                  our story is one of passion, innovation, and health commitment.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                  <Button size="default" className="px-6">
                    Our Products
                  </Button>
                  <Button variant="outline" size="default" className="px-6">
                    Contact Us
                  </Button>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-br from-brand/10 to-brand/20 rounded-2xl p-8 text-center">
                    <Leaf className="w-16 h-16 text-brand mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-ink mb-2">Natural Sweeteners</h3>
                    <p className="text-gray-600 text-sm">100% plant-based stevia products for healthier living</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand/4 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/6 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These numbers represent real people making healthier choices every day.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {teamStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  custom={index}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-brand" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-ink mb-1">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              {/* Mobile-optimized title */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-3 md:mb-4 leading-tight">
                  Our Story
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-brand font-semibold">
                  From Vision to Reality
                </p>
              </div>
              
              {/* Mobile-first story content */}
              <div className="space-y-6 md:space-y-8">
                {/* The Beginning */}
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-ink mb-2">The Beginning</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        In 2018, health enthusiasts and nutrition experts united with a shared vision - combating the 
                        health crisis from refined sugar consumption. We saw families struggling to make healthy choices 
                        without sacrificing sweetness.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* The Challenge */}
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-ink mb-2">The Challenge</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        Markets were flooded with artificial sweeteners that compromised taste or brought health concerns. 
                        Natural alternatives were expensive, hard to find, or didn't satisfy like traditional sugar.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Our Solution */}
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-ink mb-2">Our Solution</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        We perfected stevia-based sweeteners delivering exceptional taste, proven health benefits, and 
                        accessible pricing. After months of research, we launched our first product - the response was overwhelming.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Today */}
                <motion.div 
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-6 md:p-8 border border-brand/20"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-ink mb-2">Today</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                        We serve 50,000+ customers across 15+ countries, helping families make healthier choices daily. 
                        Our journey continues as we innovate and expand to meet evolving health-conscious consumer needs worldwide.
                      </p>
                      
                      {/* Key achievements */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-xl md:text-2xl font-bold text-brand">50,000+</div>
                          <div className="text-xs md:text-sm text-gray-600 font-medium">Happy Customers</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-xl md:text-2xl font-bold text-brand">15+</div>
                          <div className="text-xs md:text-sm text-gray-600 font-medium">Countries Served</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Our Journey Through Time
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every milestone represents our commitment to bringing healthier sweetening solutions to the world.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-brand/20 hidden lg:block"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    variants={fadeInUp}
                    custom={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col lg:gap-12 gap-6`}
                  >
                    <div className="flex-1">
                      <Card className={`p-6 hover-lift ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                        <div className={`flex items-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-center mb-3`}>
                          <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center mr-3">
                            <milestone.icon className="w-5 h-5 text-brand" />
                          </div>
                          <span className="text-xl font-bold text-brand">{milestone.year}</span>
                        </div>
                        <h3 className="text-lg font-bold text-ink mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{milestone.description}</p>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-brand rounded-full border-2 border-white shadow-md z-10 hidden lg:block"></div>

                    <div className="flex-1 hidden lg:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-to-br from-brand/4 to-brand/8">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide every decision we make and every product we create.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card className="h-full p-6 hover-lift text-center">
                    <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Manufacturing & Quality */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-6">
                  Manufacturing Excellence
                  <span className="text-brand block mt-1 text-xl md:text-2xl lg:text-3xl">Quality You Can Trust</span>
                </h2>
                
                <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                  <p className="text-base">
                    Our state-of-the-art facility combines traditional knowledge with modern technology 
                    to produce the highest quality stevia products. Every batch undergoes rigorous testing for 
                    purity, potency, and safety.
                  </p>
                  
                  <p className="text-base">
                    We work directly with certified stevia farmers ensuring sustainable sourcing and complete 
                    supply chain control. This guarantees the quality and authenticity of every 
                    product bearing our name.
                  </p>
                </div>

                {/* Certifications */}
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <div key={cert.title} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <cert.icon className="w-6 h-6 text-brand flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-ink text-xs">{cert.title}</h4>
                        <p className="text-xs text-gray-600 leading-tight">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <ImageSkeleton className="rounded-2xl shadow-lg" aspectRatio="aspect-[4/3]" />
                <div className="grid grid-cols-2 gap-3">
                  <ImageSkeleton className="rounded-xl" aspectRatio="aspect-square" />
                  <ImageSkeleton className="rounded-xl" aspectRatio="aspect-square" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Behind every great product is a passionate team dedicated to making a difference in people's lives.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card className="p-5 text-center hover-lift">
                    <ImageSkeleton className="rounded-full mx-auto mb-3 w-20 h-20" aspectRatio="aspect-square" />
                    <h3 className="text-base font-bold text-ink mb-1">Team Member {index}</h3>
                    <p className="text-brand font-medium mb-2 text-sm">Position Title</p>
                    <p className="text-xs text-gray-600 leading-relaxed">Brief description of expertise and role in the company.</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center bg-gradient-to-br from-brand to-brand-dark text-white">
                <Users className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-3">Join Our Team</h3>
                <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
                  We're always looking for passionate individuals who share our mission of promoting healthier living 
                  through natural sweeteners. Be part of our growing family!
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" className="bg-white text-brand hover:bg-gray-100 text-sm px-4 py-2">
                    View Open Positions
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm px-4 py-2">
                    Contact HR
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Ready to Connect?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you have questions about our products, want to partner with us, or simply want to learn more 
                about our mission, we'd love to hear from you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-5 text-center hover-lift">
                  <Mail className="w-10 h-10 text-brand mx-auto mb-3" />
                  <h3 className="text-base font-bold text-ink mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-3 text-sm">Get in touch via email</p>
                  <a href="mailto:hello@healthysugar.com" className="text-brand hover:text-brand-dark font-medium text-sm">
                    hello@healthysugar.com
                  </a>
                </Card>

                <Card className="p-5 text-center hover-lift">
                  <Phone className="w-10 h-10 text-brand mx-auto mb-3" />
                  <h3 className="text-base font-bold text-ink mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-3 text-sm">Speak with our team</p>
                  <a href="tel:+916282342985" className="text-brand hover:text-brand-dark font-medium text-sm">
                    +91 6282342985
                  </a>
                </Card>

                <Card className="p-5 text-center hover-lift">
                  <MapPin className="w-10 h-10 text-brand mx-auto mb-3" />
                  <h3 className="text-base font-bold text-ink mb-2">Visit Us</h3>
                  <p className="text-gray-600 mb-3 text-sm">Our headquarters</p>
                  <span className="text-brand font-medium text-sm">Mumbai, Maharashtra, India</span>
                </Card>
              </div>

              <Link href="/contact">
                <Button size="default" className="px-6">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
