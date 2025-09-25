"use client";

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  MousePointer,
  CreditCard,
  Package,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Heart,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Minus,
  Plus
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

const revenueData = [
  { month: "Jul", revenue: 185000, orders: 890, customers: 156 },
  { month: "Aug", revenue: 210000, orders: 980, customers: 189 },
  { month: "Sep", revenue: 195000, orders: 920, customers: 167 },
  { month: "Oct", revenue: 225000, orders: 1050, customers: 198 },
  { month: "Nov", revenue: 280000, orders: 1350, customers: 245 },
  { month: "Dec", revenue: 320000, orders: 1580, customers: 289 },
  { month: "Jan", revenue: 2456800, orders: 12470, customers: 1240 }
];

const topProducts = [
  { 
    name: "Healthy Sugar Tablets", 
    revenue: 1254400, 
    orders: 4560, 
    growth: 25.8, 
    margin: 68.5,
    rating: 4.8,
    reviews: 1240,
    category: "Tablets"
  },
  { 
    name: "Healthy Sugar Syrup", 
    revenue: 688660, 
    orders: 2340, 
    growth: 18.2, 
    margin: 72.1,
    rating: 4.7,
    reviews: 890,
    category: "Liquid"
  },
  { 
    name: "Healthy Sugar Powder", 
    revenue: 321110, 
    orders: 1890, 
    growth: 12.8, 
    margin: 75.3,
    rating: 4.9,
    reviews: 650,
    category: "Powder"
  },
  { 
    name: "Healthy Sugar Sachets", 
    revenue: 192630, 
    orders: 1670, 
    growth: 22.5, 
    margin: 69.8,
    rating: 4.6,
    reviews: 420,
    category: "Sachets"
  }
];

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

const deviceBreakdown = [
  { device: "Desktop", percentage: 45.2, visitors: 20658, conversions: 827, revenue: 1628400 },
  { device: "Mobile", percentage: 42.8, visitors: 19551, conversions: 704, revenue: 1386240 },
  { device: "Tablet", percentage: 12.0, visitors: 5482, conversions: 164, revenue: 322880 }
];

const geographicData = [
  { region: "Mumbai", visitors: 8920, percentage: 19.5, revenue: 478560, orders: 243 },
  { region: "Delhi", visitors: 7136, percentage: 15.6, revenue: 382720, orders: 195 },
  { region: "Bangalore", visitors: 6394, percentage: 14.0, revenue: 343040, orders: 174 },
  { region: "Chennai", visitors: 4568, percentage: 10.0, revenue: 245120, orders: 125 },
  { region: "Pune", visitors: 4111, percentage: 9.0, revenue: 220608, orders: 112 },
  { region: "Hyderabad", visitors: 3653, percentage: 8.0, revenue: 196096, orders: 100 },
  { region: "Kolkata", visitors: 3196, percentage: 7.0, revenue: 171584, orders: 87 },
  { region: "Others", visitors: 7702, percentage: 16.9, revenue: 413072, orders: 211 }
];

const conversionFunnel = [
  { stage: "Website Visitors", count: 45680, percentage: 100, dropoff: 0 },
  { stage: "Product Views", count: 18272, percentage: 40.0, dropoff: 60.0 },
  { stage: "Add to Cart", count: 5481, percentage: 12.0, dropoff: 70.0 },
  { stage: "Checkout Started", count: 2740, percentage: 6.0, dropoff: 50.0 },
  { stage: "Payment Info", count: 2055, percentage: 4.5, dropoff: 25.0 },
  { stage: "Purchase Complete", count: 1737, percentage: 3.8, dropoff: 15.5 }
];

const timeBasedMetrics = {
  hourlyTraffic: [
    { hour: "00", visitors: 1240, conversions: 45 },
    { hour: "06", visitors: 2180, conversions: 78 },
    { hour: "12", visitors: 4560, conversions: 168 },
    { hour: "18", visitors: 3890, conversions: 142 },
  ],
  weeklyPattern: [
    { day: "Mon", visitors: 6852, orders: 168, revenue: 331440 },
    { day: "Tue", visitors: 7136, orders: 175, revenue: 345200 },
    { day: "Wed", visitors: 6394, orders: 156, revenue: 307440 },
    { day: "Thu", visitors: 7820, orders: 192, revenue: 378240 },
    { day: "Fri", visitors: 8504, orders: 209, revenue: 412480 },
    { day: "Sat", visitors: 5938, orders: 145, revenue: 286160 },
    { day: "Sun", visitors: 3036, orders: 74, revenue: 146080 }
  ]
};

// Helper function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

