export type ProductVariant = {
  id: string;
  pack: string;             // e.g., "100 tablets", "200 tablets"
  price: number;            // INR (e.g., 299)
  originalPrice?: number;   // Original price for discount calculation
  discount?: number;        // Discount percentage
  badge?: "Best Value" | "Most Popular";
};

export type Product = {
  id: string;
  name: "Healthy Sugar Tablets" | "Healthy Sugar Syrup" | "Healthy Sugar Powder" | "Healthy Sugar Sachets";
  pack: string;             // e.g., "100 tablets", "100 ml" (default variant)
  price: number;            // INR (e.g., 299) (default variant price)
  variants?: ProductVariant[]; // Additional quantity variants
  badge?: "Best Seller" | "New";
  rating: number;           // 0..5
  reviewCount?: number;     // number of reviews
  blurb: string;            // one-line benefit
  image: { src: string; alt: string; blurDataURL?: string };
  images?: { src: string; alt: string; blurDataURL?: string }[]; // Gallery images (5 images)
  brand?: "The Healthy Sugar Company";
  coupons?: {
    code: string;
    description: string;
    color: "green" | "blue" | "purple" | "orange";
  }[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type UseCase = {
  id: string;
  name: "Tea" | "Coffee" | "Baking" | "Smoothies" | "Desserts" | "Yogurt";
  description: string;
  products: string[]; // product IDs
};

export type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location?: string;
};

export type BannerSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta1: { text: string; href: string };
  cta2: { text: string; href: string };
};

export type BannerTile = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
};
