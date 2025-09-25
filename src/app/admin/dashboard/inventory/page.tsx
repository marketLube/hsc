"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Eye,
  MoreHorizontal,
  Minus,
  ArrowUpDown,
  Calendar,
  MapPin,
  Truck,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Archive,
  Copy,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc,
  Zap,
  Target,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon
} from "lucide-react";

type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock" | "overstocked" | "discontinued";
type SortField = "productName" | "currentStock" | "totalValue" | "lastRestocked" | "status" | "reorderLevel";
type SortOrder = "asc" | "desc";

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  barcode?: string;
  category: string;
  brand: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  maxStock: number;
  unitCost: number;
  sellingPrice: number;
  totalValue: number;
  lastRestocked: string;
  nextReorderDate?: string;
  supplier: string;
  supplierContact: string;
  location: string;
  warehouse: string;
  status: InventoryStatus;
  expiryDate?: string;
  batchNumber?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  notes?: string;
  image?: string;
  stockMovements: {
    date: string;
    type: "in" | "out" | "adjustment";
    quantity: number;
    reason: string;
  }[];
}

// Enhanced mock inventory data
const mockInventory: InventoryItem[] = [
  {
    id: "1",
    productId: "tablets",
    productName: "Healthy Sugar Tablets",
    sku: "HSC-TABLETS-001",
    barcode: "1234567890123",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 450,
    reservedStock: 25,
    availableStock: 425,
    reorderLevel: 100,
    maxStock: 1000,
    unitCost: 150,
    sellingPrice: 299,
    totalValue: 67500,
    lastRestocked: "2024-01-10T00:00:00Z",
    nextReorderDate: "2024-02-15T00:00:00Z",
    supplier: "Stevia Extracts Ltd.",
    supplierContact: "+91 98765 43210",
    location: "A1-B2-C3",
    warehouse: "Warehouse A - Section 1",
    status: "in_stock",
    expiryDate: "2025-01-10T00:00:00Z",
    batchNumber: "HSC-TAB-2024-001",
    weight: 0.2,
    dimensions: { length: 10, width: 8, height: 2 },
    tags: ["diabetes-friendly", "natural", "bestseller"],
    notes: "High-demand product, monitor closely",
    image: "/images/products/tablets.svg",
    stockMovements: [
      { date: "2024-01-10T00:00:00Z", type: "in", quantity: 500, reason: "New stock delivery" },
      { date: "2024-01-12T00:00:00Z", type: "out", quantity: 50, reason: "Sales order fulfillment" }
    ]
  },
  {
    id: "2",
    productId: "syrup",
    productName: "Healthy Sugar Syrup",
    sku: "HSC-SYRUP-001",
    barcode: "1234567890124",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 75,
    reservedStock: 10,
    availableStock: 65,
    reorderLevel: 50,
    maxStock: 500,
    unitCost: 280,
    sellingPrice: 549,
    totalValue: 21000,
    lastRestocked: "2024-01-08T00:00:00Z",
    nextReorderDate: "2024-01-25T00:00:00Z",
    supplier: "Natural Sweeteners Co.",
    supplierContact: "+91 87654 32109",
    location: "A2-B1-C2",
    warehouse: "Warehouse A - Section 2",
    status: "low_stock",
    expiryDate: "2024-12-08T00:00:00Z",
    batchNumber: "HSC-SYR-2024-001",
    weight: 0.25,
    dimensions: { length: 6, width: 6, height: 12 },
    tags: ["liquid", "premium", "low-stock-alert"],
    notes: "Reorder urgently - below minimum threshold",
    image: "/images/products/syrup.svg",
    stockMovements: [
      { date: "2024-01-08T00:00:00Z", type: "in", quantity: 100, reason: "Restocking" },
      { date: "2024-01-15T00:00:00Z", type: "out", quantity: 25, reason: "Sales" }
    ]
  },
  {
    id: "3",
    productId: "powder",
    productName: "Healthy Sugar Powder",
    sku: "HSC-POWDER-001",
    barcode: "1234567890125",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    reorderLevel: 80,
    maxStock: 600,
    unitCost: 120,
    sellingPrice: 249,
    totalValue: 0,
    lastRestocked: "2023-12-28T00:00:00Z",
    nextReorderDate: "2024-01-20T00:00:00Z",
    supplier: "Stevia Extracts Ltd.",
    supplierContact: "+91 98765 43210",
    location: "A3-B2-C1",
    warehouse: "Warehouse A - Section 3",
    status: "out_of_stock",
    expiryDate: "2024-12-28T00:00:00Z",
    batchNumber: "HSC-POW-2023-012",
    weight: 0.1,
    dimensions: { length: 8, width: 5, height: 10 },
    tags: ["powder", "out-of-stock", "urgent-reorder"],
    notes: "URGENT: Out of stock for 3 weeks, expedite reorder",
    image: "/images/products/powder.svg",
    stockMovements: [
      { date: "2023-12-28T00:00:00Z", type: "in", quantity: 200, reason: "Last restock" },
      { date: "2024-01-05T00:00:00Z", type: "out", quantity: 200, reason: "High demand sales" }
    ]
  },
  {
    id: "4",
    productId: "sachets",
    productName: "Healthy Sugar Sachets",
    sku: "HSC-SACHETS-001",
    barcode: "1234567890126",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 1200,
    reservedStock: 50,
    availableStock: 1150,
    reorderLevel: 200,
    maxStock: 800,
    unitCost: 95,
    sellingPrice: 199,
    totalValue: 114000,
    lastRestocked: "2024-01-12T00:00:00Z",
    nextReorderDate: "2024-03-15T00:00:00Z",
    supplier: "Pack Solutions Inc.",
    supplierContact: "+91 76543 21098",
    location: "B1-A2-C3",
    warehouse: "Warehouse B - Section 1",
    status: "overstocked",
    expiryDate: "2025-06-12T00:00:00Z",
    batchNumber: "HSC-SAC-2024-001",
    weight: 0.06,
    dimensions: { length: 12, width: 8, height: 4 },
    tags: ["sachets", "convenient", "overstocked"],
    notes: "Overstocked - consider promotional campaigns",
    image: "/images/products/sachets.svg",
    stockMovements: [
      { date: "2024-01-12T00:00:00Z", type: "in", quantity: 1000, reason: "Bulk order delivery" },
      { date: "2024-01-14T00:00:00Z", type: "adjustment", quantity: 200, reason: "Inventory correction" }
    ]
  },
  {
    id: "5",
    productId: "stevia-drops",
    productName: "Stevia Liquid Drops",
    sku: "HSC-DROPS-001",
    barcode: "1234567890127",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 320,
    reservedStock: 15,
    availableStock: 305,
    reorderLevel: 75,
    maxStock: 400,
    unitCost: 180,
    sellingPrice: 399,
    totalValue: 57600,
    lastRestocked: "2024-01-14T00:00:00Z",
    nextReorderDate: "2024-02-28T00:00:00Z",
    supplier: "Natural Extracts Co.",
    supplierContact: "+91 65432 10987",
    location: "B2-C1-A3",
    warehouse: "Warehouse B - Section 2",
    status: "in_stock",
    expiryDate: "2025-01-14T00:00:00Z",
    batchNumber: "HSC-DRP-2024-001",
    weight: 0.05,
    dimensions: { length: 4, width: 4, height: 8 },
    tags: ["liquid", "concentrated", "premium"],
    notes: "New product line, monitor sales performance",
    image: "/images/products/drops.svg",
    stockMovements: [
      { date: "2024-01-14T00:00:00Z", type: "in", quantity: 350, reason: "Initial stock" },
      { date: "2024-01-16T00:00:00Z", type: "out", quantity: 30, reason: "First sales batch" }
    ]
  },
  {
    id: "6",
    productId: "bulk-powder",
    productName: "Bulk Stevia Powder (5kg)",
    sku: "HSC-BULK-001",
    barcode: "1234567890128",
    category: "Sweeteners",
    brand: "Healthy Sugar Co.",
    currentStock: 45,
    reservedStock: 5,
    availableStock: 40,
    reorderLevel: 20,
    maxStock: 100,
    unitCost: 2500,
    sellingPrice: 4999,
    totalValue: 112500,
    lastRestocked: "2024-01-05T00:00:00Z",
    nextReorderDate: "2024-02-10T00:00:00Z",
    supplier: "Stevia Extracts Ltd.",
    supplierContact: "+91 98765 43210",
    location: "C1-A1-B1",
    warehouse: "Warehouse C - Bulk Section",
    status: "in_stock",
    expiryDate: "2025-07-05T00:00:00Z",
    batchNumber: "HSC-BLK-2024-001",
    weight: 5.0,
    dimensions: { length: 25, width: 20, height: 15 },
    tags: ["bulk", "wholesale", "b2b"],
    notes: "B2B product for commercial customers",
    image: "/images/products/bulk-powder.svg",
    stockMovements: [
      { date: "2024-01-05T00:00:00Z", type: "in", quantity: 50, reason: "Bulk order" },
      { date: "2024-01-10T00:00:00Z", type: "out", quantity: 5, reason: "Commercial sale" }
    ]
  }
];

