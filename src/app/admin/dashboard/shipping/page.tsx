"use client";

import { useState } from "react";
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock,
  Plus,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Printer,
  Send,
  RefreshCw,
  BarChart3,
  Settings,
  Users,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Copy,
  Navigation,
  Route,
  Shield,
  Tag,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Receipt // Courier bill icon
} from "lucide-react";

type ShipmentStatus = "pending" | "ready_to_ship" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed" | "returned";
type CourierPartner = "Delhivery" | "Blue Dart" | "FedEx" | "DHL" | "India Post" | "DTDC" | "Shadowfax" | "Ecom Express";

interface Shipment {
  id: string;
  orderNumber: string;
  awbNumber: string; // Airway Bill Number
  courierPartner: CourierPartner;
  status: ShipmentStatus;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: {
    productName: string;
    quantity: number;
    weight: number;
  }[];
  totalWeight: number; // in kg
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  charges: {
    baseCharge: number;
    fuelSurcharge: number;
    gst: number;
    total: number;
  };
  pickupDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  tracking: {
    status: string;
    location: string;
    timestamp: string;
  }[];
  documents: {
    eWaybill: boolean;
    courierBill: boolean;
    shippingLabel: boolean;
    invoice: boolean;
  };
  cod: boolean;
  codAmount?: number;
  insurance: boolean;
  insuranceAmount?: number;
  priority: "standard" | "express" | "overnight";
}

