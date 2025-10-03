"use client";

import { 
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Receipt,
  Mail,
  Phone,
  MapPin,
  Building2,
  CreditCard,
  Banknote,
  RefreshCw,
  ExternalLink,
  Printer,
  Share2,
  Archive,
  Star,
  Tag,
  Calculator,
  Percent
} from "lucide-react";
import { useState } from "react";

// Invoice Data
const invoices = [
  {
    id: "INV-2024-001",
    invoiceNumber: "HSC/2024/001",
    customer: {
      name: "Mumbai Retail Chain",
      email: "orders@mumbairetail.com",
      phone: "+91 98765 43210",
      address: "Shop 15, Market Complex, Mumbai - 400001",
      gst: "27ABCDE1234F1Z5"
    },
    issueDate: "2024-01-10",
    dueDate: "2024-01-25",
    amount: 125000,
    taxAmount: 22500,
    totalAmount: 147500,
    status: "sent",
    paymentStatus: "pending",
    items: [
      { name: "Healthy Sugar Tablets (500 pack)", quantity: 100, rate: 1000, amount: 100000 },
      { name: "Healthy Sugar Syrup (250ml)", quantity: 50, rate: 500, amount: 25000 }
    ],
    notes: "Bulk order for retail distribution",
    terms: "Payment due within 15 days",
    overdue: false,
    daysPending: 5
  },
  {
    id: "INV-2024-002",
    invoiceNumber: "HSC/2024/002",
    customer: {
      name: "Delhi Distributor",
      email: "purchase@delhidist.com",
      phone: "+91 98765 43211",
      address: "Warehouse 12, Industrial Area, Delhi - 110001",
      gst: "07FGHIJ5678K2L6"
    },
    issueDate: "2024-01-08",
    dueDate: "2024-01-23",
    amount: 89500,
    taxAmount: 16110,
    totalAmount: 105610,
    status: "sent",
    paymentStatus: "pending",
    items: [
      { name: "Healthy Sugar Powder (250g)", quantity: 150, rate: 400, amount: 60000 },
      { name: "Healthy Sugar Sachets (120 pack)", quantity: 50, rate: 590, amount: 29500 }
    ],
    notes: "Regular monthly order",
    terms: "Payment due within 15 days",
    overdue: false,
    daysPending: 7
  },
  {
    id: "INV-2023-456",
    invoiceNumber: "HSC/2023/456",
    customer: {
      name: "Bangalore Supermarket",
      email: "accounts@blrsupermarket.com",
      phone: "+91 98765 43212",
      address: "Store Complex, MG Road, Bangalore - 560001",
      gst: "29KLMNO9012P3Q7"
    },
    issueDate: "2023-12-25",
    dueDate: "2024-01-10",
    amount: 67800,
    taxAmount: 12204,
    totalAmount: 80004,
    status: "sent",
    paymentStatus: "overdue",
    items: [
      { name: "Healthy Sugar Tablets (200 pack)", quantity: 80, rate: 550, amount: 44000 },
      { name: "Healthy Sugar Syrup (100ml)", quantity: 60, rate: 400, amount: 24000 }
    ],
    notes: "Year-end stock replenishment",
    terms: "Payment due within 15 days",
    overdue: true,
    daysPending: 20
  },
  {
    id: "INV-2023-445",
    invoiceNumber: "HSC/2023/445",
    customer: {
      name: "Chennai Wholesaler",
      email: "orders@chennaiwholesale.com",
      phone: "+91 98765 43213",
      address: "Wholesale Market, T. Nagar, Chennai - 600017",
      gst: "33PQRST3456U4V8"
    },
    issueDate: "2023-12-20",
    dueDate: "2024-01-05",
    amount: 45600,
    taxAmount: 8208,
    totalAmount: 53808,
    status: "sent",
    paymentStatus: "overdue",
    items: [
      { name: "Healthy Sugar Powder (100g)", quantity: 120, rate: 300, amount: 36000 },
      { name: "Healthy Sugar Sachets (60 pack)", quantity: 20, rate: 480, amount: 9600 }
    ],
    notes: "Festival season order",
    terms: "Payment due within 15 days",
    overdue: true,
    daysPending: 25
  },
  {
    id: "INV-2024-003",
    invoiceNumber: "HSC/2024/003",
    customer: {
      name: "Pune Health Store",
      email: "billing@punehealthstore.com",
      phone: "+91 98765 43214",
      address: "Health Plaza, FC Road, Pune - 411005",
      gst: "27UVWXY7890Z5A9"
    },
    issueDate: "2024-01-12",
    dueDate: "2024-01-27",
    amount: 78900,
    taxAmount: 14202,
    totalAmount: 93102,
    status: "draft",
    paymentStatus: "pending",
    items: [
      { name: "Healthy Sugar Tablets (100 pack)", quantity: 100, rate: 300, amount: 30000 },
      { name: "Healthy Sugar Syrup (250ml)", quantity: 90, rate: 543, amount: 48900 }
    ],
    notes: "New customer - health store chain",
    terms: "Payment due within 15 days",
    overdue: false,
    daysPending: 0
  },
  {
    id: "INV-2024-004",
    invoiceNumber: "HSC/2024/004",
    customer: {
      name: "Hyderabad Medical Supplies",
      email: "procurement@hydmedical.com",
      phone: "+91 98765 43215",
      address: "Medical Complex, Secunderabad - 500003",
      gst: "36BCDEF2345G6H0"
    },
    issueDate: "2024-01-14",
    dueDate: "2024-01-29",
    amount: 156700,
    taxAmount: 28206,
    totalAmount: 184906,
    status: "sent",
    paymentStatus: "paid",
    items: [
      { name: "Healthy Sugar Tablets (500 pack)", quantity: 80, rate: 1000, amount: 80000 },
      { name: "Healthy Sugar Powder (250g)", quantity: 120, rate: 400, amount: 48000 },
      { name: "Healthy Sugar Syrup (100ml)", quantity: 70, rate: 410, amount: 28700 }
    ],
    notes: "Medical distribution order",
    terms: "Payment due within 15 days",
    overdue: false,
    daysPending: 0,
    paidDate: "2024-01-16",
    paidAmount: 184906
  }
];

