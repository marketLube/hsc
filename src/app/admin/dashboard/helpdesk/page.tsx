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
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Send,
  Paperclip,
  Smile,
  Star,
  AlertTriangle,
  FileText,
  Archive,
  RefreshCw,
  Zap,
  Target,
  Activity,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Headphones,
  Shield,
  Timer
} from "lucide-react";

type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
type TicketPriority = "low" | "normal" | "high" | "urgent";
type TicketCategory = "order_issue" | "product_inquiry" | "shipping" | "refund" | "technical" | "complaint" | "other";

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    customerId: string;
    totalOrders: number;
    isVip: boolean;
  };
  assignedTo?: string;
  createdDate: string;
  updatedDate: string;
  firstResponseTime?: number; // in minutes
  resolutionTime?: number; // in hours
  messages: number;
  tags: string[];
  description: string;
  relatedOrder?: string;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "1",
    ticketNumber: "TICK-2024-001",
    subject: "Order not received after 10 days",
    category: "shipping",
    priority: "high",
    status: "in_progress",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      customerId: "CUST-001",
      totalOrders: 15,
      isVip: true
    },
    assignedTo: "Rajesh Kumar",
    createdDate: "2024-01-18T09:30:00Z",
    updatedDate: "2024-01-18T14:20:00Z",
    firstResponseTime: 45,
    messages: 8,
    tags: ["delayed-delivery", "vip-customer"],
    description: "Customer placed order on Jan 8th but hasn't received it yet. Tracking shows it's stuck at local hub.",
    relatedOrder: "HSC-2024-001"
  },
  {
    id: "2",
    ticketNumber: "TICK-2024-002",
    subject: "Product quality issue - tablets not dissolving",
    category: "product_inquiry",
    priority: "urgent",
    status: "open",
    customer: {
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 87654 32109",
      customerId: "CUST-002",
      totalOrders: 8,
      isVip: false
    },
    assignedTo: "Meera Joshi",
    createdDate: "2024-01-19T10:15:00Z",
    updatedDate: "2024-01-19T10:15:00Z",
    messages: 2,
    tags: ["quality-issue", "urgent"],
    description: "Customer reports that tablets are not dissolving properly in water. Wants replacement or refund.",
    relatedOrder: "HSC-2024-085"
  },
  {
    id: "3",
    ticketNumber: "TICK-2024-003",
    subject: "How to use syrup in baking?",
    category: "product_inquiry",
    priority: "low",
    status: "waiting",
    customer: {
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 76543 21098",
      customerId: "CUST-003",
      totalOrders: 3,
      isVip: false
    },
    assignedTo: "Anita Desai",
    createdDate: "2024-01-17T15:45:00Z",
    updatedDate: "2024-01-18T09:30:00Z",
    firstResponseTime: 120,
    messages: 4,
    tags: ["product-usage", "waiting-customer"],
    description: "Customer wants to know conversion ratios for using syrup instead of sugar in baking recipes."
  },
  {
    id: "4",
    ticketNumber: "TICK-2024-004",
    subject: "Refund request - wrong item delivered",
    category: "refund",
    priority: "high",
    status: "in_progress",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      customerId: "CUST-004",
      totalOrders: 12,
      isVip: true
    },
    assignedTo: "Rajesh Kumar",
    createdDate: "2024-01-18T11:20:00Z",
    updatedDate: "2024-01-19T08:45:00Z",
    firstResponseTime: 30,
    messages: 6,
    tags: ["wrong-item", "refund-request", "vip-customer"],
    description: "Ordered tablets but received powder. Customer wants refund and correct item shipped.",
    relatedOrder: "HSC-2024-076"
  },
  {
    id: "5",
    ticketNumber: "TICK-2024-005",
    subject: "Website not accepting discount code",
    category: "technical",
    priority: "normal",
    status: "resolved",
    customer: {
      name: "Kavita Nair",
      email: "kavita.nair@email.com",
      phone: "+91 54321 09876",
      customerId: "CUST-005",
      totalOrders: 5,
      isVip: false
    },
    assignedTo: "Tech Support",
    createdDate: "2024-01-16T14:30:00Z",
    updatedDate: "2024-01-17T10:20:00Z",
    firstResponseTime: 15,
    resolutionTime: 20,
    messages: 5,
    tags: ["technical", "promo-code"],
    description: "Customer tried using WELCOME15 code but system showing error. Code was expired, new code provided."
  },
  {
    id: "6",
    ticketNumber: "TICK-2024-006",
    subject: "Bulk order inquiry for corporate",
    category: "order_issue",
    priority: "normal",
    status: "open",
    customer: {
      name: "Sanjay Gupta",
      email: "sanjay.gupta@techcorp.com",
      phone: "+91 91234 56789",
      customerId: "CUST-006",
      totalOrders: 1,
      isVip: false
    },
    createdDate: "2024-01-19T09:00:00Z",
    updatedDate: "2024-01-19T09:00:00Z",
    messages: 1,
    tags: ["bulk-order", "b2b", "new-customer"],
    description: "Corporate client wants to order 500 packs for office pantry. Needs pricing and delivery timeline."
  },
  {
    id: "7",
    ticketNumber: "TICK-2024-007",
    subject: "Allergic reaction concern",
    category: "complaint",
    priority: "urgent",
    status: "in_progress",
    customer: {
      name: "Deepa Mehta",
      email: "deepa.mehta@email.com",
      phone: "+91 98765 12345",
      customerId: "CUST-007",
      totalOrders: 4,
      isVip: false
    },
    assignedTo: "Meera Joshi",
    createdDate: "2024-01-19T08:30:00Z",
    updatedDate: "2024-01-19T11:45:00Z",
    firstResponseTime: 20,
    messages: 7,
    tags: ["health-concern", "urgent", "escalated"],
    description: "Customer reports mild allergic reaction after consuming tablets. Medical team consulted."
  },
  {
    id: "8",
    ticketNumber: "TICK-2024-008",
    subject: "Request for nutritional information",
    category: "product_inquiry",
    priority: "low",
    status: "closed",
    customer: {
      name: "Arjun Iyer",
      email: "arjun.iyer@email.com",
      phone: "+91 87654 98765",
      customerId: "CUST-008",
      totalOrders: 6,
      isVip: false
    },
    assignedTo: "Anita Desai",
    createdDate: "2024-01-15T13:20:00Z",
    updatedDate: "2024-01-16T16:30:00Z",
    firstResponseTime: 60,
    resolutionTime: 27,
    messages: 3,
    tags: ["product-info"],
    description: "Customer requested detailed nutritional breakdown. PDF sent and ticket closed successfully."
  }
];

