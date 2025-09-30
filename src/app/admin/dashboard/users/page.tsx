"use client";

import { 
  Users,
  UserPlus,
  Shield,
  Settings,
  Search,
  Filter,
  Calendar,
  Download,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Star,
  Award,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Bell,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar as CalendarIcon,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Plus,
  Minus,
  MoreVertical,
  UserCheck,
  UserX,
  Key,
  Database,
  FileText,
  Package,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { useState } from "react";

// User Roles and Permissions System
const modulePermissions = {
  dashboard: {
    name: "Dashboard",
    permissions: ["view", "analytics"]
  },
  products: {
    name: "Products",
    permissions: ["view", "create", "edit", "delete", "publish"]
  },
  orders: {
    name: "Orders",
    permissions: ["view", "create", "edit", "delete", "process", "refund"]
  },
  customers: {
    name: "Customers",
    permissions: ["view", "create", "edit", "delete", "export"]
  },
  accounts: {
    name: "Accounts & Finance",
    permissions: ["view", "transactions", "invoices", "tax", "reports"]
  },
  inventory: {
    name: "Inventory",
    permissions: ["view", "create", "edit", "delete", "stock_update", "transfer"]
  },
  analytics: {
    name: "Analytics",
    permissions: ["view", "export", "advanced_reports"]
  },
  marketing: {
    name: "Marketing",
    permissions: ["view", "create", "edit", "delete", "campaigns", "automation"]
  },
  content: {
    name: "Content Management",
    permissions: ["view", "create", "edit", "delete", "publish", "seo"]
  },
  reviews: {
    name: "Reviews",
    permissions: ["view", "moderate", "respond", "delete"]
  },
  shipping: {
    name: "Shipping",
    permissions: ["view", "create", "edit", "track", "rates"]
  },
  returns: {
    name: "Returns",
    permissions: ["view", "process", "approve", "refund"]
  },
  settings: {
    name: "Settings",
    permissions: ["view", "edit", "system", "integrations"]
  },
  users: {
    name: "User Management",
    permissions: ["view", "create", "edit", "delete", "permissions", "roles"]
  }
};

// Predefined Roles
const predefinedRoles = [
  {
    id: "super_admin",
    name: "Super Administrator",
    description: "Full access to all modules and system settings",
    color: "bg-red-500",
    permissions: Object.keys(modulePermissions).reduce((acc, module) => {
      acc[module] = modulePermissions[module].permissions;
      return acc;
    }, {} as Record<string, string[]>),
    userCount: 1
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Full access except user management and system settings",
    color: "bg-purple-500",
    permissions: {
      dashboard: ["view", "analytics"],
      products: ["view", "create", "edit", "delete", "publish"],
      orders: ["view", "create", "edit", "delete", "process", "refund"],
      customers: ["view", "create", "edit", "delete", "export"],
      accounts: ["view", "transactions", "invoices", "tax", "reports"],
      inventory: ["view", "create", "edit", "delete", "stock_update", "transfer"],
      analytics: ["view", "export", "advanced_reports"],
      marketing: ["view", "create", "edit", "delete", "campaigns", "automation"],
      content: ["view", "create", "edit", "delete", "publish", "seo"],
      reviews: ["view", "moderate", "respond", "delete"],
      shipping: ["view", "create", "edit", "track", "rates"],
      returns: ["view", "process", "approve", "refund"],
      settings: ["view", "edit"]
    },
    userCount: 2
  },
  {
    id: "content_manager",
    name: "Content Manager",
    description: "Manage website content, blogs, and SEO",
    color: "bg-blue-500",
    permissions: {
      dashboard: ["view"],
      content: ["view", "create", "edit", "delete", "publish", "seo"],
      products: ["view", "edit"],
      analytics: ["view"],
      reviews: ["view", "moderate", "respond"]
    },
    userCount: 3
  },
  {
    id: "inventory_manager",
    name: "Inventory Manager",
    description: "Full inventory and stock management access",
    color: "bg-green-500",
    permissions: {
      dashboard: ["view"],
      products: ["view", "create", "edit"],
      inventory: ["view", "create", "edit", "delete", "stock_update", "transfer"],
      orders: ["view", "process"],
      analytics: ["view"],
      shipping: ["view", "create", "edit"]
    },
    userCount: 4
  },
  {
    id: "stock_manager",
    name: "Stock Manager",
    description: "Stock updates and inventory tracking",
    color: "bg-yellow-500",
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      inventory: ["view", "stock_update"],
      orders: ["view"],
      shipping: ["view"]
    },
    userCount: 6
  },
  {
    id: "sales_manager",
    name: "Sales Manager",
    description: "Orders, customers, and sales analytics",
    color: "bg-orange-500",
    permissions: {
      dashboard: ["view", "analytics"],
      orders: ["view", "create", "edit", "process"],
      customers: ["view", "create", "edit", "export"],
      analytics: ["view", "export"],
      marketing: ["view", "campaigns"],
      returns: ["view", "process"]
    },
    userCount: 5
  },
  {
    id: "marketing_manager",
    name: "Marketing Manager",
    description: "Marketing campaigns and customer engagement",
    color: "bg-pink-500",
    permissions: {
      dashboard: ["view", "analytics"],
      marketing: ["view", "create", "edit", "delete", "campaigns", "automation"],
      content: ["view", "create", "edit"],
      customers: ["view", "export"],
      analytics: ["view", "export"],
      reviews: ["view", "moderate", "respond"]
    },
    userCount: 3
  },
  {
    id: "finance_manager",
    name: "Finance Manager",
    description: "Financial data and accounting access",
    color: "bg-emerald-500",
    permissions: {
      dashboard: ["view", "analytics"],
      accounts: ["view", "transactions", "invoices", "tax", "reports"],
      orders: ["view"],
      customers: ["view"],
      analytics: ["view", "export", "advanced_reports"]
    },
    userCount: 2
  },
  {
    id: "customer_support",
    name: "Customer Support",
    description: "Customer service and order support",
    color: "bg-indigo-500",
    permissions: {
      dashboard: ["view"],
      orders: ["view", "edit"],
      customers: ["view", "edit"],
      returns: ["view", "process"],
      reviews: ["view", "respond"],
      products: ["view"]
    },
    userCount: 8
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to basic modules",
    color: "bg-gray-500",
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      orders: ["view"],
      customers: ["view"],
      analytics: ["view"]
    },
    userCount: 12
  }
];

