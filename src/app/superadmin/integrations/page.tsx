'use client';

import {
  Zap,
  CheckCircle,
  ExternalLink,
  Settings,
  Plus,
} from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      id: 1,
      name: 'Stripe',
      category: 'Payment Gateway',
      description: 'Accept payments and manage subscriptions',
      logo: '💳',
      status: 'Connected',
      enabled: true,
      color: 'bg-blue-100',
    },
    {
      id: 2,
      name: 'PayPal',
      category: 'Payment Gateway',
      description: 'Alternative payment processing',
      logo: '🅿️',
      status: 'Connected',
      enabled: true,
      color: 'bg-indigo-100',
    },
    {
      id: 3,
      name: 'SendGrid',
      category: 'Email Service',
      description: 'Transactional email delivery',
      logo: '📧',
      status: 'Connected',
      enabled: true,
      color: 'bg-purple-100',
    },
    {
      id: 4,
      name: 'Twilio',
      category: 'SMS Service',
      description: 'SMS notifications and 2FA',
      logo: '📱',
      status: 'Not Connected',
      enabled: false,
      color: 'bg-red-100',
    },
    {
      id: 5,
      name: 'AWS S3',
      category: 'Cloud Storage',
      description: 'File storage and CDN',
      logo: '☁️',
      status: 'Connected',
      enabled: true,
      color: 'bg-orange-100',
    },
    {
      id: 6,
      name: 'Cloudflare',
      category: 'CDN & Security',
      description: 'Content delivery and DDoS protection',
      logo: '🛡️',
      status: 'Connected',
      enabled: true,
      color: 'bg-yellow-100',
    },
    {
      id: 7,
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Website analytics and insights',
      logo: '📊',
      status: 'Connected',
      enabled: true,
      color: 'bg-green-100',
    },
    {
      id: 8,
      name: 'Slack',
      category: 'Communication',
      description: 'Team notifications and alerts',
      logo: '💬',
      status: 'Not Connected',
      enabled: false,
      color: 'bg-pink-100',
    },
    {
      id: 9,
      name: 'Intercom',
      category: 'Customer Support',
      description: 'Live chat and customer messaging',
      logo: '🗨️',
      status: 'Not Connected',
      enabled: false,
      color: 'bg-teal-100',
    },
  ];

  const stats = [
    { label: 'Connected', value: '6', color: 'from-green-500 to-green-600' },
    { label: 'Available', value: '15', color: 'from-blue-500 to-blue-600' },
    { label: 'Pending', value: '3', color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect third-party services to enhance platform functionality</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Browse More Integrations
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl ${integration.color} flex items-center justify-center text-3xl`}>
                {integration.logo}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                integration.status === 'Connected' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {integration.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">{integration.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{integration.category}</p>
            <p className="text-sm text-gray-600 mb-6">{integration.description}</p>

            {integration.status === 'Connected' ? (
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  Disconnect
                </button>
              </div>
            ) : (
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-semibold">
                <Zap className="w-4 h-4" />
                Connect Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Need a custom integration?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Our platform supports webhooks and REST API for custom integrations. Contact our team to discuss your specific requirements.
            </p>
            <button className="px-6 py-2.5 bg-white text-blue-600 rounded-lg hover:shadow-md transition-all flex items-center gap-2 font-semibold">
              <ExternalLink className="w-4 h-4" />
              View API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