const supportAgents = [
  { id: "1", name: "Rajesh Kumar", role: "Senior Support", activeTickets: 12, avgResponseTime: 25, rating: 4.8 },
  { id: "2", name: "Meera Joshi", role: "Support Specialist", activeTickets: 8, avgResponseTime: 18, rating: 4.9 },
  { id: "3", name: "Anita Desai", role: "Support Agent", activeTickets: 6, avgResponseTime: 32, rating: 4.6 },
  { id: "4", name: "Tech Support", role: "Technical Team", activeTickets: 4, avgResponseTime: 15, rating: 4.7 }
];

export default function HelpdeskPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "live-chat" | "agents" | "knowledge-base" | "analytics">("tickets");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const tickets = mockTickets;

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Calculate stats
  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => ["open", "in_progress"].includes(t.status)).length,
    resolvedToday: tickets.filter(t => t.status === "resolved").length,
    avgResponseTime: tickets.filter(t => t.firstResponseTime).length > 0
      ? Math.round(tickets.filter(t => t.firstResponseTime).reduce((sum, t) => sum + (t.firstResponseTime || 0), 0) / tickets.filter(t => t.firstResponseTime).length)
      : 0,
    avgResolutionTime: tickets.filter(t => t.resolutionTime).length > 0
      ? tickets.filter(t => t.resolutionTime).reduce((sum, t) => sum + (t.resolutionTime || 0), 0) / tickets.filter(t => t.resolutionTime).length
      : 0,
    urgentTickets: tickets.filter(t => t.priority === "urgent" && !["resolved", "closed"].includes(t.status)).length,
    customerSatisfaction: 94.5,
    firstContactResolution: 78.3
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-purple-100 text-purple-800";
      case "waiting": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal": return "bg-blue-100 text-blue-800 border-blue-200";
      case "low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryLabel = (category: TicketCategory) => {
    const labels: Record<TicketCategory, string> = {
      order_issue: "Order Issue",
      product_inquiry: "Product Inquiry",
      shipping: "Shipping",
      refund: "Refund",
      technical: "Technical",
      complaint: "Complaint",
      other: "Other"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Customer Support & Helpdesk
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage support tickets, live chat, and customer inquiries
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
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{stats.openTickets}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.urgentTickets} urgent</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}m</p>
                <p className="text-xs text-green-600 mt-1">-12% vs last week</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">CSAT Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.customerSatisfaction}%</p>
                <p className="text-xs text-green-600 mt-1">+2.3% improvement</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">First Contact Resolution</p>
                <p className="text-3xl font-bold text-gray-900">{stats.firstContactResolution}%</p>
                <p className="text-xs text-gray-500 mt-1">Target: 80%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Alerts */}
      {stats.urgentTickets > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900">Urgent Attention Required</h3>
              <p className="text-sm text-red-700 mt-1">
                You have <span className="font-semibold">{stats.urgentTickets} urgent tickets</span> that need immediate attention.
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors">
                <Zap className="h-4 w-4 mr-2" />
                View Urgent Tickets
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "tickets", name: "All Tickets", icon: MessageSquare, count: stats.totalTickets },
            { id: "live-chat", name: "Live Chat", icon: MessageCircle, count: 3 },
            { id: "agents", name: "Agents", icon: Headphones, count: supportAgents.length },
            { id: "knowledge-base", name: "Knowledge Base", icon: FileText },
            { id: "analytics", name: "Analytics", icon: BarChart3 }
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

      {/* Tickets Tab */}
      {activeTab === "tickets" && (
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
                      placeholder="Search tickets..."
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
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting">Waiting</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="order_issue">Order Issue</option>
                  <option value="product_inquiry">Product Inquiry</option>
                  <option value="shipping">Shipping</option>
                  <option value="refund">Refund</option>
                  <option value="technical">Technical</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                      {/* Status Indicator */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          ticket.status === "open" ? "bg-blue-100" :
                          ticket.status === "in_progress" ? "bg-purple-100" :
                          ticket.status === "waiting" ? "bg-yellow-100" :
                          ticket.status === "resolved" ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {ticket.status === "resolved" ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                           ticket.status === "closed" ? <XCircle className="h-5 w-5 text-gray-600" /> :
                           <MessageSquare className={`h-5 w-5 ${
                             ticket.status === "open" ? "text-blue-600" :
                             ticket.status === "in_progress" ? "text-purple-600" : "text-yellow-600"
                           }`} />}
                        </div>
                      </div>

                      {/* Ticket Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-mono text-gray-500">{ticket.ticketNumber}</span>
                              {ticket.customer.isVip && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  VIP
                                </span>
                              )}
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">{ticket.subject}</h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {ticket.customer.name}
                              </div>
                              <div className="flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {getCategoryLabel(ticket.category)}
                              </div>
                              {ticket.assignedTo && (
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {ticket.assignedTo}
                                </div>
                              )}
                              <div className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {ticket.messages} messages
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(ticket.updatedDate)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("_", " ").toUpperCase()}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Tab */}
      {activeTab === "live-chat" && (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat Interface</h3>
            <p className="text-gray-500 mb-4">Real-time chat support with customers</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-xs text-gray-500">Active Chats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">5</div>
                <div className="text-xs text-gray-500">Waiting</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">18</div>
                <div className="text-xs text-gray-500">Today</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{agent.name}</div>
                      <div className="text-sm text-gray-500">{agent.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm font-semibold text-gray-900 ml-1">{agent.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 mb-1">Active Tickets</div>
                    <div className="text-2xl font-bold text-blue-600">{agent.activeTickets}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 mb-1">Avg Response</div>
                    <div className="text-2xl font-bold text-green-600">{agent.avgResponseTime}m</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === "knowledge-base" && (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Knowledge Base Articles</h3>
          <div className="space-y-3">
            {[
              "How to track your order",
              "Product usage instructions",
              "Return and refund policy",
              "Nutritional information guide",
              "Shipping and delivery FAQs",
              "Payment methods accepted",
              "Account management help"
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{article}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Volume Trend</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Analysis</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {Object.entries({
                "Product Inquiry": 35,
                "Shipping": 25,
                "Order Issue": 20,
                "Refund": 10,
                "Technical": 7,
                "Complaint": 3
              }).map(([category, percentage]) => (
                <div key={category}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{category}</span>
                    <span className="font-semibold text-gray-900">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

