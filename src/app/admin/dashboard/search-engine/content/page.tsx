"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Plus,
  Save,
  X,
  Target,
  Hash,
  Type,
  Image,
  Link,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Zap,
  Star,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Copy,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface PageContent {
  id: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  wordCount: number;
  lastModified: string;
  status: 'optimized' | 'needs-work' | 'critical';
  issues: ContentIssue[];
  keywords: KeywordAnalysis[];
  readabilityScore: number;
  seoScore: number;
}

interface ContentIssue {
  type: 'critical' | 'warning' | 'info';
  category: 'meta' | 'content' | 'images' | 'links' | 'keywords';
  title: string;
  description: string;
  fix: string;
}

interface KeywordAnalysis {
  keyword: string;
  density: number;
  occurrences: number;
  inTitle: boolean;
  inMeta: boolean;
  inH1: boolean;
  inH2: boolean;
  difficulty: number;
  searchVolume: number;
  position?: number;
}

interface ContentSuggestion {
  type: 'title' | 'meta' | 'heading' | 'content';
  current: string;
  suggested: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
}

export default function ContentOptimizationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState({
    title: '',
    metaDescription: '',
    h1: '',
    content: ''
  });

  // Mock data
  const pageContents: PageContent[] = [
    {
      id: '1',
      url: '/',
      title: 'The Healthy Sugar Company - Premium Stevia Sweeteners',
      metaDescription: 'Discover natural stevia sweeteners from The Healthy Sugar Company. Zero calories, diabetic-friendly, and 100% natural sugar alternatives.',
      h1: 'Premium Natural Stevia Sweeteners',
      wordCount: 1250,
      lastModified: '2024-01-15',
      status: 'optimized',
      readabilityScore: 85,
      seoScore: 92,
      issues: [
        {
          type: 'info',
          category: 'content',
          title: 'Add more internal links',
          description: 'Consider adding more internal links to product pages',
          fix: 'Add 2-3 contextual internal links to improve site structure'
        }
      ],
      keywords: [
        {
          keyword: 'stevia sweetener',
          density: 2.1,
          occurrences: 8,
          inTitle: true,
          inMeta: true,
          inH1: true,
          inH2: true,
          difficulty: 65,
          searchVolume: 8900,
          position: 3
        },
        {
          keyword: 'natural sweetener',
          density: 1.8,
          occurrences: 6,
          inTitle: false,
          inMeta: true,
          inH1: true,
          inH2: false,
          difficulty: 58,
          searchVolume: 5400,
          position: 7
        }
      ]
    },
    {
      id: '2',
      url: '/products',
      title: 'Stevia Products - Natural Sugar Alternatives',
      metaDescription: 'Browse our premium stevia products including tablets, syrup, powder, and sachets. Natural, zero-calorie sweeteners for healthy living.',
      h1: 'Our Stevia Product Range',
      wordCount: 890,
      lastModified: '2024-01-14',
      status: 'needs-work',
      readabilityScore: 78,
      seoScore: 76,
      issues: [
        {
          type: 'warning',
          category: 'meta',
          title: 'Meta description too short',
          description: 'Meta description is only 120 characters, could be up to 160',
          fix: 'Expand meta description to include more relevant keywords'
        },
        {
          type: 'warning',
          category: 'images',
          title: 'Missing alt text',
          description: '3 images are missing alt text',
          fix: 'Add descriptive alt text to all product images'
        }
      ],
      keywords: [
        {
          keyword: 'stevia products',
          density: 3.2,
          occurrences: 12,
          inTitle: true,
          inMeta: true,
          inH1: false,
          inH2: true,
          difficulty: 45,
          searchVolume: 3200,
          position: 5
        }
      ]
    },
    {
      id: '3',
      url: '/benefits',
      title: 'Health Benefits of Stevia - Natural Sugar Alternative',
      metaDescription: 'Learn about the amazing health benefits of stevia sweetener. Zero calories, diabetes-friendly, and natural plant-based sweetening.',
      h1: 'Why Choose Stevia? Health Benefits Explained',
      wordCount: 1580,
      lastModified: '2024-01-13',
      status: 'critical',
      readabilityScore: 72,
      seoScore: 68,
      issues: [
        {
          type: 'critical',
          category: 'content',
          title: 'Keyword density too low',
          description: 'Primary keyword "stevia benefits" appears only 0.8% (recommended 1-2%)',
          fix: 'Naturally incorporate "stevia benefits" 3-4 more times in the content'
        },
        {
          type: 'critical',
          category: 'meta',
          title: 'Title too long',
          description: 'Title is 67 characters, exceeds recommended 60 characters',
          fix: 'Shorten title to "Stevia Health Benefits - Natural Sugar Alternative"'
        },
        {
          type: 'warning',
          category: 'links',
          title: 'No external authority links',
          description: 'Consider adding links to medical studies or health authorities',
          fix: 'Add 1-2 links to reputable health sources or studies'
        }
      ],
      keywords: [
        {
          keyword: 'stevia benefits',
          density: 0.8,
          occurrences: 4,
          inTitle: false,
          inMeta: false,
          inH1: false,
          inH2: true,
          difficulty: 42,
          searchVolume: 4100,
          position: 12
        }
      ]
    },
    {
      id: '4',
      url: '/compare',
      title: 'Stevia vs Sugar Comparison - Why Choose Natural',
      metaDescription: 'Compare stevia vs regular sugar, artificial sweeteners, and other alternatives. See why stevia is the healthiest choice.',
      h1: 'Stevia vs Sugar: The Complete Comparison',
      wordCount: 1120,
      lastModified: '2024-01-12',
      status: 'needs-work',
      readabilityScore: 81,
      seoScore: 79,
      issues: [
        {
          type: 'warning',
          category: 'content',
          title: 'Low content freshness',
          description: 'Content hasn\'t been updated in 3 weeks',
          fix: 'Add recent studies or statistics to keep content fresh'
        }
      ],
      keywords: [
        {
          keyword: 'stevia vs sugar',
          density: 2.5,
          occurrences: 9,
          inTitle: true,
          inMeta: false,
          inH1: true,
          inH2: true,
          difficulty: 38,
          searchVolume: 2800,
          position: 8
        }
      ]
    }
  ];

  const contentSuggestions: ContentSuggestion[] = [
    {
      type: 'title',
      current: 'Health Benefits of Stevia - Natural Sugar Alternative',
      suggested: 'Stevia Health Benefits - Natural Sugar Alternative',
      reason: 'Shorter title (under 60 characters) with primary keyword first',
      impact: 'high'
    },
    {
      type: 'meta',
      current: 'Browse our premium stevia products including tablets, syrup, powder, and sachets.',
      suggested: 'Browse our premium stevia products including tablets, syrup, powder, and sachets. Natural, zero-calorie sweeteners perfect for diabetics and health-conscious consumers.',
      reason: 'Expand to use full 160 character limit and include more keywords',
      impact: 'medium'
    },
    {
      type: 'heading',
      current: 'Our Stevia Product Range',
      suggested: 'Premium Stevia Products - Natural Sweetener Range',
      reason: 'Include target keywords in H1 for better SEO',
      impact: 'medium'
    }
  ];

  const filteredPages = pageContents.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-700';
      case 'needs-work': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meta': return Hash;
      case 'content': return FileText;
      case 'images': return Image;
      case 'links': return Link;
      case 'keywords': return Target;
      default: return FileText;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditPage = (page: PageContent) => {
    setSelectedPage(page);
    setEditingContent({
      title: page.title,
      metaDescription: page.metaDescription,
      h1: page.h1,
      content: '' // Would load from API
    });
    setIsEditing(true);
    setActiveTab('editor');
  };

  const handleSaveContent = () => {
    // Here you would save the content to your backend
    console.log('Saving content:', editingContent);
    setIsEditing(false);
    setActiveTab('overview');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedPage(null);
    setActiveTab('overview');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{pageContents.length}</p>
            <p className="text-sm text-gray-600">Total Pages</p>
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
              {pageContents.filter(p => p.status === 'optimized').length}
            </p>
            <p className="text-sm text-gray-600">Optimized</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-yellow-100">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {pageContents.filter(p => p.status === 'needs-work').length}
            </p>
            <p className="text-sm text-gray-600">Need Work</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {pageContents.filter(p => p.status === 'critical').length}
            </p>
            <p className="text-sm text-gray-600">Critical Issues</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="optimized">Optimized</option>
              <option value="needs-work">Needs Work</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Bulk Optimize</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SEO Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Readability
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Word Count
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {page.title}
                      </div>
                      <div className="text-sm text-blue-600">{page.url}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                        {page.metaDescription}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-lg font-bold ${getScoreColor(page.seoScore)}`}>
                        {page.seoScore}
                      </div>
                      <div className="ml-2 text-xs text-gray-500">/100</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-lg font-bold ${getScoreColor(page.readabilityScore)}`}>
                        {page.readabilityScore}
                      </div>
                      <div className="ml-2 text-xs text-gray-500">/100</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {page.wordCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                      {page.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-gray-900">{page.issues.length}</span>
                      <div className="flex space-x-1">
                        {page.issues.slice(0, 3).map((issue, index) => {
                          const IssueIcon = getIssueIcon(issue.type);
                          return (
                            <IssueIcon
                              key={index}
                              className={`h-3 w-3 ${getIssueColor(issue.type)}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditPage(page)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit Content"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="View Page">
                        <ExternalLink className="h-4 w-4" />
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

  const renderSuggestions = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Optimization Suggestions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          AI-powered suggestions to improve your content's SEO performance and search rankings.
        </p>
      </div>

      <div className="space-y-4">
        {contentSuggestions.map((suggestion, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  suggestion.type === 'title' ? 'bg-blue-100' :
                  suggestion.type === 'meta' ? 'bg-green-100' :
                  suggestion.type === 'heading' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {suggestion.type === 'title' && <Type className="h-5 w-5 text-blue-600" />}
                  {suggestion.type === 'meta' && <Hash className="h-5 w-5 text-green-600" />}
                  {suggestion.type === 'heading' && <FileText className="h-5 w-5 text-purple-600" />}
                  {suggestion.type === 'content' && <Edit className="h-5 w-5 text-orange-600" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 capitalize">{suggestion.type} Optimization</h3>
                  <p className="text-sm text-gray-600">{suggestion.reason}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  suggestion.impact === 'high' ? 'bg-red-100 text-red-700' :
                  suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {suggestion.impact} impact
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Apply
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current:</label>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-gray-700">
                  {suggestion.current}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggested:</label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
                  {suggestion.suggested}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="space-y-6">
      {selectedPage && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Edit Content: {selectedPage.url}
              </h2>
              <p className="text-gray-600">
                Optimize your content for better search engine rankings
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveContent}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Editor</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter page title..."
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {editingContent.title.length}/60 characters
                      </p>
                      {editingContent.title.length > 60 && (
                        <p className="text-xs text-red-500">Title too long</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={editingContent.metaDescription}
                      onChange={(e) => setEditingContent({...editingContent, metaDescription: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter meta description..."
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {editingContent.metaDescription.length}/160 characters
                      </p>
                      {editingContent.metaDescription.length > 160 && (
                        <p className="text-xs text-red-500">Description too long</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      H1 Heading <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingContent.h1}
                      onChange={(e) => setEditingContent({...editingContent, h1: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter H1 heading..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={editingContent.content}
                      onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter page content..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Panel */}
            <div className="space-y-6">
              {/* SEO Analysis */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  SEO Analysis
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SEO Score</span>
                    <span className={`text-lg font-bold ${getScoreColor(selectedPage.seoScore)}`}>
                      {selectedPage.seoScore}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Readability</span>
                    <span className={`text-lg font-bold ${getScoreColor(selectedPage.readabilityScore)}`}>
                      {selectedPage.readabilityScore}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Word Count</span>
                    <span className="text-lg font-bold text-gray-900">
                      {selectedPage.wordCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Issues */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  Issues ({selectedPage.issues.length})
                </h3>
                
                <div className="space-y-3">
                  {selectedPage.issues.map((issue, index) => {
                    const IssueIcon = getIssueIcon(issue.type);
                    const CategoryIcon = getCategoryIcon(issue.category);
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2 mb-2">
                          <IssueIcon className={`h-4 w-4 mt-0.5 ${getIssueColor(issue.type)}`} />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{issue.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                          </div>
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <p className="text-xs text-blue-700 font-medium">Fix: {issue.fix}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Hash className="h-5 w-5 text-green-500 mr-2" />
                  Keywords
                </h3>
                
                <div className="space-y-3">
                  {selectedPage.keywords.map((keyword, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{keyword.keyword}</h4>
                        <span className="text-xs text-gray-500">{keyword.density}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Volume:</span>
                          <span className="font-medium">{keyword.searchVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Difficulty:</span>
                          <span className="font-medium">{keyword.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Position:</span>
                          <span className="font-medium">#{keyword.position || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Count:</span>
                          <span className="font-medium">{keyword.occurrences}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {keyword.inTitle && <span className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Title</span>}
                        {keyword.inMeta && <span className="px-1 py-0.5 bg-green-100 text-green-700 text-xs rounded">Meta</span>}
                        {keyword.inH1 && <span className="px-1 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">H1</span>}
                        {keyword.inH2 && <span className="px-1 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">H2</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Content Overview', icon: Eye },
    { id: 'suggestions', name: 'AI Suggestions', icon: Lightbulb },
    { id: 'editor', name: 'Content Editor', icon: Edit }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FileText className="h-8 w-8 mr-3" />
              Content Optimization
            </h1>
            <p className="text-green-100 text-lg">
              Optimize your content for better search engine rankings and user engagement
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Analyze All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 bg-green-50'
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
          {activeTab === 'suggestions' && renderSuggestions()}
          {activeTab === 'editor' && renderEditor()}
        </div>
      </div>
    </div>
  );
}
