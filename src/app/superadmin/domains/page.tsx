'use client';

import { useState } from 'react';
import {
  Globe,
  Plus,
  Search,
  Check,
  X,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Shield,
  Clock,
  Settings,
  TrendingUp,
} from 'lucide-react';

export default function DomainsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Domains', value: '892', icon: Globe, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Domains', value: '847', icon: Check, color: 'from-green-500 to-green-600' },
    { label: 'SSL Secured', value: '892', icon: Shield, color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Setup', value: '45', icon: Clock, color: 'from-orange-500 to-orange-600' },
  ];

  const domains = [
    {
      id: 1,
      domain: 'healthysugar.com',
      tenant: 'Healthy Sugar Company',
      type: 'Custom',
      status: 'Active',
      ssl: 'Valid',
      sslExpiry: '2025-12-15',
      dns: 'Configured',
      registrar: 'GoDaddy',
      addedDate: '2024-01-15',
      lastVerified: '2025-10-03',
      traffic: '45.2K/month',
    },
    {
      id: 2,
      domain: 'organicfoods.com',
      tenant: 'Organic Foods Store',
      type: 'Custom',
      status: 'Active',
      ssl: 'Valid',
      sslExpiry: '2025-11-20',
      dns: 'Configured',
      registrar: 'Namecheap',
      addedDate: '2024-03-20',
      lastVerified: '2025-10-03',
      traffic: '32.8K/month',
    },
    {
      id: 3,
      domain: 'greenteashop.mystore.com',
      tenant: 'Green Tea Shop',
      type: 'Subdomain',
      status: 'Active',
      ssl: 'Valid',
      sslExpiry: 'Auto-renewal',
      dns: 'Configured',
      registrar: 'Platform',
      addedDate: '2024-06-10',
      lastVerified: '2025-10-02',
      traffic: '12.4K/month',
    },
    {
      id: 4,
      domain: 'wellnessboutique.com',
      tenant: 'Wellness Boutique',
      type: 'Custom',
      status: 'Active',
      ssl: 'Valid',
      sslExpiry: '2026-01-10',
      dns: 'Configured',
      registrar: 'Cloudflare',
      addedDate: '2024-02-05',
      lastVerified: '2025-10-03',
      traffic: '58.9K/month',
    },
    {
      id: 5,
      domain: 'naturalsupps.com',
      tenant: 'Natural Supplements',
      type: 'Custom',
      status: 'Pending',
      ssl: 'Pending',
      sslExpiry: '-',
      dns: 'Not Configured',
      registrar: 'Google Domains',
      addedDate: '2025-09-28',
      lastVerified: '2025-10-03',
      traffic: '0',
    },
    {
      id: 6,
      domain: 'freshgrocery.com',
      tenant: 'Fresh Grocery Market',
      type: 'Custom',
      status: 'Error',
      ssl: 'Expired',
      sslExpiry: '2025-09-15',
      dns: 'Error',
      registrar: 'Namecheap',
      addedDate: '2024-05-18',
      lastVerified: '2025-10-01',
      traffic: '8.2K/month',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Domains Management</h1>
          <p className="text-gray-600 mt-1">Manage custom domains and SSL certificates</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold">
            <RefreshCw className="w-5 h-5" />
            Verify All
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
            <Plus className="w-5 h-5" />
            Add Domain
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

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Domains List */}
      <div className="space-y-4">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    domain.status === 'Active' ? 'bg-green-100' :
                    domain.status === 'Pending' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <Globe className={`w-6 h-6 ${
                      domain.status === 'Active' ? 'text-green-600' :
                      domain.status === 'Pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{domain.domain}</h3>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        domain.type === 'Custom' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {domain.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{domain.tenant}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            domain.status === 'Active' ? 'bg-green-100 text-green-700' :
                            domain.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {domain.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">SSL Certificate</p>
                        <div className="flex items-center gap-1 mt-1">
                          {domain.ssl === 'Valid' && <Shield className="w-4 h-4 text-green-600" />}
                          {domain.ssl === 'Expired' && <AlertCircle className="w-4 h-4 text-red-600" />}
                          {domain.ssl === 'Pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                          <span className={`text-sm font-semibold ${
                            domain.ssl === 'Valid' ? 'text-green-600' :
                            domain.ssl === 'Expired' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {domain.ssl}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">DNS</p>
                        <div className="flex items-center gap-1 mt-1">
                          {domain.dns === 'Configured' && <Check className="w-4 h-4 text-green-600" />}
                          {domain.dns === 'Not Configured' && <Clock className="w-4 h-4 text-yellow-600" />}
                          {domain.dns === 'Error' && <X className="w-4 h-4 text-red-600" />}
                          <span className={`text-sm font-semibold ${
                            domain.dns === 'Configured' ? 'text-green-600' :
                            domain.dns === 'Not Configured' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {domain.dns}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Traffic</p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900">{domain.traffic}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="lg:text-right space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Registrar</p>
                  <p className="text-sm font-semibold text-gray-900">{domain.registrar}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">SSL Expiry</p>
                  <p className="text-sm font-semibold text-gray-900">{domain.sslExpiry}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Verified</p>
                  <p className="text-sm text-gray-600">{domain.lastVerified}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Verify
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4" />
                Renew SSL
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Settings className="w-4 h-4" />
                Configure
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DNS Configuration Help */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">DNS Configuration Guide</h3>
            <p className="text-sm text-gray-700 mb-4">
              For custom domains, tenants need to add the following DNS records at their registrar:
            </p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <div className="grid grid-cols-3 gap-4 font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                <span>Type</span>
                <span>Name</span>
                <span>Value</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-gray-900 mb-2">
                <span>A</span>
                <span>@</span>
                <span>185.199.108.153</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-gray-900">
                <span>CNAME</span>
                <span>www</span>
                <span>platform.yourdomain.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

