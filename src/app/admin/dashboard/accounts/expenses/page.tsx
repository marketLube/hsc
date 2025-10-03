"use client";

import { 
  Receipt,
  Plus,
  Search,
  Filter,
  Calendar,
  Download,
  Edit,
  Trash2,
  Eye,
  Tag,
  Building2,
  Users,
  CreditCard,
  Banknote,
  Smartphone,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Award,
  Zap,
  Activity,
  Percent,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useState } from "react";

// Expense Categories
const expenseCategories = [
  {
    id: "cogs",
    name: "Cost of Goods Sold",
    subcategories: ["Raw Materials", "Manufacturing", "Packaging", "Shipping"],
    color: "bg-red-500",
    budget: 1000000,
    spent: 973000,
    variance: -27000
  },
  {
    id: "payroll",
    name: "Payroll & Benefits",
    subcategories: ["Salaries", "Benefits", "Contractor Payments", "Bonuses"],
    color: "bg-blue-500",
    budget: 500000,
    spent: 456000,
    variance: -44000
  },
  {
    id: "marketing",
    name: "Marketing & Advertising",
    subcategories: ["Digital Ads", "Content Creation", "Events", "Influencer Marketing"],
    color: "bg-purple-500",
    budget: 150000,
    spent: 156780,
    variance: 6780
  },
  {
    id: "operations",
    name: "Operations",
    subcategories: ["Rent", "Utilities", "Office Supplies", "Equipment"],
    color: "bg-green-500",
    budget: 100000,
    spent: 89500,
    variance: -10500
  },
  {
    id: "technology",
    name: "Technology",
    subcategories: ["Software", "Hardware", "Cloud Services", "Development"],
    color: "bg-yellow-500",
    budget: 75000,
    spent: 67800,
    variance: -7200
  },
  {
    id: "professional",
    name: "Professional Services",
    subcategories: ["Legal", "Accounting", "Consulting", "Audit"],
    color: "bg-orange-500",
    budget: 50000,
    spent: 45600,
    variance: -4400
  }
];

// Recent Expenses
const recentExpenses = [
  {
    id: "EXP-001",
    date: "2024-01-15",
    vendor: "Stevia Suppliers Ltd",
    description: "Raw materials - Stevia extract",
    category: "Cost of Goods Sold",
    subcategory: "Raw Materials",
    amount: 89500,
    status: "approved",
    paymentMethod: "Bank Transfer",
    reference: "PO-2024-001",
    approvedBy: "Althameem Khan",
    tags: ["raw-materials", "inventory", "stevia"]
  },
  {
    id: "EXP-002",
    date: "2024-01-15",
    vendor: "Google India",
    description: "Digital advertising - January campaign",
    category: "Marketing & Advertising",
    subcategory: "Digital Ads",
    amount: 15680,
    status: "paid",
    paymentMethod: "Credit Card",
    reference: "INV-GOO-001",
    approvedBy: "Marketing Manager",
    tags: ["marketing", "ads", "google"]
  },
  {
    id: "EXP-003",
    date: "2024-01-14",
    vendor: "TallyPrime",
    description: "Accounting software subscription",
    category: "Technology",
    subcategory: "Software",
    amount: 2999,
    status: "paid",
    paymentMethod: "Credit Card",
    reference: "SUB-TALLY-2024",
    approvedBy: "IT Manager",
    tags: ["software", "accounting", "subscription"]
  },
  {
    id: "EXP-004",
    date: "2024-01-14",
    vendor: "Property Management Co.",
    description: "Office rent - January 2024",
    category: "Operations",
    subcategory: "Rent",
    amount: 35000,
    status: "paid",
    paymentMethod: "Bank Transfer",
    reference: "RENT-JAN-2024",
    approvedBy: "Admin Manager",
    tags: ["rent", "office", "monthly"]
  },
  {
    id: "EXP-005",
    date: "2024-01-13",
    vendor: "Legal Associates",
    description: "Legal consultation - compliance review",
    category: "Professional Services",
    subcategory: "Legal",
    amount: 12500,
    status: "pending",
    paymentMethod: "Bank Transfer",
    reference: "LEG-CON-001",
    approvedBy: "CEO",
    tags: ["legal", "compliance", "consultation"]
  }
];

