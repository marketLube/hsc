"use client";

import { 
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Users,
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Key,
  Database,
  FileText,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Globe,
  Star,
  Truck,
  RefreshCw,
  Gift,
  UserPlus,
  Activity,
  AlertTriangle,
  Info,
  Check,
  X,
  MoreVertical,
  Zap,
  Target,
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { useState } from "react";

// Module Permissions System
const modulePermissions = {
  dashboard: {
    name: "Dashboard",
    icon: BarChart3,
    color: "bg-blue-500",
    permissions: [
      { id: "view", name: "View Dashboard", description: "Access to main dashboard" },
      { id: "analytics", name: "View Analytics", description: "Access to detailed analytics" }
    ]
  },
  products: {
    name: "Products",
    icon: Package,
    color: "bg-green-500",
    permissions: [
      { id: "view", name: "View Products", description: "View product listings" },
      { id: "create", name: "Create Products", description: "Add new products" },
      { id: "edit", name: "Edit Products", description: "Modify existing products" },
      { id: "delete", name: "Delete Products", description: "Remove products" },
      { id: "publish", name: "Publish Products", description: "Make products live" }
    ]
  },
  orders: {
    name: "Orders",
    icon: ShoppingCart,
    color: "bg-orange-500",
    permissions: [
      { id: "view", name: "View Orders", description: "View order listings" },
      { id: "create", name: "Create Orders", description: "Create manual orders" },
      { id: "edit", name: "Edit Orders", description: "Modify order details" },
      { id: "delete", name: "Delete Orders", description: "Cancel/delete orders" },
      { id: "process", name: "Process Orders", description: "Update order status" },
      { id: "refund", name: "Process Refunds", description: "Handle refunds" }
    ]
  },
  customers: {
    name: "Customers",
    icon: Users,
    color: "bg-purple-500",
    permissions: [
      { id: "view", name: "View Customers", description: "View customer data" },
      { id: "create", name: "Create Customers", description: "Add new customers" },
      { id: "edit", name: "Edit Customers", description: "Modify customer info" },
      { id: "delete", name: "Delete Customers", description: "Remove customers" },
      { id: "export", name: "Export Data", description: "Export customer data" }
    ]
  },
  accounts: {
    name: "Accounts & Finance",
    icon: DollarSign,
    color: "bg-emerald-500",
    permissions: [
      { id: "view", name: "View Accounts", description: "Access financial data" },
      { id: "transactions", name: "Manage Transactions", description: "Handle transactions" },
      { id: "invoices", name: "Manage Invoices", description: "Create and manage invoices" },
      { id: "tax", name: "Tax Management", description: "Handle tax calculations" },
      { id: "reports", name: "Financial Reports", description: "Generate financial reports" }
    ]
  },
  inventory: {
    name: "Inventory",
    icon: Database,
    color: "bg-yellow-500",
    permissions: [
      { id: "view", name: "View Inventory", description: "View stock levels" },
      { id: "create", name: "Create Items", description: "Add inventory items" },
      { id: "edit", name: "Edit Items", description: "Modify inventory" },
      { id: "delete", name: "Delete Items", description: "Remove inventory" },
      { id: "stock_update", name: "Update Stock", description: "Adjust stock levels" },
      { id: "transfer", name: "Transfer Stock", description: "Move stock between locations" }
    ]
  },
  analytics: {
    name: "Analytics",
    icon: BarChart3,
    color: "bg-indigo-500",
    permissions: [
      { id: "view", name: "View Analytics", description: "Basic analytics access" },
      { id: "export", name: "Export Reports", description: "Download reports" },
      { id: "advanced_reports", name: "Advanced Reports", description: "Access advanced analytics" }
    ]
  },
  marketing: {
    name: "Marketing",
    icon: Gift,
    color: "bg-pink-500",
    permissions: [
      { id: "view", name: "View Marketing", description: "View marketing data" },
      { id: "create", name: "Create Campaigns", description: "Create marketing campaigns" },
      { id: "edit", name: "Edit Campaigns", description: "Modify campaigns" },
      { id: "delete", name: "Delete Campaigns", description: "Remove campaigns" },
      { id: "campaigns", name: "Manage Campaigns", description: "Full campaign management" },
      { id: "automation", name: "Marketing Automation", description: "Set up automated marketing" }
    ]
  },
  content: {
    name: "Content Management",
    icon: FileText,
    color: "bg-cyan-500",
    permissions: [
      { id: "view", name: "View Content", description: "View content" },
      { id: "create", name: "Create Content", description: "Create new content" },
      { id: "edit", name: "Edit Content", description: "Modify content" },
      { id: "delete", name: "Delete Content", description: "Remove content" },
      { id: "publish", name: "Publish Content", description: "Make content live" },
      { id: "seo", name: "SEO Management", description: "Manage SEO settings" }
    ]
  },
  reviews: {
    name: "Reviews",
    icon: Star,
    color: "bg-amber-500",
    permissions: [
      { id: "view", name: "View Reviews", description: "View customer reviews" },
      { id: "moderate", name: "Moderate Reviews", description: "Approve/reject reviews" },
      { id: "respond", name: "Respond to Reviews", description: "Reply to reviews" },
      { id: "delete", name: "Delete Reviews", description: "Remove reviews" }
    ]
  },
  shipping: {
    name: "Shipping",
    icon: Truck,
    color: "bg-teal-500",
    permissions: [
      { id: "view", name: "View Shipping", description: "View shipping data" },
      { id: "create", name: "Create Shipments", description: "Create new shipments" },
      { id: "edit", name: "Edit Shipments", description: "Modify shipments" },
      { id: "track", name: "Track Shipments", description: "Track shipping status" },
      { id: "rates", name: "Manage Rates", description: "Set shipping rates" }
    ]
  },
  returns: {
    name: "Returns",
    icon: RefreshCw,
    color: "bg-red-500",
    permissions: [
      { id: "view", name: "View Returns", description: "View return requests" },
      { id: "process", name: "Process Returns", description: "Handle return processing" },
      { id: "approve", name: "Approve Returns", description: "Approve return requests" },
      { id: "refund", name: "Process Refunds", description: "Handle refunds" }
    ]
  },
  settings: {
    name: "Settings",
    icon: Settings,
    color: "bg-gray-500",
    permissions: [
      { id: "view", name: "View Settings", description: "View system settings" },
      { id: "edit", name: "Edit Settings", description: "Modify settings" },
      { id: "system", name: "System Settings", description: "Advanced system configuration" },
      { id: "integrations", name: "Manage Integrations", description: "Configure integrations" }
    ]
  },
  users: {
    name: "User Management",
    icon: Shield,
    color: "bg-violet-500",
    permissions: [
      { id: "view", name: "View Users", description: "View user accounts" },
      { id: "create", name: "Create Users", description: "Add new users" },
      { id: "edit", name: "Edit Users", description: "Modify user accounts" },
      { id: "delete", name: "Delete Users", description: "Remove users" },
      { id: "permissions", name: "Manage Permissions", description: "Set user permissions" },
      { id: "roles", name: "Manage Roles", description: "Create and manage roles" }
    ]
  }
};

// Predefined Roles with detailed permissions
const predefinedRoles = [
  {
    id: "super_admin",
    name: "Super Administrator",
    description: "Complete system access with all permissions across all modules",
    color: "bg-red-500",
    userCount: 1,
    isSystem: true,
    createdAt: "2023-01-01",
    lastModified: "2023-01-01",
    permissions: Object.keys(modulePermissions).reduce((acc, module) => {
      acc[module] = modulePermissions[module].permissions.map(p => p.id);
      return acc;
    }, {} as Record<string, string[]>)
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to business operations, limited system settings access",
    color: "bg-purple-500",
    userCount: 2,
    isSystem: true,
    createdAt: "2023-01-01",
    lastModified: "2023-06-15",
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
    }
  },
  {
    id: "content_manager",
    name: "Content Manager",
    description: "Specialized role for content creation, SEO, and digital marketing",
    color: "bg-blue-500",
    userCount: 3,
    isSystem: false,
    createdAt: "2023-02-15",
    lastModified: "2023-11-20",
    permissions: {
      dashboard: ["view"],
      content: ["view", "create", "edit", "delete", "publish", "seo"],
      products: ["view", "edit"],
      marketing: ["view", "create", "edit", "campaigns"],
      analytics: ["view"],
      reviews: ["view", "moderate", "respond"]
    }
  },
  {
    id: "inventory_manager",
    name: "Inventory Manager",
    description: "Complete inventory control with product and stock management",
    color: "bg-green-500",
    userCount: 4,
    isSystem: false,
    createdAt: "2023-03-01",
    lastModified: "2023-12-01",
    permissions: {
      dashboard: ["view"],
      products: ["view", "create", "edit"],
      inventory: ["view", "create", "edit", "delete", "stock_update", "transfer"],
      orders: ["view", "process"],
      analytics: ["view"],
      shipping: ["view", "create", "edit"]
    }
  },
  {
    id: "stock_manager",
    name: "Stock Manager",
    description: "Focused on stock level updates and inventory tracking",
    color: "bg-yellow-500",
    userCount: 6,
    isSystem: false,
    createdAt: "2023-04-10",
    lastModified: "2023-10-15",
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      inventory: ["view", "stock_update"],
      orders: ["view"],
      shipping: ["view"]
    }
  },
  {
    id: "sales_manager",
    name: "Sales Manager",
    description: "Sales operations, customer management, and performance analytics",
    color: "bg-orange-500",
    userCount: 5,
    isSystem: false,
    createdAt: "2023-05-01",
    lastModified: "2023-11-30",
    permissions: {
      dashboard: ["view", "analytics"],
      orders: ["view", "create", "edit", "process"],
      customers: ["view", "create", "edit", "export"],
      analytics: ["view", "export"],
      marketing: ["view", "campaigns"],
      returns: ["view", "process"]
    }
  },
  {
    id: "marketing_manager",
    name: "Marketing Manager",
    description: "Marketing campaigns, customer engagement, and promotional content",
    color: "bg-pink-500",
    userCount: 3,
    isSystem: false,
    createdAt: "2023-06-01",
    lastModified: "2023-12-10",
    permissions: {
      dashboard: ["view", "analytics"],
      marketing: ["view", "create", "edit", "delete", "campaigns", "automation"],
      content: ["view", "create", "edit"],
      customers: ["view", "export"],
      analytics: ["view", "export"],
      reviews: ["view", "moderate", "respond"]
    }
  },
  {
    id: "finance_manager",
    name: "Finance Manager",
    description: "Financial operations, accounting, and business reporting",
    color: "bg-emerald-500",
    userCount: 2,
    isSystem: false,
    createdAt: "2023-07-01",
    lastModified: "2023-12-05",
    permissions: {
      dashboard: ["view", "analytics"],
      accounts: ["view", "transactions", "invoices", "tax", "reports"],
      orders: ["view"],
      customers: ["view"],
      analytics: ["view", "export", "advanced_reports"]
    }
  },
  {
    id: "customer_support",
    name: "Customer Support",
    description: "Customer service, order assistance, and issue resolution",
    color: "bg-indigo-500",
    userCount: 8,
    isSystem: false,
    createdAt: "2023-08-01",
    lastModified: "2023-11-25",
    permissions: {
      dashboard: ["view"],
      orders: ["view", "edit"],
      customers: ["view", "edit"],
      returns: ["view", "process"],
      reviews: ["view", "respond"],
      products: ["view"]
    }
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access for reporting and monitoring purposes",
    color: "bg-gray-500",
    userCount: 12,
    isSystem: false,
    createdAt: "2023-09-01",
    lastModified: "2023-10-01",
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      orders: ["view"],
      customers: ["view"],
      analytics: ["view"]
    }
  }
];

