"use client";

import { 
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  Calendar,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  Tag,
  User,
  FileText,
  Zap
} from "lucide-react";
import { useState } from "react";

// Comprehensive Transaction Data
const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    time: "14:30",
    description: "Customer Payment - Order #ORD-1247",
    type: "income",
    amount: 2499,
    category: "Sales Revenue",
    subcategory: "Online Sales",
    status: "completed",
    method: "UPI",
    reference: "UPI-240115143025",
    customer: "Priya Sharma",
    tags: ["online", "upi", "retail"],
    notes: "Bulk order payment received"
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    time: "12:15",
    description: "Google Ads Payment - January Campaign",
    type: "expense",
    amount: 15680,
    category: "Marketing",
    subcategory: "Digital Advertising",
    status: "completed",
    method: "Credit Card",
    reference: "CC-240115121545",
    vendor: "Google India",
    tags: ["marketing", "ads", "digital"],
    notes: "Monthly advertising spend"
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    time: "09:00",
    description: "Salary Payment - January 2024",
    type: "expense",
    amount: 125000,
    category: "Payroll",
    subcategory: "Employee Salaries",
    status: "completed",
    method: "Bank Transfer",
    reference: "NEFT-240114090012",
    vendor: "Payroll Processing",
    tags: ["payroll", "salary", "employees"],
    notes: "Monthly salary disbursement"
  },
  {
    id: "TXN-004",
    date: "2024-01-14",
    time: "16:45",
    description: "GST Payment - December 2023",
    type: "expense",
    amount: 57600,
    category: "Tax",
    subcategory: "GST",
    status: "completed",
    method: "Net Banking",
    reference: "GST-240114164512",
    vendor: "Government of India",
    tags: ["tax", "gst", "compliance"],
    notes: "GSTR-3B payment for Dec 2023"
  },
  {
    id: "TXN-005",
    date: "2024-01-13",
    time: "11:20",
    description: "Bulk Order Payment - B2B Client",
    type: "income",
    amount: 45000,
    category: "Sales Revenue",
    subcategory: "B2B Sales",
    status: "pending",
    method: "Bank Transfer",
    reference: "RTGS-240113112045",
    customer: "Mumbai Retail Chain",
    tags: ["b2b", "bulk", "wholesale"],
    notes: "Awaiting bank confirmation"
  },
  {
    id: "TXN-006",
    date: "2024-01-13",
    time: "10:30",
    description: "Office Rent - January 2024",
    type: "expense",
    amount: 35000,
    category: "Operating Expenses",
    subcategory: "Rent & Utilities",
    status: "completed",
    method: "Bank Transfer",
    reference: "NEFT-240113103045",
    vendor: "Property Management Co.",
    tags: ["rent", "office", "fixed-cost"],
    notes: "Monthly office rent payment"
  },
  {
    id: "TXN-007",
    date: "2024-01-12",
    time: "15:45",
    description: "Refund - Order #ORD-1156",
    type: "expense",
    amount: 1299,
    category: "Customer Service",
    subcategory: "Refunds",
    status: "completed",
    method: "UPI",
    reference: "UPI-240112154523",
    customer: "Rajesh Kumar",
    tags: ["refund", "customer-service"],
    notes: "Product return - quality issue"
  },
  {
    id: "TXN-008",
    date: "2024-01-12",
    time: "13:20",
    description: "Inventory Purchase - Raw Materials",
    type: "expense",
    amount: 89500,
    category: "Cost of Goods Sold",
    subcategory: "Raw Materials",
    status: "completed",
    method: "Bank Transfer",
    reference: "NEFT-240112132045",
    vendor: "Stevia Suppliers Ltd",
    tags: ["inventory", "raw-materials", "cogs"],
    notes: "Monthly inventory replenishment"
  },
  {
    id: "TXN-009",
    date: "2024-01-11",
    time: "16:10",
    description: "Subscription - Accounting Software",
    type: "expense",
    amount: 2999,
    category: "Technology",
    subcategory: "Software Subscriptions",
    status: "completed",
    method: "Credit Card",
    reference: "CC-240111161045",
    vendor: "TallyPrime",
    tags: ["software", "subscription", "accounting"],
    notes: "Annual accounting software renewal"
  },
  {
    id: "TXN-010",
    date: "2024-01-11",
    time: "14:25",
    description: "Customer Payment - Subscription",
    type: "income",
    amount: 5999,
    category: "Sales Revenue",
    subcategory: "Subscription Revenue",
    status: "completed",
    method: "Credit Card",
    reference: "CC-240111142534",
    customer: "Anita Patel",
    tags: ["subscription", "recurring", "premium"],
    notes: "Annual subscription payment"
  }
];