// Expense Summary
const expenseSummary = {
  totalBudget: 1875000,
  totalSpent: 1789180,
  remainingBudget: 85820,
  budgetUtilization: 95.4,
  monthlyAverage: 179918,
  yearToDateSpent: 1789180,
  projectedAnnual: 21470160,
  topCategory: "Cost of Goods Sold",
  topCategoryAmount: 973000,
  pendingApprovals: 2,
  pendingAmount: 45600
};

// Helper Functions
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "paid":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return CheckCircle;
    case "paid":
      return CheckCircle;
    case "pending":
      return Clock;
    case "rejected":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

const getBudgetVarianceColor = (variance: number) => {
  if (variance > 0) return "text-red-600"; // Over budget
  return "text-green-600"; // Under budget
};

const getBudgetUtilizationColor = (utilization: number) => {
  if (utilization > 90) return "text-red-600";
  if (utilization > 75) return "text-yellow-600";
  return "text-green-600";
};

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Filter expenses
  const filteredExpenses = recentExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || expense.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Expense Management
              </h1>
              <p className="text-lg text-gray-600">
                Track, categorize, and manage all business expenses
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
                onClick={() => setShowAddExpense(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </button>
            </div>
          </div>
        </div>

        {/* Expense Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenseSummary.totalBudget)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <Receipt className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(expenseSummary.totalSpent)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Remaining Budget</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(expenseSummary.remainingBudget)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Budget Utilization</p>
                <p className={`text-2xl font-bold ${getBudgetUtilizationColor(expenseSummary.budgetUtilization)}`}>
                  {expenseSummary.budgetUtilization}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget vs Actual by Category */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
              Budget vs Actual by Category
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
              View detailed breakdown
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {expenseCategories.map((category) => {
              const utilizationPercent = (category.spent / category.budget) * 100;
              const isOverBudget = category.spent > category.budget;
              
              return (
                <div key={category.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(category.spent)}</span>
                      <span className={`text-xs ml-2 ${getBudgetVarianceColor(category.variance)}`}>
                        {category.variance > 0 ? '+' : ''}{formatCurrency(category.variance)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Budget: {formatCurrency(category.budget)}</span>
                      <span>{utilizationPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isOverBudget ? 'bg-red-500' : category.color
                        }`}
                        style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                      ></div>
                      {isOverBudget && (
                        <div className="w-full bg-red-200 rounded-full h-1 -mt-1">
                          <div 
                            className="bg-red-600 h-1 rounded-full"
                            style={{ width: `${((category.spent - category.budget) / category.budget) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map((sub, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {expenseCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Expenses ({filteredExpenses.length} expenses)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
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
                {filteredExpenses.map((expense) => {
                  const StatusIcon = getStatusIcon(expense.status);
                  
                  return (
                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Receipt className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {expense.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              Vendor: {expense.vendor}
                            </div>
                            <div className="text-xs text-blue-600">
                              Ref: {expense.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{expense.category}</div>
                        <div className="text-sm text-gray-500">{expense.subcategory}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {expense.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-red-600">{formatCurrency(expense.amount)}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {expense.status}
                        </span>
                        {expense.approvedBy && (
                          <div className="text-xs text-gray-500 mt-1">
                            By: {expense.approvedBy}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {expense.paymentMethod === 'Credit Card' ? (
                            <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                          ) : expense.paymentMethod === 'Bank Transfer' ? (
                            <Building2 className="h-4 w-4 mr-2 text-purple-600" />
                          ) : (
                            <Banknote className="h-4 w-4 mr-2 text-green-600" />
                          )}
                          <span className="text-sm text-gray-900">{expense.paymentMethod}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{expense.date}</div>
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
          
          {filteredExpenses.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No expenses found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

