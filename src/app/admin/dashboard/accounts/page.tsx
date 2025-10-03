"use client";

import { useState } from "react";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Receipt,
  FileText,
  Calculator,
  Banknote,
  Target,
  Activity,
  Percent,
  Building2,
  Users,
  ShoppingCart,
  Package,
  Zap,
  Bell,
  RefreshCw,
  Plus,
  Minus,
  Equal,
  IndianRupee,
  Landmark,
  CreditCard as Card,
  Wallet as WalletIcon,
  TrendingUp as Growth,
  AlertCircle,
  Info,
  LayoutDashboard,
  ArrowLeftRight,
  Search,
  Edit,
  Trash2,
  Send,
  Copy,
  ExternalLink,
  Settings,
  TrendingDown as Decline
} from "lucide-react";

// Comprehensive Financial Data
const financialMetrics = {
  // Revenue & Income
  totalRevenue: 2456800,
  revenueGrowth: 15.8,
  grossProfit: 1781424, // 72.5% margin
  grossProfitMargin: 72.5,
  netProfit: 705452, // 28.7% margin
  netProfitMargin: 28.7,
  
  // Expenses
  totalExpenses: 1751348,
  operatingExpenses: 1456800,
  marketingExpenses: 156780,
  adminExpenses: 89560,
  otherExpenses: 48208,
  
  // Cash Flow
  cashInflow: 2567890,
  cashOutflow: 1862438,
  netCashFlow: 705452,
  cashFlowGrowth: 18.9,
  
  // Accounts Receivable & Payable
  accountsReceivable: 456780,
  accountsPayable: 234560,
  netReceivables: 222220,
  
  // Tax & Compliance
  gstCollected: 441624, // 18% GST on revenue
  gstPaid: 78450,
  netGstLiability: 363174,
  incomeTax: 176363, // 25% on net profit
  
  // Banking & Assets
  bankBalance: 1245680,
  currentAssets: 2456780,
  currentLiabilities: 567890,
  workingCapital: 1888890,
  
  // Performance Ratios
  currentRatio: 4.32,
  quickRatio: 3.85,
  debtToEquity: 0.23,
  returnOnAssets: 28.7,
  returnOnEquity: 35.4
};

// Monthly Financial Trend
const monthlyFinancials = [
  { 
    month: "Jul", 
    revenue: 185000, 
    expenses: 135000, 
    profit: 50000, 
    cashFlow: 48000,
    gst: 33300,
    tax: 12500
  },
  { 
    month: "Aug", 
    revenue: 210000, 
    expenses: 148000, 
    profit: 62000, 
    cashFlow: 59000,
    gst: 37800,
    tax: 15500
  },
  { 
    month: "Sep", 
    revenue: 195000, 
    expenses: 142000, 
    profit: 53000, 
    cashFlow: 51000,
    gst: 35100,
    tax: 13250
  },
  { 
    month: "Oct", 
    revenue: 225000, 
    expenses: 158000, 
    profit: 67000, 
    cashFlow: 64000,
    gst: 40500,
    tax: 16750
  },
  { 
    month: "Nov", 
    revenue: 280000, 
    expenses: 195000, 
    profit: 85000, 
    cashFlow: 82000,
    gst: 50400,
    tax: 21250
  },
  { 
    month: "Dec", 
    revenue: 320000, 
    expenses: 218000, 
    profit: 102000, 
    cashFlow: 98000,
    gst: 57600,
    tax: 25500
  },
  { 
    month: "Jan", 
    revenue: 2456800, 
    expenses: 1751348, 
    profit: 705452, 
    cashFlow: 705452,
    gst: 441624,
    tax: 176363
  }
];

