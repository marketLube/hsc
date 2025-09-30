import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, getRelatedBlogArticles } from "@/lib/blogs";
import BlogArticleClient from "./BlogArticleClient";

interface BlogArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | The Healthy Sugar Company",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | The Healthy Sugar Company Blog`,
    description: article.metaDescription,
    keywords: article.tags,
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: "The Healthy Sugar Company",
    metadataBase: new URL("https://healthysugar.com"),
    alternates: {
      canonical: `/blogs/${article.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `/blogs/${article.slug}`,
      title: article.title,
      description: article.metaDescription,
      siteName: "The Healthy Sugar Company",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.image],
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

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = getBlogArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedBlogArticles(params.slug, 3);

  return (
    <>
      <BlogArticleClient article={article} relatedArticles={relatedArticles} />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.metaDescription,
            "image": `https://healthysugar.com${article.image}`,
            "author": {
              "@type": "Person",
              "name": article.author
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
              "@id": `https://healthysugar.com/blogs/${article.slug}`
            },
            "articleSection": article.category,
            "keywords": article.tags.join(", "),
            "wordCount": article.content.split(" ").length,
            "timeRequired": article.readTime,
            "about": article.tags.map(tag => ({
              "@type": "Thing",
              "name": tag
            })),
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://healthysugar.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://healthysugar.com/blogs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": article.title,
                  "item": `https://healthysugar.com/blogs/${article.slug}`
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
