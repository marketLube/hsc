'use client';

import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Globe,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Revenue', value: '$542,184', change: '+24.5%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Total Orders', value: '138,492', change: '+18.2%', trend: 'up', icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Tenants', value: '1,156', change: '+8.1%', trend: 'up', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg Order Value', value: '$3.92', change: '+5.3%', trend: 'up', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const revenueByMonth = [
    { month: 'Jan', revenue: 42500, orders: 10800, tenants: 1020 },
    { month: 'Feb', revenue: 38900, orders: 9900, tenants: 1035 },
    { month: 'Mar', revenue: 45200, orders: 11500, tenants: 1048 },
    { month: 'Apr', revenue: 48300, orders: 12300, tenants: 1062 },
    { month: 'May', revenue: 51800, orders: 13200, tenants: 1078 },
    { month: 'Jun', revenue: 49600, orders: 12600, tenants: 1092 },
    { month: 'Jul', revenue: 53400, orders: 13600, tenants: 1108 },
    { month: 'Aug', revenue: 55900, orders: 14200, tenants: 1124 },
    { month: 'Sep', revenue: 52100, orders: 13300, tenants: 1156 },
  ];

  const topTenants = [
    { name: 'Wellness Boutique', revenue: '$122,450', orders: 3240, growth: '+28%' },
    { name: 'Healthy Sugar Company', revenue: '$108,320', orders: 2890, growth: '+22%' },
    { name: 'Organic Foods Store', revenue: '$95,780', orders: 2520, growth: '+18%' },
    { name: 'Natural Beauty Co', revenue: '$87,640', orders: 2310, growth: '+15%' },
    { name: 'Green Living Store', revenue: '$76,920', orders: 2040, growth: '+12%' },
  ];

  const planDistribution = [
    { plan: 'Enterprise', percentage: 19, tenants: 245, revenue: '$122,255', color: 'bg-purple-500' },
    { plan: 'Professional', percentage: 38, tenants: 487, revenue: '$145,713', color: 'bg-blue-500' },
    { plan: 'Starter', percentage: 33, tenants: 424, revenue: '$41,976', color: 'bg-gray-500' },
    { plan: 'Trial', percentage: 10, tenants: 128, revenue: '$0', color: 'bg-yellow-500' },
  ];

  const geographicData = [
    { region: 'North America', tenants: 456, revenue: '$218,430', percentage: 40 },
    { region: 'Europe', tenants: 342, revenue: '$162,653', percentage: 30 },
    { region: 'Asia Pacific', tenants: 258, revenue: '$108,436', percentage: 20 },
    { region: 'Others', tenants: 100, revenue: '$52,665', percentage: 10 },
  ];

  const maxRevenue = Math.max(...revenueByMonth.map(m => m.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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

      {/* Revenue & Orders Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue & Orders Trend</h2>
            <p className="text-sm text-gray-600 mt-1">Monthly performance over time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-64">
          {revenueByMonth.map((item, index) => {
            const revenueHeight = (item.revenue / maxRevenue) * 100;
            const ordersHeight = (item.orders / 15000) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="relative w-full flex items-end justify-center gap-1">
                  <div
                    className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                    style={{ height: `${revenueHeight * 2}px` }}
                    title={`Revenue: $${(item.revenue / 1000).toFixed(1)}K`}
                  />
                  <div
                    className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                    style={{ height: `${ordersHeight * 2}px` }}
                    title={`Orders: ${(item.orders / 1000).toFixed(1)}K`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performers & Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tenants */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Tenants</h2>
          <div className="space-y-4">
            {topTenants.map((tenant, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
                  <p className="text-sm text-gray-600">{tenant.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{tenant.revenue}</p>
                  <p className="text-sm text-green-600 font-semibold">{tenant.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Distribution</h2>
          <div className="space-y-6">
            {planDistribution.map((plan, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${plan.color} rounded-full`}></div>
                    <span className="font-semibold text-gray-900">{plan.plan}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{plan.tenants} tenants</p>
                    <p className="text-xs text-gray-600">{plan.revenue}</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${plan.color} rounded-full transition-all duration-500`}
                    style={{ width: `${plan.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {geographicData.map((region, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-gray-900">{region.region}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Tenants</p>
                  <p className="text-2xl font-bold text-gray-900">{region.tenants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-xl font-bold text-green-600">{region.revenue}</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Churn Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">2.3%</p>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <ArrowDown className="w-4 h-4" />
            <span>-0.5%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Customer LTV</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">$3,240</p>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <ArrowUp className="w-4 h-4" />
            <span>+12%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Avg Basket Size</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">$87.50</p>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <ArrowUp className="w-4 h-4" />
            <span>+8%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">3.8%</p>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <ArrowUp className="w-4 h-4" />
            <span>+0.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

