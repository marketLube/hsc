/**
 * Voice Search & Featured Snippet Optimization Component
 * 
 * Optimizes content for voice search queries and featured snippets
 * Voice search is growing 50% annually and represents 20% of mobile searches
 */

import { Card } from "@/components/Card";

interface VoiceSearchQA {
  question: string;
  answer: string;
  category: 'what' | 'how' | 'why' | 'when' | 'where' | 'who';
  searchVolume: 'high' | 'medium' | 'low';
  featured: boolean;
}

// Voice search optimized Q&A content
const voiceSearchContent: VoiceSearchQA[] = [
  {
    question: "What is stevia sweetener?",
    answer: "Stevia is a natural, zero-calorie sweetener extracted from the leaves of the Stevia rebaudiana plant. It's 200-300 times sweeter than sugar, contains no calories, and doesn't raise blood sugar levels, making it perfect for diabetics and weight management.",
    category: 'what',
    searchVolume: 'high',
    featured: true
  },
  {
    question: "How much stevia equals one teaspoon of sugar?",
    answer: "One-eighth teaspoon (0.5ml) of pure stevia extract equals one teaspoon of sugar. For stevia blends, use about half a teaspoon to replace one teaspoon of sugar. Always start with less and adjust to taste.",
    category: 'how',
    searchVolume: 'high',
    featured: true
  },
  {
    question: "Why is stevia better than artificial sweeteners?",
    answer: "Stevia is better than artificial sweeteners because it's natural, plant-based, and has no known side effects. Unlike artificial sweeteners, stevia may actually provide health benefits including antioxidant properties and blood pressure support.",
    category: 'why',
    searchVolume: 'high',
    featured: true
  },
  {
    question: "When should I use stevia instead of sugar?",
    answer: "Use stevia instead of sugar when you want to reduce calories, manage blood sugar levels, lose weight, or avoid tooth decay. It's especially beneficial for diabetics, people on keto diets, and anyone seeking a healthier lifestyle.",
    category: 'when',
    searchVolume: 'medium',
    featured: true
  },
  {
    question: "Where can I buy stevia sweetener in India?",
    answer: "You can buy premium stevia sweetener from The Healthy Sugar Company online with free shipping across India. We deliver to Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and 500+ cities nationwide.",
    category: 'where',
    searchVolume: 'high',
    featured: true
  },
  {
    question: "Who should avoid stevia sweetener?",
    answer: "Stevia is safe for most people including diabetics, pregnant women, and children. People with ragweed allergies should consult their doctor first. No other groups need to avoid stevia as it's recognized as safe by FDA and WHO.",
    category: 'who',
    searchVolume: 'medium',
    featured: false
  },
  {
    question: "How do you use stevia for baking?",
    answer: "For baking with stevia, replace 1 cup sugar with 1/3 cup stevia blend. Add extra flour or applesauce for bulk, reduce liquid by 1/4 cup, and add vanilla extract for flavor. Stevia is heat-stable up to 200°C.",
    category: 'how',
    searchVolume: 'high',
    featured: true
  },
  {
    question: "What are the side effects of stevia?",
    answer: "Stevia has no significant side effects for most people. Some may experience a slight aftertaste initially, but this diminishes with regular use. Stevia is much safer than artificial sweeteners with no reported health risks.",
    category: 'what',
    searchVolume: 'high',
    featured: true
  }
];

// Conversational keywords for voice search
const conversationalKeywords = [
  "best stevia brand in India",
  "natural sugar substitute for diabetics",
  "how to replace sugar with stevia",
  "stevia sweetener near me",
  "healthy sugar alternative for weight loss",
  "is stevia safe for daily use",
  "stevia vs sugar calories comparison",
  "where to buy organic stevia",
  "stevia benefits for diabetes",
  "natural sweetener for baking"
];

interface VoiceSearchSectionProps {
  category?: 'what' | 'how' | 'why' | 'when' | 'where' | 'who' | 'all';
  maxQuestions?: number;
  showFeaturedOnly?: boolean;
}

export function VoiceSearchOptimizedContent({ 
  category = 'all', 
  maxQuestions = 8,
  showFeaturedOnly = false 
}: VoiceSearchSectionProps) {
  const filteredContent = voiceSearchContent
    .filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (showFeaturedOnly && !item.featured) return false;
      return true;
    })
    .slice(0, maxQuestions);

  return (
    <section className="py-16 bg-white" aria-label="Frequently asked questions about stevia">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-4">
            Common Questions About Stevia Sweeteners
          </h2>
          <p className="text-lg text-gray-600">
            Get instant answers to the most frequently asked questions about stevia
          </p>
        </div>

        <div className="space-y-6">
          {filteredContent.map((item, index) => (
            <VoiceSearchQACard key={index} qa={item} />
          ))}
        </div>

        {/* Conversational Keywords Section */}
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
          <h3 className="text-xl font-bold text-ink mb-6 text-center">
            Popular Voice Searches About Stevia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversationalKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand rounded-full"></div>
                <span className="text-gray-700 text-sm">"{keyword}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VoiceSearchQACard({ qa }: { qa: VoiceSearchQA }) {
  const categoryColors = {
    what: 'border-blue-200 bg-blue-50',
    how: 'border-green-200 bg-green-50',
    why: 'border-purple-200 bg-purple-50',
    when: 'border-orange-200 bg-orange-50',
    where: 'border-pink-200 bg-pink-50',
    who: 'border-indigo-200 bg-indigo-50'
  };

  return (
    <Card className={`p-6 ${categoryColors[qa.category]} border-2`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-ink pr-4 leading-tight">
          {qa.question}
        </h3>
        <div className="flex space-x-2 flex-shrink-0">
          {qa.featured && (
            <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            qa.searchVolume === 'high' ? 'bg-green-200 text-green-800' :
            qa.searchVolume === 'medium' ? 'bg-yellow-200 text-yellow-800' :
            'bg-gray-200 text-gray-800'
          }`}>
            {qa.searchVolume} volume
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
    </Card>
  );
}

// Schema markup for voice search optimization
export function VoiceSearchSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": voiceSearchContent
      .filter(item => item.featured)
      .map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Voice search optimization for specific pages
export function PageSpecificVoiceSearch({ pageType }: { pageType: string }) {
  const pageSpecificQAs: Record<string, VoiceSearchQA[]> = {
    product: [
      {
        question: "How much does stevia sweetener cost?",
        answer: "Premium stevia sweetener starts from ₹299 for tablets, ₹499 for syrup, and ₹299 for powder. Free shipping available on orders over ₹999 across India.",
        category: 'how',
        searchVolume: 'high',
        featured: true
      }
    ],
    benefits: [
      {
        question: "What are the health benefits of stevia?",
        answer: "Stevia offers multiple health benefits: zero calories for weight management, zero glycemic index for diabetes control, antioxidant properties, potential blood pressure support, and dental health benefits as it doesn't feed harmful bacteria.",
        category: 'what',
        searchVolume: 'high',
        featured: true
      }
    ]
  };

  const content = pageSpecificQAs[pageType] || [];

  if (content.length === 0) return null;

  return (
    <div className="mt-12 space-y-4">
      {content.map((qa, index) => (
        <VoiceSearchQACard key={index} qa={qa} />
      ))}
    </div>
  );
}
