"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Shield,
  Search,
  Link,
  FileText,
  Image,
  Code,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Download,
  ExternalLink,
  Clock,
  Activity,
  Eye,
  Target,
  Server,
  Database,
  Wifi,
  Lock,
  Gauge,
  HardDrive,
  Network,
  Bug,
  Tool,
  Wrench,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  BarChart3
} from "lucide-react";

interface TechnicalIssue {
  id: string;
  category: 'crawling' | 'indexing' | 'performance' | 'mobile' | 'security' | 'structure';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  url?: string;
  fix: string;
  impact: string;
  detected: string;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
  threshold: {
    good: number;
    poor: number;
  };
  change: number;
  icon: any;
}

interface CrawlData {
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  lastCrawled: string;
  issues: string[];
}

interface SecurityCheck {
  check: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  recommendation?: string;
}

export default function TechnicalSEOPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Mock data
  const technicalIssues: TechnicalIssue[] = [
    {
      id: '1',
      category: 'performance',
      severity: 'critical',
      title: 'Large Cumulative Layout Shift (CLS)',
      description: 'Homepage has a CLS score of 0.25, exceeding the recommended 0.1 threshold',
      url: '/',
      fix: 'Add explicit width and height attributes to images and reserve space for dynamic content',
      impact: 'Poor user experience and lower search rankings',
      detected: '2024-01-15'
    },
    {
      id: '2',
      category: 'mobile',
      severity: 'high',
      title: 'Mobile Usability Issues',
      description: 'Text too small to read on mobile devices detected on 3 pages',
      url: '/products, /benefits, /compare',
      fix: 'Increase font size to at least 16px for body text on mobile devices',
      impact: 'Reduced mobile search visibility and user engagement',
      detected: '2024-01-14'
    },
    {
      id: '3',
      category: 'crawling',
      severity: 'medium',
      title: 'Slow Server Response Time',
      description: 'Server response time averaging 2.8 seconds, exceeding recommended 200ms',
      fix: 'Optimize server configuration, enable caching, and consider CDN implementation',
      impact: 'Slower indexing and potential ranking penalties',
      detected: '2024-01-13'
    },
    {
      id: '4',
      category: 'structure',
      severity: 'medium',
      title: 'Missing Canonical Tags',
      description: '5 pages are missing canonical tags, potentially causing duplicate content issues',
      url: '/faq, /contact, /about, /locations, /science',
      fix: 'Add canonical tags to all pages to specify preferred URLs',
      impact: 'Potential duplicate content penalties',
      detected: '2024-01-12'
    },
    {
      id: '5',
      category: 'security',
      severity: 'low',
      title: 'Missing Security Headers',
      description: 'X-Content-Type-Options header not found',
      fix: 'Add security headers including X-Content-Type-Options, X-Frame-Options, and CSP',
      impact: 'Minor security vulnerability, minimal SEO impact',
      detected: '2024-01-11'
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      metric: 'First Contentful Paint',
      value: 1.8,
      unit: 's',
      status: 'needs-improvement',
      threshold: { good: 1.8, poor: 3.0 },
      change: -0.2,
      icon: Zap
    },
    {
      metric: 'Largest Contentful Paint',
      value: 2.4,
      unit: 's',
      status: 'needs-improvement',
      threshold: { good: 2.5, poor: 4.0 },
      change: -0.3,
      icon: Eye
    },
    {
      metric: 'Cumulative Layout Shift',
      value: 0.25,
      unit: '',
      status: 'poor',
      threshold: { good: 0.1, poor: 0.25 },
      change: 0.05,
      icon: Activity
    },
    {
      metric: 'First Input Delay',
      value: 85,
      unit: 'ms',
      status: 'good',
      threshold: { good: 100, poor: 300 },
      change: -15,
      icon: Target
    },
    {
      metric: 'Time to Interactive',
      value: 3.2,
      unit: 's',
      status: 'needs-improvement',
      threshold: { good: 3.8, poor: 7.3 },
      change: -0.4,
      icon: Clock
    },
    {
      metric: 'Speed Index',
      value: 2.1,
      unit: 's',
      status: 'good',
      threshold: { good: 3.4, poor: 5.8 },
      change: -0.3,
      icon: Gauge
    }
  ];

  const crawlData: CrawlData[] = [
    {
      url: '/',
      status: 200,
      statusText: 'OK',
      responseTime: 1200,
      lastCrawled: '2024-01-15 10:30',
      issues: []
    },
    {
      url: '/products',
      status: 200,
      statusText: 'OK',
      responseTime: 1450,
      lastCrawled: '2024-01-15 10:32',
      issues: ['Slow response time']
    },
    {
      url: '/benefits',
      status: 200,
      statusText: 'OK',
      responseTime: 980,
      lastCrawled: '2024-01-15 10:34',
      issues: []
    },
    {
      url: '/compare',
      status: 301,
      statusText: 'Moved Permanently',
      responseTime: 150,
      lastCrawled: '2024-01-15 10:36',
      issues: ['Redirect chain']
    },
    {
      url: '/faq',
      status: 404,
      statusText: 'Not Found',
      responseTime: 0,
      lastCrawled: '2024-01-15 10:38',
      issues: ['Page not found']
    }
  ];

  const securityChecks: SecurityCheck[] = [
    {
      check: 'HTTPS Implementation',
      status: 'pass',
      description: 'All pages properly served over HTTPS with valid SSL certificate'
    },
    {
      check: 'Security Headers',
      status: 'warning',
      description: 'Some security headers are missing',
      recommendation: 'Add X-Content-Type-Options, X-Frame-Options, and CSP headers'
    },
    {
      check: 'Mixed Content',
      status: 'pass',
      description: 'No mixed content issues detected'
    },
    {
      check: 'Vulnerable Dependencies',
      status: 'fail',
      description: '2 outdated dependencies with known vulnerabilities detected',
      recommendation: 'Update dependencies to latest secure versions'
    },
    {
      check: 'Content Security Policy',
      status: 'warning',
      description: 'CSP header not implemented',
      recommendation: 'Implement Content Security Policy to prevent XSS attacks'
    }
  ];

  const filteredIssues = technicalIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || issue.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crawling': return Search;
      case 'indexing': return Database;
      case 'performance': return Zap;
      case 'mobile': return Smartphone;
      case 'security': return Shield;
      case 'structure': return Code;
      default: return Settings;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return CheckCircle;
      case 'fail': return AlertTriangle;
      case 'warning': return AlertCircle;
      default: return Info;
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'fail': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getResponseStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-yellow-600';
    if (status >= 400) return 'text-red-600';
    return 'text-gray-600';
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Technical SEO Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {technicalIssues.filter(i => i.severity === 'critical').length}
            </p>
            <p className="text-sm text-gray-600">Critical Issues</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-100">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {technicalIssues.filter(i => i.severity === 'high').length}
            </p>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {crawlData.filter(c => c.status === 200).length}
            </p>
            <p className="text-sm text-gray-600">Healthy Pages</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Gauge className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round(performanceMetrics.reduce((acc, m) => acc + (m.status === 'good' ? 100 : m.status === 'needs-improvement' ? 60 : 20), 0) / performanceMetrics.length)}
            </p>
            <p className="text-sm text-gray-600">Performance Score</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="performance">Performance</option>
              <option value="mobile">Mobile</option>
              <option value="crawling">Crawling</option>
              <option value="indexing">Indexing</option>
              <option value="security">Security</option>
              <option value="structure">Structure</option>
            </select>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={startScan}
              disabled={isScanning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Full Scan'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Technical Issues ({filteredIssues.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredIssues.map((issue) => {
            const CategoryIcon = getCategoryIcon(issue.category);
            return (
              <div key={issue.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <CategoryIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-medium text-gray-900">{issue.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{issue.description}</p>
                      {issue.url && (
                        <p className="text-sm text-blue-600 mb-2">Affected: {issue.url}</p>
                      )}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                        <p className="text-sm text-blue-700"><strong>Fix:</strong> {issue.fix}</p>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-700"><strong>Impact:</strong> {issue.impact}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Detected: {issue.detected}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Web Vitals & Performance</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor your website's Core Web Vitals and performance metrics that directly impact SEO rankings.
        </p>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gray-100">
                <metric.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                metric.change < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.change < 0 ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                <span>{Math.abs(metric.change)}{metric.unit}</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.metric}</h3>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                <span className="text-gray-500">{metric.unit}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium capitalize ${getStatusColor(metric.status)}`}>
                  {metric.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Good</span>
                <span className="text-gray-900">≤ {metric.threshold.good}{metric.unit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Poor</span>
                <span className="text-gray-900">≥ {metric.threshold.poor}{metric.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Recommendations */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          Performance Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Optimize Images</h4>
              <p className="text-sm text-gray-600 mb-3">
                Compress and convert images to modern formats like WebP to reduce load times.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">Impact: High</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Enable Compression</h4>
              <p className="text-sm text-gray-600 mb-3">
                Enable Gzip or Brotli compression to reduce file sizes and improve load times.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600 font-medium">Impact: Medium</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Minimize JavaScript</h4>
              <p className="text-sm text-gray-600 mb-3">
                Remove unused JavaScript and defer non-critical scripts to improve FCP and LCP.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">Impact: High</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Implement Caching</h4>
              <p className="text-sm text-gray-600 mb-3">
                Set up browser caching and CDN to reduce server response times.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600 font-medium">Impact: Medium</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrawling = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Crawling & Indexing Status</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor how search engines crawl and index your website pages.
        </p>
      </div>

      {/* Crawl Status Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Crawl Status</h3>
            <button
              onClick={startScan}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Crawl</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Crawled
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crawlData.map((crawl, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{crawl.url}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getResponseStatusColor(crawl.status)}`}>
                        {crawl.status}
                      </span>
                      <span className="text-sm text-gray-500">{crawl.statusText}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      crawl.responseTime > 2000 ? 'text-red-600' : 
                      crawl.responseTime > 1000 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {crawl.responseTime}ms
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {crawl.lastCrawled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-900">{crawl.issues.length}</span>
                      {crawl.issues.length > 0 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-700 mr-2">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & HTTPS Status</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ensure your website meets security standards that search engines require for good rankings.
        </p>
      </div>

      {/* Security Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityChecks.map((check, index) => {
          const StatusIcon = getStatusIcon(check.status);
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-6 w-6 ${getStatusColorClass(check.status)}`} />
                  <h3 className="text-lg font-semibold text-gray-900">{check.check}</h3>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  check.status === 'pass' ? 'bg-green-100 text-green-700' :
                  check.status === 'fail' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {check.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{check.description}</p>
              {check.recommendation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Recommendation:</strong> {check.recommendation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Score */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Security Score</h3>
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="text-4xl font-bold text-yellow-600">
            {Math.round((securityChecks.filter(c => c.status === 'pass').length / securityChecks.length) * 100)}
          </div>
          <div className="text-gray-500">/100</div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {securityChecks.filter(c => c.status === 'pass').length}
            </div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {securityChecks.filter(c => c.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-600">Warnings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {securityChecks.filter(c => c.status === 'fail').length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Technical Overview', icon: Settings },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'crawling', name: 'Crawling & Indexing', icon: Search },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Settings className="h-8 w-8 mr-3" />
              Technical SEO Monitor
            </h1>
            <p className="text-indigo-100 text-lg">
              Monitor technical aspects that impact your search engine rankings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Run Audit</span>
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
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
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
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'crawling' && renderCrawling()}
          {activeTab === 'security' && renderSecurity()}
        </div>
      </div>
    </div>
  );
}
