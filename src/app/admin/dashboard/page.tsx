"use client";

import { 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Target,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Heart,
  RefreshCw,
  Zap,
  MousePointer,
  BarChart3,
  Filter,
  Download,
  Bell,
  Activity,
  Percent,
  TrendingDown,
  Award,
  ShoppingBag,
  UserPlus,
  Repeat,
  Timer,
  AlertCircle,
  LineChart,
  PieChart
} from "lucide-react";

// Comprehensive Analytics Data
const dashboardMetrics = {
  // Core Business Metrics
  totalRevenue: 2456800,
  revenueGrowth: 15.8,
  monthlyRecurringRevenue: 185600,
  mrrGrowth: 12.3,
  totalOrders: 12470,
  ordersGrowth: 18.5,
  averageOrderValue: 1970,
  aovGrowth: 4.1,
  
  // Customer Metrics
  totalCustomers: 8920,
  newCustomers: 1240,
  customerGrowth: 22.4,
  customerLifetimeValue: 4850,
  clvGrowth: 8.7,
  customerRetentionRate: 68.5,
  retentionGrowth: 5.2,
  
  // Conversion & Traffic
  websiteVisitors: 45680,
  visitorGrowth: 28.3,
  conversionRate: 3.8,
  conversionGrowth: 0.8,
  bounceRate: 42.1,
  bounceRateChange: -3.2,
  averageSessionDuration: 245, // seconds
  sessionGrowth: 12.5,
  
  // Product & Inventory
  totalProducts: 24,
  activeProducts: 20,
  outOfStock: 2,
  lowStock: 3,
  topSellingProducts: 4,
  
  // Financial Health
  grossMargin: 72.5,
  marginGrowth: 2.1,
  operatingExpenses: 145600,
  expenseGrowth: -5.4,
  profitMargin: 28.7,
  profitGrowth: 18.9
};

// Enhanced KPI Cards Data
const primaryKPIs = [
  {
    name: "Total Revenue",
    value: "₹24.57L",
    rawValue: dashboardMetrics.totalRevenue,
    change: `+${dashboardMetrics.revenueGrowth}%`,
    changeType: "increase" as const,
    icon: DollarSign,
    period: "vs last month",
    color: "green",
    description: "Total sales revenue across all channels"
  },
  {
    name: "Total Orders",
    value: "12,470",
    rawValue: dashboardMetrics.totalOrders,
    change: `+${dashboardMetrics.ordersGrowth}%`,
    changeType: "increase" as const,
    icon: ShoppingCart,
    period: "vs last month",
    color: "blue",
    description: "Number of completed orders"
  },
  {
    name: "Avg Order Value",
    value: "₹1,970",
    rawValue: dashboardMetrics.averageOrderValue,
    change: `+${dashboardMetrics.aovGrowth}%`,
    changeType: "increase" as const,
    icon: BarChart3,
    period: "vs last month",
    color: "purple",
    description: "Average value per order"
  },
  {
    name: "Conversion Rate",
    value: `${dashboardMetrics.conversionRate}%`,
    rawValue: dashboardMetrics.conversionRate,
    change: `+${dashboardMetrics.conversionGrowth}%`,
    changeType: "increase" as const,
    icon: Target,
    period: "vs last month",
    color: "orange",
    description: "Visitors who complete a purchase"
  },
  {
    name: "Customer LTV",
    value: "₹4,850",
    rawValue: dashboardMetrics.customerLifetimeValue,
    change: `+${dashboardMetrics.clvGrowth}%`,
    changeType: "increase" as const,
    icon: Users,
    period: "vs last month",
    color: "pink",
    description: "Average customer lifetime value"
  },
  {
    name: "Retention Rate",
    value: `${dashboardMetrics.customerRetentionRate}%`,
    rawValue: dashboardMetrics.customerRetentionRate,
    change: `+${dashboardMetrics.retentionGrowth}%`,
    changeType: "increase" as const,
    icon: RefreshCw,
    period: "vs last month",
    color: "teal",
    description: "Percentage of returning customers"
  }
];

