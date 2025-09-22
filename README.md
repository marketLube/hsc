# The Healthy Sugar Company - Homepage

A premium, responsive single homepage for a stevia-based sweetener brand built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### Design & UI
- **Modern, minimal, elegant design** with Poppins font (thin + bold mix)
- **Vibrant red theme** (#e7404a) with premium aesthetics
- **Fully responsive** design optimized for all devices
- **Smooth animations** with Framer Motion (respects `prefers-reduced-motion`)
- **Premium shadows and rounded corners** for modern feel

### Navigation
- **Floating curved navbar** with pill/rounded container
- **Sticky navigation** with subtle shrink on scroll
- **Cart functionality** with badge and local storage persistence
- **Dismissible notice bar** with rotating promotional messages

### Content Sections
1. **Hero Carousel** - 3 full-screen slides with autoplay, pause on hover, keyboard navigation
2. **USP Strip** - Compact benefit chips highlighting key features
3. **Banner Grid** - 6 promotional tiles showcasing benefits
4. **Product Grid** - 4 product cards with hover effects and add-to-cart functionality
5. **Use Cases** - Interactive tabs for Tea, Coffee, and Baking scenarios
6. **Stevia Science** - Educational section with benefits and research
7. **Testimonials** - Rotating customer reviews with auto-play
8. **Newsletter Signup** - Email collection with validation and success states
9. **Footer** - Comprehensive links, social media, and legal information

### Products
- **Healthy Sugar Tablets** (100 nos) - ₹299
- **Healthy Sugar Syrup** (100 ml) - ₹499  
- **Healthy Sugar Powder** (100 g) - ₹299
- **Healthy Sugar Sachets** (30 sticks) - ₹299

### Technical Features
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** with custom design tokens
- **Static Site Generation (SSG)** for optimal performance
- **SEO optimized** with comprehensive metadata and Schema.org markup
- **Accessibility compliant** with ARIA labels and keyboard navigation
- **Performance optimized** with lazy loading and image optimization
- **Indian currency formatting** (₹) with proper digit grouping

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd healthy-sugar-home

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎨 Design Tokens

### Colors
- **Brand Primary**: #e7404a (Vibrant red)
- **Brand Foreground**: #F5F7F6 (Off-white background)
- **Text**: #0F1E1E (Dark ink)
- **Accent**: #C5A46D (Gold highlights)
- **Muted**: #E7ECEA (Light gray)

### Typography
- **Font**: Poppins (300, 400, 600, 700 weights)
- **H1**: 56px/64px, 700 weight, -0.02em tracking
- **H2**: 36px/44px, 700 weight
- **H3**: 24px/32px, 600 weight
- **Body**: 16px/26px, 400 weight

### Layout
- **Container**: max-width 1200px with responsive padding
- **Border Radius**: xl (20px), 2xl (28px)
- **Shadow**: Premium soft shadow (0 8px 30px rgba(0,0,0,0.08))

## 📱 Responsive Design

- **Mobile First** approach with progressive enhancement
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grid system** adapting from 1 to 4 columns
- **Touch-friendly** interactions and hover states

## ♿ Accessibility

- **WCAG 2.1 AA compliant** with 4.5:1 contrast ratios
- **Semantic HTML** with proper heading hierarchy
- **ARIA labels** and roles for interactive elements
- **Keyboard navigation** support throughout
- **Screen reader friendly** with descriptive alt text
- **Focus management** with visible focus indicators

## 🔍 SEO & Performance

### SEO Features
- **Comprehensive metadata** with Open Graph and Twitter Cards
- **Schema.org markup** for products and organization
- **Semantic HTML structure** with proper headings
- **Optimized images** with descriptive alt text
- **Clean URLs** and navigation structure

### Performance Optimizations
- **Image optimization** with Next.js Image component
- **Lazy loading** for non-critical images
- **Font optimization** with next/font
- **Tree shaking** for minimal bundle size
- **Static generation** for fast loading

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Poppins (Google Fonts)
- **Image Handling**: Next.js Image component
- **State Management**: React hooks + localStorage

## 📦 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage component
│   └── globals.css        # Global styles and design tokens
├── components/            # Reusable UI components
│   ├── BannerCarousel.tsx # Hero carousel with autoplay
│   ├── BannerGrid.tsx     # Promotional tiles grid
│   ├── FloatingNav.tsx    # Sticky navigation bar
│   ├── ProductGrid.tsx    # Product showcase
│   ├── Testimonials.tsx   # Customer reviews
│   └── ...               # Other components
├── lib/                   # Utility functions and data
│   ├── currency.ts        # INR formatting utilities
│   ├── data.ts           # Static content data
│   ├── products.ts       # Product information
│   └── utils.ts          # General utilities
└── types/                 # TypeScript type definitions
    └── product.ts         # Product and related types
```

## 🎯 Brand Positioning

- **Target Audience**: Health-conscious consumers, diabetes management, modern families
- **Value Proposition**: Sugar-like taste without compromise, plant-based, affordable
- **Tone**: Conversational yet professional, clear, friendly, trustworthy
- **Benefits**: Zero added sugar, low glycemic impact, heat stable, made in India

## 📄 Compliance & Legal

- **Disclaimer**: Includes proper health disclaimers for stevia claims
- **Privacy**: Privacy policy and consent notices for newsletter
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score targets ≥90 across all metrics

## 🚀 Deployment

The project is configured for static export and can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

```bash
# Build for static export
npm run build
```

## 📞 Support

For questions or support, contact:
- **Email**: hello@healthysugar.com
- **Phone**: +91 98765 43210
- **Location**: Mumbai, Maharashtra, India

---

Built with ❤️ for The Healthy Sugar Company