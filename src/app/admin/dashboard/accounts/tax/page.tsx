"use client";

import { 
  Calculator,
  Receipt,
  FileText,
  Calendar,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Bell,
  Archive,
  ExternalLink,
  Info,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Star,
  Award,
  Shield,
  Landmark
} from "lucide-react";
import { useState } from "react";

// GST Returns Data
const gstReturns = [
  {
    id: "GSTR-2024-01",
    period: "January 2024",
    type: "GSTR-3B",
    dueDate: "2024-02-20",
    filedDate: null,
    status: "pending",
    taxableValue: 2456800,
    cgst: 220812,
    sgst: 220812,
    igst: 0,
    totalTax: 441624,
    itc: 78450,
    netTax: 363174,
    late: false,
    penalty: 0
  },
  {
    id: "GSTR-2023-12",
    period: "December 2023",
    type: "GSTR-3B",
    dueDate: "2024-01-20",
    filedDate: "2024-01-18",
    status: "filed",
    taxableValue: 2100000,
    cgst: 189000,
    sgst: 189000,
    igst: 0,
    totalTax: 378000,
    itc: 67500,
    netTax: 310500,
    late: false,
    penalty: 0
  },
  {
    id: "GSTR-2023-11",
    period: "November 2023",
    type: "GSTR-3B",
    dueDate: "2023-12-20",
    filedDate: "2023-12-22",
    status: "filed",
    taxableValue: 1890000,
    cgst: 170100,
    sgst: 170100,
    igst: 0,
    totalTax: 340200,
    itc: 60750,
    netTax: 279450,
    late: true,
    penalty: 2500
  },
  {
    id: "GSTR-2023-10",
    period: "October 2023",
    type: "GSTR-3B",
    dueDate: "2023-11-20",
    filedDate: "2023-11-15",
    status: "filed",
    taxableValue: 1750000,
    cgst: 157500,
    sgst: 157500,
    igst: 0,
    totalTax: 315000,
    itc: 56250,
    netTax: 258750,
    late: false,
    penalty: 0
  }
];

// Income Tax Data
const incomeTaxData = {
  assessmentYear: "2024-25",
  financialYear: "2023-24",
  estimatedIncome: 8500000,
  taxableIncome: 8500000,
  incomeTax: 2125000, // 25% corporate tax
  surcharge: 212500, // 10% on tax
  cess: 85000, // 4% on tax + surcharge
  totalTax: 2422500,
  advanceTaxPaid: 1815000, // 75% paid
  tdsDeducted: 125000,
  selfAssessmentTax: 482500,
  refundDue: 0,
  quarterlyPayments: [
    { quarter: "Q1 (Jun 2023)", dueDate: "2023-06-15", amount: 605625, paid: true, paidDate: "2023-06-10" },
    { quarter: "Q2 (Sep 2023)", dueDate: "2023-09-15", amount: 605625, paid: true, paidDate: "2023-09-12" },
    { quarter: "Q3 (Dec 2023)", dueDate: "2023-12-15", amount: 605625, paid: true, paidDate: "2023-12-14" },
    { quarter: "Q4 (Mar 2024)", dueDate: "2024-03-15", amount: 605625, paid: false, paidDate: null }
  ]
};

// TDS Data
const tdsData = [
  {
    id: "TDS-2024-01",
    month: "January 2024",
    section: "194C",
    description: "Payment to Contractors",
    grossAmount: 125000,
    tdsRate: 1,
    tdsAmount: 1250,
    deposited: true,
    depositDate: "2024-02-07",
    challanNumber: "CHL-240207-001"
  },
  {
    id: "TDS-2024-02",
    month: "January 2024",
    section: "194J",
    description: "Professional Services",
    grossAmount: 89000,
    tdsRate: 10,
    tdsAmount: 8900,
    deposited: true,
    depositDate: "2024-02-07",
    challanNumber: "CHL-240207-002"
  },
  {
    id: "TDS-2024-03",
    month: "January 2024",
    section: "194I",
    description: "Rent Payment",
    grossAmount: 35000,
    tdsRate: 10,
    tdsAmount: 3500,
    deposited: false,
    depositDate: null,
    challanNumber: null
  }
];

// Tax Summary
const taxSummary = {
  currentMonthGST: 441624,
  gstGrowth: 16.8,
  currentQuarterIncomeTax: 605625,
  incomeTaxGrowth: 12.5,
  totalTDSCollected: 13650,
  tdsGrowth: 8.2,
  complianceScore: 92,
  pendingReturns: 1,
  overduePayments: 0,
  upcomingDueDates: 2
};

