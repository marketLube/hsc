"use client";

import { useState } from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Link as LinkIcon,
  Tag,
  Gift,
  BarChart3,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Check,
  X,
  Search,
  Filter,
  Mail,
  Phone,
  Globe,
  Calendar,
  Clock,
  Target,
  Award,
  Activity,
  Zap,
  Shield,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Settings,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Percent,
  CreditCard,
  Send,
  Share2,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Package,
  ShoppingBag,
  MousePointerClick,
  UserPlus,
  Layers
} from "lucide-react";

type TabType = "dashboard" | "affiliates" | "links" | "commissions" | "payouts" | "analytics" | "resources";
type AffiliateStatus = "active" | "pending" | "suspended" | "inactive";
type CommissionType = "percentage" | "fixed" | "tiered";
type PayoutStatus = "pending" | "processing" | "completed" | "failed";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: AffiliateStatus;
  joinedDate: string;
  totalSales: number;
  commissionEarned: number;
  conversionRate: number;
  clicks: number;
  sales: number;
  tier: string;
  payoutMethod: string;
  nextPayoutDate: string;
}

interface AffiliateLink {
  id: string;
  affiliateId: string;
  affiliateName: string;
  linkType: "product" | "category" | "homepage" | "custom";
  url: string;
  shortCode: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdDate: string;
  isActive: boolean;
}

interface CouponCode {
  id: string;
  affiliateId: string;
  affiliateName: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  isActive: boolean;
}

interface Commission {
  id: string;
  affiliateId: string;
  affiliateName: string;
  orderId: string;
  orderValue: number;
  commissionAmount: number;
  commissionRate: number;
  date: string;
  status: "pending" | "approved" | "paid";
}

interface Payout {
  id: string;
  affiliateId: string;
  affiliateName: string;
  amount: number;
  method: string;
  status: PayoutStatus;
  requestedDate: string;
  processedDate?: string;
  transactionId?: string;
}

// Mock Data
const mockAffiliates: Affiliate[] = [
  {
    id: "aff-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91 98765 11111",
    status: "active",
    joinedDate: "2024-01-15",
    totalSales: 145,
    commissionEarned: 87500,
    conversionRate: 3.8,
    clicks: 3820,
    sales: 145,
    tier: "Gold",
    payoutMethod: "Bank Transfer",
    nextPayoutDate: "2024-02-01"
  },
  {
    id: "aff-2",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+91 98765 22222",
    status: "active",
    joinedDate: "2024-02-01",
    totalSales: 89,
    commissionEarned: 53400,
    conversionRate: 4.2,
    clicks: 2120,
    sales: 89,
    tier: "Silver",
    payoutMethod: "UPI",
    nextPayoutDate: "2024-02-01"
  },
  {
    id: "aff-3",
    name: "Emma Williams",
    email: "emma@example.com",
    phone: "+91 98765 33333",
    status: "active",
    joinedDate: "2023-11-10",
    totalSales: 234,
    commissionEarned: 140400,
    conversionRate: 5.1,
    clicks: 4588,
    sales: 234,
    tier: "Platinum",
    payoutMethod: "Bank Transfer",
    nextPayoutDate: "2024-02-01"
  },
  {
    id: "aff-4",
    name: "David Kumar",
    email: "david@example.com",
    phone: "+91 98765 44444",
    status: "pending",
    joinedDate: "2024-01-28",
    totalSales: 0,
    commissionEarned: 0,
    conversionRate: 0,
    clicks: 45,
    sales: 0,
    tier: "Bronze",
    payoutMethod: "Not Set",
    nextPayoutDate: "N/A"
  },
  {
    id: "aff-5",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+91 98765 55555",
    status: "active",
    joinedDate: "2023-12-05",
    totalSales: 178,
    commissionEarned: 106800,
    conversionRate: 4.5,
    clicks: 3956,
    sales: 178,
    tier: "Gold",
    payoutMethod: "PayPal",
    nextPayoutDate: "2024-02-01"
  }
];