// Secondary Metrics
const secondaryMetrics = [
  {
    name: "Website Visitors",
    value: "45.7K",
    change: `+${dashboardMetrics.visitorGrowth}%`,
    icon: Eye,
    color: "indigo"
  },
  {
    name: "New Customers",
    value: "1,240",
    change: `+${dashboardMetrics.customerGrowth}%`,
    icon: UserPlus,
    color: "green"
  },
  {
    name: "Bounce Rate",
    value: `${dashboardMetrics.bounceRate}%`,
    change: `${dashboardMetrics.bounceRateChange}%`,
    icon: MousePointer,
    color: "red"
  },
  {
    name: "Session Duration",
    value: "4m 5s",
    change: `+${dashboardMetrics.sessionGrowth}%`,
    icon: Clock,
    color: "yellow"
  },
  {
    name: "Gross Margin",
    value: `${dashboardMetrics.grossMargin}%`,
    change: `+${dashboardMetrics.marginGrowth}%`,
    icon: Percent,
    color: "emerald"
  },
  {
    name: "Active Products",
    value: dashboardMetrics.activeProducts.toString(),
    change: "0%",
    icon: Package,
    color: "blue"
  }
];

// Enhanced Product Performance Data
const topProducts = [
  { 
    name: "Healthy Sugar Tablets", 
    revenue: 1254400, 
    orders: 4560, 
    growth: 25.8, 
    margin: 68.5,
    rating: 4.8,
    reviews: 1240,
    category: "Tablets",
    stock: 850,
    stockStatus: "healthy"
  },
  { 
    name: "Healthy Sugar Syrup", 
    revenue: 688660, 
    orders: 2340, 
    growth: 18.2, 
    margin: 72.1,
    rating: 4.7,
    reviews: 890,
    category: "Liquid",
    stock: 320,
    stockStatus: "healthy"
  },
  { 
    name: "Healthy Sugar Powder", 
    revenue: 321110, 
    orders: 1890, 
    growth: 12.8, 
    margin: 75.3,
    rating: 4.9,
    reviews: 650,
    category: "Powder",
    stock: 45,
    stockStatus: "low"
  },
  { 
    name: "Healthy Sugar Sachets", 
    revenue: 192630, 
    orders: 1670, 
    growth: 22.5, 
    margin: 69.8,
    rating: 4.6,
    reviews: 420,
    category: "Sachets",
    stock: 0,
    stockStatus: "out"
  }
];

// Customer Segments
const customerSegments = [
  { 
    segment: "New Customers", 
    count: 3420, 
    percentage: 38.3, 
    revenue: 678900,
    avgOrderValue: 1850,
    conversionRate: 2.1,
    color: "bg-blue-500"
  },
  { 
    segment: "Returning Customers", 
    count: 4560, 
    percentage: 51.1, 
    revenue: 1452300,
    avgOrderValue: 2180,
    conversionRate: 5.8,
    color: "bg-green-500"
  },
  { 
    segment: "VIP Customers", 
    count: 940, 
    percentage: 10.6, 
    revenue: 325600,
    avgOrderValue: 3460,
    conversionRate: 12.4,
    color: "bg-purple-500"
  }
];

// Traffic Sources with ROAS
const trafficSources = [
  { 
    source: "Organic Search", 
    visitors: 18250, 
    percentage: 40.0, 
    conversions: 695,
    conversionRate: 3.8,
    cost: 0,
    revenue: 1356800,
    roas: "∞"
  },
  { 
    source: "Direct Traffic", 
    visitors: 13704, 
    percentage: 30.0, 
    conversions: 548,
    conversionRate: 4.0,
    cost: 0,
    revenue: 1078400,
    roas: "∞"
  },
  { 
    source: "Social Media", 
    visitors: 6852, 
    percentage: 15.0, 
    conversions: 260,
    conversionRate: 3.8,
    cost: 45600,
    revenue: 511200,
    roas: "11.2x"
  },
  { 
    source: "Google Ads", 
    visitors: 4568, 
    percentage: 10.0, 
    conversions: 228,
    conversionRate: 5.0,
    cost: 68400,
    revenue: 448800,
    roas: "6.6x"
  },
  { 
    source: "Email Marketing", 
    visitors: 2284, 
    percentage: 5.0, 
    conversions: 137,
    conversionRate: 6.0,
    cost: 12800,
    revenue: 269600,
    roas: "21.1x"
  }
];

// Conversion Funnel
const conversionFunnel = [
  { stage: "Website Visitors", count: 45680, percentage: 100, dropoff: 0 },
  { stage: "Product Views", count: 18272, percentage: 40.0, dropoff: 60.0 },
  { stage: "Add to Cart", count: 5481, percentage: 12.0, dropoff: 70.0 },
  { stage: "Checkout Started", count: 2740, percentage: 6.0, dropoff: 50.0 },
  { stage: "Payment Info", count: 2055, percentage: 4.5, dropoff: 25.0 },
  { stage: "Purchase Complete", count: 1737, percentage: 3.8, dropoff: 15.5 }
];