// Tax Rates
const taxRates = {
  gst: {
    standard: 18,
    reduced: 5,
    zero: 0,
    exempt: 0
  },
  incomeTax: {
    corporate: 25,
    surcharge: 10,
    cess: 4
  },
  tds: {
    "194C": 1, // Contractors
    "194J": 10, // Professional Services
    "194I": 10, // Rent
    "194H": 5, // Commission
    "194A": 10 // Interest
  }
};

// Helper Functions
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "filed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "draft":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "filed":
      return CheckCircle;
    case "pending":
      return Clock;
    case "overdue":
      return AlertTriangle;
    case "draft":
      return FileText;
    default:
      return XCircle;
  }
};

const calculateDaysUntilDue = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getComplianceColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-yellow-600";
  return "text-red-600";
};

export default function TaxPage() {
  const [selectedTab, setSelectedTab] = useState("gst");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Tax Management & Compliance
              </h1>
              <p className="text-lg text-gray-600">
                GST, Income Tax, TDS management and compliance tracking
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Calendar className="mr-2 h-4 w-4" />
                FY 2023-24
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Calculator className="mr-2 h-4 w-4" />
                Tax Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Tax Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <Receipt className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{taxSummary.gstGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">GST Liability</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(taxSummary.currentMonthGST)}</p>
              <p className="text-xs text-gray-500">Current month</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{taxSummary.incomeTaxGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Income Tax</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(taxSummary.currentQuarterIncomeTax)}</p>
              <p className="text-xs text-gray-500">Quarterly advance</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{taxSummary.tdsGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">TDS Collected</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(taxSummary.totalTDSCollected)}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center text-sm font-medium ${getComplianceColor(taxSummary.complianceScore)}`}>
                <Award className="h-4 w-4 mr-1" />
                {taxSummary.complianceScore}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Compliance Score</p>
              <p className={`text-3xl font-bold mb-2 ${getComplianceColor(taxSummary.complianceScore)}`}>
                {taxSummary.complianceScore}/100
              </p>
              <p className="text-xs text-gray-500">Overall rating</p>
            </div>
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-500" />
              Tax Compliance Alerts
            </h3>
            <span className="text-sm text-gray-500">Updated: 2 hours ago</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-l-4 border-l-yellow-500 bg-yellow-50">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mt-0.5 mr-3 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">GSTR-3B Due Soon</p>
                  <p className="text-xs text-gray-500 mt-1">January 2024 return due in 5 days</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border-l-4 border-l-red-500 bg-red-50">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mt-0.5 mr-3 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">TDS Payment Pending</p>
                  <p className="text-xs text-gray-500 mt-1">₹3,500 TDS deposit pending</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border-l-4 border-l-blue-500 bg-blue-50">
              <div className="flex items-start">
                <Info className="h-5 w-5 mt-0.5 mr-3 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Advance Tax Due</p>
                  <p className="text-xs text-gray-500 mt-1">Q4 payment due March 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "gst", name: "GST Returns", icon: Receipt },
                { id: "income-tax", name: "Income Tax", icon: Building2 },
                { id: "tds", name: "TDS Management", icon: Users },
                { id: "calculator", name: "Tax Calculator", icon: Calculator }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    selectedTab === tab.id
                      ? "border-red-500 text-red-600"
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
          <div className="p-6">
            {selectedTab === "gst" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">GST Returns Management</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    File New Return
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taxable Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Liability
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Tax
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {gstReturns.map((gstReturn) => {
                        const StatusIcon = getStatusIcon(gstReturn.status);
                        const daysUntilDue = calculateDaysUntilDue(gstReturn.dueDate);
                        
                        return (
                          <tr key={gstReturn.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{gstReturn.period}</div>
                              <div className="text-sm text-gray-500">{gstReturn.type}</div>
                              {gstReturn.late && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                                  Late Filed
                                </span>
                              )}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(gstReturn.taxableValue)}</div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(gstReturn.totalTax)}</div>
                              <div className="text-xs text-gray-500">
                                CGST: {formatCurrency(gstReturn.cgst)} | SGST: {formatCurrency(gstReturn.sgst)}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(gstReturn.netTax)}</div>
                              <div className="text-xs text-gray-500">ITC: {formatCurrency(gstReturn.itc)}</div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(gstReturn.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {gstReturn.status}
                              </span>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{gstReturn.dueDate}</div>
                              {gstReturn.status === 'pending' && (
                                <div className={`text-xs ${daysUntilDue <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                                  {daysUntilDue > 0 ? `${daysUntilDue} days left` : `${Math.abs(daysUntilDue)} days overdue`}
                                </div>
                              )}
                              {gstReturn.filedDate && (
                                <div className="text-xs text-green-600">Filed: {gstReturn.filedDate}</div>
                              )}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                                  <Download className="h-4 w-4" />
                                </button>
                                {gstReturn.status === 'pending' && (
                                  <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors">
                                    <Upload className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === "income-tax" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Tax Computation */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Tax Computation AY 2024-25</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Income</span>
                        <span className="font-semibold">{formatCurrency(incomeTaxData.estimatedIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxable Income</span>
                        <span className="font-semibold">{formatCurrency(incomeTaxData.taxableIncome)}</span>
                      </div>
                      <hr className="border-gray-300" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Income Tax (25%)</span>
                        <span className="font-semibold">{formatCurrency(incomeTaxData.incomeTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surcharge (10%)</span>
                        <span className="font-semibold">{formatCurrency(incomeTaxData.surcharge)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Health & Education Cess (4%)</span>
                        <span className="font-semibold">{formatCurrency(incomeTaxData.cess)}</span>
                      </div>
                      <hr className="border-gray-300" />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total Tax Liability</span>
                        <span className="text-red-600">{formatCurrency(incomeTaxData.totalTax)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Advance Tax Payments */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Advance Tax Payments</h4>
                    <div className="space-y-4">
                      {incomeTaxData.quarterlyPayments.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{payment.quarter}</div>
                            <div className="text-sm text-gray-500">Due: {payment.dueDate}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                            {payment.paid ? (
                              <div className="text-xs text-green-600">Paid: {payment.paidDate}</div>
                            ) : (
                              <div className="text-xs text-red-600">Pending</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-300">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Advance Tax Paid</span>
                        <span className="font-semibold text-green-600">{formatCurrency(incomeTaxData.advanceTaxPaid)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">TDS Deducted</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(incomeTaxData.tdsDeducted)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Self Assessment Tax</span>
                        <span className="font-semibold text-orange-600">{formatCurrency(incomeTaxData.selfAssessmentTax)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "tds" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">TDS Management</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Add TDS Entry
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Period & Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gross Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          TDS Amount
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
                      {tdsData.map((tds) => (
                        <tr key={tds.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{tds.month}</div>
                            <div className="text-sm text-gray-500">Section {tds.section}</div>
                            <div className="text-xs text-blue-600">{tds.tdsRate}% rate</div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{tds.description}</div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(tds.grossAmount)}</div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-purple-600">{formatCurrency(tds.tdsAmount)}</div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tds.deposited ? (
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Deposited
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                  {tds.depositDate} | {tds.challanNumber}
                                </div>
                              </div>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </span>
                            )}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                              {!tds.deposited && (
                                <button className="text-purple-600 hover:text-purple-900 p-1 rounded-lg hover:bg-purple-50 transition-colors">
                                  <Upload className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === "calculator" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* GST Calculator */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Receipt className="h-5 w-5 mr-2 text-red-500" />
                      GST Calculator
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Exclusive)</label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                          <option value="18">18% (Standard)</option>
                          <option value="5">5% (Reduced)</option>
                          <option value="12">12% (Intermediate)</option>
                          <option value="28">28% (Luxury)</option>
                        </select>
                      </div>
                      <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Calculate GST
                      </button>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between mb-2">
                          <span>CGST (9%)</span>
                          <span className="font-semibold">₹0</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>SGST (9%)</span>
                          <span className="font-semibold">₹0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total Amount</span>
                          <span>₹0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Income Tax Calculator */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-blue-500" />
                      Income Tax Calculator
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
                        <input
                          type="number"
                          placeholder="Enter annual income"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="company">Company (25%)</option>
                          <option value="individual">Individual</option>
                          <option value="partnership">Partnership Firm</option>
                        </select>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Calculate Tax
                      </button>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between mb-2">
                          <span>Income Tax</span>
                          <span className="font-semibold">₹0</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Surcharge</span>
                          <span className="font-semibold">₹0</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Cess</span>
                          <span className="font-semibold">₹0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total Tax</span>
                          <span>₹0</span>
                        </div>
                      </div>
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