const getStatusColor = (status: InventoryStatus) => {
  switch (status) {
    case "in_stock":
      return "bg-green-100 text-green-800";
    case "low_stock":
      return "bg-yellow-100 text-yellow-800";
    case "out_of_stock":
      return "bg-red-100 text-red-800";
    case "overstocked":
      return "bg-blue-100 text-blue-800";
    case "discontinued":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: InventoryStatus) => {
  switch (status) {
    case "in_stock":
      return CheckCircle2;
    case "low_stock":
      return AlertCircle;
    case "out_of_stock":
      return XCircle;
    case "overstocked":
      return TrendingUpIcon;
    case "discontinued":
      return Archive;
    default:
      return Package;
  }
};

const getStockLevelColor = (percentage: number) => {
  if (percentage <= 0) return "bg-red-500";
  if (percentage <= 20) return "bg-red-400";
  if (percentage <= 50) return "bg-yellow-400";
  if (percentage <= 80) return "bg-green-400";
  return "bg-blue-500";
};

const getUrgencyLevel = (item: InventoryItem) => {
  if (item.status === "out_of_stock") return "critical";
  if (item.status === "low_stock") return "high";
  if (item.currentStock <= item.reorderLevel * 1.2) return "medium";
  return "low";
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [warehouseFilter, setWarehouseFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("productName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [inventory] = useState<InventoryItem[]>(mockInventory);

  // Filter and sort inventory
  let filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesWarehouse = warehouseFilter === "all" || item.warehouse.includes(warehouseFilter);
    return matchesSearch && matchesStatus && matchesCategory && matchesWarehouse;
  });

  // Sort inventory
  filteredInventory.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === "lastRestocked") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    totalItems: inventory.length,
    inStock: inventory.filter(i => i.status === "in_stock").length,
    lowStock: inventory.filter(i => i.status === "low_stock").length,
    outOfStock: inventory.filter(i => i.status === "out_of_stock").length,
    overstocked: inventory.filter(i => i.status === "overstocked").length,
    totalValue: inventory.reduce((sum, i) => sum + i.totalValue, 0),
    criticalItems: inventory.filter(i => getUrgencyLevel(i) === "critical").length,
    avgStockLevel: inventory.length > 0 ? 
      inventory.reduce((sum, i) => sum + ((i.currentStock / i.maxStock) * 100), 0) / inventory.length : 0,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedInventory.map(i => i.id));
    }
  };

  // Action handlers
  const handleViewItem = (itemId: string) => {
    console.log('Viewing item:', itemId);
  };

  const handleEditItem = (itemId: string) => {
    console.log('Editing item:', itemId);
  };

  const handleAdjustStock = (itemId: string, adjustment: number) => {
    console.log('Adjusting stock for item:', itemId, 'by:', adjustment);
  };

  const handleReorder = (itemId: string) => {
    console.log('Initiating reorder for item:', itemId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Inventory Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track stock levels, manage reorders, and monitor inventory value with real-time analytics
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Stock
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-2xl">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Stock</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inStock}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900">{stats.lowStock}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-2xl">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-3xl font-bold text-gray-900">{stats.outOfStock}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-2xl">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overstocked</p>
                <p className="text-3xl font-bold text-gray-900">{stats.overstocked}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <TrendingUpIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
                <p className="text-xs text-gray-500 mt-1">Avg Stock: {stats.avgStockLevel.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {stats.criticalItems > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-2 bg-red-100 rounded-xl">
                <Zap className="h-6 w-6 text-red-600" />
            </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Critical Inventory Alert</h3>
              <p className="text-sm text-red-700 mb-4">
                You have <span className="font-semibold">{stats.outOfStock} items out of stock</span> and{" "}
                <span className="font-semibold">{stats.lowStock} items with low stock</span> that need immediate attention.
              </p>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors">
                  <Target className="h-4 w-4 mr-2" />
                  View Critical Items
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-xl border border-red-200 hover:bg-red-50 transition-colors">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Auto Reorder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Filters */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="overstocked">Overstocked</option>
            </select>

            {/* Category Filter */}
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Sweeteners">Sweeteners</option>
              <option value="Health Supplements">Health Supplements</option>
              <option value="Organic Products">Organic Products</option>
            </select>

            {/* Warehouse Filter */}
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
            >
              <option value="all">All Warehouses</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>

            {/* Sort Filter */}
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortField(field as SortField);
                setSortOrder(order as SortOrder);
              }}
            >
              <option value="productName-asc">Name A-Z</option>
              <option value="productName-desc">Name Z-A</option>
              <option value="currentStock-desc">Stock High-Low</option>
              <option value="currentStock-asc">Stock Low-High</option>
              <option value="totalValue-desc">Value High-Low</option>
              <option value="lastRestocked-desc">Recently Restocked</option>
            </select>

            {/* Items Per Page */}
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <Plus className="h-4 w-4 mr-1" />
                Bulk Restock
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <Edit className="h-4 w-4 mr-1" />
                Bulk Edit
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <Download className="h-4 w-4 mr-1" />
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                      checked={selectedItems.length === paginatedInventory.length && paginatedInventory.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="w-64 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('productName')}
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                    >
                      <span>Product</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU & Details
                  </th>
                  <th className="w-40 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('currentStock')}
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                    >
                      <span>Stock Levels</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('totalValue')}
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                    >
                      <span>Value</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="w-36 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Supplier
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('lastRestocked')}
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                    >
                      <span>Last Restocked</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="w-28 px-4 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedInventory.map((item) => {
                  const StatusIcon = getStatusIcon(item.status);
                  const stockPercentage = (item.currentStock / item.maxStock) * 100;
                  const urgencyLevel = getUrgencyLevel(item);
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      {/* Checkbox */}
                      <td className="w-12 px-4 py-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </td>

                      {/* Product */}
                      <td className="w-64 px-4 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                              <StatusIcon className={`h-5 w-5 ${
                                item.status === 'in_stock' ? 'text-green-500' :
                                item.status === 'low_stock' ? 'text-yellow-500' :
                                item.status === 'out_of_stock' ? 'text-red-500' :
                                item.status === 'overstocked' ? 'text-blue-500' :
                                'text-gray-500'
                              }`} />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">{item.productName}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                {item.status.replace("_", " ").toUpperCase()}
                              </span>
                              {urgencyLevel === 'critical' && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <Zap className="h-3 w-3 mr-1" />
                                  CRITICAL
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU & Details */}
                      <td className="w-32 px-4 py-6">
                        <div className="space-y-1">
                          <div className="text-sm font-mono text-gray-900">{item.sku}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                          {item.batchNumber && (
                            <div className="text-xs text-gray-500">Batch: {item.batchNumber}</div>
                          )}
                        </div>
                      </td>

                      {/* Stock Levels */}
                      <td className="w-40 px-4 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">{item.currentStock.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">units</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">Available:</span>
                              <div className="font-semibold text-green-600">{item.availableStock.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Reserved:</span>
                              <div className="font-semibold text-orange-600">{item.reservedStock.toLocaleString()}</div>
                            </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getStockLevelColor(stockPercentage)}`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      ></div>
                    </div>
                          <div className="text-xs text-gray-500">
                            {stockPercentage.toFixed(1)}% of {item.maxStock.toLocaleString()}
                    </div>
                  </div>
                      </td>

                      {/* Value */}
                      <td className="w-32 px-4 py-6">
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(item.totalValue)}</div>
                          <div className="text-xs text-gray-500">Unit: {formatCurrency(item.unitCost)}</div>
                          <div className="text-xs text-gray-500">Reorder: {item.reorderLevel.toLocaleString()}</div>
                </div>
                      </td>

                      {/* Location & Supplier */}
                      <td className="w-36 px-4 py-6">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{item.location}</div>
                          <div className="text-xs text-gray-500">{item.warehouse}</div>
                          <div className="text-xs text-gray-500">{item.supplier}</div>
                        </div>
                      </td>

                      {/* Last Restocked */}
                      <td className="w-32 px-4 py-6">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{formatDate(item.lastRestocked)}</div>
                          {item.expiryDate && (
                            <div className="text-xs text-gray-500">
                              Expires: {formatDate(item.expiryDate)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="w-28 px-4 py-6 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button 
                            onClick={() => handleViewItem(item.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditItem(item.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="Edit Item"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                              title="More Actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {openDropdown === item.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      handleAdjustStock(item.id, 1);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Plus className="h-4 w-4 mr-3 text-green-500" />
                                    Add Stock
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleAdjustStock(item.id, -1);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Minus className="h-4 w-4 mr-3 text-orange-500" />
                                    Remove Stock
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleReorder(item.id);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <RefreshCw className="h-4 w-4 mr-3 text-blue-500" />
                                    Reorder Stock
                                  </button>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() => {
                                      console.log('View stock history for:', item.id);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <BarChart3 className="h-4 w-4 mr-3 text-purple-500" />
                                    Stock History
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
            );
          })}
              </tbody>
            </table>
      </div>

          {/* Table Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInventory.length)} of {filteredInventory.length} results
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + Math.max(1, currentPage - 2);
                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-brand text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