// Transaction Categories
const categories = {
  income: [
    { name: "Sales Revenue", subcategories: ["Online Sales", "B2B Sales", "Subscription Revenue", "Retail Sales"] },
    { name: "Other Income", subcategories: ["Interest Income", "Investment Returns", "Miscellaneous"] }
  ],
  expense: [
    { name: "Cost of Goods Sold", subcategories: ["Raw Materials", "Manufacturing", "Packaging", "Shipping"] },
    { name: "Operating Expenses", subcategories: ["Rent & Utilities", "Office Supplies", "Equipment", "Maintenance"] },
    { name: "Marketing", subcategories: ["Digital Advertising", "Content Creation", "Events", "Influencer Marketing"] },
    { name: "Payroll", subcategories: ["Employee Salaries", "Benefits", "Contractor Payments", "Bonuses"] },
    { name: "Technology", subcategories: ["Software Subscriptions", "Hardware", "Cloud Services", "Development"] },
    { name: "Tax", subcategories: ["GST", "Income Tax", "TDS", "Professional Tax"] },
    { name: "Customer Service", subcategories: ["Refunds", "Support", "Returns Processing"] },
    { name: "Professional Services", subcategories: ["Legal", "Accounting", "Consulting", "Audit"] }
  ]
};

// Payment Methods
const paymentMethods = [
  { id: "upi", name: "UPI", icon: Smartphone, color: "text-green-600" },
  { id: "credit-card", name: "Credit Card", icon: CreditCard, color: "text-blue-600" },
  { id: "bank-transfer", name: "Bank Transfer", icon: Building2, color: "text-purple-600" },
  { id: "net-banking", name: "Net Banking", icon: Building2, color: "text-orange-600" },
  { id: "cash", name: "Cash", icon: Banknote, color: "text-gray-600" },
  { id: "cheque", name: "Cheque", icon: FileText, color: "text-indigo-600" }
];

// Transaction Summary
const transactionSummary = {
  totalIncome: 53498,
  totalExpenses: 325878,
  netAmount: -272380,
  transactionCount: 10,
  avgTransactionSize: 37938,
  pendingTransactions: 1,
  completedTransactions: 9
};

// Helper Functions
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
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
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "pending":
      return Clock;
    case "failed":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

const getPaymentMethodIcon = (method: string) => {
  const paymentMethod = paymentMethods.find(pm => pm.name === method);
  return paymentMethod ? paymentMethod.icon : CreditCard;
};

const getPaymentMethodColor = (method: string) => {
  const paymentMethod = paymentMethods.find(pm => pm.name === method);
  return paymentMethod ? paymentMethod.color : "text-gray-600";
};

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.customer && transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transaction.vendor && transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || transaction.type === selectedType;
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;
    const matchesMethod = selectedMethod === "all" || transaction.method === selectedMethod;
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesMethod;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Transaction Management
              </h1>
              <p className="text-lg text-gray-600">
                Complete transaction history and financial activity tracking
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                This Month
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              <button 
                onClick={() => setShowAddTransaction(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(transactionSummary.totalIncome)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(transactionSummary.totalExpenses)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Net Amount</p>
                <p className={`text-2xl font-bold ${transactionSummary.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(transactionSummary.netAmount))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactionSummary.transactionCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.income.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
                {categories.expense.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.name}>{method.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Transaction History ({filteredTransactions.length} transactions)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  const PaymentIcon = getPaymentMethodIcon(transaction.method);
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
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
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {transaction.id} • {transaction.reference}
                            </div>
                            {transaction.customer && (
                              <div className="text-xs text-blue-600">
                                Customer: {transaction.customer}
                              </div>
                            )}
                            {transaction.vendor && (
                              <div className="text-xs text-purple-600">
                                Vendor: {transaction.vendor}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.category}</div>
                        <div className="text-sm text-gray-500">{transaction.subcategory}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {transaction.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                          {transaction.tags.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{transaction.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <PaymentIcon className={`h-4 w-4 mr-2 ${getPaymentMethodColor(transaction.method)}`} />
                          <span className="text-sm text-gray-900">{transaction.method}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {transaction.status}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                        <div className="text-sm text-gray-500">{transaction.time}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
