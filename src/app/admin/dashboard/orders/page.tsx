"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Package,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  User,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowUpDown,
  RefreshCw,
  Ban,
  RotateCcw,
  ExternalLink,
  Copy,
  Archive,
  Star,
  TrendingUp,
  DollarSign,
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  ActivitySquare,
  Receipt,
  AlertTriangle,
  Zap,
  ClipboardList,
  History,
  Target,
  Percent,
  CreditCard as Card,
  Building2,
  Plus,
  Bell
} from "lucide-react";

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "partial";
type SortField = "orderNumber" | "customer" | "total" | "orderDate" | "status" | "paymentStatus";
type SortOrder = "asc" | "desc";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    customerId: string;
    isVip: boolean;
    totalOrders: number;
  };
  items: {
    id: string;
    productName: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
    sku: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  orderDate: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  orderSource: "website" | "mobile_app" | "phone" | "admin";
  notes?: string;
  priority: "low" | "normal" | "high" | "urgent";
  assignedTo?: string;
  tags: string[];
  refundAmount?: number;
  refundReason?: string;
}

// Mock orders data with enhanced information
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "HSC-2024-001",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      customerId: "CUST-001",
      isVip: true,
      totalOrders: 15
    },
    items: [
      {
        id: "item-1",
        productName: "Healthy Sugar Tablets",
        variant: "200 tablets",
        quantity: 2,
        price: 549,
        image: "/images/products/tablets.svg",
        sku: "HSC-TAB-200"
      }
    ],
    subtotal: 1098,
    shipping: 50,
    tax: 110,
    discount: 0,
    total: 1258,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
    shippingAddress: {
      name: "Priya Sharma",
      street: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    orderDate: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
    estimatedDelivery: "2024-01-20T18:00:00Z",
    trackingNumber: "HSC123456789",
    orderSource: "website",
    notes: "Please deliver after 6 PM",
    priority: "normal",
    assignedTo: "Delivery Team A",
    tags: ["vip-customer", "express-delivery"],
    refundAmount: 0
  },
  {
    id: "2",
    orderNumber: "HSC-2024-002",
    customer: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 87654 32109",
      customerId: "CUST-002",
      isVip: false,
      totalOrders: 3
    },
    items: [
      {
        id: "item-2",
        productName: "Healthy Sugar Syrup",
        variant: "250 ml",
        quantity: 1,
        price: 1149,
        image: "/images/products/syrup.svg",
        sku: "HSC-SYR-250"
      },
      {
        id: "item-3",
        productName: "Healthy Sugar Powder",
        variant: "100 g",
        quantity: 1,
        price: 299,
        image: "/images/products/powder.svg",
        sku: "HSC-POW-100"
      }
    ],
    subtotal: 1448,
    shipping: 0,
    tax: 145,
    discount: 50,
    total: 1543,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    transactionId: "TXN987654321",
    shippingAddress: {
      name: "Rajesh Kumar",
      street: "456 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    orderDate: "2024-01-15T14:45:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    estimatedDelivery: "2024-01-22T18:00:00Z",
    orderSource: "mobile_app",
    priority: "high",
    assignedTo: "Processing Team B",
    tags: ["bulk-order"],
    refundAmount: 0
  },
  {
    id: "3",
    orderNumber: "HSC-2024-003",
    customer: {
      name: "Anita Patel",
      email: "anita.patel@email.com",
      phone: "+91 76543 21098",
      customerId: "CUST-003",
      isVip: true,
      totalOrders: 8
    },
    items: [
      {
        id: "item-4",
        productName: "Healthy Sugar Sachets",
        variant: "60 sticks",
        quantity: 3,
        price: 549,
        image: "/images/products/sachets.svg",
        sku: "HSC-SAC-60"
      }
    ],
    subtotal: 1647,
    shipping: 50,
    tax: 165,
    discount: 100,
    total: 1762,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "Net Banking",
    transactionId: "TXN456789123",
    shippingAddress: {
      name: "Anita Patel",
      street: "789 CG Road",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
      country: "India"
    },
    orderDate: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-17T11:30:00Z",
    estimatedDelivery: "2024-01-19T18:00:00Z",
    trackingNumber: "HSC987654321",
    orderSource: "website",
    notes: "Gift wrapping requested",
    priority: "normal",
    assignedTo: "Delivery Team C",
    tags: ["vip-customer", "gift-wrap"],
    refundAmount: 0
  },
  {
    id: "4",
    orderNumber: "HSC-2024-004",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      customerId: "CUST-004",
      isVip: false,
      totalOrders: 1
    },
    items: [
      {
        id: "item-5",
        productName: "Healthy Sugar Tablets",
        variant: "100 tablets",
        quantity: 1,
        price: 299,
        image: "/images/products/tablets.svg",
        sku: "HSC-TAB-100"
      }
    ],
    subtotal: 299,
    shipping: 50,
    tax: 30,
    discount: 0,
    total: 379,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "COD",
    shippingAddress: {
      name: "Vikram Singh",
      street: "321 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India"
    },
    orderDate: "2024-01-14T12:10:00Z",
    updatedAt: "2024-01-14T12:10:00Z",
    estimatedDelivery: "2024-01-21T18:00:00Z",
    orderSource: "phone",
    priority: "urgent",
    assignedTo: "Sales Team",
    tags: ["new-customer", "cod"],
    refundAmount: 0
  },
  {
    id: "5",
    orderNumber: "HSC-2024-005",
    customer: {
      name: "Meera Joshi",
      email: "meera.joshi@email.com",
      phone: "+91 54321 09876",
      customerId: "CUST-005",
      isVip: false,
      totalOrders: 5
    },
    items: [
      {
        id: "item-6",
        productName: "Healthy Sugar Powder",
        variant: "500 g",
        quantity: 1,
        price: 1299,
        image: "/images/products/powder.svg",
        sku: "HSC-POW-500"
      }
    ],
    subtotal: 1299,
    shipping: 0,
    tax: 130,
    discount: 0,
    total: 1429,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "UPI",
    transactionId: "TXN789123456",
    shippingAddress: {
      name: "Meera Joshi",
      street: "654 FC Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      country: "India"
    },
    orderDate: "2024-01-13T09:25:00Z",
    updatedAt: "2024-01-14T15:40:00Z",
    orderSource: "website",
    notes: "Customer requested cancellation due to delay",
    priority: "low",
    tags: ["cancelled", "refunded"],
    refundAmount: 1429,
    refundReason: "Delivery delay"
  },
  // Additional orders for pagination testing
  {
    id: "6",
    orderNumber: "HSC-2024-006",
    customer: {
      name: "Arjun Reddy",
      email: "arjun.reddy@email.com",
      phone: "+91 91234 56789",
      customerId: "CUST-006",
      isVip: true,
      totalOrders: 22
    },
    items: [
      {
        id: "item-7",
        productName: "Healthy Sugar Tablets",
        variant: "200 tablets",
        quantity: 5,
        price: 549,
        image: "/images/products/tablets.svg",
        sku: "HSC-TAB-200"
      },
      {
        id: "item-8",
        productName: "Healthy Sugar Syrup",
        variant: "250 ml",
        quantity: 2,
        price: 1149,
        image: "/images/products/syrup.svg",
        sku: "HSC-SYR-250"
      }
    ],
    subtotal: 5043,
    shipping: 0,
    tax: 504,
    discount: 250,
    total: 5297,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    transactionId: "TXN111222333",
    shippingAddress: {
      name: "Arjun Reddy",
      street: "88 Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      country: "India"
    },
    orderDate: "2024-01-16T08:15:00Z",
    updatedAt: "2024-01-16T10:30:00Z",
    estimatedDelivery: "2024-01-23T18:00:00Z",
    orderSource: "website",
    notes: "Bulk order for office",
    priority: "high",
    assignedTo: "Processing Team A",
    tags: ["vip-customer", "bulk-order", "corporate"],
    refundAmount: 0
  },
  {
    id: "7",
    orderNumber: "HSC-2024-007",
    customer: {
      name: "Kavitha Nair",
      email: "kavitha.nair@email.com",
      phone: "+91 98765 12345",
      customerId: "CUST-007",
      isVip: false,
      totalOrders: 2
    },
    items: [
      {
        id: "item-9",
        productName: "Healthy Sugar Sachets",
        variant: "60 sticks",
        quantity: 1,
        price: 549,
        image: "/images/products/sachets.svg",
        sku: "HSC-SAC-60"
      }
    ],
    subtotal: 549,
    shipping: 50,
    tax: 55,
    discount: 25,
    total: 629,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN444555666",
    shippingAddress: {
      name: "Kavitha Nair",
      street: "12 Marine Drive",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
      country: "India"
    },
    orderDate: "2024-01-16T11:45:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    estimatedDelivery: "2024-01-24T18:00:00Z",
    orderSource: "mobile_app",
    priority: "normal",
    assignedTo: "Processing Team B",
    tags: ["first-time-discount"],
    refundAmount: 0
  },
  {
    id: "8",
    orderNumber: "HSC-2024-008",
    customer: {
      name: "Sanjay Gupta",
      email: "sanjay.gupta@email.com",
      phone: "+91 87654 98765",
      customerId: "CUST-008",
      isVip: false,
      totalOrders: 7
    },
    items: [
      {
        id: "item-10",
        productName: "Healthy Sugar Powder",
        variant: "100 g",
        quantity: 3,
        price: 299,
        image: "/images/products/powder.svg",
        sku: "HSC-POW-100"
      }
    ],
    subtotal: 897,
    shipping: 50,
    tax: 90,
    discount: 45,
    total: 992,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "Net Banking",
    transactionId: "TXN777888999",
    shippingAddress: {
      name: "Sanjay Gupta",
      street: "45 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      country: "India"
    },
    orderDate: "2024-01-15T19:30:00Z",
    updatedAt: "2024-01-17T16:45:00Z",
    estimatedDelivery: "2024-01-20T18:00:00Z",
    trackingNumber: "HSC555666777",
    orderSource: "website",
    priority: "normal",
    assignedTo: "Delivery Team B",
    tags: ["repeat-customer"],
    refundAmount: 0
  }
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-purple-100 text-purple-800";
    case "shipped":
      return "bg-indigo-100 text-indigo-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "refunded":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return Clock;
    case "confirmed":
    case "processing":
      return Package;
    case "shipped":
      return Truck;
    case "delivered":
      return CheckCircle;
    case "cancelled":
    case "refunded":
      return XCircle;
    default:
      return Clock;
  }
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "refunded":
      return "bg-gray-100 text-gray-800";
    case "partial":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "normal":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getOrderSourceIcon = (source: string) => {
  switch (source) {
    case "website":
      return "🌐";
    case "mobile_app":
      return "📱";
    case "phone":
      return "📞";
    case "admin":
      return "👨‍💼";
    default:
      return "🛒";
  }
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "analytics" | "settings">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [orders] = useState<Order[]>(mockOrders);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm) ||
      order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    const matchesSource = sourceFilter === "all" || order.orderSource === sourceFilter;
    return matchesSearch && matchesStatus && matchesPayment && matchesPriority && matchesSource;
  });

  // Sort orders
  filteredOrders.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === "customer") {
      aValue = a.customer.name;
      bValue = b.customer.name;
    } else if (sortField === "orderDate") {
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
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
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

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // Here you would typically make an API call to update the order status
    setOpenDropdown(null);
  };

  const handleViewOrder = (orderId: string) => {
    console.log('Viewing order:', orderId);
    // Navigate to order detail page or open modal
  };

  const handleEditOrder = (orderId: string) => {
    console.log('Editing order:', orderId);
    // Navigate to edit order page or open modal
  };

  const handlePrintOrder = (orderId: string) => {
    console.log('Printing order:', orderId);
    // Open print dialog or generate PDF
  };

  const handleRefundOrder = (orderId: string) => {
    console.log('Processing refund for order:', orderId);
    // Open refund modal or process refund
  };

  const handleDownloadEWaybill = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      console.log(`Downloading e-Waybill for order: ${order.orderNumber}`);
      alert(`Downloading e-Waybill\nOrder: ${order.orderNumber}\nCustomer: ${order.customer.name}\nTotal: ${formatCurrency(order.total)}`);
      // In production: Generate and download PDF e-waybill
    }
    setOpenDropdown(null);
  };

  const handleDownloadCourierBill = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      console.log(`Downloading Courier Pickup Bill for order: ${order.orderNumber}`);
      alert(`Downloading Courier Pickup Bill\nOrder: ${order.orderNumber}\nTracking: ${order.trackingNumber || 'N/A'}\nShipping: ${formatCurrency(order.shipping)}`);
      // In production: Generate and download PDF courier bill
    }
    setOpenDropdown(null);
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
            Orders Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive order management with status-based workflows and analytics
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
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "overview", name: "All Orders", icon: LayoutDashboard, count: stats.total },
            { id: "pending", name: "Pending", icon: Clock, count: stats.pending },
            { id: "processing", name: "Processing", icon: Package, count: stats.processing },
            { id: "shipped", name: "Shipped", icon: Truck, count: stats.shipped },
            { id: "delivered", name: "Delivered", icon: CheckCircle, count: stats.delivered },
            { id: "cancelled", name: "Cancelled", icon: XCircle, count: orders.filter(o => ["cancelled", "refunded"].includes(o.status)).length },
            { id: "analytics", name: "Analytics", icon: BarChart3 },
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

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "pending" && renderStatusOrders("pending")}
      {activeTab === "processing" && renderStatusOrders("processing")}
      {activeTab === "shipped" && renderStatusOrders("shipped")}
      {activeTab === "delivered" && renderStatusOrders("delivered")}
      {activeTab === "cancelled" && renderCancelledOrders()}
      {activeTab === "analytics" && renderAnalytics()}
      {activeTab === "settings" && renderSettings()}
    </div>
  );

  function renderOverview() {
    return (
      <div className="space-y-6">

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-2xl">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                  <p className="text-xs text-gray-500 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-2xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Processing</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.processing}</p>
                  <p className="text-xs text-gray-500 mt-1">In progress</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Shipped</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.shipped}</p>
                  <p className="text-xs text-gray-500 mt-1">In transit</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                  <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed</p>
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
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">Avg: {formatCurrency(stats.avgOrderValue)}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Order Processing</h3>
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700 mb-4">Manage orders that need processing</p>
            <button 
              onClick={() => setActiveTab("processing")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Processing Orders
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-900">Shipping Management</h3>
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-green-700 mb-4">Track and manage shipments</p>
            <button 
              onClick={() => setActiveTab("shipped")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Shipped Orders
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-900">Analytics & Insights</h3>
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700 mb-4">View detailed order analytics</p>
            <button 
              onClick={() => setActiveTab("analytics")}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            {renderOrdersTable(filteredOrders.slice(0, 5))}
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab("overview")}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View All Orders →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStatusOrders(status: OrderStatus) {
    const statusOrders = orders.filter(order => order.status === status);
    const statusStats = {
      total: statusOrders.length,
      totalValue: statusOrders.reduce((sum, order) => sum + order.total, 0),
      avgValue: statusOrders.length > 0 ? statusOrders.reduce((sum, order) => sum + order.total, 0) / statusOrders.length : 0,
      highPriority: statusOrders.filter(o => o.priority === 'high' || o.priority === 'urgent').length
    };

    return (
      <div className="space-y-6">
        {/* Status-specific Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total {status.charAt(0).toUpperCase() + status.slice(1)}</p>
                <p className="text-3xl font-bold text-gray-900">{statusStats.total}</p>
              </div>
              <div className={`p-3 rounded-2xl ${
                status === 'pending' ? 'bg-yellow-100' :
                status === 'processing' ? 'bg-purple-100' :
                status === 'shipped' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                {status === 'pending' && <Clock className="h-6 w-6 text-yellow-600" />}
                {status === 'processing' && <Package className="h-6 w-6 text-purple-600" />}
                {status === 'shipped' && <Truck className="h-6 w-6 text-blue-600" />}
                {status === 'delivered' && <CheckCircle className="h-6 w-6 text-green-600" />}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(statusStats.totalValue)}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(statusStats.avgValue)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{statusStats.highPriority}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

          {/* Status-specific filters */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl text-sm bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                  placeholder={`Search ${status} orders...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <select
                className="min-w-0 w-36 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | "all")}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="partial">Partial</option>
              </select>

              <select
                className="min-w-0 w-32 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>

              <select
                className="min-w-0 w-36 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortField(field as SortField);
                  setSortOrder(order as SortOrder);
                }}
              >
                <option value="orderDate-desc">Newest First</option>
                <option value="orderDate-asc">Oldest First</option>
                <option value="total-desc">High-Low</option>
                <option value="total-asc">Low-High</option>
                <option value="customer-asc">A-Z</option>
                <option value="customer-desc">Z-A</option>
              </select>

              <select
                className="min-w-0 w-24 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

        {/* Orders List */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {status.charAt(0).toUpperCase() + status.slice(1)} Orders ({statusOrders.length})
            </h3>
          </div>
          <div className="p-6">
            {renderOrdersTable(statusOrders.filter(order => {
              const matchesSearch = 
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
              const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
              return matchesSearch && matchesPayment && matchesPriority;
            }))}
          </div>
        </div>
      </div>
    );
  }

  function renderCancelledOrders() {
    const cancelledOrders = orders.filter(order => ["cancelled", "refunded"].includes(order.status));
    
    return (
      <div className="space-y-6">
        {/* Cancelled Orders Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cancelled Orders</p>
                <p className="text-3xl font-bold text-red-600">{orders.filter(o => o.status === 'cancelled').length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-2xl">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Refunded Orders</p>
                <p className="text-3xl font-bold text-gray-600">{orders.filter(o => o.status === 'refunded').length}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-2xl">
                <RotateCcw className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Refund Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(orders.filter(o => o.refundAmount).reduce((sum, o) => sum + (o.refundAmount || 0), 0))}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Cancelled Orders List */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Cancelled & Refunded Orders ({cancelledOrders.length})
            </h3>
          </div>
          <div className="p-6">
            {renderOrdersTable(cancelledOrders)}
          </div>
        </div>
      </div>
    );
  }

  function renderAnalytics() {
    return (
      <div className="space-y-6">
        {/* Analytics Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Analytics & Insights</h3>
          <p className="text-gray-600">Comprehensive analysis of your order data and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">85.2%</div>
            <div className="text-sm text-green-600">+2.1% from last month</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">Avg. Processing Time</h4>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2.4 days</div>
            <div className="text-sm text-green-600">-0.3 days from last month</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">Customer Satisfaction</h4>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4.6/5</div>
            <div className="text-sm text-green-600">+0.2 from last month</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">Repeat Order Rate</h4>
              <RefreshCw className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">32%</div>
            <div className="text-sm text-green-600">+4% from last month</div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Trends</h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Order trends chart will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue analysis chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h4>
          <div className="space-y-4">
            {['Healthy Sugar Tablets', 'Healthy Sugar Syrup', 'Healthy Sugar Powder'].map((product, index) => (
              <div key={product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="text-lg font-semibold text-gray-500 mr-3">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-gray-900">{product}</div>
                    <div className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 20} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatCurrency(Math.floor(Math.random() * 50000) + 10000)}</div>
                  <div className="text-sm text-green-600">+{Math.floor(Math.random() * 20) + 5}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="space-y-6">
        {/* Settings Header */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Management Settings</h3>
          <p className="text-gray-600">Configure order processing workflows and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Processing Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              Order Processing
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Auto-confirm Orders</div>
                  <div className="text-sm text-gray-500">Automatically confirm paid orders</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Auto-assign to Team</div>
                  <div className="text-sm text-gray-500">Automatically assign orders to processing teams</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Send Status Notifications</div>
                  <div className="text-sm text-gray-500">Notify customers of status changes</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              Notifications
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">New Order Alerts</div>
                  <div className="text-sm text-gray-500">Get notified of new orders</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">High Priority Orders</div>
                  <div className="text-sm text-gray-500">Alert for urgent/high priority orders</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Payment Failures</div>
                  <div className="text-sm text-gray-500">Notify about failed payments</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Workflow Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ActivitySquare className="h-5 w-5 mr-2 text-green-500" />
              Workflow Configuration
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Processing Time (days)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-ship Threshold (₹)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="1000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Assignment</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Based on Order Value</option>
                  <option>Based on Customer Type</option>
                  <option>Based on Product Type</option>
                  <option>Manual Assignment</option>
                </select>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Integrations
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">WhatsApp Notifications</div>
                  <div className="text-sm text-gray-500">Send order updates via WhatsApp</div>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">SMS Notifications</div>
                  <div className="text-sm text-gray-500">Send SMS updates to customers</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Shipping Provider API</div>
                  <div className="text-sm text-gray-500">Auto-create shipping labels</div>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Save Settings
          </button>
        </div>
      </div>
    );
  }

  function renderOrdersTable(ordersToShow: Order[]) {
    if (ordersToShow.length === 0) {
      return (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">No orders match your current filters.</p>
        </div>
      );
    }

    return (
      <>
      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark as Confirmed
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <Package className="h-4 w-4 mr-1" />
                Mark as Processing
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                <FileText className="h-4 w-4 mr-1" />
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
        <div className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-100 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-4 text-left">
                  <input
                    type="checkbox"
                      checked={selectedOrders.length === ordersToShow.length && ordersToShow.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                </th>
                <th className="w-48 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('orderNumber')}>
                  <div className="flex items-center">
                    Order
                    {sortField === 'orderNumber' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="w-56 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('customer')}>
                  <div className="flex items-center">
                    Customer
                    {sortField === 'customer' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="w-64 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('total')}>
                  <div className="flex items-center">
                    Amount
                    {sortField === 'total' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('status')}>
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="w-40 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('orderDate')}>
                  <div className="flex items-center">
                    Date
                    {sortField === 'orderDate' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="w-28 px-4 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

                {ordersToShow.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-6">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                      />
                    </td>
                    
                    {/* Order Column - Simplified */}
                    <td className="px-4 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <StatusIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {order.orderNumber}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{getOrderSourceIcon(order.orderSource)}</span>
                            {order.customer.isVip && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                VIP
                              </span>
                            )}
                            {order.priority !== 'normal' && (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityColor(order.priority)}`}>
                                {order.priority.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Customer Column - Cleaner */}
                    <td className="px-4 py-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {order.customer.email}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {order.customer.totalOrders} orders
                        </div>
                      </div>
                    </td>
                    
                    {/* Products Column - Simplified */}
                    <td className="px-4 py-6">
                      <div className="space-y-2">
                        {order.items.slice(0, 1).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 rounded-lg object-cover"
                                src={item.image}
                                alt={item.productName}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm text-gray-900 truncate">
                                {item.quantity}x {item.productName}
                              </div>
                              <div className="text-xs text-gray-500 truncate">
                                {item.variant}
                              </div>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 1 && (
                          <div className="text-xs text-gray-500 pl-11">
                            +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Amount Column - Streamlined */}
                    <td className="px-4 py-6">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.paymentMethod}
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    
                    {/* Status Column - Clean */}
                    <td className="px-4 py-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingNumber && (
                        <div className="text-xs text-gray-500 font-mono mt-1">
                          {order.trackingNumber}
                        </div>
                      )}
                    </td>
                    
                    {/* Date Column - Minimal */}
                    <td className="px-4 py-6">
                      <div className="text-sm text-gray-900">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit"
                        })}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(order.orderDate).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </td>
                    
                    {/* Actions Column - Compact */}
                    <td className="px-4 py-6 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button 
                          onClick={() => handleViewOrder(order.id)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View Order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            title="More Actions"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          
                          {/* Quick Actions Dropdown */}
                          {openDropdown === order.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                              <div className="py-1">
                                <button
                                  onClick={() => handleEditOrder(order.id)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Edit className="h-4 w-4 mr-3 text-gray-400" />
                                  Edit Order
                                </button>
                                <button
                                  onClick={() => handlePrintOrder(order.id)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <FileText className="h-4 w-4 mr-3 text-gray-400" />
                                  Print Order
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Download Documents
                                </div>
                                <button
                                  onClick={() => handleDownloadEWaybill(order.id)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Download className="h-4 w-4 mr-3 text-blue-500" />
                                  e-Waybill
                                </button>
                                <button
                                  onClick={() => handleDownloadCourierBill(order.id)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Receipt className="h-4 w-4 mr-3 text-green-500" />
                                  Courier Pickup Bill
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Update Status
                                </div>
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-3 text-blue-500" />
                                    Confirm
                                  </button>
                                )}
                                {(order.status === 'confirmed' || order.status === 'pending') && (
                                  <button
                                    onClick={() => handleStatusUpdate(order.id, 'processing')}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Package className="h-4 w-4 mr-3 text-purple-500" />
                                    Process
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button
                                    onClick={() => handleStatusUpdate(order.id, 'shipped')}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Truck className="h-4 w-4 mr-3 text-indigo-500" />
                                    Ship
                                  </button>
                                )}
                                {order.status === 'shipped' && (
                                  <button
                                    onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
                                    Deliver
                                  </button>
                                )}
                                {!['cancelled', 'delivered', 'refunded'].includes(order.status) && (
                                  <>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                      onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      <Ban className="h-4 w-4 mr-3" />
                                      Cancel
                                    </button>
                                  </>
                                )}
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
      </div>
      </>
    );
  }

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
            Orders Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive order management with status-based workflows and analytics
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
            <Plus className="mr-2 h-4 w-4" />
            Create Order
              </button>
                  <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
                  </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "overview", name: "All Orders", icon: LayoutDashboard, count: stats.total },
            { id: "pending", name: "Pending", icon: Clock, count: stats.pending },
            { id: "processing", name: "Processing", icon: Package, count: stats.processing },
            { id: "shipped", name: "Shipped", icon: Truck, count: stats.shipped },
            { id: "delivered", name: "Delivered", icon: CheckCircle, count: stats.delivered },
            { id: "cancelled", name: "Cancelled", icon: XCircle, count: orders.filter(o => ["cancelled", "refunded"].includes(o.status)).length },
            { id: "analytics", name: "Analytics", icon: BarChart3 },
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

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "pending" && renderStatusOrders("pending")}
      {activeTab === "processing" && renderStatusOrders("processing")}
      {activeTab === "shipped" && renderStatusOrders("shipped")}
      {activeTab === "delivered" && renderStatusOrders("delivered")}
      {activeTab === "cancelled" && renderCancelledOrders()}
      {activeTab === "analytics" && renderAnalytics()}
      {activeTab === "settings" && renderSettings()}
    </div>
  );
}
