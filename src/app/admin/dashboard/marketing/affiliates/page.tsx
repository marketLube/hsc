"use client";

import { useState } from "react";
import { 
  Users,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  TrendingUp,
  DollarSign,
  Share2,
  Gift,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  BarChart3,
  ExternalLink,
  Copy,
  Mail,
  Smartphone,
  Globe,
  Target,
  Award,
  Zap,
  Settings,
  CreditCard,
  Link,
  UserCheck,
  Percent,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "pending" | "suspended" | "inactive";
  tier: "bronze" | "silver" | "gold" | "platinum";
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: string;
  pendingEarnings: string;
  paidEarnings: string;
  commissionRate: string;
  lastActivity: string;
  referralCode: string;
  socialMedia: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  performance: {
    clicks: number;
    conversions: number;
    conversionRate: string;
    avgOrderValue: string;
  };
}

interface ReferralProgram {
  id: string;
  name: string;
  description: string;
  type: "percentage" | "fixed" | "tiered";
  commissionStructure: {
    bronze: string;
    silver: string;
    gold: string;
    platinum: string;
  };
  minimumPayout: string;
  cookieDuration: string;
  status: "active" | "paused" | "draft";
  startDate: string;
  endDate?: string;
  terms: string[];
}

interface AffiliateStats {
  name: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: any;
  color: string;
}

// Mock Data
const affiliateStats: AffiliateStats[] = [
  {
    name: "Total Affiliates",
    value: "156",
    change: "+12",
    changeType: "increase",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    name: "Active Affiliates",
    value: "89",
    change: "+8",
    changeType: "increase",
    icon: UserCheck,
    color: "bg-green-500"
  },
  {
    name: "Total Commissions",
    value: "₹2,45,680",
    change: "+18.5%",
    changeType: "increase",
    icon: DollarSign,
    color: "bg-purple-500"
  },
  {
    name: "Avg Conversion Rate",
    value: "3.8%",
    change: "+0.5%",
    changeType: "increase",
    icon: Target,
    color: "bg-orange-500"
  },
  {
    name: "Pending Payouts",
    value: "₹45,230",
    change: "+₹12,450",
    changeType: "increase",
    icon: Clock,
    color: "bg-yellow-500"
  },
  {
    name: "This Month Revenue",
    value: "₹1,23,450",
    change: "+25.3%",
    changeType: "increase",
    icon: TrendingUp,
    color: "bg-indigo-500"
  }
];

const affiliates: Affiliate[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    joinDate: "2024-01-01",
    status: "active",
    tier: "gold",
    totalReferrals: 145,
    successfulReferrals: 89,
    totalEarnings: "₹45,680",
    pendingEarnings: "₹8,450",
    paidEarnings: "₹37,230",
    commissionRate: "12%",
    lastActivity: "2024-01-15",
    referralCode: "PRIYA2024",
    socialMedia: {
      website: "https://priyahealth.com",
      instagram: "@priya_health_tips",
      youtube: "Priya Health Channel"
    },
    performance: {
      clicks: 2450,
      conversions: 89,
      conversionRate: "3.6%",
      avgOrderValue: "₹850"
    }
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 87654 32109",
    joinDate: "2024-01-05",
    status: "active",
    tier: "silver",
    totalReferrals: 78,
    successfulReferrals: 45,
    totalEarnings: "₹23,450",
    pendingEarnings: "₹4,200",
    paidEarnings: "₹19,250",
    commissionRate: "10%",
    lastActivity: "2024-01-14",
    referralCode: "RAJESH2024",
    socialMedia: {
      facebook: "Rajesh Fitness",
      instagram: "@rajesh_fitness"
    },
    performance: {
      clicks: 1890,
      conversions: 45,
      conversionRate: "2.4%",
      avgOrderValue: "₹720"
    }
  },
  {
    id: "3",
    name: "Anita Patel",
    email: "anita.patel@example.com",
    phone: "+91 76543 21098",
    joinDate: "2024-01-08",
    status: "pending",
    tier: "bronze",
    totalReferrals: 23,
    successfulReferrals: 12,
    totalEarnings: "₹6,780",
    pendingEarnings: "₹6,780",
    paidEarnings: "₹0",
    commissionRate: "8%",
    lastActivity: "2024-01-12",
    referralCode: "ANITA2024",
    socialMedia: {
      instagram: "@anita_wellness"
    },
    performance: {
      clicks: 567,
      conversions: 12,
      conversionRate: "2.1%",
      avgOrderValue: "₹565"
    }
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 65432 10987",
    joinDate: "2023-12-15",
    status: "active",
    tier: "platinum",
    totalReferrals: 234,
    successfulReferrals: 156,
    totalEarnings: "₹78,900",
    pendingEarnings: "₹12,340",
    paidEarnings: "₹66,560",
    commissionRate: "15%",
    lastActivity: "2024-01-15",
    referralCode: "VIKRAM2023",
    socialMedia: {
      website: "https://vikramwellness.com",
      instagram: "@vikram_wellness",
      facebook: "Vikram Wellness Hub",
      youtube: "Vikram Health Channel"
    },
    performance: {
      clicks: 4560,
      conversions: 156,
      conversionRate: "3.4%",
      avgOrderValue: "₹950"
    }
  },
  {
    id: "5",
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "+91 54321 09876",
    joinDate: "2024-01-10",
    status: "suspended",
    tier: "bronze",
    totalReferrals: 15,
    successfulReferrals: 3,
    totalEarnings: "₹1,200",
    pendingEarnings: "₹0",
    paidEarnings: "₹1,200",
    commissionRate: "8%",
    lastActivity: "2024-01-11",
    referralCode: "MEERA2024",
    socialMedia: {},
    performance: {
      clicks: 234,
      conversions: 3,
      conversionRate: "1.3%",
      avgOrderValue: "₹400"
    }
  }
];

