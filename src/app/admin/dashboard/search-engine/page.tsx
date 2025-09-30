"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  TrendingUp,
  Search,
  BarChart3,
  Settings,
  FileText,
  Zap,
  Eye,
  Users,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  RefreshCw,
  Calendar,
  Filter,
  Download,
  Share2,
  BookOpen,
  Code,
  Smartphone,
  Monitor,
  Mic,
  Languages,
  Shield,
  Activity,
  Award,
  Link,
  Image,
  Type,
  Hash,
  MapPin,
  Star,
  ThumbsUp,
  MessageSquare,
  Lightbulb,
  AlertCircle
} from "lucide-react";

interface SEOMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

interface SEOIssue {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  page: string;
  impact: 'high' | 'medium' | 'low';
  fix: string;
}

interface KeywordRanking {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  difficulty: number;
  url: string;
}

export default function SearchEnginePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock SEO data
  const seoMetrics: SEOMetric[] = [
    {
      label: "Organic Traffic",
      value: "24,567",
      change: 12.5,
      trend: 'up',
      icon: Users,
      color: "bg-blue-500"
    },
    {
      label: "Average Position",
      value: "8.2",
      change: -2.1,
      trend: 'up',
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      label: "Click-Through Rate",
      value: "3.4%",
      change: 0.8,
      trend: 'up',
      icon: Eye,
      color: "bg-purple-500"
    },
    {
      label: "Core Web Vitals",
      value: "85/100",
      change: 5.2,
      trend: 'up',
      icon: Zap,
      color: "bg-orange-500"
    },
    {
      label: "Indexed Pages",
      value: "47",
      change: 3,
      trend: 'up',
      icon: FileText,
      color: "bg-indigo-500"
    },
    {
      label: "Backlinks",
      value: "1,234",
      change: 15.7,
      trend: 'up',
      icon: Link,
      color: "bg-pink-500"
    }
  ];

  const seoIssues: SEOIssue[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Missing Meta Descriptions',
      description: '5 pages are missing meta descriptions',
      page: '/products, /about, /contact',
      impact: 'high',
      fix: 'Add unique meta descriptions for each page'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Large Image Files',
      description: 'Images on homepage are not optimized',
      page: '/homepage',
      impact: 'medium',
      fix: 'Compress images and use WebP format'
    },
    {
      id: '3',
      type: 'info',
      title: 'Schema Markup Opportunities',
      description: 'Product pages could benefit from enhanced schema',
      page: '/product/*',
      impact: 'medium',
      fix: 'Add Product and Review schema markup'
    }
  ];

  const keywordRankings: KeywordRanking[] = [
    {
      keyword: "stevia sweetener",
      position: 3,
      previousPosition: 5,
      searchVolume: 8900,
      difficulty: 65,
      url: "/products"
    },
    {
      keyword: "natural sugar alternative",
      position: 7,
      previousPosition: 12,
      searchVolume: 5400,
      difficulty: 58,
      url: "/benefits"
    },
    {
      keyword: "zero calorie sweetener",
      position: 12,
      previousPosition: 15,
      searchVolume: 3200,
      difficulty: 72,
      url: "/products"
    },
    {
      keyword: "healthy sugar substitute",
      position: 8,
      previousPosition: 6,
      searchVolume: 2800,
      difficulty: 45,
      url: "/compare"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'analytics', name: 'SEO Analytics', icon: TrendingUp },
    { id: 'schema', name: 'Schema Management', icon: Code },
    { id: 'content', name: 'Content Optimization', icon: FileText },
    { id: 'technical', name: 'Technical SEO', icon: Settings },
    { id: 'international', name: 'International SEO', icon: Languages },
    { id: 'voice', name: 'Voice Search', icon: Mic },
    { id: 'performance', name: 'Performance', icon: Activity },
    { id: 'reports', name: 'Reports', icon: BookOpen }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* SEO Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seoMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.color} bg-opacity-10`}>
                <metric.icon className={`h-6 w-6 ${metric.color.replace('bg-', 'text-')}`} />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' : 
                metric.trend === 'down' ? 'bg-red-100 text-red-700' : 
                'bg-gray-100 text-gray-700'
              }`}>
                {metric.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : 
                 metric.trend === 'down' ? <ArrowDown className="h-3 w-3" /> : null}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SEO Issues & Keyword Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Issues */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              SEO Issues
            </h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              {seoIssues.length} Issues
            </span>
          </div>
          <div className="space-y-4">
            {seoIssues.map((issue) => (
              <div key={issue.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      issue.type === 'critical' ? 'bg-red-500' : 
                      issue.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <h4 className="font-medium text-gray-900">{issue.title}</h4>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    issue.impact === 'high' ? 'bg-red-100 text-red-700' :
                    issue.impact === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {issue.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                <p className="text-xs text-gray-500 mb-2">Pages: {issue.page}</p>
                <p className="text-xs text-green-600 font-medium">{issue.fix}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword Rankings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 text-blue-500 mr-2" />
              Keyword Rankings
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {keywordRankings.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{keyword.keyword}</p>
                  <p className="text-sm text-gray-600">{keyword.url}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">#{keyword.position}</p>
                    <p className="text-xs text-gray-500">Position</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    keyword.position < keyword.previousPosition ? 'text-green-600' : 
                    keyword.position > keyword.previousPosition ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {keyword.position < keyword.previousPosition ? <ArrowUp className="h-3 w-3" /> : 
                     keyword.position > keyword.previousPosition ? <ArrowDown className="h-3 w-3" /> : null}
                    <span className="text-xs">
                      {Math.abs(keyword.position - keyword.previousPosition)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <FileText className="h-8 w-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900 mb-1">Audit Content</h4>
            <p className="text-sm text-gray-600">Check meta tags and content optimization</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <Code className="h-8 w-8 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900 mb-1">Update Schema</h4>
            <p className="text-sm text-gray-600">Manage structured data markup</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <Activity className="h-8 w-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900 mb-1">Performance Check</h4>
            <p className="text-sm text-gray-600">Analyze Core Web Vitals</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <BookOpen className="h-8 w-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900 mb-1">Generate Report</h4>
            <p className="text-sm text-gray-600">Create comprehensive SEO report</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string, description: string, icon: any) => (
    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        {icon && <icon className="h-8 w-8 text-gray-400" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
        Coming Soon
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Globe className="h-8 w-8 mr-3" />
              Search Engine Optimization
            </h1>
            <p className="text-blue-100 text-lg">
              Manage and optimize your website's search engine performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white transition-all duration-200 flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'analytics' && renderPlaceholder(
            'SEO Analytics Dashboard',
            'Comprehensive analytics for organic traffic, keyword performance, and search visibility metrics.',
            TrendingUp
          )}
          {activeTab === 'schema' && renderPlaceholder(
            'Schema Management',
            'Manage structured data markup for better search engine understanding and rich snippets.',
            Code
          )}
          {activeTab === 'content' && renderPlaceholder(
            'Content Optimization',
            'Optimize meta tags, headings, keywords, and content for better search engine rankings.',
            FileText
          )}
          {activeTab === 'technical' && renderPlaceholder(
            'Technical SEO Monitor',
            'Monitor crawlability, indexing, site speed, mobile-friendliness, and technical SEO factors.',
            Settings
          )}
          {activeTab === 'international' && renderPlaceholder(
            'International SEO',
            'Manage hreflang tags, geo-targeting, and multi-language SEO optimization.',
            Languages
          )}
          {activeTab === 'voice' && renderPlaceholder(
            'Voice Search Optimization',
            'Optimize content for voice search queries and featured snippets.',
            Mic
          )}
          {activeTab === 'performance' && renderPlaceholder(
            'Performance Monitoring',
            'Track Core Web Vitals, page speed, and performance metrics that impact SEO.',
            Activity
          )}
          {activeTab === 'reports' && renderPlaceholder(
            'SEO Reports & Insights',
            'Generate comprehensive SEO reports with actionable recommendations and insights.',
            BookOpen
          )}
        </div>
      </div>
    </div>
  );
}
