'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Shield,
  User,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical,
} from 'lucide-react';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Staff', value: '24', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Admins', value: '3', icon: Shield, color: 'from-purple-500 to-purple-600' },
    { label: 'Support Staff', value: '12', icon: User, color: 'from-green-500 to-green-600' },
    { label: 'Managers', value: '9', icon: CheckCircle, color: 'from-orange-500 to-orange-600' },
  ];

  const users = [
    {
      id: 1,
      name: 'Platform Admin',
      email: 'admin@platform.com',
      phone: '+1 555 000 0001',
      role: 'Super Admin',
      roleColor: 'bg-red-100 text-red-700',
      status: 'Active',
      avatar: 'PA',
      joinedDate: '2024-01-01',
      lastActive: '2025-10-03 14:32',
      permissions: ['All Access'],
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@platform.com',
      phone: '+1 555 123 4567',
      role: 'Admin',
      roleColor: 'bg-purple-100 text-purple-700',
      status: 'Active',
      avatar: 'JS',
      joinedDate: '2024-02-15',
      lastActive: '2025-10-03 12:15',
      permissions: ['Tenant Management', 'Billing', 'Support'],
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@platform.com',
      phone: '+1 555 234 5678',
      role: 'Support Manager',
      roleColor: 'bg-blue-100 text-blue-700',
      status: 'Active',
      avatar: 'SJ',
      joinedDate: '2024-03-20',
      lastActive: '2025-10-03 11:45',
      permissions: ['Support', 'View Tenants'],
    },
    {
      id: 4,
      name: 'Michael Chen',
      email: 'michael@platform.com',
      phone: '+1 555 345 6789',
      role: 'Support Agent',
      roleColor: 'bg-green-100 text-green-700',
      status: 'Active',
      avatar: 'MC',
      joinedDate: '2024-04-10',
      lastActive: '2025-10-03 10:22',
      permissions: ['Support'],
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      email: 'emily@platform.com',
      phone: '+1 555 456 7890',
      role: 'Billing Manager',
      roleColor: 'bg-orange-100 text-orange-700',
      status: 'Active',
      avatar: 'ER',
      joinedDate: '2024-05-05',
      lastActive: '2025-10-02 16:30',
      permissions: ['Billing', 'View Tenants'],
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david@platform.com',
      phone: '+1 555 567 8901',
      role: 'Support Agent',
      roleColor: 'bg-green-100 text-green-700',
      status: 'Inactive',
      avatar: 'DM',
      joinedDate: '2024-06-12',
      lastActive: '2025-09-25 14:20',
      permissions: ['Support'],
    },
  ];

  const roles = [
    { name: 'Super Admin', count: 1, color: 'bg-red-500', permissions: ['Full platform control', 'User management', 'All modules'] },
    { name: 'Admin', count: 2, color: 'bg-purple-500', permissions: ['Tenant management', 'Billing', 'Support', 'Analytics'] },
    { name: 'Support Manager', count: 3, color: 'bg-blue-500', permissions: ['All support tickets', 'View tenants', 'Reports'] },
    { name: 'Support Agent', count: 9, color: 'bg-green-500', permissions: ['Assigned tickets', 'View tenant info'] },
    { name: 'Billing Manager', count: 3, color: 'bg-orange-500', permissions: ['Billing', 'Payments', 'Invoices', 'Plans'] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage platform staff and access controls</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Add Staff Member
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

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Left Section */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.roleColor}`}>
                      {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Joined: {user.joinedDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Section - Permissions */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 mb-2">PERMISSIONS</p>
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Last active: <span className="font-semibold text-gray-700">{user.lastActive}</span>
                </p>
              </div>

              {/* Right Section - Actions */}
              <div className="flex lg:flex-col gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roles & Permissions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Roles & Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 ${role.color} rounded-full`}></div>
                <h3 className="font-bold text-gray-900">{role.name}</h3>
                <span className="ml-auto px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                  {role.count}
                </span>
              </div>
              <div className="space-y-2">
                {role.permissions.map((permission, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

