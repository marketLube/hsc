"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Users,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  TrendingUp,
  Trash2,
  Copy,
  MessageSquare,
  Gift,
  Ban,
  UserCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Package,
  CreditCard,
  Clock,
  AlertCircle,
  Award,
  Heart
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  joinDate: string;
  lastOrderDate?: string;
  lastLoginDate?: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lifetimeValue: number;
  status: "active" | "inactive" | "suspended";
  segment: "new" | "regular" | "vip" | "at_risk" | "champion";
  tags: string[];
  preferredProducts: string[];
  paymentMethods: string[];
  communicationPreference: "email" | "sms" | "both" | "none";
  loyaltyPoints: number;
  referrals: number;
  birthDate?: string;
  gender?: "male" | "female" | "other";
  notes?: string;
}

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    joinDate: "2023-08-15T00:00:00Z",
    lastOrderDate: "2024-01-15T10:30:00Z",
    lastLoginDate: "2024-01-16T09:15:00Z",
    totalOrders: 8,
    totalSpent: 4250,
    averageOrderValue: 531,
    lifetimeValue: 5100,
    status: "active",
    segment: "vip",
    tags: ["diabetes-friendly", "bulk-buyer"],
    preferredProducts: ["Healthy Sugar Tablets", "Healthy Sugar Powder"],
    paymentMethods: ["UPI", "Credit Card"],
    communicationPreference: "email",
    loyaltyPoints: 850,
    referrals: 3,
    birthDate: "1985-03-15",
    gender: "female",
    notes: "Prefers bulk orders, very price-sensitive"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 87654 32109",
    address: {
      street: "456 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    joinDate: "2023-11-20T00:00:00Z",
    lastOrderDate: "2024-01-15T14:45:00Z",
    lastLoginDate: "2024-01-15T18:30:00Z",
    totalOrders: 5,
    totalSpent: 2890,
    averageOrderValue: 578,
    lifetimeValue: 3200,
    status: "active",
    segment: "regular",
    tags: ["health-conscious", "syrup-lover"],
    preferredProducts: ["Healthy Sugar Syrup"],
    paymentMethods: ["UPI", "Net Banking"],
    communicationPreference: "both",
    loyaltyPoints: 290,
    referrals: 1,
    birthDate: "1978-11-22",
    gender: "male",
    notes: "Prefers syrup products, orders monthly"
  },
  {
    id: "3",
    name: "Anita Patel",
    email: "anita.patel@email.com",
    phone: "+91 76543 21098",
    address: {
      street: "789 CG Road",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001"
    },
    joinDate: "2023-12-05T00:00:00Z",
    lastOrderDate: "2024-01-14T16:20:00Z",
    lastLoginDate: "2024-01-14T20:10:00Z",
    totalOrders: 3,
    totalSpent: 1650,
    averageOrderValue: 550,
    lifetimeValue: 2100,
    status: "active",
    segment: "regular",
    tags: ["family-pack", "sachets-preferred"],
    preferredProducts: ["Healthy Sugar Sachets"],
    paymentMethods: ["Credit Card"],
    communicationPreference: "email",
    loyaltyPoints: 165,
    referrals: 0,
    birthDate: "1990-07-08",
    gender: "female",
    notes: "Family orders, prefers convenient packaging"
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 65432 10987",
    address: {
      street: "321 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    joinDate: "2024-01-10T00:00:00Z",
    lastOrderDate: "2024-01-14T12:10:00Z",
    lastLoginDate: "2024-01-16T11:45:00Z",
    totalOrders: 1,
    totalSpent: 379,
    averageOrderValue: 379,
    lifetimeValue: 800,
    status: "active",
    segment: "new",
    tags: ["first-time-buyer"],
    preferredProducts: ["Healthy Sugar Tablets"],
    paymentMethods: ["UPI"],
    communicationPreference: "sms",
    loyaltyPoints: 38,
    referrals: 0,
    birthDate: "1992-04-25",
    gender: "male",
    notes: "New customer, potential for growth"
  },
  {
    id: "5",
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    phone: "+91 54321 09876",
    address: {
      street: "654 FC Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001"
    },
    joinDate: "2023-09-30T00:00:00Z",
    lastOrderDate: "2023-12-20T09:25:00Z",
    lastLoginDate: "2023-12-25T14:20:00Z",
    totalOrders: 2,
    totalSpent: 1150,
    averageOrderValue: 575,
    lifetimeValue: 1150,
    status: "inactive",
    segment: "at_risk",
    tags: ["powder-user", "inactive"],
    preferredProducts: ["Healthy Sugar Powder"],
    paymentMethods: ["Net Banking"],
    communicationPreference: "email",
    loyaltyPoints: 115,
    referrals: 0,
    birthDate: "1987-12-03",
    gender: "female",
    notes: "Inactive for 1 month, needs re-engagement"
  },
  {
    id: "6",
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 43210 98765",
    address: {
      street: "987 Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001"
    },
    joinDate: "2023-07-12T00:00:00Z",
    lastOrderDate: "2024-01-12T15:30:00Z",
    lastLoginDate: "2024-01-16T08:20:00Z",
    totalOrders: 12,
    totalSpent: 6780,
    averageOrderValue: 565,
    lifetimeValue: 8500,
    status: "active",
    segment: "champion",
    tags: ["loyal-customer", "all-products", "bulk-buyer"],
    preferredProducts: ["Healthy Sugar Tablets", "Healthy Sugar Syrup", "Healthy Sugar Powder"],
    paymentMethods: ["UPI", "Credit Card", "Net Banking"],
    communicationPreference: "both",
    loyaltyPoints: 1356,
    referrals: 5,
    birthDate: "1980-09-18",
    gender: "male",
    notes: "Top customer, excellent referral source"
  },
  {
    id: "7",
    name: "Kavitha Nair",
    email: "kavitha.nair@email.com",
    phone: "+91 32109 87654",
    address: {
      street: "234 Marine Drive",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001"
    },
    joinDate: "2023-10-15T00:00:00Z",
    lastOrderDate: "2024-01-13T11:15:00Z",
    lastLoginDate: "2024-01-15T16:30:00Z",
    totalOrders: 6,
    totalSpent: 3420,
    averageOrderValue: 570,
    lifetimeValue: 4200,
    status: "active",
    segment: "vip",
    tags: ["health-enthusiast", "organic-lover"],
    preferredProducts: ["Healthy Sugar Sachets", "Healthy Sugar Powder"],
    paymentMethods: ["UPI", "Credit Card"],
    communicationPreference: "email",
    loyaltyPoints: 684,
    referrals: 2,
    birthDate: "1983-06-12",
    gender: "female",
    notes: "Health-conscious, prefers organic products"
  },
  {
    id: "8",
    name: "Suresh Gupta",
    email: "suresh.gupta@email.com",
    phone: "+91 21098 76543",
    address: {
      street: "567 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001"
    },
    joinDate: "2023-06-28T00:00:00Z",
    lastOrderDate: "2024-01-11T13:45:00Z",
    lastLoginDate: "2024-01-16T10:15:00Z",
    totalOrders: 9,
    totalSpent: 5140,
    averageOrderValue: 571,
    lifetimeValue: 6200,
    status: "active",
    segment: "vip",
    tags: ["consistent-buyer", "tablets-preferred"],
    preferredProducts: ["Healthy Sugar Tablets"],
    paymentMethods: ["Net Banking", "Credit Card"],
    communicationPreference: "both",
    loyaltyPoints: 1028,
    referrals: 3,
    birthDate: "1975-02-20",
    gender: "male",
    notes: "Consistent monthly orders, very reliable"
  },
  {
    id: "9",
    name: "Deepika Iyer",
    email: "deepika.iyer@email.com",
    phone: "+91 10987 65432",
    address: {
      street: "890 Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001"
    },
    joinDate: "2024-01-05T00:00:00Z",
    lastOrderDate: "2024-01-16T09:30:00Z",
    lastLoginDate: "2024-01-16T12:00:00Z",
    totalOrders: 2,
    totalSpent: 758,
    averageOrderValue: 379,
    lifetimeValue: 1500,
    status: "active",
    segment: "new",
    tags: ["recent-joiner", "syrup-user"],
    preferredProducts: ["Healthy Sugar Syrup"],
    paymentMethods: ["UPI"],
    communicationPreference: "sms",
    loyaltyPoints: 76,
    referrals: 0,
    birthDate: "1995-08-30",
    gender: "female",
    notes: "Recent customer, showing good engagement"
  },
  {
    id: "10",
    name: "Rohit Agarwal",
    email: "rohit.agarwal@email.com",
    phone: "+91 09876 54321",
    address: {
      street: "123 Civil Lines",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001"
    },
    joinDate: "2023-05-18T00:00:00Z",
    lastOrderDate: "2023-11-15T14:20:00Z",
    lastLoginDate: "2023-12-01T10:30:00Z",
    totalOrders: 4,
    totalSpent: 2280,
    averageOrderValue: 570,
    lifetimeValue: 2280,
    status: "suspended",
    segment: "at_risk",
    tags: ["payment-issues", "suspended"],
    preferredProducts: ["Healthy Sugar Tablets", "Healthy Sugar Powder"],
    paymentMethods: ["Credit Card"],
    communicationPreference: "none",
    loyaltyPoints: 228,
    referrals: 0,
    birthDate: "1988-01-14",
    gender: "male",
    notes: "Account suspended due to payment disputes"
  }
];

