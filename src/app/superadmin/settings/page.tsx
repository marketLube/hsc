'use client';

import {
  Settings,
  Globe,
  Mail,
  Bell,
  Shield,
  CreditCard,
  Database,
  Palette,
  Code,
  Save,
  CheckCircle,
} from 'lucide-react';

export default function SettingsPage() {
  const settingSections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: Settings,
      color: 'from-blue-500 to-blue-600',
      fields: [
        { label: 'Platform Name', type: 'text', value: 'E-Commerce SaaS Platform', placeholder: 'Enter platform name' },
        { label: 'Support Email', type: 'email', value: 'support@platform.com', placeholder: 'support@example.com' },
        { label: 'Timezone', type: 'select', value: 'UTC', options: ['UTC', 'EST', 'PST', 'GMT'] },
        { label: 'Default Currency', type: 'select', value: 'USD', options: ['USD', 'EUR', 'GBP', 'INR'] },
      ],
    },
    {
      id: 'email',
      title: 'Email Configuration',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      fields: [
        { label: 'SMTP Host', type: 'text', value: 'smtp.gmail.com', placeholder: 'smtp.example.com' },
        { label: 'SMTP Port', type: 'text', value: '587', placeholder: '587' },
        { label: 'SMTP Username', type: 'text', value: 'noreply@platform.com', placeholder: 'username' },
        { label: 'SMTP Password', type: 'password', value: '••••••••', placeholder: 'Password' },
        { label: 'From Name', type: 'text', value: 'Platform Team', placeholder: 'Your Name' },
      ],
    },
    {
      id: 'payments',
      title: 'Payment Gateway',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      fields: [
        { label: 'Stripe Public Key', type: 'text', value: 'pk_live_...', placeholder: 'pk_live_...' },
        { label: 'Stripe Secret Key', type: 'password', value: '••••••••', placeholder: 'sk_live_...' },
        { label: 'PayPal Client ID', type: 'text', value: 'AYg...', placeholder: 'Client ID' },
        { label: 'PayPal Secret', type: 'password', value: '••••••••', placeholder: 'Secret Key' },
      ],
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      fields: [
        { label: 'Enable 2FA', type: 'toggle', value: true },
        { label: 'Session Timeout (minutes)', type: 'number', value: '30', placeholder: '30' },
        { label: 'Max Login Attempts', type: 'number', value: '5', placeholder: '5' },
        { label: 'Password Min Length', type: 'number', value: '8', placeholder: '8' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform-wide settings and integrations</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage {section.title.toLowerCase()} options</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'toggle' ? (
                      <button
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          field.value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                            field.value ? 'right-1' : 'left-1'
                          }`}
                        />
                      </button>
                    ) : field.type === 'select' ? (
                      <select 
                        defaultValue={field.value}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Save Section
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'New Tenant Registration', enabled: true },
              { label: 'Payment Received', enabled: true },
              { label: 'Payment Failed', enabled: true },
              { label: 'Support Ticket Created', enabled: true },
              { label: 'System Alerts', enabled: true },
              { label: 'Weekly Reports', enabled: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    item.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      item.enabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API & Webhooks */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">API & Webhooks</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API Rate Limit</label>
              <select 
                defaultValue="1000 requests/hour"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>1000 requests/hour</option>
                <option>5000 requests/hour</option>
                <option>10000 requests/hour</option>
                <option>Unlimited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Webhook URL</label>
              <input
                type="url"
                placeholder="https://your-domain.com/webhook"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="sk_live_4eC39H...vCGH1"
                  readOnly
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage & Database */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Storage & Database</h2>
            <p className="text-sm text-gray-600 mt-1">Configure storage limits and database settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Storage Limit per Tenant</label>
            <select 
              defaultValue="25 GB"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>5 GB</option>
              <option>10 GB</option>
              <option>25 GB</option>
              <option>50 GB</option>
              <option>100 GB</option>
              <option>Unlimited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bandwidth Limit per Tenant</label>
            <select 
              defaultValue="250 GB/month"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>50 GB/month</option>
              <option>100 GB/month</option>
              <option>250 GB/month</option>
              <option>500 GB/month</option>
              <option>1 TB/month</option>
              <option>Unlimited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Backup Frequency</label>
            <select 
              defaultValue="Daily"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Every hour</option>
              <option>Every 6 hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Platform Branding</h2>
            <p className="text-sm text-gray-600 mt-1">Customize platform appearance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                defaultValue="#3B82F6"
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#3B82F6"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                defaultValue="#6366F1"
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#6366F1"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Favicon URL</label>
            <input
              type="url"
              placeholder="https://example.com/favicon.ico"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

