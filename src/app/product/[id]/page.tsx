"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus, Minus, ArrowLeft, Heart, Share2, ShoppingCart, Check, Truck, Shield, Heart as HeartPulse, Eye } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useToast } from "@/components/Toast";
import { FloatingNav } from "@/components/FloatingNav";
import { PRODUCTS } from "@/lib/products";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const { showToast, ToastContainer } = useToast();

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const product = PRODUCTS.find(p => p.id === resolvedParams.id);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Auto-scrolling tabs functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const tabs = ["description", "features", "nutrition", "reviews"];
    const currentIndex = tabs.indexOf(activeTab);
    const duration = 5000; // 5 seconds per tab
    const intervalTime = 50; // Update progress every 50ms

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / intervalTime));
        if (newProgress >= 100) {
          // Move to next tab
          const nextIndex = (currentIndex + 1) % tabs.length;
          setActiveTab(tabs[nextIndex]);
          return 0;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [activeTab, isAutoScrolling]);

  // Reset progress when manually changing tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setProgress(0);
    setIsAutoScrolling(false);
    // Resume auto-scrolling after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const updatedCart = {
      ...cartItems,
      [product.id]: (cartItems[product.id] || 0) + quantity
    };
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch storage event to sync with other components
    window.dispatchEvent(new Event('storage'));
    
    showToast(`${quantity} x ${product.name} added to cart!`, "success");
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Coupon code "${code}" copied to clipboard!`, "success");
    }).catch(() => {
      showToast("Failed to copy coupon code", "error");
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const totalPrice = product.price * quantity;
  const isInCart = cartItems[product.id] > 0;
  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  // Product details based on ID
  const getProductDetails = () => {
    switch (product.id) {
      case "tablets":
        return {
          description: "Our revolutionary Healthy Sugar Tablets are the perfect solution for health-conscious individuals who don't want to compromise on taste. Each tablet is carefully crafted using premium stevia leaf extract, providing the perfect sweetness equivalent to 2 teaspoons of regular sugar. Just one tablet sweetens an entire cup of chai, coffee, or any beverage - the healthy way!",
          features: [
            "100% Natural Stevia Extract",
            "Zero Calories & Zero Glycemic Impact",
            "Diabetic Friendly",
            "100 Tablets per Pack",
            "Instant Dissolving Formula",
            "Perfect for Hot & Cold Beverages",
            "No Artificial Sweeteners",
            "24 Month Shelf Life"
          ],
          benefits: [
            "Weight Management Support",
            "Blood Sugar Control",
            "Dental Health Friendly",
            "Convenient & Portable",
            "Cost Effective",
            "Environmentally Friendly Packaging"
          ],
          usage: "Simply drop one tablet into your cup of tea, coffee, or any beverage. Stir gently and enjoy the perfect sweetness without any calories or health concerns.",
          ingredients: "Stevia Leaf Extract (Rebaudioside A 97%), Natural Flavors, Microcrystalline Cellulose, Magnesium Stearate",
          nutritionPer100g: {
            energy: "0 kcal",
            protein: "0g",
            carbohydrates: "0g",
            sugar: "0g",
            fat: "0g",
            sodium: "0mg"
          }
        };
      case "syrup":
        return {
          description: "Our premium Healthy Sugar Syrup is perfect for cold drinks, desserts, pancakes, and more. Made with concentrated stevia extract, it provides rich sweetness without the calories.",
          features: [
            "Liquid Stevia Concentrate",
            "Perfect for Cold Beverages",
            "Great for Desserts & Baking",
            "100ml Bottle",
            "Easy Pour Design",
            "No Refrigeration Required"
          ],
          benefits: [
            "Versatile Usage",
            "Smooth Mixing",
            "Long Lasting",
            "Travel Friendly"
          ],
          usage: "Add 2-3 drops to sweeten beverages, or use as needed for desserts and recipes.",
          ingredients: "Purified Water, Stevia Leaf Extract, Natural Flavors, Citric Acid",
          nutritionPer100g: {
            energy: "0 kcal",
            protein: "0g",
            carbohydrates: "0g",
            sugar: "0g",
            fat: "0g",
            sodium: "5mg"
          }
        };
      case "powder":
        return {
          description: "Our Healthy Sugar Powder is ideal for baking and cooking. It measures and mixes just like regular sugar but with zero calories and natural sweetness.",
          features: [
            "1:1 Sugar Replacement",
            "Perfect for Baking",
            "Fine Powder Texture",
            "100g Pack",
            "Resealable Packaging",
            "Heat Stable"
          ],
          benefits: [
            "Easy Measurement",
            "Baking Compatible",
            "Consistent Results",
            "Long Shelf Life"
          ],
          usage: "Use as a 1:1 replacement for sugar in recipes. Perfect for baking, cooking, and beverage preparation.",
          ingredients: "Stevia Leaf Extract, Erythritol, Natural Flavors",
          nutritionPer100g: {
            energy: "20 kcal",
            protein: "0g",
            carbohydrates: "5g",
            sugar: "0g",
            fat: "0g",
            sodium: "0mg"
          }
        };
      case "sachets":
        return {
          description: "Our convenient Healthy Sugar Sachets are perfect for on-the-go sweetening. Each sachet contains the perfect amount to sweeten one cup.",
          features: [
            "Individual Sachets",
            "Perfect Portion Control",
            "30 Sachets per Box",
            "Travel Friendly",
            "Tear-Open Design",
            "Moisture Resistant"
          ],
          benefits: [
            "Convenient Portability",
            "No Measuring Required",
            "Hygienic Individual Packs",
            "Office & Travel Ready"
          ],
          usage: "Tear open one sachet and pour into your beverage. Stir well and enjoy.",
          ingredients: "Stevia Leaf Extract, Maltodextrin, Natural Flavors",
          nutritionPer100g: {
            energy: "10 kcal",
            protein: "0g",
            carbohydrates: "2g",
            sugar: "0g",
            fat: "0g",
            sodium: "0mg"
          }
        };
      default:
        return {
          description: "Premium stevia-based sweetener for healthy living.",
          features: [],
          benefits: [],
          usage: "",
          ingredients: "",
          nutritionPer100g: {}
        };
    }
  };

  const details = getProductDetails();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Navigation */}
      <FloatingNav cartCount={totalCartItems} />

      <Container className="pt-24 sm:pt-28 md:pt-32">
        {/* Breadcrumb */}
        <div className="py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-brand transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/#products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-brand text-white">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Trust Badges below image */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="h-6 w-6 text-brand mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On First Order</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-brand mx-auto mb-2" />
                <p className="text-sm font-medium">100% Natural</p>
                <p className="text-xs text-gray-600">Premium Quality</p>
              </div>
              <div className="text-center">
                <HeartPulse className="h-6 w-6 text-brand mx-auto mb-2" />
                <p className="text-sm font-medium">Diabetes Care</p>
                <p className="text-xs text-gray-600">Blood Sugar Safe</p>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            {/* Top Section - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-ink mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{product.pack}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} (135 reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-brand">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatINR(Math.floor(product.price * 1.4))}
                  </span>
                  <span className="px-2 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded">
                    Save {Math.floor(((product.price * 1.4) - product.price) / (product.price * 1.4) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Inclusive of all taxes • Free shipping on first order
                </p>
              </div>

              {/* Available Coupons */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-green-600 mr-2">🎟️</span>
                  Available Coupons
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-dashed border-green-300">
                    <div>
                      <span className="font-mono text-sm font-bold text-green-700">FIRST10</span>
                      <p className="text-xs text-gray-600">Get 10% off on your first order</p>
                    </div>
                    <button 
                      onClick={() => handleCopyCoupon('FIRST10')}
                      className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-full hover:bg-green-700 transition-colors"
                    >
                      COPY
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-dashed border-blue-300">
                    <div>
                      <span className="font-mono text-sm font-bold text-blue-700">HEALTHY20</span>
                      <p className="text-xs text-gray-600">Save ₹20 on orders above ₹500</p>
                    </div>
                    <button 
                      onClick={() => handleCopyCoupon('HEALTHY20')}
                      className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer to push bottom content down */}
            <div className="flex-grow"></div>

            {/* Bottom Section - Actions aligned with image */}
            <div className="space-y-6 mt-6">
              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {isInCart ? (
                    <Button 
                      onClick={() => setShowCart(true)} 
                      className="flex-1" 
                      size="lg"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      View Cart ({cartItems[product.id]} items)
                    </Button>
                  ) : (
                    <Button onClick={handleAddToCart} className="flex-1" size="lg">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart • {formatINR(totalPrice)}
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card>
            <div className="border-b border-gray-200 relative">
              <div className="flex justify-between items-center px-6">
                <nav className="flex space-x-8">
                  {[
                    { id: "description", label: "Description" },
                    { id: "features", label: "Features" },
                    { id: "nutrition", label: "Nutrition" },
                    { id: "reviews", label: "Reviews" }
                  ].map((tab) => (
                    <div key={tab.id} className="relative">
                      <button
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                          "py-4 px-1 font-medium text-sm transition-colors relative",
                          activeTab === tab.id
                            ? "text-brand"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {tab.label}
                        {/* Auto-scroll indicator */}
                        {isAutoScrolling && activeTab === tab.id && (
                          <div className="absolute top-1 right-0 w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                        )}
                      </button>
                      
                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
                        <div 
                          className={cn(
                            "h-full transition-all duration-75 ease-linear",
                            activeTab === tab.id ? "bg-brand" : "bg-transparent"
                          )}
                          style={{ 
                            width: activeTab === tab.id ? `${progress}%` : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </nav>
                
                {/* Auto-scroll controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border transition-colors",
                      isAutoScrolling 
                        ? "bg-brand text-white border-brand" 
                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                    )}
                  >
                    {isAutoScrolling ? "⏸️ Pause" : "▶️ Auto"}
                  </button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">About This Product</h3>
                      <p className="text-gray-700 leading-relaxed">{details.description}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">How to Use</h4>
                      <p className="text-gray-700">{details.usage}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Ingredients</h4>
                      <p className="text-gray-700">{details.ingredients}</p>
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {details.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Health Benefits</h3>
                      <ul className="space-y-3">
                        {details.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Nutrition Facts (Per 100g)</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(details.nutritionPer100g).map(([key, value], index) => (
                          <motion.div 
                            key={key} 
                            className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-gray-700">{value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="text-center py-12 text-gray-500">
                      <p>Customer reviews coming soon!</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Split Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Banner - Life Change */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 p-8 text-white">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-6xl">🌿</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  How Stevia is Going to Change Your Life Forever
                </h3>
                 <p className="text-green-100 text-sm leading-relaxed">
                   Experience the natural sweetness revolution. Zero calories, zero guilt, maximum health benefits. Transform your lifestyle with nature's perfect sweetener for better living.
                 </p>
                <div className="mt-6">
                  <div className="inline-flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="mr-2">✨</span>
                    Natural • Healthy • Sustainable
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            {/* Right Banner - Daily Health */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 text-white">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-6xl">💊</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  One Tablet a Day, Keeps the Doctor Away
                </h3>
                 <p className="text-blue-100 text-sm leading-relaxed">
                   Simple daily wellness routine. Just one tablet replaces 2 teaspoons of sugar. Support your health journey with every sip, every day for optimal results.
                 </p>
                <div className="mt-6">
                  <div className="inline-flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="mr-2">⚡</span>
                    Simple • Effective • Daily
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-ink mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card hover className="h-full">
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.image.src}
                      alt={relatedProduct.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-ink mb-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedProduct.pack}</p>
                    <p className="text-lg font-bold text-brand">{formatINR(relatedProduct.price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30 transition-opacity"
            onClick={() => setShowCart(false)}
          ></div>
          
          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200"
          >
            <div className="flex h-full flex-col">
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {totalCartItems === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cartItems).map(([productId, count]) => {
                      const cartProduct = PRODUCTS.find(p => p.id === productId);
                      if (!cartProduct || count === 0) return null;
                      
                      return (
                        <div key={productId} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={cartProduct.image.src}
                              alt={cartProduct.image.alt}
                              fill
                              className="object-cover rounded-lg"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {cartProduct.name}
                            </h3>
                            <p className="text-sm text-gray-500">{cartProduct.pack}</p>
                            <p className="text-sm font-medium text-brand">
                              {formatINR(cartProduct.price)} × {count}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                const updatedCart = { ...cartItems };
                                if (updatedCart[productId] > 1) {
                                  updatedCart[productId]--;
                                } else {
                                  delete updatedCart[productId];
                                }
                                setCartItems(updatedCart);
                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                
                                // Dispatch storage event to sync with other components
                                window.dispatchEvent(new Event('storage'));
                              }}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{count}</span>
                            <button
                              onClick={() => {
                                const updatedCart = { ...cartItems, [productId]: count + 1 };
                                setCartItems(updatedCart);
                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                
                                // Dispatch storage event to sync with other components
                                window.dispatchEvent(new Event('storage'));
                              }}
                              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {totalCartItems > 0 && (
                <div className="border-t border-gray-200 px-6 py-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-brand">
                      {formatINR(
                        Object.entries(cartItems).reduce((total, [productId, count]) => {
                          const cartProduct = PRODUCTS.find(p => p.id === productId);
                          return total + (cartProduct ? cartProduct.price * count : 0);
                        }, 0)
                      )}
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowCart(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