const mockLinks: AffiliateLink[] = [
  { id: "link-1", affiliateId: "aff-1", affiliateName: "Sarah Johnson", linkType: "product", url: "https://healthysugarhome.com/product/stevia?ref=sarah123", shortCode: "sarah123", clicks: 3820, conversions: 145, revenue: 218000, createdDate: "2024-01-15", isActive: true },
  { id: "link-2", affiliateId: "aff-2", affiliateName: "Michael Chen", linkType: "homepage", url: "https://healthysugarhome.com?ref=michael456", shortCode: "michael456", clicks: 2120, conversions: 89, revenue: 133500, createdDate: "2024-02-01", isActive: true },
  { id: "link-3", affiliateId: "aff-3", affiliateName: "Emma Williams", linkType: "category", url: "https://healthysugarhome.com/category/sweeteners?ref=emma789", shortCode: "emma789", clicks: 4588, conversions: 234, revenue: 351000, createdDate: "2023-11-10", isActive: true },
  { id: "link-4", affiliateId: "aff-5", affiliateName: "Lisa Anderson", linkType: "product", url: "https://healthysugarhome.com/product/monk-fruit?ref=lisa321", shortCode: "lisa321", clicks: 3956, conversions: 178, revenue: 267000, createdDate: "2023-12-05", isActive: true }
];

const mockCoupons: CouponCode[] = [
  { id: "coup-1", affiliateId: "aff-1", affiliateName: "Sarah Johnson", code: "SARAH10", discount: 10, discountType: "percentage", usageCount: 125, usageLimit: 500, expiryDate: "2024-06-30", isActive: true },
  { id: "coup-2", affiliateId: "aff-2", affiliateName: "Michael Chen", code: "MICHAEL15", discount: 15, discountType: "percentage", usageCount: 78, usageLimit: 300, expiryDate: "2024-05-31", isActive: true },
  { id: "coup-3", affiliateId: "aff-3", affiliateName: "Emma Williams", code: "EMMA20", discount: 20, discountType: "percentage", usageCount: 201, usageLimit: 1000, expiryDate: "2024-12-31", isActive: true },
  { id: "coup-4", affiliateId: "aff-5", affiliateName: "Lisa Anderson", code: "LISA100", discount: 100, discountType: "fixed", usageCount: 156, usageLimit: 500, expiryDate: "2024-08-31", isActive: true }
];

const mockCommissions: Commission[] = [
  { id: "comm-1", affiliateId: "aff-1", affiliateName: "Sarah Johnson", orderId: "ORD-2024-1234", orderValue: 1500, commissionAmount: 225, commissionRate: 15, date: "2024-01-30", status: "approved" },
  { id: "comm-2", affiliateId: "aff-3", affiliateName: "Emma Williams", orderId: "ORD-2024-1235", orderValue: 2400, commissionAmount: 480, commissionRate: 20, date: "2024-01-30", status: "approved" },
  { id: "comm-3", affiliateId: "aff-2", affiliateName: "Michael Chen", orderId: "ORD-2024-1236", orderValue: 1200, commissionAmount: 180, commissionRate: 15, date: "2024-01-29", status: "approved" },
  { id: "comm-4", affiliateId: "aff-5", affiliateName: "Lisa Anderson", orderId: "ORD-2024-1237", orderValue: 1800, commissionAmount: 270, commissionRate: 15, date: "2024-01-29", status: "paid" },
  { id: "comm-5", affiliateId: "aff-1", affiliateName: "Sarah Johnson", orderId: "ORD-2024-1238", orderValue: 980, commissionAmount: 147, commissionRate: 15, date: "2024-01-28", status: "pending" }
];

const mockPayouts: Payout[] = [
  { id: "pay-1", affiliateId: "aff-3", affiliateName: "Emma Williams", amount: 140400, method: "Bank Transfer", status: "completed", requestedDate: "2024-01-25", processedDate: "2024-01-27", transactionId: "TXN-2024-5621" },
  { id: "pay-2", affiliateId: "aff-1", affiliateName: "Sarah Johnson", amount: 87500, method: "Bank Transfer", status: "processing", requestedDate: "2024-01-28", transactionId: "TXN-2024-5622" },
  { id: "pay-3", affiliateId: "aff-5", affiliateName: "Lisa Anderson", amount: 106800, method: "PayPal", status: "pending", requestedDate: "2024-01-30" },
  { id: "pay-4", affiliateId: "aff-2", affiliateName: "Michael Chen", amount: 53400, method: "UPI", status: "pending", requestedDate: "2024-01-30" }
];

