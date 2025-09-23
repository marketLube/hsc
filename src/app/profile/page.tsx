"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  Eye, 
  RefreshCw, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  Edit3,
  Plus,
  Trash2,
  Shield,
  Bell,
  Heart,
  Gift,
  HelpCircle,
  Download,
  Phone,
  Mail,
  Home,
  Building,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { FloatingNav } from "@/components/FloatingNav";
import { NoticeBar } from "@/components/NoticeBar";
import { Footer } from "@/components/Footer";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

// Mock user data (same as ProfileModal)
const USER_DATA = {
  id: "user_123",
  name: "Althameem Khan",
  email: "althameem@example.com",
  phone: "+91 98765 43210",
  avatar: "/images/avatar-placeholder.jpg",
  joinDate: "2023-08-15",
  membershipTier: "Gold",
  totalOrders: 24,
  totalSpent: 18450,
  loyaltyPoints: 1250,
  addresses: [
    {
      id: "addr_1",
      type: "Home",
      name: "Althameem Khan",
      address: "123 Green Valley Apartments",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 98765 43210",
      isDefault: true
    },
    {
      id: "addr_2", 
      type: "Office",
      name: "Althameem Khan",
      address: "456 Business Park, Tower A",
      city: "Mumbai",
      state: "Maharashtra", 
      pincode: "400070",
      phone: "+91 98765 43210",
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: "card_1",
      type: "Credit Card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2026",
      isDefault: true
    },
    {
      id: "card_2",
      type: "Debit Card", 
      brand: "Mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2025",
      isDefault: false
    }
  ],
  orders: [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      items: 3,
      total: 1299,
      products: [
        { name: "Stevia Powder", quantity: 2, price: 449 },
        { name: "Stevia Tablets", quantity: 1, price: 401 }
      ],
      trackingNumber: "TRK123456789",
      deliveryDate: "2024-01-18"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-01-28",
      status: "Shipped",
      items: 2,
      total: 898,
      products: [
        { name: "Stevia Syrup", quantity: 1, price: 449 },
        { name: "Stevia Sachets", quantity: 1, price: 449 }
      ],
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-02-02"
    },
    {
      id: "ORD-2024-003",
      date: "2024-02-10", 
      status: "Processing",
      items: 1,
      total: 449,
      products: [
        { name: "Stevia Powder Premium", quantity: 1, price: 449 }
      ]
    },
    {
      id: "ORD-2024-004",
      date: "2024-02-20",
      status: "Cancelled",
      items: 2,
      total: 898,
      products: [
        { name: "Stevia Tablets", quantity: 2, price: 449 }
      ],
      refundStatus: "Refunded",
      refundAmount: 898
    }
  ],
  refunds: [
    {
      id: "REF-001",
      orderId: "ORD-2024-004",
      date: "2024-02-21",
      amount: 898,
      status: "Completed",
      reason: "Product not as expected",
      refundMethod: "Original Payment Method"
    },
    {
      id: "REF-002", 
      orderId: "ORD-2023-089",
      date: "2024-01-10",
      amount: 449,
      status: "Processing",
      reason: "Damaged product",
      refundMethod: "Store Credit"
    }
  ],
  wishlist: [
    {
      id: "stevia-premium-combo",
      name: "Premium Stevia Combo Pack",
      price: 1299,
      originalPrice: 1599,
      image: "/images/products/combo.svg",
      inStock: true
    },
    {
      id: "stevia-organic-powder",
      name: "Organic Stevia Powder 500g", 
      price: 699,
      originalPrice: 799,
      image: "/images/products/organic-powder.svg",
      inStock: false
    }
  ]
};

