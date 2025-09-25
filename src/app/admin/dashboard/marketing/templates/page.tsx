"use client";

import { useState } from "react";
import { 
  Mail,
  Plus,
  Edit,
  Eye,
  Copy,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  Clock,
  Users,
  TrendingUp,
  Send,
  Settings,
  Image,
  Type,
  Layout,
  Palette,
  Code,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: "welcome" | "promotional" | "transactional" | "newsletter" | "abandoned_cart" | "product_launch";
  status: "active" | "draft" | "archived";
  lastModified: string;
  usageCount: number;
  openRate: string;
  clickRate: string;
  thumbnail: string;
  description: string;
  tags: string[];
}

interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  icon: any;
  color: string;
}

// Mock Data
const emailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Welcome Series - Day 1",
    subject: "Welcome to Healthy Sugar Company! 🌿",
    category: "welcome",
    status: "active",
    lastModified: "2024-01-15",
    usageCount: 245,
    openRate: "68.5%",
    clickRate: "24.3%",
    thumbnail: "/api/placeholder/300/200",
    description: "First email in the welcome series introducing new customers to our products",
    tags: ["New Customer", "Onboarding", "Introduction"]
  },
  {
    id: "2",
    name: "Summer Health Promotion",
    subject: "Beat the Heat with Natural Sweetness ☀️",
    category: "promotional",
    status: "active",
    lastModified: "2024-01-14",
    usageCount: 1890,
    openRate: "45.2%",
    clickRate: "18.7%",
    thumbnail: "/api/placeholder/300/200",
    description: "Seasonal promotional campaign for summer health products",
    tags: ["Summer", "Promotion", "Seasonal"]
  },
  {
    id: "3",
    name: "Order Confirmation",
    subject: "Your Healthy Sugar Order is Confirmed! 📦",
    category: "transactional",
    status: "active",
    lastModified: "2024-01-12",
    usageCount: 3456,
    openRate: "89.3%",
    clickRate: "12.5%",
    thumbnail: "/api/placeholder/300/200",
    description: "Automated order confirmation email with tracking details",
    tags: ["Order", "Confirmation", "Transactional"]
  },
  {
    id: "4",
    name: "Monthly Health Newsletter",
    subject: "Your Monthly Dose of Health Tips 💚",
    category: "newsletter",
    status: "active",
    lastModified: "2024-01-10",
    usageCount: 567,
    openRate: "32.8%",
    clickRate: "15.2%",
    thumbnail: "/api/placeholder/300/200",
    description: "Monthly newsletter with health tips and product updates",
    tags: ["Newsletter", "Health Tips", "Monthly"]
  },
  {
    id: "5",
    name: "Abandoned Cart Reminder",
    subject: "Don't forget your healthy sweeteners! 🛒",
    category: "abandoned_cart",
    status: "active",
    lastModified: "2024-01-08",
    usageCount: 892,
    openRate: "52.1%",
    clickRate: "28.9%",
    thumbnail: "/api/placeholder/300/200",
    description: "Reminder email for customers who left items in their cart",
    tags: ["Cart Recovery", "Reminder", "Conversion"]
  },
  {
    id: "6",
    name: "New Product Launch - Stevia Drops",
    subject: "Introducing Our New Stevia Drops! 💧",
    category: "product_launch",
    status: "draft",
    lastModified: "2024-01-05",
    usageCount: 0,
    openRate: "0%",
    clickRate: "0%",
    thumbnail: "/api/placeholder/300/200",
    description: "Product launch announcement for new stevia drops",
    tags: ["Product Launch", "New Product", "Stevia"]
  }
];

const templateCategories: TemplateCategory[] = [
  {
    id: "welcome",
    name: "Welcome Series",
    description: "Onboard new customers with engaging welcome emails",
    count: emailTemplates.filter(t => t.category === "welcome").length,
    icon: Users,
    color: "bg-blue-500"
  },
  {
    id: "promotional",
    name: "Promotional",
    description: "Drive sales with compelling promotional campaigns",
    count: emailTemplates.filter(t => t.category === "promotional").length,
    icon: TrendingUp,
    color: "bg-green-500"
  },
  {
    id: "transactional",
    name: "Transactional",
    description: "Essential order and account related emails",
    count: emailTemplates.filter(t => t.category === "transactional").length,
    icon: Mail,
    color: "bg-purple-500"
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Keep customers engaged with regular updates",
    count: emailTemplates.filter(t => t.category === "newsletter").length,
    icon: Star,
    color: "bg-orange-500"
  },
  {
    id: "abandoned_cart",
    name: "Cart Recovery",
    description: "Recover lost sales with cart abandonment emails",
    count: emailTemplates.filter(t => t.category === "abandoned_cart").length,
    icon: Send,
    color: "bg-red-500"
  },
  {
    id: "product_launch",
    name: "Product Launch",
    description: "Announce new products and features",
    count: emailTemplates.filter(t => t.category === "product_launch").length,
    icon: Star,
    color: "bg-indigo-500"
  }
];

