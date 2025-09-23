"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { ProductCard } from "./ProductCard";
import { useToast } from "./Toast";
import { PRODUCTS } from "@/lib/products";

export function ProductGrid() {
  const { showToast, ToastContainer } = useToast();

  const handleAddToCart = (productId: string) => {
    // Get current cart from localStorage
    const savedCart = localStorage.getItem("cart");
    const currentCart = savedCart ? JSON.parse(savedCart) : {};
    
    // Update cart
    const updatedCart = {
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1
    };

    // Store in localStorage for persistence
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Show toast
    const product = PRODUCTS.find(p => p.id === productId);
    showToast(`${product?.name} added to cart!`, "success");
    
    // Dispatch custom event for other components to listen
    const totalItems = Object.values(updatedCart).reduce((sum, count) => (sum as number) + (count as number), 0);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { totalItems } }));
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white" id="products">
      <Container>
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-3 sm:mb-4">
            Our Product Range
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Choose from four convenient formats to fit your lifestyle. All made with premium stevia leaf extract.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </div>

        {/* Product Comparison */}
        <motion.div
          className="mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink mb-2 sm:mb-3">
                Which Format is Right for You?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
                Find the perfect stevia format for your lifestyle and needs
              </p>
            </div>
            
            {/* Mobile-optimized grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  emoji: "💊",
                  title: "Tablets",
                  description: "Perfect for tea and coffee. Easy to carry and measure.",
                  color: "from-rose-50 to-pink-50 border-rose-100"
                },
                {
                  emoji: "🍯",
                  title: "Syrup",
                  description: "Ideal for cold drinks, desserts, and pancakes.",
                  color: "from-amber-50 to-orange-50 border-amber-100"
                },
                {
                  emoji: "🥄",
                  title: "Powder",
                  description: "Best for baking and recipes requiring measured amounts.",
                  color: "from-blue-50 to-indigo-50 border-blue-100"
                },
                {
                  emoji: "📦",
                  title: "Sachets",
                  description: "Convenient for travel and precise portion control.",
                  color: "from-emerald-50 to-green-50 border-emerald-100"
                }
              ].map((format, index) => (
                <motion.div
                  key={format.title}
                  className={`bg-gradient-to-br ${format.color} rounded-xl p-4 sm:p-5 border text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                    <span className="text-xl sm:text-2xl">{format.emoji}</span>
                  </div>
                  <h4 className="font-bold text-ink mb-2 sm:mb-3 text-base sm:text-lg">
                    {format.title}
                  </h4>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    {format.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile-friendly CTA */}
            <motion.div 
              className="mt-6 sm:mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                💡 Not sure which one to choose? Try our variety pack!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <ToastContainer />
    </section>
  );
}
