"use client";

import { 
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  FileText,
  DollarSign,
  Percent,
  Activity,
  Target,
  Users,
  Package,
  CreditCard,
  Building2,
  Eye,
  RefreshCw,
  Share2,
  Printer,
  Mail,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  Star,
  Award,
  Calculator,
  Receipt,
  Banknote
} from "lucide-react";
import { useState } from "react";

// P&L Statement Data
const profitLossData = {
  period: "January 2024",
  revenue: {
    salesRevenue: 2456800,
    otherIncome: 45600,
    totalRevenue: 2502400
  },
  costOfGoodsSold: {
    rawMaterials: 658920,
    manufacturing: 156780,
    packaging: 89500,
    shipping: 67800,
    totalCOGS: 973000
  },
  grossProfit: 1529400,
  grossProfitMargin: 61.1,
  operatingExpenses: {
    salariesBenefits: 456000,
    rentUtilities: 89500,
    marketing: 156780,
    technology: 67800,
    professional: 45600,
    insurance: 23400,
    other: 34500,
    totalOpEx: 873580
  },
  ebitda: 655820,
  ebitdaMargin: 26.2,
  depreciation: 45600,
  ebit: 610220,
  interestExpense: 12500,
  profitBeforeTax: 597720,
  incomeTax: 149430, // 25%
  netProfit: 448290,
  netProfitMargin: 17.9
};

// Cash Flow Statement Data
const cashFlowData = {
  operatingActivities: {
    netProfit: 448290,
    depreciation: 45600,
    accountsReceivableChange: -89500,
    inventoryChange: -67800,
    accountsPayableChange: 34500,
    otherWorkingCapital: -23400,
    netOperatingCashFlow: 347690
  },
  investingActivities: {
    equipmentPurchase: -125000,
    softwarePurchase: -34500,
    netInvestingCashFlow: -159500
  },
  financingActivities: {
    loanRepayment: -45600,
    dividendPaid: 0,
    netFinancingCashFlow: -45600
  },
  netCashFlow: 142590,
  beginningCash: 1103090,
  endingCash: 1245680
};

// Balance Sheet Data
const balanceSheetData = {
  assets: {
    currentAssets: {
      cash: 1245680,
      accountsReceivable: 456780,
      inventory: 234560,
      prepaidExpenses: 45600,
      totalCurrentAssets: 1982620
    },
    fixedAssets: {
      equipment: 567800,
      accumulatedDepreciation: -123400,
      software: 89500,
      totalFixedAssets: 533900
    },
    totalAssets: 2516520
  },
  liabilities: {
    currentLiabilities: {
      accountsPayable: 234560,
      accruedExpenses: 67800,
      shortTermDebt: 45600,
      totalCurrentLiabilities: 347960
    },
    longTermLiabilities: {
      longTermDebt: 156780,
      totalLongTermLiabilities: 156780
    },
    totalLiabilities: 504740
  },
  equity: {
    paidUpCapital: 1500000,
    retainedEarnings: 511780,
    totalEquity: 2011780
  }
};

// Financial Ratios
const financialRatios = {
  profitability: [
    { name: "Gross Profit Margin", value: 61.1, unit: "%", benchmark: 65, status: "good" },
    { name: "Net Profit Margin", value: 17.9, unit: "%", benchmark: 15, status: "excellent" },
    { name: "EBITDA Margin", value: 26.2, unit: "%", benchmark: 25, status: "excellent" },
    { name: "Return on Assets", value: 28.7, unit: "%", benchmark: 20, status: "excellent" }
  ],
  liquidity: [
    { name: "Current Ratio", value: 5.7, unit: ":1", benchmark: 2, status: "excellent" },
    { name: "Quick Ratio", value: 4.9, unit: ":1", benchmark: 1.5, status: "excellent" },
    { name: "Cash Ratio", value: 3.6, unit: ":1", benchmark: 1, status: "excellent" },
    { name: "Working Capital", value: 1634660, unit: "₹", benchmark: 1000000, status: "excellent" }
  ],
  efficiency: [
    { name: "Asset Turnover", value: 1.2, unit: "x", benchmark: 1.5, status: "average" },
    { name: "Inventory Turnover", value: 4.1, unit: "x", benchmark: 6, status: "average" },
    { name: "Receivables Turnover", value: 5.4, unit: "x", benchmark: 8, status: "average" },
    { name: "Payables Turnover", value: 10.5, unit: "x", benchmark: 12, status: "good" }
  ],
  leverage: [
    { name: "Debt to Equity", value: 0.25, unit: ":1", benchmark: 0.5, status: "excellent" },
    { name: "Debt to Assets", value: 0.2, unit: ":1", benchmark: 0.3, status: "excellent" },
    { name: "Interest Coverage", value: 48.8, unit: "x", benchmark: 5, status: "excellent" },
    { name: "Equity Ratio", value: 79.9, unit: "%", benchmark: 60, status: "excellent" }
  ]
};

