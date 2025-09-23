"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Users,
  Award,
  Leaf,
  Heart,
  Globe,
  Shield,
  MessageSquare,
  Headphones,
  Calendar,
  Star
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

// Company stats
const companyStats = [
  { number: "2018", label: "Founded", icon: Award },
  { number: "50,000+", label: "Happy Customers", icon: Users },
  { number: "15+", label: "Countries Served", icon: Globe },
  { number: "100%", label: "Natural Products", icon: Leaf }
];

// Contact methods
const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@healthysugar.com",
    action: "mailto:hello@healthysugar.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "123 Health Street, Wellness City, WC 12345",
    action: "#location"
  }
];

// Office hours
const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" }
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

// Support features
const supportFeatures = [
  {
    icon: MessageSquare,
    title: "Live Chat Support",
    description: "Get instant help with our live chat feature",
    availability: "24/7 Available"
  },
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Speak directly with our customer service team",
    availability: "Mon-Fri 9AM-6PM"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions via email",
    availability: "Response within 24hrs"
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a convenient time to discuss your needs",
    availability: "Flexible Scheduling"
  }
];

export default function ContactPage() {
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Store in localStorage for demo
      localStorage.setItem("contact-form", JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Notice Bar */}
      <NoticeBar />
      
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section with Banner */}
      <section className="pt-40 pb-12 bg-gradient-to-br from-brand/5 via-white to-brand/3 relative overflow-hidden">
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
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Home
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h1 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight"
                >
                  Get in Touch
                  <span className="text-brand block mt-1 text-2xl md:text-3xl lg:text-4xl">We're Here to Help</span>
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                >
                  Have questions about our products? Need support? Want to learn more about healthy sweeteners? 
                  We'd love to hear from you and help you on your journey to healthier living.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                  <Button size="sm" className="text-sm">
                    <MessageSquare className="w-4 h-4 mr-1.5" />
                    Start Live Chat
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Schedule Call
                  </Button>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                <ImageSkeleton className="rounded-2xl shadow-lg" aspectRatio="aspect-[4/3]" />
              </motion.div>
            </div>
          </motion.div>
        </Container>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/3 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Support Features Banner */}
      <section className="py-10 bg-gradient-to-r from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Multiple Ways to Get Support
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Choose the support method that works best for you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  custom={index}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors h-full flex flex-col justify-between min-h-[180px]"
                >
                  <div className="flex flex-col items-center flex-grow">
                    <feature.icon className="w-8 h-8 mx-auto mb-4 text-white" />
                    <h3 className="text-base font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed flex-grow flex items-center">{feature.description}</p>
                  </div>
                  <span className="text-sm text-white/90 bg-white/20 px-3 py-1.5 rounded-full font-medium">
                    {feature.availability}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the method that works best for you. Our friendly team is ready to assist you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card hover className="h-full p-5 text-center hover-lift">
                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm">{method.description}</p>
                    <a 
                      href={method.action}
                      className="text-brand hover:text-brand-dark font-medium transition-colors text-sm"
                    >
                      {method.contact}
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div variants={fadeInUp}>
              <Card className="max-w-xl mx-auto p-6">
                <div className="text-center mb-4">
                  <Clock className="w-8 h-8 text-brand mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-ink mb-1">Office Hours</h3>
                  <p className="text-gray-600 text-sm">We're available during these times</p>
                </div>
                <div className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-ink text-sm">{schedule.day}</span>
                      <span className="text-gray-600 text-sm">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-ink mb-3">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Thank you for reaching out. We've received your message and will respond within 24 hours.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Message
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.div variants={fadeInUp}>
                <Card className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="text-center pt-2">
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isSubmitting}
                        className="min-w-[160px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 mr-1.5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </section>

      {/* About Company Section */}
      <section className="py-12 bg-gradient-to-br from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                About The Healthy Sugar Company
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Leading the revolution in natural sweeteners since 2018, committed to improving 
                global health through plant-based alternatives.
              </p>
            </motion.div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  custom={index}
                  className="text-center"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold mb-1">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Company Story */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-lg font-bold mb-4">Our Story</h3>
                  <div className="space-y-3 text-white/90 text-sm">
                    <p>
                      Founded in 2018 by health enthusiasts and nutrition experts, The Healthy Sugar Company 
                      was born from a simple mission: to make healthy, natural sweeteners accessible to everyone.
                    </p>
                    <p>
                      We recognized the growing health crisis caused by refined sugar consumption and saw an 
                      opportunity to provide a better alternative. Our stevia-based products offer the sweetness 
                      people love without the health risks.
                    </p>
                    <p>
                      Today, we're proud to serve over 50,000 customers across 15+ countries, helping families 
                      make healthier choices without sacrificing taste.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold mb-1 text-sm">Health First</h4>
                      <p className="text-white/90 text-xs">
                        Every product is designed with your health and wellbeing as our top priority.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Leaf className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold mb-1 text-sm">100% Natural</h4>
                      <p className="text-white/90 text-xs">
                        We use only natural, plant-based ingredients with no artificial additives.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold mb-1 text-sm">Quality Assured</h4>
                      <p className="text-white/90 text-xs">
                        Rigorous testing and quality control ensure every product meets our high standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Location Section */}
      <section className="py-10 bg-white" id="location">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Visit Our Headquarters
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Located in the heart of Wellness City, our office is always open to visitors. 
                Schedule a tour and see how we create our healthy products.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full flex flex-col">
                  <MapPin className="w-8 h-8 text-brand mb-4" />
                  <h3 className="text-lg font-bold text-ink mb-3">Our Address</h3>
                  <div className="space-y-3 text-gray-600 flex-grow">
                    <p className="text-sm">
                      <strong>The Healthy Sugar Company</strong><br />
                      123 Health Street<br />
                      Wellness City, WC 12345<br />
                      United States
                    </p>
                    <div className="pt-3 border-t border-gray-200 text-xs space-y-1">
                      <p><strong>Parking:</strong> Free visitor parking available</p>
                      <p><strong>Public Transport:</strong> Metro Line 2, Health Station</p>
                      <p><strong>Accessibility:</strong> Wheelchair accessible entrance</p>
                    </div>
                    
                    {/* Office Features */}
                    <div className="pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-ink mb-2">Office Features</h4>
                      <div className="text-xs space-y-1">
                        <p><strong>Tour Available:</strong> Schedule guided facility tours</p>
                        <p><strong>Meeting Rooms:</strong> Professional consultation spaces</p>
                        <p><strong>Product Samples:</strong> Try our products on-site</p>
                        <p><strong>Visitor Hours:</strong> Monday-Friday 9AM-5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Get Directions
                      </Button>
                      <Button size="sm" className="flex-1">
                        Schedule Tour
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                {/* Main Office Image */}
                <div className="relative group cursor-pointer">
                  <ImageSkeleton className="rounded-2xl shadow-lg" aspectRatio="aspect-[4/3]" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-sm font-medium text-ink">View Office Gallery</span>
                    </div>
                  </div>
                </div>
                
                {/* Image Gallery Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative group cursor-pointer">
                    <ImageSkeleton className="rounded-xl" aspectRatio="aspect-square" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-ink">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <ImageSkeleton className="rounded-xl" aspectRatio="aspect-square" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-ink">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <ImageSkeleton className="rounded-xl" aspectRatio="aspect-square" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-brand/90 backdrop-blur-sm rounded-xl">
                        <div className="text-center p-2">
                          <span className="text-xs font-bold text-white">+5</span>
                          <p className="text-xs text-white/80">More</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Gallery Info */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Office Gallery</h4>
                      <p className="text-xs text-gray-600">8 photos available</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1">
                      View All
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>


      {/* FAQ Section */}
      <section className="py-10 bg-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about our products and services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div variants={fadeInUp}>
                <div className="space-y-4">
                  {[
                    {
                      question: "How do I contact customer support?",
                      answer: "You can reach us via email, phone, live chat, or by filling out our contact form. We respond to all inquiries within 24 hours."
                    },
                    {
                      question: "What are your business hours?",
                      answer: "We're available Monday-Friday 9AM-6PM and Saturday 10AM-4PM. Our live chat support is available 24/7."
                    },
                    {
                      question: "Do you offer international shipping?",
                      answer: "Yes, we ship to 15+ countries worldwide. Shipping costs and delivery times vary by location."
                    },
                    {
                      question: "Can I schedule a product consultation?",
                      answer: "Absolutely! Use our 'Schedule Call' button to book a convenient time to discuss your specific needs with our experts."
                    }
                  ].map((faq, index) => (
                    <Card key={index} className="p-4 hover-lift">
                      <h4 className="font-bold text-ink mb-2 text-sm">{faq.question}</h4>
                      <p className="text-gray-600 leading-relaxed text-xs">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ImageSkeleton className="rounded-2xl shadow-lg mb-4" aspectRatio="aspect-[4/3]" />
                <Card className="p-5 text-center bg-gradient-to-br from-brand/5 to-brand/10">
                  <MessageSquare className="w-8 h-8 text-brand mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-ink mb-2">Still Have Questions?</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Can't find what you're looking for? Our support team is here to help with any questions you might have.
                  </p>
                  <Button size="sm">
                    Ask a Question
                  </Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