// Role Statistics
const roleStats = {
  totalRoles: predefinedRoles.length,
  systemRoles: predefinedRoles.filter(role => role.isSystem).length,
  customRoles: predefinedRoles.filter(role => !role.isSystem).length,
  totalUsers: predefinedRoles.reduce((sum, role) => sum + role.userCount, 0),
  totalPermissions: Object.values(modulePermissions).reduce((sum, module) => sum + module.permissions.length, 0),
  moduleCount: Object.keys(modulePermissions).length
};

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);

  // Filter roles
  const filteredRoles = predefinedRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get permission count for a role
  const getPermissionCount = (permissions: Record<string, string[]>) => {
    return Object.values(permissions).reduce((sum, perms) => sum + perms.length, 0);
  };

  // Check if role has permission
  const hasPermission = (role: any, module: string, permission: string) => {
    return role.permissions[module]?.includes(permission) || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Role Management
              </h1>
              <p className="text-lg text-gray-600">
                Configure roles, permissions, and access control for your team
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button 
                onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              >
                <Eye className="mr-2 h-4 w-4" />
                Permission Matrix
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Roles
              </button>
              <button 
                onClick={() => setShowCreateRole(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </button>
            </div>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{roleStats.totalRoles}</p>
                <p className="text-xs text-gray-500">{roleStats.systemRoles} system, {roleStats.customRoles} custom</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{roleStats.totalUsers}</p>
                <p className="text-xs text-gray-500">Across all roles</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Key className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Permissions</p>
                <p className="text-2xl font-bold text-green-600">{roleStats.totalPermissions}</p>
                <p className="text-xs text-gray-500">{roleStats.moduleCount} modules</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Modules</p>
                <p className="text-2xl font-bold text-orange-600">{roleStats.moduleCount}</p>
                <p className="text-xs text-gray-500">System modules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="h-4 w-4 mr-2 inline" />
                Filters
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Sort by Users
              </button>
            </div>
          </div>
        </div>

        {/* Permission Matrix View */}
        {showPermissionMatrix && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Permission Matrix</h3>
                <button 
                  onClick={() => setShowPermissionMatrix(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                      Module
                    </th>
                    {filteredRoles.slice(0, 6).map((role) => (
                      <th key={role.id} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        <div className={`w-4 h-4 rounded-full ${role.color} mx-auto mb-1`}></div>
                        <div className="truncate">{role.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(modulePermissions).map(([moduleKey, module]) => (
                    <tr key={moduleKey} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${module.color} bg-opacity-10 mr-3`}>
                            <module.icon className={`h-4 w-4 text-gray-600`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{module.name}</div>
                            <div className="text-xs text-gray-500">{module.permissions.length} permissions</div>
                          </div>
                        </div>
                      </td>
                      {filteredRoles.slice(0, 6).map((role) => (
                        <td key={role.id} className="px-3 py-4 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            {role.permissions[moduleKey] ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-xs text-gray-600">
                                  {role.permissions[moduleKey].length}/{module.permissions.length}
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-5 w-5 text-gray-300" />
                                <span className="text-xs text-gray-400">0/{module.permissions.length}</span>
                              </>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Role Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl ${role.color} flex items-center justify-center`}>
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{role.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{role.userCount} users</span>
                        {role.isSystem && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            System
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                    {!role.isSystem && (
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
                  <span>{getPermissionCount(role.permissions)} permissions</span>
                </div>
              </div>

              {/* Permissions Overview */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Module Access</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(modulePermissions).map(([moduleKey, module]) => {
                    const hasAccess = role.permissions[moduleKey] && role.permissions[moduleKey].length > 0;
                    const permissionCount = role.permissions[moduleKey]?.length || 0;
                    const totalPermissions = module.permissions.length;
                    
                    return (
                      <div key={moduleKey} className={`flex items-center justify-between p-2 rounded-lg ${hasAccess ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center space-x-2">
                          <module.icon className={`h-3 w-3 ${hasAccess ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className={`text-xs font-medium ${hasAccess ? 'text-green-900' : 'text-gray-500'}`}>
                            {module.name}
                          </span>
                        </div>
                        <span className={`text-xs ${hasAccess ? 'text-green-600' : 'text-gray-400'}`}>
                          {permissionCount}/{totalPermissions}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Last modified: {new Date(role.lastModified).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                      Edit Permissions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No roles found matching your search</p>
            <button 
              onClick={() => setShowCreateRole(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create a new role
            </button>
          </div>
        )}

        {/* Module Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Available Modules & Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(modulePermissions).map(([moduleKey, module]) => (
              <div key={moduleKey} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${module.color} bg-opacity-10`}>
                    <module.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-xs text-gray-500">{module.permissions.length} permissions</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {module.permissions.map((permission) => (
                    <div key={permission.id} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {permission.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