// Expense Analysis
const expenseAnalysis = [
  { category: "Cost of Goods Sold", amount: 973000, percentage: 38.9, growth: 12.5, color: "bg-red-500" },
  { category: "Salaries & Benefits", amount: 456000, percentage: 18.2, growth: 8.3, color: "bg-blue-500" },
  { category: "Marketing", amount: 156780, percentage: 6.3, growth: 25.6, color: "bg-purple-500" },
  { category: "Rent & Utilities", amount: 89500, percentage: 3.6, growth: 3.2, color: "bg-green-500" },
  { category: "Technology", amount: 67800, percentage: 2.7, growth: 15.8, color: "bg-yellow-500" },
  { category: "Professional Services", amount: 45600, percentage: 1.8, growth: -5.2, color: "bg-orange-500" },
  { category: "Other Expenses", amount: 57900, percentage: 2.3, growth: 7.8, color: "bg-gray-500" }
];

// Revenue Analysis
const revenueAnalysis = [
  { source: "Online Sales", amount: 1478080, percentage: 60.1, growth: 18.5, color: "bg-blue-500" },
  { source: "B2B Sales", amount: 736200, percentage: 29.9, growth: 12.3, color: "bg-green-500" },
  { source: "Subscription Revenue", amount: 196320, percentage: 8.0, growth: 35.6, color: "bg-purple-500" },
  { source: "Other Income", amount: 49200, percentage: 2.0, growth: 8.9, color: "bg-orange-500" }
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

const getRatioStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "text-green-600 bg-green-100";
    case "good":
      return "text-blue-600 bg-blue-100";
    case "average":
      return "text-yellow-600 bg-yellow-100";
    case "poor":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getRatioStatusIcon = (status: string) => {
  switch (status) {
    case "excellent":
      return CheckCircle;
    case "good":
      return CheckCircle;
    case "average":
      return Clock;
    case "poor":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("profit-loss");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Financial Reports & Analytics
              </h1>
              <p className="text-lg text-gray-600">
                Comprehensive financial statements and business intelligence
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                January 2024
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export All
              </button>
            </div>
          </div>
        </div>

        {/* Report Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "profit-loss", name: "P&L Statement", icon: BarChart3 },
                { id: "cash-flow", name: "Cash Flow", icon: Activity },
                { id: "balance-sheet", name: "Balance Sheet", icon: Building2 },
                { id: "ratios", name: "Financial Ratios", icon: Calculator },
                { id: "analysis", name: "Expense Analysis", icon: PieChart }
              ].map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    selectedReport === report.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <report.icon className="h-4 w-4 mr-2" />
                  {report.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Report Content */}
          <div className="p-6">
            {selectedReport === "profit-loss" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Profit & Loss Statement</h3>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <FileText className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Revenue Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Revenue</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sales Revenue</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.revenue.salesRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Other Income</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.revenue.otherIncome)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total Revenue</span>
                          <span className="text-green-600">{formatCurrency(profitLossData.revenue.totalRevenue)}</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-6">Cost of Goods Sold</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Raw Materials</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.costOfGoodsSold.rawMaterials)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Manufacturing</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.costOfGoodsSold.manufacturing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Packaging</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.costOfGoodsSold.packaging)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.costOfGoodsSold.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total COGS</span>
                          <span className="text-red-600">{formatCurrency(profitLossData.costOfGoodsSold.totalCOGS)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between font-bold text-xl bg-white p-4 rounded-lg">
                        <span>Gross Profit</span>
                        <span className="text-green-600">{formatCurrency(profitLossData.grossProfit)} ({profitLossData.grossProfitMargin}%)</span>
                      </div>
                    </div>

                    {/* Expenses & Net Profit */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Operating Expenses</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Salaries & Benefits</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.salariesBenefits)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rent & Utilities</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.rentUtilities)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Marketing</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.marketing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Technology</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.technology)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Professional Services</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.professional)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Other Expenses</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.operatingExpenses.other)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total OpEx</span>
                          <span className="text-red-600">{formatCurrency(profitLossData.operatingExpenses.totalOpEx)}</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-white p-4 rounded-lg">
                        <div className="flex justify-between font-semibold">
                          <span>EBITDA</span>
                          <span className="text-blue-600">{formatCurrency(profitLossData.ebitda)} ({profitLossData.ebitdaMargin}%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciation</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.depreciation)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>EBIT</span>
                          <span className="text-purple-600">{formatCurrency(profitLossData.ebit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Expense</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.interestExpense)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Profit Before Tax</span>
                          <span className="text-orange-600">{formatCurrency(profitLossData.profitBeforeTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Income Tax</span>
                          <span className="font-semibold">{formatCurrency(profitLossData.incomeTax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl border-t pt-2">
                          <span>Net Profit</span>
                          <span className="text-green-600">{formatCurrency(profitLossData.netProfit)} ({profitLossData.netProfitMargin}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === "cash-flow" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Cash Flow Statement</h3>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <FileText className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Operating Activities */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Operating Activities
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Profit</span>
                        <span className="font-semibold text-green-600">{formatCurrency(cashFlowData.operatingActivities.netProfit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Depreciation</span>
                        <span className="font-semibold">{formatCurrency(cashFlowData.operatingActivities.depreciation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">A/R Change</span>
                        <span className="font-semibold text-red-600">{formatCurrency(cashFlowData.operatingActivities.accountsReceivableChange)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inventory Change</span>
                        <span className="font-semibold text-red-600">{formatCurrency(cashFlowData.operatingActivities.inventoryChange)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">A/P Change</span>
                        <span className="font-semibold text-green-600">{formatCurrency(cashFlowData.operatingActivities.accountsPayableChange)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Net Operating Cash Flow</span>
                        <span className="text-green-600">{formatCurrency(cashFlowData.operatingActivities.netOperatingCashFlow)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investing Activities */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Investing Activities
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipment Purchase</span>
                        <span className="font-semibold text-red-600">{formatCurrency(cashFlowData.investingActivities.equipmentPurchase)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Software Purchase</span>
                        <span className="font-semibold text-red-600">{formatCurrency(cashFlowData.investingActivities.softwarePurchase)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Net Investing Cash Flow</span>
                        <span className="text-red-600">{formatCurrency(cashFlowData.investingActivities.netInvestingCashFlow)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financing Activities */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Financing Activities
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Repayment</span>
                        <span className="font-semibold text-red-600">{formatCurrency(cashFlowData.financingActivities.loanRepayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dividend Paid</span>
                        <span className="font-semibold">{formatCurrency(cashFlowData.financingActivities.dividendPaid)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Net Financing Cash Flow</span>
                        <span className="text-red-600">{formatCurrency(cashFlowData.financingActivities.netFinancingCashFlow)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Cash Flow Summary */}
                <div className="mt-6 bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Beginning Cash</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(cashFlowData.beginningCash)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Net Cash Flow</p>
                      <p className={`text-2xl font-bold ${cashFlowData.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.netCashFlow)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Ending Cash</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(cashFlowData.endingCash)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === "ratios" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Financial Ratios Analysis</h3>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <FileText className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profitability Ratios */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Profitability Ratios
                    </h4>
                    <div className="space-y-4">
                      {financialRatios.profitability.map((ratio, index) => {
                        const StatusIcon = getRatioStatusIcon(ratio.status);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{ratio.name}</p>
                              <p className="text-sm text-gray-500">Benchmark: {ratio.benchmark}{ratio.unit}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{ratio.value}{ratio.unit}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRatioStatusColor(ratio.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {ratio.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Liquidity Ratios */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Liquidity Ratios
                    </h4>
                    <div className="space-y-4">
                      {financialRatios.liquidity.map((ratio, index) => {
                        const StatusIcon = getRatioStatusIcon(ratio.status);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{ratio.name}</p>
                              <p className="text-sm text-gray-500">
                                Benchmark: {ratio.unit === "₹" ? formatCurrency(ratio.benchmark) : `${ratio.benchmark}${ratio.unit}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                {ratio.unit === "₹" ? formatCurrency(ratio.value) : `${ratio.value}${ratio.unit}`}
                              </p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRatioStatusColor(ratio.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {ratio.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Efficiency Ratios */}
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Efficiency Ratios
                    </h4>
                    <div className="space-y-4">
                      {financialRatios.efficiency.map((ratio, index) => {
                        const StatusIcon = getRatioStatusIcon(ratio.status);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{ratio.name}</p>
                              <p className="text-sm text-gray-500">Benchmark: {ratio.benchmark}{ratio.unit}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{ratio.value}{ratio.unit}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRatioStatusColor(ratio.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {ratio.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Leverage Ratios */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Leverage Ratios
                    </h4>
                    <div className="space-y-4">
                      {financialRatios.leverage.map((ratio, index) => {
                        const StatusIcon = getRatioStatusIcon(ratio.status);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{ratio.name}</p>
                              <p className="text-sm text-gray-500">Benchmark: {ratio.benchmark}{ratio.unit}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{ratio.value}{ratio.unit}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRatioStatusColor(ratio.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {ratio.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === "analysis" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Revenue & Expense Analysis</h3>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <FileText className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Analysis */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                      Revenue Breakdown
                    </h4>
                    <div className="space-y-4">
                      {revenueAnalysis.map((source, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${source.color}`}></div>
                              <span className="font-medium text-gray-900">{source.source}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gray-900">{formatCurrency(source.amount)}</span>
                              <span className={`text-xs ml-2 ${source.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {source.growth > 0 ? '+' : ''}{source.growth}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${source.color}`}
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {source.percentage}% of total revenue
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expense Analysis */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Receipt className="h-5 w-5 mr-2 text-red-500" />
                      Expense Breakdown
                    </h4>
                    <div className="space-y-4">
                      {expenseAnalysis.map((expense, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${expense.color}`}></div>
                              <span className="font-medium text-gray-900">{expense.category}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gray-900">{formatCurrency(expense.amount)}</span>
                              <span className={`text-xs ml-2 ${expense.growth > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {expense.growth > 0 ? '+' : ''}{expense.growth}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${expense.color}`}
                              style={{ width: `${expense.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {expense.percentage}% of total expenses
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