const getSegmentColor = (segment: string) => {
  switch (segment) {
    case "new":
      return "bg-blue-100 text-blue-800";
    case "regular":
      return "bg-green-100 text-green-800";
    case "vip":
      return "bg-purple-100 text-purple-800";
    case "champion":
      return "bg-yellow-100 text-yellow-800";
    case "at_risk":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [customers] = useState<Customer[]>(mockCustomers);

  const filteredAndSortedCustomers = customers
    .filter((customer) => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.address.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesSegment && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField as keyof Customer];
      let bValue: any = b[sortField as keyof Customer];
      
      if (sortField === "totalSpent" || sortField === "totalOrders" || sortField === "lifetimeValue") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === "joinDate" || sortField === "lastOrderDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage);
  const currentCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    new: customers.filter(c => c.segment === "new").length,
    vip: customers.filter(c => c.segment === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Action handlers
  const handleViewCustomer = (customerId: string) => {
    console.log('Viewing customer:', customerId);
  };

  const handleEditCustomer = (customerId: string) => {
    console.log('Editing customer:', customerId);
  };

  const handleEmailCustomer = (customerId: string) => {
    console.log('Emailing customer:', customerId);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      console.log('Deleting customer:', customerId);
    }
  };

  const handleSuspendCustomer = (customerId: string) => {
    console.log('Suspending customer:', customerId);
  };

  const handleSendGift = (customerId: string) => {
    console.log('Sending gift to customer:', customerId);
  };

  const handleViewOrders = (customerId: string) => {
    console.log('Viewing orders for customer:', customerId);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(currentCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
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
            Customers
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer relationships and track engagement
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
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
            </div>
            <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.active}</dd>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">New This Month</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.new}</dd>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">VIP + Champions</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.vip + customers.filter(c => c.segment === "champion").length}</dd>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</dd>
            </div>
            <div className="p-3 bg-gradient-to-br from-brand/10 to-brand/20 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-brand" />
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
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <select
                className="min-w-0 w-40 pl-3 pr-8 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                className="min-w-0 w-44 pl-3 pr-8 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
              >
                <option value="all">All Segments</option>
                <option value="new">New</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
                <option value="champion">Champion</option>
                <option value="at_risk">At Risk</option>
              </select>

              <select
                className="min-w-0 w-40 pl-3 pr-8 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortField(field);
                  setSortOrder(order as "asc" | "desc");
                }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="totalSpent-desc">Highest Spender</option>
                <option value="totalSpent-asc">Lowest Spender</option>
                <option value="totalOrders-desc">Most Orders</option>
                <option value="joinDate-desc">Newest</option>
                <option value="joinDate-asc">Oldest</option>
                <option value="lastOrderDate-desc">Recent Activity</option>
              </select>

              <select
                className="min-w-0 w-32 pl-3 pr-8 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent rounded-xl transition-all duration-200 focus:shadow-md bg-white"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions Row */}
          {selectedCustomers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">{selectedCustomers.length} selected</span>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
                <Mail className="h-3 w-3 mr-1" />
                Email Selected
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
                <Download className="h-3 w-3 mr-1" />
                Export Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                    checked={selectedCustomers.length === currentCustomers.length && currentCustomers.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th scope="col" className="w-64 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Customer</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="w-56 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Location
                </th>
                <th scope="col" className="w-40 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("totalSpent")}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Purchase History</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th scope="col" className="w-32 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Segment
                </th>
                <th scope="col" className="w-36 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("joinDate")}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Dates</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="w-28 px-4 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  {/* Checkbox Column */}
                  <td className="w-12 px-4 py-6">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                    />
                  </td>
                  
                  {/* Customer Column */}
                  <td className="w-64 px-4 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-sm">
                          <span className="text-white font-medium text-sm">
                            {getInitials(customer.name)}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-gray-900 truncate">{customer.name}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: {customer.id}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {customer.tags.slice(0, 1).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {customer.tags.length > 1 && (
                            <span className="text-xs text-gray-400">+{customer.tags.length - 1}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Contact & Location Column */}
                  <td className="w-56 px-4 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{customer.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{customer.address.city}, {customer.address.state}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Purchase History Column */}
                  <td className="w-40 px-4 py-6">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</div>
                      <div className="text-xs text-gray-600">{customer.totalOrders} orders</div>
                      <div className="text-xs text-gray-500">Avg: {formatCurrency(customer.averageOrderValue)}</div>
                      <div className="text-xs text-gray-400">LTV: {formatCurrency(customer.lifetimeValue)}</div>
                    </div>
                  </td>
                  
                  {/* Engagement Column */}
                  <td className="w-32 px-4 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1.5 text-yellow-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-900">{customer.loyaltyPoints} pts</span>
                      </div>
                      <div className="text-xs text-gray-600">{customer.referrals} referrals</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {customer.communicationPreference}
                      </div>
                    </div>
                  </td>
                  
                  {/* Status & Segment Column */}
                  <td className="w-32 px-4 py-6">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                        {customer.segment}
                      </span>
                    </div>
                  </td>
                  
                  {/* Dates Column */}
                  <td className="w-36 px-4 py-6">
                    <div className="space-y-1.5">
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Joined</div>
                        <div className="text-sm text-gray-900">{formatDate(customer.joinDate)}</div>
                      </div>
                      {customer.lastOrderDate && (
                        <div>
                          <div className="text-xs text-gray-500 font-medium">Last Order</div>
                          <div className="text-xs text-gray-600">{formatDate(customer.lastOrderDate)}</div>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Actions Column */}
                  <td className="w-28 px-4 py-6 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={() => handleViewCustomer(customer.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="View Customer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === customer.id ? null : customer.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                          title="More Actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === customer.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEditCustomer(customer.id);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="h-4 w-4 mr-3 text-gray-400" />
                                Edit Customer
                              </button>
                              <button
                                onClick={() => {
                                  handleEmailCustomer(customer.id);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                                Email Customer
                              </button>
                              <button
                                onClick={() => {
                                  handleViewOrders(customer.id);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <Package className="h-4 w-4 mr-3 text-gray-400" />
                                View Orders
                              </button>
                              <div className="border-t border-gray-100 my-1"></div>
                              <button
                                onClick={() => {
                                  handleSendGift(customer.id);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <Gift className="h-4 w-4 mr-3 text-green-500" />
                                Send Gift/Coupon
                              </button>
                              <button
                                onClick={() => {
                                  console.log('View analytics for customer:', customer.id);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <TrendingUp className="h-4 w-4 mr-3 text-blue-500" />
                                View Analytics
                              </button>
                              {customer.status !== "suspended" ? (
                                <>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() => {
                                      handleSuspendCustomer(customer.id);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Ban className="h-4 w-4 mr-3" />
                                    Suspend Account
                                  </button>
                                </>
                              ) : (
                                <>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() => {
                                      console.log('Reactivate customer:', customer.id);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                                  >
                                    <UserCheck className="h-4 w-4 mr-3" />
                                    Reactivate Account
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-2xl"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers.length)}</span> of{" "}
              <span className="font-medium">{filteredAndSortedCustomers.length}</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm transform hover:scale-[1.02]"
            >
              <ChevronLeft className="h-5 w-5 mr-2" /> Previous
            </button>
            <div className="hidden md:flex items-center space-x-1 mx-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium ${
                    currentPage === page
                      ? "bg-brand text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                  } transition-all duration-200`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm transform hover:scale-[1.02]"
            >
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
