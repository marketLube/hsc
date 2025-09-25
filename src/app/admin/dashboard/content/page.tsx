"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Image, 
  Video, 
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Tag,
  User,
  Globe,
  Sparkles,
  Layout,
  Palette,
  Settings,
  Save,
  X,
  Upload,
  ImageIcon,
  Type,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
  Copy,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Zap,
  Star
} from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { getAllScienceArticles } from "@/lib/science-articles";
import { HERO_SLIDES, BANNER_TILES } from "@/lib/data";

type ContentType = 'all' | 'homepage' | 'blog' | 'science' | 'banners' | 'media';
type ContentStatus = 'all' | 'published' | 'draft' | 'scheduled';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: 'published' | 'draft' | 'scheduled';
  date: string;
  author?: string;
  views?: number;
  category?: string;
  tags?: string[];
  image?: string;
  excerpt?: string;
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<ContentType>('all');
  const [statusFilter, setStatusFilter] = useState<ContentStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showBannerEditor, setShowBannerEditor] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [bannerType, setBannerType] = useState<'hero' | 'tiles'>('hero');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    views: 0
  });

  // Load content data
  useEffect(() => {
    const blogArticles = getAllArticles();
    const scienceArticles = getAllScienceArticles();
    
    const allContent: ContentItem[] = [
      // Homepage content
      ...HERO_SLIDES.map((slide, index) => ({
        id: `hero-${slide.id}`,
        title: slide.title,
        type: 'Hero Banner',
        status: 'published' as const,
        date: '2024-01-20',
        category: 'Homepage',
        image: slide.image,
        excerpt: slide.subtitle
      })),
      ...BANNER_TILES.map((tile, index) => ({
        id: `tile-${tile.id}`,
        title: tile.title,
        type: 'Benefit Card',
        status: 'published' as const,
        date: '2024-01-20',
        category: 'Homepage',
        image: tile.image,
        excerpt: tile.subtitle
      })),
      // Blog articles
      ...blogArticles.map(article => ({
        id: `blog-${article.id}`,
        title: article.title,
        type: 'Blog Article',
        status: 'published' as const,
        date: article.date,
        author: article.author,
        views: Math.floor(Math.random() * 2000) + 500,
        category: article.category,
        tags: article.tags,
        image: article.image,
        excerpt: article.excerpt
      })),
      // Science articles
      ...scienceArticles.map(article => ({
        id: `science-${article.id}`,
        title: article.title,
        type: 'Science Article',
        status: 'published' as const,
        date: article.date,
        author: article.author,
        views: Math.floor(Math.random() * 1500) + 300,
        category: article.category,
        tags: article.tags,
        image: article.image,
        excerpt: article.excerpt
      }))
    ];

    setContentItems(allContent);
    
    // Calculate stats
    const totalViews = allContent.reduce((sum, item) => sum + (item.views || 0), 0);
    setStats({
      total: allContent.length,
      published: allContent.filter(item => item.status === 'published').length,
      draft: allContent.filter(item => item.status === 'draft').length,
      scheduled: allContent.filter(item => item.status === 'scheduled').length,
      views: totalViews
    });
  }, []);

  // Filter content based on active tab and filters
  const filteredContent = contentItems.filter(item => {
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'homepage':
          return item.type === 'Hero Banner' || item.type === 'Benefit Card';
        case 'blog':
          return item.type === 'Blog Article';
        case 'science':
          return item.type === 'Science Article';
        case 'banners':
          return item.type === 'Hero Banner' || item.type === 'Benefit Card';
        case 'media':
          return item.type === 'Image' || item.type === 'Video';
      }
    }
    
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }
    
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleEditBanner = (banner: any, type: 'hero' | 'tiles') => {
    setEditingBanner(banner);
    setBannerType(type);
    setShowBannerEditor(true);
  };

  const handleSaveBanner = () => {
    // In a real app, this would save to a backend
    console.log('Saving banner:', editingBanner);
    setShowBannerEditor(false);
    setEditingBanner(null);
  };

  const contentTypeStats = [
    { 
      name: 'Homepage Content', 
      count: contentItems.filter(item => item.type === 'Hero Banner' || item.type === 'Benefit Card').length,
      icon: Layout,
      color: 'bg-blue-500',
      trend: '+2.3%'
    },
    { 
      name: 'Blog Articles', 
      count: contentItems.filter(item => item.type === 'Blog Article').length,
      icon: FileText,
      color: 'bg-green-500',
      trend: '+5.7%'
    },
    { 
      name: 'Science Articles', 
      count: contentItems.filter(item => item.type === 'Science Article').length,
      icon: Zap,
      color: 'bg-purple-500',
      trend: '+1.2%'
    },
    { 
      name: 'Total Views', 
      count: stats.views.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: '+12.4%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Content Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage homepage banners, blog articles, science content, and media assets
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowEditor(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {contentTypeStats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.count}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.trend}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'all', name: 'All Content', icon: Globe },
              { id: 'homepage', name: 'Homepage', icon: Layout },
              { id: 'blog', name: 'Blog Articles', icon: FileText },
              { id: 'science', name: 'Science Articles', icon: Zap },
              { id: 'banners', name: 'Banners & Cards', icon: Image },
              { id: 'media', name: 'Media Library', icon: Video }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ContentType)}
                className={`${
                  activeTab === tab.id
                    ? 'border-brand text-brand'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand sm:text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ContentStatus)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-brand focus:border-brand"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredContent.length} of {contentItems.length} items
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="divide-y divide-gray-200">
          {filteredContent.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredContent.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {item.image && (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          {item.type}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        {item.author && (
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {item.author}
                          </span>
                        )}
                        {item.views && (
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views.toLocaleString()} views
                          </span>
                        )}
                      </div>
                      {item.excerpt && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (item.type === 'Hero Banner') {
                          const banner = HERO_SLIDES.find(slide => `hero-${slide.id}` === item.id);
                          if (banner) handleEditBanner(banner, 'hero');
                        } else if (item.type === 'Benefit Card') {
                          const banner = BANNER_TILES.find(tile => `tile-${tile.id}` === item.id);
                          if (banner) handleEditBanner(banner, 'tiles');
                        } else {
                          setSelectedContent(item);
                          setShowEditor(true);
                        }
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Banner Editor Modal */}
      {showBannerEditor && editingBanner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Edit {bannerType === 'hero' ? 'Hero Banner' : 'Benefit Card'}
              </h3>
              <button
                onClick={() => setShowBannerEditor(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingBanner.title || ''}
                    onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={editingBanner.subtitle || ''}
                    onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={editingBanner.image || ''}
                      onChange={(e) => setEditingBanner({...editingBanner, image: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
                    />
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {bannerType === 'hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary CTA Text
                      </label>
                      <input
                        type="text"
                        value={editingBanner.cta1?.text || ''}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner, 
                          cta1: {...editingBanner.cta1, text: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary CTA Text
                      </label>
                      <input
                        type="text"
                        value={editingBanner.cta2?.text || ''}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner, 
                          cta2: {...editingBanner.cta2, text: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand"
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSaveBanner}
                    className="flex-1 bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  >
                    <Save className="h-4 w-4 mr-2 inline" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowBannerEditor(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                
                {bannerType === 'hero' ? (
                  <div className="relative h-64 bg-gradient-to-r from-brand/80 to-brand/60 rounded-lg overflow-hidden">
                    {editingBanner.image && (
                      <img
                        src={editingBanner.image}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand/80 to-brand/60" />
                    <div className="relative h-full flex items-center justify-center text-center text-white p-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{editingBanner.title}</h2>
                        <p className="text-white/90 mb-4">{editingBanner.subtitle}</p>
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-brand px-4 py-2 rounded text-sm">
                            {editingBanner.cta1?.text}
                          </button>
                          <button className="border border-white text-white px-4 py-2 rounded text-sm">
                            {editingBanner.cta2?.text}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-32">
                      {editingBanner.image && (
                        <img
                          src={editingBanner.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-sm">{editingBanner.title}</h3>
                        <p className="text-xs text-white/90">{editingBanner.subtitle}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center">
                    <Monitor className="h-3 w-3 mr-1" />
                    Desktop Preview
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-400 hover:text-gray-600">
                      <Tablet className="h-3 w-3 mr-1" />
                      Tablet
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-gray-600">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mobile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Editor Modal (placeholder for now) */}
      {showEditor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedContent ? 'Edit Content' : 'Create New Content'}
              </h3>
              <button
                onClick={() => {
                  setShowEditor(false);
                  setSelectedContent(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Rich Content Editor</h3>
              <p className="mt-1 text-sm text-gray-500">
                Full content editor with rich text, media upload, SEO optimization, and more coming soon.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setSelectedContent(null);
                  }}
                  className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
