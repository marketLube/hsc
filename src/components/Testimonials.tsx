"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";
import { Container } from "./Container";
import { Card, CardContent } from "./Card";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll the preview container to center the current testimonial
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 112 + 12; // w-28 (112px) + gap (12px) for mobile
      const containerWidth = container.clientWidth;
      const scrollPosition = (currentIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-gray-50" id="testimonials">
      <Container>
        <motion.div
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-ink mb-1 sm:mb-3">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Real experiences from people who've made the switch to healthier sweetness.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="p-4 sm:p-6 md:p-8 mx-4 sm:mx-8 text-center relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 text-brand/20">
                    <Quote className="h-8 w-8 sm:h-12 sm:w-12" />
                  </div>

                  <CardContent className="p-0">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={`${currentTestimonial.name} profile picture`}
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4 sm:h-5 sm:w-5",
                            i < currentTestimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-3 sm:mb-4 font-medium">
                      "{currentTestimonial.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <cite className="text-base sm:text-lg font-semibold text-ink not-italic">
                        {currentTestimonial.name}
                      </cite>
                      {currentTestimonial.location && (
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">{currentTestimonial.location}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-premium hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-brand z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-premium hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-brand z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-brand scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* All Testimonials Preview - Horizontal Scrolling */}
          <motion.div
            className="mt-5 sm:mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative">
              {/* Left fade overlay */}
              <div className="absolute left-0 top-0 z-10 w-6 sm:w-8 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
              
              {/* Right fade overlay */}
              <div className="absolute right-0 top-0 z-10 w-6 sm:w-8 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
              
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-3 sm:px-4"
              >
                <div className="flex space-x-3 sm:space-x-4 pb-4" style={{ width: 'max-content' }}>
                  {TESTIMONIALS.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className={cn(
                        "cursor-pointer transition-all duration-300 flex-shrink-0",
                        index === currentIndex ? "scale-105" : "hover:scale-102"
                      )}
                      onClick={() => goToTestimonial(index)}
                      whileHover={{ y: -2 }}
                    >
                      <Card className={cn(
                        "p-3 sm:p-4 w-28 sm:w-32",
                        index === currentIndex ? "ring-2 ring-brand shadow-lg" : ""
                      )}>
                        <CardContent className="p-0">
                          <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                              <Image
                                src={testimonial.avatar}
                                alt={`${testimonial.name} profile picture`}
                                fill
                                className="object-cover rounded-full"
                                sizes="(max-width: 640px) 40px, 48px"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-ink text-xs sm:text-sm truncate w-full">{testimonial.name}</h4>
                              <div className="flex justify-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-2.5 w-2.5 sm:h-3 sm:w-3",
                                      i < testimonial.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    )}
                                  />
                                ))}
                              </div>
                              {testimonial.location && (
                                <p className="text-gray-500 text-xs mt-1 truncate">{testimonial.location}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
