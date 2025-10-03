"use client";

import { useState } from "react";
import { 
  Zap, 
  Search, 
  Check, 
  ExternalLink, 
  Settings, 
  Power,
  TrendingUp,
  Truck,
  CreditCard,
  MessageSquare,
  Mail,
  Bell,
  ShoppingBag,
  BarChart3,
  Lock,
  Globe,
  Smartphone,
  Layers,
  Package,
  DollarSign,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  ArrowUpRight,
  Download,
  Upload,
  Star,
  Headphones,
  FileText,
  Receipt
} from "lucide-react";

// Integration Categories
type IntegrationCategory = "all" | "shipping" | "payment" | "marketing" | "analytics" | "communication" | "social" | "crm" | "accounting" | "support" | "reviews" | "inventory" | "seo";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  icon: any;
  provider: string;
  status: "connected" | "available" | "coming-soon";
  monthlyPrice?: number;
  features: string[];
  lastSync?: string;
  apiKey?: string;
  websiteUrl?: string;
  setupComplexity: "easy" | "moderate" | "advanced";
  popularityScore: number;
}

// Comprehensive Integrations Data
const integrations: Integration[] = [
  // Shipping & Logistics
  {
    id: "delhivery",
    name: "Delhivery",
    description: "India's leading logistics and supply chain services company. Automate shipping, tracking, and delivery management.",
    category: "shipping",
    icon: Truck,
    provider: "Delhivery Pvt Ltd",
    status: "connected",
    monthlyPrice: 0,
    features: ["Real-time tracking", "Bulk shipping", "COD support", "Rate calculator", "Automated label printing"],
    lastSync: "2 hours ago",
    apiKey: "DELH_****_8392",
    websiteUrl: "https://www.delhivery.com",
    setupComplexity: "moderate",
    popularityScore: 98
  },
  {
    id: "shiprocket",
    name: "Shiprocket",
    description: "eCommerce shipping solution with 17+ courier partners. Best rates and fastest delivery times.",
    category: "shipping",
    icon: Package,
    provider: "Shiprocket",
    status: "available",
    monthlyPrice: 0,
    features: ["Multi-courier support", "Automated NDR management", "Shipping insurance", "Reverse logistics"],
    websiteUrl: "https://www.shiprocket.in",
    setupComplexity: "easy",
    popularityScore: 95
  },
  {
    id: "bluedart",
    name: "Blue Dart",
    description: "Premium express air and integrated transportation company. Reliable and fast delivery services.",
    category: "shipping",
    icon: Truck,
    provider: "Blue Dart Express",
    status: "available",
    monthlyPrice: 0,
    features: ["Express delivery", "International shipping", "Temperature controlled transport", "Real-time alerts"],
    websiteUrl: "https://www.bluedart.com",
    setupComplexity: "moderate",
    popularityScore: 88
  },
  
  // Payment Gateways
  {
    id: "gokwik",
    name: "GoKwik",
    description: "Intelligent checkout and payment gateway with highest conversion rates. Reduce cart abandonment by 40%.",
    category: "payment",
    icon: CreditCard,
    provider: "GoKwik",
    status: "connected",
    monthlyPrice: 0,
    features: ["One-click checkout", "COD to prepaid conversion", "Smart payment routing", "Fraud detection"],
    lastSync: "5 minutes ago",
    apiKey: "GOKW_****_5721",
    websiteUrl: "https://www.gokwik.co",
    setupComplexity: "easy",
    popularityScore: 92
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Complete payment solution with UPI, cards, wallets, and more. Industry-leading success rates.",
    category: "payment",
    icon: DollarSign,
    provider: "Razorpay",
    status: "connected",
    monthlyPrice: 0,
    features: ["UPI AutoPay", "Payment links", "Smart routing", "Instant refunds", "Subscription billing"],
    lastSync: "10 minutes ago",
    apiKey: "RAZR_****_9483",
    websiteUrl: "https://razorpay.com",
    setupComplexity: "easy",
    popularityScore: 96
  },
  {
    id: "cashfree",
    name: "Cashfree Payments",
    description: "Next-gen payment gateway with instant settlements and 100+ payment modes.",
    category: "payment",
    icon: CreditCard,
    provider: "Cashfree Payments",
    status: "available",
    monthlyPrice: 0,
    features: ["Instant settlements", "Auto collect", "Payouts API", "POS integration"],
    websiteUrl: "https://www.cashfree.com",
    setupComplexity: "easy",
    popularityScore: 89
  },
  {
    id: "paytm",
    name: "Paytm Payment Gateway",
    description: "India's leading payment gateway with wallet and UPI integration.",
    category: "payment",
    icon: Smartphone,
    provider: "Paytm",
    status: "available",
    monthlyPrice: 0,
    features: ["Paytm Wallet", "No setup fee", "Dynamic QR codes", "Postpaid checkout"],
    websiteUrl: "https://business.paytm.com",
    setupComplexity: "easy",
    popularityScore: 94
  },
  
  // Marketing & Analytics
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Comprehensive web analytics service. Track website traffic, user behavior, and conversions.",
    category: "analytics",
    icon: BarChart3,
    provider: "Google LLC",
    status: "connected",
    monthlyPrice: 0,
    features: ["Traffic analysis", "Conversion tracking", "Custom reports", "Real-time data", "E-commerce tracking"],
    lastSync: "Real-time",
    apiKey: "GA4_****_1234",
    websiteUrl: "https://analytics.google.com",
    setupComplexity: "moderate",
    popularityScore: 99
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel (Facebook)",
    description: "Track conversions from Facebook and Instagram ads. Optimize campaigns and build targeted audiences.",
    category: "marketing",
    icon: Facebook,
    provider: "Meta Platforms",
    status: "connected",
    monthlyPrice: 0,
    features: ["Conversion tracking", "Custom audiences", "Dynamic ads", "Attribution tracking"],
    lastSync: "1 hour ago",
    apiKey: "META_****_6789",
    websiteUrl: "https://business.facebook.com",
    setupComplexity: "moderate",
    popularityScore: 97
  },
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Create and manage advertising campaigns on Google's advertising network.",
    category: "marketing",
    icon: TrendingUp,
    provider: "Google LLC",
    status: "available",
    monthlyPrice: 0,
    features: ["Search ads", "Display ads", "Shopping campaigns", "Remarketing", "Conversion tracking"],
    websiteUrl: "https://ads.google.com",
    setupComplexity: "advanced",
    popularityScore: 98
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "All-in-one marketing platform for email campaigns, automation, and customer engagement.",
    category: "marketing",
    icon: Mail,
    provider: "Mailchimp",
    status: "available",
    monthlyPrice: 299,
    features: ["Email campaigns", "Marketing automation", "Audience segmentation", "A/B testing", "Analytics"],
    websiteUrl: "https://mailchimp.com",
    setupComplexity: "easy",
    popularityScore: 93
  },
  {
    id: "hotjar",
    name: "Hotjar",
    description: "Behavior analytics and user feedback service. Understand how users interact with your website.",
    category: "analytics",
    icon: BarChart3,
    provider: "Hotjar Ltd",
    status: "available",
    monthlyPrice: 799,
    features: ["Heatmaps", "Session recordings", "Conversion funnels", "Feedback polls", "User surveys"],
    websiteUrl: "https://www.hotjar.com",
    setupComplexity: "easy",
    popularityScore: 87
  },
  
  // Communication
  {
    id: "whatsapp-business",
    name: "WhatsApp Business API",
    description: "Send order updates, delivery notifications, and customer support messages via WhatsApp.",
    category: "communication",
    icon: MessageSquare,
    provider: "Meta Platforms",
    status: "coming-soon",
    monthlyPrice: 499,
    features: ["Order notifications", "Two-way conversations", "Rich messages", "Automated replies", "Analytics"],
    websiteUrl: "https://business.whatsapp.com",
    setupComplexity: "advanced",
    popularityScore: 96
  },
  {
    id: "twilio",
    name: "Twilio SMS",
    description: "Send SMS notifications for orders, shipments, and promotional campaigns.",
    category: "communication",
    icon: Smartphone,
    provider: "Twilio Inc",
    status: "available",
    monthlyPrice: 599,
    features: ["SMS notifications", "OTP verification", "Two-way messaging", "Global reach", "Delivery tracking"],
    websiteUrl: "https://www.twilio.com",
    setupComplexity: "moderate",
    popularityScore: 91
  },
  {
    id: "gupshup",
    name: "Gupshup",
    description: "Conversational messaging platform for WhatsApp, SMS, and RCS.",
    category: "communication",
    icon: MessageSquare,
    provider: "Gupshup",
    status: "available",
    monthlyPrice: 399,
    features: ["Multi-channel messaging", "Chatbots", "Templates", "Campaign management"],
    websiteUrl: "https://www.gupshup.io",
    setupComplexity: "moderate",
    popularityScore: 85
  },
  
  // Social Media
  {
    id: "instagram-shopping",
    name: "Instagram Shopping",
    description: "Sell products directly on Instagram. Tag products in posts and stories.",
    category: "social",
    icon: Instagram,
    provider: "Meta Platforms",
    status: "available",
    monthlyPrice: 0,
    features: ["Product tagging", "Instagram Shop", "Stories shopping", "Checkout on Instagram"],
    websiteUrl: "https://business.instagram.com",
    setupComplexity: "easy",
    popularityScore: 94
  },
  {
    id: "facebook-shop",
    name: "Facebook Shop",
    description: "Create a mobile-friendly storefront on your Facebook Page.",
    category: "social",
    icon: Facebook,
    provider: "Meta Platforms",
    status: "available",
    monthlyPrice: 0,
    features: ["Facebook Shop", "Live shopping", "Marketplace integration", "Shop ads"],
    websiteUrl: "https://www.facebook.com/business/shops",
    setupComplexity: "easy",
    popularityScore: 92
  },

  // More Shipping & Logistics
  {
    id: "fedex",
    name: "FedEx",
    description: "International shipping and logistics. Express, ground, and freight services worldwide.",
    category: "shipping",
    icon: Truck,
    provider: "FedEx Corporation",
    status: "available",
    monthlyPrice: 0,
    features: ["International shipping", "Express delivery", "Freight services", "Track and trace"],
    websiteUrl: "https://www.fedex.com",
    setupComplexity: "moderate",
    popularityScore: 90
  },
  {
    id: "dhl",
    name: "DHL Express",
    description: "Global express delivery and logistics. Fast international shipping solutions.",
    category: "shipping",
    icon: Truck,
    provider: "DHL International",
    status: "available",
    monthlyPrice: 0,
    features: ["Worldwide delivery", "Express shipping", "Customs clearance", "Real-time tracking"],
    websiteUrl: "https://www.dhl.com",
    setupComplexity: "moderate",
    popularityScore: 88
  },
  {
    id: "dunzo",
    name: "Dunzo",
    description: "Hyperlocal delivery platform for same-day and instant deliveries in metros.",
    category: "shipping",
    icon: Package,
    provider: "Dunzo Digital",
    status: "available",
    monthlyPrice: 0,
    features: ["Same-day delivery", "Instant delivery", "Metro coverage", "API integration"],
    websiteUrl: "https://www.dunzo.com",
    setupComplexity: "easy",
    popularityScore: 82
  },

  // More Payment Gateways
  {
    id: "stripe",
    name: "Stripe",
    description: "Global payment infrastructure for online businesses. Accept payments in 135+ currencies.",
    category: "payment",
    icon: CreditCard,
    provider: "Stripe Inc",
    status: "available",
    monthlyPrice: 0,
    features: ["Global payments", "Subscription billing", "Invoicing", "Connect platform", "Fraud prevention"],
    websiteUrl: "https://stripe.com",
    setupComplexity: "moderate",
    popularityScore: 97
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Accept PayPal, credit cards, and debit cards. Trusted by millions worldwide.",
    category: "payment",
    icon: DollarSign,
    provider: "PayPal Holdings",
    status: "available",
    monthlyPrice: 0,
    features: ["PayPal checkout", "Credit card processing", "Buy Now Pay Later", "Invoice billing"],
    websiteUrl: "https://www.paypal.com",
    setupComplexity: "easy",
    popularityScore: 95
  },
  {
    id: "payu",
    name: "PayU",
    description: "Leading payment gateway in India. Multiple payment options and instant settlements.",
    category: "payment",
    icon: CreditCard,
    provider: "PayU Payments",
    status: "available",
    monthlyPrice: 0,
    features: ["100+ payment methods", "Instant settlements", "EMI options", "Offers engine"],
    websiteUrl: "https://payu.in",
    setupComplexity: "easy",
    popularityScore: 87
  },
  {
    id: "instamojo",
    name: "Instamojo",
    description: "Simple payment gateway for Indian businesses. Start accepting payments in minutes.",
    category: "payment",
    icon: Smartphone,
    provider: "Instamojo",
    status: "available",
    monthlyPrice: 0,
    features: ["Payment links", "UPI", "Online store", "No setup fee", "Digital goods"],
    websiteUrl: "https://www.instamojo.com",
    setupComplexity: "easy",
    popularityScore: 84
  },
  {
    id: "phonepe",
    name: "PhonePe Payment Gateway",
    description: "India's leading digital payments platform. UPI and card payments.",
    category: "payment",
    icon: Smartphone,
    provider: "PhonePe",
    status: "available",
    monthlyPrice: 0,
    features: ["UPI payments", "Card payments", "Wallets", "QR codes", "Switch"],
    websiteUrl: "https://www.phonepe.com/business",
    setupComplexity: "easy",
    popularityScore: 91
  },

  // CRM Systems
  {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform. Manage customer relationships and sales pipeline.",
    category: "crm",
    icon: Users,
    provider: "Salesforce Inc",
    status: "available",
    monthlyPrice: 2499,
    features: ["Contact management", "Sales pipeline", "Email integration", "Reporting", "Mobile CRM"],
    websiteUrl: "https://www.salesforce.com",
    setupComplexity: "advanced",
    popularityScore: 93
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description: "Free CRM with marketing, sales, and service tools. Grow better with HubSpot.",
    category: "crm",
    icon: Users,
    provider: "HubSpot Inc",
    status: "available",
    monthlyPrice: 0,
    features: ["Contact management", "Deal tracking", "Email tracking", "Meeting scheduler", "Live chat"],
    websiteUrl: "https://www.hubspot.com",
    setupComplexity: "easy",
    popularityScore: 96
  },
  {
    id: "zoho-crm",
    name: "Zoho CRM",
    description: "Award-winning CRM for businesses of all sizes. AI-powered sales assistant.",
    category: "crm",
    icon: Users,
    provider: "Zoho Corporation",
    status: "available",
    monthlyPrice: 1400,
    features: ["AI assistant", "Workflow automation", "Analytics", "Multi-channel", "Mobile app"],
    websiteUrl: "https://www.zoho.com/crm",
    setupComplexity: "moderate",
    popularityScore: 89
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Sales-focused CRM designed by salespeople, for salespeople.",
    category: "crm",
    icon: Users,
    provider: "Pipedrive Inc",
    status: "available",
    monthlyPrice: 1099,
    features: ["Visual pipeline", "Sales reporting", "Email integration", "Activity tracking", "Mobile apps"],
    websiteUrl: "https://www.pipedrive.com",
    setupComplexity: "easy",
    popularityScore: 85
  },

  // Accounting Software
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Leading accounting software for small businesses. Invoice, track expenses, and more.",
    category: "accounting",
    icon: DollarSign,
    provider: "Intuit Inc",
    status: "available",
    monthlyPrice: 1499,
    features: ["Invoicing", "Expense tracking", "Tax preparation", "Reports", "Inventory tracking"],
    websiteUrl: "https://quickbooks.intuit.com",
    setupComplexity: "moderate",
    popularityScore: 92
  },
  {
    id: "tally",
    name: "Tally ERP",
    description: "India's most popular accounting software. GST compliant and feature-rich.",
    category: "accounting",
    icon: BarChart3,
    provider: "Tally Solutions",
    status: "available",
    monthlyPrice: 899,
    features: ["GST returns", "Inventory management", "Banking", "Payroll", "Multi-currency"],
    websiteUrl: "https://tallysolutions.com",
    setupComplexity: "moderate",
    popularityScore: 94
  },
  {
    id: "zoho-books",
    name: "Zoho Books",
    description: "Online accounting software for small businesses. Automate workflows and stay GST compliant.",
    category: "accounting",
    icon: DollarSign,
    provider: "Zoho Corporation",
    status: "available",
    monthlyPrice: 699,
    features: ["GST filing", "Automated workflows", "Client portal", "Reports", "Bank reconciliation"],
    websiteUrl: "https://www.zoho.com/books",
    setupComplexity: "easy",
    popularityScore: 88
  },
  {
    id: "xero",
    name: "Xero",
    description: "Beautiful accounting software for small businesses and accountants.",
    category: "accounting",
    icon: DollarSign,
    provider: "Xero Limited",
    status: "available",
    monthlyPrice: 2199,
    features: ["Bank connections", "Invoicing", "Expense claims", "Projects", "Inventory"],
    websiteUrl: "https://www.xero.com",
    setupComplexity: "easy",
    popularityScore: 87
  },

  // Customer Support
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer service software and support ticketing system. Deliver great customer experiences.",
    category: "support",
    icon: MessageSquare,
    provider: "Zendesk Inc",
    status: "available",
    monthlyPrice: 1999,
    features: ["Ticketing system", "Live chat", "Help center", "Phone support", "Automation"],
    websiteUrl: "https://www.zendesk.com",
    setupComplexity: "moderate",
    popularityScore: 91
  },
  {
    id: "freshdesk",
    name: "Freshdesk",
    description: "Modern customer support software. Delight customers with effortless service.",
    category: "support",
    icon: Headphones,
    provider: "Freshworks Inc",
    status: "available",
    monthlyPrice: 1299,
    features: ["Multi-channel support", "Ticket management", "Knowledge base", "Automation", "Reporting"],
    websiteUrl: "https://freshdesk.com",
    setupComplexity: "easy",
    popularityScore: 89
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Conversational relationship platform. Connect with customers through messaging.",
    category: "support",
    icon: MessageSquare,
    provider: "Intercom Inc",
    status: "available",
    monthlyPrice: 2999,
    features: ["Live chat", "Chatbots", "Product tours", "Help center", "Email campaigns"],
    websiteUrl: "https://www.intercom.com",
    setupComplexity: "easy",
    popularityScore: 93
  },
  {
    id: "tawk-to",
    name: "Tawk.to",
    description: "100% free live chat software. Monitor and chat with visitors on your website.",
    category: "support",
    icon: MessageSquare,
    provider: "Tawk.to",
    status: "available",
    monthlyPrice: 0,
    features: ["Free forever", "Unlimited agents", "iOS & Android apps", "Screen sharing", "Video chat"],
    websiteUrl: "https://www.tawk.to",
    setupComplexity: "easy",
    popularityScore: 86
  },
  {
    id: "tidio",
    name: "Tidio Chat",
    description: "Live chat combined with chatbots. Automate customer service and boost sales.",
    category: "support",
    icon: MessageSquare,
    provider: "Tidio LLC",
    status: "available",
    monthlyPrice: 499,
    features: ["Live chat", "Chatbots", "Email integration", "Visitor tracking", "Mobile apps"],
    websiteUrl: "https://www.tidio.com",
    setupComplexity: "easy",
    popularityScore: 84
  },

  // Reviews & Social Proof
  {
    id: "trustpilot",
    name: "Trustpilot",
    description: "World's most powerful review platform. Build trust and increase sales with reviews.",
    category: "reviews",
    icon: Star,
    provider: "Trustpilot Inc",
    status: "available",
    monthlyPrice: 1999,
    features: ["Review collection", "Review widgets", "Business intelligence", "Reputation management"],
    websiteUrl: "https://www.trustpilot.com",
    setupComplexity: "easy",
    popularityScore: 90
  },
  {
    id: "reviews-io",
    name: "Reviews.io",
    description: "Collect and display product and company reviews. Increase trust and conversions.",
    category: "reviews",
    icon: Star,
    provider: "Reviews.io",
    status: "available",
    monthlyPrice: 1499,
    features: ["Product reviews", "Company reviews", "Video reviews", "Rich snippets", "Widgets"],
    websiteUrl: "https://www.reviews.io",
    setupComplexity: "easy",
    popularityScore: 85
  },
  {
    id: "yotpo",
    name: "Yotpo",
    description: "eCommerce marketing platform. Collect reviews, photos, and Q&A from customers.",
    category: "reviews",
    icon: Star,
    provider: "Yotpo Ltd",
    status: "available",
    monthlyPrice: 2499,
    features: ["Reviews & ratings", "Visual UGC", "Loyalty programs", "SMS marketing", "Analytics"],
    websiteUrl: "https://www.yotpo.com",
    setupComplexity: "moderate",
    popularityScore: 88
  },
  {
    id: "stamped",
    name: "Stamped.io",
    description: "Reviews, loyalty, and referrals platform. Drive growth with customer-generated content.",
    category: "reviews",
    icon: Star,
    provider: "Stamped Inc",
    status: "available",
    monthlyPrice: 1799,
    features: ["Product reviews", "Photo reviews", "Instagram UGC", "Loyalty rewards", "Referrals"],
    websiteUrl: "https://stamped.io",
    setupComplexity: "easy",
    popularityScore: 82
  },

  // More Marketing Tools
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "Email and SMS marketing platform for eCommerce. Grow your business with data-driven marketing.",
    category: "marketing",
    icon: Mail,
    provider: "Klaviyo Inc",
    status: "available",
    monthlyPrice: 1999,
    features: ["Email marketing", "SMS campaigns", "Automation flows", "Segmentation", "A/B testing"],
    websiteUrl: "https://www.klaviyo.com",
    setupComplexity: "moderate",
    popularityScore: 94
  },
  {
    id: "sendinblue",
    name: "Brevo (Sendinblue)",
    description: "All-in-one marketing platform. Email, SMS, chat, CRM, and marketing automation.",
    category: "marketing",
    icon: Mail,
    provider: "Brevo (Sendinblue)",
    status: "available",
    monthlyPrice: 499,
    features: ["Email campaigns", "SMS marketing", "Marketing automation", "CRM", "Landing pages"],
    websiteUrl: "https://www.brevo.com",
    setupComplexity: "easy",
    popularityScore: 87
  },
  {
    id: "mailmodo",
    name: "Mailmodo",
    description: "Interactive email marketing platform. Create AMP emails with forms, calendars, and more.",
    category: "marketing",
    icon: Mail,
    provider: "Mailmodo Technologies",
    status: "available",
    monthlyPrice: 999,
    features: ["AMP emails", "Email automation", "Drag-drop editor", "Analytics", "Integrations"],
    websiteUrl: "https://www.mailmodo.com",
    setupComplexity: "easy",
    popularityScore: 79
  },
  {
    id: "clevertap",
    name: "CleverTap",
    description: "Customer engagement and retention platform. Personalized omnichannel campaigns.",
    category: "marketing",
    icon: Users,
    provider: "CleverTap Inc",
    status: "available",
    monthlyPrice: 2999,
    features: ["Push notifications", "In-app messaging", "Email/SMS", "User analytics", "A/B testing"],
    websiteUrl: "https://clevertap.com",
    setupComplexity: "moderate",
    popularityScore: 86
  },
  {
    id: "moengage",
    name: "MoEngage",
    description: "Insights-led customer engagement platform. Drive retention and lifetime value.",
    category: "marketing",
    icon: Users,
    provider: "MoEngage Inc",
    status: "available",
    monthlyPrice: 2499,
    features: ["Multi-channel campaigns", "Customer analytics", "Personalization", "Automation", "AI optimization"],
    websiteUrl: "https://www.moengage.com",
    setupComplexity: "moderate",
    popularityScore: 83
  },

  // SEO & Optimization
  {
    id: "semrush",
    name: "SEMrush",
    description: "All-in-one marketing toolkit. SEO, PPC, content, social media, and competitive research.",
    category: "seo",
    icon: TrendingUp,
    provider: "Semrush Inc",
    status: "available",
    monthlyPrice: 9999,
    features: ["Keyword research", "Site audit", "Competitor analysis", "Rank tracking", "Content optimization"],
    websiteUrl: "https://www.semrush.com",
    setupComplexity: "moderate",
    popularityScore: 92
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    description: "SEO toolset for growing search traffic. Site explorer, keywords explorer, and more.",
    category: "seo",
    icon: Globe,
    provider: "Ahrefs Pte Ltd",
    status: "available",
    monthlyPrice: 8999,
    features: ["Site explorer", "Keyword research", "Rank tracker", "Content explorer", "Backlink analysis"],
    websiteUrl: "https://ahrefs.com",
    setupComplexity: "moderate",
    popularityScore: 90
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    description: "Free tool from Google. Monitor and optimize your site's presence in search results.",
    category: "seo",
    icon: Globe,
    provider: "Google LLC",
    status: "connected",
    monthlyPrice: 0,
    features: ["Performance reports", "Index coverage", "URL inspection", "Sitemaps", "Mobile usability"],
    lastSync: "1 hour ago",
    apiKey: "GSC_****_4321",
    websiteUrl: "https://search.google.com/search-console",
    setupComplexity: "easy",
    popularityScore: 98
  },
  {
    id: "ubersuggest",
    name: "Ubersuggest",
    description: "SEO and content marketing tool by Neil Patel. Keyword research and competitor analysis.",
    category: "seo",
    icon: TrendingUp,
    provider: "Neil Patel Digital",
    status: "available",
    monthlyPrice: 999,
    features: ["Keyword ideas", "Content ideas", "Backlink data", "Site audit", "Rank tracking"],
    websiteUrl: "https://neilpatel.com/ubersuggest",
    setupComplexity: "easy",
    popularityScore: 84
  },

  // Inventory Management
  {
    id: "zoho-inventory",
    name: "Zoho Inventory",
    description: "Inventory management software for businesses. Track inventory, orders, and shipments.",
    category: "inventory",
    icon: Package,
    provider: "Zoho Corporation",
    status: "available",
    monthlyPrice: 699,
    features: ["Multi-warehouse", "Order management", "Shipping integration", "Reports", "Barcode scanning"],
    websiteUrl: "https://www.zoho.com/inventory",
    setupComplexity: "easy",
    popularityScore: 86
  },
  {
    id: "cin7",
    name: "Cin7",
    description: "Connected inventory management platform. Sync inventory across channels.",
    category: "inventory",
    icon: Package,
    provider: "Cin7 Ltd",
    status: "available",
    monthlyPrice: 2999,
    features: ["Multi-channel sync", "Warehouse management", "POS integration", "B2B portal", "EDI"],
    websiteUrl: "https://www.cin7.com",
    setupComplexity: "advanced",
    popularityScore: 81
  },
  {
    id: "stocky",
    name: "Stocky",
    description: "Inventory management app. Purchase orders, stock transfers, and demand forecasting.",
    category: "inventory",
    icon: Package,
    provider: "Stocky Inc",
    status: "available",
    monthlyPrice: 1499,
    features: ["Purchase orders", "Stock transfers", "Demand forecasting", "Low stock alerts", "Reporting"],
    websiteUrl: "https://www.stocky.com",
    setupComplexity: "easy",
    popularityScore: 78
  },

  // More Analytics
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics platform. Analyze user behavior and improve product experience.",
    category: "analytics",
    icon: BarChart3,
    provider: "Mixpanel Inc",
    status: "available",
    monthlyPrice: 1999,
    features: ["Event tracking", "User analytics", "Funnel analysis", "Retention reports", "A/B testing"],
    websiteUrl: "https://mixpanel.com",
    setupComplexity: "moderate",
    popularityScore: 87
  },
  {
    id: "amplitude",
    name: "Amplitude",
    description: "Digital analytics platform. Understand user behavior and drive product growth.",
    category: "analytics",
    icon: BarChart3,
    provider: "Amplitude Inc",
    status: "available",
    monthlyPrice: 2499,
    features: ["Product analytics", "Behavioral cohorts", "Predictive analytics", "Experimentation", "Data governance"],
    websiteUrl: "https://amplitude.com",
    setupComplexity: "moderate",
    popularityScore: 85
  },
  {
    id: "microsoft-clarity",
    name: "Microsoft Clarity",
    description: "Free behavioral analytics tool. Heatmaps, session recordings, and insights.",
    category: "analytics",
    icon: BarChart3,
    provider: "Microsoft Corporation",
    status: "available",
    monthlyPrice: 0,
    features: ["Free forever", "Heatmaps", "Session recordings", "Insights", "No traffic limits"],
    websiteUrl: "https://clarity.microsoft.com",
    setupComplexity: "easy",
    popularityScore: 89
  },

  // More Social Media
  {
    id: "pinterest-business",
    name: "Pinterest Business",
    description: "Sell products on Pinterest. Create inspiring pins and reach millions of shoppers.",
    category: "social",
    icon: Instagram,
    provider: "Pinterest Inc",
    status: "available",
    monthlyPrice: 0,
    features: ["Product pins", "Shopping ads", "Catalogs", "Pinterest analytics", "Rich pins"],
    websiteUrl: "https://business.pinterest.com",
    setupComplexity: "easy",
    popularityScore: 87
  },
  {
    id: "tiktok-shop",
    name: "TikTok Shop",
    description: "Sell directly on TikTok. Reach Gen Z and millennial shoppers with video commerce.",
    category: "social",
    icon: Smartphone,
    provider: "ByteDance",
    status: "coming-soon",
    monthlyPrice: 0,
    features: ["Live shopping", "Product showcase", "Creator partnerships", "TikTok ads", "Analytics"],
    websiteUrl: "https://www.tiktok.com/business",
    setupComplexity: "moderate",
    popularityScore: 91
  },
  {
    id: "youtube-shopping",
    name: "YouTube Shopping",
    description: "Tag products in your YouTube videos. Drive sales from video content.",
    category: "social",
    icon: Youtube,
    provider: "Google LLC",
    status: "available",
    monthlyPrice: 0,
    features: ["Product tagging", "Live shopping", "Shorts shopping", "Channel store", "Analytics"],
    websiteUrl: "https://www.youtube.com",
    setupComplexity: "easy",
    popularityScore: 83
  },
  {
    id: "linkedin-business",
    name: "LinkedIn Business",
    description: "B2B marketing and lead generation. Connect with professionals and businesses.",
    category: "social",
    icon: Linkedin,
    provider: "LinkedIn Corporation",
    status: "available",
    monthlyPrice: 0,
    features: ["Company page", "LinkedIn Ads", "Lead gen forms", "Analytics", "InMail"],
    websiteUrl: "https://business.linkedin.com",
    setupComplexity: "easy",
    popularityScore: 85
  },
  {
    id: "twitter-business",
    name: "Twitter Ads",
    description: "Promote your products on Twitter. Reach your audience with targeted ads.",
    category: "social",
    icon: Twitter,
    provider: "Twitter Inc",
    status: "available",
    monthlyPrice: 0,
    features: ["Promoted tweets", "Follower campaigns", "Website cards", "Conversion tracking", "Analytics"],
    websiteUrl: "https://business.twitter.com",
    setupComplexity: "easy",
    popularityScore: 80
  }
];

