import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
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
        <div className="py-8 sm:py-12 md:py-16">
          {/* Mobile Layout: New Structure */}
          <div className="block sm:hidden">
            <div className="space-y-8">
              {/* Company Details - Center Aligned */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Brand Section */}
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                  <span className="font-bold text-base leading-tight">The Healthy Sugar Company</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm max-w-xs mx-auto">
                  Making healthier choices accessible with premium stevia-based sweeteners.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">hello@healthysugar.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">+91 6282342985</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </motion.div>

              {/* Legal (Left) and Support (Right) */}
              <div className="grid grid-cols-2 gap-6">
                {/* Legal - Left */}
                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="font-semibold text-sm mb-4">Legal</h3>
                  <ul className="space-y-2">
                    {legal.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-xs"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support - Right */}
                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="font-semibold text-sm mb-4">Support</h3>
                  <ul className="space-y-2">
                    {support.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-xs"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Social Links - Center */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="font-semibold mb-4 text-sm">Follow Us</h4>
                <div className="flex justify-center space-x-4">
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
              </motion.div>
            </div>
          </div>

          {/* Desktop/Tablet Layout: Original Grid */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Brand Section */}
              <motion.div
                className="lg:col-span-1 text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">H</span>
                  </div>
                  <span className="font-bold text-lg sm:text-xl">The Healthy Sugar Company</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Making healthier choices accessible with premium stevia-based sweeteners. 
                  Plant-powered sweetness for modern lifestyles.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 text-gray-300">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">hello@healthysugar.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 text-gray-300">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">+91 6282342985</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 text-gray-300">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-6">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-6">Support</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {support.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal & Social */}
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-6">Legal</h3>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                  {legal.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
                  <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand transition-colors"
                        aria-label={social.name}
                      >
                        <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-6 sm:py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} The Healthy Sugar Company. All rights reserved.
            </div>

            {/* Payment Icons */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
              <span className="text-gray-400 text-xs sm:text-sm">We accept:</span>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {/* UPI */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none" className="sm:w-[18px] sm:h-3">
                    <path d="M2 4v6h2V6h2v4h2V4H2zm6 0v6h2V6h2v4h2V4h-6zm8 0v6h2V4h-2zm4 0v6h2V4h-2z" fill="white"/>
                    <circle cx="16" cy="8" r="1.5" fill="white"/>
                  </svg>
                </div>
                
                {/* Google Pay */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-600 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 40 24" fill="none" className="sm:w-[18px] sm:h-3">
                    <path d="M19.26 9.71c0 2.18-1.7 3.78-3.78 3.78s-3.78-1.6-3.78-3.78c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#4285F4"/>
                    <path d="M15.48 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                    <path d="M8.33 9.71c0 2.18-1.7 3.78-3.78 3.78S.77 11.89.77 9.71c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#34A853"/>
                    <path d="M4.55 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                    <path d="M30.19 9.71c0 2.18-1.7 3.78-3.78 3.78s-3.78-1.6-3.78-3.78c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#EA4335"/>
                    <path d="M26.41 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                    <path d="M35.5 6.5h-2v1.5h2v1.5h-2v1.5h2v1.5h-3.5V5h3.5v1.5z" fill="#4285F4"/>
                  </svg>
                </div>
                
                {/* PhonePe */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none" className="sm:w-[18px] sm:h-3">
                    <path d="M4 4h3c1.5 0 2.5 1 2.5 2.5S8.5 9 7 9H4V4zm0 6h2.5L9 14h2L8.5 10H7c2 0 3.5-1.5 3.5-3.5S9 3 7 3H2v11h2v-4z" fill="white"/>
                    <path d="M13 4v1.5h3v1.5h-1.5v1.5h1.5v1.5H13v1.5h4.5V4H13zm6 0v6h1.5V6h1.5v4h1.5V4H19z" fill="white"/>
                  </svg>
                </div>
                
                {/* Paytm */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none" className="sm:w-[18px] sm:h-3">
                    <path d="M3 4h3c1.5 0 2.5 1 2.5 2.5S7.5 9 6 9H3V4zm0 6h2.5l2 3h2L7.5 10H6c2 0 3.5-1.5 3.5-3.5S8 3 6 3H1v10h2v-3z" fill="white"/>
                    <path d="M12 4v1h2v1h-1v1h1v1h-2v1h3V4h-3zm4 0v6h1V6h1v4h1V4h-3z" fill="white"/>
                    <circle cx="20" cy="8" r="1.5" fill="white"/>
                  </svg>
                </div>
                
                {/* Visa */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-600 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 32 20" fill="none" className="sm:w-[18px] sm:h-3">
                    <path d="M13.8 6L11.2 14h2.4L16.2 6h-2.4zM9.8 6L7.4 11.6 6.8 8.8C6.6 7.8 5.8 6.8 4.8 6.4L2 6v.4h2.8c.8 0 1.4.4 1.6 1L8.2 14h2.4L14 6H9.8zM22.4 6c-.8 0-1.4.4-1.4 1L20.6 14h2.4l.4-1h2.8l.4 1H29L26.8 6h-4.4zm.8 4.4l1.2-3.2.6 3.2h-1.8zM18.6 6L17.4 14h2.4L21 6h-2.4z" fill="#1A1F71"/>
                  </svg>
                </div>
                
                {/* Mastercard */}
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-600 rounded flex items-center justify-center shadow-sm">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none" className="sm:w-[18px] sm:h-3">
                    <circle cx="8" cy="8" r="6" fill="#EB001B"/>
                    <circle cx="16" cy="8" r="6" fill="#F79E1B"/>
                    <path d="M12 4c-1.2 1.2-2 2.8-2 4s.8 2.8 2 4c1.2-1.2 2-2.8 2-4s-.8-2.8-2-4z" fill="#FF5F00"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed text-center px-4 sm:px-0">
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
