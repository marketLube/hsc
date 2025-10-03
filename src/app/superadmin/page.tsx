'use client';

import {
  Store,
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  AlertCircle,
  Server,
  Globe,
  CreditCard,
  Package,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
} from 'lucide-react';

export default function SuperAdminDashboard() {
  // Mock data
  const stats = [
    {
      label: 'Total Tenants',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      icon: Store,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Monthly Revenue',
      value: '$48,532',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Active Subscriptions',
      value: '1,156',
      change: '+8.1%',
      trend: 'up',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  const recentTenants = [
    { id: 1, name: 'Healthy Sugar Company', domain: 'healthysugar.com', plan: 'Enterprise', status: 'Active', revenue: '$499/mo', joinedDate: '2025-10-01' },
    { id: 2, name: 'Organic Foods Store', domain: 'organicfoods.com', plan: 'Professional', status: 'Active', revenue: '$299/mo', joinedDate: '2025-10-01' },
    { id: 3, name: 'Green Tea Shop', domain: 'greenteashop.com', plan: 'Starter', status: 'Active', revenue: '$99/mo', joinedDate: '2025-10-02' },
    { id: 4, name: 'Natural Supplements', domain: 'naturalsupps.com', plan: 'Professional', status: 'Trial', revenue: '$0', joinedDate: '2025-10-03' },
    { id: 5, name: 'Wellness Boutique', domain: 'wellnessboutique.com', plan: 'Enterprise', status: 'Active', revenue: '$499/mo', joinedDate: '2025-10-03' },
  ];

  const systemMetrics = [
    { label: 'Total Orders Today', value: '3,842', icon: Package, trend: '+15%', color: 'text-blue-600' },
    { label: 'Active Domains', value: '892', icon: Globe, trend: '+3%', color: 'text-green-600' },
    { label: 'Server Load', value: '42%', icon: Server, trend: '-8%', color: 'text-purple-600' },
    { label: 'Support Tickets', value: '127', icon: AlertCircle, trend: '-12%', color: 'text-orange-600' },
  ];

  const revenueByPlan = [
    { plan: 'Enterprise', tenants: 245, revenue: '$122,255', percentage: 48 },
    { plan: 'Professional', tenants: 487, revenue: '$145,713', percentage: 35 },
    { plan: 'Starter', tenants: 424, revenue: '$41,976', percentage: 17 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your SaaS e-commerce platform</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
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
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tenants */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Tenants</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3">Store Name</th>
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3">Domain</th>
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3">Plan</th>
                  <th className="text-left text-sm font-semibold text-gray-700 pb-3">Status</th>
                  <th className="text-right text-sm font-semibold text-gray-700 pb-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {recentTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{tenant.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {tenant.joinedDate}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-600">{tenant.domain}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tenant.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                        tenant.plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tenant.status === 'Active' ? 'bg-green-100 text-green-700' :
                        tenant.status === 'Trial' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-semibold text-gray-900">{tenant.revenue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue by Plan</h2>
          <div className="space-y-6">
            {revenueByPlan.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.plan}</p>
                    <p className="text-sm text-gray-500">{item.tenants} tenants</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{item.revenue}</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      index === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-8 h-8 ${metric.color}`} />
                <span className="text-sm font-semibold text-green-600">{metric.trend}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

