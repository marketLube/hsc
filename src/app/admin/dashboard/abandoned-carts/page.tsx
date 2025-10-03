"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Eye,
  MoreHorizontal,
  ShoppingCart,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Mail,
  MessageSquare,
  Bell,
  Users,
  Calendar,
  Package,
  Target,
  Zap,
  Send,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  Percent,
  RefreshCw,
  Star,
  Phone,
  Tag,
  Settings,
  Gift,
  CreditCard,
  MousePointer,
  ExternalLink,
  Copy
} from "lucide-react";

type CartStatus = "active" | "recovered" | "lost" | "in_recovery";
type RecoveryMethod = "email" | "sms" | "push" | "whatsapp" | "none";

interface AbandonedCart {
  id: string;
  cartId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    customerId?: string;
    isRegistered: boolean;
    totalOrders: number;
    isVip: boolean;
  };
  items: {
    productName: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  abandonedDate: string;
  lastActivityDate: string;
  checkoutStep: "cart" | "shipping" | "payment";
  status: CartStatus;
  recoveryMethod: RecoveryMethod;
  emailsSent: number;
  lastEmailSent?: string;
  recoveryDiscount?: {
    code: string;
    value: number;
    type: "percentage" | "fixed";
  };
  deviceType: "desktop" | "mobile" | "tablet";
  location: string;
  referralSource: string;
}

