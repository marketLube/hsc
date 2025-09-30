import { BannerSlide, BannerTile, Testimonial, UseCase } from "@/types/product";

export const HERO_SLIDES: BannerSlide[] = [
  {
    id: "slide-1",
    title: "Sweetness without the sacrifice.",
    subtitle: "Sugar-like taste, stevia-powered. Starts at ₹299.",
    image: "/images/hero-1.png",
    cta1: { text: "Shop Bestsellers", href: "#products" },
    cta2: { text: "See All Formats", href: "#products" }
  },
  {
    id: "slide-2", 
    title: "For your healthy-lifestyle goals.",
    subtitle: "Make better choices daily—tablets, syrup, powder, sachets.",
    image: "/images/hero-2.png",
    cta1: { text: "Build Your Kit", href: "#products" },
    cta2: { text: "Why Stevia", href: "#science" }
  },
  {
    id: "slide-3",
    title: "Taste you love, balance you want.",
    subtitle: "Plant-based sweetness that fits tea, coffee, and baking.",
    image: "/images/hero-3.png",
    cta1: { text: "Shop Now", href: "#products" },
    cta2: { text: "Learn the Science", href: "#science" }
  }
];

export const BANNER_TILES: BannerTile[] = [
  {
    id: "sweetness",
    title: "Sweetness without compromise",
    subtitle: "Enjoy sweetness without giving up taste.",
    image: "/images/banners/sweetness.svg"
  },
  {
    id: "diabetes-friendly",
    title: "Diabetes-friendly choice†",
    subtitle: "Supports low-sugar habits.",
    image: "/images/banners/diabetes-friendly.svg"
  },
  {
    id: "affordable",
    title: "Affordable everyday",
    subtitle: "Quality sweetness from ₹299.",
    image: "/images/banners/affordable.svg"
  },
  {
    id: "stevia-benefits",
    title: "Stevia benefits",
    subtitle: "From the leaf, not the lab.",
    image: "/images/banners/stevia-benefits.svg"
  },
  {
    id: "four-formats",
    title: "Four easy formats",
    subtitle: "Tablets • Syrup • Powder • Sachets.",
    image: "/images/banners/four-formats.svg"
  },
  {
    id: "routine",
    title: "Your routine, simplified",
    subtitle: "Home or travel—always ready.",
    image: "/images/banners/routine.svg"
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: "tea",
    name: "Tea",
    description: "Perfect sweetness for your daily chai or green tea",
    products: ["tablets", "sachets"]
  },
  {
    id: "coffee",
    name: "Coffee",
    description: "Enhance your coffee without the sugar crash",
    products: ["tablets", "syrup", "sachets"]
  },
  {
    id: "baking",
    name: "Baking",
    description: "Heat-stable sweetness for all your baking needs",
    products: ["powder", "syrup"]
  },
  {
    id: "smoothies",
    name: "Smoothies",
    description: "Natural sweetness that blends perfectly with fruits and vegetables",
    products: ["syrup", "powder"]
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Create guilt-free desserts without compromising on taste",
    products: ["powder", "syrup", "tablets"]
  },
  {
    id: "yogurt",
    name: "Yogurt",
    description: "Transform plain yogurt into a delicious healthy treat",
    products: ["tablets", "syrup", "sachets"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Priya Sharma",
    avatar: "/images/testimonial-1.svg",
    rating: 5,
    text: "Finally found a sugar alternative that actually tastes good! My family can't tell the difference.",
    location: "Mumbai"
  },
  {
    id: "testimonial-2", 
    name: "Rajesh Kumar",
    avatar: "/images/testimonial-2.svg",
    rating: 5,
    text: "As a diabetic, this has been a game-changer. I can enjoy my chai guilt-free now.",
    location: "Delhi"
  },
  {
    id: "testimonial-3",
    name: "Anita Patel",
    avatar: "/images/testimonial-3.svg", 
    rating: 4,
    text: "Love the sachets for travel. Perfect portion size and so convenient to carry.",
    location: "Bangalore"
  },
  {
    id: "testimonial-4",
    name: "Vikram Singh",
    avatar: "/images/testimonial-1.svg",
    rating: 5,
    text: "Meri wife ko diabetes hai, but ab wo apni morning tea enjoy kar sakti hai. Taste bilkul sugar jaisa hai!",
    location: "Jaipur"
  },
  {
    id: "testimonial-5",
    name: "Meera Nair",
    avatar: "/images/testimonial-2.svg",
    rating: 5,
    text: "I was skeptical at first, but this stevia powder works perfectly in my South Indian filter coffee. No bitter aftertaste at all!",
    location: "Chennai"
  },
  {
    id: "testimonial-6",
    name: "Arjun Reddy",
    avatar: "/images/testimonial-3.svg",
    rating: 4,
    text: "Been using it for 3 months now. My HbA1c levels have improved and I don't miss regular sugar anymore.",
    location: "Hyderabad"
  },
  {
    id: "testimonial-7",
    name: "Kavita Joshi",
    avatar: "/images/testimonial-1.svg",
    rating: 5,
    text: "Perfect for my weight loss journey! I can still enjoy my evening chai without any guilt. Highly recommended!",
    location: "Pune"
  },
  {
    id: "testimonial-8",
    name: "Rohit Gupta",
    avatar: "/images/testimonial-2.svg",
    rating: 4,
    text: "The tablets are so convenient for office use. Just drop one in my tea and it's perfectly sweet. Great product!",
    location: "Gurgaon"
  },
  {
    id: "testimonial-9",
    name: "Sunita Devi",
    avatar: "/images/testimonial-3.svg",
    rating: 5,
    text: "Mere bachche bhi ise pasand karte hain. Ab ghar mein sirf yahi use karte hain. Health ke liye bahut accha hai.",
    location: "Lucknow"
  },
  {
    id: "testimonial-10",
    name: "Karthik Menon",
    avatar: "/images/testimonial-1.svg",
    rating: 4,
    text: "Works great in my protein shakes and smoothies. No weird aftertaste like other artificial sweeteners. Will definitely reorder!",
    location: "Kochi"
  }
];

export const USP_ITEMS = [
  "Zero Added Sugar",
  "Plant-Based Stevia", 
  "Low Glycemic Impact†",
  "Affordable From ₹299",
  "Made in India"
];

export const NOTICE_MESSAGES = [
  "Flat 5% OFF on first order | Use code WELCOME5",
  "Free shipping on orders over ₹999",
  "New customer? Get 10% OFF | Use code NEW10"
];
