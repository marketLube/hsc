"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Eye,
  MoreHorizontal,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  BarChart3,
  Activity,
  GitBranch,
  Mail,
  MessageSquare,
  Bell,
  ShoppingCart,
  Package,
  Users,
  Tag,
  DollarSign,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Target,
  Workflow,
  ArrowRight,
  Database,
  Send,
  Filter as FilterIcon,
  Code,
  Layers,
  RefreshCw,
  Sparkles,
  Cpu,
  Globe,
  Smartphone,
  MousePointer
} from "lucide-react";

type WorkflowStatus = "active" | "paused" | "draft" | "archived";
type TriggerType = "order_placed" | "cart_abandoned" | "customer_signup" | "product_low_stock" | "payment_received" | "shipping_delayed" | "review_submitted" | "customer_inactive" | "vip_milestone" | "birthday";
type ActionType = "send_email" | "send_sms" | "send_push" | "update_status" | "add_tag" | "create_task" | "webhook" | "discount_code" | "loyalty_points" | "notification";

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: {
    type: TriggerType;
    conditions: string[];
  };
  actions: {
    type: ActionType;
    config: Record<string, any>;
    delay?: number; // in minutes
  }[];
  filters: {
    customerSegment?: string;
    orderValue?: { min?: number; max?: number };
    productCategory?: string[];
    timeWindow?: string;
  };
  stats: {
    triggered: number;
    executed: number;
    successRate: number;
    revenue: number;
  };
  createdDate: string;
  lastRun?: string;
  createdBy: string;
}

