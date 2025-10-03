"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  Calendar,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  BarChart3,
  FileText,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Zap,
  Activity,
  PieChart,
  Wallet,
  CreditCard as CardIcon,
  Lock,
  RefreshCw,
  ExternalLink,
  Bell,
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  Building,
  Info
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
  pdfUrl: string;
}

interface UsageMetric {
  name: string;
  current: number;
  limit: number;
  unit: string;
  icon: any;
  color: string;
  trend: number;
}

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking";
  last4?: string;
  brand?: string;
  upiId?: string;
  bank?: string;
  expiryDate?: string;
  isDefault: boolean;
}

// Mock Data
const currentPlan = {
  name: "Professional Plan",
  price: 2999,
  billingCycle: "monthly",
  startDate: "2024-01-01",
  renewalDate: "2024-02-01",
  features: [
    "Unlimited Products",
    "Up to 5,000 orders/month",
    "100 GB Storage",
    "Premium Support",
    "Advanced Analytics",
    "Custom Domain",
    "API Access",
    "Multi-user Access (5 users)"
  ]
};

const usageMetrics: UsageMetric[] = [
  {
    name: "Orders",
    current: 3420,
    limit: 5000,
    unit: "orders",
    icon: ShoppingCart,
    color: "blue",
    trend: 12.5
  },
  {
    name: "Storage",
    current: 67,
    limit: 100,
    unit: "GB",
    icon: Package,
    color: "green",
    trend: 5.2
  },
  {
    name: "API Calls",
    current: 245000,
    limit: 500000,
    unit: "calls",
    icon: Zap,
    color: "purple",
    trend: 18.3
  },
  {
    name: "Active Users",
    current: 4,
    limit: 5,
    unit: "users",
    icon: Users,
    color: "orange",
    trend: 0
  }
];

const invoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "HSC-INV-2024-001",
    date: "2024-01-01",
    dueDate: "2024-01-08",
    amount: 2999,
    status: "paid",
    items: [
      { description: "Professional Plan - January 2024", quantity: 1, price: 2999 }
    ],
    pdfUrl: "#"
  },
  {
    id: "inv-002",
    invoiceNumber: "HSC-INV-2024-002",
    date: "2024-02-01",
    dueDate: "2024-02-08",
    amount: 2999,
    status: "paid",
    items: [
      { description: "Professional Plan - February 2024", quantity: 1, price: 2999 }
    ],
    pdfUrl: "#"
  },
  {
    id: "inv-003",
    invoiceNumber: "HSC-INV-2024-003",
    date: "2024-03-01",
    dueDate: "2024-03-08",
    amount: 2999,
    status: "pending",
    items: [
      { description: "Professional Plan - March 2024", quantity: 1, price: 2999 }
    ],
    pdfUrl: "#"
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-001",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryDate: "12/25",
    isDefault: true
  },
  {
    id: "pm-002",
    type: "upi",
    upiId: "store@paytm",
    isDefault: false
  }
];

const transactionHistory = [
  { id: "txn-001", date: "2024-02-01", amount: 2999, status: "success", method: "Visa •••• 4242" },
  { id: "txn-002", date: "2024-01-01", amount: 2999, status: "success", method: "Visa •••• 4242" },
  { id: "txn-003", date: "2023-12-01", amount: 2999, status: "success", method: "UPI - store@paytm" },
  { id: "txn-004", date: "2023-11-01", amount: 2999, status: "success", method: "Visa •••• 4242" }
];

