import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  { 
    id: "tablets", 
    name: "Healthy Sugar Tablets", 
    pack: "100 tablets", 
    price: 299, 
    variants: [
      {
        id: "tablets-200",
        pack: "200 tablets",
        price: 549,
        originalPrice: 598,
        discount: 8,
        badge: "Most Popular"
      },
      {
        id: "tablets-500",
        pack: "500 tablets",
        price: 1299,
        originalPrice: 1495,
        discount: 13,
        badge: "Best Value"
      }
    ],
    badge: "Best Seller", 
    rating: 4.7, 
    reviewCount: 127,
    blurb: "Instantly sweetens tea & coffee.", 
    image: { 
      src: "/images/products/tablets.svg", 
      alt: "Healthy Sugar tablets, 100 nos" 
    },
    images: [
      { src: "/images/products/tablets.svg", alt: "Healthy Sugar tablets front view" },
      { src: "/images/products/tablets.svg", alt: "Healthy Sugar tablets back label" },
      { src: "/images/products/tablets.svg", alt: "Healthy Sugar tablets in use" },
      { src: "/images/products/tablets.svg", alt: "Healthy Sugar tablets ingredients" },
      { src: "/images/products/tablets.svg", alt: "Healthy Sugar tablets lifestyle shot" }
    ],
    brand: "The Healthy Sugar Company",
    coupons: [
      {
        code: "FIRST10",
        description: "Get 10% off on your first order",
        color: "green"
      },
      {
        code: "HEALTHY20",
        description: "Save ₹20 on orders above ₹500",
        color: "blue"
      },
      {
        code: "BULK15",
        description: "15% off on bulk orders above ₹1000",
        color: "purple"
      }
    ]
  },
  { 
    id: "syrup", 
    name: "Healthy Sugar Syrup", 
    pack: "100 ml", 
    price: 499, 
    variants: [
      {
        id: "syrup-250",
        pack: "250 ml",
        price: 1149,
        originalPrice: 1247,
        discount: 8,
        badge: "Most Popular"
      },
      {
        id: "syrup-500",
        pack: "500 ml",
        price: 2199,
        originalPrice: 2495,
        discount: 12,
        badge: "Best Value"
      }
    ],
    rating: 4.6, 
    reviewCount: 89,
    blurb: "Perfect for cold drinks & desserts.", 
    image: { 
      src: "/images/products/syrup.svg", 
      alt: "Healthy Sugar syrup bottle, 100 ml" 
    },
    images: [
      { src: "/images/products/syrup.svg", alt: "Healthy Sugar syrup bottle front" },
      { src: "/images/products/syrup.svg", alt: "Healthy Sugar syrup bottle back" },
      { src: "/images/products/syrup.svg", alt: "Healthy Sugar syrup in drink" },
      { src: "/images/products/syrup.svg", alt: "Healthy Sugar syrup ingredients" },
      { src: "/images/products/syrup.svg", alt: "Healthy Sugar syrup lifestyle" }
    ],
    brand: "The Healthy Sugar Company",
    coupons: [
      {
        code: "SWEET15",
        description: "15% off on syrup orders",
        color: "orange"
      },
      {
        code: "HEALTHY20",
        description: "Save ₹20 on orders above ₹500",
        color: "blue"
      }
    ]
  },
  { 
    id: "powder", 
    name: "Healthy Sugar Powder", 
    pack: "100 g", 
    price: 299, 
    variants: [
      {
        id: "powder-250",
        pack: "250 g",
        price: 699,
        originalPrice: 747,
        discount: 6,
        badge: "Most Popular"
      },
      {
        id: "powder-500",
        pack: "500 g",
        price: 1299,
        originalPrice: 1495,
        discount: 13,
        badge: "Best Value"
      }
    ],
    rating: 4.5, 
    reviewCount: 156,
    blurb: "Measure & mix for baking.", 
    image: { 
      src: "/images/products/powder.svg", 
      alt: "Healthy Sugar powder pack, 100 g" 
    },
    images: [
      { src: "/images/products/powder.svg", alt: "Healthy Sugar powder pack front" },
      { src: "/images/products/powder.svg", alt: "Healthy Sugar powder pack back" },
      { src: "/images/products/powder.svg", alt: "Healthy Sugar powder in baking" },
      { src: "/images/products/powder.svg", alt: "Healthy Sugar powder texture" },
      { src: "/images/products/powder.svg", alt: "Healthy Sugar powder lifestyle" }
    ],
    brand: "The Healthy Sugar Company",
    coupons: [
      {
        code: "BAKE10",
        description: "10% off on baking essentials",
        color: "green"
      },
      {
        code: "HEALTHY20",
        description: "Save ₹20 on orders above ₹500",
        color: "blue"
      }
    ]
  },
  { 
    id: "sachets", 
    name: "Healthy Sugar Sachets", 
    pack: "30 sticks", 
    price: 299, 
    variants: [
      {
        id: "sachets-60",
        pack: "60 sticks",
        price: 549,
        originalPrice: 598,
        discount: 8,
        badge: "Most Popular"
      },
      {
        id: "sachets-120",
        pack: "120 sticks",
        price: 999,
        originalPrice: 1196,
        discount: 16,
        badge: "Best Value"
      }
    ],
    rating: 4.4, 
    reviewCount: 73,
    blurb: "Precise dose, on the go.", 
    image: { 
      src: "/images/products/sachets.svg", 
      alt: "Healthy Sugar sachets box, 30 sticks" 
    },
    images: [
      { src: "/images/products/sachets.svg", alt: "Healthy Sugar sachets box front" },
      { src: "/images/products/sachets.svg", alt: "Healthy Sugar sachets box back" },
      { src: "/images/products/sachets.svg", alt: "Healthy Sugar sachets individual" },
      { src: "/images/products/sachets.svg", alt: "Healthy Sugar sachets in use" },
      { src: "/images/products/sachets.svg", alt: "Healthy Sugar sachets lifestyle" }
    ],
    brand: "The Healthy Sugar Company",
    coupons: [
      {
        code: "TRAVEL10",
        description: "10% off on travel-friendly packs",
        color: "purple"
      },
      {
        code: "HEALTHY20",
        description: "Save ₹20 on orders above ₹500",
        color: "blue"
      }
    ]
  },
];