// Mock workflow data
const mockWorkflows: Workflow[] = [
  {
    id: "1",
    name: "Abandoned Cart Recovery - 3 Step",
    description: "Automated email sequence to recover abandoned carts with progressive discounts",
    status: "active",
    trigger: {
      type: "cart_abandoned",
      conditions: ["Cart value > ₹500", "Items in cart > 1"]
    },
    actions: [
      { type: "send_email", config: { template: "Cart Reminder", subject: "You left items in your cart!" }, delay: 60 },
      { type: "discount_code", config: { code: "COMEBACK10", discount: 10, type: "percentage" }, delay: 1440 },
      { type: "send_email", config: { template: "Last Chance", subject: "Last chance: 10% off your cart!" }, delay: 2880 }
    ],
    filters: {
      orderValue: { min: 500 },
      timeWindow: "24 hours"
    },
    stats: {
      triggered: 347,
      executed: 1041,
      successRate: 18.5,
      revenue: 458900
    },
    createdDate: "2024-01-01T00:00:00Z",
    lastRun: "2024-01-19T14:30:00Z",
    createdBy: "Admin"
  },
  {
    id: "2",
    name: "Welcome Series for New Customers",
    description: "5-email welcome series with product education and exclusive discount",
    status: "active",
    trigger: {
      type: "customer_signup",
      conditions: ["First-time customer", "Email verified"]
    },
    actions: [
      { type: "send_email", config: { template: "Welcome Email", subject: "Welcome to Healthy Sugar!" }, delay: 0 },
      { type: "loyalty_points", config: { points: 100, reason: "Welcome bonus" }, delay: 0 },
      { type: "send_email", config: { template: "Product Guide", subject: "How to use our products" }, delay: 1440 },
      { type: "discount_code", config: { code: "WELCOME15", discount: 15, type: "percentage", expires: 7 }, delay: 2880 },
      { type: "send_email", config: { template: "Discount Reminder", subject: "Your 15% discount expires soon!" }, delay: 8640 }
    ],
    filters: {
      customerSegment: "New customers"
    },
    stats: {
      triggered: 892,
      executed: 4460,
      successRate: 32.4,
      revenue: 234560
    },
    createdDate: "2023-11-01T00:00:00Z",
    lastRun: "2024-01-19T16:45:00Z",
    createdBy: "Marketing Team"
  },
  {
    id: "3",
    name: "Low Stock Alert to Procurement",
    description: "Notify procurement team when product stock falls below reorder level",
    status: "active",
    trigger: {
      type: "product_low_stock",
      conditions: ["Stock < Reorder level", "Product status = Active"]
    },
    actions: [
      { type: "create_task", config: { assignee: "Procurement", priority: "high", title: "Reorder required" }, delay: 0 },
      { type: "send_email", config: { to: "procurement@healthysugar.com", subject: "Low Stock Alert" }, delay: 0 },
      { type: "notification", config: { team: "Procurement", type: "urgent" }, delay: 0 }
    ],
    filters: {},
    stats: {
      triggered: 23,
      executed: 69,
      successRate: 100,
      revenue: 0
    },
    createdDate: "2024-01-10T00:00:00Z",
    lastRun: "2024-01-19T11:20:00Z",
    createdBy: "Operations"
  },
  {
    id: "4",
    name: "VIP Customer Birthday Reward",
    description: "Send birthday discount and bonus loyalty points to VIP customers",
    status: "active",
    trigger: {
      type: "birthday",
      conditions: ["Customer tier = VIP", "Active in last 90 days"]
    },
    actions: [
      { type: "send_email", config: { template: "Birthday Email", subject: "Happy Birthday! Here's a gift 🎉" }, delay: 0 },
      { type: "discount_code", config: { code: "BIRTHDAY25", discount: 25, type: "percentage", expires: 7 }, delay: 0 },
      { type: "loyalty_points", config: { points: 500, reason: "Birthday bonus" }, delay: 0 },
      { type: "send_sms", config: { message: "Happy Birthday! Enjoy 25% off + 500 bonus points" }, delay: 0 }
    ],
    filters: {
      customerSegment: "VIP only"
    },
    stats: {
      triggered: 45,
      executed: 180,
      successRate: 45.2,
      revenue: 178900
    },
    createdDate: "2024-01-05T00:00:00Z",
    lastRun: "2024-01-19T08:00:00Z",
    createdBy: "Marketing Team"
  },
  {
    id: "5",
    name: "Order Confirmation & Tracking Updates",
    description: "Automated order status notifications via email and SMS",
    status: "active",
    trigger: {
      type: "order_placed",
      conditions: ["Payment confirmed"]
    },
    actions: [
      { type: "send_email", config: { template: "Order Confirmation", subject: "Order confirmed!" }, delay: 0 },
      { type: "send_sms", config: { message: "Your order {order_number} is confirmed" }, delay: 0 },
      { type: "notification", config: { type: "order_update" }, delay: 0 }
    ],
    filters: {},
    stats: {
      triggered: 2845,
      executed: 8535,
      successRate: 99.8,
      revenue: 0
    },
    createdDate: "2023-10-15T00:00:00Z",
    lastRun: "2024-01-19T17:00:00Z",
    createdBy: "System"
  },
  {
    id: "6",
    name: "Inactive Customer Reactivation",
    description: "Win back customers who haven't purchased in 60 days with special offer",
    status: "active",
    trigger: {
      type: "customer_inactive",
      conditions: ["No purchase in 60 days", "Previous orders > 2"]
    },
    actions: [
      { type: "send_email", config: { template: "We Miss You", subject: "We miss you! Here's 20% off" }, delay: 0 },
      { type: "discount_code", config: { code: "COMEBACK20", discount: 20, type: "percentage", expires: 14 }, delay: 0 },
      { type: "send_push", config: { title: "Come back!", message: "20% off your next order" }, delay: 2880 }
    ],
    filters: {
      customerSegment: "Inactive (60+ days)",
      orderValue: { min: 500 }
    },
    stats: {
      triggered: 156,
      executed: 468,
      successRate: 12.8,
      revenue: 98400
    },
    createdDate: "2024-01-08T00:00:00Z",
    lastRun: "2024-01-18T09:00:00Z",
    createdBy: "Marketing Team"
  },
  {
    id: "7",
    name: "Review Request After Delivery",
    description: "Request product review 3 days after successful delivery",
    status: "active",
    trigger: {
      type: "order_placed",
      conditions: ["Status = Delivered", "Delivery confirmed"]
    },
    actions: [
      { type: "send_email", config: { template: "Review Request", subject: "How was your experience?" }, delay: 4320 },
      { type: "loyalty_points", config: { points: 50, reason: "Review bonus", condition: "If review submitted" }, delay: 4320 }
    ],
    filters: {},
    stats: {
      triggered: 234,
      executed: 234,
      successRate: 28.6,
      revenue: 0
    },
    createdDate: "2024-01-12T00:00:00Z",
    lastRun: "2024-01-19T12:00:00Z",
    createdBy: "Customer Success"
  },
  {
    id: "8",
    name: "Shipping Delay Notification",
    description: "Proactively inform customers about shipping delays and offer compensation",
    status: "paused",
    trigger: {
      type: "shipping_delayed",
      conditions: ["Delay > 2 days", "Customer not notified"]
    },
    actions: [
      { type: "send_email", config: { template: "Delay Apology", subject: "Update on your order" }, delay: 0 },
      { type: "send_sms", config: { message: "Your order is delayed. We apologize!" }, delay: 0 },
      { type: "discount_code", config: { code: "SORRY10", discount: 10, type: "percentage", expires: 30 }, delay: 0 }
    ],
    filters: {},
    stats: {
      triggered: 12,
      executed: 36,
      successRate: 75.0,
      revenue: 0
    },
    createdDate: "2024-01-15T00:00:00Z",
    lastRun: "2024-01-17T14:30:00Z",
    createdBy: "Operations"
  }
];

