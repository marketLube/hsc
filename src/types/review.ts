export interface ReviewImage {
  id: string;
  url: string;
  alt: string;
  size: number; // in bytes
  type: string; // mime type
}

export interface ReviewExportLink {
  platform: 'google' | 'amazon' | 'flipkart' | 'website' | 'social';
  url: string;
  verified: boolean;
}

export interface Review {
  id: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    verified: boolean;
    avatar?: string;
  };
  product: {
    id: string;
    name: string;
    variant?: string;
  };
  rating: number; // 1-5
  title: string;
  comment: string;
  images?: ReviewImage[];
  exportLinks?: ReviewExportLink[];
  date: string;
  status: 'approved' | 'pending' | 'flagged' | 'rejected';
  helpful: number;
  unhelpful: number;
  verified: boolean; // verified purchase
  tags?: string[];
  adminNotes?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  source: 'website' | 'email' | 'phone' | 'social' | 'import';
  location?: string;
  purchaseDate?: string;
}

export interface ReviewStats {
  total: number;
  approved: number;
  pending: number;
  flagged: number;
  rejected: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verifiedPurchases: number;
  withImages: number;
  withExportLinks: number;
}

export interface ReviewFilters {
  search?: string;
  productId?: string;
  status?: Review['status'] | 'all';
  rating?: number | 'all';
  verified?: boolean | 'all';
  hasImages?: boolean | 'all';
  hasExportLinks?: boolean | 'all';
  source?: Review['source'] | 'all';
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

export type ReviewSortBy = 'date' | 'rating' | 'helpful' | 'customer' | 'product';
export type ReviewSortOrder = 'asc' | 'desc';
