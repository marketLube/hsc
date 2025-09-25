"use client";

import { useState } from "react";
import { 
  Zap,
  Plus,
  Edit,
  Eye,
  Play,
  Pause,
  Square,
  Copy,
  Trash2,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Mail,
  Smartphone,
  Share2,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Settings,
  BarChart3,
  Send,
  UserPlus,
  ShoppingCart,
  Gift,
  Star,
  MessageSquare,
  Bell,
  Repeat,
  Timer,
  Activity
} from "lucide-react";

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: "signup" | "purchase" | "cart_abandon" | "birthday" | "inactivity" | "custom";
    name: string;
    conditions?: string[];
  };
  status: "active" | "paused" | "draft" | "completed";
  createdDate: string;
  lastModified: string;
  totalContacts: number;
  activeContacts: number;
  completedContacts: number;
  conversionRate: string;
  revenue: string;
  steps: WorkflowStep[];
  tags: string[];
}

interface WorkflowStep {
  id: string;
  type: "email" | "sms" | "wait" | "condition" | "action";
  name: string;
  delay?: string;
  template?: string;
  condition?: string;
  action?: string;
}

interface AutomationStats {
  name: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: any;
  color: string;
}

// Mock Data
const automationStats: AutomationStats[] = [
  {
    name: "Active Workflows",
    value: "12",
    change: "+3",
    changeType: "increase",
    icon: Zap,
    color: "bg-blue-500"
  },
  {
    name: "Total Contacts",
    value: "2,847",
    change: "+156",
    changeType: "increase",
    icon: Users,
    color: "bg-green-500"
  },
  {
    name: "Automation Revenue",
    value: "₹1,24,560",
    change: "+18.5%",
    changeType: "increase",
    icon: TrendingUp,
    color: "bg-purple-500"
  },
  {
    name: "Avg Conversion Rate",
    value: "24.8%",
    change: "+2.3%",
    changeType: "increase",
    icon: Target,
    color: "bg-orange-500"
  }
];

