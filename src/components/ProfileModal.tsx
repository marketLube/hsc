"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
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
  Calendar,
  Phone,
  Mail,
  Home,
  Building
} from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock user data
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
      image: "/images/products/sachets.svg",
      inStock: true
    },
    {
      id: "stevia-organic-powder",
      name: "Organic Stevia Powder 500g", 
      price: 699,
      originalPrice: 799,
      image: "/images/products/powder.svg",
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

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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
      <div className="bg-gradient-to-r from-brand/10 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {USER_DATA.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{USER_DATA.name}</h2>
            <p className="text-gray-600">{USER_DATA.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star className="w-3 h-3 mr-1" />
                {USER_DATA.membershipTier} Member
              </span>
              <span className="text-sm text-gray-500">
                Member since {new Date(USER_DATA.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Package className="w-8 h-8 text-brand mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{USER_DATA.totalOrders}</div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatINR(USER_DATA.totalSpent)}</div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{USER_DATA.loyaltyPoints}</div>
          <div className="text-sm text-gray-500">Loyalty Points</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{USER_DATA.wishlist.length}</div>
          <div className="text-sm text-gray-500">Wishlist Items</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveTab("orders")}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {USER_DATA.orders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.items} items • {formatINR(order.total)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]
                )}>
                  {order.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {USER_DATA.orders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <h4 className="font-semibold text-gray-900">{order.id}</h4>
                <p className="text-sm text-gray-500">
                  Ordered on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]
              )}>
                {order.status}
              </span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatINR(order.total)}</p>
              <p className="text-sm text-gray-500">{order.items} items</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {product.name} × {product.quantity}
                </span>
                <span className="font-medium">{formatINR(product.price * product.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              {order.trackingNumber && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Tracking: {order.trackingNumber}</span>
                </div>
              )}
              {order.deliveryDate && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Delivered on {new Date(order.deliveryDate).toLocaleDateString()}</span>
                </div>
              )}
              {order.estimatedDelivery && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span>Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              {order.status === "Delivered" && (
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>
      
      {USER_DATA.addresses.map((address) => (
        <div key={address.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {address.type === "Home" ? (
                  <Home className="w-5 h-5 text-gray-600" />
                ) : (
                  <Building className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{address.type}</h4>
                  {address.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-900 font-medium">{address.name}</p>
                <p className="text-gray-600 text-sm">
                  {address.address}, {address.city}, {address.state} - {address.pincode}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-500">{address.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>
      
      {USER_DATA.paymentMethods.map((method) => (
        <div key={method.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {method.brand} •••• {method.last4}
                  </h4>
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-green-600" />
          <div>
            <h4 className="font-medium text-gray-900">Secure Payment</h4>
            <p className="text-sm text-gray-600">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
        <p className="text-sm text-gray-500">{USER_DATA.wishlist.length} items</p>
      </div>
      
      {USER_DATA.wishlist.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg p-2">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="font-bold text-brand">{formatINR(item.price)}</span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatINR(item.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
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
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRefunds = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Refund History</h3>
        <Button variant="outline" size="sm">
          <HelpCircle className="w-4 h-4 mr-2" />
          Refund Policy
        </Button>
      </div>
      
      {USER_DATA.refunds.map((refund) => (
        <div key={refund.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">{refund.id}</h4>
              <p className="text-sm text-gray-500">
                Order: {refund.orderId} • {new Date(refund.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatINR(refund.amount)}</p>
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                STATUS_COLORS[refund.status as keyof typeof STATUS_COLORS]
              )}>
                {refund.status}
              </span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Reason:</span>
              <span className="text-gray-900">{refund.reason}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Refund Method:</span>
              <span className="text-gray-900">{refund.refundMethod}</span>
            </div>
          </div>
          
          {refund.status === "Processing" && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Your refund is being processed. It may take 3-5 business days to reflect in your account.
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
      
      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={USER_DATA.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={USER_DATA.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue={USER_DATA.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Notification Preferences</h4>
        <div className="space-y-4">
          {[
            { id: "order_updates", label: "Order Updates", description: "Get notified about order status changes" },
            { id: "promotions", label: "Promotions & Offers", description: "Receive exclusive deals and discounts" },
            { id: "newsletter", label: "Newsletter", description: "Weekly health tips and product updates" },
            { id: "sms", label: "SMS Notifications", description: "Important updates via text message" }
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Security</h4>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Two-Factor Authentication
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h4 className="font-semibold text-red-900 mb-4">Danger Zone</h4>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-100">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
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

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">My Account</h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                            activeTab === tab.id
                              ? "bg-brand text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                  {renderContent()}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
