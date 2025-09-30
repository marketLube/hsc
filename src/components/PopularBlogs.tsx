"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User, Star, TrendingUp } from "lucide-react";
import { Container } from "./Container";
import { Card } from "./Card";
import { Button } from "./Button";
import { getFeaturedBlogArticles, getAllBlogArticles } from "@/lib/blogs";

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

export function PopularBlogs() {
  // Get featured articles first, then fill with popular ones
  const featuredArticles = getFeaturedBlogArticles();
  const allArticles = getAllBlogArticles();
  
  // Get 4 articles total - 2 rows of 2 articles each
  // Ensure stable ordering by using consistent filtering and slicing
  const nonFeaturedArticles = allArticles.filter(article => !article.featured);
  const popularBlogs = [
    ...featuredArticles.slice(0, 2),
    ...nonFeaturedArticles.slice(0, 2)
  ].slice(0, 4);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center px-3 py-1 bg-brand/10 rounded-full mb-2">
              <TrendingUp className="w-3 h-3 text-brand mr-1" />
              <span className="text-brand font-medium text-xs">Popular Articles</span>
            </div>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-ink mb-2">
              Health & Wellness
              <span className="text-brand block">Insights</span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
              Expert insights on natural sweeteners and healthy living
            </p>
          </motion.div>

          {/* Articles Grid - 2x2 Layout */}
          {popularBlogs.length > 0 && (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              {popularBlogs.map((article, index) => (
                <motion.div key={`${article.id}-${article.slug}`} variants={scaleIn}>
                  <Link href={`/blogs/${article.slug}`}>
                    <Card hover className="h-full overflow-hidden group cursor-pointer">
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br ${
                          index % 4 === 0 ? 'from-blue-100 to-blue-200' :
                          index % 4 === 1 ? 'from-green-100 to-green-200' :
                          index % 4 === 2 ? 'from-purple-100 to-purple-200' :
                          'from-orange-100 to-orange-200'
                        } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                          <span className="text-3xl">
                            {index % 4 === 0 ? '🌿' :
                             index % 4 === 1 ? '🍯' :
                             index % 4 === 2 ? '🧪' :
                             '💚'}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-sm">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-brand text-white text-xs px-2 py-1 rounded-full shadow-sm whitespace-nowrap max-w-[120px] truncate">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-base font-bold text-ink mb-2 group-hover:text-brand transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Meta Info */}
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
              ))}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div variants={fadeInUp} className="text-center">
            <Link href="/blogs">
              <Button size="sm" className="group">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <p className="text-gray-500 text-xs mt-2">
              {getAllBlogArticles().length}+ expert articles available
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
