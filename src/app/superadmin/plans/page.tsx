'use client';

import { useState } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Zap,
  Crown,
  Star,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';

export default function PlansPage() {
  const [showAddPlan, setShowAddPlan] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Starter',
      description: 'Perfect for small businesses just getting started',
      price: 99,
      billingCycle: 'month',
      features: [
        { name: 'Up to 100 products', included: true },
        { name: '1,000 orders/month', included: true },
        { name: 'Basic analytics', included: true },
        { name: '5 GB storage', included: true },
        { name: 'Email support', included: true },
        { name: 'Custom domain', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
      ],
      active: true,
      subscribers: 424,
      revenue: '$41,976',
      badge: null,
      color: 'from-gray-500 to-gray-600',
    },
    {
      id: 2,
      name: 'Professional',
      description: 'For growing businesses with advanced needs',
      price: 299,
      billingCycle: 'month',
      features: [
        { name: 'Up to 1,000 products', included: true },
        { name: '10,000 orders/month', included: true },
        { name: 'Advanced analytics', included: true },
        { name: '25 GB storage', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Custom domain', included: true },
        { name: 'API access', included: true },
        { name: 'Multi-currency', included: true },
        { name: '24/7 support', included: false },
      ],
      active: true,
      subscribers: 487,
      revenue: '$145,713',
      badge: 'Popular',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 3,
      name: 'Enterprise',
      description: 'For large businesses with custom requirements',
      price: 499,
      billingCycle: 'month',
      features: [
        { name: 'Unlimited products', included: true },
        { name: 'Unlimited orders', included: true },
        { name: 'Advanced analytics + AI insights', included: true },
        { name: '100 GB storage', included: true },
        { name: '24/7 priority support', included: true },
        { name: 'Custom domain + SSL', included: true },
        { name: 'Full API access', included: true },
        { name: 'Multi-currency + Multi-language', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
      active: true,
      subscribers: 245,
      revenue: '$122,255',
      badge: 'Premium',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { label: 'Active Plans', value: '3', icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Subscribers', value: '1,156', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Monthly MRR', value: '$309,944', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg Revenue/User', value: '$268', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const featureCategories = [
    {
      name: 'Core Features',
      features: [
        { name: 'Product Management', description: 'Manage your product catalog' },
        { name: 'Order Processing', description: 'Process and fulfill orders' },
        { name: 'Customer Management', description: 'Manage customer data' },
        { name: 'Payment Processing', description: 'Accept payments online' },
      ],
    },
    {
      name: 'Marketing Tools',
      features: [
        { name: 'Email Marketing', description: 'Send campaigns to customers' },
        { name: 'SEO Tools', description: 'Optimize for search engines' },
        { name: 'Discount Codes', description: 'Create promotional offers' },
        { name: 'Analytics Dashboard', description: 'Track store performance' },
      ],
    },
    {
      name: 'Advanced Features',
      features: [
        { name: 'API Access', description: 'Integrate with third-party tools' },
        { name: 'Multi-currency', description: 'Sell in multiple currencies' },
        { name: 'Custom Domain', description: 'Use your own domain name' },
        { name: 'White Label', description: 'Remove platform branding' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plans & Features</h1>
          <p className="text-gray-600 mt-1">Manage subscription tiers and feature access</p>
        </div>
        <button
          onClick={() => setShowAddPlan(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Create New Plan
        </button>
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl border-2 p-8 hover:shadow-2xl transition-all duration-300 ${
              plan.badge === 'Popular' ? 'border-blue-500 relative' : 'border-gray-200'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                  plan.badge === 'Popular' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                  'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}>
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                {plan.name === 'Starter' && <Package className="w-8 h-8 text-white" />}
                {plan.name === 'Professional' && <Star className="w-8 h-8 text-white" />}
                {plan.name === 'Enterprise' && <Crown className="w-8 h-8 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600 mb-2">/{plan.billingCycle}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Subscribers</p>
                <p className="text-xl font-bold text-gray-900">{plan.subscribers}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-xl font-bold text-green-600">{plan.revenue}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Management */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Feature Management</h2>
            <p className="text-sm text-gray-600 mt-1">Configure features available across all plans</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featureCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{feature.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                      </div>
                      <button className="p-1 hover:bg-white rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Plan Comparison Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left text-sm font-semibold text-gray-700 pb-4">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-center text-sm font-semibold text-gray-700 pb-4">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((_, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm text-gray-900">{plans[0].features[idx].name}</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 text-center">
                      {plan.features[idx]?.included ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

