'use client';

import { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  User,
  Settings,
  DollarSign,
  Shield,
  Globe,
  CreditCard,
  Store,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
} from 'lucide-react';

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const activityLogs = [
    {
      id: 1,
      type: 'tenant_created',
      icon: Store,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      user: 'System',
      action: 'New tenant registered',
      details: 'Healthy Sugar Company signed up for Enterprise plan',
      tenant: 'Healthy Sugar Company',
      timestamp: '2025-10-03 14:32:15',
      status: 'success',
    },
    {
      id: 2,
      type: 'payment_received',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      user: 'Payment Gateway',
      action: 'Payment received',
      details: '$499.00 from Wellness Boutique',
      tenant: 'Wellness Boutique',
      timestamp: '2025-10-03 13:45:22',
      status: 'success',
    },
    {
      id: 3,
      type: 'support_ticket',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      user: 'Althameem Khan',
      action: 'Support ticket created',
      details: 'Payment gateway integration issue - Priority: High',
      tenant: 'Healthy Sugar Company',
      timestamp: '2025-10-03 10:30:45',
      status: 'warning',
    },
    {
      id: 4,
      type: 'plan_upgrade',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      user: 'Sarah Johnson',
      action: 'Plan upgraded',
      details: 'Upgraded from Starter to Professional',
      tenant: 'Organic Foods Store',
      timestamp: '2025-10-03 09:15:30',
      status: 'success',
    },
    {
      id: 5,
      type: 'domain_verified',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      user: 'System',
      action: 'Domain verified',
      details: 'organicfoods.com DNS configured and SSL active',
      tenant: 'Organic Foods Store',
      timestamp: '2025-10-03 09:00:12',
      status: 'success',
    },
    {
      id: 6,
      type: 'admin_login',
      icon: Shield,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      user: 'Platform Admin',
      action: 'Admin login',
      details: 'Logged in from IP: 192.168.1.100',
      tenant: 'Platform',
      timestamp: '2025-10-03 08:00:00',
      status: 'info',
    },
    {
      id: 7,
      type: 'payment_failed',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      user: 'Payment Gateway',
      action: 'Payment failed',
      details: '$99.00 from Fresh Grocery Market - Card declined',
      tenant: 'Fresh Grocery Market',
      timestamp: '2025-10-02 18:22:45',
      status: 'error',
    },
    {
      id: 8,
      type: 'tenant_suspended',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      user: 'Platform Admin',
      action: 'Tenant suspended',
      details: 'Fresh Grocery Market suspended due to payment failure',
      tenant: 'Fresh Grocery Market',
      timestamp: '2025-10-02 17:30:00',
      status: 'warning',
    },
    {
      id: 9,
      type: 'settings_changed',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      user: 'Platform Admin',
      action: 'Settings updated',
      details: 'Updated platform email notifications settings',
      tenant: 'Platform',
      timestamp: '2025-10-02 15:45:18',
      status: 'info',
    },
    {
      id: 10,
      type: 'bulk_email_sent',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      user: 'System',
      action: 'Bulk email sent',
      details: 'Monthly newsletter sent to 1,156 tenants',
      tenant: 'Platform',
      timestamp: '2025-10-01 09:00:00',
      status: 'success',
    },
  ];

  const stats = [
    { label: 'Total Activities Today', value: '1,248', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Critical Events', value: '3', icon: AlertCircle, color: 'from-red-500 to-red-600' },
    { label: 'System Changes', value: '18', icon: Settings, color: 'from-purple-500 to-purple-600' },
    { label: 'User Actions', value: '892', icon: User, color: 'from-green-500 to-green-600' },
  ];

  const activityTypes = [
    { label: 'All Activities', value: 'all', count: 1248 },
    { label: 'Tenant Actions', value: 'tenant', count: 245 },
    { label: 'Payments', value: 'payment', count: 387 },
    { label: 'System Events', value: 'system', count: 156 },
    { label: 'Security', value: 'security', count: 89 },
    { label: 'Support', value: 'support', count: 127 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">Complete audit trail of platform activities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 7 days
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
            <FileText className="w-5 h-5" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities by user, tenant, action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label} ({type.count})
              </option>
            ))}
          </select>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-3">
          {activityLogs.map((log) => {
            const Icon = log.icon;
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${log.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${log.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{log.action}</h3>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      log.status === 'success' ? 'bg-green-100 text-green-700' :
                      log.status === 'error' ? 'bg-red-100 text-red-700' :
                      log.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {log.user}
                    </span>
                    <span className="flex items-center gap-1">
                      <Store className="w-3 h-3" />
                      {log.tenant}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">1-10</span> of <span className="font-semibold">1,248</span> activities
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
            <span className="px-2">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">125</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activity by Type</h3>
          <div className="space-y-3">
            {activityTypes.slice(1).map((type, index) => {
              const percentage = (type.count / 1248) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    <span className="text-sm font-bold text-gray-900">{type.count}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="font-semibold text-gray-900">Successful</span>
              </div>
              <span className="text-2xl font-bold text-green-600">892</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <span className="font-semibold text-gray-900">Warnings</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">127</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <span className="font-semibold text-gray-900">Errors</span>
              </div>
              <span className="text-2xl font-bold text-red-600">18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

