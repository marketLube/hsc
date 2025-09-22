"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Eye } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Product } from "@/types/product";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <motion.div
      className="group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Mobile: Entire card is clickable, Desktop: Normal behavior */}
      <div className="relative">
        {/* Mobile: Invisible overlay link for entire card */}
        <Link 
          href={`/product/${product.id}`} 
          className="absolute inset-0 z-10 sm:hidden"
          aria-label={`View ${product.name} details`}
        />
        
        <Card hover className="h-[500px] sm:h-[600px] overflow-hidden flex flex-col">
          {/* Product Image */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-20">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand text-white">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Hover Overlay with View Product Button - Desktop only */}
            <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
              <Link href={`/product/${product.id}`}>
                <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                  <Eye className="h-4 w-4 mr-2" />
                  View Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Card Content - Fixed height with flex layout */}
          <CardContent className="p-4 sm:p-6 flex flex-col h-64 sm:h-80">
            {/* Product Info - Adjusted height section */}
            <div className="mb-3 sm:mb-4 h-24 sm:h-28">
              <h3 className="font-bold text-base sm:text-lg text-ink mb-1 group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">
                {product.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">{product.pack}</p>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-1">
                {product.blurb}
              </p>
            </div>

            {/* Rating - Fixed height section */}
            <div className="flex items-center mb-3 sm:mb-4 h-5 sm:h-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3 sm:h-4 sm:w-4",
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
                {product.rating} ({product.reviewCount || Math.floor(Math.random() * 50) + 10} reviews)
              </span>
            </div>

            {/* Spacer to push content to bottom */}
            <div className="flex-grow"></div>

            {/* Price Section - Fixed at bottom */}
            <div className="mt-auto">
              <div className="mb-3 text-center">
                <span className="text-2xl font-bold text-brand">
                  {formatINR(product.price)}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                {/* View Details button - Desktop only */}
                <Link href={`/product/${product.id}`} className="hidden sm:block">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                
                {/* Add to Cart button - Always visible, higher z-index on mobile */}
                <Button
                  onClick={handleAddToCart}
                  className="group/btn w-full relative z-20"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2 transition-transform group-hover/btn:rotate-90" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Free shipping note */}
              <div className="text-xs text-gray-500 mt-2 text-center">
                Free shipping over ₹999
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
