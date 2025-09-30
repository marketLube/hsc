"use client";

import { 
  Key,
  Shield,
  Lock,
  Unlock,
  Eye,
  Edit,
  Search,
  Filter,
  Download,
  Settings,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Plus,
  Minus,
  MoreVertical,
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
  Activity,
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
  Tablet,
  Check,
  X,
  Copy,
  Save,
  RotateCcw
} from "lucide-react";
import { useState } from "react";

// Permission Categories and Definitions
const permissionCategories = {
  read: {
    name: "Read Access",
    description: "View and read data without modification",
    color: "bg-blue-500",
    icon: Eye,
    permissions: ["view", "read", "list", "search", "export"]
  },
  write: {
    name: "Write Access", 
    description: "Create and modify data",
    color: "bg-green-500",
    icon: Edit,
    permissions: ["create", "edit", "update", "modify", "publish"]
  },
  delete: {
    name: "Delete Access",
    description: "Remove and delete data",
    color: "bg-red-500", 
    icon: XCircle,
    permissions: ["delete", "remove", "archive", "cancel"]
  },
  admin: {
    name: "Administrative",
    description: "Advanced system and configuration access",
    color: "bg-purple-500",
    icon: Settings,
    permissions: ["admin", "system", "config", "manage", "control"]
  },
  special: {
    name: "Special Actions",
    description: "Specialized business operations",
    color: "bg-orange-500",
    icon: Target,
    permissions: ["process", "approve", "refund", "transfer", "track", "moderate", "respond"]
  }
};