// Expense Categories
const expenseCategories = [
  {
    category: "Operating Expenses",
    amount: 1456800,
    percentage: 83.2,
    growth: -2.3,
    color: "bg-blue-500",
    subcategories: [
      { name: "Salaries & Benefits", amount: 856000, percentage: 58.8 },
      { name: "Rent & Utilities", amount: 245000, percentage: 16.8 },
      { name: "Technology & Software", amount: 156000, percentage: 10.7 },
      { name: "Office Supplies", amount: 89800, percentage: 6.2 },
      { name: "Professional Services", amount: 110000, percentage: 7.5 }
    ]
  },
  {
    category: "Marketing Expenses",
    amount: 156780,
    percentage: 9.0,
    growth: 15.6,
    color: "bg-purple-500",
    subcategories: [
      { name: "Digital Advertising", amount: 89000, percentage: 56.8 },
      { name: "Content Creation", amount: 34500, percentage: 22.0 },
      { name: "Events & Promotions", amount: 23280, percentage: 14.8 },
      { name: "Influencer Marketing", amount: 10000, percentage: 6.4 }
    ]
  },
  {
    category: "Administrative",
    amount: 89560,
    percentage: 5.1,
    growth: -8.2,
    color: "bg-green-500",
    subcategories: [
      { name: "Legal & Compliance", amount: 45000, percentage: 50.2 },
      { name: "Accounting & Audit", amount: 28000, percentage: 31.3 },
      { name: "Insurance", amount: 16560, percentage: 18.5 }
    ]
  },
  {
    category: "Other Expenses",
    amount: 48208,
    percentage: 2.7,
    growth: 5.4,
    color: "bg-orange-500",
    subcategories: [
      { name: "Travel & Entertainment", amount: 28000, percentage: 58.1 },
      { name: "Miscellaneous", amount: 20208, percentage: 41.9 }
    ]
  }
];

// Recent Transactions
const recentTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    description: "Customer Payment - Order #ORD-1247",
    type: "income",
    amount: 2499,
    category: "Sales Revenue",
    status: "completed",
    method: "UPI"
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    description: "Google Ads Payment",
    type: "expense",
    amount: 15680,
    category: "Marketing",
    status: "completed",
    method: "Credit Card"
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    description: "Salary Payment - January",
    type: "expense",
    amount: 125000,
    category: "Payroll",
    status: "completed",
    method: "Bank Transfer"
  },
  {
    id: "TXN-004",
    date: "2024-01-14",
    description: "GST Payment - December",
    type: "expense",
    amount: 57600,
    category: "Tax",
    status: "completed",
    method: "Net Banking"
  },
  {
    id: "TXN-005",
    date: "2024-01-13",
    description: "Bulk Order Payment - B2B Client",
    type: "income",
    amount: 45000,
    category: "Sales Revenue",
    status: "pending",
    method: "Bank Transfer"
  }
];

// Outstanding Invoices
const outstandingInvoices = [
  {
    id: "INV-2024-001",
    customer: "Mumbai Retail Chain",
    amount: 125000,
    dueDate: "2024-01-20",
    overdue: false,
    status: "pending"
  },
  {
    id: "INV-2024-002",
    customer: "Delhi Distributor",
    amount: 89500,
    dueDate: "2024-01-18",
    overdue: false,
    status: "pending"
  },
  {
    id: "INV-2023-456",
    customer: "Bangalore Supermarket",
    amount: 67800,
    dueDate: "2024-01-10",
    overdue: true,
    status: "overdue"
  },
  {
    id: "INV-2023-445",
    customer: "Chennai Wholesaler",
    amount: 45600,
    dueDate: "2024-01-05",
    overdue: true,
    status: "overdue"
  }
];

// Tax Summary
const taxSummary = {
  gstReturns: [
    { period: "Dec 2023", filed: true, amount: 57600, dueDate: "2024-01-20" },
    { period: "Nov 2023", filed: true, amount: 50400, dueDate: "2023-12-20" },
    { period: "Oct 2023", filed: true, amount: 40500, dueDate: "2023-11-20" },
  ],
  incomeTax: {
    quarterlyAdvance: 44090, // 25% of quarterly profit
    totalPaid: 176363,
    estimated: 176363,
    nextDue: "2024-03-15"
  },
  tds: {
    collected: 12450,
    deposited: 12450,
    pending: 0
  }
};

