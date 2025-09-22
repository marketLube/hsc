"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Leaf, ChefHat } from "lucide-react";
import { Container } from "./Container";
import { Card, CardContent } from "./Card";
import { USE_CASES } from "@/lib/data";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export function UseCases() {
  const [activeUseCase, setActiveUseCase] = useState("tea");

  const currentUseCase = USE_CASES.find(uc => uc.id === activeUseCase);
  const recommendedProducts = PRODUCTS.filter(p => 
    currentUseCase?.products.includes(p.id)
  );

  const icons = {
    tea: Leaf,
    coffee: Coffee,
    baking: ChefHat,
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Perfect for Every Occasion
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Healthy Sugar fits seamlessly into your daily routine.
          </p>
        </motion.div>

        {/* Use Case Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-premium">
            <div className="flex space-x-2">
              {USE_CASES.map((useCase) => {
                const Icon = icons[useCase.id as keyof typeof icons];
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setActiveUseCase(useCase.id)}
                    className={cn(
                      "flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium",
                      activeUseCase === useCase.id
                        ? "bg-brand text-white shadow-md"
                        : "text-gray-600 hover:text-brand hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{useCase.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Use Case Content */}
        <motion.div
          key={activeUseCase}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-ink mb-4">
              {currentUseCase?.name}
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {currentUseCase?.description}
            </p>
            
            {/* Tips */}
            <div className="space-y-3">
              {activeUseCase === "tea" && (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Use 1 tablet per cup for perfect sweetness</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Dissolves quickly in hot beverages</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Sachets are perfect for office or travel</p>
                  </div>
                </>
              )}
              {activeUseCase === "coffee" && (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Enhances coffee flavor without bitterness</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Syrup works great for iced coffee drinks</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Heat-stable for hot brewing methods</p>
                  </div>
                </>
              )}
              {activeUseCase === "baking" && (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Use powder for precise measurements</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Maintains sweetness at high temperatures</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2" />
                    <p className="text-gray-700">Syrup adds moisture to baked goods</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recommended Products */}
          <div>
            <h4 className="text-xl font-semibold text-ink mb-4">
              Recommended Products
            </h4>
            <div className="space-y-4">
              {recommendedProducts.map((product) => (
                <Card key={product.id} className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">
                          {product.id === "tablets" && "💊"}
                          {product.id === "syrup" && "🍯"}
                          {product.id === "powder" && "🥄"}
                          {product.id === "sachets" && "📦"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-ink">{product.name}</h5>
                        <p className="text-sm text-gray-600">{product.pack}</p>
                        <p className="text-brand font-semibold">₹{product.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
