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
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Truck,
  BarChart3,
  Users,
  CreditCard,
  RefreshCw,
  Archive,
  Bell,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  ShoppingCart,
  Target,
  Zap,
  Shield
} from "lucide-react";

type SupplierStatus = "active" | "inactive" | "suspended" | "pending";
type SupplierRating = 1 | 2 | 3 | 4 | 5;
type POStatus = "draft" | "sent" | "confirmed" | "partially_received" | "received" | "cancelled";

interface Supplier {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  contactPerson: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  status: SupplierStatus;
  rating: SupplierRating;
  productsSupplied: number;
  totalPurchases: number;
  outstandingAmount: number;
  paymentTerms: string;
  leadTime: number; // in days
  onTimeDeliveryRate: number; // percentage
  qualityScore: number; // percentage
  lastOrderDate: string;
  joinedDate: string;
  tags: string[];
  notes?: string;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: POStatus;
  items: {
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  receivedDate?: string;
  notes?: string;
}

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Stevia Extracts Ltd.",
    code: "SUP-001",
    email: "sales@steviaextracts.com",
    phone: "+91 98765 43210",
    contactPerson: "Rajesh Kumar",
    address: {
      street: "123 Industrial Area, Sector 5",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001"
    },
    status: "active",
    rating: 5,
    productsSupplied: 8,
    totalPurchases: 2456000,
    outstandingAmount: 125000,
    paymentTerms: "Net 30",
    leadTime: 7,
    onTimeDeliveryRate: 96.5,
    qualityScore: 98.2,
    lastOrderDate: "2024-01-15T00:00:00Z",
    joinedDate: "2022-03-10T00:00:00Z",
    tags: ["reliable", "premium", "certified"]
  },
  {
    id: "2",
    name: "Natural Sweeteners Co.",
    code: "SUP-002",
    email: "contact@naturalsweeteners.in",
    phone: "+91 87654 32109",
    contactPerson: "Priya Sharma",
    address: {
      street: "456 Green Valley Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001"
    },
    status: "active",
    rating: 4,
    productsSupplied: 12,
    totalPurchases: 1876000,
    outstandingAmount: 89000,
    paymentTerms: "Net 45",
    leadTime: 10,
    onTimeDeliveryRate: 89.3,
    qualityScore: 92.5,
    lastOrderDate: "2024-01-12T00:00:00Z",
    joinedDate: "2021-08-15T00:00:00Z",
    tags: ["organic", "bulk"]
  },
  {
    id: "3",
    name: "Pack Solutions Inc.",
    code: "SUP-003",
    email: "orders@packsolutions.com",
    phone: "+91 76543 21098",
    contactPerson: "Amit Patel",
    address: {
      street: "789 Packaging Hub",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      pincode: "380001"
    },
    status: "active",
    rating: 4,
    productsSupplied: 6,
    totalPurchases: 986000,
    outstandingAmount: 0,
    paymentTerms: "Net 15",
    leadTime: 5,
    onTimeDeliveryRate: 94.8,
    qualityScore: 96.1,
    lastOrderDate: "2024-01-18T00:00:00Z",
    joinedDate: "2023-01-20T00:00:00Z",
    tags: ["packaging", "fast-delivery"]
  },
  {
    id: "4",
    name: "Global Ingredients Supply",
    code: "SUP-004",
    email: "info@globalingredients.com",
    phone: "+91 65432 10987",
    contactPerson: "Sanjay Verma",
    address: {
      street: "321 Trade Center",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110001"
    },
    status: "pending",
    rating: 3,
    productsSupplied: 0,
    totalPurchases: 0,
    outstandingAmount: 0,
    paymentTerms: "Net 30",
    leadTime: 14,
    onTimeDeliveryRate: 0,
    qualityScore: 0,
    lastOrderDate: "",
    joinedDate: "2024-01-10T00:00:00Z",
    tags: ["new-vendor"]
  },
  {
    id: "5",
    name: "Premium Foods Trading",
    code: "SUP-005",
    email: "sales@premiumfoods.in",
    phone: "+91 54321 09876",
    contactPerson: "Meera Joshi",
    address: {
      street: "654 Food Street",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411001"
    },
    status: "suspended",
    rating: 2,
    productsSupplied: 4,
    totalPurchases: 456000,
    outstandingAmount: 78000,
    paymentTerms: "Net 30",
    leadTime: 12,
    onTimeDeliveryRate: 72.4,
    qualityScore: 78.9,
    lastOrderDate: "2023-11-20T00:00:00Z",
    joinedDate: "2022-06-15T00:00:00Z",
    tags: ["quality-issues", "late-delivery"]
  }
];

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplierId: "1",
    supplierName: "Stevia Extracts Ltd.",
    orderDate: "2024-01-15T00:00:00Z",
    expectedDelivery: "2024-01-22T00:00:00Z",
    status: "confirmed",
    items: [
      { productName: "Stevia Powder Premium", sku: "HSC-POW-001", quantity: 500, unitPrice: 120, total: 60000 },
      { productName: "Stevia Tablets Base", sku: "HSC-TAB-001", quantity: 1000, unitPrice: 95, total: 95000 }
    ],
    subtotal: 155000,
    tax: 15500,
    shipping: 2000,
    total: 172500,
    notes: "Rush order - needed before month end"
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplierId: "3",
    supplierName: "Pack Solutions Inc.",
    orderDate: "2024-01-18T00:00:00Z",
    expectedDelivery: "2024-01-25T00:00:00Z",
    status: "sent",
    items: [
      { productName: "Sachet Packaging (60ct)", sku: "PKG-SAC-60", quantity: 5000, unitPrice: 12, total: 60000 }
    ],
    subtotal: 60000,
    tax: 6000,
    shipping: 1500,
    total: 67500
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    supplierId: "2",
    supplierName: "Natural Sweeteners Co.",
    orderDate: "2024-01-12T00:00:00Z",
    expectedDelivery: "2024-01-20T00:00:00Z",
    status: "partially_received",
    items: [
      { productName: "Organic Stevia Extract", sku: "HSC-EXT-001", quantity: 200, unitPrice: 280, total: 56000 },
      { productName: "Natural Flavor Enhancer", sku: "HSC-FLV-001", quantity: 100, unitPrice: 150, total: 15000 }
    ],
    subtotal: 71000,
    tax: 7100,
    shipping: 1800,
    total: 79900,
    notes: "Partial delivery - 50% received on Jan 19"
  }
];

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState<"suppliers" | "purchase-orders" | "performance" | "payments">("suppliers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showCreatePO, setShowCreatePO] = useState(false);

  const suppliers = mockSuppliers;
  const purchaseOrders = mockPurchaseOrders;

  // Filter suppliers
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter;
    const matchesRating = ratingFilter === "all" || supplier.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Calculate stats
  const stats = {
    totalSuppliers: suppliers.length,
    activeSuppliers: suppliers.filter(s => s.status === "active").length,
    totalPurchases: suppliers.reduce((sum, s) => sum + s.totalPurchases, 0),
    outstandingPayments: suppliers.reduce((sum, s) => sum + s.outstandingAmount, 0),
    avgLeadTime: suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.leadTime, 0) / suppliers.length : 0,
    avgOnTimeRate: suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.onTimeDeliveryRate, 0) / suppliers.length : 0,
    activePOs: purchaseOrders.filter(po => ["sent", "confirmed", "partially_received"].includes(po.status)).length,
    pendingDeliveries: purchaseOrders.filter(po => ["sent", "confirmed"].includes(po.status)).length
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

  const getStatusColor = (status: SupplierStatus) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPOStatusColor = (status: POStatus) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "sent": return "bg-blue-100 text-blue-800";
      case "confirmed": return "bg-purple-100 text-purple-800";
      case "partially_received": return "bg-yellow-100 text-yellow-800";
      case "received": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderRating = (rating: SupplierRating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Suppliers & Procurement
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage suppliers, track purchase orders, and monitor vendor performance
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
            onClick={() => setShowCreatePO(true)}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <FileText className="mr-2 h-4 w-4" />
            Create PO
          </button>
          <button
            type="button"
            onClick={() => setShowAddSupplier(true)}
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Suppliers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeSuppliers}</p>
                <p className="text-xs text-gray-500 mt-1">of {stats.totalSuppliers} total</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalPurchases)}</p>
                <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active POs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activePOs}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.pendingDeliveries} pending delivery</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.outstandingPayments)}</p>
                <p className="text-xs text-gray-500 mt-1">Payment pending</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Average Lead Time</h3>
              <p className="text-sm text-gray-600">Time from order to delivery</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-4xl font-bold text-blue-600">{stats.avgLeadTime.toFixed(1)} days</div>
          <div className="text-sm text-gray-600 mt-2">Industry avg: 12 days</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">On-Time Delivery Rate</h3>
              <p className="text-sm text-gray-600">Percentage of on-time deliveries</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-4xl font-bold text-green-600">{stats.avgOnTimeRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600 mt-2">Target: 95%</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "suppliers", name: "Suppliers", icon: Building2, count: stats.totalSuppliers },
            { id: "purchase-orders", name: "Purchase Orders", icon: FileText, count: stats.activePOs },
            { id: "performance", name: "Performance", icon: BarChart3 },
            { id: "payments", name: "Payments", icon: CreditCard }
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

      {/* Suppliers Tab */}
      {activeTab === "suppliers" && (
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
                      placeholder="Search suppliers..."
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
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-12 px-4 py-4 text-left">
                      <input type="checkbox" className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand" />
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-6">
                        <input type="checkbox" className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand" />
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{supplier.name}</div>
                            <div className="text-xs text-gray-500">{supplier.code}</div>
                            {renderRating(supplier.rating)}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Users className="h-3 w-3 mr-1 text-gray-400" />
                            {supplier.contactPerson}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {supplier.email}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            {supplier.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">On-time:</span>
                            <span className={`font-semibold ${supplier.onTimeDeliveryRate >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {supplier.onTimeDeliveryRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Quality:</span>
                            <span className={`font-semibold ${supplier.qualityScore >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {supplier.qualityScore.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Lead time:</span>
                            <span className="font-semibold text-gray-900">{supplier.leadTime}d</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900">{formatCurrency(supplier.totalPurchases)}</div>
                          <div className="text-xs text-gray-500">{supplier.productsSupplied} products</div>
                          {supplier.outstandingAmount > 0 && (
                            <div className="text-xs text-orange-600 font-medium">
                              Due: {formatCurrency(supplier.outstandingAmount)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                          {supplier.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Orders Tab */}
      {activeTab === "purchase-orders" && (
        <div className="space-y-6">
          {/* PO Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-sm text-gray-500">Draft POs</div>
              <div className="text-2xl font-bold text-gray-900">
                {purchaseOrders.filter(po => po.status === "draft").length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-sm text-gray-500">Sent/Confirmed</div>
              <div className="text-2xl font-bold text-blue-600">
                {purchaseOrders.filter(po => ["sent", "confirmed"].includes(po.status)).length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-sm text-gray-500">Partially Received</div>
              <div className="text-2xl font-bold text-yellow-600">
                {purchaseOrders.filter(po => po.status === "partially_received").length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-sm text-gray-500">Received</div>
              <div className="text-2xl font-bold text-green-600">
                {purchaseOrders.filter(po => po.status === "received").length}
              </div>
            </div>
          </div>

          {/* PO List */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {purchaseOrders.map((po) => (
                <div key={po.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-semibold text-gray-900">{po.poNumber}</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPOStatusColor(po.status)}`}>
                          {po.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">{po.supplierName}</div>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="block">Order Date</span>
                          <span className="font-medium text-gray-900">{formatDate(po.orderDate)}</span>
                        </div>
                        <div>
                          <span className="block">Expected Delivery</span>
                          <span className="font-medium text-gray-900">{formatDate(po.expectedDelivery)}</span>
                        </div>
                        <div>
                          <span className="block">Items</span>
                          <span className="font-medium text-gray-900">{po.items.length} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(po.total)}</div>
                      <div className="mt-2 flex items-center space-x-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Download className="h-4 w-4" />
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
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Performance Overview</h3>
            <div className="space-y-4">
              {suppliers.filter(s => s.status === "active").map((supplier) => (
                <div key={supplier.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{supplier.name}</div>
                        {renderRating(supplier.rating)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{supplier.leadTime} days avg lead time</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">On-Time Delivery</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${supplier.onTimeDeliveryRate >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${supplier.onTimeDeliveryRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-semibold text-gray-900 mt-1">{supplier.onTimeDeliveryRate.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Quality Score</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${supplier.qualityScore >= 95 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${supplier.qualityScore}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-semibold text-gray-900 mt-1">{supplier.qualityScore.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Purchases</div>
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(supplier.totalPurchases)}</div>
                      <div className="text-xs text-gray-500">{supplier.productsSupplied} products</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Total Outstanding</div>
              <div className="text-3xl font-bold text-orange-600">{formatCurrency(stats.outstandingPayments)}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Due This Week</div>
              <div className="text-3xl font-bold text-red-600">{formatCurrency(125000)}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Due This Month</div>
              <div className="text-3xl font-bold text-yellow-600">{formatCurrency(292000)}</div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {suppliers.filter(s => s.outstandingAmount > 0).map((supplier) => (
                <div key={supplier.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{supplier.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Payment Terms: {supplier.paymentTerms}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(supplier.outstandingAmount)}</div>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                        Mark as Paid
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

