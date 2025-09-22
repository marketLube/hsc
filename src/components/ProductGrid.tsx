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
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-6 text-center">
              Which Format is Right for You?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💊</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Tablets</h4>
                <p className="text-gray-600 text-sm">
                  Perfect for tea and coffee. Easy to carry and measure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍯</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Syrup</h4>
                <p className="text-gray-600 text-sm">
                  Ideal for cold drinks, desserts, and pancakes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥄</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Powder</h4>
                <p className="text-gray-600 text-sm">
                  Best for baking and recipes requiring measured amounts.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Sachets</h4>
                <p className="text-gray-600 text-sm">
                  Convenient for travel and precise portion control.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <ToastContainer />
    </section>
  );
}