// User Data
const users = [
  {
    id: "user-001",
    name: "Althameem Khan",
    email: "althameem@healthysugar.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createdAt: "2023-01-15",
    avatar: "/avatars/althameem.jpg",
    department: "Management",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    loginCount: 1247,
    deviceInfo: "Chrome on MacOS",
    permissions: predefinedRoles[0].permissions
  },
  {
    id: "user-002",
    name: "Priya Sharma",
    email: "priya.sharma@healthysugar.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 12:45",
    createdAt: "2023-02-20",
    avatar: "/avatars/priya.jpg",
    department: "Operations",
    phone: "+91 98765 43211",
    location: "Delhi, India",
    loginCount: 892,
    deviceInfo: "Chrome on Windows",
    permissions: predefinedRoles[1].permissions
  },
  {
    id: "user-003",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@healthysugar.com",
    role: "content_manager",
    status: "active",
    lastLogin: "2024-01-15 11:20",
    createdAt: "2023-03-10",
    avatar: "/avatars/rajesh.jpg",
    department: "Marketing",
    phone: "+91 98765 43212",
    location: "Bangalore, India",
    loginCount: 654,
    deviceInfo: "Firefox on Linux",
    permissions: predefinedRoles[2].permissions
  },
  {
    id: "user-004",
    name: "Anita Patel",
    email: "anita.patel@healthysugar.com",
    role: "inventory_manager",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    createdAt: "2023-04-05",
    avatar: "/avatars/anita.jpg",
    department: "Inventory",
    phone: "+91 98765 43213",
    location: "Ahmedabad, India",
    loginCount: 743,
    deviceInfo: "Chrome on Android",
    permissions: predefinedRoles[3].permissions
  },
  {
    id: "user-005",
    name: "Vikram Singh",
    email: "vikram.singh@healthysugar.com",
    role: "sales_manager",
    status: "active",
    lastLogin: "2024-01-14 18:30",
    createdAt: "2023-05-12",
    avatar: "/avatars/vikram.jpg",
    department: "Sales",
    phone: "+91 98765 43214",
    location: "Jaipur, India",
    loginCount: 567,
    deviceInfo: "Safari on iOS",
    permissions: predefinedRoles[5].permissions
  },
  {
    id: "user-006",
    name: "Meera Nair",
    email: "meera.nair@healthysugar.com",
    role: "stock_manager",
    status: "inactive",
    lastLogin: "2024-01-10 16:45",
    createdAt: "2023-06-18",
    avatar: "/avatars/meera.jpg",
    department: "Inventory",
    phone: "+91 98765 43215",
    location: "Kochi, India",
    loginCount: 234,
    deviceInfo: "Chrome on Windows",
    permissions: predefinedRoles[4].permissions
  }
];

