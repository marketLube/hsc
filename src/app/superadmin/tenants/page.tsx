'use client';

import { useState } from 'react';
import {
  Store,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Power,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function TenantManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const tenants = [
    {
      id: 1,
      name: 'Healthy Sugar Company',
      domain: 'healthysugar.com',
      customDomain: true,
      plan: 'Enterprise',
      status: 'Active',
      owner: 'Althameem Khan',
      email: 'khan@healthysugar.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India',
      joinedDate: '2024-01-15',
      lastActive: '2025-10-03',
      revenue: '$499/mo',
      totalRevenue: '$4,491',
      orders: 1248,
      products: 24,
      customers: 3421,
      storage: '12.4 GB',
      bandwidth: '245 GB',
    },
    {
      id: 2,
      name: 'Organic Foods Store',
      domain: 'organicfoods.com',
      customDomain: true,
      plan: 'Professional',
      status: 'Active',
      owner: 'Sarah Johnson',
      email: 'sarah@organicfoods.com',
      phone: '+1 555 123 4567',
      location: 'California, USA',
      joinedDate: '2024-03-20',
      lastActive: '2025-10-03',
      revenue: '$299/mo',
      totalRevenue: '$2,093',
      orders: 842,
      products: 156,
      customers: 2134,
      storage: '8.2 GB',
      bandwidth: '158 GB',
    },
    {
      id: 3,
      name: 'Green Tea Shop',
      domain: 'greenteashop.com',
      customDomain: false,
      plan: 'Starter',
      status: 'Active',
      owner: 'Michael Chen',
      email: 'michael@greenteashop.com',
      phone: '+86 138 1234 5678',
      location: 'Shanghai, China',
      joinedDate: '2024-06-10',
      lastActive: '2025-10-02',
      revenue: '$99/mo',
      totalRevenue: '$396',
      orders: 234,
      products: 45,
      customers: 892,
      storage: '3.1 GB',
      bandwidth: '67 GB',
    },
    {
      id: 4,
      name: 'Natural Supplements',
      domain: 'naturalsupps.com',
      customDomain: false,
      plan: 'Professional',
      status: 'Trial',
      owner: 'Emma Wilson',
      email: 'emma@naturalsupps.com',
      phone: '+44 20 7123 4567',
      location: 'London, UK',
      joinedDate: '2025-09-28',
      lastActive: '2025-10-03',
      revenue: '$0',
      totalRevenue: '$0',
      orders: 12,
      products: 8,
      customers: 45,
      storage: '0.5 GB',
      bandwidth: '8 GB',
    },
    {
      id: 5,
      name: 'Wellness Boutique',
      domain: 'wellnessboutique.com',
      customDomain: true,
      plan: 'Enterprise',
      status: 'Active',
      owner: 'David Martinez',
      email: 'david@wellnessboutique.com',
      phone: '+34 91 123 4567',
      location: 'Madrid, Spain',
      joinedDate: '2024-02-05',
      lastActive: '2025-10-03',
      revenue: '$499/mo',
      totalRevenue: '$3,993',
      orders: 1567,
      products: 189,
      customers: 4521,
      storage: '15.8 GB',
      bandwidth: '312 GB',
    },
    {
      id: 6,
      name: 'Fresh Grocery Market',
      domain: 'freshgrocery.com',
      customDomain: false,
      plan: 'Starter',
      status: 'Suspended',
      owner: 'Lisa Anderson',
      email: 'lisa@freshgrocery.com',
      phone: '+61 2 8765 4321',
      location: 'Sydney, Australia',
      joinedDate: '2024-05-18',
      lastActive: '2025-09-20',
      revenue: '$99/mo',
      totalRevenue: '$495',
      orders: 187,
      products: 67,
      customers: 567,
      storage: '2.4 GB',
      bandwidth: '45 GB',
    },
  ];

  const stats = [
    { label: 'Total Tenants', value: '1,284', icon: Store, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Stores', value: '1,156', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Trial Users', value: '89', icon: Users, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Monthly Revenue', value: '$48,532', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-1">Manage all stores and their subscriptions</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Add New Tenant
        </button>
      </div>

      {/* Stats Grid */}
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

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by store name, domain, owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Plans</option>
            <option value="enterprise">Enterprise</option>
            <option value="professional">Professional</option>
            <option value="starter">Starter</option>
          </select>

          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {tenant.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{tenant.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{tenant.domain}</span>
                    {tenant.customDomain && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        Custom
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Status & Plan */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tenant.status === 'Active' ? 'bg-green-100 text-green-700' :
                tenant.status === 'Trial' ? 'bg-yellow-100 text-yellow-700' :
                tenant.status === 'Suspended' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {tenant.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tenant.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                tenant.plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {tenant.plan}
              </span>
            </div>

            {/* Owner Info */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{tenant.owner}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{tenant.location}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Orders</p>
                <p className="text-lg font-bold text-gray-900">{tenant.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Products</p>
                <p className="text-lg font-bold text-gray-900">{tenant.products}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Customers</p>
                <p className="text-lg font-bold text-gray-900">{tenant.customers}</p>
              </div>
            </div>

            {/* Revenue & Storage */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Monthly Revenue</p>
                <p className="text-base font-bold text-green-600">{tenant.revenue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Revenue</p>
                <p className="text-base font-bold text-gray-900">{tenant.totalRevenue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Storage Used</p>
                <p className="text-base font-semibold text-gray-700">{tenant.storage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bandwidth</p>
                <p className="text-base font-semibold text-gray-700">{tenant.bandwidth}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Joined: {tenant.joinedDate}</span>
              </div>
              <div>
                <span>Last active: {tenant.lastActive}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className={`px-3 py-2 border rounded-lg transition-colors flex items-center justify-center gap-2 text-sm ${
                tenant.status === 'Suspended' 
                  ? 'border-green-300 text-green-600 hover:bg-green-50' 
                  : 'border-orange-300 text-orange-600 hover:bg-orange-50'
              }`}>
                <Power className="w-4 h-4" />
                {tenant.status === 'Suspended' ? 'Activate' : 'Suspend'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">1-6</span> of <span className="font-semibold">1,284</span> tenants
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
          <span className="px-2">...</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">215</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