// Workflow templates
const workflowTemplates = [
  { id: "t1", name: "Abandoned Cart Recovery", category: "Sales", icon: ShoppingCart, color: "blue", workflows: 3 },
  { id: "t2", name: "Customer Onboarding", category: "Engagement", icon: Users, color: "green", workflows: 2 },
  { id: "t3", name: "Order Notifications", category: "Operations", icon: Package, color: "purple", workflows: 5 },
  { id: "t4", name: "Loyalty & Rewards", category: "Marketing", icon: Tag, color: "yellow", workflows: 4 },
  { id: "t5", name: "Review Generation", category: "Growth", icon: MessageSquare, color: "pink", workflows: 2 },
  { id: "t6", name: "Stock Management", category: "Operations", icon: Database, color: "red", workflows: 3 }
];

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<"workflows" | "templates" | "analytics" | "settings">("workflows");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [triggerFilter, setTriggerFilter] = useState<string>("all");

  const workflows = mockWorkflows;

  // Filter workflows
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = 
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter;
    const matchesTrigger = triggerFilter === "all" || workflow.trigger.type === triggerFilter;
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  // Calculate stats
  const stats = {
    totalWorkflows: workflows.length,
    activeWorkflows: workflows.filter(w => w.status === "active").length,
    totalTriggered: workflows.reduce((sum, w) => sum + w.stats.triggered, 0),
    totalExecuted: workflows.reduce((sum, w) => sum + w.stats.executed, 0),
    totalRevenue: workflows.reduce((sum, w) => sum + w.stats.revenue, 0),
    avgSuccessRate: workflows.length > 0 
      ? workflows.reduce((sum, w) => sum + w.stats.successRate, 0) / workflows.length 
      : 0
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const getStatusColor = (status: WorkflowStatus) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "archived": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTriggerIcon = (type: TriggerType) => {
    switch (type) {
      case "order_placed": return ShoppingCart;
      case "cart_abandoned": return AlertTriangle;
      case "customer_signup": return Users;
      case "product_low_stock": return Package;
      case "payment_received": return DollarSign;
      case "shipping_delayed": return Clock;
      case "review_submitted": return MessageSquare;
      case "customer_inactive": return XCircle;
      case "vip_milestone": return Target;
      case "birthday": return Calendar;
      default: return Zap;
    }
  };

  const getActionIcon = (type: ActionType) => {
    switch (type) {
      case "send_email": return Mail;
      case "send_sms": return MessageSquare;
      case "send_push": return Bell;
      case "update_status": return RefreshCw;
      case "add_tag": return Tag;
      case "create_task": return CheckCircle;
      case "webhook": return Code;
      case "discount_code": return Tag;
      case "loyalty_points": return Sparkles;
      case "notification": return Bell;
      default: return Zap;
    }
  };

  const getTriggerLabel = (type: TriggerType) => {
    return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const getActionLabel = (type: ActionType) => {
    return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Workflow Automation
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage automated workflows to streamline operations and boost revenue
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Workflows</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeWorkflows}</p>
                <p className="text-xs text-gray-500 mt-1">of {stats.totalWorkflows} total</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Triggered</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTriggered.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.totalExecuted.toLocaleString()} actions</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue Generated</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">+28% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgSuccessRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+4.2% improvement</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "workflows", name: "Active Workflows", icon: Workflow, count: stats.activeWorkflows },
            { id: "templates", name: "Templates", icon: Layers, count: workflowTemplates.length },
            { id: "analytics", name: "Analytics", icon: BarChart3 },
            { id: "settings", name: "Settings", icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Workflows Tab */}
      {activeTab === "workflows" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={triggerFilter}
                  onChange={(e) => setTriggerFilter(e.target.value)}
                >
                  <option value="all">All Triggers</option>
                  <option value="order_placed">Order Placed</option>
                  <option value="cart_abandoned">Cart Abandoned</option>
                  <option value="customer_signup">Customer Signup</option>
                  <option value="product_low_stock">Low Stock</option>
                  <option value="birthday">Birthday</option>
                </select>
              </div>
            </div>
          </div>

          {/* Workflows List */}
          <div className="space-y-4">
            {filteredWorkflows.map((workflow) => {
              const TriggerIcon = getTriggerIcon(workflow.trigger.type);
              
              return (
                <div key={workflow.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                          <TriggerIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{workflow.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                              {workflow.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{workflow.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Created by {workflow.createdBy}</span>
                            <span>•</span>
                            <span>Last run: {formatDate(workflow.lastRun || "")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Trigger */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2 flex items-center">
                          <Cpu className="h-3 w-3 mr-1" />
                          TRIGGER
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3">
                          <div className="text-sm font-semibold text-gray-900 mb-2">
                            {getTriggerLabel(workflow.trigger.type)}
                          </div>
                          <div className="space-y-1">
                            {workflow.trigger.conditions.map((condition, idx) => (
                              <div key={idx} className="text-xs text-gray-600 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                {condition}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2 flex items-center">
                          <GitBranch className="h-3 w-3 mr-1" />
                          ACTIONS ({workflow.actions.length})
                        </div>
                        <div className="space-y-2">
                          {workflow.actions.slice(0, 3).map((action, idx) => {
                            const ActionIcon = getActionIcon(action.type);
                            return (
                              <div key={idx} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                                <ActionIcon className="h-4 w-4 text-gray-600" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium text-gray-900 truncate">
                                    {getActionLabel(action.type)}
                                  </div>
                                  {action.delay && action.delay > 0 && (
                                    <div className="text-xs text-gray-500">
                                      Delay: {action.delay < 1440 ? `${action.delay}m` : `${Math.floor(action.delay / 1440)}d`}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          {workflow.actions.length > 3 && (
                            <div className="text-xs text-gray-500 pl-2">
                              +{workflow.actions.length - 3} more actions
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2 flex items-center">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          PERFORMANCE
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="text-xs text-gray-500">Triggered</div>
                            <div className="text-lg font-bold text-gray-900">{workflow.stats.triggered}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="text-xs text-gray-500">Success</div>
                            <div className="text-lg font-bold text-green-600">{workflow.stats.successRate}%</div>
                          </div>
                          {workflow.stats.revenue > 0 && (
                            <div className="col-span-2 bg-green-50 rounded-lg p-2">
                              <div className="text-xs text-gray-500">Revenue</div>
                              <div className="text-lg font-bold text-green-600">{formatCurrency(workflow.stats.revenue)}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {workflow.status === "active" ? (
                          <button className="inline-flex items-center px-3 py-1.5 border border-yellow-300 rounded-lg text-xs font-medium text-yellow-700 bg-white hover:bg-yellow-50 transition-colors">
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </button>
                        ) : (
                          <button className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-lg text-xs font-medium text-green-700 bg-white hover:bg-green-50 transition-colors">
                            <Play className="h-3 w-3 mr-1" />
                            Activate
                          </button>
                        )}
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                          <Copy className="h-3 w-3 mr-1" />
                          Duplicate
                        </button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready-to-Use Workflow Templates</h3>
            <p className="text-gray-600">Start with proven templates and customize them for your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
                <div className={`p-3 bg-${template.color}-100 rounded-xl w-fit mb-4`}>
                  <template.icon className={`h-6 w-6 text-${template.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{template.workflows} workflows</span>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Trigger Type</h3>
              <div className="space-y-3">
                {["Cart Abandoned", "Order Placed", "Customer Signup", "Low Stock", "Birthday"].map((trigger, idx) => {
                  const percentage = [35, 28, 18, 12, 7][idx];
                  return (
                    <div key={trigger}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{trigger}</span>
                        <span className="font-semibold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Workflow</h3>
              <div className="space-y-3">
                {workflows.filter(w => w.stats.revenue > 0).sort((a, b) => b.stats.revenue - a.stats.revenue).slice(0, 5).map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{workflow.name}</div>
                      <div className="text-xs text-gray-500">{workflow.stats.triggered} executions</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(workflow.stats.revenue)}</div>
                      <div className="text-xs text-gray-500">{workflow.stats.successRate}% success</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="text-sm font-medium text-gray-900">Enable Global Automation</div>
                <div className="text-xs text-gray-500">Turn on/off all automated workflows</div>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                <div className="text-xs text-gray-500">Notify when workflows trigger or fail</div>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-gray-900">Debug Mode</div>
                <div className="text-xs text-gray-500">Log detailed workflow execution data</div>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

