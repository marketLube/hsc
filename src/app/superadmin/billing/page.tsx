'use client';

import { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Filter,
  Check,
  X,
  Clock,
  AlertCircle,
  FileText,
  Send,
  MoreVertical,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

export default function BillingPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const revenueStats = [
    { label: 'Monthly Revenue', value: '$48,532', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Annual Revenue', value: '$542,184', change: '+24.5%', trend: 'up', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Payments', value: '$12,450', change: '-8.3%', trend: 'down', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Failed Payments', value: '$3,240', change: '-12.1%', trend: 'down', icon: AlertCircle, color: 'from-red-500 to-red-600' },
  ];

  const transactions = [
    {
      id: 'INV-2024-1248',
      tenant: 'Healthy Sugar Company',
      plan: 'Enterprise',
      amount: '$499.00',
      status: 'Paid',
      method: 'Stripe',
      date: '2025-10-01',
      dueDate: '2025-10-01',
      paidDate: '2025-10-01',
    },
    {
      id: 'INV-2024-1247',
      tenant: 'Organic Foods Store',
      plan: 'Professional',
      amount: '$299.00',
      status: 'Paid',
      method: 'PayPal',
      date: '2025-10-01',
      dueDate: '2025-10-01',
      paidDate: '2025-10-01',
    },
    {
      id: 'INV-2024-1246',
      tenant: 'Wellness Boutique',
      plan: 'Enterprise',
      amount: '$499.00',
      status: 'Pending',
      method: 'Stripe',
      date: '2025-10-03',
      dueDate: '2025-10-10',
      paidDate: null,
    },
    {
      id: 'INV-2024-1245',
      tenant: 'Fresh Grocery Market',
      plan: 'Starter',
      amount: '$99.00',
      status: 'Failed',
      method: 'Stripe',
      date: '2025-09-28',
      dueDate: '2025-09-28',
      paidDate: null,
    },
    {
      id: 'INV-2024-1244',
      tenant: 'Green Tea Shop',
      plan: 'Starter',
      amount: '$99.00',
      status: 'Paid',
      method: 'Stripe',
      date: '2025-10-02',
      dueDate: '2025-10-02',
      paidDate: '2025-10-02',
    },
    {
      id: 'INV-2024-1243',
      tenant: 'Natural Supplements',
      plan: 'Professional',
      amount: '$299.00',
      status: 'Overdue',
      method: 'Stripe',
      date: '2025-09-15',
      dueDate: '2025-09-15',
      paidDate: null,
    },
  ];

  const revenueByMonth = [
    { month: 'Jan', revenue: 42500 },
    { month: 'Feb', revenue: 38900 },
    { month: 'Mar', revenue: 45200 },
    { month: 'Apr', revenue: 48300 },
    { month: 'May', revenue: 51800 },
    { month: 'Jun', revenue: 49600 },
    { month: 'Jul', revenue: 53400 },
    { month: 'Aug', revenue: 55900 },
    { month: 'Sep', revenue: 52100 },
  ];

  const maxRevenue = Math.max(...revenueByMonth.map(m => m.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-1">Manage subscriptions, invoices, and revenue tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold">
            <Download className="w-5 h-5" />
            Export Data
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
            <p className="text-sm text-gray-600 mt-1">Monthly recurring revenue over time</p>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 9 Months</option>
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
          </select>
        </div>
        <div className="flex items-end justify-between gap-4 h-64">
          {revenueByMonth.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
                    style={{ height: `${height * 2}px` }}
                    title={`$${(item.revenue / 1000).toFixed(1)}K`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice ID, tenant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="failed">Failed</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Invoice ID</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Tenant</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Plan</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Amount</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Status</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Payment Method</th>
                <th className="text-left text-sm font-semibold text-gray-700 pb-3">Date</th>
                <th className="text-right text-sm font-semibold text-gray-700 pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{transaction.id}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900 font-medium">{transaction.tenant}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                      transaction.plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {transaction.plan}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-bold text-gray-900">{transaction.amount}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      transaction.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      transaction.status === 'Failed' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.status === 'Paid' && <Check className="w-3 h-3" />}
                      {transaction.status === 'Failed' && <X className="w-3 h-3" />}
                      {transaction.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {transaction.status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-600">{transaction.method}</span>
                  </td>
                  <td className="py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{transaction.date}</p>
                      {transaction.paidDate ? (
                        <p className="text-gray-500 text-xs">Paid: {transaction.paidDate}</p>
                      ) : (
                        <p className="text-gray-500 text-xs">Due: {transaction.dueDate}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download Invoice">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      {transaction.status === 'Overdue' && (
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Send Reminder">
                          <Send className="w-4 h-4 text-blue-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stripe</span>
              <span className="text-lg font-bold text-gray-900">847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">PayPal</span>
              <span className="text-lg font-bold text-gray-900">284</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bank Transfer</span>
              <span className="text-lg font-bold text-gray-900">153</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Collection Rate</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(94.8 / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">94.8%</span>
                <span className="text-xs text-gray-500">Success</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              Send Payment Reminders
            </button>
            <button className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
              Process Refunds
            </button>
            <button className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
              Update Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