// Mock data
const mockAbandonedCarts: AbandonedCart[] = [
  {
    id: "1",
    cartId: "CART-2024-001",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      customerId: "CUST-001",
      isRegistered: true,
      totalOrders: 5,
      isVip: true
    },
    items: [
      { productName: "Healthy Sugar Tablets", variant: "200 tablets", quantity: 2, price: 549, image: "/images/products/tablets.svg" },
      { productName: "Healthy Sugar Syrup", variant: "250ml", quantity: 1, price: 1149, image: "/images/products/syrup.svg" }
    ],
    subtotal: 2247,
    tax: 225,
    shipping: 50,
    total: 2522,
    abandonedDate: "2024-01-19T14:30:00Z",
    lastActivityDate: "2024-01-19T14:35:00Z",
    checkoutStep: "payment",
    status: "in_recovery",
    recoveryMethod: "email",
    emailsSent: 1,
    lastEmailSent: "2024-01-19T16:00:00Z",
    recoveryDiscount: {
      code: "COMEBACK10",
      value: 10,
      type: "percentage"
    },
    deviceType: "mobile",
    location: "Mumbai, Maharashtra",
    referralSource: "Google Ads"
  },
  {
    id: "2",
    cartId: "CART-2024-002",
    customer: {
      name: "Guest User",
      email: "amit.patel@email.com",
      phone: "+91 87654 32109",
      isRegistered: false,
      totalOrders: 0,
      isVip: false
    },
    items: [
      { productName: "Healthy Sugar Powder", variant: "250g", quantity: 1, price: 699, image: "/images/products/powder.svg" }
    ],
    subtotal: 699,
    tax: 70,
    shipping: 50,
    total: 819,
    abandonedDate: "2024-01-19T10:15:00Z",
    lastActivityDate: "2024-01-19T10:20:00Z",
    checkoutStep: "shipping",
    status: "active",
    recoveryMethod: "none",
    emailsSent: 0,
    deviceType: "desktop",
    location: "Bangalore, Karnataka",
    referralSource: "Direct"
  },
  {
    id: "3",
    cartId: "CART-2024-003",
    customer: {
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 76543 21098",
      customerId: "CUST-003",
      isRegistered: true,
      totalOrders: 3,
      isVip: false
    },
    items: [
      { productName: "Healthy Sugar Sachets", variant: "60 sticks", quantity: 3, price: 549, image: "/images/products/sachets.svg" }
    ],
    subtotal: 1647,
    tax: 165,
    shipping: 50,
    total: 1862,
    abandonedDate: "2024-01-18T16:45:00Z",
    lastActivityDate: "2024-01-18T16:50:00Z",
    checkoutStep: "cart",
    status: "recovered",
    recoveryMethod: "email",
    emailsSent: 2,
    lastEmailSent: "2024-01-19T09:00:00Z",
    recoveryDiscount: {
      code: "WELCOME15",
      value: 15,
      type: "percentage"
    },
    deviceType: "mobile",
    location: "Hyderabad, Telangana",
    referralSource: "Facebook"
  },
  {
    id: "4",
    cartId: "CART-2024-004",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      customerId: "CUST-004",
      isRegistered: true,
      totalOrders: 12,
      isVip: true
    },
    items: [
      { productName: "Healthy Sugar Tablets", variant: "100 tablets", quantity: 5, price: 299, image: "/images/products/tablets.svg" },
      { productName: "Healthy Sugar Powder", variant: "500g", quantity: 2, price: 1299, image: "/images/products/powder.svg" }
    ],
    subtotal: 4093,
    tax: 409,
    shipping: 0,
    total: 4502,
    abandonedDate: "2024-01-17T11:20:00Z",
    lastActivityDate: "2024-01-17T11:30:00Z",
    checkoutStep: "payment",
    status: "lost",
    recoveryMethod: "email",
    emailsSent: 3,
    lastEmailSent: "2024-01-19T08:00:00Z",
    deviceType: "desktop",
    location: "Delhi, Delhi",
    referralSource: "Email Campaign"
  },
  {
    id: "5",
    cartId: "CART-2024-005",
    customer: {
      name: "Kavita Nair",
      email: "kavita.nair@email.com",
      phone: "+91 54321 09876",
      isRegistered: false,
      totalOrders: 0,
      isVip: false
    },
    items: [
      { productName: "Healthy Sugar Syrup", variant: "250ml", quantity: 1, price: 1149, image: "/images/products/syrup.svg" }
    ],
    subtotal: 1149,
    tax: 115,
    shipping: 50,
    total: 1314,
    abandonedDate: "2024-01-19T09:45:00Z",
    lastActivityDate: "2024-01-19T09:50:00Z",
    checkoutStep: "shipping",
    status: "in_recovery",
    recoveryMethod: "email",
    emailsSent: 1,
    lastEmailSent: "2024-01-19T11:00:00Z",
    deviceType: "tablet",
    location: "Pune, Maharashtra",
    referralSource: "Instagram"
  },
  {
    id: "6",
    cartId: "CART-2024-006",
    customer: {
      name: "Arjun Iyer",
      email: "arjun.iyer@email.com",
      phone: "+91 87654 98765",
      customerId: "CUST-006",
      isRegistered: true,
      totalOrders: 6,
      isVip: false
    },
    items: [
      { productName: "Healthy Sugar Tablets", variant: "200 tablets", quantity: 1, price: 549, image: "/images/products/tablets.svg" }
    ],
    subtotal: 549,
    tax: 55,
    shipping: 50,
    total: 654,
    abandonedDate: "2024-01-19T13:10:00Z",
    lastActivityDate: "2024-01-19T13:15:00Z",
    checkoutStep: "payment",
    status: "active",
    recoveryMethod: "none",
    emailsSent: 0,
    deviceType: "mobile",
    location: "Chennai, Tamil Nadu",
    referralSource: "Google Search"
  }
];