// Detailed Module Permissions
const modulePermissions = {
  dashboard: {
    name: "Dashboard",
    icon: BarChart3,
    color: "bg-blue-500",
    description: "Main dashboard and overview analytics",
    permissions: [
      { 
        id: "dashboard_view", 
        name: "View Dashboard", 
        description: "Access to main dashboard interface",
        category: "read",
        risk: "low",
        dependencies: []
      },
      { 
        id: "dashboard_analytics", 
        name: "View Analytics", 
        description: "Access to detailed analytics and reports",
        category: "read",
        risk: "medium",
        dependencies: ["dashboard_view"]
      }
    ]
  },
  products: {
    name: "Products",
    icon: Package,
    color: "bg-green-500",
    description: "Product catalog and inventory management",
    permissions: [
      { 
        id: "products_view", 
        name: "View Products", 
        description: "View product listings and details",
        category: "read",
        risk: "low",
        dependencies: []
      },
      { 
        id: "products_create", 
        name: "Create Products", 
        description: "Add new products to catalog",
        category: "write",
        risk: "medium",
        dependencies: ["products_view"]
      },
      { 
        id: "products_edit", 
        name: "Edit Products", 
        description: "Modify existing product information",
        category: "write",
        risk: "medium",
        dependencies: ["products_view"]
      },
      { 
        id: "products_delete", 
        name: "Delete Products", 
        description: "Remove products from catalog",
        category: "delete",
        risk: "high",
        dependencies: ["products_view", "products_edit"]
      },
      { 
        id: "products_publish", 
        name: "Publish Products", 
        description: "Make products live on website",
        category: "special",
        risk: "high",
        dependencies: ["products_view", "products_edit"]
      }
    ]
  },
  orders: {
    name: "Orders",
    icon: ShoppingCart,
    color: "bg-orange-500",
    description: "Order processing and management",
    permissions: [
      { 
        id: "orders_view", 
        name: "View Orders", 
        description: "View order listings and details",
        category: "read",
        risk: "low",
        dependencies: []
      },
      { 
        id: "orders_create", 
        name: "Create Orders", 
        description: "Create manual orders",
        category: "write",
        risk: "medium",
        dependencies: ["orders_view"]
      },
      { 
        id: "orders_edit", 
        name: "Edit Orders", 
        description: "Modify order details and status",
        category: "write",
        risk: "medium",
        dependencies: ["orders_view"]
      },
      { 
        id: "orders_delete", 
        name: "Delete Orders", 
        description: "Cancel and remove orders",
        category: "delete",
        risk: "high",
        dependencies: ["orders_view", "orders_edit"]
      },
      { 
        id: "orders_process", 
        name: "Process Orders", 
        description: "Update order status and fulfillment",
        category: "special",
        risk: "medium",
        dependencies: ["orders_view", "orders_edit"]
      },
      { 
        id: "orders_refund", 
        name: "Process Refunds", 
        description: "Handle order refunds and returns",
        category: "special",
        risk: "high",
        dependencies: ["orders_view", "orders_process"]
      }
    ]
  },
  customers: {
    name: "Customers",
    icon: Users,
    color: "bg-purple-500",
    description: "Customer data and relationship management",
    permissions: [
      { 
        id: "customers_view", 
        name: "View Customers", 
        description: "View customer profiles and data",
        category: "read",
        risk: "medium",
        dependencies: []
      },
      { 
        id: "customers_create", 
        name: "Create Customers", 
        description: "Add new customer accounts",
        category: "write",
        risk: "low",
        dependencies: ["customers_view"]
      },
      { 
        id: "customers_edit", 
        name: "Edit Customers", 
        description: "Modify customer information",
        category: "write",
        risk: "medium",
        dependencies: ["customers_view"]
      },
      { 
        id: "customers_delete", 
        name: "Delete Customers", 
        description: "Remove customer accounts",
        category: "delete",
        risk: "high",
        dependencies: ["customers_view", "customers_edit"]
      },
      { 
        id: "customers_export", 
        name: "Export Customer Data", 
        description: "Export customer information",
        category: "special",
        risk: "high",
        dependencies: ["customers_view"]
      }
    ]
  },
  accounts: {
    name: "Accounts & Finance",
    icon: DollarSign,
    color: "bg-emerald-500",
    description: "Financial data and accounting operations",
    permissions: [
      { 
        id: "accounts_view", 
        name: "View Financial Data", 
        description: "Access to financial information",
        category: "read",
        risk: "high",
        dependencies: []
      },
      { 
        id: "accounts_transactions", 
        name: "Manage Transactions", 
        description: "Handle financial transactions",
        category: "special",
        risk: "high",
        dependencies: ["accounts_view"]
      },
      { 
        id: "accounts_invoices", 
        name: "Manage Invoices", 
        description: "Create and manage invoices",
        category: "write",
        risk: "medium",
        dependencies: ["accounts_view"]
      },
      { 
        id: "accounts_tax", 
        name: "Tax Management", 
        description: "Handle tax calculations and compliance",
        category: "admin",
        risk: "high",
        dependencies: ["accounts_view", "accounts_transactions"]
      },
      { 
        id: "accounts_reports", 
        name: "Financial Reports", 
        description: "Generate financial reports",
        category: "read",
        risk: "high",
        dependencies: ["accounts_view"]
      }
    ]
  },
  inventory: {
    name: "Inventory",
    icon: Database,
    color: "bg-yellow-500",
    description: "Stock and inventory management",
    permissions: [
      { 
        id: "inventory_view", 
        name: "View Inventory", 
        description: "View stock levels and inventory",
        category: "read",
        risk: "low",
        dependencies: []
      },
      { 
        id: "inventory_create", 
        name: "Create Inventory Items", 
        description: "Add new inventory items",
        category: "write",
        risk: "medium",
        dependencies: ["inventory_view"]
      },
      { 
        id: "inventory_edit", 
        name: "Edit Inventory", 
        description: "Modify inventory information",
        category: "write",
        risk: "medium",
        dependencies: ["inventory_view"]
      },
      { 
        id: "inventory_delete", 
        name: "Delete Inventory", 
        description: "Remove inventory items",
        category: "delete",
        risk: "high",
        dependencies: ["inventory_view", "inventory_edit"]
      },
      { 
        id: "inventory_stock_update", 
        name: "Update Stock Levels", 
        description: "Adjust stock quantities",
        category: "special",
        risk: "medium",
        dependencies: ["inventory_view"]
      },
      { 
        id: "inventory_transfer", 
        name: "Transfer Stock", 
        description: "Move stock between locations",
        category: "special",
        risk: "medium",
        dependencies: ["inventory_view", "inventory_stock_update"]
      }
    ]
  },
  users: {
    name: "User Management",
    icon: Shield,
    color: "bg-violet-500",
    description: "User accounts and access control",
    permissions: [
      { 
        id: "users_view", 
        name: "View Users", 
        description: "View user accounts and profiles",
        category: "read",
        risk: "medium",
        dependencies: []
      },
      { 
        id: "users_create", 
        name: "Create Users", 
        description: "Add new user accounts",
        category: "write",
        risk: "high",
        dependencies: ["users_view"]
      },
      { 
        id: "users_edit", 
        name: "Edit Users", 
        description: "Modify user account information",
        category: "write",
        risk: "high",
        dependencies: ["users_view"]
      },
      { 
        id: "users_delete", 
        name: "Delete Users", 
        description: "Remove user accounts",
        category: "delete",
        risk: "high",
        dependencies: ["users_view", "users_edit"]
      },
      { 
        id: "users_permissions", 
        name: "Manage Permissions", 
        description: "Set and modify user permissions",
        category: "admin",
        risk: "critical",
        dependencies: ["users_view", "users_edit"]
      },
      { 
        id: "users_roles", 
        name: "Manage Roles", 
        description: "Create and manage user roles",
        category: "admin",
        risk: "critical",
        dependencies: ["users_view", "users_permissions"]
      }
    ]
  }
};

// Risk Level Configuration
const riskLevels = {
  low: {
    name: "Low Risk",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    description: "Safe operations with minimal impact"
  },
  medium: {
    name: "Medium Risk", 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertTriangle,
    description: "Moderate impact operations requiring attention"
  },
  high: {
    name: "High Risk",
    color: "bg-orange-100 text-orange-800 border-orange-200", 
    icon: AlertTriangle,
    description: "Significant impact operations requiring careful control"
  },
  critical: {
    name: "Critical Risk",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    description: "System-critical operations with maximum security requirements"
  }
};

