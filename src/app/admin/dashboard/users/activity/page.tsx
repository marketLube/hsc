"use client";

import { 
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  User,
  Shield,
  Key,
  Database,
  FileText,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Settings,
  BarChart3,
  Globe,
  Star,
  Truck,
  RefreshCw,
  Gift,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  Target,
  Award,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ExternalLink,
  Copy,
  Archive,
  Flag
} from "lucide-react";
import { useState } from "react";

// Activity Types and Categories
const activityTypes = {
  auth: {
    name: "Authentication",
    color: "bg-blue-500",
    icon: Shield,
    activities: ["login", "logout", "password_change", "2fa_enable", "2fa_disable"]
  },
  user: {
    name: "User Management",
    color: "bg-purple-500", 
    icon: Users,
    activities: ["user_create", "user_edit", "user_delete", "role_change", "permission_change"]
  },
  product: {
    name: "Product Management",
    color: "bg-green-500",
    icon: Package,
    activities: ["product_create", "product_edit", "product_delete", "product_publish", "inventory_update"]
  },
  order: {
    name: "Order Management",
    color: "bg-orange-500",
    icon: ShoppingCart,
    activities: ["order_create", "order_edit", "order_process", "order_cancel", "refund_process"]
  },
  financial: {
    name: "Financial Operations",
    color: "bg-emerald-500",
    icon: DollarSign,
    activities: ["transaction_create", "invoice_generate", "payment_process", "tax_calculate", "report_generate"]
  },
  content: {
    name: "Content Management",
    color: "bg-cyan-500",
    icon: FileText,
    activities: ["content_create", "content_edit", "content_publish", "seo_update", "media_upload"]
  },
  system: {
    name: "System Operations",
    color: "bg-red-500",
    icon: Settings,
    activities: ["settings_change", "backup_create", "integration_setup", "security_update", "maintenance"]
  }
};

// Risk Levels
const riskLevels = {
  low: {
    name: "Low Risk",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle
  },
  medium: {
    name: "Medium Risk",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    icon: AlertTriangle
  },
  high: {
    name: "High Risk",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertTriangle
  },
  critical: {
    name: "Critical Risk",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle
  }
};

