"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen, Star, ChevronRight, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { type BlogArticle } from "@/lib/blogs";
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

interface BlogArticleClientProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export default function BlogArticleClient({ article, relatedArticles }: BlogArticleClientProps) {
  const [cartCount, setCartCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.excerpt;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  // Parse content for better rendering (basic markdown-like parsing)
  const renderContent = (content: string) => {
    // Split content into sections
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      // Handle headers
      if (section.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-ink mb-6 mt-8">
            {section.replace('# ', '')}
          </h1>
        );
      }
      if (section.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-ink mb-4 mt-8">
            {section.replace('## ', '')}
          </h2>
        );
      }
      if (section.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-ink mb-4 mt-6">
            {section.replace('### ', '')}
          </h3>
        );
      }
      if (section.startsWith('#### ')) {
        return (
          <h4 key={index} className="text-lg md:text-xl font-semibold text-ink mb-3 mt-4">
            {section.replace('#### ', '')}
          </h4>
        );
      }

      // Handle lists
      if (section.includes('- **') || section.includes('- ')) {
        const items = section.split('\n').filter(item => item.startsWith('- '));
        return (
          <ul key={index} className="space-y-2 mb-6 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <ChevronRight className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">
                  {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                </span>
              </li>
            ))}
          </ul>
        );
      }

      // Handle regular paragraphs
      if (section.trim()) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
          </p>
        );
      }

      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Notice Bar */}
      <NoticeBar />
      
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Article Header */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blogs" className="hover:text-brand transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900">{article.title}</span>
              </div>
            </motion.div>

            {/* Article Meta */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-brand text-white px-3 py-1 rounded-full text-xs">
                  {article.category}
                </span>
                {article.featured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {article.author}
                </div>
              </div>
            </motion.div>

            {/* Article Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Article Excerpt */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {article.excerpt}
            </motion.p>

            {/* Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Share Buttons */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Share this article:</span>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                
                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              <div className="text-gray-700 leading-relaxed">
                {renderContent(article.content)}
              </div>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">About the Author</h4>
                  <p className="text-gray-600">{article.author}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Share this article:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
                  Related Articles
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Continue exploring our insights on natural sweeteners and healthy living
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Link href={`/blogs/${relatedArticle.slug}`}>
                      <Card hover className="h-full overflow-hidden group cursor-pointer hover-lift">
                        <div className="relative h-48 overflow-hidden">
                          <div className={`w-full h-full bg-gradient-to-br ${
                            index % 3 === 0 ? 'from-green-100 to-green-200' :
                            index % 3 === 1 ? 'from-blue-100 to-blue-200' :
                            'from-purple-100 to-purple-200'
                          } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                            <span className="text-4xl">
                              {index % 3 === 0 ? '🌿' :
                               index % 3 === 1 ? '💚' :
                               '📊'}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                              {relatedArticle.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {relatedArticle.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {relatedArticle.author.split(',')[0]}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {relatedArticle.readTime}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="text-center mt-12">
                <Link href="/blogs">
                  <Button size="default" className="px-6">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Articles
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      )}

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
              Get More Health Insights
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe to our newsletter for the latest articles on natural sweeteners, 
              healthy recipes, and wellness tips.
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
              Join thousands of health-conscious readers. Unsubscribe anytime.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