// Category filters
const categories = [
  { id: "all" as IntegrationCategory, name: "All Integrations", icon: Layers },
  { id: "shipping" as IntegrationCategory, name: "Shipping & Logistics", icon: Truck },
  { id: "payment" as IntegrationCategory, name: "Payment Gateways", icon: CreditCard },
  { id: "marketing" as IntegrationCategory, name: "Marketing", icon: TrendingUp },
  { id: "analytics" as IntegrationCategory, name: "Analytics", icon: BarChart3 },
  { id: "communication" as IntegrationCategory, name: "Communication", icon: MessageSquare },
  { id: "social" as IntegrationCategory, name: "Social Commerce", icon: Globe },
  { id: "crm" as IntegrationCategory, name: "CRM Systems", icon: Users },
  { id: "accounting" as IntegrationCategory, name: "Accounting", icon: Receipt },
  { id: "support" as IntegrationCategory, name: "Customer Support", icon: Headphones },
  { id: "reviews" as IntegrationCategory, name: "Reviews & Ratings", icon: Star },
  { id: "inventory" as IntegrationCategory, name: "Inventory Management", icon: Package },
  { id: "seo" as IntegrationCategory, name: "SEO & Optimization", icon: FileText }
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnectedOnly, setShowConnectedOnly] = useState(false);

  // Filter integrations
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConnected = !showConnectedOnly || integration.status === "connected";
    return matchesCategory && matchesSearch && matchesConnected;
  });

  // Stats
  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const availableCount = integrations.filter(i => i.status === "available").length;

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </span>
        );
      case "available":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <Power className="h-3 w-3 mr-1" />
            Available
          </span>
        );
      case "coming-soon":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </span>
        );
    }
  };

  const getComplexityBadge = (complexity: Integration["setupComplexity"]) => {
    const colors = {
      easy: "bg-green-50 text-green-700 border-green-200",
      moderate: "bg-yellow-50 text-yellow-700 border-yellow-200",
      advanced: "bg-red-50 text-red-700 border-red-200"
    };
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[complexity]}`}>
        {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Setup
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Integrations & Apps
              </h1>
              <p className="text-lg text-gray-600">
                Connect your store with powerful third-party services and tools
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Upload className="mr-2 h-4 w-4" />
                Request Integration
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Integrations</p>
                <p className="text-3xl font-bold text-gray-900">{integrations.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Layers className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Connected</p>
                <p className="text-3xl font-bold text-green-600">{connectedCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Available</p>
                <p className="text-3xl font-bold text-blue-600">{availableCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Power className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Sync</p>
                <p className="text-lg font-bold text-gray-900">5 min ago</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Show Connected Only Toggle */}
            <button
              onClick={() => setShowConnectedOnly(!showConnectedOnly)}
              className={`flex items-center px-4 py-2.5 rounded-xl border transition-all ${
                showConnectedOnly
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Connected Only
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      integration.status === "connected" ? "bg-green-100" :
                      integration.status === "available" ? "bg-blue-100" : "bg-gray-100"
                    } group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${
                        integration.status === "connected" ? "text-green-600" :
                        integration.status === "available" ? "text-blue-600" : "text-gray-600"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{integration.name}</h3>
                      <p className="text-sm text-gray-500">{integration.provider}</p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{integration.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {integration.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        <Check className="h-3 w-3 mr-1 text-green-600" />
                        {feature}
                      </span>
                    ))}
                    {integration.features.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-500">
                        +{integration.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4 text-sm">
                    {getComplexityBadge(integration.setupComplexity)}
                    {integration.monthlyPrice !== undefined && (
                      <span className="text-gray-600">
                        {integration.monthlyPrice === 0 ? "Free" : `₹${integration.monthlyPrice}/mo`}
                      </span>
                    )}
                  </div>
                  {integration.lastSync && (
                    <span className="text-xs text-gray-500">
                      Last sync: {integration.lastSync}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {integration.status === "connected" ? (
                    <>
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 border border-red-200">
                        Disconnect
                      </button>
                    </>
                  ) : integration.status === "available" ? (
                    <>
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                        <Zap className="h-4 w-4 mr-2" />
                        Connect Now
                      </button>
                      <a
                        href={integration.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </>
                  ) : (
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed">
                      <Clock className="h-4 w-4 mr-2" />
                      Coming Soon
                    </button>
                  )}
                </div>

                {/* Connected Info */}
                {integration.status === "connected" && integration.apiKey && (
                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-700">API Key:</span>
                      <code className="text-xs font-mono text-green-600">{integration.apiKey}</code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredIntegrations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setShowConnectedOnly(false);
              }}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

