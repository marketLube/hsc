"use client";

import { useState } from "react";
import { 
  Gift, 
  Mail, 
  Megaphone, 
  Target, 
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Users,
  MessageSquare,
  Share2,
  BarChart3,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Smartphone,
  Globe,
  UserPlus,
  Filter,
  Search,
  Download,
  Settings,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Send,
  Copy,
  ExternalLink,
  Heart,
  Star,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Tag,
  Percent,
  CreditCard,
  ShoppingCart,
  Package,
  TrendingDown,
  LayoutDashboard
} from "lucide-react";

// Types
interface MarketingStats {
  name: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: any;
  period: string;
  color: string;
}

interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "social" | "display";
  status: "active" | "paused" | "completed" | "draft" | "scheduled";
  sent: number;
  opens: number;
  clicks: number;
  conversions: number;
  revenue: string;
  startDate: string;
  endDate?: string;
  budget: string;
  spent: string;
}

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping" | "bogo";
  value: string;
  description: string;
  used: number;
  limit: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "scheduled" | "paused";
  minOrder?: string;
  categories?: string[];
}

interface SocialPost {
  id: string;
  platform: "facebook" | "instagram" | "twitter" | "linkedin";
  content: string;
  image?: string;
  status: "published" | "scheduled" | "draft";
  scheduledTime?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  publishedAt?: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: string;
  customerCount: number;
  avgOrderValue: string;
  lastPurchase: string;
  tags: string[];
}

// Mock Data
const marketingStats: MarketingStats[] = [
  {
    name: "Total Campaign Revenue",
    value: "₹4,85,320",
    change: "+18.5%",
    changeType: "increase",
    icon: DollarSign,
    period: "vs last month",
    color: "bg-green-500"
  },
  {
    name: "Active Campaigns",
    value: "24",
    change: "+3",
    changeType: "increase",
    icon: Zap,
    period: "campaigns running",
    color: "bg-blue-500"
  },
  {
    name: "Email Open Rate",
    value: "28.4%",
    change: "+2.1%",
    changeType: "increase",
    icon: Mail,
    period: "industry avg: 21%",
    color: "bg-purple-500"
  },
  {
    name: "Customer Acquisition Cost",
    value: "₹145",
    change: "-₹23",
    changeType: "increase",
    icon: UserPlus,
    period: "vs last month",
    color: "bg-orange-500"
  },
  {
    name: "Conversion Rate",
    value: "4.2%",
    change: "+0.8%",
    changeType: "increase",
    icon: Target,
    period: "from all channels",
    color: "bg-indigo-500"
  },
  {
    name: "Social Engagement",
    value: "12.8K",
    change: "+15.3%",
    changeType: "increase",
    icon: Heart,
    period: "total interactions",
    color: "bg-pink-500"
  }
];

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Health Campaign",
    type: "email",
    status: "active",
    sent: 2450,
    opens: 687,
    clicks: 156,
    conversions: 23,
    revenue: "₹45,680",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    budget: "₹25,000",
    spent: "₹18,500"
  },
  {
    id: "2",
    name: "New Year Wellness Push",
    type: "sms",
    status: "completed",
    sent: 1200,
    opens: 1140,
    clicks: 89,
    conversions: 34,
    revenue: "₹67,890",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    budget: "₹15,000",
    spent: "₹14,200"
  },
  {
    id: "3",
    name: "Diabetes Awareness Drive",
    type: "social",
    status: "active",
    sent: 0,
    opens: 0,
    clicks: 245,
    conversions: 18,
    revenue: "₹32,450",
    startDate: "2024-01-05",
    budget: "₹20,000",
    spent: "₹12,300"
  },
  {
    id: "4",
    name: "Product Launch Teaser",
    type: "email",
    status: "scheduled",
    sent: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
    revenue: "₹0",
    startDate: "2024-01-25",
    budget: "₹30,000",
    spent: "₹0"
  }
];

