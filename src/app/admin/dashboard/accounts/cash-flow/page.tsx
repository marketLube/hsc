"use client";

import { 
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  CreditCard,
  Banknote,
  RefreshCw,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Package,
  Receipt,
  FileText,
  Zap,
  Star,
  Award,
  Percent,
  Calculator
} from "lucide-react";
import { useState } from "react";

// Cash Flow Data
const cashFlowData = {
  currentMonth: {
    openingBalance: 1103090,
    totalInflows: 2567890,
    totalOutflows: 1862438,
    netCashFlow: 705452,
    closingBalance: 1808542,
    cashFlowGrowth: 18.9
  },
  inflows: [
    { source: "Sales Revenue", amount: 2456800, percentage: 95.7, growth: 15.8 },
    { source: "Interest Income", amount: 45600, percentage: 1.8, growth: 8.2 },
    { source: "Other Income", amount: 34890, percentage: 1.4, growth: 12.5 },
    { source: "Loan Proceeds", amount: 30600, percentage: 1.1, growth: 0 }
  ],
  outflows: [
    { category: "Cost of Goods Sold", amount: 973000, percentage: 52.2, growth: 12.5 },
    { category: "Payroll & Benefits", amount: 456000, percentage: 24.5, growth: 8.3 },
    { category: "Marketing", amount: 156780, percentage: 8.4, growth: 25.6 },
    { category: "Operations", amount: 89500, percentage: 4.8, growth: 3.2 },
    { category: "Technology", amount: 67800, percentage: 3.6, growth: 15.8 },
    { category: "Professional Services", amount: 45600, percentage: 2.4, growth: -5.2 },
    { category: "Tax Payments", amount: 57600, percentage: 3.1, growth: 18.9 },
    { category: "Other Expenses", amount: 16158, percentage: 0.9, growth: 7.8 }
  ]
};

// Monthly Cash Flow Trend
const monthlyCashFlow = [
  { 
    month: "Jul 2023", 
    inflows: 185000, 
    outflows: 135000, 
    netFlow: 50000, 
    balance: 850000 
  },
  { 
    month: "Aug 2023", 
    inflows: 210000, 
    outflows: 148000, 
    netFlow: 62000, 
    balance: 912000 
  },
  { 
    month: "Sep 2023", 
    inflows: 195000, 
    outflows: 142000, 
    netFlow: 53000, 
    balance: 965000 
  },
  { 
    month: "Oct 2023", 
    inflows: 225000, 
    outflows: 158000, 
    netFlow: 67000, 
    balance: 1032000 
  },
  { 
    month: "Nov 2023", 
    inflows: 280000, 
    outflows: 195000, 
    netFlow: 85000, 
    balance: 1117000 
  },
  { 
    month: "Dec 2023", 
    inflows: 320000, 
    outflows: 218000, 
    netFlow: 102000, 
    balance: 1219000 
  },
  { 
    month: "Jan 2024", 
    inflows: 2567890, 
    outflows: 1862438, 
    netFlow: 705452, 
    balance: 1924452 
  }
];

// Cash Flow Forecast
const cashFlowForecast = [
  { 
    month: "Feb 2024", 
    projectedInflows: 2650000, 
    projectedOutflows: 1950000, 
    projectedNetFlow: 700000,
    projectedBalance: 2624452,
    confidence: 85
  },
  { 
    month: "Mar 2024", 
    projectedInflows: 2800000, 
    projectedOutflows: 2100000, 
    projectedNetFlow: 700000,
    projectedBalance: 3324452,
    confidence: 80
  },
  { 
    month: "Apr 2024", 
    projectedInflows: 2950000, 
    projectedOutflows: 2250000, 
    projectedNetFlow: 700000,
    projectedBalance: 4024452,
    confidence: 75
  },
  { 
    month: "May 2024", 
    projectedInflows: 3100000, 
    projectedOutflows: 2400000, 
    projectedNetFlow: 700000,
    projectedBalance: 4724452,
    confidence: 70
  }
];

// Cash Flow Ratios
const cashFlowRatios = {
  operatingCashFlowRatio: 2.85, // Operating Cash Flow / Current Liabilities
  cashFlowToDebtRatio: 3.48, // Operating Cash Flow / Total Debt
  cashFlowCoverageRatio: 5.67, // Operating Cash Flow / Capital Expenditures
  freeCashFlowYield: 12.4, // Free Cash Flow / Market Value
  cashConversionCycle: 45, // Days
  daysInCash: 89 // Cash / Daily Operating Expenses
};

// Working Capital Components
const workingCapital = {
  currentAssets: {
    cash: 1808542,
    accountsReceivable: 456780,
    inventory: 234560,
    prepaidExpenses: 45600,
    total: 2545482
  },
  currentLiabilities: {
    accountsPayable: 234560,
    accruedExpenses: 67800,
    shortTermDebt: 45600,
    total: 347960
  },
  netWorkingCapital: 2197522,
  workingCapitalRatio: 7.31
};

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

const getCashFlowColor = (amount: number) => {
  return amount >= 0 ? "text-green-600" : "text-red-600";
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return "text-green-600";
  if (confidence >= 70) return "text-yellow-600";
  return "text-red-600";
};