// Permission Statistics
const permissionStats = {
  totalPermissions: Object.values(modulePermissions).reduce((sum, module) => sum + module.permissions.length, 0),
  byCategory: {
    read: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.category === 'read').length, 0),
    write: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.category === 'write').length, 0),
    delete: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.category === 'delete').length, 0),
    admin: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.category === 'admin').length, 0),
    special: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.category === 'special').length, 0)
  },
  byRisk: {
    low: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.risk === 'low').length, 0),
    medium: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.risk === 'medium').length, 0),
    high: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.risk === 'high').length, 0),
    critical: Object.values(modulePermissions).reduce((sum, module) => 
      sum + module.permissions.filter(p => p.risk === 'critical').length, 0)
  }
};

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [showDependencies, setShowDependencies] = useState(false);

  // Get all permissions flattened
  const allPermissions = Object.entries(modulePermissions).flatMap(([moduleKey, module]) =>
    module.permissions.map(permission => ({
      ...permission,
      moduleKey,
      moduleName: module.name,
      moduleIcon: module.icon,
      moduleColor: module.color
    }))
  );

  // Filter permissions
  const filteredPermissions = allPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.moduleName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory;
    const matchesRisk = selectedRisk === "all" || permission.risk === selectedRisk;
    const matchesModule = selectedModule === "all" || permission.moduleKey === selectedModule;
    
    return matchesSearch && matchesCategory && matchesRisk && matchesModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Permission Management
              </h1>
              <p className="text-lg text-gray-600">
                Configure detailed permissions and access controls for all system modules
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button 
                onClick={() => setShowDependencies(!showDependencies)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              >
                <Activity className="mr-2 h-4 w-4" />
                {showDependencies ? 'Hide' : 'Show'} Dependencies
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Permissions
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                Create Permission
              </button>
            </div>
          </div>
        </div>

        {/* Permission Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Permissions</p>
                <p className="text-2xl font-bold text-gray-900">{permissionStats.totalPermissions}</p>
              </div>
            </div>
          </div>

          {Object.entries(permissionCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${category.color} bg-opacity-10`}>
                  <category.icon className={`h-6 w-6 text-gray-600`} />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{category.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{permissionStats.byCategory[categoryKey as keyof typeof permissionStats.byCategory]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Level Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-500" />
            Risk Level Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(riskLevels).map(([riskKey, risk]) => (
              <div key={riskKey} className={`p-4 rounded-xl border-2 ${risk.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <risk.icon className="h-5 w-5" />
                  <span className="font-bold text-lg">{permissionStats.byRisk[riskKey as keyof typeof permissionStats.byRisk]}</span>
                </div>
                <h4 className="font-semibold mb-1">{risk.name}</h4>
                <p className="text-xs opacity-75">{risk.description}</p>
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
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Module Filter */}
            <div>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Modules</option>
                {Object.entries(modulePermissions).map(([moduleKey, module]) => (
                  <option key={moduleKey} value={moduleKey}>{module.name}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {Object.entries(permissionCategories).map(([categoryKey, category]) => (
                  <option key={categoryKey} value={categoryKey}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                {Object.entries(riskLevels).map(([riskKey, risk]) => (
                  <option key={riskKey} value={riskKey}>{risk.name}</option>
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

        {/* Permissions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Permissions ({filteredPermissions.length} permissions)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  {showDependencies && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dependencies
                    </th>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPermissions.map((permission) => {
                  const category = permissionCategories[permission.category as keyof typeof permissionCategories];
                  const risk = riskLevels[permission.risk as keyof typeof riskLevels];
                  const ModuleIcon = permission.moduleIcon;
                  
                  return (
                    <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${category.color} bg-opacity-10 mr-3`}>
                            <category.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {permission.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {permission.description}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              ID: {permission.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${permission.moduleColor} bg-opacity-10 mr-2`}>
                            <ModuleIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {permission.moduleName}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color} bg-opacity-10 border`}>
                          <category.icon className="h-3 w-3 mr-1" />
                          {category.name}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${risk.color}`}>
                          <risk.icon className="h-3 w-3 mr-1" />
                          {risk.name}
                        </span>
                      </td>
                      
                      {showDependencies && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {permission.dependencies.length > 0 ? (
                              permission.dependencies.map((dep) => (
                                <span key={dep} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {dep}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">None</span>
                            )}
                          </div>
                        </td>
                      )}
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900 p-1 rounded-lg hover:bg-purple-50 transition-colors">
                            <Copy className="h-4 w-4" />
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
          
          {filteredPermissions.length === 0 && (
            <div className="text-center py-12">
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No permissions found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Permission Categories Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              Permission Categories
            </h3>
            <div className="space-y-4">
              {Object.entries(permissionCategories).map(([categoryKey, category]) => (
                <div key={categoryKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                      <category.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {permissionStats.byCategory[categoryKey as keyof typeof permissionStats.byCategory]}
                    </div>
                    <div className="text-xs text-gray-500">permissions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Permission Count */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-green-500" />
              Permissions by Module
            </h3>
            <div className="space-y-3">
              {Object.entries(modulePermissions).map(([moduleKey, module]) => (
                <div key={moduleKey} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${module.color} bg-opacity-10`}>
                      <module.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{module.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(module.permissions.length / 6) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm w-6">{module.permissions.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