const coupons: Coupon[] = [
  {
    id: "1",
    code: "FIRST10",
    type: "percentage",
    value: "10%",
    description: "First time customer discount",
    used: 45,
    limit: 100,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    minOrder: "₹500"
  },
  {
    id: "2",
    code: "HEALTHY20",
    type: "fixed",
    value: "₹20",
    description: "Minimum order discount",
    used: 123,
    limit: 200,
    startDate: "2024-01-01",
    endDate: "2024-02-29",
    status: "active",
    minOrder: "₹300"
  },
  {
    id: "3",
    code: "BULK15",
    type: "percentage",
    value: "15%",
    description: "Bulk order discount",
    used: 67,
    limit: 150,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    minOrder: "₹1000"
  },
  {
    id: "4",
    code: "FREESHIP",
    type: "free_shipping",
    value: "Free",
    description: "Free shipping on all orders",
    used: 234,
    limit: 500,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    status: "active",
    minOrder: "₹250"
  },
  {
    id: "5",
    code: "NEWYEAR25",
    type: "percentage",
    value: "25%",
    description: "New Year special offer",
    used: 89,
    limit: 100,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "expired"
  }
];

const socialPosts: SocialPost[] = [
  {
    id: "1",
    platform: "instagram",
    content: "Start your healthy journey with our natural stevia sweetener! 🌿 #HealthyLiving #NaturalSweetener",
    status: "published",
    engagement: { likes: 245, comments: 18, shares: 34, reach: 2450 },
    publishedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    platform: "facebook",
    content: "Did you know? Our stevia is 100% natural and perfect for diabetics. Learn more about the benefits!",
    status: "scheduled",
    scheduledTime: "2024-01-20T14:00:00Z",
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 }
  },
  {
    id: "3",
    platform: "twitter",
    content: "Healthy alternatives don't have to compromise on taste! Try our stevia products today. 🍃",
    status: "published",
    engagement: { likes: 67, comments: 12, shares: 23, reach: 890 },
    publishedAt: "2024-01-14T16:45:00Z"
  }
];

