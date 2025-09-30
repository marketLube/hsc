"use client";

import { useState, useEffect } from "react";
import {
  Code,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Globe,
  ShoppingBag,
  FileText,
  User,
  MapPin,
  Star,
  Calendar,
  Clock,
  Tag,
  Link,
  Image,
  Video,
  BookOpen,
  Award,
  Building,
  Phone,
  Mail,
  ExternalLink,
  Save,
  X,
  Check
} from "lucide-react";

interface SchemaItem {
  id: string;
  type: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastModified: string;
  validation: 'valid' | 'warning' | 'error';
  validationMessage?: string;
  schema: any;
}

interface SchemaTemplate {
  type: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  template: any;
}

export default function SchemaManagementPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSchema, setSelectedSchema] = useState<SchemaItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchema, setEditingSchema] = useState('');

  // Mock schema data
  const schemaItems: SchemaItem[] = [
    {
      id: '1',
      type: 'Organization',
      name: 'The Healthy Sugar Company',
      url: '/',
      status: 'active',
      lastModified: '2024-01-15',
      validation: 'valid',
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "The Healthy Sugar Company",
        "url": "https://healthysugar.com",
        "logo": "https://healthysugar.com/brand/logo.svg"
      }
    },
    {
      id: '2',
      type: 'Product',
      name: 'Stevia Sweetener Products',
      url: '/products',
      status: 'active',
      lastModified: '2024-01-14',
      validation: 'valid',
      schema: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Premium Stevia Sweetener",
        "description": "Natural zero-calorie sweetener"
      }
    },
    {
      id: '3',
      type: 'Article',
      name: 'Benefits Articles',
      url: '/benefits',
      status: 'active',
      lastModified: '2024-01-13',
      validation: 'warning',
      validationMessage: 'Missing dateModified property',
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Health Benefits of Stevia"
      }
    },
    {
      id: '4',
      type: 'LocalBusiness',
      name: 'Business Information',
      url: '/contact',
      status: 'inactive',
      lastModified: '2024-01-10',
      validation: 'error',
      validationMessage: 'Invalid address format',
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "The Healthy Sugar Company"
      }
    },
    {
      id: '5',
      type: 'FAQPage',
      name: 'FAQ Schema',
      url: '/faq',
      status: 'active',
      lastModified: '2024-01-12',
      validation: 'valid',
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
      }
    }
  ];

  const schemaTemplates: SchemaTemplate[] = [
    {
      type: 'Organization',
      name: 'Organization',
      description: 'Basic organization information and branding',
      icon: Building,
      color: 'bg-blue-500',
      template: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "",
        "url": "",
        "logo": "",
        "description": "",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "",
          "contactType": "customer service"
        }
      }
    },
    {
      type: 'Product',
      name: 'Product',
      description: 'E-commerce product with pricing and reviews',
      icon: ShoppingBag,
      color: 'bg-green-500',
      template: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "",
        "description": "",
        "image": "",
        "brand": {
          "@type": "Brand",
          "name": ""
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      type: 'Article',
      name: 'Article',
      description: 'Blog posts and informational content',
      icon: FileText,
      color: 'bg-purple-500',
      template: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "",
        "description": "",
        "image": "",
        "author": {
          "@type": "Person",
          "name": ""
        },
        "publisher": {
          "@type": "Organization",
          "name": "",
          "logo": {
            "@type": "ImageObject",
            "url": ""
          }
        },
        "datePublished": "",
        "dateModified": ""
      }
    },
    {
      type: 'LocalBusiness',
      name: 'Local Business',
      description: 'Local business with location and hours',
      icon: MapPin,
      color: 'bg-orange-500',
      template: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "",
        "image": "",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "",
          "addressLocality": "",
          "addressRegion": "",
          "postalCode": "",
          "addressCountry": ""
        },
        "openingHours": ""
      }
    },
    {
      type: 'FAQPage',
      name: 'FAQ Page',
      description: 'Frequently asked questions for rich snippets',
      icon: BookOpen,
      color: 'bg-indigo-500',
      template: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": ""
            }
          }
        ]
      }
    },
    {
      type: 'Review',
      name: 'Review',
      description: 'Customer reviews and ratings',
      icon: Star,
      color: 'bg-yellow-500',
      template: {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": ""
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": ""
        },
        "reviewBody": ""
      }
    }
  ];

  const filteredSchemas = schemaItems.filter(schema => {
    const matchesSearch = schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schema.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schema.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || schema.type === filterType;
    const matchesStatus = filterStatus === 'all' || schema.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getValidationColor = (validation: string) => {
    switch (validation) {
      case 'valid': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getValidationIcon = (validation: string) => {
    switch (validation) {
      case 'valid': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const handleCreateSchema = (template: SchemaTemplate) => {
    const newSchema: SchemaItem = {
      id: Date.now().toString(),
      type: template.type,
      name: `New ${template.name}`,
      url: '/',
      status: 'inactive',
      lastModified: new Date().toISOString().split('T')[0],
      validation: 'valid',
      schema: template.template
    };
    setSelectedSchema(newSchema);
    setEditingSchema(JSON.stringify(template.template, null, 2));
    setIsEditing(true);
    setActiveTab('editor');
  };

  const handleEditSchema = (schema: SchemaItem) => {
    setSelectedSchema(schema);
    setEditingSchema(JSON.stringify(schema.schema, null, 2));
    setIsEditing(true);
    setActiveTab('editor');
  };

  const handleSaveSchema = () => {
    try {
      const parsedSchema = JSON.parse(editingSchema);
      // Here you would save the schema to your backend
      console.log('Saving schema:', parsedSchema);
      setIsEditing(false);
      setSelectedSchema(null);
      setActiveTab('overview');
    } catch (error) {
      alert('Invalid JSON format. Please check your schema.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedSchema(null);
    setEditingSchema('');
    setActiveTab('overview');
  };

  const copySchemaToClipboard = (schema: any) => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    // You could add a toast notification here
  };

  const validateSchema = (schemaText: string) => {
    try {
      JSON.parse(schemaText);
      return { isValid: true, error: null };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Schema Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{schemaItems.length}</p>
            <p className="text-sm text-gray-600">Total Schemas</p>
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
              {schemaItems.filter(s => s.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active Schemas</p>
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
              {schemaItems.filter(s => s.validation === 'warning' || s.validation === 'error').length}
            </p>
            <p className="text-sm text-gray-600">Issues Found</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-100">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {new Set(schemaItems.map(s => s.url)).size}
            </p>
            <p className="text-sm text-gray-600">Pages Covered</p>
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
                placeholder="Search schemas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Organization">Organization</option>
              <option value="Product">Product</option>
              <option value="Article">Article</option>
              <option value="LocalBusiness">Local Business</option>
              <option value="FAQPage">FAQ Page</option>
              <option value="Review">Review</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Schema</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schema List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schema
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchemas.map((schema) => {
                const ValidationIcon = getValidationIcon(schema.validation);
                return (
                  <tr key={schema.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{schema.name}</div>
                        {schema.validationMessage && (
                          <div className="text-xs text-gray-500">{schema.validationMessage}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                        {schema.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {schema.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(schema.status)}`}>
                        {schema.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <ValidationIcon className={`h-4 w-4 ${getValidationColor(schema.validation)}`} />
                        <span className={`text-sm ${getValidationColor(schema.validation)}`}>
                          {schema.validation}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schema.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => copySchemaToClipboard(schema.schema)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy Schema"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditSchema(schema)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit Schema"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700" title="Delete Schema">
                          <Trash2 className="h-4 w-4" />
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

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Schema Templates</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from pre-built schema templates to quickly add structured data to your pages.
          Each template follows Schema.org standards and best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemaTemplates.map((template, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${template.color} bg-opacity-10`}>
                <template.icon className={`h-6 w-6 ${template.color.replace('bg-', 'text-')}`} />
              </div>
              <button
                onClick={() => handleCreateSchema(template)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
              >
                Use Template
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-700 font-mono">
                  {JSON.stringify(template.template, null, 2).substring(0, 100)}...
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="space-y-6">
      {selectedSchema && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit' : 'View'} Schema: {selectedSchema.name}
              </h2>
              <p className="text-gray-600">
                Type: {selectedSchema.type} • URL: {selectedSchema.url}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveSchema}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Schema JSON</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copySchemaToClipboard(selectedSchema.schema)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editingSchema}
                    onChange={(e) => setEditingSchema(e.target.value)}
                    className="w-full h-96 p-4 border border-gray-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your schema JSON here..."
                  />
                  {editingSchema && (
                    <div className="flex items-center space-x-2">
                      {validateSchema(editingSchema).isValid ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Valid JSON</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">Invalid JSON: {validateSchema(editingSchema).error}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto text-sm font-mono text-gray-800">
                  {JSON.stringify(selectedSchema.schema, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Schema Overview', icon: Eye },
    { id: 'templates', name: 'Templates', icon: Plus },
    { id: 'editor', name: 'Schema Editor', icon: Code }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Code className="h-8 w-8 mr-3" />
              Schema Management
            </h1>
            <p className="text-purple-100 text-lg">
              Manage structured data markup for better search engine understanding
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-xl px-4 py-2 text-white transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Validate All</span>
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
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
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
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'editor' && renderEditor()}
        </div>
      </div>
    </div>
  );
}