export default function AbandonedCartsPage() {
  const [activeTab, setActiveTab] = useState<"carts" | "campaigns" | "automation" | "analytics">("carts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [selectedCarts, setSelectedCarts] = useState<string[]>([]);

  const carts = mockAbandonedCarts;

  // Filter carts
  const filteredCarts = carts.filter((cart) => {
    const matchesSearch = 
      cart.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.cartId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || cart.status === statusFilter;
    
    // Time filter logic
    const now = new Date();
    const abandonedDate = new Date(cart.abandonedDate);
    const hoursDiff = (now.getTime() - abandonedDate.getTime()) / (1000 * 60 * 60);
    
    let matchesTime = true;
    if (timeFilter === "1h") matchesTime = hoursDiff <= 1;
    else if (timeFilter === "24h") matchesTime = hoursDiff <= 24;
    else if (timeFilter === "7d") matchesTime = hoursDiff <= 168;
    
    return matchesSearch && matchesStatus && matchesTime;
  });

  // Calculate stats
  const totalValue = carts.reduce((sum, cart) => sum + cart.total, 0);
  const recoveredValue = carts.filter(c => c.status === "recovered").reduce((sum, cart) => sum + cart.total, 0);
  const recoveryRate = carts.length > 0 ? (carts.filter(c => c.status === "recovered").length / carts.length) * 100 : 0;
  
  const stats = {
    totalCarts: carts.length,
    activeCarts: carts.filter(c => c.status === "active").length,
    inRecovery: carts.filter(c => c.status === "in_recovery").length,
    recovered: carts.filter(c => c.status === "recovered").length,
    lost: carts.filter(c => c.status === "lost").length,
    totalValue: totalValue,
    recoveredValue: recoveredValue,
    potentialRevenue: carts.filter(c => ["active", "in_recovery"].includes(c.status)).reduce((sum, cart) => sum + cart.total, 0),
    recoveryRate: recoveryRate,
    avgCartValue: carts.length > 0 ? totalValue / carts.length : 0,
    emailsSent: carts.reduce((sum, cart) => sum + cart.emailsSent, 0),
    conversionRate: carts.filter(c => c.emailsSent > 0).length > 0
      ? (carts.filter(c => c.status === "recovered").length / carts.filter(c => c.emailsSent > 0).length) * 100
      : 0
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const getStatusColor = (status: CartStatus) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "in_recovery": return "bg-yellow-100 text-yellow-800";
      case "recovered": return "bg-green-100 text-green-800";
      case "lost": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCheckoutStepColor = (step: string) => {
    switch (step) {
      case "cart": return "bg-red-100 text-red-800";
      case "shipping": return "bg-yellow-100 text-yellow-800";
      case "payment": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Abandoned Cart Recovery
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recover lost sales with automated follow-up campaigns and targeted incentives
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Campaign
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Carts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCarts}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.inRecovery} in recovery</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Potential Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.potentialRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">At risk</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Recovered</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.recoveredValue)}</p>
                <p className="text-xs text-green-600 mt-1">{stats.recovered} carts</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Recovery Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recoveryRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+5.2% vs last week</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Impact Banner */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">💰 Recovery Opportunity</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.potentialRevenue)}</div>
              <div className="text-sm text-gray-600 mt-1">
                in <span className="font-semibold text-green-600">{stats.activeCarts + stats.inRecovery} active carts</span> • 
                Avg cart value: <span className="font-semibold text-blue-600">{formatCurrency(stats.avgCartValue)}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-white rounded-xl border border-green-300 text-green-700 font-medium hover:bg-green-50 transition-colors">
            Launch Campaign <Zap className="inline h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Emails Sent</div>
            <Mail className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.emailsSent}</div>
          <div className="text-xs text-gray-500 mt-1">This week</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Email Conversion</div>
            <Percent className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-1">Click-to-purchase rate</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Avg Cart Value</div>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgCartValue)}</div>
          <div className="text-xs text-gray-500 mt-1">Per abandoned cart</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "carts", name: "Abandoned Carts", icon: ShoppingCart, count: stats.totalCarts },
            { id: "campaigns", name: "Recovery Campaigns", icon: Send },
            { id: "automation", name: "Automation", icon: Zap },
            { id: "analytics", name: "Analytics", icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Carts Tab */}
      {activeTab === "carts" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      placeholder="Search carts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="in_recovery">In Recovery</option>
                  <option value="recovered">Recovered</option>
                  <option value="lost">Lost</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cart List */}
          <div className="space-y-4">
            {filteredCarts.map((cart) => (
              <div key={cart.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{cart.customer.name}</span>
                          {cart.customer.isVip && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              VIP
                            </span>
                          )}
                          {!cart.customer.isRegistered && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              Guest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="font-mono">{cart.cartId}</span>
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {cart.customer.email}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(cart.abandonedDate)}
                          </span>
                          <span className="flex items-center">
                            <MousePointer className="h-3 w-3 mr-1" />
                            {cart.deviceType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCheckoutStepColor(cart.checkoutStep)}`}>
                        {cart.checkoutStep.toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                        {cart.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {cart.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{item.productName}</div>
                          <div className="text-xs text-gray-500">{item.variant} • Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-xs text-gray-500">Cart Total</div>
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(cart.total)}</div>
                      </div>
                      {cart.recoveryDiscount && (
                        <div>
                          <div className="text-xs text-gray-500">Recovery Code</div>
                          <code className="px-2 py-1 bg-white rounded text-xs font-mono font-semibold text-green-600 border border-green-300">
                            {cart.recoveryDiscount.code}
                          </code>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-gray-500">Emails Sent</div>
                        <div className="text-sm font-semibold text-gray-900">{cart.emailsSent}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cart.status === "active" && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                          <Send className="h-3 w-3 mr-1" />
                          Send Email
                        </button>
                      )}
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "1 Hour Follow-up", sent: 45, clicks: 18, conversions: 6, rate: "13.3%" },
              { name: "24 Hour Reminder", sent: 38, clicks: 12, conversions: 4, rate: "10.5%" },
              { name: "3 Day Last Chance", sent: 29, clicks: 8, conversions: 3, rate: "10.3%" }
            ].map((campaign, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{campaign.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sent</span>
                    <span className="font-semibold text-gray-900">{campaign.sent}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Clicks</span>
                    <span className="font-semibold text-gray-900">{campaign.clicks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Conversions</span>
                    <span className="font-semibold text-green-600">{campaign.conversions}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Success Rate</span>
                      <span className="text-lg font-bold text-green-600">{campaign.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === "automation" && (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Automated Recovery Workflows</h3>
          <div className="space-y-4">
            {[
              { name: "Email Sequence (1h, 24h, 3d)", active: true, trigger: "Cart abandoned", actions: 3 },
              { name: "SMS Follow-up", active: true, trigger: "High-value cart (>₹2000)", actions: 1 },
              { name: "Push Notification", active: false, trigger: "Mobile app users", actions: 2 },
              { name: "Discount Code Generator", active: true, trigger: "After 2nd email", actions: 1 }
            ].map((workflow, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${workflow.active ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Zap className={`h-5 w-5 ${workflow.active ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{workflow.name}</div>
                    <div className="text-xs text-gray-500">Trigger: {workflow.trigger} • {workflow.actions} actions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${workflow.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {workflow.active ? "ACTIVE" : "PAUSED"}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Edit className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recovery Funnel</h3>
              <div className="space-y-3">
                {[
                  { stage: "Abandoned Carts", count: stats.totalCarts, percentage: 100 },
                  { stage: "Recovery Emails Sent", count: stats.emailsSent, percentage: 80 },
                  { stage: "Emails Opened", count: Math.floor(stats.emailsSent * 0.45), percentage: 36 },
                  { stage: "Clicked Through", count: Math.floor(stats.emailsSent * 0.18), percentage: 14.4 },
                  { stage: "Recovered", count: stats.recovered, percentage: recoveryRate }
                ].map((stage, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{stage.stage}</span>
                      <span className="font-semibold text-gray-900">{stage.count} ({stage.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-purple-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Abandonment Reasons</h3>
              <div className="space-y-3">
                {[
                  { reason: "High shipping cost", percentage: 35 },
                  { reason: "Unexpected extra costs", percentage: 28 },
                  { reason: "Creating account required", percentage: 18 },
                  { reason: "Complex checkout", percentage: 12 },
                  { reason: "Payment security concerns", percentage: 7 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.reason}</span>
                      <span className="font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

