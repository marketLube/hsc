import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, BookOpen, Heart } from "lucide-react";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import { getArticleBySlug, getAllArticles, type Article } from "@/lib/articles";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const ArticleClient = dynamic(() => import("./ArticleClient"), { ssr: false });


interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: "Article Not Found | The Healthy Sugar Company",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | The Healthy Sugar Company`,
    description: article.metaDescription || article.excerpt,
    keywords: [
      ...article.tags,
      "stevia",
      "healthy sweetener",
      "sugar alternative",
      "diabetes-friendly",
      "natural sweetener",
      "plant-based sweetener"
    ],
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: "The Healthy Sugar Company",
    metadataBase: new URL("https://healthysugar.com"),
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `/articles/${article.slug}`,
      title: article.title,
      description: article.metaDescription || article.excerpt,
      siteName: "The Healthy Sugar Company",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.image || "/images/og/article-default.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription || article.excerpt,
      images: [article.image || "/images/og/article-default.jpg"],
      creator: "@healthysugarco",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleClient article={article} />
      
      {/* JSON-LD Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.metaDescription || article.excerpt,
            "image": article.image || "/images/og/article-default.jpg",
            "author": {
              "@type": "Person",
              "name": article.author,
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Healthy Sugar Company",
              "logo": {
                "@type": "ImageObject",
                "url": "https://healthysugar.com/brand/logo.svg"
              }
            },
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://healthysugar.com/articles/${article.slug}`
            },
            "keywords": article.tags.join(", "),
            "articleSection": article.category,
            "wordCount": article.content.split(' ').length,
            "timeRequired": article.readTime,
            "about": [
              {
                "@type": "Thing",
                "name": "Stevia",
                "description": "Natural plant-based sweetener"
              },
              {
                "@type": "Thing", 
                "name": "Healthy Living",
                "description": "Lifestyle focused on health and wellness"
              }
            ]
          })
        }}
      />
    </>
  );