// Financial Alerts
const financialAlerts = [
  {
    id: 1,
    type: "overdue",
    severity: "high",
    message: "2 invoices overdue totaling ₹1,13,400",
    time: "2 hours ago",
    icon: AlertTriangle
  },
  {
    id: 2,
    type: "tax",
    severity: "medium",
    message: "GST return filing due in 5 days",
    time: "1 day ago",
    icon: Receipt
  },
  {
    id: 3,
    type: "cash",
    severity: "low",
    message: "Cash flow positive - ₹7,05,452 this month",
    time: "2 days ago",
    icon: TrendingUp
  },
  {
    id: 4,
    type: "expense",
    severity: "medium",
    message: "Marketing expenses up 15.6% this month",
    time: "3 days ago",
    icon: TrendingUp
  }
];

// Helper Functions
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

const formatNumber = (num: number): string => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const getTransactionColor = (type: string) => {
  return type === "income" ? "text-green-600" : "text-red-600";
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "border-l-red-500 bg-red-50";
    case "medium":
      return "border-l-yellow-500 bg-yellow-50";
    case "low":
      return "border-l-green-500 bg-green-50";
    default:
      return "border-l-gray-500 bg-gray-50";
  }
};

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions" | "invoices" | "tax" | "cash-flow" | "expenses" | "reports">("dashboard");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Accounts & Finance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive financial management and accounting insights
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]">
            <Calendar className="mr-2 h-4 w-4" />
            Financial Year 2024
          </button>
          <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
            { id: "transactions", name: "Transactions", icon: ArrowLeftRight },
            { id: "invoices", name: "Invoices", icon: Receipt },
            { id: "tax", name: "Tax & Compliance", icon: Calculator },
            { id: "cash-flow", name: "Cash Flow", icon: Activity },
            { id: "expenses", name: "Expenses", icon: CreditCard },
            { id: "reports", name: "Reports", icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "transactions" && renderTransactions()}
      {activeTab === "invoices" && renderInvoices()}
      {activeTab === "tax" && renderTax()}
      {activeTab === "cash-flow" && renderCashFlow()}
      {activeTab === "expenses" && renderExpenses()}
      {activeTab === "reports" && renderReports()}
    </div>
  );

  function renderDashboard() {
    return (
      <div className="space-y-6">
        {/* Financial Alerts */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-500" />
              Financial Alerts & Notifications
            </h3>
            <span className="text-sm text-gray-500">Last updated: just now</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.severity)}`}>
                <div className="flex items-start">
                  <alert.icon className="h-5 w-5 mt-0.5 mr-3 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{financialMetrics.revenueGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialMetrics.totalRevenue)}</p>
              <p className="text-xs text-gray-500">Gross sales this month</p>
              <p className="text-xs text-gray-400 mt-1">vs last month</p>
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{financialMetrics.cashFlowGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Net Profit</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialMetrics.netProfit)}</p>
              <p className="text-xs text-gray-500">{financialMetrics.netProfitMargin}% profit margin</p>
              <p className="text-xs text-gray-400 mt-1">after all expenses</p>
            </div>
          </div>

          {/* Cash Flow */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{financialMetrics.cashFlowGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Net Cash Flow</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialMetrics.netCashFlow)}</p>
              <p className="text-xs text-gray-500">Positive cash flow</p>
              <p className="text-xs text-gray-400 mt-1">inflow - outflow</p>
            </div>
          </div>

          {/* Bank Balance */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors">
                <Landmark className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex items-center text-orange-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-1" />
                Healthy
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Bank Balance</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialMetrics.bankBalance)}</p>
              <p className="text-xs text-gray-500">Available funds</p>
              <p className="text-xs text-gray-400 mt-1">across all accounts</p>
            </div>
          </div>
        </div>

        {/* Financial Ratios & Performance */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <Percent className="h-5 w-5 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+{financialMetrics.revenueGrowth}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{financialMetrics.grossProfitMargin}%</p>
            <p className="text-xs text-gray-500">Gross Margin</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">{financialMetrics.currentRatio}</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{financialMetrics.currentRatio}</p>
            <p className="text-xs text-gray-500">Current Ratio</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-purple-600 font-medium">{financialMetrics.returnOnAssets}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{financialMetrics.returnOnAssets}%</p>
            <p className="text-xs text-gray-500">ROA</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <Growth className="h-5 w-5 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{financialMetrics.returnOnEquity}%</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{financialMetrics.returnOnEquity}%</p>
            <p className="text-xs text-gray-500">ROE</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="h-5 w-5 text-yellow-500" />
              <span className="text-xs text-yellow-600 font-medium">{financialMetrics.debtToEquity}</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{financialMetrics.debtToEquity}</p>
            <p className="text-xs text-gray-500">Debt/Equity</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <WalletIcon className="h-5 w-5 text-indigo-500" />
              <span className="text-xs text-indigo-600 font-medium">Strong</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{formatNumber(financialMetrics.workingCapital)}</p>
            <p className="text-xs text-gray-500">Working Capital</p>
          </div>
        </div>

        {/* Revenue Trend & Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-green-500" />
              Revenue & Profit Trend
            </h3>
            <div className="space-y-4">
              {monthlyFinancials.slice(-6).map((data, index) => (
                <div key={data.month} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 w-12">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-green-600">{formatCurrency(data.revenue)}</span>
                      <span className="text-xs text-blue-600">{formatCurrency(data.profit)} profit</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((data.revenue / 3000000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((data.profit / 800000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-purple-500" />
              Expense Categories
            </h3>
            <div className="space-y-6">
              {expenseCategories.map((category) => (
                <div key={category.category} className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <span className="font-medium text-gray-900">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(category.amount)}</span>
                      <span className={`text-xs ml-2 ${category.growth > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {category.growth > 0 ? '+' : ''}{category.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.percentage}% of total expenses
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions & Outstanding Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                Recent Transactions
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all transactions
              </button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? 
                          <ArrowUpRight className="h-5 w-5 text-green-600" /> :
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category} • {transaction.method}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outstanding Invoices */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Receipt className="h-5 w-5 mr-2 text-orange-500" />
                Outstanding Invoices
              </h3>
              <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">
                Manage invoices
              </button>
            </div>
            <div className="space-y-4">
              {outstandingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        invoice.overdue ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <FileText className={`h-5 w-5 ${invoice.overdue ? 'text-red-600' : 'text-yellow-600'}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.customer}</p>
                      <p className="text-sm text-gray-500">Invoice #{invoice.id}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(invoice.status)}`}>
                        {invoice.overdue ? 'Overdue' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                    <p className={`text-xs ${invoice.overdue ? 'text-red-600' : 'text-gray-500'}`}>
                      Due: {invoice.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax Summary & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tax Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-red-500" />
              Tax Summary & Compliance
            </h3>
            
            {/* GST Summary */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">GST Returns</h4>
              <div className="space-y-2">
                {taxSummary.gstReturns.map((gst, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-gray-900">{gst.period}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">Due: {gst.dueDate}</span>
                      <span className="font-medium">{formatCurrency(gst.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Income Tax */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Income Tax</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500">Quarterly Advance</span>
                  <span className="font-medium">{formatCurrency(taxSummary.incomeTax.quarterlyAdvance)}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Total Paid</span>
                  <span className="font-medium">{formatCurrency(taxSummary.incomeTax.totalPaid)}</span>
                </div>
              </div>
            </div>

            {/* TDS Summary */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">TDS Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500">Collected</span>
                  <span className="font-medium">{formatCurrency(taxSummary.tds.collected)}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Deposited</span>
                  <span className="font-medium">{formatCurrency(taxSummary.tds.deposited)}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Pending</span>
                  <span className="font-medium text-green-600">{formatCurrency(taxSummary.tds.pending)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                <div className="p-3 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Add Transaction</p>
                <p className="text-xs text-gray-500 text-center">Record income/expense</p>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <div className="p-3 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Create Invoice</p>
                <p className="text-xs text-gray-500 text-center">Generate new invoice</p>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                <div className="p-3 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">P&L Report</p>
                <p className="text-xs text-gray-500 text-center">Profit & Loss analysis</p>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                <div className="p-3 bg-orange-100 rounded-xl mb-3 group-hover:bg-orange-200 transition-colors">
                  <Calculator className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Tax Calculator</p>
                <p className="text-xs text-gray-500 text-center">GST & income tax</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderTransactions() {
    return (
      <div className="space-y-6">
        {/* Transactions Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Transaction Management</h3>
            <p className="text-sm text-gray-500">Track and manage all financial transactions</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </button>
        </div>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Income</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.cashInflow)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.cashOutflow)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Net Cash Flow</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.netCashFlow)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ArrowLeftRight className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">{recentTransactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Filter:</span>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All Types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All Categories</option>
              <option>Sales Revenue</option>
              <option>Marketing</option>
              <option>Payroll</option>
              <option>Tax</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'income' ? 
                            <ArrowUpRight className="h-5 w-5 text-green-600" /> :
                            <ArrowDownRight className="h-5 w-5 text-red-600" />
                          }
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={getTransactionColor(transaction.type)}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Copy className="h-4 w-4" />
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
    );
  }

  function renderInvoices() {
    return (
      <div className="space-y-6">
        {/* Invoices Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Invoice Management</h3>
            <p className="text-sm text-gray-500">Create, track, and manage customer invoices</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </button>
        </div>

        {/* Invoice Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Invoices</p>
                <p className="text-2xl font-semibold text-gray-900">{outstandingInvoices.length + 15}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{outstandingInvoices.filter(i => i.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900">{outstandingInvoices.filter(i => i.overdue).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outstanding Amount</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outstanding Invoices */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Receipt className="h-5 w-5 mr-2 text-orange-500" />
                Outstanding Invoices
              </h3>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                  <option>Paid</option>
                </select>
                <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">
                  Send Reminders
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {outstandingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        invoice.overdue ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <FileText className={`h-6 w-6 ${invoice.overdue ? 'text-red-600' : 'text-yellow-600'}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.customer}</p>
                      <p className="text-sm text-gray-500">Invoice #{invoice.id}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(invoice.status)}`}>
                        {invoice.overdue ? 'Overdue' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                    <p className={`text-xs ${invoice.overdue ? 'text-red-600' : 'text-gray-500'}`}>
                      Due: {invoice.dueDate}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Send className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderTax() {
    return (
      <div className="space-y-6">
        {/* Tax Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Tax & Compliance</h3>
            <p className="text-sm text-gray-500">Manage GST, income tax, and compliance requirements</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            File Return
          </button>
        </div>

        {/* Tax Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GST Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-red-500" />
              GST Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">GST Collected</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(financialMetrics.gstCollected)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">GST Paid</span>
                <span className="text-lg font-bold text-red-600">{formatCurrency(financialMetrics.gstPaid)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-gray-900">Net GST Liability</span>
                <span className="text-xl font-bold text-orange-600">{formatCurrency(financialMetrics.netGstLiability)}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Returns</h4>
              <div className="space-y-2">
                {taxSummary.gstReturns.map((gst, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-gray-900">{gst.period}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(gst.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Income Tax */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              Income Tax
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Quarterly Advance</span>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(taxSummary.incomeTax.quarterlyAdvance)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Paid</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(taxSummary.incomeTax.totalPaid)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Estimated Annual</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(taxSummary.incomeTax.estimated)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-gray-900">Next Due Date</span>
                <span className="text-sm font-bold text-orange-600">{taxSummary.incomeTax.nextDue}</span>
              </div>
            </div>
          </div>

          {/* TDS Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-purple-500" />
              TDS Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">TDS Collected</span>
                <span className="text-lg font-bold text-purple-600">{formatCurrency(taxSummary.tds.collected)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">TDS Deposited</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(taxSummary.tds.deposited)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-gray-900">Pending</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(taxSummary.tds.pending)}</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-green-800 font-medium">All TDS deposited on time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Calendar & Compliance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
            Tax Calendar & Upcoming Deadlines
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-orange-200 rounded-xl bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-800">GST Return Filing</span>
                <span className="text-xs text-orange-600 bg-orange-200 px-2 py-1 rounded-full">Due Soon</span>
              </div>
              <p className="text-lg font-bold text-orange-900">January 20, 2024</p>
              <p className="text-sm text-orange-700">GSTR-3B for December 2023</p>
            </div>
            
            <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Income Tax Advance</span>
                <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full">Upcoming</span>
              </div>
              <p className="text-lg font-bold text-blue-900">March 15, 2024</p>
              <p className="text-sm text-blue-700">Q4 Advance Tax Payment</p>
            </div>
            
            <div className="p-4 border border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">TDS Return</span>
                <span className="text-xs text-green-600 bg-green-200 px-2 py-1 rounded-full">Completed</span>
              </div>
              <p className="text-lg font-bold text-green-900">January 31, 2024</p>
              <p className="text-sm text-green-700">Form 24Q for Q3 FY24</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCashFlow() {
    return (
      <div className="space-y-6">
        {/* Cash Flow Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Cash Flow Management</h3>
            <p className="text-sm text-gray-500">Monitor cash inflows, outflows, and projections</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>This year</option>
              <option>Custom range</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Cash Flow Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash Inflow</p>
                <p className="text-2xl font-semibold text-green-600">{formatCurrency(financialMetrics.cashInflow)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +{financialMetrics.cashFlowGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash Outflow</p>
                <p className="text-2xl font-semibold text-red-600">{formatCurrency(financialMetrics.cashOutflow)}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  Operating expenses
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Net Cash Flow</p>
                <p className="text-2xl font-semibold text-blue-600">{formatCurrency(financialMetrics.netCashFlow)}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="h-4 w-4 mr-1" />
                  Positive trend
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-blue-500" />
            Cash Flow Trend
          </h3>
          <div className="space-y-4">
            {monthlyFinancials.slice(-6).map((data, index) => (
              <div key={data.month} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 w-12">{data.month}</span>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-sm text-green-600">+{formatCurrency(data.revenue)}</span>
                      <span className="text-xs text-gray-500 block">Inflow</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-red-600">-{formatCurrency(data.expenses)}</span>
                      <span className="text-xs text-gray-500 block">Outflow</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-blue-600">{formatCurrency(data.cashFlow)}</span>
                      <span className="text-xs text-gray-500 block">Net</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((data.revenue / 3000000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((data.expenses / 3000000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((data.cashFlow / 120000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow Projections */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-500" />
            Cash Flow Projections (Next 3 Months)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">February 2024</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Inflow</span>
                    <span className="text-green-600 font-medium">₹2,80,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Outflow</span>
                    <span className="text-red-600 font-medium">₹1,95,000</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-900 font-medium">Net Cash Flow</span>
                    <span className="text-blue-600 font-bold">₹85,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">March 2024</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Inflow</span>
                    <span className="text-green-600 font-medium">₹3,20,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Outflow</span>
                    <span className="text-red-600 font-medium">₹2,15,000</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-900 font-medium">Net Cash Flow</span>
                    <span className="text-blue-600 font-bold">₹1,05,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">April 2024</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Inflow</span>
                    <span className="text-green-600 font-medium">₹2,95,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projected Outflow</span>
                    <span className="text-red-600 font-medium">₹2,05,000</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-900 font-medium">Net Cash Flow</span>
                    <span className="text-blue-600 font-bold">₹90,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderExpenses() {
    return (
      <div className="space-y-6">
        {/* Expenses Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Expense Management</h3>
            <p className="text-sm text-gray-500">Track and categorize business expenses</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </button>
        </div>

        {/* Expense Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.totalExpenses)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Operating</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.operatingExpenses)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Marketing</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.marketingExpenses)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Administrative</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialMetrics.adminExpenses)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-purple-500" />
            Expense Categories
          </h3>
          <div className="space-y-6">
            {expenseCategories.map((category) => (
              <div key={category.category} className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="font-medium text-gray-900">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(category.amount)}</span>
                    <span className={`text-xs ml-2 ${category.growth > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {category.growth > 0 ? '+' : ''}{category.growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {category.percentage}% of total expenses
                </div>
                
                {/* Subcategories */}
                <div className="ml-6 space-y-2">
                  {category.subcategories.map((sub, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{sub.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 font-medium">{formatCurrency(sub.amount)}</span>
                        <span className="text-xs text-gray-500">({sub.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Receipt className="h-5 w-5 mr-2 text-blue-500" />
              Recent Expenses
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all expenses
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.filter(t => t.type === 'expense').map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-red-100">
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.method}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">
                    -{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button className="text-green-600 hover:text-green-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderReports() {
    return (
      <div className="space-y-6">
        {/* Reports Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Financial Reports</h3>
            <p className="text-sm text-gray-500">Generate comprehensive financial reports and analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* P&L Report */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <button className="text-green-600 hover:text-green-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Profit & Loss Statement</h4>
            <p className="text-sm text-gray-500 mb-4">Comprehensive P&L analysis with revenue, expenses, and net profit breakdown</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Revenue</span>
                <span className="font-medium text-green-600">{formatCurrency(financialMetrics.totalRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Expenses</span>
                <span className="font-medium text-red-600">{formatCurrency(financialMetrics.totalExpenses)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">Net Profit</span>
                <span className="font-bold text-blue-600">{formatCurrency(financialMetrics.netProfit)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>

          {/* Balance Sheet */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <Landmark className="h-6 w-6 text-blue-600" />
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Balance Sheet</h4>
            <p className="text-sm text-gray-500 mb-4">Assets, liabilities, and equity position at a specific point in time</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Current Assets</span>
                <span className="font-medium text-blue-600">{formatCurrency(financialMetrics.currentAssets)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Liabilities</span>
                <span className="font-medium text-orange-600">{formatCurrency(financialMetrics.currentLiabilities)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">Working Capital</span>
                <span className="font-bold text-green-600">{formatCurrency(financialMetrics.workingCapital)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>

          {/* Cash Flow Statement */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <button className="text-purple-600 hover:text-purple-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Cash Flow Statement</h4>
            <p className="text-sm text-gray-500 mb-4">Operating, investing, and financing cash flows analysis</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Cash Inflow</span>
                <span className="font-medium text-green-600">{formatCurrency(financialMetrics.cashInflow)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cash Outflow</span>
                <span className="font-medium text-red-600">{formatCurrency(financialMetrics.cashOutflow)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">Net Cash Flow</span>
                <span className="font-bold text-purple-600">{formatCurrency(financialMetrics.netCashFlow)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>

          {/* Tax Report */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                <Calculator className="h-6 w-6 text-red-600" />
              </div>
              <button className="text-red-600 hover:text-red-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Tax Summary Report</h4>
            <p className="text-sm text-gray-500 mb-4">GST, income tax, and TDS summary with compliance status</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">GST Liability</span>
                <span className="font-medium text-red-600">{formatCurrency(financialMetrics.netGstLiability)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Income Tax</span>
                <span className="font-medium text-orange-600">{formatCurrency(financialMetrics.incomeTax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">Total Tax</span>
                <span className="font-bold text-red-600">{formatCurrency(financialMetrics.netGstLiability + financialMetrics.incomeTax)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-red-50 text-red-700 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>

          {/* Expense Report */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                <PieChart className="h-6 w-6 text-orange-600" />
              </div>
              <button className="text-orange-600 hover:text-orange-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Expense Analysis</h4>
            <p className="text-sm text-gray-500 mb-4">Detailed breakdown of expenses by category and trends</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Operating</span>
                <span className="font-medium text-blue-600">{formatCurrency(financialMetrics.operatingExpenses)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Marketing</span>
                <span className="font-medium text-purple-600">{formatCurrency(financialMetrics.marketingExpenses)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="font-bold text-orange-600">{formatCurrency(financialMetrics.totalExpenses)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-orange-50 text-orange-700 py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>

          {/* Financial Ratios */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Financial Ratios</h4>
            <p className="text-sm text-gray-500 mb-4">Key financial ratios and performance indicators</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Current Ratio</span>
                <span className="font-medium text-green-600">{financialMetrics.currentRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ROA</span>
                <span className="font-medium text-blue-600">{financialMetrics.returnOnAssets}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-medium">ROE</span>
                <span className="font-bold text-indigo-600">{financialMetrics.returnOnEquity}%</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Report Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
              <div className="p-3 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Export P&L</p>
              <p className="text-xs text-gray-500 text-center">Download PDF/Excel</p>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
              <div className="p-3 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Email Reports</p>
              <p className="text-xs text-gray-500 text-center">Send to stakeholders</p>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <div className="p-3 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Schedule Reports</p>
              <p className="text-xs text-gray-500 text-center">Automated delivery</p>
            </button>
            
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
              <div className="p-3 bg-orange-100 rounded-xl mb-3 group-hover:bg-orange-200 transition-colors">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Custom Reports</p>
              <p className="text-xs text-gray-500 text-center">Build custom templates</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
