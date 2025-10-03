'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Users,
  Package,
  Headphones,
  Globe,
  Server,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Activity,
  Zap,
  Shield,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/superadmin' },
  { id: 'tenants', label: 'Tenant Management', icon: Store, path: '/superadmin/tenants' },
  { id: 'billing', label: 'Billing & Payments', icon: CreditCard, path: '/superadmin/billing' },
  { id: 'plans', label: 'Plans & Features', icon: Package, path: '/superadmin/plans' },
  { id: 'users', label: 'User Management', icon: Users, path: '/superadmin/users' },
  { id: 'support', label: 'Support Center', icon: Headphones, path: '/superadmin/support', badge: '12' },
  { id: 'domains', label: 'Domains', icon: Globe, path: '/superadmin/domains' },
  { id: 'system', label: 'System Monitoring', icon: Server, path: '/superadmin/system' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/superadmin/analytics' },
  { id: 'activity', label: 'Activity Logs', icon: FileText, path: '/superadmin/activity' },
  { id: 'integrations', label: 'Integrations', icon: Zap, path: '/superadmin/integrations' },
  { id: 'security', label: 'Security', icon: Shield, path: '/superadmin/security' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/superadmin/settings' },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" suppressHydrationWarning>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:block hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Super Admin Portal</h1>
              <p className="text-xs text-gray-500">Platform Management</p>
            </div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants, users, tickets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* System Health Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">All Systems Operational</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Platform Admin</p>
              <p className="text-xs text-gray-500">admin@platform.com</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
              PA
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        suppressHydrationWarning
        className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 z-20 transition-all duration-300 overflow-hidden ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-full overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  <span className={`text-sm font-medium flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'hidden lg:hidden' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && sidebarOpen && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-6 left-3 right-3 pt-6 border-t border-gray-200 mt-6">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`text-sm font-medium ${!sidebarOpen ? 'hidden lg:hidden' : ''}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        }`}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

