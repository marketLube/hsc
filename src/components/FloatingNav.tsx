"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";
import { Cart } from "./Cart";
import { cn } from "@/lib/utils";

interface FloatingNavProps {
  cartCount?: number;
}

export function FloatingNav({ cartCount = 0 }: FloatingNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentCartCount, setCurrentCartCount] = useState(cartCount);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
      }
    };

    // Check if notice bar is dismissed
    const checkNoticeVisibility = () => {
      const dismissed = localStorage.getItem("notice-dismissed");
      setIsNoticeVisible(!dismissed);
    };

    // Handle cart updates from other components
    const handleCartUpdate = (event: CustomEvent) => {
      setCurrentCartCount(event.detail.totalItems);
    };

    // Track current path
    const updateCurrentPath = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
      }
    };

    // Initial checks
    checkNoticeVisibility();
    updateCurrentPath();

    // Listen for notice dismissal events
    const handleNoticeChange = () => {
      checkNoticeVisibility();
    };

    // Listen for navigation changes
    const handlePopState = () => {
      updateCurrentPath();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("storage", handleNoticeChange);
      window.addEventListener("notice-dismissed", handleNoticeChange);
      window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("storage", handleNoticeChange);
        window.removeEventListener("notice-dismissed", handleNoticeChange);
        window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  // Set up intersection observer for section detection
  useEffect(() => {
    const sections = [
      "home",
      "benefits", 
      "products",
      "science",
      "blogs",
      "testimonials",
      "contact"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-nav-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Update cart count when prop changes
  useEffect(() => {
    setCurrentCartCount(cartCount);
  }, [cartCount]);

  const navItems = [
    { name: "Home", href: "/#home", sectionId: "home" },
    { name: "About", href: "/about", sectionId: "about" },
    { name: "Benefits", href: "/benefits", sectionId: "benefits" },
    { name: "Science", href: "/science", sectionId: "science" },
    { name: "Blog", href: "/blogs", sectionId: "blogs" },
    { name: "Reviews", href: "/#testimonials", sectionId: "testimonials" },
    { name: "Contact", href: "/contact", sectionId: "contact" },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string, event: React.MouseEvent) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // For dedicated pages (about, benefits, science, blogs, contact), let the Link handle navigation
    if (sectionId === "about" || sectionId === "benefits" || sectionId === "science" || sectionId === "blogs" || sectionId === "contact") {
      return; // Let the Link component handle the navigation
    }
    
    // For home page sections, prevent default and scroll
    event.preventDefault();
    
    if (typeof window !== 'undefined') {
      // If we're on a different page, navigate to home first
      if (window.location.pathname !== "/") {
        window.location.href = `/#${sectionId}`;
        return;
      }
      
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 120; // Account for floating nav height + notice bar
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        // Adjust top position based on notice bar visibility and scroll state
        // Moved higher on mobile to accommodate floating action buttons
        isNoticeVisible 
          ? (isScrolled ? "top-8 sm:top-12" : "top-12 sm:top-16") // Notice bar visible: higher on mobile
          : (isScrolled ? "top-1 sm:top-2" : "top-2 sm:top-4")   // Notice bar hidden: higher on mobile
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <motion.nav
          className={cn(
            "bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-premium transition-all duration-300 mobile-nav-container",
            isScrolled ? "py-2 px-4" : "py-3 px-6"
          )}
          layout
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center space-x-2"
                aria-label="The Healthy Sugar Company - Home"
              >
                <div 
                  className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center"
                  role="img"
                  aria-label="The Healthy Sugar Company logo"
                >
                  <span className="text-white font-bold text-sm" aria-hidden="true">H</span>
                </div>
                <span className="font-bold text-lg text-brand hidden sm:block">
                  The Healthy Sugar Company
                </span>
                <span className="font-bold text-lg text-brand sm:hidden">
                  HSC
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav 
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId || 
                  (currentPath === "/about" && item.sectionId === "about") ||
                  (currentPath === "/benefits" && item.sectionId === "benefits") ||
                  (currentPath === "/science" && item.sectionId === "science") ||
                  (currentPath.startsWith("/blogs") && item.sectionId === "blogs") ||
                  (currentPath === "/contact" && item.sectionId === "contact");
                
                return (
                  <motion.div key={item.name} className="relative">
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(item.sectionId, e)}
                      className={cn(
                        "relative font-medium text-sm transition-all duration-300 hover:text-brand",
                        isActive 
                          ? "text-brand" 
                          : "text-gray-700"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Navigate to ${item.name} ${isActive ? '(current page)' : ''}`}
                    >
                      {item.name}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand rounded-full"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30,
                            duration: 0.3
                          }}
                          aria-hidden="true"
                        />
                      )}
                      
                      {/* Hover indicator */}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand/30 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: isActive ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center">
              {/* Icon Group - moved left, tighter spacing */}
              <div className="flex items-center space-x-1">
                {/* Account */}
                <Link
                  href="/profile"
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    currentPath === "/profile"
                      ? "bg-brand/10 hover:bg-brand/20"
                      : "hover:bg-gray-100"
                  )}
                  aria-label="User account and profile settings"
                  title="Account"
                >
                  <User className={cn(
                    "h-5 w-5 transition-colors",
                    currentPath === "/profile"
                      ? "text-brand"
                      : "text-gray-600"
                  )} />
                </Link>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label={`Shopping cart with ${currentCartCount} ${currentCartCount === 1 ? 'item' : 'items'}`}
                  title={`Cart (${currentCartCount})`}
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  {currentCartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      aria-label={`${currentCartCount} items in cart`}
                      role="status"
                    >
                      {currentCartCount > 99 ? "99+" : currentCartCount}
                    </motion.span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-navigation-menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Shop Button - more space on the left */}
              <div className="ml-4">
                <Button size="sm" className="hidden sm:inline-flex relative overflow-hidden">
                  <span className="relative z-10">Shop</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0,
                      ease: "linear"
                    }}
                    style={{
                      width: '50%',
                      height: '100%',
                      transform: 'skewX(-20deg)'
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </motion.nav>
      </Container>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mobile-nav-container"
          >
            <Container>
              <motion.div
                id="mobile-navigation-menu"
                className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-premium mt-2 overflow-hidden"
                layout
                role="navigation"
                aria-label="Mobile navigation menu"
              >
                <div className="py-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.sectionId || 
                      (typeof window !== 'undefined' && window.location.pathname === "/about" && item.sectionId === "about") ||
                      (typeof window !== 'undefined' && window.location.pathname === "/benefits" && item.sectionId === "benefits") ||
                      (typeof window !== 'undefined' && window.location.pathname === "/science" && item.sectionId === "science") ||
                      (typeof window !== 'undefined' && window.location.pathname.startsWith("/blogs") && item.sectionId === "blogs") ||
                      (typeof window !== 'undefined' && window.location.pathname === "/contact" && item.sectionId === "contact");
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => scrollToSection(item.sectionId, e)}
                          className={cn(
                            "flex items-center justify-between px-6 py-3 font-medium transition-all duration-300 hover:bg-gray-50",
                            isActive 
                              ? "text-brand bg-brand/5 border-r-2 border-brand" 
                              : "text-gray-700"
                          )}
                        >
                          <span>{item.name}</span>
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-brand rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile Shop Button */}
                  <div className="px-6 pt-4 border-t border-gray-100 mt-2">
                    <Button size="sm" className="w-full relative overflow-hidden">
                      <span className="relative z-10">Shop Now</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0,
                          ease: "linear"
                        }}
                        style={{
                          width: '50%',
                          height: '100%',
                          transform: 'skewX(-20deg)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Component */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCartUpdate={setCurrentCartCount}
      />
    </motion.header>
  );
}
