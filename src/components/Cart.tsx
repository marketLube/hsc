"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard, Tag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { PRODUCTS } from "@/lib/products";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate?: (totalItems: number) => void;
}

export function Cart({ isOpen, onClose, onCartUpdate }: CartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage when cart is opened
  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
          setCartItems({});
        }
      } else {
        setCartItems({});
      }
      setIsLoading(false);
    }
  }, [isOpen]);

  // Update cart in localStorage and notify parent
  const updateCart = (newCartItems: Record<string, number>) => {
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    
    const totalItems = Object.values(newCartItems).reduce((sum, count) => sum + count, 0);
    onCartUpdate?.(totalItems);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { totalItems } }));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const newCartItems = {
      ...cartItems,
      [productId]: newQuantity
    };
    updateCart(newCartItems);
  };

  const removeItem = (productId: string) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[productId];
    updateCart(newCartItems);
  };

  const clearCart = () => {
    updateCart({});
  };

  // Calculate totals
  const cartItemsArray = Object.entries(cartItems).map(([productId, quantity]) => {
    const product = PRODUCTS.find(p => p.id === productId);
    return product ? { product, quantity } : null;
  }).filter(Boolean) as { product: typeof PRODUCTS[0]; quantity: number }[];

  const subtotal = cartItemsArray.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 999 ? 0 : 50;
  const total = subtotal + shipping;
  const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  const handleProceedToPay = () => {
    // Close cart and navigate to checkout page
    onClose();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-brand" />
                <h2 className="text-base font-semibold text-gray-900">
                  Your Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                </div>
              ) : cartItemsArray.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Add some healthy sugar products to get started!
                  </p>
                  <Button onClick={onClose} className="w-full" size="default">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                /* Cart Items */
                <div className="p-4 space-y-3">
                  {cartItemsArray.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      layout
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg p-1.5">
                        <Image
                          src={product.image.src}
                          alt={product.image.alt}
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">{product.pack}</p>
                        <p className="text-sm font-semibold text-brand">
                          {formatINR(product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-white rounded-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-white rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 hover:bg-red-50 rounded-full transition-colors group"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3 w-3 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </motion.div>
                  ))}

                  {/* Clear Cart Button */}
                  {cartItemsArray.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full text-xs text-red-600 hover:text-red-700 py-1.5 transition-colors"
                    >
                      Clear all items
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with Totals and Checkout */}
            {cartItemsArray.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                {/* Coupon Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Tag className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-800 mb-1">
                        Free shipping on your first order
                      </p>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs text-green-700">Apply Coupon</span>
                        <div className="relative overflow-hidden bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                          <span className="relative z-10">FREEDEL</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%']
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                            style={{
                              width: '50%',
                              height: '100%',
                              transform: 'skewX(-20deg)'
                            }}
                          />
                        </div>
                        <span className="text-xs text-green-700">in payments</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={cn(
                      "font-medium",
                      shipping === 0 ? "text-green-600" : "text-gray-900"
                    )}>
                      {shipping === 0 ? "Free" : formatINR(shipping)}
                    </span>
                  </div>
                  {subtotal < 999 && (
                    <p className="text-xs text-gray-500">
                      Add {formatINR(999 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between text-sm font-semibold pt-1.5 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-brand">{formatINR(total)}</span>
                  </div>
                </div>

                {/* Proceed to Pay Button */}
                <Button
                  onClick={handleProceedToPay}
                  className="w-full group"
                  size="default"
                >
                  <CreditCard className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  Proceed to Pay {formatINR(total)}
                </Button>

                {/* Payment Methods */}
                <div className="flex items-center justify-center space-x-2 py-2">
                  <span className="text-xs text-gray-500">We accept:</span>
                  <div className="flex items-center space-x-1.5">
                    {/* GPay */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <rect width="20" height="12" rx="2" fill="white"/>
                        <path d="M8 3h1.5l1 3h1l-1-3c.5 0 1-.5 1-1s-.5-1-1-1H8v2zm0 4h4v1H8V7z" fill="#4285F4"/>
                        <circle cx="4" cy="6" r="2" fill="#34A853"/>
                        <circle cx="16" cy="6" r="2" fill="#EA4335"/>
                      </svg>
                    </div>
                    {/* PhonePe */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <rect width="20" height="12" rx="2" fill="#5F259F"/>
                        <path d="M4 3h2c1 0 1.5.5 1.5 1.5S7 6 6 6H4V3zm0 4h1.5l1.5 2H9L7.5 7H6c1.5 0 2.5-1 2.5-2.5S7.5 2 6 2H3v7h1V7z" fill="white"/>
                        <path d="M11 3v1h2v1h-1v1h1v1h-2v1h3V3h-3zm4 0v4h1V4h1v3h1V3h-3z" fill="white"/>
                      </svg>
                    </div>
                    {/* Visa */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <rect width="20" height="12" rx="2" fill="white"/>
                        <path d="M3 3l1.5 6h1L7 3H6L5 7 4 3H3zm4 0l-1 6h1l1-6H7zm3 0l-.5 6h1l1.5-6H10zm4 0h-1l-1 6h1l.2-1h1.2l.2 1h1l-.6-6zm-.8 4h-.8l.4-2 .4 2z" fill="#1A1F71"/>
                      </svg>
                    </div>
                    {/* Mastercard */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <rect width="20" height="12" rx="2" fill="white"/>
                        <circle cx="7" cy="6" r="4" fill="#EB001B"/>
                        <circle cx="13" cy="6" r="4" fill="#F79E1B"/>
                        <path d="M10 3c1 1 1 3 0 6-1-3-1-5 0-6z" fill="#FF5F00"/>
                      </svg>
                    </div>
                    {/* UPI */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <rect width="20" height="12" rx="2" fill="#FF6600"/>
                        <path d="M3 3v4h1V4h1v3h1V3H3zm4 0v4h1V4h1v3h1V3H7zm4 0v4h1V3h-1zm3 0v4h1V3h-1z" fill="white"/>
                        <circle cx="10" cy="6" r="1" fill="white"/>
                        <circle cx="14" cy="6" r="1" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
      
    </AnimatePresence>
  );
}

