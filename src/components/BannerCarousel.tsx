"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";
import { HERO_SLIDES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero banner carousel"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt=""
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/60 to-brand/40" />
          </div>

          {/* Content */}
          <Container className="relative h-full flex items-center justify-center px-4 sm:px-6">
            <motion.div
              className="max-w-2xl text-white text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 md:mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
              
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 text-white/90 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Button
                  size="default"
                  className="bg-white text-brand hover:bg-white/90 sm:h-16 sm:px-10 sm:py-5 sm:text-lg"
                  onClick={() => document.querySelector(HERO_SLIDES[currentSlide].cta1.href)?.scrollIntoView({ behavior: "smooth" })}
                >
                  {HERO_SLIDES[currentSlide].cta1.text}
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand sm:h-16 sm:px-10 sm:py-5 sm:text-lg"
                  onClick={() => document.querySelector(HERO_SLIDES[currentSlide].cta2.href)?.scrollIntoView({ behavior: "smooth" })}
                >
                  {HERO_SLIDES[currentSlide].cta2.text}
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex absolute inset-y-0 left-4 items-center">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-4 items-center">
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 sm:space-x-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}
