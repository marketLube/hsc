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
  Shield
} from "lucide-react";
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
              Get in Touch
              <span className="text-brand block mt-2">We're Here to Help</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Have questions about our products? Need support? Want to learn more about healthy sweeteners? 
              We'd love to hear from you and help you on your journey to healthier living.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
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
                Multiple Ways to Reach Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the method that works best for you. Our friendly team is ready to assist you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card hover className="h-full p-8 text-center hover-lift">
                    <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <method.icon className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <a 
                      href={method.action}
                      className="text-brand hover:text-brand-dark font-medium transition-colors"
                    >
                      {method.contact}
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div variants={fadeInUp}>
              <Card className="max-w-2xl mx-auto p-8">
                <div className="text-center mb-6">
                  <Clock className="w-12 h-12 text-brand mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-ink mb-2">Office Hours</h3>
                  <p className="text-gray-600">We're available during these times</p>
                </div>
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-ink">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-ink mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We've received your message and will respond within 24 hours.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.div variants={fadeInUp}>
                <Card className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
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
                About The Healthy Sugar Company
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Leading the revolution in natural sweeteners since 2018, committed to improving 
                global health through plant-based alternatives.
              </p>
            </motion.div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
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

            {/* Company Story */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Story</h3>
                  <div className="space-y-4 text-white/90">
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
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Heart className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Health First</h4>
                      <p className="text-white/90 text-sm">
                        Every product is designed with your health and wellbeing as our top priority.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Leaf className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">100% Natural</h4>
                      <p className="text-white/90 text-sm">
                        We use only natural, plant-based ingredients with no artificial additives.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Quality Assured</h4>
                      <p className="text-white/90 text-sm">
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
      <section className="py-20 bg-white" id="location">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
                Visit Our Headquarters
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Located in the heart of Wellness City, our office is always open to visitors. 
                Schedule a tour and see how we create our healthy products.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <Card className="p-8">
                  <MapPin className="w-12 h-12 text-brand mb-6" />
                  <h3 className="text-2xl font-bold text-ink mb-4">Our Address</h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-lg">
                      <strong>The Healthy Sugar Company</strong><br />
                      123 Health Street<br />
                      Wellness City, WC 12345<br />
                      United States
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p><strong>Parking:</strong> Free visitor parking available</p>
                      <p><strong>Public Transport:</strong> Metro Line 2, Health Station</p>
                      <p><strong>Accessibility:</strong> Wheelchair accessible entrance</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline">
                      Get Directions
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                {/* Map Placeholder */}
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">Map integration would go here</p>
                    </div>
                  </div>
                </div>
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