export default function BillingPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "invoices" | "usage" | "payment">("overview");

  const getStatusBadge = (status: "paid" | "pending" | "overdue") => {
    const colors = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      overdue: "bg-red-100 text-red-800 border-red-200"
    };
    const icons = {
      paid: CheckCircle,
      pending: Clock,
      overdue: AlertCircle
    };
    const Icon = icons[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

  const calculatePercentage = (current: number, limit: number) => (current / limit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Billing & Payments
              </h1>
              <p className="text-lg text-gray-600">
                Manage your subscription, invoices, and payment methods
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plan Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Current Plan</p>
                  <h2 className="text-3xl font-bold mb-2">{currentPlan.name}</h2>
                  <p className="text-blue-100">Active since {new Date(currentPlan.startDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Shield className="h-12 w-12" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-blue-100 text-sm mb-1">Monthly Billing</p>
                  <p className="text-2xl font-bold">{formatCurrency(currentPlan.price)}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-blue-100 text-sm mb-1">Next Billing Date</p>
                  <p className="text-2xl font-bold">{new Date(currentPlan.renewalDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200">
                  Upgrade Plan
                </button>
                <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all duration-200">
                  Change Plan
                </button>
              </div>
            </div>

            {/* Plan Features */}
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-lg font-bold mb-4">Plan Features</h3>
              <div className="space-y-2">
                {currentPlan.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-blue-50">{feature}</span>
                  </div>
                ))}
                {currentPlan.features.length > 6 && (
                  <p className="text-sm text-blue-100 mt-2">+{currentPlan.features.length - 6} more features</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="h-8 w-8 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Paid</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(8997)}</p>
            <p className="text-sm text-gray-500">Total Paid (3 months)</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <span className="text-xs text-yellow-600 font-medium">Due</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(2999)}</p>
            <p className="text-sm text-gray-500">Amount Due</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Receipt className="h-8 w-8 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Invoices</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{invoices.length}</p>
            <p className="text-sm text-gray-500">Total Invoices</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Next Due</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">5 days</p>
            <p className="text-sm text-gray-500">March 8, 2024</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-6 px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "invoices", label: "Invoices", icon: FileText },
                { id: "usage", label: "Usage", icon: Activity },
                { id: "payment", label: "Payment Methods", icon: CreditCard }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`flex items-center pb-3 pt-4 border-b-2 transition-all ${
                      selectedTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                {/* Usage Overview */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Current Usage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {usageMetrics.map((metric) => {
                      const Icon = metric.icon;
                      const percentage = calculatePercentage(metric.current, metric.limit);
                      return (
                        <div key={metric.name} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className={`p-2 bg-${metric.color}-100 rounded-lg mr-3`}>
                                <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{metric.name}</p>
                                <p className="text-sm text-gray-500">
                                  {metric.current.toLocaleString()} of {metric.limit.toLocaleString()} {metric.unit}
                                </p>
                              </div>
                            </div>
                            {metric.trend !== 0 && (
                              <span className={`text-xs font-medium ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.trend > 0 ? '+' : ''}{metric.trend}%
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full bg-${metric.color}-500 transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-right">{percentage.toFixed(1)}% used</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {transactionHistory.slice(0, 4).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.method}</p>
                            <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatCurrency(transaction.amount)}</p>
                          <p className="text-xs text-green-600">Success</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Invoices Tab */}
            {selectedTab === "invoices" && (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{invoice.invoiceNumber}</h4>
                        <p className="text-sm text-gray-500">
                          Issued: {new Date(invoice.date).toLocaleDateString()} • Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.description}</span>
                          <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-lg font-bold text-gray-900">
                        Total: {formatCurrency(invoice.amount)}
                      </div>
                      <div className="flex gap-2">
                        <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </button>
                        {invoice.status === "pending" && (
                          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Usage Tab */}
            {selectedTab === "usage" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {usageMetrics.map((metric) => {
                    const Icon = metric.icon;
                    const percentage = calculatePercentage(metric.current, metric.limit);
                    const isNearLimit = percentage > 80;
                    return (
                      <div key={metric.name} className={`p-6 rounded-xl border-2 ${isNearLimit ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`p-3 bg-${metric.color}-100 rounded-xl mr-4`}>
                              <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-gray-900">
                                {metric.current.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">{metric.name}</p>
                            </div>
                          </div>
                          {isNearLimit && (
                            <AlertCircle className="h-6 w-6 text-orange-600" />
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Limit: {metric.limit.toLocaleString()} {metric.unit}</span>
                            <span className={`font-medium ${isNearLimit ? 'text-orange-600' : 'text-gray-900'}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${
                                isNearLimit ? 'bg-orange-500' : `bg-${metric.color}-500`
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {metric.trend !== 0 && (
                          <div className="flex items-center text-sm">
                            {metric.trend > 0 ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                            )}
                            <span className={metric.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                              {Math.abs(metric.trend)}% from last month
                            </span>
                          </div>
                        )}

                        {isNearLimit && (
                          <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                            <p className="text-xs text-orange-800 font-medium">
                              ⚠️ You're approaching your {metric.name.toLowerCase()} limit. Consider upgrading your plan.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {selectedTab === "payment" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Saved Payment Methods</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className={`p-6 border-2 rounded-xl ${method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gray-100 rounded-xl">
                            {method.type === "card" ? (
                              <CardIcon className="h-6 w-6 text-gray-600" />
                            ) : method.type === "upi" ? (
                              <Smartphone className="h-6 w-6 text-gray-600" />
                            ) : (
                              <Building className="h-6 w-6 text-gray-600" />
                            )}
                          </div>
                          <div>
                            {method.type === "card" && (
                              <>
                                <p className="font-medium text-gray-900">{method.brand} •••• {method.last4}</p>
                                <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                              </>
                            )}
                            {method.type === "upi" && (
                              <>
                                <p className="font-medium text-gray-900">UPI</p>
                                <p className="text-sm text-gray-500">{method.upiId}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.isDefault && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              Default
                            </span>
                          )}
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-all">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Billing Contact */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Billing Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">billing@healthysugar.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium text-gray-900">Healthy Sugar Co.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">Mumbai, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Update Billing Information
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help with Billing?</h3>
                <p className="text-gray-600 mb-4">
                  Our support team is here to help you with any billing questions or concerns.
                </p>
                <div className="flex gap-3">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm border border-gray-300">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

