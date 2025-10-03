"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, User, X } from "lucide-react";
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
  const [hasNotice, setHasNotice] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentCartCount, setCurrentCartCount] = useState(cartCount);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    const onPopState = () => setCurrentPath(window.location.pathname);
    const onNotice = () => setHasNotice(!localStorage.getItem("notice-dismissed"));
    const onCartUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { totalItems: number };
      if (detail?.totalItems !== undefined) setCurrentCartCount(detail.totalItems);
    };

    setCurrentPath(window.location.pathname);
    onNotice();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("notice-dismissed", onNotice);
    window.addEventListener("cartUpdated", onCartUpdate as EventListener);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("notice-dismissed", onNotice);
      window.removeEventListener("cartUpdated", onCartUpdate as EventListener);
    };
  }, []);

  useEffect(() => setCurrentCartCount(cartCount), [cartCount]);

  const navItems = useMemo(
    () => [
      { name: "Home", href: "/#home", id: "home" },
      { name: "About", href: "/about", id: "about" },
      { name: "Benefits", href: "/benefits", id: "benefits" },
      { name: "Science", href: "/science", id: "science" },
      { name: "Blog", href: "/blogs", id: "blogs" },
      { name: "Reviews", href: "/#testimonials", id: "testimonials" },
      { name: "Contact", href: "/contact", id: "contact" },
    ],
    []
  );

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    setIsMobileOpen(false);
    
    // Handle routes that go to separate pages
    if (["about", "benefits", "science", "blogs", "contact"].includes(id)) return;
    
    // Handle Home and Reviews - navigate to homepage first if needed, then scroll
    if (id === "home" || id === "testimonials") {
      e.preventDefault();
      
      // If we're not on homepage, navigate there first
      if (currentPath !== "/") {
        window.location.href = id === "home" ? "/" : "/#testimonials";
        return;
      }
      
      // If we're already on homepage, just scroll to section
      const targetId = id === "home" ? "home" : "testimonials";
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    
    // Handle other anchor links on homepage
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fancy hover bubble for desktop nav
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const headerTopClass = hasNotice
    ? isScrolled
      ? "top-8 sm:top-10"
      : "top-12 sm:top-14"
    : isScrolled
    ? "top-2 sm:top-3"
    : "top-3 sm:top-4";

  return (
    <motion.header
      className={cn("fixed left-0 right-0 z-50", headerTopClass)}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <Container>
        <motion.nav
          className={cn(
            "mobile-nav-container flex items-center justify-between rounded-2xl transition-all duration-300",
            // Maximum glassmorphism effect when scrolled - completely opaque with consistent height
            isScrolled
              ? "border border-white/40 bg-white/80 backdrop-blur-[40px] shadow-2xl shadow-black/30 px-5 py-3 backdrop-saturate-[1.8]"
              : "border border-gray-200/50 bg-white/95 backdrop-blur-md shadow-premium px-5 py-3"
          )}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          {/* Left: Logo */}
          <Link href="/" aria-label="The Healthy Sugar Company - Home" className="flex items-center">
            <img
              src="/images/Healthy Sugar company HSC logo-18.svg"
              alt="The Healthy Sugar Company logo"
              className="h-6 w-auto md:h-7"
              style={{ maxWidth: "170px" }}
            />
          </Link>

          {/* Center: Links */}
          <div className="relative hidden lg:flex items-center gap-2">
            {navItems.map((item, idx) => {
              const active =
                (currentPath === "/" && item.id === "home") ||
                (currentPath === "/about" && item.id === "about") ||
                (currentPath === "/benefits" && item.id === "benefits") ||
                (currentPath === "/science" && item.id === "science") ||
                (currentPath.startsWith("/blogs") && item.id === "blogs") ||
                (currentPath === "/contact" && item.id === "contact");
              return (
                <motion.div
                  key={item.name}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + idx * 0.03, type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                    className={cn(
                      "relative rounded-full px-3 py-1 text-[0.925rem] font-medium leading-none transition-colors",
                      active 
                        ? "text-brand" 
                        : isScrolled 
                          ? "text-gray-900 hover:text-brand font-semibold" 
                          : "text-gray-700 hover:text-brand"
                    )}
                  >
                    {/* Only show background for active state, not hover */}
                    {active && (
                      <motion.span
                        layoutId="navBubble"
                        className="absolute inset-0 -z-10 rounded-full bg-brand/10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                    {/* Underline for both active and hover states */}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: active || hoveredId === item.id ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/profile"
              className={cn("p-2 rounded-xl transition-colors", currentPath === "/profile" ? "bg-brand/10" : "hover:bg-gray-100")}
              aria-label="User account and profile settings"
            >
              <User className={cn("h-5 w-5", currentPath === "/profile" ? "text-brand" : isScrolled ? "text-gray-900" : "text-gray-600")} />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label={`Shopping cart with ${currentCartCount} ${currentCartCount === 1 ? "item" : "items"}`}
            >
              <ShoppingCart className={cn("h-5 w-5", isScrolled ? "text-gray-900" : "text-gray-600")} />
              {currentCartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {currentCartCount > 99 ? "99+" : currentCartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors lg:hidden"
              aria-label={isMobileOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileOpen ? <X className={cn("h-5 w-5", isScrolled ? "text-gray-900" : "text-gray-600")} /> : <Menu className={cn("h-5 w-5", isScrolled ? "text-gray-900" : "text-gray-600")} />}
            </button>

            <Button size="sm" className="ml-2 hidden sm:inline-flex h-7 items-center overflow-hidden px-3 relative">
              <span className="relative z-10">Shop</span>
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ width: "50%", transform: "skewX(-20deg)" }}
              />
            </Button>
          </div>
        </motion.nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="lg:hidden">
            <Container>
              <motion.div
                id="mobile-navigation-menu"
                className={cn(
                  "mt-2 overflow-hidden rounded-2xl transition-all duration-300",
                  // Maximum glassmorphism effect when scrolled to match navbar - completely opaque with consistent height
                  isScrolled
                    ? "border border-white/40 bg-white/80 backdrop-blur-[40px] shadow-2xl shadow-black/30 backdrop-saturate-[1.8]"
                    : "border border-gray-200/50 bg-white/95 backdrop-blur-md shadow-premium"
                )}
                layout
              >
                <div className="py-2">
                  {navItems.map((item, index) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(item.id, e)}
                        className={cn(
                          "flex items-center justify-between px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50",
                          isScrolled ? "text-gray-900 font-semibold" : "text-gray-700"
                        )}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="border-t border-gray-100 px-5 pt-2">
                    <Button size="sm" className="mb-2 w-full">Shop Now</Button>
                  </div>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCartUpdate={setCurrentCartCount} />
    </motion.header>
  );
}
