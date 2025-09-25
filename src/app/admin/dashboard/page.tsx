"use client";

import { 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock
} from "lucide-react";

// Mock data for dashboard
const stats = [
  {
    name: "Total Revenue",
    value: "₹2,45,680",
    change: "+12.5%",
    changeType: "increase" as const,
    icon: DollarSign,
    period: "vs last month"
  },
  {
    name: "Orders",
    value: "1,247",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: ShoppingCart,
    period: "vs last month"
  },
  {
    name: "Customers",
    value: "892",
    change: "+15.3%",
    changeType: "increase" as const,
    icon: Users,
    period: "vs last month"
  },
  {
    name: "Products",
    value: "12",
    change: "0%",
    changeType: "neutral" as const,
    icon: Package,
    period: "active products"
  },
  {
    name: "Returns",
    value: "23",
    change: "-5.2%",
    changeType: "decrease" as const,
    icon: Package,
    period: "vs last month"
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    product: "Healthy Sugar Tablets",
    amount: "₹549",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Rajesh Kumar",
    product: "Healthy Sugar Syrup",
    amount: "₹1,149",
    status: "processing",
    date: "2024-01-15"
  },
  {
    id: "ORD-003",
    customer: "Anita Patel",
    product: "Healthy Sugar Powder",
    amount: "₹699",
    status: "shipped",
    date: "2024-01-14"
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    product: "Healthy Sugar Sachets",
    amount: "₹999",
    status: "completed",
    date: "2024-01-14"
  },
  {
    id: "ORD-005",
    customer: "Meera Joshi",
    product: "Healthy Sugar Tablets",
    amount: "₹299",
    status: "pending",
    date: "2024-01-13"
  },
];

const topProducts = [
  {
    name: "Healthy Sugar Tablets",
    sales: 456,
    revenue: "₹1,25,440",
    growth: "+18%"
  },
  {
    name: "Healthy Sugar Syrup",
    sales: 234,
    revenue: "₹2,68,866",
    growth: "+12%"
  },
  {
    name: "Healthy Sugar Powder",
    sales: 189,
    revenue: "₹1,32,111",
    growth: "+8%"
  },
  {
    name: "Healthy Sugar Sachets",
    sales: 167,
    revenue: "₹1,66,833",
    growth: "+15%"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </button>
        </div>
      </div>

      {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <stat.icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === "increase" 
                          ? "text-green-600" 
                          : stat.changeType === "neutral"
                          ? "text-gray-500"
                          : "text-red-600"
                      }`}>
                        {stat.changeType === "increase" && <ArrowUpRight className="h-4 w-4 mr-1" />}
                        {stat.changeType === "decrease" && <ArrowDownRight className="h-4 w-4 mr-1" />}
                        {stat.changeType === "neutral" && <span className="h-4 w-4 mr-1" />}
                        {stat.change}
                      </div>
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      {stat.period}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Orders
              </h3>
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                View all
              </button>
            </div>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {order.product}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium text-gray-900">
                          {order.amount}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Top Products
              </h3>
              <button className="text-sm text-brand hover:text-brand-dark font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-br from-brand/10 to-brand/20 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-brand font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {product.revenue}
                    </p>
                    <p className="text-sm text-green-600">
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group">
              <div className="p-2 bg-brand/10 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
                <Package className="h-6 w-6 text-brand" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Add Product</p>
                <p className="text-xs text-gray-500">Create new product</p>
              </div>
            </button>
            <button className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group">
              <div className="p-2 bg-brand/10 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
                <Eye className="h-6 w-6 text-brand" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">View Orders</p>
                <p className="text-xs text-gray-500">Manage all orders</p>
              </div>
            </button>
            <button className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group">
              <div className="p-2 bg-brand/10 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
                <Users className="h-6 w-6 text-brand" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Customers</p>
                <p className="text-xs text-gray-500">View customer list</p>
              </div>
            </button>
            <button className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group">
              <div className="p-2 bg-brand/10 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-brand" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Analytics</p>
                <p className="text-xs text-gray-500">View detailed reports</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
