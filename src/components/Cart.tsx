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
                    {/* Google Pay */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 40 24" fill="none">
                        <path d="M19.26 9.71c0 2.18-1.7 3.78-3.78 3.78s-3.78-1.6-3.78-3.78c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#4285F4"/>
                        <path d="M15.48 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                        <path d="M8.33 9.71c0 2.18-1.7 3.78-3.78 3.78S.77 11.89.77 9.71c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#34A853"/>
                        <path d="M4.55 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                        <path d="M30.19 9.71c0 2.18-1.7 3.78-3.78 3.78s-3.78-1.6-3.78-3.78c0-2.17 1.7-3.78 3.78-3.78s3.78 1.61 3.78 3.78z" fill="#EA4335"/>
                        <path d="M26.41 7.18c-.86 0-1.56.7-1.56 1.56 0 .86.7 1.56 1.56 1.56.86 0 1.56-.7 1.56-1.56 0-.86-.7-1.56-1.56-1.56z" fill="white"/>
                        <path d="M35.5 6.5h-2v1.5h2v1.5h-2v1.5h2v1.5h-3.5V5h3.5v1.5z" fill="#4285F4"/>
                      </svg>
                    </div>
                    {/* PhonePe */}
                    <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-purple-700 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 24 16" fill="none">
                        <path d="M4 4h3c1.5 0 2.5 1 2.5 2.5S8.5 9 7 9H4V4zm0 6h2.5L9 14h2L8.5 10H7c2 0 3.5-1.5 3.5-3.5S9 3 7 3H2v11h2v-4z" fill="white"/>
                        <path d="M13 4v1.5h3v1.5h-1.5v1.5h1.5v1.5H13v1.5h4.5V4H13zm6 0v6h1.5V6h1.5v4h1.5V4H19z" fill="white"/>
                      </svg>
                    </div>
                    {/* Visa */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 32 20" fill="none">
                        <path d="M13.8 6L11.2 14h2.4L16.2 6h-2.4zM9.8 6L7.4 11.6 6.8 8.8C6.6 7.8 5.8 6.8 4.8 6.4L2 6v.4h2.8c.8 0 1.4.4 1.6 1L8.2 14h2.4L14 6H9.8zM22.4 6c-.8 0-1.4.4-1.4 1L20.6 14h2.4l.4-1h2.8l.4 1H29L26.8 6h-4.4zm.8 4.4l1.2-3.2.6 3.2h-1.8zM18.6 6L17.4 14h2.4L21 6h-2.4z" fill="#1A1F71"/>
                      </svg>
                    </div>
                    {/* Mastercard */}
                    <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 24 16" fill="none">
                        <circle cx="8" cy="8" r="6" fill="#EB001B"/>
                        <circle cx="16" cy="8" r="6" fill="#F79E1B"/>
                        <path d="M12 4c-1.2 1.2-2 2.8-2 4s.8 2.8 2 4c1.2-1.2 2-2.8 2-4s-.8-2.8-2-4z" fill="#FF5F00"/>
                      </svg>
                    </div>
                    {/* UPI */}
                    <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 24 16" fill="none">
                        <path d="M2 4v6h2V6h2v4h2V4H2zm6 0v6h2V6h2v4h2V4h-6zm8 0v6h2V4h-2zm4 0v6h2V4h-2z" fill="white"/>
                        <circle cx="16" cy="8" r="1.5" fill="white"/>
                      </svg>
                    </div>
                    
                    {/* Paytm */}
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center shadow-sm">
                      <svg width="16" height="10" viewBox="0 0 24 16" fill="none">
                        <path d="M3 4h3c1.5 0 2.5 1 2.5 2.5S7.5 9 6 9H3V4zm0 6h2.5l2 3h2L7.5 10H6c2 0 3.5-1.5 3.5-3.5S8 3 6 3H1v10h2v-3z" fill="white"/>
                        <path d="M12 4v1h2v1h-1v1h1v1h-2v1h3V4h-3zm4 0v6h1V6h1v4h1V4h-3z" fill="white"/>
                        <circle cx="20" cy="8" r="1.5" fill="white"/>
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

