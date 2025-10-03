'use client';

import { useState } from 'react';
import {
  Headphones,
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Paperclip,
  User,
  Calendar,
  Tag,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export default function SupportCenterPage() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { label: 'Open Tickets', value: '127', change: '+12', trend: 'up', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { label: 'Resolved Today', value: '48', change: '+8', trend: 'up', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Avg Response Time', value: '2.4h', change: '-0.3h', trend: 'down', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { label: 'Satisfaction Rate', value: '94%', change: '+2%', trend: 'up', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const tickets = [
    {
      id: 1,
      ticketNumber: 'TKT-2024-1248',
      tenant: 'Healthy Sugar Company',
      subject: 'Payment gateway integration issue',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      submittedBy: 'Althameem Khan',
      submittedDate: '2025-10-03 10:30',
      lastReply: '2025-10-03 11:45',
      messages: 3,
    },
    {
      id: 2,
      ticketNumber: 'TKT-2024-1247',
      tenant: 'Organic Foods Store',
      subject: 'Custom domain SSL certificate error',
      category: 'Technical',
      priority: 'High',
      status: 'In Progress',
      submittedBy: 'Sarah Johnson',
      submittedDate: '2025-10-03 09:15',
      lastReply: '2025-10-03 12:00',
      messages: 5,
    },
    {
      id: 3,
      ticketNumber: 'TKT-2024-1246',
      tenant: 'Green Tea Shop',
      subject: 'How to upgrade to Professional plan?',
      category: 'Billing',
      priority: 'Medium',
      status: 'Open',
      submittedBy: 'Michael Chen',
      submittedDate: '2025-10-02 16:20',
      lastReply: '2025-10-02 16:20',
      messages: 1,
    },
    {
      id: 4,
      ticketNumber: 'TKT-2024-1245',
      tenant: 'Wellness Boutique',
      subject: 'Request for API documentation',
      category: 'General',
      priority: 'Low',
      status: 'Resolved',
      submittedBy: 'David Martinez',
      submittedDate: '2025-10-01 14:30',
      lastReply: '2025-10-02 10:15',
      messages: 4,
    },
    {
      id: 5,
      ticketNumber: 'TKT-2024-1244',
      tenant: 'Natural Supplements',
      subject: 'Cannot access admin dashboard',
      category: 'Technical',
      priority: 'Critical',
      status: 'In Progress',
      submittedBy: 'Emma Wilson',
      submittedDate: '2025-10-03 13:00',
      lastReply: '2025-10-03 13:15',
      messages: 2,
    },
    {
      id: 6,
      ticketNumber: 'TKT-2024-1243',
      tenant: 'Fresh Grocery Market',
      subject: 'Account suspension clarification',
      category: 'Account',
      priority: 'High',
      status: 'Open',
      submittedBy: 'Lisa Anderson',
      submittedDate: '2025-10-03 08:45',
      lastReply: '2025-10-03 08:45',
      messages: 1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-1">Manage support tickets and tenant communications</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold">
            <Filter className="w-5 h-5" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Tickets */}
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                  selectedTicket === ticket.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-gray-600">{ticket.ticketNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                        ticket.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                        ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{ticket.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {ticket.tenant}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {ticket.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {ticket.messages}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span>Submitted: {ticket.submittedDate}</span>
                  <span>Last reply: {ticket.lastReply}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail / Chat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {selectedTicket ? (
            <div className="h-full flex flex-col">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Ticket Details</h3>
                <p className="text-sm text-gray-600">
                  {tickets.find(t => t.id === selectedTicket)?.subject}
                </p>
              </div>

              {/* Messages Area */}
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">
                        Hello, I'm experiencing issues with the payment gateway integration. Customers are unable to complete checkout.
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    SA
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">
                        Thank you for reaching out. I'm looking into this issue now. Can you share which payment gateway you're using?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">10:45 AM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">
                        We're using Stripe. The integration was working fine until yesterday.
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">11:45 AM</p>
                  </div>
                </div>
              </div>

              {/* Reply Box */}
              <div className="border-t border-gray-200 pt-4">
                <textarea
                  placeholder="Type your response..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex items-center justify-between mt-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold">
                    <Send className="w-4 h-4" />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a ticket to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">By Priority</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Critical</span>
              <span className="text-lg font-bold text-red-600">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">High</span>
              <span className="text-lg font-bold text-orange-600">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Medium</span>
              <span className="text-lg font-bold text-yellow-600">48</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Low</span>
              <span className="text-lg font-bold text-gray-600">47</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">By Category</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Technical</span>
              <span className="text-lg font-bold text-gray-900">54</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Billing</span>
              <span className="text-lg font-bold text-gray-900">28</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Account</span>
              <span className="text-lg font-bold text-gray-900">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">General</span>
              <span className="text-lg font-bold text-gray-900">22</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Response Times</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">First Response</span>
              <span className="text-lg font-bold text-gray-900">1.2h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Avg Response</span>
              <span className="text-lg font-bold text-gray-900">2.4h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Resolution Time</span>
              <span className="text-lg font-bold text-gray-900">8.6h</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Team Performance</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Active Agents</span>
              <span className="text-lg font-bold text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Avg Tickets/Day</span>
              <span className="text-lg font-bold text-gray-900">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">CSAT Score</span>
              <span className="text-lg font-bold text-green-600">4.7/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