// Recent High-Value Orders
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    product: "Healthy Sugar Tablets (500 pack)",
    amount: "₹1,299",
    status: "completed",
    date: "2024-01-15",
    priority: "high"
  },
  {
    id: "ORD-002",
    customer: "Rajesh Kumar",
    product: "Healthy Sugar Syrup (250ml)",
    amount: "₹1,149",
    status: "processing",
    date: "2024-01-15",
    priority: "medium"
  },
  {
    id: "ORD-003",
    customer: "Anita Patel",
    product: "Healthy Sugar Powder (250g)",
    amount: "₹699",
    status: "shipped",
    date: "2024-01-14",
    priority: "medium"
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    product: "Healthy Sugar Sachets (120 pack)",
    amount: "₹999",
    status: "completed",
    date: "2024-01-14",
    priority: "high"
  },
  {
    id: "ORD-005",
    customer: "Meera Joshi",
    product: "Healthy Sugar Tablets (100 pack)",
    amount: "₹299",
    status: "pending",
    date: "2024-01-13",
    priority: "low"
  },
];

// Real-time Alerts
const alerts = [
  {
    id: 1,
    type: "stock",
    severity: "high",
    message: "Healthy Sugar Sachets are out of stock",
    time: "2 minutes ago",
    icon: AlertTriangle
  },
  {
    id: 2,
    type: "order",
    severity: "medium",
    message: "High-value order (₹2,499) received from Mumbai",
    time: "5 minutes ago",
    icon: ShoppingBag
  },
  {
    id: 3,
    type: "stock",
    severity: "medium",
    message: "Healthy Sugar Powder running low (45 units left)",
    time: "15 minutes ago",
    icon: Package
  },
  {
    id: 4,
    type: "performance",
    severity: "low",
    message: "Conversion rate increased by 0.3% today",
    time: "1 hour ago",
    icon: TrendingUp
  }
];

// Geographic Performance
const geographicData = [
  { region: "Mumbai", visitors: 8920, percentage: 19.5, revenue: 478560, orders: 243 },
  { region: "Delhi", visitors: 7136, percentage: 15.6, revenue: 382720, orders: 195 },
  { region: "Bangalore", visitors: 6394, percentage: 14.0, revenue: 343040, orders: 174 },
  { region: "Chennai", visitors: 4568, percentage: 10.0, revenue: 245120, orders: 125 },
  { region: "Pune", visitors: 4111, percentage: 9.0, revenue: 220608, orders: 112 }
];

