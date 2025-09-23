"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, ChefHat, Blend, Cake, Milk } from "lucide-react";
import { Container } from "./Container";
import { Card, CardContent } from "./Card";
import { USE_CASES } from "@/lib/data";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export function UseCases() {
  const [activeUseCase, setActiveUseCase] = useState("tea");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentUseCase = USE_CASES.find(uc => uc.id === activeUseCase);
  const recommendedProducts = PRODUCTS.filter(p => 
    currentUseCase?.products.includes(p.id)
  );

  const icons = {
    tea: Leaf,
    coffee: Coffee,
    baking: ChefHat,
    smoothies: Blend,
    desserts: Cake,
    yogurt: Milk,
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveUseCase(current => {
        const currentIndex = USE_CASES.findIndex(uc => uc.id === current);
        const nextIndex = (currentIndex + 1) % USE_CASES.length;
        return USE_CASES[nextIndex].id;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualSelect = (useCaseId: string) => {
    setActiveUseCase(useCaseId);
    setIsAutoPlaying(false); // Stop auto-play when user manually selects
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const backgroundImages = {
    tea: "linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(22, 163, 74, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpIi8+Cjwvc3ZnPgo=')",
    coffee: "linear-gradient(135deg, rgba(120, 53, 15, 0.8), rgba(92, 41, 12, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDhIMThBNCA0IDAgMCAxIDE4IDE2SDE3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMyA4SDE3VjE4QTE0IDE0IDAgMCAxIDMgMThWOFoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiLz4KPHBhdGggZD0iTTcgNFY4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTEgNFY4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K')",
    baking: "linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(217, 119, 6, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMTNIMThMMjAgMTlINEw2IDEzWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIvPgo8cGF0aCBkPSJNMTIgMlY2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgNkM5IDYgNiA5IDYgMTMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMiA2QzE1IDYgMTggOSAxOCAxMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')",
    smoothies: "linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBWOEE0IDQgMCAwIDEgMTYgOFYxMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYgMTBIMThMMTcgMjBIN0w2IDEwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIvPgo8L3N2Zz4K')",
    desserts: "linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(219, 39, 119, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDNBNyA3IDAgMCAwIDUgMTBWMTdBNSA1IDAgMCAwIDEwIDIySDE0QTUgNSAwIDAgMCAxOSAxN1YxMEE3IDcgMCAwIDAgMTIgM1oiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiLz4KPHBhdGggZD0iTTEyIDNWOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==')",
    yogurt: "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBWOEE0IDQgMCAwIDEgMTYgOFYxMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYgMTBIMThWMTZBNCA0IDAgMCAxIDE0IDIwSDEwQTQgNCAwIDAgMSA2IDE2VjEwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIvPgo8L3N2Zz4K')"
  };

  // Animated decorative elements
  const AnimatedElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left side animated elements */}
      <motion.div
        key={`left-${activeUseCase}`}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
        animate={{ 
          x: [-100, 20, -100],
          opacity: [0, 0.6, 0],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      >
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-lg",
          activeUseCase === "tea" && "bg-green-100 text-green-600",
          activeUseCase === "coffee" && "bg-amber-100 text-amber-700",
          activeUseCase === "baking" && "bg-orange-100 text-orange-600",
          activeUseCase === "smoothies" && "bg-purple-100 text-purple-600",
          activeUseCase === "desserts" && "bg-pink-100 text-pink-600",
          activeUseCase === "yogurt" && "bg-blue-100 text-blue-600"
        )}>
          {React.createElement(icons[activeUseCase as keyof typeof icons], { 
            className: "w-8 h-8" 
          })}
        </div>
      </motion.div>

      {/* Right side animated elements */}
      <motion.div
        key={`right-${activeUseCase}`}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
        animate={{ 
          x: [100, -20, 100],
          opacity: [0, 0.6, 0],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: 0.5
        }}
      >
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
          activeUseCase === "tea" && "bg-green-50 text-green-500",
          activeUseCase === "coffee" && "bg-amber-50 text-amber-600",
          activeUseCase === "baking" && "bg-orange-50 text-orange-500",
          activeUseCase === "smoothies" && "bg-purple-50 text-purple-500",
          activeUseCase === "desserts" && "bg-pink-50 text-pink-500",
          activeUseCase === "yogurt" && "bg-blue-50 text-blue-500"
        )}>
          {React.createElement(icons[activeUseCase as keyof typeof icons], { 
            className: "w-6 h-6" 
          })}
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${activeUseCase}-${i}`}
          className={cn(
            "absolute w-2 h-2 rounded-full",
            activeUseCase === "tea" && "bg-green-300",
            activeUseCase === "coffee" && "bg-amber-300",
            activeUseCase === "baking" && "bg-orange-300",
            activeUseCase === "smoothies" && "bg-purple-300",
            activeUseCase === "desserts" && "bg-pink-300",
            activeUseCase === "yogurt" && "bg-blue-300"
          )}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      <AnimatedElements />
      <Container>
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-2 sm:mb-3">
            Perfect for Every Occasion
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover how Healthy Sugar fits seamlessly into your daily routine.
          </p>
        </motion.div>

        {/* Use Case Tabs */}
        <motion.div
          className="flex justify-center mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-1.5 shadow-premium">
            <div className="flex space-x-1.5">
              {USE_CASES.map((useCase) => {
                const Icon = icons[useCase.id as keyof typeof icons];
                const isActive = activeUseCase === useCase.id;
                return (
                  <button
                    key={useCase.id}
                    onClick={() => handleManualSelect(useCase.id)}
                    className={cn(
                      "relative flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 rounded-xl transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 min-w-fit",
                      isActive
                        ? "text-white shadow-md transform scale-105 overflow-hidden"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    )}
                    style={isActive ? {
                      background: backgroundImages[useCase.id as keyof typeof backgroundImages],
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    } : {}}
                  >
                    <Icon className={cn(
                      "h-4 w-4 transition-all duration-300 flex-shrink-0",
                      isActive ? "text-white drop-shadow-sm" : ""
                    )} />
                    <span className={cn(
                      "text-sm font-semibold transition-all duration-300",
                      isActive ? "text-white drop-shadow-sm" : ""
                    )}>
                      {useCase.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Use Case Content */}
        <motion.div
          key={activeUseCase}
          className="max-w-2xl mx-auto text-center px-4 relative z-10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Description */}
          <div className="mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3">
              {currentUseCase?.name}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
              {currentUseCase?.description}
            </p>
            
            {/* Tips */}
            <div className="space-y-3 max-w-lg mx-auto mb-0">
              {activeUseCase === "tea" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Use 1 tablet per cup for perfect sweetness</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Dissolves quickly in hot beverages</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Sachets are perfect for office or travel</p>
                  </div>
                </>
              )}
              {activeUseCase === "coffee" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Enhances coffee flavor without bitterness</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Syrup works great for iced coffee drinks</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Heat-stable for hot brewing methods</p>
                  </div>
                </>
              )}
              {activeUseCase === "baking" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Use powder for precise measurements</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Maintains sweetness at high temperatures</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Syrup adds moisture to baked goods</p>
                  </div>
                </>
              )}
              {activeUseCase === "smoothies" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Blends seamlessly with any fruit combination</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Syrup dissolves instantly in cold liquids</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Powder works great for protein smoothies</p>
                  </div>
                </>
              )}
              {activeUseCase === "desserts" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Perfect for puddings and custards</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Creates the same texture as regular sugar</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Ideal for sugar-free ice creams</p>
                  </div>
                </>
              )}
              {activeUseCase === "yogurt" && (
                <>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Transforms plain yogurt into a treat</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Mix with fruits for natural flavoring</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full" />
                    <p className="text-gray-700">Great for overnight oats and parfaits</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