const referralPrograms: ReferralProgram[] = [
  {
    id: "1",
    name: "Standard Affiliate Program",
    description: "Our main affiliate program with tiered commission structure",
    type: "tiered",
    commissionStructure: {
      bronze: "8%",
      silver: "10%",
      gold: "12%",
      platinum: "15%"
    },
    minimumPayout: "₹1,000",
    cookieDuration: "30 days",
    status: "active",
    startDate: "2024-01-01",
    terms: [
      "Minimum 10 successful referrals to advance tiers",
      "Monthly payout on 1st of each month",
      "No self-referrals allowed",
      "Must maintain 2% conversion rate"
    ]
  },
  {
    id: "2",
    name: "Influencer Program",
    description: "Special program for social media influencers",
    type: "percentage",
    commissionStructure: {
      bronze: "15%",
      silver: "15%",
      gold: "15%",
      platinum: "15%"
    },
    minimumPayout: "₹2,000",
    cookieDuration: "45 days",
    status: "active",
    startDate: "2024-01-01",
    terms: [
      "Minimum 1000 followers required",
      "Content approval required",
      "Monthly performance review",
      "Exclusive product access"
    ]
  }
];

export default function AffiliatesPage() {
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [activeTab, setActiveTab] = useState<"affiliates" | "programs" | "payouts" | "analytics">("affiliates");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTier, setFilterTier] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "bg-orange-100 text-orange-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze":
        return Award;
      case "silver":
        return Award;
      case "gold":
        return Award;
      case "platinum":
        return Award;
      default:
        return Award;
    }
  };

  const filteredAffiliates = affiliates.filter(affiliate => {
    if (filterStatus !== "all" && affiliate.status !== filterStatus) return false;
    if (filterTier !== "all" && affiliate.tier !== filterTier) return false;
    return true;
  });

  const renderAffiliates = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search affiliates..."
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
          <select 
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="mr-2 h-4 w-4" />
          Export
        </button>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAffiliates.map((affiliate) => {
                const TierIcon = getTierIcon(affiliate.tier);
                return (
                  <tr key={affiliate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-4">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                          <div className="text-sm text-gray-500">{affiliate.email}</div>
                          <div className="text-xs text-gray-400">Code: {affiliate.referralCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TierIcon className="h-4 w-4 mr-2 text-gray-600" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getTierColor(affiliate.tier)}`}>
                          {affiliate.tier}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                        {affiliate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>{affiliate.totalReferrals} referrals</div>
                        <div className="text-xs text-gray-500">{affiliate.performance.conversionRate} conversion</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="font-medium">{affiliate.totalEarnings}</div>
                        <div className="text-xs text-gray-500">Pending: {affiliate.pendingEarnings}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {affiliate.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedAffiliate(affiliate)}
                          className="text-brand hover:text-brand-dark"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-6">
      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {referralPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                  {program.status}
                </span>
              </div>
            </div>

            {/* Commission Structure */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Commission Structure</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-800">Bronze</span>
                    <span className="text-sm font-medium text-orange-900">{program.commissionStructure.bronze}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-800">Silver</span>
                    <span className="text-sm font-medium text-gray-900">{program.commissionStructure.silver}</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-yellow-800">Gold</span>
                    <span className="text-sm font-medium text-yellow-900">{program.commissionStructure.gold}</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-800">Platinum</span>
                    <span className="text-sm font-medium text-purple-900">{program.commissionStructure.platinum}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Minimum Payout:</span>
                <span className="text-gray-900">{program.minimumPayout}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cookie Duration:</span>
                <span className="text-gray-900">{program.cookieDuration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Start Date:</span>
                <span className="text-gray-900">{program.startDate}</span>
              </div>
            </div>

            {/* Terms Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Terms</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {program.terms.slice(0, 2).map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
                {program.terms.length > 2 && (
                  <li className="text-brand">• +{program.terms.length - 2} more terms</li>
                )}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button className="text-xs text-brand hover:text-brand-dark font-medium">
                View Details
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayouts = () => (
    <div className="space-y-6">
      {/* Payout Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
              <p className="text-2xl font-semibold text-gray-900">₹45,230</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid This Month</p>
              <p className="text-2xl font-semibold text-gray-900">₹1,23,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Payout</p>
              <p className="text-2xl font-semibold text-gray-900">Feb 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Payouts Table */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pending Payouts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliates.filter(a => parseFloat(a.pendingEarnings.replace('₹', '').replace(',', '')) > 0).map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {affiliate.pendingEarnings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {affiliate.successfulReferrals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jan 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-green-600 hover:text-green-700">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <p className="text-2xl font-semibold text-gray-900">12,450</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +15.3% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <ExternalLink className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversions</p>
              <p className="text-2xl font-semibold text-gray-900">456</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12.8% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">₹850</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                -2.1% from last month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Top Performer</p>
              <p className="text-lg font-semibold text-gray-900">Vikram Singh</p>
              <p className="text-sm text-gray-500">₹78,900 earned</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Affiliate Performance Trends</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Performance trends chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Top Performing Affiliates</h4>
          <div className="space-y-3">
            {affiliates.slice(0, 5).map((affiliate, index) => (
              <div key={affiliate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gradient-to-br from-brand/10 to-brand/20 rounded-lg flex items-center justify-center">
                      <span className="text-brand font-semibold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{affiliate.name}</p>
                    <p className="text-xs text-gray-500">{affiliate.successfulReferrals} conversions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{affiliate.totalEarnings}</p>
                  <p className="text-xs text-gray-500">{affiliate.performance.conversionRate}</p>
                </div>
              </div>
            ))}
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
            Affiliate Program
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your affiliate partners and referral programs
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Affiliate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {affiliateStats.map((stat, index) => (
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
                        {stat.changeType === "increase" && <ArrowUpRight className="h-4 w-4 mr-1" />}
                        {stat.changeType === "decrease" && <ArrowDownRight className="h-4 w-4 mr-1" />}
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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: "affiliates", name: "Affiliates", icon: Users },
            { id: "programs", name: "Programs", icon: Settings },
            { id: "payouts", name: "Payouts", icon: CreditCard },
            { id: "analytics", name: "Analytics", icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "affiliates" && renderAffiliates()}
      {activeTab === "programs" && renderPrograms()}
      {activeTab === "payouts" && renderPayouts()}
      {activeTab === "analytics" && renderAnalytics()}

      {/* Affiliate Detail Modal */}
      {selectedAffiliate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedAffiliate.name}</h3>
              <button 
                onClick={() => setSelectedAffiliate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Affiliate Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-sm"><span className="font-medium">Email:</span> {selectedAffiliate.email}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {selectedAffiliate.phone}</p>
                    <p className="text-sm"><span className="font-medium">Referral Code:</span> {selectedAffiliate.referralCode}</p>
                    <p className="text-sm"><span className="font-medium">Join Date:</span> {selectedAffiliate.joinDate}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Social Media</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {Object.entries(selectedAffiliate.socialMedia).length > 0 ? (
                      <div className="space-y-1">
                        {Object.entries(selectedAffiliate.socialMedia).map(([platform, handle]) => (
                          <p key={platform} className="text-sm">
                            <span className="font-medium capitalize">{platform}:</span> {handle}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No social media information</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-blue-900">{selectedAffiliate.performance.clicks}</p>
                      <p className="text-xs text-blue-700">Total Clicks</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-green-900">{selectedAffiliate.performance.conversions}</p>
                      <p className="text-xs text-green-700">Conversions</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-purple-900">{selectedAffiliate.performance.conversionRate}</p>
                      <p className="text-xs text-purple-700">Conversion Rate</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-orange-900">{selectedAffiliate.performance.avgOrderValue}</p>
                      <p className="text-xs text-orange-700">Avg Order Value</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Earnings</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Earnings:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedAffiliate.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending:</span>
                      <span className="text-sm font-medium text-yellow-600">{selectedAffiliate.pendingEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Paid:</span>
                      <span className="text-sm font-medium text-green-600">{selectedAffiliate.paidEarnings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setSelectedAffiliate(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark">
                Edit Affiliate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