// User Management Statistics
const userStats = {
  totalUsers: 46,
  activeUsers: 42,
  inactiveUsers: 4,
  newUsersThisMonth: 8,
  totalRoles: predefinedRoles.length,
  totalPermissions: Object.values(modulePermissions).reduce((acc, module) => acc + module.permissions.length, 0),
  loginActivity: {
    today: 28,
    thisWeek: 41,
    thisMonth: 46
  },
  deviceBreakdown: {
    desktop: 32,
    mobile: 10,
    tablet: 4
  },
  departmentBreakdown: {
    "Management": 2,
    "Operations": 8,
    "Marketing": 6,
    "Sales": 12,
    "Inventory": 10,
    "Support": 8
  }
};

// Helper Functions
const getRoleInfo = (roleId: string) => {
  return predefinedRoles.find(role => role.id === roleId) || predefinedRoles[predefinedRoles.length - 1];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return CheckCircle;
    case "inactive":
      return XCircle;
    case "pending":
      return Clock;
    case "suspended":
      return Lock;
    default:
      return AlertTriangle;
  }
};

const getDeviceIcon = (device: string) => {
  if (device.includes("Android") || device.includes("iOS")) return Smartphone;
  if (device.includes("iPad") || device.includes("tablet")) return Tablet;
  return Monitor;
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showCreateUser, setShowCreateUser] = useState(false);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                User Management
              </h1>
              <p className="text-lg text-gray-600">
                Manage users, roles, permissions, and access control
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Users
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Settings className="mr-2 h-4 w-4" />
                Bulk Actions
              </button>
              <button 
                onClick={() => setShowCreateUser(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* User Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers}</p>
                <p className="text-xs text-green-600">+{userStats.newUsersThisMonth} this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{userStats.activeUsers}</p>
                <p className="text-xs text-gray-500">{((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% of total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Roles</p>
                <p className="text-2xl font-bold text-purple-600">{userStats.totalRoles}</p>
                <p className="text-xs text-gray-500">{userStats.totalPermissions} permissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Today</p>
                <p className="text-2xl font-bold text-orange-600">{userStats.loginActivity.today}</p>
                <p className="text-xs text-gray-500">{userStats.loginActivity.thisWeek} this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Role Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-500" />
              Role Distribution
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
              Manage Roles
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {predefinedRoles.slice(0, 5).map((role) => (
              <div key={role.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-4 h-4 rounded-full ${role.color}`}></div>
                  <span className="text-sm font-bold text-gray-900">{role.userCount}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{role.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{role.description}</p>
                <div className="mt-2 text-xs text-blue-600">
                  {Object.keys(role.permissions).length} modules access
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {predefinedRoles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {Object.keys(userStats.departmentBreakdown).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Users ({filteredUsers.length} users)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const StatusIcon = getStatusIcon(user.status);
                  const DeviceIcon = getDeviceIcon(user.deviceInfo);
                  const roleInfo = getRoleInfo(user.role);
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {user.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${roleInfo.color} mr-2`}></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{roleInfo.name}</div>
                            <div className="text-sm text-gray-500">{user.department}</div>
                            <div className="text-xs text-blue-600">
                              {Object.keys(user.permissions).length} modules
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {user.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {user.loginCount} logins
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.lastLogin}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <DeviceIcon className="h-3 w-3 mr-1" />
                          {user.deviceInfo}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(user.permissions).slice(0, 3).map((module) => (
                            <span key={module} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {modulePermissions[module]?.name || module}
                            </span>
                          ))}
                          {Object.keys(user.permissions).length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{Object.keys(user.permissions).length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900 p-1 rounded-lg hover:bg-purple-50 transition-colors">
                            <Key className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-500" />
              Department Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(userStats.departmentBreakdown).map(([dept, count]) => (
                <div key={dept} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dept}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / userStats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm w-6">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-green-500" />
              Device Usage
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Desktop</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.deviceBreakdown.desktop}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Mobile</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.deviceBreakdown.mobile}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Tablet className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Tablet</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.deviceBreakdown.tablet}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-500" />
              Login Activity
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-semibold text-green-600">{userStats.loginActivity.today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold text-blue-600">{userStats.loginActivity.thisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-purple-600">{userStats.loginActivity.thisMonth}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
