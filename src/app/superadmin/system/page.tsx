'use client';

import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Database,
  Globe,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function SystemMonitoringPage() {
  const systemHealth = [
    { label: 'Server Status', value: 'Operational', status: 'healthy', icon: Server, color: 'from-green-500 to-green-600' },
    { label: 'Database', value: '99.98%', status: 'healthy', icon: Database, color: 'from-blue-500 to-blue-600' },
    { label: 'API Services', value: 'All Running', status: 'healthy', icon: Zap, color: 'from-purple-500 to-purple-600' },
    { label: 'CDN Status', value: 'Active', status: 'healthy', icon: Globe, color: 'from-orange-500 to-orange-600' },
  ];

  const serverMetrics = [
    { name: 'Server 1 - US East', cpu: 42, memory: 68, disk: 54, requests: '12.5K/min', status: 'healthy' },
    { name: 'Server 2 - EU West', cpu: 38, memory: 72, disk: 48, requests: '10.8K/min', status: 'healthy' },
    { name: 'Server 3 - Asia Pacific', cpu: 56, memory: 81, disk: 62, requests: '15.2K/min', status: 'warning' },
    { name: 'Server 4 - US West', cpu: 35, memory: 65, disk: 45, requests: '9.4K/min', status: 'healthy' },
  ];

  const performanceMetrics = [
    { time: '00:00', cpu: 35, memory: 62, requests: 8500 },
    { time: '04:00', cpu: 28, memory: 58, requests: 6200 },
    { time: '08:00', cpu: 45, memory: 68, requests: 12400 },
    { time: '12:00', cpu: 58, memory: 75, requests: 18200 },
    { time: '16:00', cpu: 52, memory: 72, requests: 15800 },
    { time: '20:00', cpu: 42, memory: 65, requests: 11200 },
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'High memory usage on Server 3', time: '2 hours ago', resolved: false },
    { id: 2, type: 'info', message: 'Scheduled maintenance completed', time: '5 hours ago', resolved: true },
    { id: 3, type: 'success', message: 'Database backup completed successfully', time: '8 hours ago', resolved: true },
    { id: 4, type: 'warning', message: 'API response time above threshold', time: '12 hours ago', resolved: true },
  ];

  const maxRequests = Math.max(...performanceMetrics.map(m => m.requests));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time server health and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
          </div>
          <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold">
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemHealth.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{item.value}</p>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-600">Healthy</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Requests</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-64">
          {performanceMetrics.map((metric, index) => {
            const requestHeight = (metric.requests / maxRequests) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="relative w-full flex items-end justify-center gap-1">
                  <div
                    className="w-1/3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                    style={{ height: `${metric.cpu * 2}px` }}
                    title={`CPU: ${metric.cpu}%`}
                  />
                  <div
                    className="w-1/3 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                    style={{ height: `${metric.memory * 2}px` }}
                    title={`Memory: ${metric.memory}%`}
                  />
                  <div
                    className="w-1/3 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                    style={{ height: `${requestHeight * 2}px` }}
                    title={`Requests: ${metric.requests}`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{metric.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Server Metrics */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Server Instances</h2>
        <div className="space-y-4">
          {serverMetrics.map((server, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    server.status === 'healthy' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Server className={`w-5 h-5 ${
                      server.status === 'healthy' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{server.name}</h3>
                    <p className="text-sm text-gray-600">{server.requests} requests/min</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  server.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {server.status === 'healthy' ? 'Healthy' : 'Warning'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* CPU */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">CPU</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{server.cpu}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        server.cpu < 50 ? 'bg-green-500' : server.cpu < 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${server.cpu}%` }}
                    />
                  </div>
                </div>

                {/* Memory */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">Memory</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{server.memory}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        server.memory < 50 ? 'bg-green-500' : server.memory < 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${server.memory}%` }}
                    />
                  </div>
                </div>

                {/* Disk */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">Disk</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{server.disk}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        server.disk < 50 ? 'bg-green-500' : server.disk < 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${server.disk}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />}
                {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
                {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
                {alert.resolved && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Resolved
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resource Usage</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Total Storage Used</span>
                <span className="text-lg font-bold text-gray-900">2.4 TB / 5 TB</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Total Bandwidth (Month)</span>
                <span className="text-lg font-bold text-gray-900">8.9 TB / 20 TB</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: '44.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">API Requests (Today)</span>
                <span className="text-lg font-bold text-gray-900">842K / 1M</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '84.2%' }} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Avg Response Time</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-xl font-bold text-gray-900">124ms</p>
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Error Rate</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-xl font-bold text-gray-900">0.02%</p>
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