// Helper function to format time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-fg via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-brand-gradient mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Comprehensive insights into your e-commerce performance
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
              <button className="inline-flex items-center px-6 py-2 bg-brand-gradient text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </button>
            </div>
        </div>
      </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-premium p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{dashboardMetrics.revenueGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardMetrics.totalRevenue)}</p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
                    </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-premium p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{dashboardMetrics.ordersGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardMetrics.totalOrders.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-2xl shadow-premium p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600" />
        </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{dashboardMetrics.aovGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardMetrics.averageOrderValue)}</p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
                    </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-2xl shadow-premium p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Target className="h-6 w-6 text-orange-600" />
                    </div>
              <div className="flex items-center text-orange-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{dashboardMetrics.conversionGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardMetrics.conversionRate}%</p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {/* Website Visitors */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-indigo-500" />
              <span className="text-xs text-green-600 font-medium">+{dashboardMetrics.visitorGrowth}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{formatNumber(dashboardMetrics.websiteVisitors)}</p>
            <p className="text-xs text-gray-500">Visitors</p>
          </div>

          {/* Customer Lifetime Value */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-pink-500" />
              <span className="text-xs text-green-600 font-medium">+{dashboardMetrics.clvGrowth}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(dashboardMetrics.customerLifetimeValue)}</p>
            <p className="text-xs text-gray-500">CLV</p>
          </div>

          {/* Retention Rate */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <RefreshCw className="h-5 w-5 text-teal-500" />
              <span className="text-xs text-green-600 font-medium">+{dashboardMetrics.retentionGrowth}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{dashboardMetrics.customerRetentionRate}%</p>
            <p className="text-xs text-gray-500">Retention</p>
          </div>

          {/* Bounce Rate */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="h-5 w-5 text-red-500" />
              <span className="text-xs text-green-600 font-medium">{dashboardMetrics.bounceRateChange}%</span>
              </div>
            <p className="text-lg font-bold text-gray-900">{dashboardMetrics.bounceRate}%</p>
            <p className="text-xs text-gray-500">Bounce Rate</p>
                    </div>

          {/* Session Duration */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-xs text-green-600 font-medium">+{dashboardMetrics.sessionGrowth}%</span>
                    </div>
            <p className="text-lg font-bold text-gray-900">{formatTime(dashboardMetrics.averageSessionDuration)}</p>
            <p className="text-xs text-gray-500">Avg Session</p>
              </div>

          {/* Gross Margin */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="h-5 w-5 text-emerald-500" />
              <span className="text-xs text-green-600 font-medium">+{dashboardMetrics.marginGrowth}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{dashboardMetrics.grossMargin}%</p>
            <p className="text-xs text-gray-500">Gross Margin</p>
          </div>
        </div>

        {/* Revenue Trend & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-3 h-3 bg-brand rounded-full mr-2"></div>
                  Revenue
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Orders
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {revenueData.map((data, index) => (
                <div key={data.month} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 w-12">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{formatCurrency(data.revenue)}</span>
                      <span className="text-xs text-blue-600">{data.orders} orders</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-brand h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((data.revenue / 3000000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.orders / 15000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
              </div>
              ))}
        </div>
      </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion Funnel</h3>
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
                        <span className="text-xs text-red-500 font-medium">
                          -{stage.dropoff}%
                        </span>
                  </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Performance & Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Products</h3>
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
                        <span>{product.margin}% margin</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(product.revenue)}</p>
                    <p className="text-sm text-green-600 font-medium">+{product.growth}%</p>
                  </div>
                </div>
              ))}
        </div>
      </div>

        {/* Customer Segments */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Segments</h3>
            <div className="space-y-6">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                      <span className="font-medium text-gray-900">{segment.segment}</span>
                    </div>
                    <span className="text-sm text-gray-500">{segment.count} customers</span>
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

        {/* Traffic Sources & Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Sources */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Traffic Sources & ROAS</h3>
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

          {/* Device & Geographic Breakdown */}
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Device & Geographic Analytics</h3>
            
            {/* Device Breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Device Performance</h4>
              <div className="space-y-3">
                {deviceBreakdown.map((device, index) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {device.device === 'Desktop' ? <Monitor className="h-4 w-4 text-gray-600" /> :
                         device.device === 'Mobile' ? <Smartphone className="h-4 w-4 text-gray-600" /> :
                         <Tablet className="h-4 w-4 text-gray-600" />}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">{device.percentage}%</span>
                      <span className="font-medium">{formatCurrency(device.revenue)}</span>
                    </div>
                  </div>
                ))}
        </div>
      </div>

            {/* Top Cities */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Cities</h4>
              <div className="space-y-2">
                {geographicData.slice(0, 5).map((city, index) => (
                  <div key={city.region} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-900">{city.region}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">{city.percentage}%</span>
                      <span className="font-medium">{formatCurrency(city.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Health Dashboard */}
        <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Health & Forecasting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {formatCurrency(dashboardMetrics.monthlyRecurringRevenue)}
              </div>
              <div className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</div>
              <div className="text-xs text-green-600 font-medium">
                +{dashboardMetrics.mrrGrowth}% from last month
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {dashboardMetrics.grossMargin}%
              </div>
              <div className="text-sm text-gray-600 mb-1">Gross Profit Margin</div>
              <div className="text-xs text-blue-600 font-medium">
                +{dashboardMetrics.marginGrowth}% improvement
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {dashboardMetrics.profitMargin}%
              </div>
              <div className="text-sm text-gray-600 mb-1">Net Profit Margin</div>
              <div className="text-xs text-purple-600 font-medium">
                +{dashboardMetrics.profitGrowth}% growth
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {formatCurrency(dashboardMetrics.operatingExpenses)}
              </div>
              <div className="text-sm text-gray-600 mb-1">Operating Expenses</div>
              <div className="text-xs text-orange-600 font-medium">
                {dashboardMetrics.expenseGrowth}% reduction
              </div>
            </div>
          </div>
        </div>

        {/* Inventory & Product Health */}
        <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Inventory & Product Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Package className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalProducts}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{dashboardMetrics.activeProducts}</div>
              <div className="text-sm text-gray-600">Active Products</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{dashboardMetrics.outOfStock}</div>
              <div className="text-sm text-gray-600">Out of Stock</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">{dashboardMetrics.lowStock}</div>
              <div className="text-sm text-gray-600">Low Stock</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{dashboardMetrics.topSellingProducts}</div>
              <div className="text-sm text-gray-600">Top Sellers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
