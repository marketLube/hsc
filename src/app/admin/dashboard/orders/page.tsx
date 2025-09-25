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
  DollarSign
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
            Orders
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all customer orders with advanced filtering and analytics
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
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.processing}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.shipped}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.delivered}</p>
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
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">Avg: {formatCurrency(stats.avgOrderValue)}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <select
                className="min-w-0 w-32 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>

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
                className="min-w-0 w-32 pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="mobile_app">Mobile App</option>
                <option value="phone">Phone</option>
                <option value="admin">Admin</option>
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

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
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
              <button className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors">
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
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
              {paginatedOrders.map((order) => {
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

      {/* Pagination */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex-1 flex justify-between sm:hidden">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of{" "}
              <span className="font-medium">{filteredOrders.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNum
                        ? 'z-10 bg-brand border-brand text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
