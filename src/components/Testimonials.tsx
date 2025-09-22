"use client";

import { useState, useEffect } from "react";
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-12 bg-gray-50" id="testimonials">
      <Container>
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            What Our Customers Say
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
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
                <Card className="p-6 md:p-8 text-center relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-brand/20">
                    <Quote className="h-12 w-12" />
                  </div>

                  <CardContent className="p-0">
                    {/* Avatar */}
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={`${currentTestimonial.name} profile picture`}
                        fill
                        className="object-cover rounded-full"
                        sizes="64px"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < currentTestimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 font-medium">
                      "{currentTestimonial.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <cite className="text-lg font-semibold text-ink not-italic">
                        {currentTestimonial.name}
                      </cite>
                      {currentTestimonial.location && (
                        <p className="text-gray-600 mt-1">{currentTestimonial.location}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-premium hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-brand"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-premium hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-brand"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-3">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-brand scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* All Testimonials Preview */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  index === currentIndex ? "scale-105" : "hover:scale-102"
                )}
                onClick={() => goToTestimonial(index)}
                whileHover={{ y: -4 }}
              >
                <Card className={cn(
                  "p-4 h-full",
                  index === currentIndex ? "ring-2 ring-brand shadow-lg" : ""
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={testimonial.avatar}
                          alt={`${testimonial.name} profile picture`}
                          fill
                          className="object-cover rounded-full"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
