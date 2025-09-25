export interface AdminProduct {
  // Basic Information
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string; // blurb
  quantityUnit: QuantityUnit;
  
  // Categorization
  category: ProductCategory;
  subCategory: string;
  labels: ProductLabel[];
  tags: string[];
  
  // Pricing & Variants
  basePrice: number;
  originalPrice?: number;
  discount?: number;
  variants: ProductVariant[];
  bulkPricing?: BulkPricing[];
  
  // Media
  primaryImage: ProductImage;
  galleryImages: ProductImage[]; // Up to 5 images
  banners: ProductBanner[]; // 2x banners
  
  // Product Details
  features: string[];
  ingredients: string[];
  nutritionFacts: NutritionFact[];
  usageInstructions: string[];
  benefits: string[];
  
  // Inventory
  sku: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorders: boolean;
  
  // Shipping
  weight: number; // in grams
  dimensions: ProductDimensions;
  shippingClass: ShippingClass;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  
  // Status & Visibility
  status: ProductStatus;
  visibility: ProductVisibility;
  featured: boolean;
  
  // Ratings & Reviews
  rating: number;
  reviewCount: number;
  
  // Certifications & Badges
  certifications: Certification[];
  badges: ProductBadge[];
  
  // Coupons
  availableCoupons: ProductCoupon[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "200 tablets"
  sku: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  weight?: number;
  badge?: "Most Popular" | "Best Value" | "Limited Edition";
  isDefault?: boolean;
  quantityValue: number; // e.g., 200 for "200 tablets"
  quantityUnit: QuantityUnit; // e.g., "pieces" for tablets
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  sortOrder: number;
}

export interface ProductBanner {
  id: string;
  type: "primary" | "secondary";
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  icon?: string;
  image?: string;
  position: "left" | "right";
}

export interface NutritionFact {
  name: string;
  value: string;
  unit: string;
  dailyValue?: string;
}

export interface ProductDimensions {
  length: number; // cm
  width: number;  // cm
  height: number; // cm
}

export interface BulkPricing {
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  discountPercentage?: number;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  image?: string;
  verificationUrl?: string;
}

export interface ProductCoupon {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  color: "green" | "blue" | "purple" | "orange" | "red";
}

// Enums and Types
export type ProductCategory = 
  | "Sweeteners"
  | "Health Supplements" 
  | "Diabetic Care"
  | "Natural Products"
  | "Organic Foods";

export type ProductLabel = 
  | "New Arrival"
  | "Best Seller"
  | "Limited Edition"
  | "Organic"
  | "Sugar-Free"
  | "Diabetic Friendly"
  | "Zero Calorie"
  | "Natural"
  | "Vegan"
  | "Gluten-Free";

export type ProductStatus = 
  | "draft"
  | "active"
  | "inactive"
  | "discontinued"
  | "out_of_stock";

export type ProductVisibility = 
  | "public"
  | "private"
  | "password_protected"
  | "members_only";

export type ShippingClass = 
  | "standard"
  | "express"
  | "fragile"
  | "heavy"
  | "liquid";

export type ProductBadge = 
  | "Best Seller"
  | "New"
  | "Limited Edition"
  | "Premium"
  | "Eco-Friendly"
  | "Doctor Recommended";

export type QuantityUnit = 
  | "pieces"
  | "tablets"
  | "capsules"
  | "grams"
  | "kilograms"
  | "milliliters"
  | "liters"
  | "ounces"
  | "pounds"
  | "sachets"
  | "sticks"
  | "bottles"
  | "boxes"
  | "packs";

// Form Data Types
export interface ProductFormData extends Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}
