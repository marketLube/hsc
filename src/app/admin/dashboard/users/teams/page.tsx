"use client";

import { 
  Users,
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Settings,
  UserPlus,
  UserMinus,
  Crown,
  Star,
  Award,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Shield,
  Key,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  MoreVertical,
  Copy,
  Archive,
  RefreshCw,
  Zap,
  Database,
  FileText,
  Package,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { useState } from "react";

// Team Structure and Departments
const departments = [
  {
    id: "management",
    name: "Management",
    description: "Executive leadership and strategic decision making",
    color: "bg-red-500",
    icon: Crown,
    teamCount: 1,
    memberCount: 2,
    budget: 500000,
    location: "Mumbai HQ"
  },
  {
    id: "operations",
    name: "Operations",
    description: "Daily business operations and process management",
    color: "bg-blue-500",
    icon: Settings,
    teamCount: 3,
    memberCount: 12,
    budget: 300000,
    location: "Mumbai HQ"
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Brand promotion and customer acquisition",
    color: "bg-pink-500",
    icon: Target,
    teamCount: 2,
    memberCount: 8,
    budget: 250000,
    location: "Delhi Office"
  },
  {
    id: "sales",
    name: "Sales",
    description: "Revenue generation and customer relationships",
    color: "bg-green-500",
    icon: TrendingUp,
    teamCount: 4,
    memberCount: 15,
    budget: 200000,
    location: "Multiple Cities"
  },
  {
    id: "technology",
    name: "Technology",
    description: "Software development and IT infrastructure",
    color: "bg-purple-500",
    icon: Database,
    teamCount: 2,
    memberCount: 10,
    budget: 400000,
    location: "Bangalore Office"
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial planning and accounting operations",
    color: "bg-emerald-500",
    icon: DollarSign,
    teamCount: 1,
    memberCount: 4,
    budget: 150000,
    location: "Mumbai HQ"
  }
];

// Detailed Teams
const teams = [
  {
    id: "executive-team",
    name: "Executive Team",
    department: "management",
    description: "C-level executives and senior leadership",
    lead: {
      name: "Althameem Khan",
      role: "CEO & Founder",
      avatar: "/avatars/althameem.jpg",
      email: "althameem@healthysugar.com"
    },
    members: [
      {
        id: "user-001",
        name: "Althameem Khan",
        role: "CEO & Founder",
        email: "althameem@healthysugar.com",
        status: "active",
        joinDate: "2023-01-01",
        permissions: "super_admin"
      },
      {
        id: "user-002",
        name: "Priya Sharma",
        role: "COO",
        email: "priya.sharma@healthysugar.com",
        status: "active",
        joinDate: "2023-02-01",
        permissions: "admin"
      }
    ],
    performance: {
      productivity: 95,
      satisfaction: 92,
      retention: 100
    },
    budget: 500000,
    projects: 8,
    createdAt: "2023-01-01",
    status: "active"
  },
  {
    id: "product-management",
    name: "Product Management",
    department: "operations",
    description: "Product strategy and development oversight",
    lead: {
      name: "Rajesh Kumar",
      role: "Product Manager",
      avatar: "/avatars/rajesh.jpg",
      email: "rajesh.kumar@healthysugar.com"
    },
    members: [
      {
        id: "user-003",
        name: "Rajesh Kumar",
        role: "Product Manager",
        email: "rajesh.kumar@healthysugar.com",
        status: "active",
        joinDate: "2023-03-01",
        permissions: "content_manager"
      },
      {
        id: "user-004",
        name: "Anita Patel",
        role: "Product Analyst",
        email: "anita.patel@healthysugar.com",
        status: "active",
        joinDate: "2023-04-01",
        permissions: "inventory_manager"
      },
      {
        id: "user-005",
        name: "Vikram Singh",
        role: "Product Coordinator",
        email: "vikram.singh@healthysugar.com",
        status: "active",
        joinDate: "2023-05-01",
        permissions: "sales_manager"
      }
    ],
    performance: {
      productivity: 88,
      satisfaction: 85,
      retention: 95
    },
    budget: 120000,
    projects: 12,
    createdAt: "2023-03-01",
    status: "active"
  },
  {
    id: "inventory-team",
    name: "Inventory Management",
    department: "operations",
    description: "Stock control and warehouse operations",
    lead: {
      name: "Meera Nair",
      role: "Inventory Manager",
      avatar: "/avatars/meera.jpg",
      email: "meera.nair@healthysugar.com"
    },
    members: [
      {
        id: "user-006",
        name: "Meera Nair",
        role: "Inventory Manager",
        email: "meera.nair@healthysugar.com",
        status: "active",
        joinDate: "2023-06-01",
        permissions: "inventory_manager"
      },
      {
        id: "user-007",
        name: "Arjun Reddy",
        role: "Stock Coordinator",
        email: "arjun.reddy@healthysugar.com",
        status: "active",
        joinDate: "2023-07-01",
        permissions: "stock_manager"
      },
      {
        id: "user-008",
        name: "Kavya Iyer",
        role: "Warehouse Supervisor",
        email: "kavya.iyer@healthysugar.com",
        status: "active",
        joinDate: "2023-08-01",
        permissions: "stock_manager"
      }
    ],
    performance: {
      productivity: 92,
      satisfaction: 88,
      retention: 90
    },
    budget: 80000,
    projects: 6,
    createdAt: "2023-06-01",
    status: "active"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    department: "marketing",
    description: "Online marketing and social media management",
    lead: {
      name: "Sneha Gupta",
      role: "Digital Marketing Manager",
      avatar: "/avatars/sneha.jpg",
      email: "sneha.gupta@healthysugar.com"
    },
    members: [
      {
        id: "user-009",
        name: "Sneha Gupta",
        role: "Digital Marketing Manager",
        email: "sneha.gupta@healthysugar.com",
        status: "active",
        joinDate: "2023-04-15",
        permissions: "marketing_manager"
      },
      {
        id: "user-010",
        name: "Rohit Sharma",
        role: "SEO Specialist",
        email: "rohit.sharma@healthysugar.com",
        status: "active",
        joinDate: "2023-05-15",
        permissions: "content_manager"
      },
      {
        id: "user-011",
        name: "Pooja Mehta",
        role: "Social Media Manager",
        email: "pooja.mehta@healthysugar.com",
        status: "active",
        joinDate: "2023-06-15",
        permissions: "content_manager"
      }
    ],
    performance: {
      productivity: 90,
      satisfaction: 87,
      retention: 85
    },
    budget: 150000,
    projects: 15,
    createdAt: "2023-04-15",
    status: "active"
  },
  {
    id: "sales-north",
    name: "Sales Team North",
    department: "sales",
    description: "Sales operations for North India region",
    lead: {
      name: "Amit Verma",
      role: "Regional Sales Manager",
      avatar: "/avatars/amit.jpg",
      email: "amit.verma@healthysugar.com"
    },
    members: [
      {
        id: "user-012",
        name: "Amit Verma",
        role: "Regional Sales Manager",
        email: "amit.verma@healthysugar.com",
        status: "active",
        joinDate: "2023-03-20",
        permissions: "sales_manager"
      },
      {
        id: "user-013",
        name: "Ravi Kumar",
        role: "Sales Executive",
        email: "ravi.kumar@healthysugar.com",
        status: "active",
        joinDate: "2023-04-20",
        permissions: "customer_support"
      },
      {
        id: "user-014",
        name: "Sunita Devi",
        role: "Sales Executive",
        email: "sunita.devi@healthysugar.com",
        status: "active",
        joinDate: "2023-05-20",
        permissions: "customer_support"
      }
    ],
    performance: {
      productivity: 85,
      satisfaction: 82,
      retention: 88
    },
    budget: 100000,
    projects: 8,
    createdAt: "2023-03-20",
    status: "active"
  },
  {
    id: "customer-support",
    name: "Customer Support",
    department: "operations",
    description: "Customer service and technical support",
    lead: {
      name: "Deepika Rao",
      role: "Support Manager",
      avatar: "/avatars/deepika.jpg",
      email: "deepika.rao@healthysugar.com"
    },
    members: [
      {
        id: "user-015",
        name: "Deepika Rao",
        role: "Support Manager",
        email: "deepika.rao@healthysugar.com",
        status: "active",
        joinDate: "2023-07-10",
        permissions: "customer_support"
      },
      {
        id: "user-016",
        name: "Manish Jain",
        role: "Support Executive",
        email: "manish.jain@healthysugar.com",
        status: "active",
        joinDate: "2023-08-10",
        permissions: "customer_support"
      },
      {
        id: "user-017",
        name: "Nisha Agarwal",
        role: "Support Executive",
        email: "nisha.agarwal@healthysugar.com",
        status: "active",
        joinDate: "2023-09-10",
        permissions: "customer_support"
      }
    ],
    performance: {
      productivity: 87,
      satisfaction: 90,
      retention: 92
    },
    budget: 60000,
    projects: 4,
    createdAt: "2023-07-10",
    status: "active"
  }
];

// Team Statistics
const teamStats = {
  totalTeams: teams.length,
  totalMembers: teams.reduce((sum, team) => sum + team.members.length, 0),
  totalDepartments: departments.length,
  totalBudget: teams.reduce((sum, team) => sum + team.budget, 0),
  averageTeamSize: Math.round(teams.reduce((sum, team) => sum + team.members.length, 0) / teams.length),
  activeTeams: teams.filter(team => team.status === 'active').length,
  averageProductivity: Math.round(teams.reduce((sum, team) => sum + team.performance.productivity, 0) / teams.length),
  averageSatisfaction: Math.round(teams.reduce((sum, team) => sum + team.performance.satisfaction, 0) / teams.length)
};

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || team.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Get department info
  const getDepartmentInfo = (departmentId: string) => {
    return departments.find(dept => dept.id === departmentId) || departments[0];
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Team Management
              </h1>
              <p className="text-lg text-gray-600">
                Organize teams, manage departments, and track performance
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export Teams
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <BarChart3 className="mr-2 h-4 w-4" />
                Team Analytics
              </button>
              <button 
                onClick={() => setShowCreateTeam(true)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </button>
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Teams</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.totalTeams}</p>
                <p className="text-xs text-gray-500">{teamStats.activeTeams} active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-green-600">{teamStats.totalMembers}</p>
                <p className="text-xs text-gray-500">Avg {teamStats.averageTeamSize} per team</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(teamStats.totalBudget)}</p>
                <p className="text-xs text-gray-500">{teamStats.totalDepartments} departments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Avg Performance</p>
                <p className="text-2xl font-bold text-orange-600">{teamStats.averageProductivity}%</p>
                <p className="text-xs text-gray-500">{teamStats.averageSatisfaction}% satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-500" />
              Department Overview
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Manage Departments
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department) => (
              <div key={department.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${department.color} bg-opacity-10`}>
                      <department.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{department.name}</h4>
                      <p className="text-xs text-gray-500">{department.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{department.memberCount}</div>
                    <div className="text-xs text-gray-500">members</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{department.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{department.teamCount} teams</span>
                  <span>{formatCurrency(department.budget)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
                <option value="performance">Sort by Performance</option>
                <option value="budget">Sort by Budget</option>
              </select>
            </div>

            {/* Actions */}
            <div>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeams.map((team) => {
            const department = getDepartmentInfo(team.department);
            
            return (
              <div key={team.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Team Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl ${department.color} flex items-center justify-center`}>
                        <department.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Building2 className="h-3 w-3" />
                          <span>{department.name}</span>
                          <span>•</span>
                          <Users className="h-3 w-3" />
                          <span>{team.members.length} members</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{team.description}</p>
                  
                  {/* Team Lead */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Crown className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.lead.name}</div>
                      <div className="text-xs text-gray-500">{team.lead.role}</div>
                    </div>
                  </div>
                </div>

                {/* Team Performance */}
                <div className="p-6 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{team.performance.productivity}%</div>
                      <div className="text-xs text-gray-500">Productivity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{team.performance.satisfaction}%</div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{team.performance.retention}%</div>
                      <div className="text-xs text-gray-500">Retention</div>
                    </div>
                  </div>
                </div>

                {/* Team Members Preview */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">Team Members</h4>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {team.members.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-gray-900">{member.name}</span>
                        </div>
                        <span className="text-gray-500">{member.role}</span>
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="text-xs text-gray-500 text-center pt-2">
                        +{team.members.length - 3} more members
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Stats */}
                <div className="px-6 py-4 bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <DollarSign className="h-3 w-3" />
                        <span>{formatCurrency(team.budget)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Target className="h-3 w-3" />
                        <span>{team.projects} projects</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Created {new Date(team.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No teams found matching your criteria</p>
            <button 
              onClick={() => setShowCreateTeam(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create your first team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

