"use client";

import { 
  Settings, 
  Store, 
  CreditCard, 
  Truck, 
  Users,
  Bell,
  Shield,
  Database
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure your store settings and preferences
          </p>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Store Settings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Store className="h-8 w-8 text-brand" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Store Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Basic store information and branding
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payment Methods
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Payment gateways and options
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Shipping Options
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Delivery zones and rates
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Management
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Admin users and permissions
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bell className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Email and SMS preferences
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Security
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Security and backup settings
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                Configure →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Store Status</h4>
                <p className="text-sm text-gray-500">Enable or disable your store</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Put store in maintenance mode</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Enabled</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive order notifications via email</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