export default function AffiliatesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [affiliates] = useState<Affiliate[]>(mockAffiliates);
  const [links] = useState<AffiliateLink[]>(mockLinks);
  const [coupons] = useState<CouponCode[]>(mockCoupons);
  const [commissions] = useState<Commission[]>(mockCommissions);
  const [payouts] = useState<Payout[]>(mockPayouts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Force re-render on mount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate stats
  const stats = {
    totalAffiliates: affiliates.length,
    activeAffiliates: affiliates.filter(a => a.status === "active").length,
    totalSales: affiliates.reduce((sum, a) => sum + a.totalSales, 0),
    totalRevenue: affiliates.reduce((sum, a) => sum + (a.totalSales * 1500), 0), // Assuming avg order value
    totalCommissions: affiliates.reduce((sum, a) => sum + a.commissionEarned, 0),
    pendingPayouts: payouts.filter(p => p.status === "pending" || p.status === "processing").reduce((sum, p) => sum + p.amount, 0),
    avgConversionRate: (affiliates.reduce((sum, a) => sum + a.conversionRate, 0) / affiliates.length).toFixed(2),
    totalClicks: affiliates.reduce((sum, a) => sum + a.clicks, 0)
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert(`Link copied: ${link}`);
  };

  const handleGenerateLink = () => {
    alert("Generate new affiliate link - Opens modal");
  };

  const handleApproveCommission = (id: string) => {
    alert(`Approving commission: ${id}`);
  };

  const handleProcessPayout = (id: string) => {
    alert(`Processing payout: ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Affiliate Marketing
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage affiliate partners, track performance, and process commissions
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Affiliate
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
          {[
            { id: "dashboard", name: "Dashboard", icon: BarChart3 },
            { id: "affiliates", name: "Affiliates", icon: Users },
            { id: "links", name: "Links & Codes", icon: LinkIcon },
            { id: "commissions", name: "Commissions", icon: DollarSign },
            { id: "payouts", name: "Payouts", icon: CreditCard },
            { id: "analytics", name: "Analytics", icon: TrendingUp },
            { id: "resources", name: "Resources", icon: Gift }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Affiliates</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAffiliates}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {stats.activeAffiliates} active
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Sales</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalSales}</p>
                    <p className="text-xs text-gray-500 mt-1">Orders via affiliates</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Commissions Paid</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalCommissions)}</p>
                    <p className="text-xs text-gray-500 mt-1">This month</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-2xl">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pendingPayouts)}</p>
                    <p className="text-xs text-orange-600 mt-1">{payouts.filter(p => p.status === "pending").length} requests</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-2xl">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Avg Conversion Rate</h3>
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.avgConversionRate}%</p>
              <p className="text-xs text-gray-500 mt-2">Across all affiliates</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Total Clicks</h3>
                <MousePointerClick className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.totalClicks.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">Via affiliate links</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Revenue Generated</h3>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-xs text-gray-500 mt-2">Total affiliate revenue</p>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Top Performing Affiliates
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {affiliates
                  .filter(a => a.status === "active")
                  .sort((a, b) => b.commissionEarned - a.commissionEarned)
                  .slice(0, 5)
                  .map((affiliate, index) => (
                    <div key={affiliate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-blue-500"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{affiliate.name}</div>
                          <div className="text-xs text-gray-500">{affiliate.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(affiliate.commissionEarned)}</div>
                        <div className="text-xs text-gray-500">{affiliate.totalSales} sales</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Affiliates Tab */}
      {activeTab === "affiliates" && (
        <div className="space-y-6">
          {/* Search & Filters */}
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
                      placeholder="Search affiliates by name or email..."
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
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Affiliates Table */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission Earned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {affiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{affiliate.name}</div>
                          <div className="text-xs text-gray-500">{affiliate.email}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{affiliate.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          affiliate.status === "active" ? "bg-green-100 text-green-800" :
                          affiliate.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          affiliate.status === "suspended" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          affiliate.tier === "Platinum" ? "bg-purple-100 text-purple-800" :
                          affiliate.tier === "Gold" ? "bg-yellow-100 text-yellow-800" :
                          affiliate.tier === "Silver" ? "bg-gray-200 text-gray-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          <Star className="h-3 w-3 mr-1" />
                          {affiliate.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{affiliate.totalSales}</div>
                        <div className="text-xs text-gray-500">{affiliate.clicks.toLocaleString()} clicks</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(affiliate.commissionEarned)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-blue-600">{affiliate.conversionRate}%</span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min(affiliate.conversionRate * 10, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Links & Codes Tab */}
      {activeTab === "links" && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <LinkIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Links</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Generate tracking links for affiliates to promote products
                  </p>
                  <button
                    onClick={handleGenerateLink}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline mr-1" />
                    Generate Link
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Tag className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coupon Codes</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Create custom discount codes for affiliate promotions
                  </p>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
                    <Plus className="h-4 w-4 inline mr-1" />
                    Create Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliate Links Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Affiliate Links</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate & Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 mb-1">{link.affiliateName}</div>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">
                            {link.shortCode}
                          </code>
                          <button
                            onClick={() => handleCopyLink(link.url)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {link.linkType.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="text-xs text-gray-500">Clicks</div>
                              <div className="font-semibold">{link.clicks.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Conv.</div>
                              <div className="font-semibold text-green-600">{link.conversions}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Rate</div>
                              <div className="font-semibold text-blue-600">
                                {((link.conversions / link.clicks) * 100).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(link.revenue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coupon Codes Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Coupon Codes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate & Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 mb-1">{coupon.affiliateName}</div>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm bg-green-100 px-3 py-1 rounded font-mono font-bold text-green-800">
                            {coupon.code}
                          </code>
                          <button
                            onClick={() => handleCopyLink(coupon.code)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-green-600">
                          {coupon.discountType === "percentage" ? `${coupon.discount}%` : formatCurrency(coupon.discount)} OFF
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {coupon.usageCount} / {coupon.usageLimit}
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(coupon.expiryDate)}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(coupon.expiryDate) > new Date() ? "Active" : "Expired"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Commissions Tab */}
      {activeTab === "commissions" && (
        <div className="space-y-6">
          {/* Commission Rules Banner */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Bronze Tier</div>
                    <div className="text-2xl font-bold text-orange-600">10%</div>
                    <div className="text-xs text-gray-500 mt-1">0-50 sales</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Silver Tier</div>
                    <div className="text-2xl font-bold text-gray-600">12%</div>
                    <div className="text-xs text-gray-500 mt-1">51-100 sales</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Gold Tier</div>
                    <div className="text-2xl font-bold text-yellow-600">15%</div>
                    <div className="text-xs text-gray-500 mt-1">101-200 sales</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Platinum Tier</div>
                    <div className="text-2xl font-bold text-purple-600">20%</div>
                    <div className="text-xs text-gray-500 mt-1">200+ sales</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commissions Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Commission History</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                    Filter
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {commissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{commission.affiliateName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                          {commission.orderId}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(commission.orderValue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-purple-600">{commission.commissionRate}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(commission.commissionAmount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(commission.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          commission.status === "paid" ? "bg-green-100 text-green-800" :
                          commission.status === "approved" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {commission.status === "pending" && (
                          <button
                            onClick={() => handleApproveCommission(commission.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === "payouts" && (
        <div className="space-y-6">
          {/* Payout Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Pending Payouts</h3>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                {formatCurrency(payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-2">{payouts.filter(p => p.status === "pending").length} requests</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Processing</h3>
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(payouts.filter(p => p.status === "processing").reduce((sum, p) => sum + p.amount, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-2">{payouts.filter(p => p.status === "processing").length} in progress</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Completed</h3>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(payouts.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
          </div>

          {/* Payouts Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payout History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{payout.affiliateName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(payout.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{payout.method}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(payout.requestedDate)}</div>
                        {payout.processedDate && (
                          <div className="text-xs text-gray-500">Processed: {formatDate(payout.processedDate)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          payout.status === "completed" ? "bg-green-100 text-green-800" :
                          payout.status === "processing" ? "bg-blue-100 text-blue-800" :
                          payout.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {payout.transactionId ? (
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                            {payout.transactionId}
                          </code>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payout.status === "pending" && (
                          <button
                            onClick={() => handleProcessPayout(payout.id)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Process
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Comprehensive analytics dashboard with detailed performance metrics, conversion funnels, traffic sources, 
              geographic distribution, time-based trends, and comparative analysis across all affiliate partners.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <div className="text-xs text-gray-500">Total Clicks</div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalClicks.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <div className="text-xs text-gray-500">Total Sales</div>
                <div className="text-2xl font-bold text-green-600">{stats.totalSales}</div>
              </div>
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <div className="text-xs text-gray-500">Avg Conv. Rate</div>
                <div className="text-2xl font-bold text-purple-600">{stats.avgConversionRate}%</div>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance by Channel</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Direct Links</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Clicks:</span>
                    <span className="text-sm font-semibold">8,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Sales:</span>
                    <span className="text-sm font-semibold text-green-600">412</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Revenue:</span>
                    <span className="text-sm font-bold">{formatCurrency(618000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Conv. Rate:</span>
                    <span className="text-sm font-bold text-blue-600">5.00%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Coupon Codes</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Clicks:</span>
                    <span className="text-sm font-semibold">5,920</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Sales:</span>
                    <span className="text-sm font-semibold text-green-600">336</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Revenue:</span>
                    <span className="text-sm font-bold">{formatCurrency(504000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Conv. Rate:</span>
                    <span className="text-sm font-bold text-green-600">5.68%</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Social Media</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Clicks:</span>
                    <span className="text-sm font-semibold">3,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Sales:</span>
                    <span className="text-sm font-semibold text-green-600">161</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Revenue:</span>
                    <span className="text-sm font-bold">{formatCurrency(241500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Conv. Rate:</span>
                    <span className="text-sm font-bold text-purple-600">4.98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Resources</h3>
                <p className="text-sm text-gray-700">
                  Provide your affiliates with banners, product images, content guidelines, and promotional materials
                </p>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-1" />
                Upload Resource
              </button>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-blue-600 text-xs font-bold rounded-full">12</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Banner Images</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-green-600 text-xs font-bold rounded-full">45</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Product Photos</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-purple-600 text-xs font-bold rounded-full">8</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Content Guidelines</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-orange-600 text-xs font-bold rounded-full">6</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Templates</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Share2 className="h-5 w-5 text-pink-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-pink-600 text-xs font-bold rounded-full">24</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Social Media Posts</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Activity className="h-5 w-5 text-teal-600" />
                  </div>
                  <span className="px-2.5 py-1 bg-white text-teal-600 text-xs font-bold rounded-full">5</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Video Content</h3>
                <p className="text-sm text-gray-600 mb-4">Download and share with your affiliates</p>
                <button className="w-full px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  View Resources
                </button>
              </div>
            </div>
          </div>

          {/* Affiliate Guidelines */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Affiliate Program Guidelines
            </h3>
            <div className="prose max-w-none text-sm text-gray-700 space-y-3">
              <p>Welcome to the Healthy Sugar Home Affiliate Program! Here are the key guidelines:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use approved marketing materials and product descriptions</li>
                <li>Disclose affiliate relationship as per FTC guidelines</li>
                <li>Do not make false or misleading claims about products</li>
                <li>Respect brand guidelines and trademark usage policies</li>
                <li>Commissions are paid monthly on the 1st of each month</li>
                <li>Minimum payout threshold is ₹5,000</li>
                <li>Cookie duration is 30 days for tracking conversions</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