export default function CashFlowPage() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Cash Flow Management
              </h1>
              <p className="text-lg text-gray-600">
                Monitor cash inflows, outflows, and liquidity position
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                January 2024
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Cash Flow Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Banknote className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Opening Balance</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(cashFlowData.currentMonth.openingBalance)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Inflows</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(cashFlowData.currentMonth.totalInflows)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Outflows</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(cashFlowData.currentMonth.totalOutflows)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{cashFlowData.currentMonth.cashFlowGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Net Cash Flow</p>
              <p className={`text-2xl font-bold ${getCashFlowColor(cashFlowData.currentMonth.netCashFlow)}`}>
                {formatCurrency(cashFlowData.currentMonth.netCashFlow)}
              </p>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Overview", icon: Activity },
                { id: "inflows", name: "Cash Inflows", icon: TrendingUp },
                { id: "outflows", name: "Cash Outflows", icon: TrendingDown },
                { id: "forecast", name: "Forecast", icon: Target },
                { id: "ratios", name: "Cash Ratios", icon: Calculator }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    selectedView === view.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <view.icon className="h-4 w-4 mr-2" />
                  {view.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedView === "overview" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Flow Overview</h3>
                
                {/* Cash Flow Trend */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                      Monthly Cash Flow Trend
                    </h4>
                    <div className="space-y-4">
                      {monthlyCashFlow.slice(-6).map((data, index) => (
                        <div key={data.month} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{data.month}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-green-600">In: {formatCurrency(data.inflows)}</span>
                              <span className="text-sm text-red-600">Out: {formatCurrency(data.outflows)}</span>
                              <span className={`text-sm font-bold ${getCashFlowColor(data.netFlow)}`}>
                                Net: {formatCurrency(data.netFlow)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((data.inflows / 3000000) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(data.outflows / 2500000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Working Capital */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-purple-500" />
                      Working Capital Analysis
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Current Assets</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cash & Bank</span>
                            <span className="font-semibold">{formatCurrency(workingCapital.currentAssets.cash)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Accounts Receivable</span>
                            <span className="font-semibold">{formatCurrency(workingCapital.currentAssets.accountsReceivable)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Inventory</span>
                            <span className="font-semibold">{formatCurrency(workingCapital.currentAssets.inventory)}</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total Current Assets</span>
                            <span className="text-green-600">{formatCurrency(workingCapital.currentAssets.total)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Current Liabilities</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Accounts Payable</span>
                            <span className="font-semibold">{formatCurrency(workingCapital.currentLiabilities.accountsPayable)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Accrued Expenses</span>
                            <span className="font-semibold">{formatCurrency(workingCapital.currentLiabilities.accruedExpenses)}</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total Current Liabilities</span>
                            <span className="text-red-600">{formatCurrency(workingCapital.currentLiabilities.total)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">Net Working Capital</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(workingCapital.netWorkingCapital)}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Current Ratio: {workingCapital.workingCapitalRatio.toFixed(2)}:1
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedView === "inflows" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Inflows Analysis</h3>
                <div className="space-y-6">
                  {cashFlowData.inflows.map((inflow, index) => (
                    <div key={index} className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900">{inflow.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{formatCurrency(inflow.amount)}</div>
                          <div className="text-sm text-gray-500">{inflow.percentage}% of total inflows</div>
                        </div>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${inflow.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth vs last month</span>
                        <span className={`font-medium ${inflow.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {inflow.growth >= 0 ? '+' : ''}{inflow.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === "outflows" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Outflows Analysis</h3>
                <div className="space-y-6">
                  {cashFlowData.outflows.map((outflow, index) => (
                    <div key={index} className="bg-red-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          </div>
                          <span className="font-medium text-gray-900">{outflow.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">{formatCurrency(outflow.amount)}</div>
                          <div className="text-sm text-gray-500">{outflow.percentage}% of total outflows</div>
                        </div>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-red-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${outflow.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth vs last month</span>
                        <span className={`font-medium ${outflow.growth >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {outflow.growth >= 0 ? '+' : ''}{outflow.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === "forecast" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Flow Forecast</h3>
                <div className="space-y-6">
                  {cashFlowForecast.map((forecast, index) => (
                    <div key={index} className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Target className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{forecast.month}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getConfidenceColor(forecast.confidence)}`}>
                            {forecast.confidence}% Confidence
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-500">Projected Inflows</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(forecast.projectedInflows)}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-500">Projected Outflows</p>
                          <p className="text-lg font-bold text-red-600">{formatCurrency(forecast.projectedOutflows)}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-500">Net Cash Flow</p>
                          <p className={`text-lg font-bold ${getCashFlowColor(forecast.projectedNetFlow)}`}>
                            {formatCurrency(forecast.projectedNetFlow)}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-500">Ending Balance</p>
                          <p className="text-lg font-bold text-blue-600">{formatCurrency(forecast.projectedBalance)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === "ratios" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Flow Ratios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Operating Cash Flow Ratio</h4>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{cashFlowRatios.operatingCashFlowRatio}</div>
                    <div className="text-sm text-gray-500">Operating CF / Current Liabilities</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Cash Flow to Debt</h4>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Building2 className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">{cashFlowRatios.cashFlowToDebtRatio}</div>
                    <div className="text-sm text-gray-500">Operating CF / Total Debt</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">CF Coverage Ratio</h4>
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{cashFlowRatios.cashFlowCoverageRatio}</div>
                    <div className="text-sm text-gray-500">Operating CF / Capital Expenditures</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Free Cash Flow Yield</h4>
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Percent className="h-4 w-4 text-yellow-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{cashFlowRatios.freeCashFlowYield}%</div>
                    <div className="text-sm text-gray-500">Free CF / Market Value</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Cash Conversion Cycle</h4>
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <RefreshCw className="h-4 w-4 text-orange-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">{cashFlowRatios.cashConversionCycle}</div>
                    <div className="text-sm text-gray-500">Days to convert investment to cash</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Days in Cash</h4>
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Clock className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-2">{cashFlowRatios.daysInCash}</div>
                    <div className="text-sm text-gray-500">Days of operating expenses covered</div>
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
