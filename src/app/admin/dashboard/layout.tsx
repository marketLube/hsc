"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Gift, 
  Star, 
  Truck, 
  RefreshCw,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Globe,
  Calculator,
  Shield
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/dashboard/products", icon: Package },
  { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/dashboard/customers", icon: Users },
  { name: "Accounts", href: "/admin/dashboard/accounts", icon: Calculator },
  { name: "User Management", href: "/admin/dashboard/users", icon: Shield },
  { name: "Inventory", href: "/admin/dashboard/inventory", icon: BarChart3 },
  { name: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart3 },
  { name: "Marketing", href: "/admin/dashboard/marketing", icon: Gift },
  { name: "Content", href: "/admin/dashboard/content", icon: FileText },
  { name: "Search Engine", href: "/admin/dashboard/search-engine", icon: Globe },
  { name: "Reviews", href: "/admin/dashboard/reviews", icon: Star },
  { name: "Shipping", href: "/admin/dashboard/shipping", icon: Truck },
  { name: "Returns", href: "/admin/dashboard/returns", icon: RefreshCw },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HSC</span>
              </div>
              <span className="ml-2 text-xl font-bold text-ink">Admin</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/25"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md"
                    }`}
                  >
                    <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200 shadow-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="h-10 w-10 bg-gradient-to-br from-brand to-brand-dark rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                  <span className="text-white font-bold text-sm">HSC</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-ink to-gray-700 bg-clip-text text-transparent">Admin Panel</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                        isActive
                          ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/25"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md"
                      }`}
                    >
                      <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md backdrop-blur-sm">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:shadow-md"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <button
                type="button"
                className="bg-white p-2 rounded-xl text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-105"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="max-w-xs bg-white flex items-center text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-105 px-2 py-1"
                  >
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-medium">A</span>
                    </div>
                    <span className="hidden md:block ml-2 text-gray-700 text-sm font-medium">Admin</span>
                    <ChevronDown className="hidden md:block ml-1 h-4 w-4 text-gray-400 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