// Mock shipment data
const mockShipments: Shipment[] = [
  {
    id: "1",
    orderNumber: "HSC-2024-001",
    awbNumber: "DEL2024010001",
    courierPartner: "Delhivery",
    status: "in_transit",
    customer: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com"
    },
    shippingAddress: {
      street: "123 MG Road, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Tablets (200ct)", quantity: 2, weight: 0.4 },
      { productName: "Healthy Sugar Syrup (250ml)", quantity: 1, weight: 0.3 }
    ],
    totalWeight: 0.7,
    dimensions: {
      length: 25,
      width: 18,
      height: 12
    },
    charges: {
      baseCharge: 45,
      fuelSurcharge: 5,
      gst: 9,
      total: 59
    },
    pickupDate: "2024-01-18T10:00:00Z",
    expectedDelivery: "2024-01-20T18:00:00Z",
    tracking: [
      { status: "Picked up", location: "Mumbai Hub", timestamp: "2024-01-18T10:30:00Z" },
      { status: "In transit", location: "Mumbai Regional Center", timestamp: "2024-01-18T15:20:00Z" },
      { status: "Reached destination city", location: "Mumbai Local Hub", timestamp: "2024-01-19T08:45:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: false,
    insurance: true,
    insuranceAmount: 2500,
    priority: "express"
  },
  {
    id: "2",
    orderNumber: "HSC-2024-002",
    awbNumber: "BDT2024010078",
    courierPartner: "Blue Dart",
    status: "out_for_delivery",
    customer: {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.kumar@email.com"
    },
    shippingAddress: {
      street: "456 Brigade Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Powder (250g)", quantity: 1, weight: 0.25 }
    ],
    totalWeight: 0.25,
    dimensions: {
      length: 15,
      width: 10,
      height: 8
    },
    charges: {
      baseCharge: 35,
      fuelSurcharge: 4,
      gst: 7,
      total: 46
    },
    pickupDate: "2024-01-17T14:00:00Z",
    expectedDelivery: "2024-01-19T18:00:00Z",
    tracking: [
      { status: "Picked up", location: "Bangalore Hub", timestamp: "2024-01-17T14:30:00Z" },
      { status: "In transit", location: "Bangalore Sorting Center", timestamp: "2024-01-17T20:15:00Z" },
      { status: "Out for delivery", location: "Koramangala Branch", timestamp: "2024-01-19T09:00:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: true,
    codAmount: 819,
    insurance: false,
    priority: "standard"
  },
  {
    id: "3",
    orderNumber: "HSC-2024-003",
    awbNumber: "FDEX20240100456",
    courierPartner: "FedEx",
    status: "delivered",
    customer: {
      name: "Anita Patel",
      phone: "+91 76543 21098",
      email: "anita.patel@email.com"
    },
    shippingAddress: {
      street: "789 CG Road, Navrangpura",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Sachets (60ct)", quantity: 3, weight: 0.18 }
    ],
    totalWeight: 0.54,
    dimensions: {
      length: 20,
      width: 15,
      height: 10
    },
    charges: {
      baseCharge: 55,
      fuelSurcharge: 6,
      gst: 11,
      total: 72
    },
    pickupDate: "2024-01-16T11:00:00Z",
    expectedDelivery: "2024-01-18T18:00:00Z",
    actualDelivery: "2024-01-18T16:30:00Z",
    tracking: [
      { status: "Picked up", location: "Ahmedabad Hub", timestamp: "2024-01-16T11:30:00Z" },
      { status: "In transit", location: "Ahmedabad Gateway", timestamp: "2024-01-16T18:45:00Z" },
      { status: "Out for delivery", location: "Navrangpura Branch", timestamp: "2024-01-18T10:00:00Z" },
      { status: "Delivered", location: "Customer Address", timestamp: "2024-01-18T16:30:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: false,
    insurance: true,
    insuranceAmount: 1850,
    priority: "express"
  },
  {
    id: "4",
    orderNumber: "HSC-2024-004",
    awbNumber: "RTS2024010012",
    courierPartner: "Delhivery",
    status: "ready_to_ship",
    customer: {
      name: "Vikram Singh",
      phone: "+91 65432 10987",
      email: "vikram.singh@email.com"
    },
    shippingAddress: {
      street: "321 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Tablets (100ct)", quantity: 5, weight: 1.0 },
      { productName: "Healthy Sugar Powder (500g)", quantity: 2, weight: 1.0 }
    ],
    totalWeight: 2.0,
    dimensions: {
      length: 30,
      width: 25,
      height: 15
    },
    charges: {
      baseCharge: 80,
      fuelSurcharge: 10,
      gst: 16,
      total: 106
    },
    pickupDate: "2024-01-19T10:00:00Z",
    expectedDelivery: "2024-01-22T18:00:00Z",
    tracking: [
      { status: "Label generated", location: "Warehouse", timestamp: "2024-01-18T16:00:00Z" },
      { status: "Ready for pickup", location: "Warehouse", timestamp: "2024-01-19T08:00:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: true,
    codAmount: 4502,
    insurance: true,
    insuranceAmount: 4500,
    priority: "overnight"
  },
  {
    id: "5",
    orderNumber: "HSC-2024-005",
    awbNumber: "DHL2024001234",
    courierPartner: "DHL",
    status: "picked_up",
    customer: {
      name: "Meera Joshi",
      phone: "+91 54321 09876",
      email: "meera.joshi@email.com"
    },
    shippingAddress: {
      street: "654 FC Road, Shivaji Nagar",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Syrup (250ml)", quantity: 2, weight: 0.6 }
    ],
    totalWeight: 0.6,
    dimensions: {
      length: 20,
      width: 12,
      height: 10
    },
    charges: {
      baseCharge: 65,
      fuelSurcharge: 7,
      gst: 13,
      total: 85
    },
    pickupDate: "2024-01-19T09:00:00Z",
    expectedDelivery: "2024-01-21T18:00:00Z",
    tracking: [
      { status: "Label generated", location: "Warehouse", timestamp: "2024-01-18T18:00:00Z" },
      { status: "Picked up", location: "Pune Hub", timestamp: "2024-01-19T09:30:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: false,
    insurance: false,
    priority: "standard"
  },
  {
    id: "6",
    orderNumber: "HSC-2024-006",
    awbNumber: "SFX2024010567",
    courierPartner: "Shadowfax",
    status: "failed",
    customer: {
      name: "Sanjay Gupta",
      phone: "+91 87654 98765",
      email: "sanjay.gupta@email.com"
    },
    shippingAddress: {
      street: "45 Park Street, Park Circus",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      country: "India"
    },
    items: [
      { productName: "Healthy Sugar Powder (100g)", quantity: 3, weight: 0.3 }
    ],
    totalWeight: 0.3,
    dimensions: {
      length: 18,
      width: 12,
      height: 8
    },
    charges: {
      baseCharge: 40,
      fuelSurcharge: 5,
      gst: 8,
      total: 53
    },
    pickupDate: "2024-01-17T13:00:00Z",
    expectedDelivery: "2024-01-19T18:00:00Z",
    tracking: [
      { status: "Picked up", location: "Kolkata Hub", timestamp: "2024-01-17T13:30:00Z" },
      { status: "Out for delivery", location: "Park Street Branch", timestamp: "2024-01-19T10:00:00Z" },
      { status: "Delivery failed - Customer unavailable", location: "Customer Address", timestamp: "2024-01-19T15:30:00Z" }
    ],
    documents: {
      eWaybill: true,
      courierBill: true,
      shippingLabel: true,
      invoice: true
    },
    cod: true,
    codAmount: 992,
    insurance: false,
    priority: "standard"
  }
];

export default function ShippingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ready" | "transit" | "delivered" | "failed" | "analytics">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courierFilter, setCourierFilter] = useState<string>("all");
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);

  const shipments = mockShipments;

  // Filter shipments
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = 
      shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    const matchesCourier = courierFilter === "all" || shipment.courierPartner === courierFilter;
    return matchesSearch && matchesStatus && matchesCourier;
  });

  // Calculate stats
  const stats = {
    totalShipments: shipments.length,
    readyToShip: shipments.filter(s => s.status === "ready_to_ship").length,
    inTransit: shipments.filter(s => ["picked_up", "in_transit", "out_for_delivery"].includes(s.status)).length,
    delivered: shipments.filter(s => s.status === "delivered").length,
    failed: shipments.filter(s => s.status === "failed").length,
    totalCharges: shipments.reduce((sum, s) => sum + s.charges.total, 0),
    avgDeliveryTime: 2.3,
    onTimeDelivery: 92.5
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
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "ready_to_ship": return "bg-blue-100 text-blue-800";
      case "picked_up": return "bg-purple-100 text-purple-800";
      case "in_transit": return "bg-yellow-100 text-yellow-800";
      case "out_for_delivery": return "bg-orange-100 text-orange-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      case "returned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "overnight": return "bg-red-100 text-red-800 border-red-200";
      case "express": return "bg-orange-100 text-orange-800 border-orange-200";
      case "standard": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleDownloadEWaybill = (shipment: Shipment) => {
    // Simulate download
    console.log(`Downloading e-Waybill for ${shipment.orderNumber}`);
    alert(`Downloading e-Waybill for Order: ${shipment.orderNumber}\nAWB: ${shipment.awbNumber}`);
  };

  const handleDownloadCourierBill = (shipment: Shipment) => {
    // Simulate download
    console.log(`Downloading Courier Pickup Bill for ${shipment.orderNumber}`);
    alert(`Downloading Courier Pickup Bill\nOrder: ${shipment.orderNumber}\nCourier: ${shipment.courierPartner}\nCharges: ${formatCurrency(shipment.charges.total)}`);
  };

  const handleDownloadShippingLabel = (shipment: Shipment) => {
    console.log(`Downloading Shipping Label for ${shipment.orderNumber}`);
    alert(`Downloading Shipping Label for ${shipment.awbNumber}`);
  };

  const handleBulkDownload = (type: "ewaybill" | "courier_bill" | "labels") => {
    if (selectedShipments.length === 0) {
      alert("Please select shipments first");
      return;
    }
    console.log(`Bulk downloading ${type} for ${selectedShipments.length} shipments`);
    alert(`Downloading ${type} for ${selectedShipments.length} shipments`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Shipping Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage shipments, track deliveries, and download shipping documents
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => window.location.href = "/admin/dashboard/shipping/config"}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Settings className="mr-2 h-4 w-4" />
            Shipping Config
          </button>
          <button
            type="button"
            onClick={() => handleBulkDownload("labels")}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-4 w-4" />
            Bulk Labels
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Shipment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ready to Ship</p>
                <p className="text-3xl font-bold text-gray-900">{stats.readyToShip}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting pickup</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inTransit}</p>
                <p className="text-xs text-gray-500 mt-1">On the way</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-2xl">
                <Truck className="h-6 w-6 text-yellow-600" />
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
                <p className="text-xs text-green-600 mt-1">Successfully delivered</p>
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
                <p className="text-sm font-medium text-gray-500">On-Time Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.onTimeDelivery}%</p>
                <p className="text-xs text-green-600 mt-1">+3.2% improvement</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "all", name: "All Shipments", icon: Package, count: stats.totalShipments },
            { id: "ready", name: "Ready to Ship", icon: Clock, count: stats.readyToShip },
            { id: "transit", name: "In Transit", icon: Truck, count: stats.inTransit },
            { id: "delivered", name: "Delivered", icon: CheckCircle, count: stats.delivered },
            { id: "failed", name: "Failed", icon: AlertTriangle, count: stats.failed },
            { id: "analytics", name: "Analytics", icon: BarChart3 }
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
                  placeholder="Search by order, AWB, or customer..."
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
              <option value="ready_to_ship">Ready to Ship</option>
              <option value="picked_up">Picked Up</option>
              <option value="in_transit">In Transit</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
            <select
              className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
              value={courierFilter}
              onChange={(e) => setCourierFilter(e.target.value)}
            >
              <option value="all">All Couriers</option>
              <option value="Delhivery">Delhivery</option>
              <option value="Blue Dart">Blue Dart</option>
              <option value="FedEx">FedEx</option>
              <option value="DHL">DHL</option>
              <option value="Shadowfax">Shadowfax</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedShipments.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedShipments.length} shipment{selectedShipments.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleBulkDownload("ewaybill")}
                className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <FileText className="h-3 w-3 mr-1" />
                Bulk e-Waybills
              </button>
              <button 
                onClick={() => handleBulkDownload("courier_bill")}
                className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <Receipt className="h-3 w-3 mr-1" />
                Bulk Courier Bills
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments
          .filter(s => {
            if (activeTab === "all") return true;
            if (activeTab === "ready") return s.status === "ready_to_ship";
            if (activeTab === "transit") return ["picked_up", "in_transit", "out_for_delivery"].includes(s.status);
            if (activeTab === "delivered") return s.status === "delivered";
            if (activeTab === "failed") return s.status === "failed";
            return true;
          })
          .map((shipment) => (
            <div key={shipment.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input 
                      type="checkbox" 
                      className="mt-1 h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                      checked={selectedShipments.includes(shipment.id)}
                      onChange={() => {
                        setSelectedShipments(prev => 
                          prev.includes(shipment.id)
                            ? prev.filter(id => id !== shipment.id)
                            : [...prev, shipment.id]
                        );
                      }}
                    />
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{shipment.orderNumber}</span>
                        <span className="text-xs font-mono text-gray-500">AWB: {shipment.awbNumber}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(shipment.priority)}`}>
                          {shipment.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="font-medium">{shipment.courierPartner}</span>
                        <span>•</span>
                        <span>{shipment.customer.name}</span>
                        <span>•</span>
                        <span>{shipment.shippingAddress.city}, {shipment.shippingAddress.state}</span>
                        {shipment.cod && (
                          <>
                            <span>•</span>
                            <span className="text-orange-600 font-medium">COD: {formatCurrency(shipment.codAmount!)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-4 gap-6">
                  {/* Items */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Items</div>
                    <div className="space-y-1">
                      {shipment.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-900">
                          {item.quantity}x {item.productName}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Weight: {shipment.totalWeight}kg
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Tracking</div>
                    <div className="space-y-1">
                      {shipment.tracking.slice(-2).map((track, idx) => (
                        <div key={idx}>
                          <div className="text-xs font-medium text-gray-900">{track.status}</div>
                          <div className="text-xs text-gray-500">{track.location}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Delivery</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-gray-500">Pickup</div>
                        <div className="text-xs font-medium text-gray-900">{formatDate(shipment.pickupDate)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Expected</div>
                        <div className="text-xs font-medium text-gray-900">{formatDate(shipment.expectedDelivery)}</div>
                      </div>
                      {shipment.actualDelivery && (
                        <div>
                          <div className="text-xs text-gray-500">Actual</div>
                          <div className="text-xs font-medium text-green-600">{formatDate(shipment.actualDelivery)}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Charges */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Charges</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Base</span>
                        <span className="text-gray-900">{formatCurrency(shipment.charges.baseCharge)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Fuel</span>
                        <span className="text-gray-900">{formatCurrency(shipment.charges.fuelSurcharge)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">GST</span>
                        <span className="text-gray-900">{formatCurrency(shipment.charges.gst)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold border-t border-gray-200 pt-1 mt-1">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">{formatCurrency(shipment.charges.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Download Actions */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {shipment.insurance && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        <Shield className="h-3 w-3 mr-1" />
                        Insured: {formatCurrency(shipment.insuranceAmount!)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleDownloadEWaybill(shipment)}
                      disabled={!shipment.documents.eWaybill}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Download e-Waybill"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      e-Waybill
                    </button>
                    <button 
                      onClick={() => handleDownloadCourierBill(shipment)}
                      disabled={!shipment.documents.courierBill}
                      className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-lg text-xs font-medium text-green-700 bg-white hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Download Courier Pickup Bill"
                    >
                      <Receipt className="h-3 w-3 mr-1" />
                      Courier Bill
                    </button>
                    <button 
                      onClick={() => handleDownloadShippingLabel(shipment)}
                      disabled={!shipment.documents.shippingLabel}
                      className="inline-flex items-center px-3 py-1.5 border border-purple-300 rounded-lg text-xs font-medium text-purple-700 bg-white hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Download Shipping Label"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      Label
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Eye className="h-4 w-4" />
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

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier Performance</h3>
              <div className="space-y-3">
                {["Delhivery", "Blue Dart", "FedEx", "DHL", "Shadowfax"].map((courier) => {
                  const count = shipments.filter(s => s.courierPartner === courier).length;
                  const percentage = shipments.length > 0 ? (count / shipments.length) * 100 : 0;
                  return (
                    <div key={courier}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{courier}</span>
                        <span className="font-semibold text-gray-900">{count} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Status</h3>
              <div className="space-y-3">
                {[
                  { status: "Delivered", count: stats.delivered, color: "green" },
                  { status: "In Transit", count: stats.inTransit, color: "yellow" },
                  { status: "Ready to Ship", count: stats.readyToShip, color: "blue" },
                  { status: "Failed", count: stats.failed, color: "red" }
                ].map((item) => {
                  const percentage = shipments.length > 0 ? (item.count / shipments.length) * 100 : 0;
                  return (
                    <div key={item.status}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.status}</span>
                        <span className="font-semibold text-gray-900">{item.count} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${item.color}-500 h-2 rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