const workflows: AutomationWorkflow[] = [
  {
    id: "1",
    name: "Welcome Series",
    description: "5-email welcome sequence for new subscribers",
    trigger: {
      type: "signup",
      name: "New Subscriber",
      conditions: ["Email signup", "Newsletter subscription"]
    },
    status: "active",
    createdDate: "2024-01-01",
    lastModified: "2024-01-15",
    totalContacts: 1245,
    activeContacts: 89,
    completedContacts: 1156,
    conversionRate: "28.5%",
    revenue: "₹45,680",
    steps: [
      { id: "1", type: "email", name: "Welcome Email", template: "Welcome Template" },
      { id: "2", type: "wait", name: "Wait 2 days", delay: "2 days" },
      { id: "3", type: "email", name: "Product Introduction", template: "Product Intro" },
      { id: "4", type: "wait", name: "Wait 3 days", delay: "3 days" },
      { id: "5", type: "email", name: "Health Tips", template: "Health Tips" }
    ],
    tags: ["Welcome", "Onboarding", "Email Series"]
  },
  {
    id: "2",
    name: "Abandoned Cart Recovery",
    description: "3-step cart recovery sequence with discount",
    trigger: {
      type: "cart_abandon",
      name: "Cart Abandoned",
      conditions: ["Cart value > ₹500", "No purchase within 2 hours"]
    },
    status: "active",
    createdDate: "2024-01-05",
    lastModified: "2024-01-14",
    totalContacts: 567,
    activeContacts: 45,
    completedContacts: 522,
    conversionRate: "35.2%",
    revenue: "₹67,890",
    steps: [
      { id: "1", type: "email", name: "Cart Reminder", template: "Cart Reminder" },
      { id: "2", type: "wait", name: "Wait 4 hours", delay: "4 hours" },
      { id: "3", type: "email", name: "Discount Offer", template: "10% Discount" },
      { id: "4", type: "wait", name: "Wait 24 hours", delay: "24 hours" },
      { id: "5", type: "sms", name: "Final Reminder SMS", template: "SMS Reminder" }
    ],
    tags: ["Cart Recovery", "Discount", "SMS"]
  },
  {
    id: "3",
    name: "Post-Purchase Follow-up",
    description: "Customer satisfaction and review request sequence",
    trigger: {
      type: "purchase",
      name: "Order Completed",
      conditions: ["Order status: Delivered", "First-time customer"]
    },
    status: "active",
    createdDate: "2024-01-08",
    lastModified: "2024-01-12",
    totalContacts: 892,
    activeContacts: 156,
    completedContacts: 736,
    conversionRate: "18.7%",
    revenue: "₹23,450",
    steps: [
      { id: "1", type: "wait", name: "Wait 3 days", delay: "3 days" },
      { id: "2", type: "email", name: "How are you enjoying?", template: "Satisfaction Check" },
      { id: "3", type: "wait", name: "Wait 7 days", delay: "7 days" },
      { id: "4", type: "email", name: "Review Request", template: "Review Request" },
      { id: "5", type: "condition", name: "Check if reviewed", condition: "Has left review" }
    ],
    tags: ["Post-Purchase", "Reviews", "Satisfaction"]
  },
  {
    id: "4",
    name: "Birthday Campaign",
    description: "Personalized birthday wishes with special offer",
    trigger: {
      type: "birthday",
      name: "Customer Birthday",
      conditions: ["Birthday in customer profile", "Active customer"]
    },
    status: "active",
    createdDate: "2024-01-10",
    lastModified: "2024-01-13",
    totalContacts: 234,
    activeContacts: 12,
    completedContacts: 222,
    conversionRate: "42.1%",
    revenue: "₹18,900",
    steps: [
      { id: "1", type: "email", name: "Birthday Wishes", template: "Birthday Email" },
      { id: "2", type: "action", name: "Generate Coupon", action: "Create 20% birthday coupon" },
      { id: "3", type: "sms", name: "Birthday SMS", template: "Birthday SMS" }
    ],
    tags: ["Birthday", "Personalized", "Special Offer"]
  },
  {
    id: "5",
    name: "Win-back Campaign",
    description: "Re-engage inactive customers with special offers",
    trigger: {
      type: "inactivity",
      name: "Inactive Customer",
      conditions: ["No purchase in 90 days", "Previous customer"]
    },
    status: "paused",
    createdDate: "2024-01-12",
    lastModified: "2024-01-15",
    totalContacts: 345,
    activeContacts: 0,
    completedContacts: 289,
    conversionRate: "15.3%",
    revenue: "₹12,340",
    steps: [
      { id: "1", type: "email", name: "We miss you", template: "Win-back Email" },
      { id: "2", type: "wait", name: "Wait 5 days", delay: "5 days" },
      { id: "3", type: "email", name: "Special Comeback Offer", template: "Comeback Offer" },
      { id: "4", type: "wait", name: "Wait 7 days", delay: "7 days" },
      { id: "5", type: "sms", name: "Last Chance SMS", template: "Last Chance" }
    ],
    tags: ["Win-back", "Inactive", "Special Offer"]
  }
];

const triggerTypes = [
  { id: "signup", name: "New Signup", icon: UserPlus, description: "When someone subscribes to your list" },
  { id: "purchase", name: "Purchase Made", icon: ShoppingCart, description: "When a customer completes a purchase" },
  { id: "cart_abandon", name: "Cart Abandoned", icon: ShoppingCart, description: "When someone leaves items in cart" },
  { id: "birthday", name: "Birthday", icon: Gift, description: "On customer's birthday" },
  { id: "inactivity", name: "Inactivity", icon: Clock, description: "When customer becomes inactive" },
  { id: "custom", name: "Custom Event", icon: Settings, description: "Custom trigger based on your criteria" }
];

