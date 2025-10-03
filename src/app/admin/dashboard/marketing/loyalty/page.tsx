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
  Gift,
  Award,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Tag,
  Calendar,
  Trophy,
  Crown,
  Sparkles,
  Heart,
  Zap,
  Target,
  BarChart3,
  Settings,
  Check,
  X,
  Clock,
  Mail,
  MessageSquare,
  Share2,
  Copy,
  ExternalLink,
  Package,
  ShoppingBag,
  Percent,
  CreditCard,
  Activity,
  UserPlus,
  Send,
  ChevronRight,
  ArrowUpDown,
  RefreshCw,
  Bell,
  Cake,
  PartyPopper
} from "lucide-react";

type TierLevel = "bronze" | "silver" | "gold" | "platinum";
type RewardType = "discount" | "freebie" | "shipping" | "exclusive" | "birthday" | "referral";
type MemberStatus = "active" | "inactive" | "suspended";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: TierLevel;
  points: number;
  pointsToNextTier: number;
  lifetimePoints: number;
  lifetimeSpent: number;
  joinDate: string;
  lastActivity: string;
  status: MemberStatus;
  referrals: number;
  rewardsRedeemed: number;
  orders: number;
  birthday?: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  type: RewardType;
  pointsCost: number;
  value: number;
  discount?: number;
  tierRequired: TierLevel | "all";
  available: boolean;
  claimed: number;
  expiryDays?: number;
  terms?: string;
}

interface TierConfig {
  level: TierLevel;
  name: string;
  pointsRequired: number;
  benefits: string[];
  multiplier: number;
  color: string;
  icon: any;
}

// Tier configurations
const tiers: TierConfig[] = [
  {
    level: "bronze",
    name: "Bronze",
    pointsRequired: 0,
    benefits: ["1x points on purchases", "Birthday rewards", "Exclusive offers"],
    multiplier: 1,
    color: "orange",
    icon: Award
  },
  {
    level: "silver",
    name: "Silver",
    pointsRequired: 1000,
    benefits: ["1.5x points on purchases", "Free shipping on orders >₹999", "Early sale access", "Birthday bonus"],
    multiplier: 1.5,
    color: "gray",
    icon: Star
  },
  {
    level: "gold",
    name: "Gold",
    pointsRequired: 5000,
    benefits: ["2x points on purchases", "Free shipping on all orders", "Priority support", "Exclusive products", "Double birthday points"],
    multiplier: 2,
    color: "yellow",
    icon: Trophy
  },
  {
    level: "platinum",
    name: "Platinum",
    pointsRequired: 15000,
    benefits: ["3x points on purchases", "Free express shipping", "Dedicated concierge", "VIP events", "Triple birthday points", "Exclusive previews"],
    multiplier: 3,
    color: "purple",
    icon: Crown
  }
];

// Mock members data
const mockMembers: Member[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    tier: "platinum",
    points: 18450,
    pointsToNextTier: 0,
    lifetimePoints: 24680,
    lifetimeSpent: 148000,
    joinDate: "2023-01-15T00:00:00Z",
    lastActivity: "2024-01-18T10:30:00Z",
    status: "active",
    referrals: 8,
    rewardsRedeemed: 12,
    orders: 45,
    birthday: "1988-03-15"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 87654 32109",
    tier: "gold",
    points: 6240,
    pointsToNextTier: 8760,
    lifetimePoints: 12890,
    lifetimeSpent: 85600,
    joinDate: "2023-04-20T00:00:00Z",
    lastActivity: "2024-01-19T15:45:00Z",
    status: "active",
    referrals: 5,
    rewardsRedeemed: 8,
    orders: 32,
    birthday: "1992-07-22"
  },
  {
    id: "3",
    name: "Anita Patel",
    email: "anita.patel@email.com",
    phone: "+91 76543 21098",
    tier: "silver",
    points: 2340,
    pointsToNextTier: 2660,
    lifetimePoints: 4580,
    lifetimeSpent: 32400,
    joinDate: "2023-08-10T00:00:00Z",
    lastActivity: "2024-01-17T12:20:00Z",
    status: "active",
    referrals: 3,
    rewardsRedeemed: 5,
    orders: 18,
    birthday: "1990-11-05"
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 65432 10987",
    tier: "bronze",
    points: 450,
    pointsToNextTier: 550,
    lifetimePoints: 890,
    lifetimeSpent: 12300,
    joinDate: "2023-12-01T00:00:00Z",
    lastActivity: "2024-01-15T09:00:00Z",
    status: "active",
    referrals: 1,
    rewardsRedeemed: 2,
    orders: 6,
    birthday: "1995-02-18"
  },
  {
    id: "5",
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    phone: "+91 54321 09876",
    tier: "silver",
    points: 1580,
    pointsToNextTier: 3420,
    lifetimePoints: 3240,
    lifetimeSpent: 24600,
    joinDate: "2023-06-15T00:00:00Z",
    lastActivity: "2024-01-10T14:30:00Z",
    status: "inactive",
    referrals: 2,
    rewardsRedeemed: 4,
    orders: 14,
    birthday: "1993-09-28"
  }
];

