"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock,
  Download,
  Share2,
  ArrowRight,
  Home,
  ShoppingBag,
  Phone,
  Mail,
  Star,
  Gift,
  Shield,
  Heart
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { formatINR } from "@/lib/currency";
import { PRODUCTS } from "@/lib/products";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  orderId: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  orderDate: Date;
  estimatedDelivery: Date;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    
    // Generate mock order details (in real app, this would come from API)
    const mockOrder: OrderDetails = {
      orderId: `HSC${Date.now().toString().slice(-6)}`,
      items: [
        { productId: "tablets", quantity: 2, price: 299 },
        { productId: "powder", quantity: 1, price: 399 }
      ],
      customerInfo: {
        name: "Althameem Khan",
        phone: "+91 9876543210",
        email: "althameem@example.com",
        address: "123 Health Street, Wellness City, Karnataka - 560001"
      },
      paymentMethod: "UPI",
      subtotal: 997,
      shipping: 0,
      discount: 100,
      total: 897,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    };

    setOrderDetails(mockOrder);
    setIsLoading(false);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadInvoice = () => {
    // Mock download functionality
    console.log("Downloading invoice...");
  };

  const handleShareOrder = () => {
    if (navigator.share && orderDetails) {
      navigator.share({
        title: 'My Healthy Sugar Order',
        text: `I just ordered healthy stevia products from The Healthy Sugar Company! Order #${orderDetails.orderId}`,
        url: window.location.href,
      });
    }
  };

  const handleTrackOrder = () => {
    router.push(`/track-order?id=${orderDetails?.orderId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-fg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-fg">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Button onClick={() => router.push('/')}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const orderItems = orderDetails.items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as (OrderItem & { product: typeof PRODUCTS[0] })[];

  return (
    <div className="min-h-screen bg-brand-fg relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: 0
              }}
              transition={{ 
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-premium border-b border-gray-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Image
                src="/brand/logo.svg"
                alt="The Healthy Sugar Company"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
                <p className="text-base text-gray-600">Order #{orderDetails.orderId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="default" onClick={handleShareOrder}>
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="default" onClick={handleDownloadInvoice}>
                <Download className="h-5 w-5 mr-2" />
                Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Thank you for choosing healthy sweetness! Your order has been successfully placed and will be delivered soon.
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 inline-block shadow-premium">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <span className="text-green-800 font-semibold text-lg">
                Payment of {formatINR(orderDetails.total)} received successfully
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-premium"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Truck className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Delivery Timeline</h3>
                  <p className="text-lg text-gray-600">
                    Expected delivery: {orderDetails.estimatedDelivery.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">Order Confirmed</p>
                    <p className="text-base text-gray-600">
                      {orderDetails.orderDate.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} today
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">Preparing for Dispatch</p>
                    <p className="text-base text-gray-600">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-600">Out for Delivery</p>
                    <p className="text-base text-gray-500">
                      {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-600">Delivered</p>
                    <p className="text-base text-gray-500">
                      {orderDetails.estimatedDelivery.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <Button onClick={handleTrackOrder} className="w-full" size="lg">
                  <Package className="h-5 w-5 mr-3" />
                  Track Your Order
                </Button>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-premium"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-6">
                {orderItems.map(({ product, quantity, price }) => (
                  <div key={product.id} className="flex items-center space-x-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-sm">
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-base text-gray-600 mb-2">{product.pack}</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900 mb-1">Qty: {quantity}</p>
                      <p className="text-xl font-bold text-brand">{formatINR(price * quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-premium"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Delivery Address</h3>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-xl font-semibold text-gray-900 mb-3">{orderDetails.customerInfo.name}</p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">{orderDetails.customerInfo.address}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0 text-base text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">{orderDetails.customerInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">{orderDetails.customerInfo.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-8">
            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-premium sticky top-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatINR(orderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">
                    {orderDetails.shipping === 0 ? "Free" : formatINR(orderDetails.shipping)}
                  </span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-{formatINR(orderDetails.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-gray-200">
                  <span>Total Paid</span>
                  <span className="text-brand">{formatINR(orderDetails.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="flex items-center space-x-3 text-base text-gray-600">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Paid via {orderDetails.paymentMethod}</span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-premium"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mt-1">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Order Confirmation</p>
                    <p className="text-base text-gray-600">Check your email for order details</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center mt-1">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Track Progress</p>
                    <p className="text-base text-gray-600">Get real-time updates on your order</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center mt-1">
                    <Heart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Enjoy & Review</p>
                    <p className="text-base text-gray-600">Share your experience with us</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button onClick={() => router.push('/')} className="w-full" size="lg">
                <ShoppingBag className="h-5 w-5 mr-3" />
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => router.push('/account/orders')} className="w-full" size="lg">
                <Package className="h-5 w-5 mr-3" />
                View All Orders
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center bg-gradient-to-r from-brand/5 to-purple-50 rounded-2xl p-12 shadow-premium"
        >
          <div className="w-20 h-20 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-brand" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Choosing Health!</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            You've made a great choice for your health and wellness. Our stevia-based sweeteners will help you 
            enjoy sweetness without compromising on your health goals. We're excited to be part of your healthy journey!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-12 space-y-4 sm:space-y-0 text-lg text-gray-600">
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6 text-brand" />
              <span className="font-medium">Free shipping on orders above ₹999</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-brand" />
              <span className="font-medium">100% natural stevia</span>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-brand" />
              <span className="font-medium">Diabetes-friendly choice†</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
