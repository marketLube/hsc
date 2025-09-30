"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, Heart, Leaf } from 'lucide-react';
import { Container } from '@/components/Container';
import { FloatingNav } from '@/components/FloatingNav';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: 'safety-daily',
    category: 'Safety & Health',
    question: 'Is stevia safe for daily consumption?',
    answer: 'Yes, stevia is completely safe for daily consumption. It has been approved by major health organizations including the FDA, WHO, and EFSA. Studies show no adverse effects from regular stevia consumption within recommended limits. The acceptable daily intake (ADI) is 4 mg per kg of body weight, which is much higher than typical consumption levels.',
    tags: ['safety', 'daily use', 'health organizations']
  },
  {
    id: 'diabetes-safe',
    category: 'Health Benefits',
    question: 'Can diabetics use stevia sweeteners?',
    answer: 'Absolutely! Stevia is excellent for diabetics. It has zero glycemic index, meaning it doesn\'t raise blood sugar levels at all. Many healthcare professionals specifically recommend stevia for diabetes management. Our stevia products are certified diabetes-friendly and help maintain stable blood glucose levels.',
    tags: ['diabetes', 'blood sugar', 'glycemic index']
  },
  {
    id: 'side-effects',
    category: 'Safety & Health',
    question: 'Does stevia have any side effects?',
    answer: 'Stevia is generally well-tolerated with no significant side effects for most people. Some individuals may experience a slight aftertaste initially, but this typically diminishes with regular use. Unlike artificial sweeteners, stevia doesn\'t cause digestive issues or headaches. It\'s a natural plant extract that\'s been used safely for centuries.',
    tags: ['side effects', 'natural', 'digestive']
  },
  {
    id: 'daily-limit',
    category: 'Usage & Dosage',
    question: 'How much stevia can I consume per day?',
    answer: 'The acceptable daily intake (ADI) for stevia is 4 mg per kg of body weight. For a 70kg adult, this equals about 280mg per day, which is equivalent to approximately 40 packets of stevia sweetener. This is much higher than what most people consume daily, so you don\'t need to worry about exceeding safe limits with normal use.',
    tags: ['dosage', 'daily limit', 'safety']
  },
  {
    id: 'baking-cooking',
    category: 'Usage & Dosage',
    question: 'Can I use stevia for baking and cooking?',
    answer: 'Yes, stevia is heat-stable and works excellently for baking and cooking. However, you\'ll need to adjust recipes since stevia is 200-300 times sweeter than sugar and doesn\'t provide bulk. Use our conversion guide: 1 cup sugar = 1 teaspoon stevia powder or 24 stevia tablets. For best results in baking, combine with bulk ingredients like applesauce or yogurt.',
    tags: ['baking', 'cooking', 'recipes', 'conversion']
  },
  {
    id: 'weight-loss',
    category: 'Health Benefits',
    question: 'Does stevia help with weight loss?',
    answer: 'Yes, stevia can significantly support weight loss efforts. With zero calories, it helps reduce overall caloric intake when replacing sugar. Studies show that people who switch to stevia can reduce their daily calorie intake by 200-400 calories, leading to gradual, sustainable weight loss. It also doesn\'t trigger insulin spikes that can lead to fat storage.',
    tags: ['weight loss', 'zero calories', 'insulin']
  },
  {
    id: 'taste-comparison',
    category: 'Product Information',
    question: 'How does stevia taste compared to sugar?',
    answer: 'Our premium stevia products taste remarkably similar to sugar with a clean, sweet flavor. High-quality stevia like ours has minimal to no aftertaste. The key is using the right amount - a little goes a long way. Most people adapt to the taste within a few days and often prefer it to artificial sweeteners.',
    tags: ['taste', 'flavor', 'aftertaste']
  },
  {
    id: 'pregnancy-safe',
    category: 'Safety & Health',
    question: 'Is stevia safe during pregnancy and breastfeeding?',
    answer: 'Yes, stevia is considered safe during pregnancy and breastfeeding. Major health organizations including the FDA have approved stevia for pregnant and nursing women. It\'s a natural alternative that doesn\'t cross the placental barrier like some artificial sweeteners. However, as with any dietary change during pregnancy, consult your healthcare provider.',
    tags: ['pregnancy', 'breastfeeding', 'natural']
  },
  {
    id: 'children-safe',
    category: 'Safety & Health',
    question: 'Can children consume stevia products?',
    answer: 'Yes, stevia is safe for children and is actually a healthier alternative to sugar for kids. It helps prevent tooth decay, doesn\'t contribute to childhood obesity, and doesn\'t cause hyperactivity like sugar can. The same ADI limits apply to children based on their body weight. Many pediatricians recommend stevia over artificial sweeteners for children.',
    tags: ['children', 'kids', 'tooth decay', 'obesity']
  },
  {
    id: 'forms-difference',
    category: 'Product Information',
    question: 'What\'s the difference between stevia tablets, powder, syrup, and sachets?',
    answer: 'All our stevia forms contain the same high-quality stevia extract, just in different formats for convenience: Tablets are perfect for beverages (1 tablet = 1 tsp sugar), Powder is ideal for baking and cooking, Syrup is great for pancakes and desserts, and Sachets are convenient for travel and portion control. Choose based on your usage preferences.',
    tags: ['tablets', 'powder', 'syrup', 'sachets', 'formats']
  },
  {
    id: 'organic-natural',
    category: 'Product Information',
    question: 'Is your stevia organic and natural?',
    answer: 'Yes, our stevia is 100% natural and sourced from organic stevia plants. We use a water-based extraction process without harsh chemicals. Our products are certified organic, non-GMO, and contain no artificial additives, colors, or preservatives. It\'s pure stevia leaf extract in its most natural form.',
    tags: ['organic', 'natural', 'non-GMO', 'pure']
  },
  {
    id: 'storage-shelf-life',
    category: 'Product Information',
    question: 'How should I store stevia and what\'s the shelf life?',
    answer: 'Store stevia in a cool, dry place away from direct sunlight. Our products have a shelf life of 3 years from manufacture date. Stevia doesn\'t expire like sugar but may lose potency over time if not stored properly. Keep containers tightly sealed to maintain freshness and prevent moisture absorption.',
    tags: ['storage', 'shelf life', 'freshness']
  }
];

const categories = ['All', 'Safety & Health', 'Health Benefits', 'Usage & Dosage', 'Product Information'];

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Safety & Health': return <Shield className="w-5 h-5" />;
      case 'Health Benefits': return <Heart className="w-5 h-5" />;
      case 'Usage & Dosage': return <HelpCircle className="w-5 h-5" />;
      case 'Product Information': return <Leaf className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <>
      <FloatingNav />
      
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
        <Container>
          {/* Header Section */}
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About{' '}
              <span className="text-green-600">Stevia Sweeteners</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get expert answers to common questions about stevia safety, health benefits, usage, and more. 
              Make informed decisions about natural sugar alternatives.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-6 text-left flex items-start justify-between hover:bg-gray-50 rounded-2xl transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2 text-green-600">
                            {getCategoryIcon(faq.category)}
                            <span className="text-sm font-medium">{faq.category}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Our team of nutrition experts is here to help. Get personalized answers about stevia and healthy living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Contact Our Experts
                </a>
                <a
                  href="tel:+91-98765-43210"
                  className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Call +91-98765-43210
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
