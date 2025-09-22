import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  { 
    id: "tablets", 
    name: "Healthy Sugar Tablets", 
    pack: "100 tablets", 
    price: 299, 
    badge: "Best Seller", 
    rating: 4.7, 
    reviewCount: 127,
    blurb: "Instantly sweetens tea & coffee.", 
    image: { 
      src: "/images/products/tablets.svg", 
      alt: "Healthy Sugar tablets, 100 nos" 
    }, 
    brand: "The Healthy Sugar Company" 
  },
  { 
    id: "syrup", 
    name: "Healthy Sugar Syrup", 
    pack: "100 ml", 
    price: 499, 
    rating: 4.6, 
    reviewCount: 89,
    blurb: "Perfect for cold drinks & desserts.", 
    image: { 
      src: "/images/products/syrup.svg", 
      alt: "Healthy Sugar syrup bottle, 100 ml" 
    }, 
    brand: "The Healthy Sugar Company" 
  },
  { 
    id: "powder", 
    name: "Healthy Sugar Powder", 
    pack: "100 g", 
    price: 299, 
    rating: 4.5, 
    reviewCount: 156,
    blurb: "Measure & mix for baking.", 
    image: { 
      src: "/images/products/powder.svg", 
      alt: "Healthy Sugar powder pack, 100 g" 
    }, 
    brand: "The Healthy Sugar Company" 
  },
  { 
    id: "sachets", 
    name: "Healthy Sugar Sachets", 
    pack: "30 sticks", 
    price: 299, 
    rating: 4.4, 
    reviewCount: 73,
    blurb: "Precise dose, on the go.", 
    image: { 
      src: "/images/products/sachets.svg", 
      alt: "Healthy Sugar sachets box, 30 sticks" 
    }, 
    brand: "The Healthy Sugar Company" 
  },
];
