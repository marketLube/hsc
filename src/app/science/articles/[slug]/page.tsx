"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, BookOpen, Heart, Microscope } from "lucide-react";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import { getScienceArticleBySlug, getAllScienceArticles, type ScienceArticle } from "@/lib/science-articles";
import { notFound } from "next/navigation";

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

interface ScienceArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ScienceArticlePage({ params }: ScienceArticlePageProps) {
  const [cartCount, setCartCount] = useState(0);
  const [article, setArticle] = useState<ScienceArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ScienceArticle[]>([]);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
      setCartCount(totalItems);
    }

    // Listen for cart updates
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const totalItems = Object.values(cartItems).reduce((sum: number, count: any) => sum + count, 0);
        setCartCount(totalItems);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load article data
  useEffect(() => {
    const foundArticle = getScienceArticleBySlug(params.slug);
    if (!foundArticle) {
      notFound();
      return;
    }
    
    setArticle(foundArticle);

    // Get related articles (same category, excluding current article)
    const allArticles = getAllScienceArticles();
    const related = allArticles
      .filter(a => a.id !== foundArticle.id && a.category === foundArticle.category)
      .slice(0, 3);
    
    // If not enough related articles in same category, fill with others
    if (related.length < 3) {
      const additional = allArticles
        .filter(a => a.id !== foundArticle.id && a.category !== foundArticle.category)
        .slice(0, 3 - related.length);
      related.push(...additional);
    }
    
    setRelatedArticles(related);
  }, [params.slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed mb-6">
            {currentParagraph.join(' ')}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        flushParagraph();
      } else if (trimmedLine.startsWith('# ')) {
        flushParagraph();
        elements.push(
          <h1 key={key++} className="text-3xl md:text-4xl font-bold text-ink mb-8 mt-12">
            {trimmedLine.substring(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        elements.push(
          <h2 key={key++} className="text-2xl md:text-3xl font-bold text-ink mb-6 mt-10">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        elements.push(
          <h3 key={key++} className="text-xl md:text-2xl font-bold text-ink mb-4 mt-8">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        flushParagraph();
        elements.push(
          <h4 key={key++} className="text-lg md:text-xl font-bold text-ink mb-4 mt-6">
            {trimmedLine.substring(5)}
          </h4>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**:')) {
        flushParagraph();
        elements.push(
          <h5 key={key++} className="text-lg font-bold text-brand mb-3 mt-6">
            {trimmedLine.substring(2, trimmedLine.length - 3)}
          </h5>
        );
      } else if (trimmedLine.startsWith('- ')) {
        flushParagraph();
        // Start collecting list items
        const listItems = [trimmedLine.substring(2)];
        elements.push(
          <ul key={key++} className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>{listItems[0]}</li>
          </ul>
        );
      } else if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*') && trimmedLine.length > 2) {
        flushParagraph();
        elements.push(
          <p key={key++} className="text-gray-600 italic text-sm border-l-4 border-brand pl-4 mb-6">
            {trimmedLine.substring(1, trimmedLine.length - 1)}
          </p>
        );
      } else {
        currentParagraph.push(trimmedLine);
      }
    });

    flushParagraph();
    return elements;
  };

  return (
    <div className="min-h-screen bg-brand-fg">
      {/* Floating Navigation */}
      <FloatingNav cartCount={cartCount} />

      {/* Article Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Link 
                href="/science"
                className="inline-flex items-center text-brand hover:text-brand-dark transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Science
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6">
              <span className="bg-brand text-white text-sm px-3 py-1 rounded-full">
                {article.category}
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-ink mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {article.excerpt}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
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
              <button
                onClick={handleShare}
                className="flex items-center hover:text-brand transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
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
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              {/* Hero Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                <div className={`w-full h-full bg-gradient-to-br ${
                  article.id % 6 === 1 ? 'from-blue-100 to-blue-200' :
                  article.id % 6 === 2 ? 'from-green-100 to-green-200' :
                  article.id % 6 === 3 ? 'from-purple-100 to-purple-200' :
                  article.id % 6 === 4 ? 'from-orange-100 to-orange-200' :
                  article.id % 6 === 5 ? 'from-pink-100 to-pink-200' :
                  'from-indigo-100 to-indigo-200'
                } flex items-center justify-center`}>
                  <span className="text-6xl">
                    {article.id % 6 === 1 ? '🔬' :
                     article.id % 6 === 2 ? '🧪' :
                     article.id % 6 === 3 ? '🧬' :
                     article.id % 6 === 4 ? '⚗️' :
                     article.id % 6 === 5 ? '🔍' :
                     '📊'}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="text-lg leading-relaxed">
                {renderContent(article.content)}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  Related Research
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Continue exploring the fascinating world of stevia science with these related studies
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Link href={`/science/articles/${relatedArticle.slug}`}>
                      <Card hover className="h-full overflow-hidden group cursor-pointer hover-lift">
                        <div className="relative h-48 overflow-hidden">
                          <div className={`w-full h-full bg-gradient-to-br ${
                            relatedArticle.id % 6 === 1 ? 'from-blue-100 to-blue-200' :
                            relatedArticle.id % 6 === 2 ? 'from-green-100 to-green-200' :
                            relatedArticle.id % 6 === 3 ? 'from-purple-100 to-purple-200' :
                            relatedArticle.id % 6 === 4 ? 'from-orange-100 to-orange-200' :
                            relatedArticle.id % 6 === 5 ? 'from-pink-100 to-pink-200' :
                            'from-indigo-100 to-indigo-200'
                          } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                            <span className="text-4xl">
                              {relatedArticle.id % 6 === 1 ? '🔬' :
                               relatedArticle.id % 6 === 2 ? '🧪' :
                               relatedArticle.id % 6 === 3 ? '🧬' :
                               relatedArticle.id % 6 === 4 ? '⚗️' :
                               relatedArticle.id % 6 === 5 ? '🔍' :
                               '📊'}
                            </span>
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                              {relatedArticle.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {relatedArticle.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {relatedArticle.author.split(',')[0]}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {relatedArticle.readTime}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-brand text-sm font-medium">
                            <Microscope className="w-4 h-4 mr-2" />
                            Read Research
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="text-center mt-12">
                <Link href="/science">
                  <Button size="lg">
                    View All Research
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand to-brand-dark text-white">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience Science-Backed Sweetness
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Try our premium stevia products that embody decades of scientific research and innovation. 
              Taste the difference that science makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
                Get Free Sample
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
