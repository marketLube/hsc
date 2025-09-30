"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Search,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  Star,
  ThumbsUp,
  MessageSquare,
  Zap,
  Activity,
  TrendingDown
} from "lucide-react";

interface TrafficData {
  date: string;
  organicTraffic: number;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
}

interface KeywordData {
  keyword: string;
  position: number;
  previousPosition: number;
  clicks: number;
  impressions: number;
  ctr: number;
  searchVolume: number;
  difficulty: number;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  url: string;
}

interface PagePerformance {
  url: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  change: number;
}

export default function SEOAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('traffic');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const trafficData: TrafficData[] = [
    { date: '2024-01-01', organicTraffic: 1200, impressions: 45000, clicks: 1200, ctr: 2.67, avgPosition: 8.5 },
    { date: '2024-01-02', organicTraffic: 1350, impressions: 47000, clicks: 1350, ctr: 2.87, avgPosition: 8.2 },
    { date: '2024-01-03', organicTraffic: 1180, impressions: 44000, clicks: 1180, ctr: 2.68, avgPosition: 8.7 },
    { date: '2024-01-04', organicTraffic: 1420, impressions: 49000, clicks: 1420, ctr: 2.90, avgPosition: 8.1 },
    { date: '2024-01-05', organicTraffic: 1580, impressions: 52000, clicks: 1580, ctr: 3.04, avgPosition: 7.9 },
  ];

  const topKeywords: KeywordData[] = [
    {
      keyword: "stevia sweetener",
      position: 3,
      previousPosition: 5,
      clicks: 890,
      impressions: 12000,
      ctr: 7.42,
      searchVolume: 8900,
      difficulty: 65,
      intent: 'commercial',
      url: "/products"
    },
    {
      keyword: "natural sugar alternative",
      position: 7,
      previousPosition: 12,
      clicks: 420,
      impressions: 8500,
      ctr: 4.94,
      searchVolume: 5400,
      difficulty: 58,
      intent: 'informational',
      url: "/benefits"
    },
    {
      keyword: "zero calorie sweetener",
      position: 12,
      previousPosition: 15,
      clicks: 280,
      impressions: 6200,
      ctr: 4.52,
      searchVolume: 3200,
      difficulty: 72,
      intent: 'commercial',
      url: "/products"
    },
    {
      keyword: "healthy sugar substitute",
      position: 8,
      previousPosition: 6,
      clicks: 350,
      impressions: 7800,
      ctr: 4.49,
      searchVolume: 2800,
      difficulty: 45,
      intent: 'commercial',
      url: "/compare"
    },
    {
      keyword: "stevia benefits",
      position: 4,
      previousPosition: 4,
      clicks: 520,
      impressions: 9200,
      ctr: 5.65,
      searchVolume: 4100,
      difficulty: 42,
      intent: 'informational',
      url: "/benefits"
    }
  ];

  const topPages: PagePerformance[] = [
    {
      url: "/products",
      title: "Premium Stevia Products - Natural Sweeteners",
      clicks: 2450,
      impressions: 28000,
      ctr: 8.75,
      avgPosition: 4.2,
      change: 15.3
    },
    {
      url: "/benefits",
      title: "Health Benefits of Stevia - Natural Sugar Alternative",
      clicks: 1890,
      impressions: 22000,
      ctr: 8.59,
      avgPosition: 5.1,
      change: 8.7
    },
    {
      url: "/",
      title: "The Healthy Sugar Company - Premium Stevia Sweeteners",
      clicks: 1650,
      impressions: 35000,
      ctr: 4.71,
      avgPosition: 6.8,
      change: 12.1
    },
    {
      url: "/compare",
      title: "Stevia vs Sugar Comparison - Why Choose Natural",
      clicks: 980,
      impressions: 15000,
      ctr: 6.53,
      avgPosition: 7.2,
      change: -2.4
    },
    {
      url: "/faq",
      title: "Stevia FAQ - Common Questions About Natural Sweeteners",
      clicks: 720,
      impressions: 12000,
      ctr: 6.00,
      avgPosition: 8.5,
      change: 5.8
    }
  ];

  const summaryMetrics = {
    totalClicks: 24567,
    totalImpressions: 456789,
    averageCTR: 5.38,
    averagePosition: 6.2,
    totalKeywords: 1247,
    topKeywords: 89,
    clicksChange: 12.5,
    impressionsChange: 8.3,
    ctrChange: 0.8,
    positionChange: -1.2
  };

  const deviceData = [
    { device: 'Desktop', clicks: 12450, percentage: 50.7, change: 8.2 },
    { device: 'Mobile', clicks: 9890, percentage: 40.3, change: 18.5 },
    { device: 'Tablet', clicks: 2227, percentage: 9.0, change: -3.1 }
  ];

  const countryData = [
    { country: 'India', clicks: 18450, percentage: 75.1, change: 12.8 },
    { country: 'United States', clicks: 3200, percentage: 13.0, change: 15.2 },
    { country: 'United Kingdom', clicks: 1450, percentage: 5.9, change: 8.7 },
    { country: 'Canada', clicks: 890, percentage: 3.6, change: 22.1 },
    { country: 'Australia', clicks: 577, percentage: 2.4, change: 6.3 }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const exportData = () => {
    // Mock export functionality
    const data = {
      summary: summaryMetrics,
      keywords: topKeywords,
      pages: topPages,
      devices: deviceData,
      countries: countryData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-analytics-${timeRange}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'commercial': return 'bg-green-100 text-green-700';
      case 'informational': return 'bg-blue-100 text-blue-700';
      case 'transactional': return 'bg-purple-100 text-purple-700';
      case 'navigational': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'bg-green-100 text-green-700';
    if (difficulty < 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <TrendingUp className="h-8 w-8 mr-3" />
              SEO Analytics Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Comprehensive search engine optimization performance metrics
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
              onClick={exportData}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
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

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <MousePointer className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
              summaryMetrics.clicksChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {summaryMetrics.clicksChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(summaryMetrics.clicksChange)}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{summaryMetrics.totalClicks.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Clicks</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-100">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
              summaryMetrics.impressionsChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {summaryMetrics.impressionsChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(summaryMetrics.impressionsChange)}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{summaryMetrics.totalImpressions.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Impressions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-100">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
              summaryMetrics.ctrChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {summaryMetrics.ctrChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(summaryMetrics.ctrChange)}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{summaryMetrics.averageCTR}%</p>
            <p className="text-sm text-gray-600">Average CTR</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
              summaryMetrics.positionChange < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {summaryMetrics.positionChange < 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(summaryMetrics.positionChange)}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{summaryMetrics.averagePosition}</p>
            <p className="text-sm text-gray-600">Average Position</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Search className="h-5 w-5 text-blue-500 mr-2" />
              Top Keywords
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{summaryMetrics.totalKeywords} total</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {topKeywords.map((keyword, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{keyword.keyword}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntentColor(keyword.intent)}`}>
                        {keyword.intent}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                        KD: {keyword.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">#{keyword.position}</span>
                      <div className={`flex items-center space-x-1 ${
                        keyword.position < keyword.previousPosition ? 'text-green-600' : 
                        keyword.position > keyword.previousPosition ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {keyword.position < keyword.previousPosition ? <ArrowUp className="h-3 w-3" /> : 
                         keyword.position > keyword.previousPosition ? <ArrowDown className="h-3 w-3" /> : null}
                        <span className="text-xs">
                          {keyword.position !== keyword.previousPosition ? Math.abs(keyword.position - keyword.previousPosition) : ''}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{keyword.url}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Clicks</p>
                    <p className="font-medium text-gray-900">{keyword.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CTR</p>
                    <p className="font-medium text-gray-900">{keyword.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Volume</p>
                    <p className="font-medium text-gray-900">{keyword.searchVolume.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
              Top Performing Pages
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1 truncate">{page.title}</h4>
                    <p className="text-sm text-blue-600 truncate">{page.url}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                      page.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {page.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      <span>{Math.abs(page.change)}%</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Clicks</p>
                    <p className="font-medium text-gray-900">{page.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Impressions</p>
                    <p className="font-medium text-gray-900">{page.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CTR</p>
                    <p className="font-medium text-gray-900">{page.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Position</p>
                    <p className="font-medium text-gray-900">{page.avgPosition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device & Country Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Smartphone className="h-5 w-5 text-purple-500 mr-2" />
            Device Performance
          </h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {device.device === 'Desktop' && <Monitor className="h-5 w-5 text-gray-600" />}
                  {device.device === 'Mobile' && <Smartphone className="h-5 w-5 text-gray-600" />}
                  {device.device === 'Tablet' && <Monitor className="h-5 w-5 text-gray-600" />}
                  <div>
                    <p className="font-medium text-gray-900">{device.device}</p>
                    <p className="text-sm text-gray-600">{device.percentage}% of traffic</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{device.clicks.toLocaleString()}</p>
                  <div className={`flex items-center space-x-1 text-sm ${
                    device.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {device.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{Math.abs(device.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Globe className="h-5 w-5 text-indigo-500 mr-2" />
            Geographic Performance
          </h3>
          <div className="space-y-4">
            {countryData.map((country, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{country.country}</p>
                    <p className="text-sm text-gray-600">{country.percentage}% of traffic</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{country.clicks.toLocaleString()}</p>
                  <div className={`flex items-center space-x-1 text-sm ${
                    country.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {country.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{Math.abs(country.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