export default function AutomationPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "builder">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTriggerIcon = (type: string) => {
    const trigger = triggerTypes.find(t => t.id === type);
    return trigger ? trigger.icon : Settings;
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail;
      case "sms":
        return Smartphone;
      case "wait":
        return Clock;
      case "condition":
        return Target;
      case "action":
        return Zap;
      default:
        return Settings;
    }
  };

  const filteredWorkflows = filterStatus === "all" 
    ? workflows 
    : workflows.filter(workflow => workflow.status === filterStatus);

  const renderWorkflowList = () => (
    <div className="space-y-6">
      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => {
          const TriggerIcon = getTriggerIcon(workflow.trigger.type);
          return (
            <div key={workflow.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              {/* Workflow Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TriggerIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{workflow.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Trigger:</span>
                      <span className="text-xs font-medium text-gray-700">{workflow.trigger.name}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                  {workflow.status}
                </span>
              </div>

              {/* Workflow Steps Preview */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {workflow.steps.slice(0, 4).map((step, index) => {
                    const StepIcon = getStepIcon(step.type);
                    return (
                      <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                        <div className="p-1.5 bg-gray-100 rounded-lg">
                          <StepIcon className="h-3 w-3 text-gray-600" />
                        </div>
                        {index < Math.min(workflow.steps.length - 1, 3) && (
                          <ArrowRight className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    );
                  })}
                  {workflow.steps.length > 4 && (
                    <span className="text-xs text-gray-500 ml-2">+{workflow.steps.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{workflow.totalContacts}</p>
                  <p className="text-xs text-gray-500">Total Contacts</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{workflow.conversionRate}</p>
                  <p className="text-xs text-gray-500">Conversion</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{workflow.revenue}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {workflow.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
                {workflow.tags.length > 2 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    +{workflow.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedWorkflow(workflow)}
                    className="text-xs text-brand hover:text-brand-dark font-medium"
                  >
                    View Details
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    Edit
                  </button>
                </div>
                <div className="flex items-center space-x-1">
                  {workflow.status === "active" ? (
                    <button className="p-1 text-yellow-600 hover:text-yellow-700">
                      <Pause className="h-4 w-4" />
                    </button>
                  ) : workflow.status === "paused" ? (
                    <button className="p-1 text-green-600 hover:text-green-700">
                      <Play className="h-4 w-4" />
                    </button>
                  ) : null}
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWorkflowBuilder = () => (
    <div className="space-y-6">
      {/* Builder Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Automation</h3>
        
        {/* Trigger Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Choose a Trigger</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {triggerTypes.map((trigger) => (
              <button
                key={trigger.id}
                className="p-4 border border-gray-200 rounded-xl hover:border-brand hover:bg-brand/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-brand group-hover:text-white transition-colors">
                    <trigger.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trigger.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{trigger.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Workflow Steps</h4>
          <div className="bg-gray-50 rounded-xl p-6 min-h-[300px]">
            <div className="flex flex-col items-center space-y-4">
              {/* Start Node */}
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white font-medium">
                Start
              </div>
              
              <ArrowRight className="h-4 w-4 text-gray-400 transform rotate-90" />
              
              {/* Add Step Button */}
              <button className="flex items-center justify-center w-32 h-16 border-2 border-dashed border-gray-300 rounded-xl hover:border-brand hover:bg-brand/5 transition-all duration-200 group">
                <div className="text-center">
                  <Plus className="h-5 w-5 text-gray-400 group-hover:text-brand mx-auto mb-1" />
                  <span className="text-xs text-gray-500 group-hover:text-brand">Add Step</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Step Library */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Available Actions</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-200">
              <Mail className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-700">Send Email</span>
            </button>
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-200">
              <Smartphone className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-700">Send SMS</span>
            </button>
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-200">
              <Clock className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-700">Wait</span>
            </button>
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-200">
              <Target className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-700">Condition</span>
            </button>
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-200">
              <Zap className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-700">Action</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Marketing Automation
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create automated workflows to engage customers and drive conversions
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button 
            onClick={() => setViewMode(viewMode === "list" ? "builder" : "list")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200"
          >
            {viewMode === "list" ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                View Workflows
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {automationStats.map((stat, index) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 ${stat.color} rounded-xl shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
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
                          : stat.changeType === "decrease" 
                          ? "text-red-600" 
                          : "text-gray-500"
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewMode === "list" && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand w-64"
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {renderWorkflowList()}
        </>
      )}

      {viewMode === "builder" && renderWorkflowBuilder()}

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedWorkflow.name}</h3>
              <button 
                onClick={() => setSelectedWorkflow(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Workflow Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedWorkflow.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Trigger</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900">{selectedWorkflow.trigger.name}</p>
                    {selectedWorkflow.trigger.conditions && (
                      <ul className="text-xs text-gray-600 mt-1">
                        {selectedWorkflow.trigger.conditions.map((condition, index) => (
                          <li key={index}>• {condition}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-gray-900">{selectedWorkflow.totalContacts}</p>
                      <p className="text-xs text-gray-500">Total Contacts</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-gray-900">{selectedWorkflow.conversionRate}</p>
                      <p className="text-xs text-gray-500">Conversion Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow Steps */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Workflow Steps</h4>
                <div className="space-y-3">
                  {selectedWorkflow.steps.map((step, index) => {
                    const StepIcon = getStepIcon(step.type);
                    return (
                      <div key={step.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-white rounded-lg">
                            <StepIcon className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{step.name}</p>
                          {step.delay && (
                            <p className="text-xs text-gray-500">Delay: {step.delay}</p>
                          )}
                          {step.template && (
                            <p className="text-xs text-gray-500">Template: {step.template}</p>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {index + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setSelectedWorkflow(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark">
                Edit Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
