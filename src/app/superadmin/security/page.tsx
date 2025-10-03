'use client';

import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Globe,
  UserX,
  Activity,
} from 'lucide-react';

export default function SecurityPage() {
  const securityMetrics = [
    { label: 'Security Score', value: '98/100', icon: Shield, color: 'from-green-500 to-green-600', status: 'excellent' },
    { label: 'Failed Login Attempts', value: '12', icon: XCircle, color: 'from-red-500 to-red-600', status: 'warning' },
    { label: 'Active Sessions', value: '1,284', icon: Activity, color: 'from-blue-500 to-blue-600', status: 'normal' },
    { label: 'Blocked IPs', value: '48', icon: UserX, color: 'from-orange-500 to-orange-600', status: 'normal' },
  ];

  const recentSecurityEvents = [
    {
      id: 1,
      type: 'warning',
      icon: AlertTriangle,
      event: 'Multiple failed login attempts',
      details: 'IP: 185.234.219.45 - 5 failed attempts in 10 minutes',
      time: '5 minutes ago',
      action: 'IP temporarily blocked',
    },
    {
      id: 2,
      type: 'info',
      icon: CheckCircle,
      event: 'SSL certificate renewed',
      details: 'healthysugar.com - Valid until Dec 15, 2025',
      time: '2 hours ago',
      action: 'Auto-renewed',
    },
    {
      id: 3,
      type: 'success',
      icon: Shield,
      event: '2FA enabled',
      details: 'User: john@platform.com enabled two-factor authentication',
      time: '4 hours ago',
      action: 'Security enhanced',
    },
    {
      id: 4,
      type: 'warning',
      icon: AlertTriangle,
      event: 'Suspicious API activity',
      details: 'Unusual API request pattern detected from tenant: Green Tea Shop',
      time: '6 hours ago',
      action: 'Monitoring',
    },
  ];

  const accessControls = [
    { feature: 'Two-Factor Authentication', status: 'Enabled', mandatory: true },
    { feature: 'IP Whitelist', status: 'Enabled', mandatory: false },
    { feature: 'Session Timeout', status: 'Enabled', mandatory: true },
    { feature: 'Password Complexity', status: 'Enabled', mandatory: true },
    { feature: 'API Rate Limiting', status: 'Enabled', mandatory: true },
    { feature: 'Audit Logging', status: 'Enabled', mandatory: true },
  ];

  const blockedIPs = [
    { ip: '185.234.219.45', reason: 'Multiple failed login attempts', blocked: '2025-10-03 14:30', expires: '2025-10-04 14:30' },
    { ip: '91.198.174.192', reason: 'Suspicious API activity', blocked: '2025-10-03 12:15', expires: '2025-10-04 12:15' },
    { ip: '45.142.120.10', reason: 'DDoS attack attempt', blocked: '2025-10-02 18:20', expires: 'Permanent' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-600 mt-1">Monitor and manage platform security</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-700">All Security Checks Passed</span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Security Events */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Security Events</h2>
        <div className="space-y-3">
          {recentSecurityEvents.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.type === 'warning' ? 'bg-yellow-100' :
                  event.type === 'success' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    event.type === 'warning' ? 'text-yellow-600' :
                    event.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-semibold text-gray-900">{event.event}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{event.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.details}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    event.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    event.type === 'success' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {event.action}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Access Controls & Blocked IPs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Access Controls</h2>
          <div className="space-y-3">
            {accessControls.map((control, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {control.status === 'Enabled' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{control.feature}</p>
                    {control.mandatory && (
                      <p className="text-xs text-orange-600 font-medium">Required</p>
                    )}
                  </div>
                </div>
                <button
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    control.status === 'Enabled' ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                  disabled={control.mandatory}
                >
                  <span
                    className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                      control.status === 'Enabled' ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Blocked IPs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Blocked IP Addresses</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {blockedIPs.map((item, index) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-red-600" />
                    <span className="font-mono font-bold text-gray-900">{item.ip}</span>
                  </div>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium">Unblock</button>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.reason}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Blocked: {item.blocked}
                  </span>
                  <span>Expires: {item.expires}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Security Best Practices</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Enforce 2FA for all admin users</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Review audit logs regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Keep SSL certificates up to date</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Monitor for unusual activity patterns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