const customerSegments: CustomerSegment[] = [
  {
    id: "1",
    name: "Diabetic Customers",
    description: "Customers who have purchased diabetes-friendly products",
    criteria: "Product category: Diabetes-friendly",
    customerCount: 456,
    avgOrderValue: "₹850",
    lastPurchase: "2 days ago",
    tags: ["High Value", "Health Conscious", "Recurring"]
  },
  {
    id: "2",
    name: "First Time Buyers",
    description: "Customers who made their first purchase in the last 30 days",
    criteria: "Order count = 1, Purchase date < 30 days",
    customerCount: 234,
    avgOrderValue: "₹425",
    lastPurchase: "1 week ago",
    tags: ["New Customer", "Potential Growth"]
  },
  {
    id: "3",
    name: "High Value Customers",
    description: "Customers with lifetime value > ₹5000",
    criteria: "Total orders value > ₹5000",
    customerCount: 89,
    avgOrderValue: "₹1,250",
    lastPurchase: "3 days ago",
    tags: ["VIP", "High Value", "Loyal"]
  },
  {
    id: "4",
    name: "Inactive Customers",
    description: "Customers who haven't purchased in 90+ days",
    criteria: "Last purchase > 90 days ago",
    customerCount: 167,
    avgOrderValue: "₹320",
    lastPurchase: "4 months ago",
    tags: ["Inactive", "Win-back Target"]
  }
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "campaigns" | "coupons" | "social" | "segments" | "analytics">("dashboard");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail;
      case "sms":
        return Smartphone;
      case "social":
        return Share2;
      case "display":
        return Globe;
      default:
        return Megaphone;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return Globe;
      case "instagram":
        return Globe;
      case "twitter":
        return Globe;
      case "linkedin":
        return Globe;
      default:
        return Share2;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Marketing Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {marketingStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="px-6 py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => setActiveTab("campaigns")}
              className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="p-2 bg-blue-100 rounded-xl mr-3 group-hover:bg-blue-200 transition-colors">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">New Campaign</p>
                <p className="text-xs text-gray-500">Create marketing campaign</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab("coupons")}
              className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="p-2 bg-purple-100 rounded-xl mr-3 group-hover:bg-purple-200 transition-colors">
                <Gift className="h-6 w-6 text-purple-600" />
            </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Add Coupon</p>
                <p className="text-xs text-gray-500">Create discount code</p>
          </div>
            </button>
            <button 
              onClick={() => setActiveTab("social")}
              className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="p-2 bg-pink-100 rounded-xl mr-3 group-hover:bg-pink-200 transition-colors">
                <Share2 className="h-6 w-6 text-pink-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Social Post</p>
                <p className="text-xs text-gray-500">Schedule social media</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab("segments")}
              className="flex items-center p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="p-2 bg-green-100 rounded-xl mr-3 group-hover:bg-green-200 transition-colors">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Segment</p>
                <p className="text-xs text-gray-500">Create customer segment</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Campaigns
              </h3>
              <button 
                onClick={() => setActiveTab("campaigns")}
                className="text-sm text-brand hover:text-brand-dark font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {campaigns.slice(0, 3).map((campaign) => {
                const Icon = getCampaignTypeIcon(campaign.type);
                return (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{campaign.type} • {campaign.revenue} revenue</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performing Coupons */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Top Performing Coupons
              </h3>
              <button 
                onClick={() => setActiveTab("coupons")}
                className="text-sm text-brand hover:text-brand-dark font-medium"
              >
                Manage All
              </button>
            </div>
            <div className="space-y-3">
              {coupons.filter(c => c.status === "active").slice(0, 3).map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{coupon.code}</p>
                      <p className="text-sm text-gray-500">{coupon.description} • {coupon.value} off</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{coupon.used}/{coupon.limit}</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Campaigns Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Marketing Campaigns</h3>
          <p className="text-sm text-gray-500">Manage your email, SMS, and social media campaigns</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </button>
      </div>

      {/* Campaign Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Filter:</span>
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand focus:border-brand">
            <option>All Types</option>
            <option>Email</option>
            <option>SMS</option>
            <option>Social</option>
            <option>Display</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand focus:border-brand">
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => {
                const Icon = getCampaignTypeIcon(campaign.type);
                const openRate = campaign.sent > 0 ? ((campaign.opens / campaign.sent) * 100).toFixed(1) : "0";
                const clickRate = campaign.opens > 0 ? ((campaign.clicks / campaign.opens) * 100).toFixed(1) : "0";
                const conversionRate = campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : "0";
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate || "Ongoing"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>Open: {openRate}%</div>
                        <div>Click: {clickRate}%</div>
                        <div>Conv: {conversionRate}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {campaign.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>Budget: {campaign.budget}</div>
                        <div>Spent: {campaign.spent}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-brand hover:text-brand-dark">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        {campaign.status === "active" ? (
                          <button className="text-yellow-600 hover:text-yellow-700">
                            <PauseCircle className="h-4 w-4" />
                          </button>
                        ) : campaign.status === "paused" ? (
                          <button className="text-green-600 hover:text-green-700">
                            <PlayCircle className="h-4 w-4" />
                          </button>
                        ) : null}
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

  const renderCoupons = () => (
    <div className="space-y-6">
      {/* Coupons Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Coupons & Discounts</h3>
          <p className="text-sm text-gray-500">Create and manage discount codes for your customers</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </button>
      </div>

      {/* Coupon Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Coupons</p>
              <p className="text-2xl font-semibold text-gray-900">{coupons.filter(c => c.status === "active").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Uses</p>
              <p className="text-2xl font-semibold text-gray-900">{coupons.reduce((sum, c) => sum + c.used, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Discount Given</p>
              <p className="text-2xl font-semibold text-gray-900">₹12,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">18.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {coupon.type === "percentage" && <Percent className="h-5 w-5 text-purple-600" />}
                    {coupon.type === "fixed" && <DollarSign className="h-5 w-5 text-purple-600" />}
                    {coupon.type === "free_shipping" && <Package className="h-5 w-5 text-purple-600" />}
                    {coupon.type === "bogo" && <Gift className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{coupon.code}</h4>
                    <p className="text-sm text-gray-500">{coupon.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                  {coupon.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Discount Value</span>
                  <span className="text-sm font-medium text-gray-900">{coupon.value}</span>
                </div>
                
                {coupon.minOrder && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Min Order</span>
                    <span className="text-sm font-medium text-gray-900">{coupon.minOrder}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Usage</span>
                  <span className="text-sm font-medium text-gray-900">{coupon.used}/{coupon.limit}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((coupon.used / coupon.limit) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{coupon.startDate}</span>
                  <span>{coupon.endDate}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-xs text-brand hover:text-brand-dark font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      {/* Social Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Social Media Management</h3>
          <p className="text-sm text-gray-500">Schedule and manage your social media posts across platforms</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
              </button>
      </div>

      {/* Social Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-2xl font-semibold text-gray-900">{socialPosts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Likes</p>
              <p className="text-2xl font-semibold text-gray-900">{socialPosts.reduce((sum, p) => sum + p.engagement.likes, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Comments</p>
              <p className="text-2xl font-semibold text-gray-900">{socialPosts.reduce((sum, p) => sum + p.engagement.comments, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Repeat2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Shares</p>
              <p className="text-2xl font-semibold text-gray-900">{socialPosts.reduce((sum, p) => sum + p.engagement.shares, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {socialPosts.map((post) => {
          const Icon = getPlatformIcon(post.platform);
          return (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{post.platform}</p>
                    <p className="text-xs text-gray-500">
                      {post.status === "published" 
                        ? `Published ${new Date(post.publishedAt!).toLocaleDateString()}`
                        : post.status === "scheduled"
                        ? `Scheduled for ${new Date(post.scheduledTime!).toLocaleDateString()}`
                        : "Draft"
                      }
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-900">{post.content}</p>
              </div>
              
              {post.status === "published" && (
                <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="h-4 w-4 text-pink-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{post.engagement.likes}</span>
                    </div>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <MessageCircle className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{post.engagement.comments}</span>
                    </div>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Repeat2 className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{post.engagement.shares}</span>
                    </div>
                    <p className="text-xs text-gray-500">Shares</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{post.engagement.reach}</span>
                    </div>
                    <p className="text-xs text-gray-500">Reach</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                {post.status === "draft" && (
                  <button className="text-xs text-brand hover:text-brand-dark font-medium">
                    Schedule Post
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      {/* Segments Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Customer Segments</h3>
          <p className="text-sm text-gray-500">Create targeted customer groups for personalized marketing</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Create Segment
        </button>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customerSegments.map((segment) => (
          <div key={segment.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{segment.name}</h4>
                  <p className="text-sm text-gray-500">{segment.description}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Customers</span>
                <span className="text-sm font-medium text-gray-900">{segment.customerCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Avg Order Value</span>
                <span className="text-sm font-medium text-gray-900">{segment.avgOrderValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Purchase</span>
                <span className="text-sm font-medium text-gray-900">{segment.lastPurchase}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Criteria:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">{segment.criteria}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {segment.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <button className="text-xs text-brand hover:text-brand-dark font-medium">
                Create Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Marketing Analytics</h3>
          <p className="text-sm text-gray-500">Detailed insights and performance metrics for your marketing efforts</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">₹4,85,320</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +18.5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Customer Acquisition</p>
              <p className="text-2xl font-semibold text-gray-900">234</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12.3% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Campaign ROI</p>
              <p className="text-2xl font-semibold text-gray-900">245%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +5.2% from last month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
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
            <div className="p-3 bg-orange-100 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Campaign performance chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Acquisition Funnel</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Acquisition funnel chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Top Performing Content</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Summer Health Campaign</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Email</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">23</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹45,680</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Instagram Stevia Post</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Social</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">18</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹32,450</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FIRST10 Coupon</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Coupon</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹28,900</td>
              </tr>
            </tbody>
          </table>
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
            Marketing Hub
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive marketing tools to grow your business and engage customers
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
            { id: "campaigns", name: "Campaigns", icon: Zap },
            { id: "coupons", name: "Coupons", icon: Gift },
            { id: "social", name: "Social Media", icon: Share2 },
            { id: "segments", name: "Segments", icon: Users },
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
      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "campaigns" && renderCampaigns()}
      {activeTab === "coupons" && renderCoupons()}
      {activeTab === "social" && renderSocial()}
      {activeTab === "segments" && renderSegments()}
      {activeTab === "analytics" && renderAnalytics()}
    </div>
  );
}