const STATUS_COLORS = {
  Delivered: "text-green-600 bg-green-50",
  Shipped: "text-blue-600 bg-blue-50", 
  Processing: "text-yellow-600 bg-yellow-50",
  Cancelled: "text-red-600 bg-red-50",
  Completed: "text-green-600 bg-green-50"
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error("Error parsing cart:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.totalItems);
    };

    const handleStorageChange = () => {
      updateCartCount();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
      window.addEventListener("storage", handleStorageChange);
      
      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "refunds", label: "Refunds", icon: RefreshCw },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {USER_DATA.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{USER_DATA.name}</h1>
              <p className="text-sm text-gray-600 mb-2">{USER_DATA.email}</p>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Star className="w-3 h-3 mr-1" />
                  {USER_DATA.membershipTier}
                </span>
                <span className="text-xs text-gray-500">
                  Member since {new Date(USER_DATA.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card hover>
          <CardContent className="p-3 text-center">
            <Package className="w-6 h-6 text-brand mx-auto mb-1" />
            <div className="text-xl font-bold text-gray-900">{USER_DATA.totalOrders}</div>
            <div className="text-xs text-gray-500">Orders</div>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="p-3 text-center">
            <Gift className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-gray-900">{USER_DATA.loyaltyPoints}</div>
            <div className="text-xs text-gray-500">Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveTab("orders")}
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {USER_DATA.orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.items} items • {formatINR(order.total)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]
                  )}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
          <p className="text-sm text-gray-600">Track and manage all your orders</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>
      
      {USER_DATA.orders.map((order) => (
        <Card key={order.id} hover>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]
                )}>
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatINR(order.total)}</p>
                <p className="text-xs text-gray-500">{order.items} items</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {product.name} × {product.quantity}
                  </span>
                  <span className="font-medium">{formatINR(product.price * product.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                {order.trackingNumber && (
                  <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    <Truck className="w-3 h-3" />
                    <span>{order.trackingNumber}</span>
                  </div>
                )}
                {order.deliveryDate && (
                  <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Delivered</span>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    <Clock className="w-3 h-3" />
                    <span>Est. {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                {order.status === "Delivered" && (
                  <Button size="sm">
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
          <p className="text-sm text-gray-600">Manage your delivery addresses</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Address
        </Button>
      </div>
      
      {USER_DATA.addresses.map((address) => (
        <Card key={address.id} hover>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  {address.type === "Home" ? (
                    <Home className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Building className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{address.type}</h3>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{address.name}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{address.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-sm text-gray-600">Manage your saved payment methods</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Card
        </Button>
      </div>
      
      {USER_DATA.paymentMethods.map((method) => (
        <Card key={method.id} hover>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {method.brand} •••• {method.last4}
                    </h3>
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {method.type} • Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900 text-sm mb-1">Secure Payment</h3>
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure. We never store your full card details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Wishlist</h2>
          <p className="text-sm text-gray-600">{USER_DATA.wishlist.length} items saved</p>
        </div>
      </div>
      
      {USER_DATA.wishlist.map((item) => (
        <Card key={item.id} hover>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl p-2 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-brand">{formatINR(item.price)}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatINR(item.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {item.inStock ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button size="sm" disabled={!item.inStock}>
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRefunds = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Refund History</h2>
          <p className="text-sm text-gray-600">Track your refund requests and status</p>
        </div>
        <Button variant="outline" size="sm">
          <HelpCircle className="w-4 h-4 mr-1" />
          Policy
        </Button>
      </div>
      
      {USER_DATA.refunds.map((refund) => (
        <Card key={refund.id} hover>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{refund.id}</h3>
                <p className="text-xs text-gray-500">
                  Order: {refund.orderId} • {new Date(refund.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatINR(refund.amount)}</p>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  STATUS_COLORS[refund.status as keyof typeof STATUS_COLORS]
                )}>
                  {refund.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Reason:</span>
                <span className="text-gray-900">{refund.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="text-gray-900">{refund.refundMethod}</span>
              </div>
            </div>
            
            {refund.status === "Processing" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 text-sm">Processing Refund</h4>
                    <p className="text-xs text-yellow-800">
                      Your refund is being processed. It may take 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-600">Manage your account preferences and security</p>
      </div>
      
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Personal Information</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={USER_DATA.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={USER_DATA.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                defaultValue={USER_DATA.phone}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
              />
            </div>
            <div className="flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {[
              { id: "order_updates", label: "Order Updates", description: "Get notified about order status changes" },
              { id: "promotions", label: "Promotions & Offers", description: "Receive exclusive deals and discounts" },
              { id: "newsletter", label: "Newsletter", description: "Weekly health tips and product updates" },
              { id: "sms", label: "SMS Notifications", description: "Important updates via text message" }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{item.label}</h4>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Security Settings</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start p-3 h-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900 text-sm">Change Password</h4>
                  <p className="text-xs text-gray-500">Update your account password</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start p-3 h-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900 text-sm">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500">Add extra security to your account</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <h3 className="font-semibold text-red-900">Danger Zone</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <Button variant="outline" className="w-full justify-start p-3 h-auto text-red-600 border-red-300 hover:bg-red-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-red-900 text-sm">Delete Account</h4>
                <p className="text-xs text-red-700">Permanently delete your account and data</p>
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "orders": return renderOrders();
      case "addresses": return renderAddresses();
      case "payments": return renderPaymentMethods();
      case "wishlist": return renderWishlist();
      case "refunds": return renderRefunds();
      case "settings": return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <>
      <NoticeBar />
      <FloatingNav cartCount={cartCount} />
      
      <div className="min-h-screen bg-brand-fg pt-32">
        <Container>
          <div className="py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <Card className="sticky top-36">
                  {/* Profile Summary */}
                  <CardContent className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {USER_DATA.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{USER_DATA.name}</h3>
                        <p className="text-xs text-gray-500">{USER_DATA.membershipTier} Member</p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Navigation */}
                  <CardContent className="p-3">
                    <nav className="space-y-1">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                              "w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-all duration-200 text-sm",
                              activeTab === tab.id
                                ? "bg-brand text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-50 hover:text-brand"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      <Footer />
    </>
  );
}
