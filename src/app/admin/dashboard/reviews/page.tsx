"use client";

import { useState, useMemo } from "react";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare,
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Trash2,
  Edit,
  MoreVertical,
  Calendar,
  User,
  Package,
  Shield,
  AlertTriangle,
  BarChart3,
  FileText,
  Camera,
  Link,
  MapPin,
  Clock,
  Verified,
  SortAsc,
  SortDesc,
  ChevronDown,
  X
} from "lucide-react";
import { MOCK_REVIEWS, REVIEW_STATS } from "@/lib/reviews";
import { PRODUCTS } from "@/lib/products";
import { Review, ReviewFilters, ReviewSortBy, ReviewSortOrder } from "@/types/review";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState<{ review: Review; imageIndex: number } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<ReviewSortBy>('date');
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('desc');
  
  const [filters, setFilters] = useState<ReviewFilters>({
    search: '',
    productId: 'all',
    status: 'all',
    rating: 'all',
    verified: 'all',
    hasImages: 'all',
    hasExportLinks: 'all',
    source: 'all'
  });

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = filters.search === '' || 
        review.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.comment.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.product.name.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesProduct = filters.productId === 'all' || review.product.id === filters.productId;
      const matchesStatus = filters.status === 'all' || review.status === filters.status;
      const matchesRating = filters.rating === 'all' || review.rating === filters.rating;
      const matchesVerified = filters.verified === 'all' || review.verified === filters.verified;
      const matchesImages = filters.hasImages === 'all' || 
        (filters.hasImages === true && review.images && review.images.length > 0) ||
        (filters.hasImages === false && (!review.images || review.images.length === 0));
      const matchesExportLinks = filters.hasExportLinks === 'all' || 
        (filters.hasExportLinks === true && review.exportLinks && review.exportLinks.length > 0) ||
        (filters.hasExportLinks === false && (!review.exportLinks || review.exportLinks.length === 0));
      const matchesSource = filters.source === 'all' || review.source === filters.source;

      return matchesSearch && matchesProduct && matchesStatus && matchesRating && 
             matchesVerified && matchesImages && matchesExportLinks && matchesSource;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'helpful':
          comparison = a.helpful - b.helpful;
          break;
        case 'customer':
          comparison = a.customer.name.localeCompare(b.customer.name);
          break;
        case 'product':
          comparison = a.product.name.localeCompare(b.product.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [reviews, filters, sortBy, sortOrder]);

  // Handle review actions
  const handleApproveReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' as const } : review
    ));
  };

  const handleRejectReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: 'rejected' as const } : review
    ));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    setSelectedReviews(prev => prev.filter(id => id !== reviewId));
  };

  const handleBulkAction = (action: 'approve' | 'reject' | 'delete') => {
    if (action === 'delete') {
      setReviews(prev => prev.filter(review => !selectedReviews.includes(review.id)));
    } else {
      setReviews(prev => prev.map(review => 
        selectedReviews.includes(review.id) 
          ? { ...review, status: action === 'approve' ? 'approved' as const : 'rejected' as const }
          : review
      ));
    }
    setSelectedReviews([]);
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredAndSortedReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredAndSortedReviews.map(review => review.id));
    }
  };

  const exportReviews = (format: 'csv' | 'pdf') => {
    // Implementation for export functionality
    console.log(`Exporting ${filteredAndSortedReviews.length} reviews as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reviews & Ratings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer reviews and feedback across all products
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            onClick={() => exportReviews('csv')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportReviews('pdf')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Review
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Rating
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.averageRating}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Reviews
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.total}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Approved
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.approved}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.pending}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Verified
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.verifiedPurchases}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Camera className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    With Images
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {REVIEW_STATS.withImages}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="flex items-center w-20">
                  <span className="text-sm font-medium text-gray-900 mr-2">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ 
                        width: `${(REVIEW_STATS.ratingDistribution[rating as keyof typeof REVIEW_STATS.ratingDistribution] / REVIEW_STATS.total) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {REVIEW_STATS.ratingDistribution[rating as keyof typeof REVIEW_STATS.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand focus:border-brand"
                  placeholder="Search reviews, customers, products..."
                />
              </div>
            </div>

            {/* Product Filter */}
            <div>
              <select 
                value={filters.productId}
                onChange={(e) => setFilters(prev => ({ ...prev, productId: e.target.value }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Products</option>
                {PRODUCTS.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <select 
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value === 'all' ? 'all' : Number(e.target.value) }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>

            {/* Verified Filter */}
            <div>
              <select 
                value={filters.verified}
                onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.value === 'all' ? 'all' : e.target.value === 'true' }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Reviews</option>
                <option value="true">Verified Only</option>
                <option value="false">Unverified Only</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters Row */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Images Filter */}
            <div>
              <select 
                value={filters.hasImages}
                onChange={(e) => setFilters(prev => ({ ...prev, hasImages: e.target.value === 'all' ? 'all' : e.target.value === 'true' }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Reviews</option>
                <option value="true">With Images</option>
                <option value="false">Without Images</option>
              </select>
            </div>

            {/* Export Links Filter */}
            <div>
              <select 
                value={filters.hasExportLinks}
                onChange={(e) => setFilters(prev => ({ ...prev, hasExportLinks: e.target.value === 'all' ? 'all' : e.target.value === 'true' }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Reviews</option>
                <option value="true">With Export Links</option>
                <option value="false">Without Export Links</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <select 
                value={filters.source}
                onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value as any }))}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="social">Social Media</option>
                <option value="import">Import</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex space-x-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as ReviewSortBy)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand rounded-md"
              >
                <option value="date">Sort by Date</option>
                <option value="rating">Sort by Rating</option>
                <option value="helpful">Sort by Helpful</option>
                <option value="customer">Sort by Customer</option>
                <option value="product">Sort by Product</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedReviews.length} review{selectedReviews.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleBulkAction('approve')}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject All
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete All
              </button>
              <button
                onClick={() => setSelectedReviews([])}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedReviews.length === filteredAndSortedReviews.length && filteredAndSortedReviews.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
              />
              <span className="ml-3 text-sm font-medium text-gray-900">
                Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-brand text-white' : 'text-gray-400 hover:text-gray-500'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-brand text-white' : 'text-gray-400 hover:text-gray-500'}`}
              >
                <Package className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {filteredAndSortedReviews.map((review) => (
            <li key={review.id}>
              <div className="px-4 py-6">
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReviews(prev => [...prev, review.id]);
                      } else {
                        setSelectedReviews(prev => prev.filter(id => id !== review.id));
                      }
                    }}
                    className="mt-1 h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.customer.avatar ? (
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={review.customer.avatar} 
                        alt={review.customer.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Customer Info & Rating */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">{review.customer.name}</p>
                            {review.verified && (
                              <Verified className="h-4 w-4 text-green-500" />
                            )}
                            {review.customer.verified && (
                              <Shield className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{review.product.name}</span>
                          {review.product.variant && (
                            <span className="text-sm text-gray-500">• {review.product.variant}</span>
                          )}
                        </div>

                        {/* Review Title & Content */}
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{review.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>

                        {/* Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <button
                                key={image.id}
                                onClick={() => setShowImageModal({ review, imageIndex: index })}
                                className="relative group"
                              >
                                <img 
                                  src={image.url} 
                                  alt={image.alt}
                                  className="h-16 w-16 object-cover rounded-lg border border-gray-200 hover:border-brand transition-colors"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity flex items-center justify-center">
                                  <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Export Links */}
                        {review.exportLinks && review.exportLinks.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {review.exportLinks.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                {link.platform}
                                {link.verified && <Verified className="h-3 w-3 ml-1 text-green-600" />}
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Tags */}
                        {review.tags && review.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {review.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Meta Information */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              review.status === "approved" 
                                ? "bg-green-100 text-green-800"
                                : review.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : review.status === "flagged"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {review.status}
                            </span>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {review.helpful} helpful
                            </div>
                            {review.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {review.location}
                              </div>
                            )}
                            <span className="capitalize">{review.source}</span>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleApproveReview(review.id)}
                              className="text-green-400 hover:text-green-500 transition-colors"
                              title="Approve Review"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleRejectReview(review.id)}
                              className="text-yellow-400 hover:text-yellow-500 transition-colors"
                              title="Reject Review"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                            <button 
                              className="text-blue-400 hover:text-blue-500 transition-colors"
                              title="Edit Review"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-red-400 hover:text-red-500 transition-colors"
                              title="Delete Review"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Admin Notes */}
                        {review.adminNotes && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <div className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                              <div className="text-sm text-yellow-800">
                                <strong>Admin Note:</strong> {review.adminNotes}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filteredAndSortedReviews.length === 0 && (
          <div className="px-4 py-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <AddReviewModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(newReview) => {
            setReviews(prev => [newReview, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal 
          review={showImageModal.review}
          imageIndex={showImageModal.imageIndex}
          onClose={() => setShowImageModal(null)}
        />
      )}
    </div>
  );
}

// Add Review Modal Component
function AddReviewModal({ onClose, onAdd }: { 
  onClose: () => void; 
  onAdd: (review: Review) => void; 
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    productId: '',
    rating: 5,
    title: '',
    comment: '',
    images: [] as File[],
    exportLinks: [] as { platform: string; url: string }[],
    verified: false,
    tags: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview: Review = {
      id: Date.now().toString(),
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        verified: formData.verified
      },
      product: {
        id: formData.productId,
        name: PRODUCTS.find(p => p.id === formData.productId)?.name || '',
      },
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      images: formData.images.map((file, index) => ({
        id: `img_${Date.now()}_${index}`,
        url: URL.createObjectURL(file),
        alt: `Review image ${index + 1}`,
        size: file.size,
        type: file.type
      })),
      exportLinks: formData.exportLinks.map(link => ({
        platform: link.platform as any,
        url: link.url,
        verified: false
      })),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      helpful: 0,
      unhelpful: 0,
      verified: formData.verified,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      source: 'website',
      location: formData.location
    };

    onAdd(newReview);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Review</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Email</label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product</label>
              <select
                required
                value={formData.productId}
                onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              >
                <option value="">Select Product</option>
                {PRODUCTS.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              >
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Review Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Review Comment</label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFormData(prev => ({ ...prev, images: Array.from(e.target.files || []) }))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., excellent-taste, doctor-approved"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Mumbai, Maharashtra"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.verified}
              onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
              className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Verified Purchase
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Image Modal Component
function ImageModal({ review, imageIndex, onClose }: { 
  review: Review; 
  imageIndex: number; 
  onClose: () => void; 
}) {
  const [currentIndex, setCurrentIndex] = useState(imageIndex);
  const images = review.images || [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X className="h-8 w-8" />
        </button>
        
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-full object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronDown className="h-8 w-8 rotate-90" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronDown className="h-8 w-8 -rotate-90" />
            </button>
          </>
        )}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
          {currentIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  );
}