// Mock rewards catalog
const mockRewards: Reward[] = [
  {
    id: "1",
    name: "10% Off Next Purchase",
    description: "Get 10% discount on your next order (minimum ₹500)",
    type: "discount",
    pointsCost: 200,
    value: 50,
    discount: 10,
    tierRequired: "all",
    available: true,
    claimed: 234,
    expiryDays: 30,
    terms: "Minimum order value ₹500. Cannot be combined with other offers."
  },
  {
    id: "2",
    name: "Free Shipping Voucher",
    description: "Free shipping on any order",
    type: "shipping",
    pointsCost: 150,
    value: 50,
    tierRequired: "all",
    available: true,
    claimed: 456,
    expiryDays: 60,
    terms: "Valid on all orders. One-time use only."
  },
  {
    id: "3",
    name: "20% Off - Silver Tier",
    description: "Exclusive 20% discount for Silver members (minimum ₹1000)",
    type: "discount",
    pointsCost: 400,
    value: 200,
    discount: 20,
    tierRequired: "silver",
    available: true,
    claimed: 89,
    expiryDays: 30,
    terms: "Minimum order value ₹1000. Silver tier or above required."
  },
  {
    id: "4",
    name: "Free Product Sample Box",
    description: "Get a complimentary sample box of our new products",
    type: "freebie",
    pointsCost: 500,
    value: 299,
    tierRequired: "silver",
    available: true,
    claimed: 67,
    expiryDays: 90,
    terms: "While stocks last. One per member."
  },
  {
    id: "5",
    name: "30% Off - Gold Exclusive",
    description: "Premium 30% discount for Gold members (any order)",
    type: "exclusive",
    pointsCost: 800,
    value: 500,
    discount: 30,
    tierRequired: "gold",
    available: true,
    claimed: 45,
    expiryDays: 30,
    terms: "No minimum order. Gold tier or above required."
  },
  {
    id: "6",
    name: "VIP Event Access",
    description: "Exclusive invitation to our product launch event",
    type: "exclusive",
    pointsCost: 1200,
    value: 1500,
    tierRequired: "platinum",
    available: true,
    claimed: 12,
    expiryDays: 90,
    terms: "Platinum members only. Limited seats available."
  },
  {
    id: "7",
    name: "Birthday Bonus - 500 Points",
    description: "Special birthday gift of 500 loyalty points",
    type: "birthday",
    pointsCost: 0,
    value: 500,
    tierRequired: "all",
    available: true,
    claimed: 234,
    terms: "Auto-applied on your birthday month."
  },
  {
    id: "8",
    name: "Referral Reward - ₹200",
    description: "Refer a friend and get ₹200 credit when they make first purchase",
    type: "referral",
    pointsCost: 0,
    value: 200,
    tierRequired: "all",
    available: true,
    claimed: 567,
    terms: "Friend must complete first order. Credit applied after order delivery."
  }
];

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "rewards" | "tiers" | "referrals" | "analytics">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const members = mockMembers;
  const rewards = mockRewards;

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesTier = tierFilter === "all" || member.tier === tierFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  // Calculate stats
  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === "active").length,
    totalPoints: members.reduce((sum, m) => sum + m.points, 0),
    lifetimeValue: members.reduce((sum, m) => sum + m.lifetimeSpent, 0),
    avgPointsPerMember: members.length > 0 ? Math.round(members.reduce((sum, m) => sum + m.points, 0) / members.length) : 0,
    rewardsRedeemed: members.reduce((sum, m) => sum + m.rewardsRedeemed, 0),
    referrals: members.reduce((sum, m) => sum + m.referrals, 0),
    bronze: members.filter(m => m.tier === "bronze").length,
    silver: members.filter(m => m.tier === "silver").length,
    gold: members.filter(m => m.tier === "gold").length,
    platinum: members.filter(m => m.tier === "platinum").length
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
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getTierColor = (tier: TierLevel) => {
    const tierConfig = tiers.find(t => t.level === tier);
    return tierConfig?.color || "gray";
  };

  const getTierIcon = (tier: TierLevel) => {
    const tierConfig = tiers.find(t => t.level === tier);
    return tierConfig?.icon || Award;
  };

  const getRewardTypeIcon = (type: RewardType) => {
    switch (type) {
      case "discount": return Percent;
      case "freebie": return Gift;
      case "shipping": return Package;
      case "exclusive": return Crown;
      case "birthday": return Cake;
      case "referral": return Share2;
      default: return Tag;
    }
  };

  const getRewardTypeColor = (type: RewardType) => {
    switch (type) {
      case "discount": return "blue";
      case "freebie": return "green";
      case "shipping": return "purple";
      case "exclusive": return "yellow";
      case "birthday": return "pink";
      case "referral": return "orange";
      default: return "gray";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Loyalty & Rewards Program
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage loyalty tiers, rewards catalog, member benefits, and referral program
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
            Add Reward
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{stats.activeMembers} active</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Points</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Avg: {stats.avgPointsPerMember.toLocaleString()}/member</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Lifetime Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.lifetimeValue)}</p>
                <p className="text-xs text-green-600 mt-1">+18% this quarter</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rewards Redeemed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rewardsRedeemed}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.referrals} referrals</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Gift className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "overview", name: "Overview", icon: BarChart3 },
            { id: "members", name: "Members", icon: Users, count: stats.totalMembers },
            { id: "rewards", name: "Rewards Catalog", icon: Gift, count: rewards.length },
            { id: "tiers", name: "Tier Management", icon: Trophy, count: 4 },
            { id: "referrals", name: "Referral Program", icon: Share2, count: stats.referrals },
            { id: "analytics", name: "Analytics", icon: TrendingUp }
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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Tier Distribution */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Membership Tier Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {tiers.map((tier) => {
                const TierIcon = tier.icon;
                const count = stats[tier.level as keyof typeof stats] as number;
                const percentage = (count / stats.totalMembers) * 100;
                
                return (
                  <div key={tier.level} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${tier.color}-100 rounded-xl`}>
                        <TierIcon className={`h-6 w-6 text-${tier.color}-600`} />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{count}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{tier.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{tier.pointsRequired.toLocaleString()}+ points</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${tier.color}-500 h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(1)}% of members</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Rewards */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Popular Rewards</h3>
            <div className="space-y-3">
              {rewards.sort((a, b) => b.claimed - a.claimed).slice(0, 5).map((reward, idx) => {
                const RewardIcon = getRewardTypeIcon(reward.type);
                const color = getRewardTypeColor(reward.type);
                
                return (
                  <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                      <div className={`p-2 bg-${color}-100 rounded-lg`}>
                        <RewardIcon className={`h-5 w-5 text-${color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{reward.name}</h4>
                        <p className="text-xs text-gray-500">{reward.claimed} redemptions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{reward.pointsCost} pts</div>
                      <div className="text-xs text-gray-500">{formatCurrency(reward.value)} value</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === "members" && (
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
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                >
                  <option value="all">All Tiers</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
                <select
                  className="block pl-3 pr-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-lg"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const TierIcon = getTierIcon(member.tier);
              const tierColor = getTierColor(member.tier);
              const tierConfig = tiers.find(t => t.level === member.tier);
              
              return (
                <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 bg-${tierColor}-100 rounded-xl`}>
                          <TierIcon className={`h-6 w-6 text-${tierColor}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${tierColor}-100 text-${tierColor}-800`}>
                              {tierConfig?.name}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              member.status === "active" ? "bg-green-100 text-green-800" :
                              member.status === "inactive" ? "bg-gray-100 text-gray-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {member.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {member.email}
                            </span>
                            <span>•</span>
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-5 gap-6">
                      {/* Points */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2">Points Balance</div>
                        <div className="text-2xl font-bold text-purple-600">{member.points.toLocaleString()}</div>
                        {member.pointsToNextTier > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {member.pointsToNextTier.toLocaleString()} to next tier
                          </div>
                        )}
                      </div>

                      {/* Lifetime Stats */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2">Lifetime</div>
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(member.lifetimeSpent)}</div>
                        <div className="text-xs text-gray-500">{member.lifetimePoints.toLocaleString()} points earned</div>
                      </div>

                      {/* Activity */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2">Activity</div>
                        <div className="text-sm font-semibold text-gray-900">{member.orders} orders</div>
                        <div className="text-xs text-gray-500">{member.rewardsRedeemed} rewards redeemed</div>
                      </div>

                      {/* Referrals */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2">Engagement</div>
                        <div className="text-sm font-semibold text-gray-900">{member.referrals} referrals</div>
                        <div className="text-xs text-gray-500">Last: {formatDate(member.lastActivity)}</div>
                      </div>

                      {/* Membership */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-2">Member Since</div>
                        <div className="text-sm font-semibold text-gray-900">{formatDate(member.joinDate)}</div>
                        {member.birthday && (
                          <div className="text-xs text-gray-500 flex items-center">
                            <Cake className="h-3 w-3 mr-1" />
                            {formatDate(member.birthday)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Add Points
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-lg text-xs font-medium text-green-700 bg-white hover:bg-green-50 transition-colors">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
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

      {/* Rewards Tab */}
      {activeTab === "rewards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const RewardIcon = getRewardTypeIcon(reward.type);
            const color = getRewardTypeColor(reward.type);
            const tierConfig = reward.tierRequired !== "all" ? tiers.find(t => t.level === reward.tierRequired) : null;
            
            return (
              <div key={reward.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-${color}-500`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${color}-100 rounded-xl`}>
                      <RewardIcon className={`h-6 w-6 text-${color}-600`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{reward.pointsCost}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {reward.discount && (
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Discount:</span> {reward.discount}%
                      </div>
                    )}
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Value:</span> {formatCurrency(reward.value)}
                    </div>
                    {tierConfig && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <span className="font-semibold mr-2">Required:</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${tierConfig.color}-100 text-${tierConfig.color}-800`}>
                          {tierConfig.name}+
                        </span>
                      </div>
                    )}
                    {reward.expiryDays && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        Expires in {reward.expiryDays} days
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-500">Claimed</span>
                      <span className="font-semibold text-gray-900">{reward.claimed} times</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                      Edit Reward
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tiers Tab */}
      {activeTab === "tiers" && (
        <div className="space-y-6">
          {tiers.map((tier) => {
            const TierIcon = tier.icon;
            const count = stats[tier.level as keyof typeof stats] as number;
            
            return (
              <div key={tier.level} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-3 bg-${tier.color}-500`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 bg-${tier.color}-100 rounded-2xl`}>
                        <TierIcon className={`h-8 w-8 text-${tier.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tier.name} Tier</h3>
                        <p className="text-sm text-gray-600">{tier.pointsRequired.toLocaleString()}+ points required</p>
                        <p className="text-sm text-gray-600">{tier.multiplier}x points multiplier</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-500">members</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Member Benefits</h4>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Tier Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Points Threshold</span>
                          <span className="font-semibold text-gray-900">{tier.pointsRequired.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Points Multiplier</span>
                          <span className="font-semibold text-gray-900">{tier.multiplier}x</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Members</span>
                          <span className="font-semibold text-gray-900">{count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">% of Members</span>
                          <span className="font-semibold text-gray-900">{((count / stats.totalMembers) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      Edit Tier
                    </button>
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                      View Members
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Referrals Tab */}
      {activeTab === "referrals" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-2xl p-8 border border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Referral Program</h3>
                <p className="text-gray-700 mb-4">Reward members for bringing new customers. Both referrer and referee get rewarded!</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-orange-600">{stats.referrals}</div>
                    <div className="text-sm text-gray-600">Total Referrals</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">₹200</div>
                    <div className="text-sm text-gray-600">Reward per Referral</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-pink-600">18%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl">
                <Share2 className="h-16 w-16 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Referrers</h3>
            <div className="space-y-3">
              {members.sort((a, b) => b.referrals - a.referrals).slice(0, 5).map((member, idx) => {
                const TierIcon = getTierIcon(member.tier);
                const tierColor = getTierColor(member.tier);
                
                return (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                      <div className={`p-2 bg-${tierColor}-100 rounded-lg`}>
                        <TierIcon className={`h-5 w-5 text-${tierColor}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{member.referrals}</div>
                      <div className="text-xs text-gray-500">referrals</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Points Distribution</h3>
              <div className="space-y-3">
                {["0-1000", "1001-5000", "5001-15000", "15000+"].map((range, idx) => {
                  const percentage = [40, 30, 20, 10][idx];
                  return (
                    <div key={range}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{range} points</span>
                        <span className="font-semibold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Redemption Trends</h3>
              <div className="space-y-3">
                {["Discounts", "Free Shipping", "Freebies", "Exclusive Access"].map((type, idx) => {
                  const percentage = [45, 30, 15, 10][idx];
                  const colors = ["blue", "purple", "green", "yellow"][idx];
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{type}</span>
                        <span className="font-semibold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${colors}-500 h-2 rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

