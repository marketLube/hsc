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
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <motion.div
      className="group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card hover className="h-[600px] overflow-hidden flex flex-col">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand text-white">
                {product.badge}
              </span>
            </div>
          )}

          {/* Hover Overlay with View Product Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/product/${product.id}`}>
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                <Eye className="h-4 w-4 mr-2" />
                View Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Card Content - Fixed height with flex layout */}
        <CardContent className="p-6 flex flex-col h-80">
          {/* Product Info - Adjusted height section */}
          <div className="mb-4 h-28">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-lg text-ink mb-1 group-hover:text-brand transition-colors line-clamp-2 min-h-[3.5rem] cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-2">{product.pack}</p>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-1">
              {product.blurb}
            </p>
          </div>

          {/* Rating - Fixed height section */}
          <div className="flex items-center mb-4 h-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
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
              <Link href={`/product/${product.id}`} className="block">
                <Button variant="outline" className="w-full" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Button
                onClick={handleAddToCart}
                className="group/btn w-full"
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
    </motion.div>
  );
}
