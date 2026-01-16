/**
 * Global Type Definitions
 * Zentrale Stelle für alle TypeScript-Typen
 */

// ===== USER TYPES =====
export type UserRole = 'normal' | 'business' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

// ===== BUSINESS TYPES =====
export type SubscriptionTier = 'basic' | 'premium'

export interface BusinessProfile {
  id: string
  user_id: string
  name: string
  slug: string
  description: string
  website?: string
  phone?: string
  email?: string
  logo_url?: string
  category_ids: string[]
  subscription_tier: SubscriptionTier
  premium_expires_at?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface BusinessData extends BusinessProfile {
  user?: User
  events?: Event[]
  ratings?: Rating[]
}

// ===== CATEGORY TYPES =====
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  parent_id?: string
  created_at: string
}

// ===== EVENT TYPES =====
export interface Event {
  id: string
  business_id: string
  title: string
  description: string
  date_start: string
  date_end: string
  location: string
  address?: string
  latitude?: number
  longitude?: number
  image_url?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

// ===== RATINGS TYPES =====
export interface Rating {
  id: string
  business_id: string
  user_id: string
  score: number // 1-5
  comment?: string
  is_verified: boolean
  created_at: string
}

// ===== MESSAGE TYPES =====
export interface Message {
  id: string
  to_business_id: string
  from_email: string
  from_name?: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface PremiumInquiry {
  id: string
  business_id: string
  form_data: Record<string, string>
  is_read: boolean
  created_at: string
}

// ===== PAYMENT TYPES =====
export type PaymentType = 'premium_subscription' | 'ad_slot' | 'other'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

export interface Payment {
  id: string
  business_id: string
  type: PaymentType
  amount: number
  currency: string
  status: PaymentStatus
  stripe_id?: string
  paypal_id?: string
  created_at: string
  updated_at: string
}

// ===== AD SLOT TYPES =====
export type AdSlotPosition = 'hero' | 'sidebar' | 'directory_top' | 'profile_footer' | 'search_top'

export interface AdSlot {
  id: string
  position: AdSlotPosition
  name: string
  monthly_price: number
  is_available: boolean
  booked_until?: string
  business_id?: string
  created_at: string
  updated_at: string
}

export interface AdSlotBooking {
  id: string
  ad_slot_id: string
  business_id: string
  booked_from: string
  booked_until: string
  payment_id: string
  created_at: string
}

// ===== BLOG TYPES =====
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author_id: string
  category: string
  cover_image_url?: string
  seo_meta: {
    meta_description: string
    keywords: string[]
  }
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

// ===== REGIONAL CONFIG =====
export interface RegionalConfig {
  region: string
  primary_color: string
  secondary_color: string
  accent_color: string
  font_family_serif: string
  font_family_sans: string
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total?: number
  page?: number
  pageSize?: number
  hasMore?: boolean
  pagination?: {
    total: number
    limit: number
    offset: number
  }
}

// ===== SEARCH TYPES =====
export interface SearchFilters {
  query?: string
  categoryId?: string
  region?: string
  subscriptionTier?: SubscriptionTier
  sortBy?: 'relevance' | 'newest' | 'popular'
  page?: number
  pageSize?: number
}

export interface SearchResult {
  id: string
  name: string
  description: string
  category: string
  rating?: number
  image_url?: string
  relevance_score: number
}
