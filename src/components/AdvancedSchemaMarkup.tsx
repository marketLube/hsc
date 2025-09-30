import { getAllArticles } from '@/lib/articles';
import { products } from '@/lib/products';

/**
 * Advanced Schema Markup Component
 * 
 * Implements comprehensive structured data for better search visibility
 * and rich snippet eligibility across all page types.
 */

interface SchemaMarkupProps {
  type: 'homepage' | 'product' | 'article' | 'faq' | 'about' | 'contact';
  data?: any;
}

export function AdvancedSchemaMarkup({ type, data }: SchemaMarkupProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysugarcompany.com'
  const getSchemaForType = () => {
    switch (type) {
      case 'homepage':
        return getHomepageSchema();
      case 'product':
        return getProductSchema(data);
      case 'article':
        return getArticleSchema(data);
      case 'faq':
        return getFAQSchema();
      case 'about':
        return getAboutSchema();
      case 'contact':
        return getContactSchema();
      default:
        return null;
    }
  };

  const schema = getSchemaForType();
  
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Homepage Schema - Organization + Website + Local Business
function getHomepageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehealthysugarcompany.com'
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "The Healthy Sugar Company",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/brand/logo.svg`,
          "width": 200,
          "height": 60
        },
        "description": "India's leading manufacturer of premium stevia-based sweeteners. Natural, zero-calorie sugar alternatives for healthy living.",
        "foundingDate": "2020",
        "founders": [
          {
            "@type": "Person",
            "name": "Healthy Sugar Company Founders"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          },
          {
            "@type": "ContactPoint",
            "email": "hello@healthysugar.com",
            "contactType": "customer service"
          }
        ],
        "sameAs": [
          "https://facebook.com/healthysugarcompany",
          "https://instagram.com/healthysugarcompany",
          "https://twitter.com/healthysugarco",
          "https://linkedin.com/company/healthysugarcompany"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Maharashtra",
          "addressLocality": "Mumbai"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "The Healthy Sugar Company",
        "description": "Premium stevia sweeteners - natural sugar alternatives",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        "name": "The Healthy Sugar Company",
        "image": `${baseUrl}/brand/logo.svg`,
        "telephone": "+91-98765-43210",
        "email": "hello@healthysugar.com",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Maharashtra",
          "addressLocality": "Mumbai"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 19.0760,
          "longitude": 72.8777
        },
        "url": baseUrl,
        "priceRange": "₹299-₹999",
        "openingHours": "Mo-Sa 09:00-18:00",
        "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
        "currenciesAccepted": "INR",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        }
      }
    ]
  };
}

// Product Schema with Reviews and Offers
function getProductSchema(product: any) {
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images || [product.image],
    "brand": {
      "@type": "Brand",
      "name": "The Healthy Sugar Company"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "The Healthy Sugar Company"
    },
    "sku": product.id,
    "gtin": product.gtin || `HSC${product.id}`,
    "category": "Health & Wellness > Sweeteners > Natural Sweeteners",
    "offers": {
      "@type": "Offer",
      "url": `https://healthysugar.com/product/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "The Healthy Sugar Company"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Priya Sharma"
        },
        "reviewBody": "Finally found a sugar alternative that actually tastes good! My family can't tell the difference."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Calories",
        "value": "0 per serving"
      },
      {
        "@type": "PropertyValue",
        "name": "Glycemic Index",
        "value": "0"
      },
      {
        "@type": "PropertyValue",
        "name": "Sweetness Level",
        "value": "200x sweeter than sugar"
      }
    ]
  };
}

// Article Schema with comprehensive metadata
function getArticleSchema(article: any) {
  if (!article) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription || article.excerpt,
    "image": article.image || "https://healthysugar.com/images/og/article-default.jpg",
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": `https://healthysugar.com/authors/${article.author.toLowerCase().replace(/\s+/g, '-')}`
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
        "description": "Natural plant-based sweetener extracted from Stevia rebaudiana"
      },
      {
        "@type": "Thing",
        "name": "Health & Nutrition",
        "description": "Information about healthy eating and nutrition"
      }
    ],
    "mentions": [
      {
        "@type": "Thing",
        "name": "Diabetes",
        "description": "Metabolic disorder affecting blood sugar levels"
      },
      {
        "@type": "Thing",
        "name": "Weight Management",
        "description": "Strategies for maintaining healthy body weight"
      }
    ]
  };
}

// FAQ Schema for better featured snippets
function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is stevia safe for daily consumption?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, stevia is safe for daily consumption. It has been approved by major health organizations including the FDA, WHO, and EFSA. Studies show no adverse effects from regular stevia consumption within recommended limits (4mg per kg of body weight per day)."
        }
      },
      {
        "@type": "Question",
        "name": "Can diabetics use stevia sweeteners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, stevia is excellent for diabetics. It has zero glycemic index, meaning it doesn't raise blood sugar levels. Many healthcare professionals recommend stevia for diabetes management as it provides sweetness without affecting glucose or insulin levels."
        }
      },
      {
        "@type": "Question",
        "name": "How much stevia equals one teaspoon of sugar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stevia is 200-300 times sweeter than sugar. Generally, 1/8 teaspoon of pure stevia extract equals 1 teaspoon of sugar. For stevia blends, use about 1/2 teaspoon to replace 1 teaspoon of sugar. Start with less and adjust to taste."
        }
      },
      {
        "@type": "Question",
        "name": "Does stevia have any side effects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stevia is generally well-tolerated with no significant side effects for most people. Some individuals may experience a slight aftertaste initially, but this typically diminishes with regular use. Stevia is much safer than artificial sweeteners."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use stevia for baking and cooking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, stevia is heat-stable and works well for baking and cooking up to 200°C (392°F). However, you'll need to adjust recipes since stevia is much sweeter than sugar and doesn't provide bulk. Use conversion guides and consider adding bulk with ingredients like applesauce or flour."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between stevia and artificial sweeteners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stevia is a natural plant-based sweetener extracted from stevia leaves, while artificial sweeteners are synthetic chemicals. Stevia has potential health benefits, no known side effects, and is environmentally sustainable. Artificial sweeteners may have long-term health concerns and environmental impact."
        }
      }
    ]
  };
}

// About Page Schema
function getAboutSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About The Healthy Sugar Company",
    "description": "Learn about our mission to provide natural, healthy sugar alternatives through premium stevia products",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://healthysugar.com/#organization"
    }
  };
}

// Contact Page Schema
function getContactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact The Healthy Sugar Company",
    "description": "Get in touch with us for questions about our stevia products, orders, or partnerships",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://healthysugar.com/#organization"
    }
  };
}

// HowTo Schema for usage guides
export function HowToSchema({ title, description, steps }: {
  title: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "image": "https://healthysugar.com/images/how-to-use-stevia.jpg",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Stevia Sweetener"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Measuring spoon"
      }
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image || "https://healthysugar.com/images/step-default.jpg"
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Recipe Schema for stevia recipes
export function RecipeSchema({ recipe }: { recipe: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "image": recipe.image,
    "author": {
      "@type": "Person",
      "name": recipe.author
    },
    "datePublished": recipe.datePublished,
    "prepTime": recipe.prepTime,
    "cookTime": recipe.cookTime,
    "totalTime": recipe.totalTime,
    "recipeCategory": recipe.category,
    "recipeCuisine": recipe.cuisine,
    "recipeYield": recipe.servings,
    "keywords": recipe.keywords,
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": recipe.nutrition.calories,
      "sugarContent": "0g",
      "sodiumContent": recipe.nutrition.sodium,
      "fatContent": recipe.nutrition.fat
    },
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": instruction
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.reviewCount
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