// Invoice Summary
const invoiceSummary = {
  totalInvoices: invoices.length,
  totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
  paidAmount: invoices.filter(inv => inv.paymentStatus === 'paid').reduce((sum, inv) => sum + inv.totalAmount, 0),
  pendingAmount: invoices.filter(inv => inv.paymentStatus === 'pending').reduce((sum, inv) => sum + inv.totalAmount, 0),
  overdueAmount: invoices.filter(inv => inv.paymentStatus === 'overdue').reduce((sum, inv) => sum + inv.totalAmount, 0),
  draftCount: invoices.filter(inv => inv.status === 'draft').length,
  sentCount: invoices.filter(inv => inv.status === 'sent').length,
  paidCount: invoices.filter(inv => inv.paymentStatus === 'paid').length,
  overdueCount: invoices.filter(inv => inv.paymentStatus === 'overdue').length
};

// Helper Functions
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800";
    case "sent":
      return "bg-blue-100 text-blue-800";
    case "viewed":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "partial":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
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

const getDaysOverdue = (dueDate: string, paymentStatus: string) => {
  if (paymentStatus !== 'overdue') return 0;
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === "all" || invoice.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Invoice Management
              </h1>
              <p className="text-lg text-gray-600">
                Create, manage, and track all your business invoices
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
                onClick={() => setShowCreateInvoice(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{invoiceSummary.totalInvoices}</p>
                <p className="text-xs text-gray-400">{formatCurrency(invoiceSummary.totalAmount)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Paid Invoices</p>
                <p className="text-2xl font-bold text-green-600">{invoiceSummary.paidCount}</p>
                <p className="text-xs text-gray-400">{formatCurrency(invoiceSummary.paidAmount)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Pending Payment</p>
                <p className="text-2xl font-bold text-yellow-600">{invoices.filter(inv => inv.paymentStatus === 'pending').length}</p>
                <p className="text-xs text-gray-400">{formatCurrency(invoiceSummary.pendingAmount)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{invoiceSummary.overdueCount}</p>
                <p className="text-xs text-gray-400">{formatCurrency(invoiceSummary.overdueAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="viewed">Viewed</option>
              </select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="partial">Partial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Invoices ({filteredInvoices.length} invoices)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
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
                {filteredInvoices.map((invoice) => {
                  const StatusIcon = getStatusIcon(invoice.paymentStatus);
                  const daysOverdue = getDaysOverdue(invoice.dueDate, invoice.paymentStatus);
                  
                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {invoice.invoiceNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {invoice.id}
                            </div>
                            <div className="text-xs text-gray-400">
                              Issued: {invoice.issueDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{invoice.customer.name}</div>
                        <div className="text-sm text-gray-500">{invoice.customer.email}</div>
                        <div className="text-xs text-gray-400">{invoice.customer.gst}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</div>
                        <div className="text-sm text-gray-500">Base: {formatCurrency(invoice.amount)}</div>
                        <div className="text-xs text-gray-400">Tax: {formatCurrency(invoice.taxAmount)}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {invoice.paymentStatus}
                        </span>
                        {invoice.paymentStatus === 'overdue' && (
                          <div className="text-xs text-red-600 mt-1">
                            {daysOverdue} days overdue
                          </div>
                        )}
                        {invoice.paymentStatus === 'paid' && invoice.paidDate && (
                          <div className="text-xs text-green-600 mt-1">
                            Paid: {invoice.paidDate}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{invoice.dueDate}</div>
                        {invoice.paymentStatus === 'pending' && (
                          <div className="text-xs text-yellow-600">
                            {invoice.daysPending} days pending
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900 p-1 rounded-lg hover:bg-purple-50 transition-colors">
                            <Download className="h-4 w-4" />
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
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No invoices found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Revenue Trend
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">{formatCurrency(invoiceSummary.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Collected</span>
                <span className="font-semibold text-blue-600">{formatCurrency(invoiceSummary.paidAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Outstanding</span>
                <span className="font-semibold text-yellow-600">{formatCurrency(invoiceSummary.pendingAmount + invoiceSummary.overdueAmount)}</span>
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Top Customers
            </h3>
            <div className="space-y-3">
              {invoices.slice(0, 3).map((invoice, index) => (
                <div key={invoice.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-900">{invoice.customer.name}</span>
                  </div>
                  <span className="font-semibold text-gray-600">{formatCurrency(invoice.totalAmount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
              Payment Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Paid</span>
                </div>
                <span className="font-semibold text-green-600">{invoiceSummary.paidCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="font-semibold text-yellow-600">{invoices.filter(inv => inv.paymentStatus === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Overdue</span>
                </div>
                <span className="font-semibold text-red-600">{invoiceSummary.overdueCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

