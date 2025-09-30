import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

/**
 * Internal Linking Strategy Component
 * 
 * Implements strategic internal linking for better SEO and user experience.
 * Internal links help distribute page authority and improve crawlability.
 */

interface InternalLink {
  href: string;
  text: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

// Strategic internal linking structure
const internalLinks: Record<string, InternalLink[]> = {
  // From homepage
  homepage: [
    { href: '/benefits', text: 'Health Benefits of Stevia', description: 'Discover how stevia supports your health', priority: 'high', category: 'health' },
    { href: '/compare', text: 'Stevia vs Sugar Comparison', description: 'See why stevia is better than sugar', priority: 'high', category: 'comparison' },
    { href: '/faq', text: 'Frequently Asked Questions', description: 'Get answers to common stevia questions', priority: 'medium', category: 'support' },
    { href: '/articles/stevia-diabetes-management', text: 'Stevia for Diabetes', description: 'How stevia helps manage blood sugar', priority: 'high', category: 'health' },
    { href: '/locations', text: 'Available Across India', description: 'Find stevia products in your city', priority: 'medium', category: 'local' },
  ],
  
  // From benefits page
  benefits: [
    { href: '/compare', text: 'Compare Sweeteners', description: 'Detailed comparison with other sweeteners', priority: 'high', category: 'comparison' },
    { href: '/articles/hidden-dangers-refined-sugar', text: 'Dangers of Refined Sugar', description: 'Why you should avoid regular sugar', priority: 'high', category: 'health' },
    { href: '/articles/stevia-vs-artificial-sweeteners', text: 'Stevia vs Artificial Sweeteners', description: 'Natural vs synthetic sweeteners', priority: 'high', category: 'comparison' },
    { href: '/faq', text: 'Common Questions About Stevia', description: 'Safety, usage, and health questions', priority: 'medium', category: 'support' },
    { href: '/#products', text: 'Shop Stevia Products', description: 'Browse our stevia product range', priority: 'medium', category: 'products' },
  ],
  
  // From product pages
  products: [
    { href: '/benefits', text: 'Health Benefits', description: 'Why choose stevia for your health', priority: 'high', category: 'health' },
    { href: '/articles/baking-with-stevia-professional-tips', text: 'Baking with Stevia', description: 'Professional tips for stevia baking', priority: 'high', category: 'usage' },
    { href: '/faq', text: 'Usage Instructions', description: 'How to use stevia products', priority: 'high', category: 'support' },
    { href: '/compare', text: 'Why Choose Stevia', description: 'Compare with other sweeteners', priority: 'medium', category: 'comparison' },
  ],
  
  // From articles
  articles: [
    { href: '/benefits', text: 'All Health Benefits', description: 'Comprehensive benefits guide', priority: 'high', category: 'health' },
    { href: '/compare', text: 'Sweetener Comparison', description: 'Compare all sweetener types', priority: 'high', category: 'comparison' },
    { href: '/#products', text: 'Our Products', description: 'Shop premium stevia products', priority: 'medium', category: 'products' },
    { href: '/faq', text: 'More Questions', description: 'Additional information and FAQs', priority: 'medium', category: 'support' },
  ],
  
  // From FAQ page
  faq: [
    { href: '/benefits', text: 'Detailed Health Benefits', description: 'In-depth health information', priority: 'high', category: 'health' },
    { href: '/articles/stevia-diabetes-management', text: 'Stevia for Diabetes', description: 'Clinical evidence for diabetics', priority: 'high', category: 'health' },
    { href: '/compare', text: 'Comparison Guide', description: 'How stevia compares to alternatives', priority: 'medium', category: 'comparison' },
    { href: '/#products', text: 'Product Range', description: 'Explore our stevia products', priority: 'medium', category: 'products' },
  ]
};

// Related articles mapping for better content discovery
const relatedArticles: Record<string, string[]> = {
  'hidden-dangers-refined-sugar': [
    'stevia-vs-artificial-sweeteners',
    'stevia-diabetes-management',
    'psychology-sugar-addiction-breaking-free'
  ],
  'stevia-vs-artificial-sweeteners': [
    'hidden-dangers-refined-sugar',
    'stevia-diabetes-management',
    'environmental-impact-sugar-vs-stevia'
  ],
  'stevia-diabetes-management': [
    'hidden-dangers-refined-sugar',
    'stevia-vs-artificial-sweeteners',
    'baking-with-stevia-professional-tips'
  ],
  'environmental-impact-sugar-vs-stevia': [
    'stevia-vs-artificial-sweeteners',
    'hidden-dangers-refined-sugar',
    'psychology-sugar-addiction-breaking-free'
  ],
  'baking-with-stevia-professional-tips': [
    'stevia-diabetes-management',
    'stevia-vs-artificial-sweeteners',
    'psychology-sugar-addiction-breaking-free'
  ],
  'psychology-sugar-addiction-breaking-free': [
    'hidden-dangers-refined-sugar',
    'stevia-vs-artificial-sweeteners',
    'environmental-impact-sugar-vs-stevia'
  ]
};

interface InternalLinkingSectionProps {
  currentPage: keyof typeof internalLinks;
  title?: string;
  description?: string;
  maxLinks?: number;
  showPriority?: 'high' | 'medium' | 'low' | 'all';
  category?: string;
}

export function InternalLinkingSection({ 
  currentPage, 
  title = "Related Information",
  description,
  maxLinks = 6,
  showPriority = 'all',
  category
}: InternalLinkingSectionProps) {
  const links = internalLinks[currentPage] || [];
  
  const filteredLinks = links
    .filter(link => {
      if (showPriority !== 'all' && link.priority !== showPriority) return false;
      if (category && link.category !== category) return false;
      return true;
    })
    .slice(0, maxLinks);

  if (filteredLinks.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50" aria-label="Related information and helpful links">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link, index) => (
            <InternalLinkCard key={link.href} link={link} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface InternalLinkCardProps {
  link: InternalLink;
  index: number;
}

function InternalLinkCard({ link, index }: InternalLinkCardProps) {
  const priorityColors = {
    high: 'border-green-200 bg-green-50 hover:bg-green-100',
    medium: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
    low: 'border-gray-200 bg-gray-50 hover:bg-gray-100'
  };

  return (
    <Link 
      href={link.href}
      className={`block p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-md hover:scale-105 ${priorityColors[link.priority]}`}
      aria-label={`${link.text} - ${link.description}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-ink text-lg leading-tight">{link.text}</h3>
        <ArrowRight className="w-5 h-5 text-brand flex-shrink-0 ml-2" />
      </div>
      {link.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{link.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${
          link.priority === 'high' ? 'bg-green-200 text-green-800' :
          link.priority === 'medium' ? 'bg-blue-200 text-blue-800' :
          'bg-gray-200 text-gray-800'
        }`}>
          {link.category}
        </span>
        <span className="text-brand text-sm font-medium">Learn more →</span>
      </div>
    </Link>
  );
}

// Contextual links within content
interface ContextualLinkProps {
  href: string;
  children: React.ReactNode;
  description?: string;
  external?: boolean;
}

export function ContextualLink({ href, children, description, external = false }: ContextualLinkProps) {
  const linkProps = {
    className: "text-brand hover:text-brand-dark underline decoration-2 underline-offset-2 hover:decoration-brand-dark transition-colors",
    ...(description && { title: description }),
    ...(external && { target: "_blank", rel: "noopener noreferrer" })
  };

  return (
    <Link href={href} {...linkProps}>
      {children}
      {external && <ExternalLink className="w-3 h-3 inline ml-1" />}
    </Link>
  );
}

// Breadcrumb navigation for better internal linking
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb navigation" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ArrowRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
            )}
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-brand transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Related articles component for blog posts
interface RelatedArticlesProps {
  currentSlug: string;
  maxArticles?: number;
}

export function RelatedArticles({ currentSlug, maxArticles = 3 }: RelatedArticlesProps) {
  const related = relatedArticles[currentSlug] || [];
  const articlesToShow = related.slice(0, maxArticles);

  if (articlesToShow.length === 0) return null;

  return (
    <section className="py-12 bg-white" aria-label="Related articles">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink mb-8 text-center">Continue Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articlesToShow.map((slug) => (
            <RelatedArticleCard key={slug} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedArticleCard({ slug }: { slug: string }) {
  // This would typically fetch article data
  const articleTitles: Record<string, string> = {
    'hidden-dangers-refined-sugar': 'The Hidden Dangers of Refined Sugar',
    'stevia-vs-artificial-sweeteners': 'Stevia vs. Artificial Sweeteners',
    'stevia-diabetes-management': 'How Stevia Supports Diabetes Management',
    'environmental-impact-sugar-vs-stevia': 'Environmental Impact: Sugar vs. Stevia',
    'baking-with-stevia-professional-tips': 'Baking with Stevia: Professional Tips',
    'psychology-sugar-addiction-breaking-free': 'The Psychology of Sugar Addiction'
  };

  const title = articleTitles[slug] || 'Related Article';

  return (
    <Link 
      href={`/articles/${slug}`}
      className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={`Read article: ${title}`}
    >
      <h3 className="font-semibold text-ink mb-2 line-clamp-2">{title}</h3>
      <p className="text-brand text-sm font-medium flex items-center">
        Read article <ArrowRight className="w-4 h-4 ml-1" />
      </p>
    </Link>
  );
}

// Footer links for comprehensive site navigation
export function FooterInternalLinks() {
  const footerSections = [
    {
      title: "Health & Benefits",
      links: [
        { href: '/benefits', text: 'Health Benefits' },
        { href: '/articles/stevia-diabetes-management', text: 'Diabetes Management' },
        { href: '/articles/hidden-dangers-refined-sugar', text: 'Sugar Dangers' },
        { href: '/compare', text: 'Compare Sweeteners' }
      ]
    },
    {
      title: "Products & Usage",
      links: [
        { href: '/#products', text: 'Our Products' },
        { href: '/articles/baking-with-stevia-professional-tips', text: 'Baking Guide' },
        { href: '/faq', text: 'Usage Instructions' },
        { href: '/locations', text: 'Where to Buy' }
      ]
    },
    {
      title: "Learn More",
      links: [
        { href: '/science', text: 'Scientific Research' },
        { href: '/articles/environmental-impact-sugar-vs-stevia', text: 'Environmental Impact' },
        { href: '/articles/psychology-sugar-addiction-breaking-free', text: 'Sugar Addiction' },
        { href: '/about', text: 'About Us' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold text-ink mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="text-gray-600 hover:text-brand transition-colors"
                  aria-label={`Navigate to ${link.text}`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
