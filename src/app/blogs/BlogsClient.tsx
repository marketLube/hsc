"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Calendar, User, Clock, Tag, Grid, List, TrendingUp, Star, ChevronDown, X } from "lucide-react";
import { getAllBlogArticles, getBlogCategories, getBlogTags, getFeaturedBlogArticles, type BlogArticle } from "@/lib/blogs";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { NoticeBar } from "@/components/NoticeBar";
import { Footer } from "@/components/Footer";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "popular" | "featured";

export default function BlogsClient() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Get data
  const allArticles = getAllBlogArticles();
  const categories = ["All", ...getBlogCategories()];
  const allTags = getBlogTags();
  const featuredArticles = getFeaturedBlogArticles();

  // Load cart count from localStorage on mount
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error("Error parsing cart:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates from custom events
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.totalItems);
    };

    // Listen for storage changes (from other tabs)
    const handleStorageChange = () => {
      updateCartCount();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.author.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.every(tag => article.tags.includes(tag))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        break;
      case "popular":
        // For now, sort by featured then newest
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        break;
    }

    return filtered;
  }, [allArticles, searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTags([]);
  };

  const renderArticleCard = (article: BlogArticle, index: number) => {
    if (viewMode === "list") {
      return (
        <motion.div
          key={article.id}
          variants={fadeInUp}
          custom={index}
        >
          <Link href={`/blogs/${article.slug}`}>
            <Card hover className="overflow-hidden group cursor-pointer hover-lift">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${
                    index % 6 === 0 ? 'from-blue-100 to-blue-200' :
                    index % 6 === 1 ? 'from-green-100 to-green-200' :
                    index % 6 === 2 ? 'from-purple-100 to-purple-200' :
                    index % 6 === 3 ? 'from-orange-100 to-orange-200' :
                    index % 6 === 4 ? 'from-pink-100 to-pink-200' :
                    'from-indigo-100 to-indigo-200'
                  } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                    <span className="text-4xl">
                      {index % 6 === 0 ? '🌿' :
                       index % 6 === 1 ? '🍯' :
                       index % 6 === 2 ? '🧪' :
                       index % 6 === 3 ? '💚' :
                       index % 6 === 4 ? '🌱' :
                       '📊'}
                    </span>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">+{article.tags.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {article.author.split(',')[0]}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      );
    }

    // Grid view
    return (
      <motion.div
        key={article.id}
        variants={fadeInUp}
        custom={index}
      >
        <Link href={`/blogs/${article.slug}`}>
          <Card hover className="h-full overflow-hidden group cursor-pointer hover-lift">
            <div className="relative h-48 overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${
                index % 6 === 0 ? 'from-blue-100 to-blue-200' :
                index % 6 === 1 ? 'from-green-100 to-green-200' :
                index % 6 === 2 ? 'from-purple-100 to-purple-200' :
                index % 6 === 3 ? 'from-orange-100 to-orange-200' :
                index % 6 === 4 ? 'from-pink-100 to-pink-200' :
                'from-indigo-100 to-indigo-200'
              } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                <span className="text-4xl">
                  {index % 6 === 0 ? '🌿' :
                   index % 6 === 1 ? '🍯' :
                   index % 6 === 2 ? '🧪' :
                   index % 6 === 3 ? '💚' :
                   index % 6 === 4 ? '🌱' :
                   '📊'}
                </span>
              </div>
              {article.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="text-gray-400 text-xs">+{article.tags.length - 2}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {article.author.split(',')[0]}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Notice Bar */}
      <NoticeBar />
      
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Link 
                href="/"
                className="inline-flex items-center text-brand hover:text-brand-dark transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight"
            >
              Health & Wellness
              <span className="text-brand block mt-1 text-2xl md:text-3xl lg:text-4xl">Blog</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              Comprehensive expert-authored content on stevia benefits, natural sweeteners, and healthy living. 
              From diabetes management to weight loss, pregnancy safety to fitness nutrition - your complete wellness resource.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-brand" />
                {allArticles.length} Expert Articles
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-brand" />
                {categories.length - 1} Categories
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-brand" />
                {featuredArticles.length} Featured
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-brand text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-brand text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Advanced Filters Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {(selectedTags.length > 0 || selectedCategory !== "All" || searchQuery) && (
                  <span className="ml-2 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedTags.length + (selectedCategory !== "All" ? 1 : 0) + (searchQuery ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filter by Tags</h3>
                {(selectedTags.length > 0 || selectedCategory !== "All" || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-brand text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Results Summary */}
      <section className="py-4 bg-gray-50">
        <Container>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {filteredAndSortedArticles.length} of {allArticles.length} articles
              {searchQuery && (
                <span> for "{searchQuery}"</span>
              )}
              {selectedCategory !== "All" && (
                <span> in {selectedCategory}</span>
              )}
            </div>
            
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <span>Tags:</span>
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-brand text-white text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 hover:bg-brand-dark rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Articles Grid/List */}
      <section className="py-16 bg-white">
        <Container>
          {filteredAndSortedArticles.length === 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredAndSortedArticles.map((article, index) => renderArticleCard(article, index))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get the latest insights on natural sweeteners, healthy recipes, and wellness tips 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button size="default" variant="secondary" className="px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-white/80 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