// User Activity Data
const userActivities = [
  {
    id: "act-001",
    timestamp: "2024-01-15T14:30:00Z",
    user: {
      id: "user-001",
      name: "Althameem Khan",
      email: "althameem@healthysugar.com",
      role: "Super Administrator"
    },
    action: "user_create",
    category: "user",
    description: "Created new user account for Priya Sharma",
    details: {
      target: "user-002",
      targetName: "Priya Sharma",
      changes: {
        role: "Administrator",
        department: "Operations",
        permissions: ["dashboard", "products", "orders", "customers"]
      }
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Pro",
    location: "Mumbai, India",
    riskLevel: "high",
    status: "success"
  },
  {
    id: "act-002",
    timestamp: "2024-01-15T14:25:00Z",
    user: {
      id: "user-002",
      name: "Priya Sharma",
      email: "priya.sharma@healthysugar.com",
      role: "Administrator"
    },
    action: "product_publish",
    category: "product",
    description: "Published product 'Stevia Powder 100g' to live website",
    details: {
      target: "product-001",
      targetName: "Stevia Powder 100g",
      changes: {
        status: "published",
        visibility: "public",
        price: "₹299"
      }
    },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows Desktop",
    location: "Delhi, India",
    riskLevel: "medium",
    status: "success"
  },
  {
    id: "act-003",
    timestamp: "2024-01-15T14:20:00Z",
    user: {
      id: "user-003",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@healthysugar.com",
      role: "Content Manager"
    },
    action: "login",
    category: "auth",
    description: "User logged into admin panel",
    details: {
      loginMethod: "email_password",
      sessionDuration: "2h 15m",
      previousLogin: "2024-01-14T16:30:00Z"
    },
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    device: "Linux Desktop",
    location: "Bangalore, India",
    riskLevel: "low",
    status: "success"
  },
  {
    id: "act-004",
    timestamp: "2024-01-15T14:15:00Z",
    user: {
      id: "user-004",
      name: "Anita Patel",
      email: "anita.patel@healthysugar.com",
      role: "Inventory Manager"
    },
    action: "inventory_update",
    category: "product",
    description: "Updated stock levels for multiple products",
    details: {
      target: "bulk_update",
      targetName: "Stock Update Batch #1547",
      changes: {
        productsUpdated: 25,
        totalStockAdded: 1500,
        lowStockAlerts: 3
      }
    },
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    device: "iPad Pro",
    location: "Ahmedabad, India",
    riskLevel: "medium",
    status: "success"
  },
  {
    id: "act-005",
    timestamp: "2024-01-15T14:10:00Z",
    user: {
      id: "user-005",
      name: "Vikram Singh",
      email: "vikram.singh@healthysugar.com",
      role: "Sales Manager"
    },
    action: "order_process",
    category: "order",
    description: "Processed high-value order #HS-2024-0156",
    details: {
      target: "order-156",
      targetName: "Order #HS-2024-0156",
      changes: {
        status: "processing",
        amount: "₹15,750",
        customer: "Ravi Enterprises"
      }
    },
    ipAddress: "192.168.1.104",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    device: "iPhone 14 Pro",
    location: "Jaipur, India",
    riskLevel: "medium",
    status: "success"
  },
  {
    id: "act-006",
    timestamp: "2024-01-15T14:05:00Z",
    user: {
      id: "user-006",
      name: "Meera Nair",
      email: "meera.nair@healthysugar.com",
      role: "Stock Manager"
    },
    action: "login",
    category: "auth",
    description: "Failed login attempt - incorrect password",
    details: {
      loginMethod: "email_password",
      failureReason: "invalid_password",
      attemptCount: 2,
      accountLocked: false
    },
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows Desktop",
    location: "Kochi, India",
    riskLevel: "medium",
    status: "failed"
  },
  {
    id: "act-007",
    timestamp: "2024-01-15T14:00:00Z",
    user: {
      id: "user-001",
      name: "Althameem Khan",
      email: "althameem@healthysugar.com",
      role: "Super Administrator"
    },
    action: "settings_change",
    category: "system",
    description: "Updated system security settings",
    details: {
      target: "security_settings",
      targetName: "System Security Configuration",
      changes: {
        passwordPolicy: "strengthened",
        sessionTimeout: "2 hours",
        twoFactorRequired: true
      }
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Pro",
    location: "Mumbai, India",
    riskLevel: "critical",
    status: "success"
  },
  {
    id: "act-008",
    timestamp: "2024-01-15T13:55:00Z",
    user: {
      id: "user-007",
      name: "Sneha Gupta",
      email: "sneha.gupta@healthysugar.com",
      role: "Marketing Manager"
    },
    action: "content_publish",
    category: "content",
    description: "Published blog post 'Benefits of Natural Sweeteners'",
    details: {
      target: "blog-post-045",
      targetName: "Benefits of Natural Sweeteners",
      changes: {
        status: "published",
        seoScore: 95,
        wordCount: 1250
      }
    },
    ipAddress: "192.168.1.106",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Air",
    location: "Delhi, India",
    riskLevel: "low",
    status: "success"
  }
];

// Activity Statistics
const activityStats = {
  totalActivities: userActivities.length,
  todayActivities: userActivities.filter(activity => {
    const today = new Date().toDateString();
    return new Date(activity.timestamp).toDateString() === today;
  }).length,
  successfulActions: userActivities.filter(activity => activity.status === 'success').length,
  failedActions: userActivities.filter(activity => activity.status === 'failed').length,
  highRiskActions: userActivities.filter(activity => activity.riskLevel === 'high' || activity.riskLevel === 'critical').length,
  uniqueUsers: [...new Set(userActivities.map(activity => activity.user.id))].length,
  byCategory: Object.keys(activityTypes).reduce((acc, category) => {
    acc[category] = userActivities.filter(activity => activity.category === category).length;
    return acc;
  }, {} as Record<string, number>),
  byRisk: Object.keys(riskLevels).reduce((acc, risk) => {
    acc[risk] = userActivities.filter(activity => activity.riskLevel === risk).length;
    return acc;
  }, {} as Record<string, number>)
};

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  // Get unique users
  const uniqueUsers = [...new Set(userActivities.map(activity => activity.user.id))]
    .map(userId => userActivities.find(activity => activity.user.id === userId)?.user)
    .filter(Boolean);

  // Filter activities
  const filteredActivities = userActivities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
    const matchesRisk = selectedRisk === "all" || activity.riskLevel === selectedRisk;
    const matchesUser = selectedUser === "all" || activity.user.id === selectedUser;
    
    return matchesSearch && matchesCategory && matchesRisk && matchesUser;
  });

  // Get device icon
  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) return Smartphone;
    if (device.includes("iPad") || device.includes("tablet")) return Tablet;
    return Monitor;
  };

  // Get browser icon
  const getBrowserIcon = (userAgent: string) => {
    return Globe; // Using Globe as generic browser icon
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                User Activity & Audit Logs
              </h1>
              <p className="text-lg text-gray-600">
                Monitor user actions, track system changes, and maintain security audit trails
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Bell className="mr-2 h-4 w-4" />
                Set Alerts
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{activityStats.totalActivities}</p>
                <p className="text-xs text-gray-500">{activityStats.todayActivities} today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Successful Actions</p>
                <p className="text-2xl font-bold text-green-600">{activityStats.successfulActions}</p>
                <p className="text-xs text-gray-500">{((activityStats.successfulActions / activityStats.totalActivities) * 100).toFixed(1)}% success rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">High Risk Actions</p>
                <p className="text-2xl font-bold text-red-600">{activityStats.highRiskActions}</p>
                <p className="text-xs text-gray-500">{activityStats.failedActions} failed actions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-purple-600">{activityStats.uniqueUsers}</p>
                <p className="text-xs text-gray-500">Unique users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Categories Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-500" />
            Activity Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(activityTypes).map(([categoryKey, category]) => (
              <div key={categoryKey} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                      <category.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{activityStats.byCategory[categoryKey] || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${((activityStats.byCategory[categoryKey] || 0) / activityStats.totalActivities) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {Object.entries(activityTypes).map(([categoryKey, category]) => (
                  <option key={categoryKey} value={categoryKey}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                {Object.entries(riskLevels).map(([riskKey, risk]) => (
                  <option key={riskKey} value={riskKey}>{risk.name}</option>
                ))}
              </select>
            </div>

            {/* User Filter */}
            <div>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(user => (
                  <option key={user?.id} value={user?.id}>{user?.name}</option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* Actions */}
            <div>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </button>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Activity Timeline ({filteredActivities.length} activities)
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity) => {
              const category = activityTypes[activity.category as keyof typeof activityTypes];
              const risk = riskLevels[activity.riskLevel as keyof typeof riskLevels];
              const timestamp = formatTimestamp(activity.timestamp);
              const DeviceIcon = getDeviceIcon(activity.device);
              const BrowserIcon = getBrowserIcon(activity.userAgent);
              
              return (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Activity Icon */}
                    <div className={`p-3 rounded-xl ${category.color} bg-opacity-10 flex-shrink-0`}>
                      <category.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    
                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {activity.description}
                          </h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${risk.color}`}>
                            <risk.icon className="h-3 w-3 mr-1" />
                            {risk.name}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {activity.status === 'success' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                            {activity.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{timestamp.date}</span>
                          <span className="text-xs font-medium text-gray-900">{timestamp.time}</span>
                        </div>
                      </div>
                      
                      {/* User Info */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <User className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{activity.user.name}</span>
                          <span className="text-xs text-gray-500">({activity.user.role})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <DeviceIcon className="h-3 w-3" />
                          <span>{activity.device}</span>
                          <BrowserIcon className="h-3 w-3" />
                          <MapPin className="h-3 w-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      
                      {/* Activity Details */}
                      {activity.details && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {activity.details.target && (
                              <div>
                                <span className="font-medium text-gray-700">Target: </span>
                                <span className="text-gray-600">{activity.details.targetName || activity.details.target}</span>
                              </div>
                            )}
                            {activity.details.changes && (
                              <div className="md:col-span-2">
                                <span className="font-medium text-gray-700">Changes: </span>
                                <div className="mt-1 space-y-1">
                                  {Object.entries(activity.details.changes).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                      <span className="text-gray-500">{key}:</span>
                                      <span className="text-gray-900 font-medium">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Technical Details */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span>IP: {activity.ipAddress}</span>
                          <span>Action: {activity.action}</span>
                          <span>ID: {activity.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-3 w-3" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Copy className="h-3 w-3" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <MoreVertical className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No activities found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
