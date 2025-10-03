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
  Percent,
  Tag,
  Calendar,
  Clock,
  Users,
  ShoppingCart,
  TrendingUp,
  Gift,
  DollarSign,
  Target,
  Zap,
  Copy,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  Hash,
  CreditCard,
  Package,
  Star,
  Sparkles,
  BadgePercent,
  Receipt,
  ArrowRight,
  RefreshCw
} from "lucide-react";

type PromotionType = "percentage" | "fixed_amount" | "buy_x_get_y" | "free_shipping" | "bundle";
type PromotionStatus = "active" | "scheduled" | "paused" | "expired" | "draft";
type DiscountAppliesTo = "all_products" | "specific_products" | "specific_categories" | "minimum_purchase";

interface Promotion {
  id: string;
  name: string;
  code: string;
  type: PromotionType;
  status: PromotionStatus;
  discountValue: number;
  appliesTo: DiscountAppliesTo;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  products?: string[];
  categories?: string[];
  customerEligibility: "all" | "new_customers" | "vip_only";
  stackable: boolean;
  revenue: number;
  conversionRate: number;
  createdDate: string;
  description?: string;
}

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: "1",
    name: "New Year Sale 2024",
    code: "NEWYEAR2024",
    type: "percentage",
    status: "active",
    discountValue: 25,
    appliesTo: "all_products",
    minPurchase: 500,
    maxDiscount: 1000,
    usageLimit: 1000,
    usageCount: 347,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    customerEligibility: "all",
    stackable: false,
    revenue: 458900,
    conversionRate: 18.5,
    createdDate: "2023-12-15T00:00:00Z",
    description: "Start the year healthy with 25% off on all products"
  },
  {
    id: "2",
    name: "First Time Customer Discount",
    code: "WELCOME15",
    type: "percentage",
    status: "active",
    discountValue: 15,
    appliesTo: "minimum_purchase",
    minPurchase: 299,
    usageLimit: undefined,
    usageCount: 892,
    startDate: "2023-11-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    customerEligibility: "new_customers",
    stackable: false,
    revenue: 234560,
    conversionRate: 32.4,
    createdDate: "2023-10-20T00:00:00Z",
    description: "Welcome new customers with 15% off on first purchase"
  },
  {
    id: "3",
    name: "VIP Member Exclusive",
    code: "VIP500",
    type: "fixed_amount",
    status: "active",
    discountValue: 500,
    appliesTo: "minimum_purchase",
    minPurchase: 2000,
    usageLimit: 500,
    usageCount: 123,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-06-30T23:59:59Z",
    customerEligibility: "vip_only",
    stackable: true,
    revenue: 178900,
    conversionRate: 45.2,
    createdDate: "2023-12-20T00:00:00Z",
    description: "Exclusive ₹500 off for VIP members"
  },
  {
    id: "4",
    name: "Free Shipping February",
    code: "FREESHIP",
    type: "free_shipping",
    status: "scheduled",
    discountValue: 0,
    appliesTo: "minimum_purchase",
    minPurchase: 699,
    usageLimit: undefined,
    usageCount: 0,
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-02-29T23:59:59Z",
    customerEligibility: "all",
    stackable: true,
    revenue: 0,
    conversionRate: 0,
    createdDate: "2024-01-10T00:00:00Z",
    description: "Free shipping on orders above ₹699"
  },
  {
    id: "5",
    name: "Buy 2 Get 1 Free - Tablets",
    code: "B2G1FREE",
    type: "buy_x_get_y",
    status: "active",
    discountValue: 0,
    appliesTo: "specific_products",
    products: ["tablets"],
    usageLimit: 200,
    usageCount: 87,
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-01-25T23:59:59Z",
    customerEligibility: "all",
    stackable: false,
    revenue: 156780,
    conversionRate: 28.9,
    createdDate: "2024-01-05T00:00:00Z",
    description: "Buy 2 tablet packs, get 1 free"
  },
  {
    id: "6",
    name: "Holiday Bundle Deal",
    code: "BUNDLE50",
    type: "bundle",
    status: "expired",
    discountValue: 50,
    appliesTo: "specific_products",
    products: ["powder", "syrup", "tablets"],
    usageLimit: 100,
    usageCount: 100,
    startDate: "2023-12-20T00:00:00Z",
    endDate: "2024-01-05T23:59:59Z",
    customerEligibility: "all",
    stackable: false,
    revenue: 289400,
    conversionRate: 42.1,
    createdDate: "2023-12-10T00:00:00Z",
    description: "Special holiday bundle - save ₹50"
  },
  {
    id: "7",
    name: "Flash Sale - 48 Hours",
    code: "FLASH40",
    type: "percentage",
    status: "paused",
    discountValue: 40,
    appliesTo: "specific_categories",
    categories: ["sweeteners"],
    minPurchase: 1000,
    maxDiscount: 2000,
    usageLimit: 500,
    usageCount: 234,
    startDate: "2024-01-18T00:00:00Z",
    endDate: "2024-01-20T23:59:59Z",
    customerEligibility: "all",
    stackable: false,
    revenue: 398600,
    conversionRate: 52.3,
    createdDate: "2024-01-15T00:00:00Z",
    description: "48-hour flash sale - 40% off sweeteners"
  }
];

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "scheduled" | "performance" | "settings">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showCreatePromo, setShowCreatePromo] = useState(false);

  const promotions = mockPromotions;

  // Filter promotions
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = 
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || promo.status === statusFilter;
    const matchesType = typeFilter === "all" || promo.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const stats = {
    totalPromotions: promotions.length,
    activePromotions: promotions.filter(p => p.status === "active").length,
    scheduledPromotions: promotions.filter(p => p.status === "scheduled").length,
    totalRevenue: promotions.reduce((sum, p) => sum + p.revenue, 0),
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
    avgConversion: promotions.filter(p => p.conversionRate > 0).length > 0
      ? promotions.filter(p => p.conversionRate > 0).reduce((sum, p) => sum + p.conversionRate, 0) / promotions.filter(p => p.conversionRate > 0).length
      : 0,
    topPerformer: promotions.reduce((max, p) => p.revenue > max.revenue ? p : max, promotions[0])
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
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusColor = (status: PromotionStatus) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-gray-100 text-gray-800";
      case "draft": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: PromotionType) => {
    switch (type) {
      case "percentage": return BadgePercent;
      case "fixed_amount": return DollarSign;
      case "buy_x_get_y": return Gift;
      case "free_shipping": return Package;
      case "bundle": return ShoppingCart;
      default: return Tag;
    }
  };

  const getTypeLabel = (type: PromotionType) => {
    switch (type) {
      case "percentage": return "Percentage Off";
      case "fixed_amount": return "Fixed Amount";
      case "buy_x_get_y": return "Buy X Get Y";
      case "free_shipping": return "Free Shipping";
      case "bundle": return "Bundle Deal";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Promotions & Discounts
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage promotional campaigns, discount codes, and special offers
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
            onClick={() => setShowCreatePromo(true)}
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Promotions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activePromotions}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.scheduledPromotions} scheduled</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue Generated</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">+28% vs last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Redemptions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsage.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Codes used</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Conversion</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgConversion.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+5.2% improvement</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performer Banner */}
      {stats.topPerformer && (
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">🏆 Top Performing Campaign</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{stats.topPerformer.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-purple-600">{formatCurrency(stats.topPerformer.revenue)}</span> revenue • 
                  <span className="font-semibold text-green-600 ml-2">{stats.topPerformer.conversionRate}%</span> conversion
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white rounded-xl border border-purple-300 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
              View Details <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Percent className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">Percentage Discount</div>
              <div className="text-xs text-gray-500">Create % off promotion</div>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Gift className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">BOGO Deal</div>
              <div className="text-xs text-gray-500">Buy X Get Y promotion</div>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
              <div className="text-xs text-gray-500">Shipping discount code</div>
            </div>
          </div>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "all", name: "All Promotions", icon: Tag, count: stats.totalPromotions },
            { id: "active", name: "Active", icon: CheckCircle, count: stats.activePromotions },
            { id: "scheduled", name: "Scheduled", icon: Clock, count: stats.scheduledPromotions },
            { id: "performance", name: "Performance", icon: BarChart3 },
            { id: "settings", name: "Settings", icon: Settings }
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

      {/* All/Active/Scheduled Tabs */}
      {(activeTab === "all" || activeTab === "active" || activeTab === "scheduled") && (
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
                      placeholder="Search promotions..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="paused">Paused</option>
                  <option value="expired">Expired</option>
                  <option value="draft">Draft</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="percentage">Percentage Off</option>
                  <option value="fixed_amount">Fixed Amount</option>
                  <option value="buy_x_get_y">Buy X Get Y</option>
                  <option value="free_shipping">Free Shipping</option>
                  <option value="bundle">Bundle Deal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPromotions
              .filter(p => activeTab === "all" || p.status === activeTab)
              .map((promo) => {
                const TypeIcon = getTypeIcon(promo.type);
                const usagePercentage = promo.usageLimit ? (promo.usageCount / promo.usageLimit) * 100 : 0;
                
                return (
                  <div key={promo.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-white rounded-xl shadow-sm">
                            <TypeIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 truncate">{promo.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="px-2 py-1 bg-white rounded text-xs font-mono font-semibold text-gray-900 border border-gray-300">
                                {promo.code}
                              </code>
                              <button className="p-1 hover:bg-white rounded transition-colors" title="Copy code">
                                <Copy className="h-3 w-3 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                          {promo.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                      {/* Description */}
                      {promo.description && (
                        <p className="text-sm text-gray-600 mb-4">{promo.description}</p>
                      )}

                      {/* Discount Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500 mb-1">Discount</div>
                          <div className="text-lg font-bold text-gray-900">
                            {promo.type === "percentage" ? `${promo.discountValue}%` : 
                             promo.type === "fixed_amount" ? formatCurrency(promo.discountValue) :
                             promo.type === "free_shipping" ? "Free Ship" : "Special"}
                          </div>
                          <div className="text-xs text-gray-500">{getTypeLabel(promo.type)}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500 mb-1">Eligibility</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {promo.customerEligibility === "all" ? "All Customers" :
                             promo.customerEligibility === "new_customers" ? "New Only" : "VIP Only"}
                          </div>
                          {promo.minPurchase && (
                            <div className="text-xs text-gray-500">Min: {formatCurrency(promo.minPurchase)}</div>
                          )}
                        </div>
                      </div>

                      {/* Date Range */}
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(promo.startDate)}</span>
                        </div>
                        <span>→</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(promo.endDate)}</span>
                        </div>
                      </div>

                      {/* Usage Progress */}
                      {promo.usageLimit && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Usage</span>
                            <span>{promo.usageCount} / {promo.usageLimit.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                usagePercentage >= 90 ? 'bg-red-500' :
                                usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Performance Metrics */}
                      {promo.revenue > 0 && (
                        <div className="grid grid-cols-2 gap-3 py-3 border-t border-gray-200">
                          <div>
                            <div className="text-xs text-gray-500">Revenue</div>
                            <div className="text-sm font-bold text-green-600">{formatCurrency(promo.revenue)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Conversion</div>
                            <div className="text-sm font-bold text-blue-600">{promo.conversionRate}%</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {promo.status === "active" ? (
                            <button className="inline-flex items-center px-3 py-1.5 border border-yellow-300 rounded-lg text-xs font-medium text-yellow-700 bg-white hover:bg-yellow-50 transition-colors">
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </button>
                          ) : promo.status === "paused" ? (
                            <button className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-lg text-xs font-medium text-green-700 bg-white hover:bg-green-50 transition-colors">
                              <Play className="h-3 w-3 mr-1" />
                              Resume
                            </button>
                          ) : promo.status === "scheduled" ? (
                            <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                              <Zap className="h-3 w-3 mr-1" />
                              Activate Now
                            </button>
                          ) : null}
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            <Copy className="h-3 w-3 mr-1" />
                            Duplicate
                          </button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Performance Metrics</h3>
            <div className="space-y-4">
              {promotions
                .filter(p => p.revenue > 0)
                .sort((a, b) => b.revenue - a.revenue)
                .map((promo) => (
                  <div key={promo.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{promo.name}</div>
                        <code className="text-xs text-gray-500 font-mono">{promo.code}</code>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                        {promo.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Revenue</div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(promo.revenue)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Redemptions</div>
                        <div className="text-lg font-bold text-gray-900">{promo.usageCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                        <div className="text-lg font-bold text-blue-600">{promo.conversionRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg Order Value</div>
                        <div className="text-lg font-bold text-purple-600">
                          {formatCurrency(promo.usageCount > 0 ? promo.revenue / promo.usageCount : 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Promotion Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Allow Code Stacking</div>
                  <div className="text-xs text-gray-500">Allow multiple promo codes per order</div>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Auto-Apply Best Discount</div>
                  <div className="text-xs text-gray-500">Automatically apply best available discount</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Show Savings on Checkout</div>
                  <div className="text-xs text-gray-500">Display total savings prominently</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Email Promotion Notifications</div>
                  <div className="text-xs text-gray-500">Send emails when promotions start/end</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

