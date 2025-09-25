import { Review, ReviewStats } from "@/types/review";

export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91-98765-43210",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "tablets",
      name: "Healthy Sugar Tablets",
      variant: "100 tablets"
    },
    rating: 5,
    title: "Excellent product for diabetics - Life changing!",
    comment: "Been using this for 3 months now and it's been absolutely amazing. The taste is incredibly close to regular sugar, and my blood sugar levels have been much more stable. My doctor is impressed with the improvement. Highly recommend to anyone managing diabetes or just wanting to reduce sugar intake.",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
        alt: "Healthy Sugar tablets in tea",
        size: 245760,
        type: "image/jpeg"
      },
      {
        id: "img2", 
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        alt: "Blood sugar monitor showing good levels",
        size: 189432,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "google",
        url: "https://maps.google.com/reviews/xyz123",
        verified: true
      },
      {
        platform: "website",
        url: "https://healthysugar.com/reviews/priya-sharma",
        verified: true
      }
    ],
    date: "2024-01-15",
    status: "approved",
    helpful: 24,
    unhelpful: 1,
    verified: true,
    tags: ["diabetes", "excellent-taste", "doctor-approved"],
    source: "website",
    location: "Mumbai, Maharashtra",
    purchaseDate: "2023-10-15"
  },
  {
    id: "2",
    customer: {
      name: "Rajesh Kumar",
      email: "rajesh.k@yahoo.com",
      verified: true
    },
    product: {
      id: "syrup",
      name: "Healthy Sugar Syrup",
      variant: "100ml"
    },
    rating: 4,
    title: "Good alternative to sugar syrup",
    comment: "Works well in cold drinks and desserts. The consistency is perfect and it dissolves easily. Taste is quite good, though slightly different from regular sugar syrup. My family has adapted well to it. Good value for money.",
    images: [
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
        alt: "Syrup being poured into cold drink",
        size: 312456,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "amazon",
        url: "https://amazon.in/reviews/xyz456",
        verified: true
      }
    ],
    date: "2024-01-14",
    status: "approved",
    helpful: 12,
    unhelpful: 2,
    verified: true,
    tags: ["cold-drinks", "good-value"],
    source: "website",
    location: "Delhi, India",
    purchaseDate: "2024-01-01"
  },
  {
    id: "3",
    customer: {
      name: "Anonymous User",
      email: "user@example.com",
      verified: false
    },
    product: {
      id: "powder",
      name: "Healthy Sugar Powder",
      variant: "250g"
    },
    rating: 1,
    title: "Not satisfied with the product",
    comment: "Taste is too artificial and leaves an aftertaste. Not what I expected based on the marketing. The powder doesn't dissolve well in hot beverages. Would not recommend.",
    date: "2024-01-13",
    status: "flagged",
    helpful: 2,
    unhelpful: 8,
    verified: false,
    tags: ["artificial-taste", "poor-dissolution"],
    adminNotes: "Customer may have received defective batch. Follow up required.",
    source: "website",
    location: "Bangalore, Karnataka"
  },
  {
    id: "4",
    customer: {
      name: "Dr. Meera Patel",
      email: "dr.meera@clinic.com",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "sachets",
      name: "Healthy Sugar Sachets",
      variant: "50 sachets"
    },
    rating: 5,
    title: "Perfect for my diabetic patients",
    comment: "As a doctor, I've been recommending this to my diabetic patients for over 6 months. The sachets are convenient for portion control and the stevia blend is excellent. Patients report better glucose control and satisfaction with taste. Clinical results have been very positive.",
    images: [
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        alt: "Doctor's prescription pad with healthy sugar recommendation",
        size: 278901,
        type: "image/jpeg"
      },
      {
        id: "img5",
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        alt: "Patient glucose monitoring results",
        size: 198765,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "google",
        url: "https://maps.google.com/reviews/doctor-meera",
        verified: true
      },
      {
        platform: "social",
        url: "https://linkedin.com/posts/dr-meera-patel-review",
        verified: true
      }
    ],
    date: "2024-01-12",
    status: "approved",
    helpful: 45,
    unhelpful: 0,
    verified: true,
    tags: ["doctor-recommended", "clinical-results", "portion-control"],
    source: "email",
    location: "Pune, Maharashtra",
    purchaseDate: "2023-07-15"
  },
  {
    id: "5",
    customer: {
      name: "Anita Desai",
      email: "anita.desai@gmail.com",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "tablets",
      name: "Healthy Sugar Tablets",
      variant: "200 tablets"
    },
    rating: 4,
    title: "Great for baking, family loves it",
    comment: "I use these tablets for all my baking needs. They work wonderfully in cakes, cookies, and traditional sweets. My family can't tell the difference! The 200-tablet pack is perfect for regular baking. Only wish they were slightly cheaper.",
    images: [
      {
        id: "img6",
        url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        alt: "Homemade cookies made with healthy sugar",
        size: 334567,
        type: "image/jpeg"
      },
      {
        id: "img7",
        url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
        alt: "Traditional Indian sweets made with healthy sugar",
        size: 289123,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "flipkart",
        url: "https://flipkart.com/reviews/anita-desai-123",
        verified: true
      }
    ],
    date: "2024-01-11",
    status: "approved",
    helpful: 18,
    unhelpful: 1,
    verified: true,
    tags: ["baking", "family-approved", "traditional-sweets"],
    source: "website",
    location: "Ahmedabad, Gujarat",
    purchaseDate: "2023-12-20"
  },
  {
    id: "6",
    customer: {
      name: "Rohit Singh",
      email: "rohit.singh@tech.com",
      verified: true
    },
    product: {
      id: "syrup",
      name: "Healthy Sugar Syrup",
      variant: "250ml"
    },
    rating: 3,
    title: "Decent product but room for improvement",
    comment: "The syrup works okay for my morning coffee and smoothies. Taste is acceptable but not exceptional. Packaging could be better - the bottle is a bit difficult to pour from. Price point is reasonable for the health benefits.",
    date: "2024-01-10",
    status: "approved",
    helpful: 8,
    unhelpful: 3,
    verified: true,
    tags: ["coffee", "smoothies", "packaging-issues"],
    source: "website",
    location: "Hyderabad, Telangana",
    purchaseDate: "2024-01-05"
  },
  {
    id: "7",
    customer: {
      name: "Kavya Nair",
      email: "kavya.nair@design.com",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "powder",
      name: "Healthy Sugar Powder",
      variant: "500g"
    },
    rating: 5,
    title: "Perfect for my café - customers love it!",
    comment: "I run a small health café and switched to this powder 4 months ago. Customers have been very positive about the taste in our beverages and desserts. It's been great for our 'healthy options' menu. Bulk pricing is reasonable and quality is consistent.",
    images: [
      {
        id: "img8",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
        alt: "Café menu featuring healthy sugar options",
        size: 256789,
        type: "image/jpeg"
      },
      {
        id: "img9",
        url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
        alt: "Happy customers at café",
        size: 298456,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "google",
        url: "https://maps.google.com/reviews/kavya-cafe",
        verified: true
      },
      {
        platform: "social",
        url: "https://instagram.com/healthycafe/posts/review",
        verified: true
      }
    ],
    date: "2024-01-09",
    status: "approved",
    helpful: 32,
    unhelpful: 0,
    verified: true,
    tags: ["business-use", "customer-approved", "consistent-quality"],
    source: "phone",
    location: "Kochi, Kerala",
    purchaseDate: "2023-09-15"
  },
  {
    id: "8",
    customer: {
      name: "Amit Gupta",
      email: "amit.gupta@fitness.com",
      verified: true
    },
    product: {
      id: "sachets",
      name: "Healthy Sugar Sachets",
      variant: "100 sachets"
    },
    rating: 4,
    title: "Great for my fitness clients",
    comment: "As a fitness trainer, I recommend this to clients who want to reduce sugar but still enjoy sweet drinks. The sachets are perfect for gym bags and the stevia blend doesn't spike blood sugar. Most clients adapt to the taste within a week.",
    images: [
      {
        id: "img10",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        alt: "Fitness client using sachets in protein shake",
        size: 267890,
        type: "image/jpeg"
      }
    ],
    date: "2024-01-08",
    status: "approved",
    helpful: 15,
    unhelpful: 2,
    verified: true,
    tags: ["fitness", "no-spike", "portable"],
    source: "website",
    location: "Gurgaon, Haryana",
    purchaseDate: "2023-11-20"
  },
  {
    id: "9",
    customer: {
      name: "Sunita Rao",
      email: "sunita.rao@home.com",
      verified: false
    },
    product: {
      id: "tablets",
      name: "Healthy Sugar Tablets",
      variant: "100 tablets"
    },
    rating: 2,
    title: "Tablets don't dissolve properly in cold drinks",
    comment: "While the taste is okay in hot beverages, the tablets take forever to dissolve in cold drinks. Sometimes they leave undissolved bits at the bottom. Not ideal for iced teas or cold coffees.",
    date: "2024-01-07",
    status: "pending",
    helpful: 5,
    unhelpful: 12,
    verified: false,
    tags: ["dissolution-issues", "cold-drinks"],
    adminNotes: "Need to investigate dissolution rate in cold liquids",
    source: "website",
    location: "Chennai, Tamil Nadu"
  },
  {
    id: "10",
    customer: {
      name: "Vikram Malhotra",
      email: "vikram.m@corp.com",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "syrup",
      name: "Healthy Sugar Syrup",
      variant: "500ml"
    },
    rating: 5,
    title: "Bulk order for office pantry - huge hit!",
    comment: "Ordered the 500ml bottles for our office pantry. Everyone loves it in their tea and coffee. It's been 2 months and we've seen a significant reduction in regular sugar consumption across the team. Planning to make this a permanent switch.",
    images: [
      {
        id: "img11",
        url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop",
        alt: "Office pantry with healthy sugar syrup",
        size: 234567,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "website",
        url: "https://healthysugar.com/corporate-reviews/vikram",
        verified: true
      }
    ],
    date: "2024-01-06",
    status: "approved",
    helpful: 28,
    unhelpful: 0,
    verified: true,
    tags: ["bulk-order", "office-use", "team-approved"],
    source: "email",
    location: "Noida, Uttar Pradesh",
    purchaseDate: "2023-11-01"
  },
  {
    id: "11",
    customer: {
      name: "Ravi Krishnan",
      email: "ravi.k@startup.com",
      verified: true
    },
    product: {
      id: "powder",
      name: "Healthy Sugar Powder",
      variant: "1kg"
    },
    rating: 4,
    title: "Excellent for large family, good value",
    comment: "We're a joint family of 12 people and go through a lot of sugar. This 1kg pack lasts us almost 2 months with regular use. Everyone from kids to grandparents has adapted well. The powder works great in all Indian cooking and beverages.",
    date: "2024-01-05",
    status: "approved",
    helpful: 22,
    unhelpful: 1,
    verified: true,
    tags: ["large-family", "indian-cooking", "long-lasting"],
    source: "website",
    location: "Coimbatore, Tamil Nadu",
    purchaseDate: "2023-12-01"
  },
  {
    id: "12",
    customer: {
      name: "Neha Agarwal",
      email: "neha.agarwal@wellness.com",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    product: {
      id: "sachets",
      name: "Healthy Sugar Sachets",
      variant: "25 sachets"
    },
    rating: 5,
    title: "Perfect trial pack - now a regular customer",
    comment: "Started with the 25-sachet trial pack to test with my family. We were so impressed that I've now ordered the 100-sachet pack. The convenience and portion control is perfect. My kids use it in their milk and cereals without any complaints.",
    images: [
      {
        id: "img12",
        url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
        alt: "Kids enjoying cereal with healthy sugar",
        size: 245678,
        type: "image/jpeg"
      }
    ],
    exportLinks: [
      {
        platform: "amazon",
        url: "https://amazon.in/reviews/neha-trial-pack",
        verified: true
      }
    ],
    date: "2024-01-04",
    status: "approved",
    helpful: 19,
    unhelpful: 0,
    verified: true,
    tags: ["trial-pack", "kids-approved", "repeat-customer"],
    source: "website",
    location: "Jaipur, Rajasthan",
    purchaseDate: "2023-12-15"
  }
];

export const REVIEW_STATS: ReviewStats = {
  total: 445,
  approved: 398,
  pending: 32,
  flagged: 12,
  rejected: 3,
  averageRating: 4.6,
  ratingDistribution: {
    5: 267,
    4: 131,
    3: 31,
    2: 12,
    1: 4
  },
  verifiedPurchases: 389,
  withImages: 156,
  withExportLinks: 234
};
