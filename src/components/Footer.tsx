import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/#products" },
    { name: "Benefits", href: "/benefits" },
    { name: "Science", href: "/#science" },
    { name: "Reviews", href: "/#testimonials" },
  ];

  const support = [
    { name: "FAQ", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Contact Us", href: "/contact" },
    { name: "Track Order", href: "#" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-ink text-white" id="contact">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">H</span>
                </div>
                <span className="font-bold text-xl">The Healthy Sugar Company</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Making healthier choices accessible with premium stevia-based sweeteners. 
                Plant-powered sweetness for modern lifestyles.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@healthysugar.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 6282342985</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-6">Legal</h3>
              <ul className="space-y-3 mb-8">
                {legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} The Healthy Sugar Company. All rights reserved.
            </div>

            {/* Payment Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <CreditCard className="h-3 w-3 text-gray-400" />
                </div>
                <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">UPI</span>
                </div>
                <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">GPay</span>
                </div>
                <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">PayTM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              †This product is not intended to diagnose, treat, cure, or prevent any disease. 
              Individual results may vary. Consult your healthcare provider before making dietary changes, 
              especially if you have diabetes or other health conditions. The statements on this website 
              have not been evaluated by the Food and Drug Administration.
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