export default function EmailTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = templateCategories.find(c => c.id === category);
    return cat ? cat.color : "bg-gray-500";
  };

  const filteredTemplates = selectedCategory === "all" 
    ? emailTemplates 
    : emailTemplates.filter(template => template.category === selectedCategory);

  const renderTemplateGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template) => (
        <div key={template.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
          {/* Template Preview */}
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <Mail className="h-12 w-12 text-gray-400" />
            </div>
            <div className="absolute top-2 left-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                {template.status}
              </span>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Template Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getCategoryColor(template.category)}`}>
                {templateCategories.find(c => c.id === template.category)?.name || template.category}
              </span>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{template.lastModified}</span>
              </div>
            </div>

            {/* Performance Metrics */}
            {template.status === "active" && (
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{template.usageCount}</p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{template.openRate}</p>
                  <p className="text-xs text-gray-500">Open Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{template.clickRate}</p>
                  <p className="text-xs text-gray-500">Click Rate</p>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {tag}
                </span>
              ))}
              {template.tags.length > 2 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  +{template.tags.length - 2} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="text-xs text-brand hover:text-brand-dark font-medium">
                  Use Template
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Preview
                </button>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-500">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTemplateList = () => (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTemplates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.subject}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getCategoryColor(template.category)}`}>
                    {templateCategories.find(c => c.id === template.category)?.name || template.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {template.status === "active" ? (
                    <div className="space-y-1">
                      <div>{template.usageCount} sent</div>
                      <div className="text-xs text-gray-500">{template.openRate} open • {template.clickRate} click</div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not sent</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {template.lastModified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-brand hover:text-brand-dark">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Email Templates
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage professional email templates for your marketing campaigns
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </button>
        </div>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedCategory === "all"
              ? "border-brand bg-brand/5 text-brand"
              : "border-gray-200 hover:border-gray-300 text-gray-700"
          }`}
        >
          <div className="text-center">
            <div className={`p-2 rounded-lg mx-auto mb-2 w-fit ${selectedCategory === "all" ? "bg-brand text-white" : "bg-gray-100"}`}>
              <Layout className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">All Templates</p>
            <p className="text-xs text-gray-500">{emailTemplates.length} templates</p>
          </div>
        </button>

        {templateCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? "border-brand bg-brand/5 text-brand"
                : "border-gray-200 hover:border-gray-300 text-gray-700"
            }`}
          >
            <div className="text-center">
              <div className={`p-2 rounded-lg mx-auto mb-2 w-fit ${
                selectedCategory === category.id ? "bg-brand text-white" : category.color + " text-white"
              }`}>
                <category.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">{category.name}</p>
              <p className="text-xs text-gray-500">{category.count} templates</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand w-64"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid" ? "bg-white shadow-sm text-brand" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Layout className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list" ? "bg-white shadow-sm text-brand" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Type className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Display */}
      {viewMode === "grid" ? renderTemplateGrid() : renderTemplateList()}

      {/* Template Builder Preview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Template Builder</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Preview:</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  previewDevice === "desktop" ? "bg-white shadow-sm text-brand" : "text-gray-500"
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  previewDevice === "tablet" ? "bg-white shadow-sm text-brand" : "text-gray-500"
                }`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  previewDevice === "mobile" ? "bg-white shadow-sm text-brand" : "text-gray-500"
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder Tools */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Design Elements</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <Type className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm">Text Block</span>
                </button>
                <button className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <Image className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm">Image</span>
                </button>
                <button className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <Layout className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm">Button</span>
                </button>
                <button className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <Palette className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm">Divider</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Template Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    placeholder="Enter template name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject Line</label>
                  <input
                    type="text"
                    placeholder="Enter email subject..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-brand">
                    <option>Select category...</option>
                    <option>Welcome Series</option>
                    <option>Promotional</option>
                    <option>Newsletter</option>
                    <option>Transactional</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className={`mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
              previewDevice === "mobile" ? "max-w-xs" : previewDevice === "tablet" ? "max-w-md" : "max-w-full"
            }`}>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="h-12 w-12 bg-brand rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">HSC</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Welcome to Healthy Sugar Company!</h2>
                  <p className="text-gray-600 mt-2">Thank you for joining our community of health-conscious individuals.</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Discover our range of natural stevia products that help you maintain a healthy lifestyle without compromising on taste.
                  </p>
                </div>
                
                <div className="text-center">
                  <button className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Code className="mr-2 h-4 w-4" />
              View HTML
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Send className="mr-2 h-4 w-4" />
              Send Test
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark">
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