// Helper Functions
const formatNumber = (num: number): string => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStockStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "text-green-600 bg-green-100";
    case "low":
      return "text-yellow-600 bg-yellow-100";
    case "out":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "border-l-red-500 bg-red-50";
    case "medium":
      return "border-l-yellow-500 bg-yellow-50";
    case "low":
      return "border-l-green-500 bg-green-50";
    default:
      return "border-l-gray-500 bg-gray-50";
  }
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                E-commerce Analytics Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Comprehensive insights into your business performance and growth metrics
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 Days
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-500" />
                Real-time Alerts
              </h3>
              <span className="text-sm text-gray-500">Last updated: just now</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.severity)}`}>
                  <div className="flex items-start">
                    <alert.icon className="h-5 w-5 mt-0.5 mr-3 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {primaryKPIs.map((kpi) => (
            <div key={kpi.name} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${kpi.color}-100 group-hover:bg-${kpi.color}-200 transition-colors`}>
                  <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
                <div className={`flex items-center text-${kpi.color}-600 text-sm font-medium`}>
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {kpi.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{kpi.name}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.description}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.period}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {secondaryMetrics.map((metric) => (
            <div key={metric.name} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
                <span className={`text-xs font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 
                  metric.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.name}</p>
            </div>
          ))}
        </div>

        {/* Conversion Funnel & Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Sales Conversion Funnel
            </h3>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{stage.count.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">({stage.percentage}%)</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-green-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-orange-500' :
                          index === 4 ? 'bg-red-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                    {index > 0 && (
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-red-500 font-medium bg-white px-1 rounded">
                          -{stage.dropoff}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Customer Segments
            </h3>
            <div className="space-y-6">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                      <span className="font-medium text-gray-900">{segment.segment}</span>
                    </div>
                    <span className="text-sm text-gray-500">{segment.count.toLocaleString()} customers</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${segment.color}`}
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="block font-medium">Revenue</span>
                      <span>{formatCurrency(segment.revenue)}</span>
                    </div>
                    <div>
                      <span className="block font-medium">AOV</span>
                      <span>{formatCurrency(segment.avgOrderValue)}</span>
                    </div>
                    <div>
                      <span className="block font-medium">Conv. Rate</span>
                      <span>{segment.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Performance & Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products with Enhanced Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Top Performing Products
            </h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' :
                        'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{product.orders} orders</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          {product.rating} ({product.reviews})
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStockStatusColor(product.stockStatus)}`}>
                          {product.stock} units
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(product.revenue)}</p>
                    <p className="text-sm text-green-600 font-medium">+{product.growth}%</p>
                    <p className="text-xs text-gray-500">{product.margin}% margin</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources with ROAS */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-500" />
              Traffic Sources & ROAS
            </h3>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={source.source} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? 'bg-green-100' :
                        index === 1 ? 'bg-blue-100' :
                        index === 2 ? 'bg-purple-100' :
                        index === 3 ? 'bg-red-100' :
                        'bg-yellow-100'
                      }`}>
                        {index === 0 ? <Globe className="h-4 w-4 text-green-600" /> :
                         index === 1 ? <MousePointer className="h-4 w-4 text-blue-600" /> :
                         index === 2 ? <Heart className="h-4 w-4 text-purple-600" /> :
                         index === 3 ? <Target className="h-4 w-4 text-red-600" /> :
                         <Zap className="h-4 w-4 text-yellow-600" />}
                      </div>
                      <span className="font-medium text-gray-900">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{source.visitors.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{source.percentage}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="block text-gray-500">Conversions</span>
                      <span className="font-medium">{source.conversions}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Conv. Rate</span>
                      <span className="font-medium">{source.conversionRate}%</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Revenue</span>
                      <span className="font-medium">{formatCurrency(source.revenue)}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">ROAS</span>
                      <span className="font-bold text-green-600">{source.roas}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders & Geographic Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent High-Value Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
                Recent High-Value Orders
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all orders
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                          {order.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{order.amount}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Geographic Performance
            </h3>
            <div className="space-y-4">
              {geographicData.map((city, index) => (
                <div key={city.region} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-red-500' :
                        index === 1 ? 'bg-orange-500' :
                        index === 2 ? 'bg-yellow-500' :
                        index === 3 ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{city.region}</p>
                      <p className="text-xs text-gray-500">{city.visitors.toLocaleString()} visitors • {city.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(city.revenue)}</p>
                    <p className="text-xs text-gray-500">{city.percentage}% of traffic</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Health Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-emerald-500" />
            Financial Health & Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600 mb-1">
                {formatCurrency(dashboardMetrics.monthlyRecurringRevenue)}
              </div>
              <div className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</div>
              <div className="text-xs text-green-600 font-medium">
                +{dashboardMetrics.mrrGrowth}% from last month
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <Percent className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {dashboardMetrics.grossMargin}%
              </div>
              <div className="text-sm text-gray-600 mb-1">Gross Profit Margin</div>
              <div className="text-xs text-blue-600 font-medium">
                +{dashboardMetrics.marginGrowth}% improvement
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {dashboardMetrics.profitMargin}%
              </div>
              <div className="text-sm text-gray-600 mb-1">Net Profit Margin</div>
              <div className="text-xs text-purple-600 font-medium">
                +{dashboardMetrics.profitGrowth}% growth
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {formatCurrency(dashboardMetrics.operatingExpenses)}
              </div>
              <div className="text-sm text-gray-600 mb-1">Operating Expenses</div>
              <div className="text-xs text-green-600 font-medium">
                {dashboardMetrics.expenseGrowth}% reduction
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Health & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inventory Health */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-500" />
              Inventory Health
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Package className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{dashboardMetrics.activeProducts}</div>
                <div className="text-sm text-gray-600">Active Products</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{dashboardMetrics.outOfStock}</div>
                <div className="text-sm text-gray-600">Out of Stock</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{dashboardMetrics.lowStock}</div>
                <div className="text-sm text-gray-600">Low Stock</div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <div className="p-3 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Add Product</p>
                <p className="text-xs text-gray-500 text-center">Create new product listing</p>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                <div className="p-3 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">View Orders</p>
                <p className="text-xs text-gray-500 text-center">Manage all orders</p>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                <div className="p-3 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Customers</p>
                <p className="text-xs text-gray-500 text-center">View customer analytics</p>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                <div className="p-3 bg-orange-100 rounded-xl mb-3 group-hover:bg-orange-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Analytics</p>
                <p className="text-xs text-gray-500 text-center">Detailed reports</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
