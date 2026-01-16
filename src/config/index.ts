/**
 * Configuration File
 * Zentrale Stelle für alle App-Konfigurationen
 */

// ===== APP CONFIG =====
export const APP_NAME = 'Rheingau Portal'
export const APP_DESCRIPTION = 'Dein lokales Verzeichnis für Unternehmen, Events und Dienstleistungen'

// ===== URLS =====
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ===== PAYMENT CONFIG =====
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
}

export const PREMIUM_PRICE = 49 // EUR per month
export const PREMIUM_STRIPE_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID

export const AD_SLOT_PRICES = {
  hero: 199,
  sidebar: 99,
  directory_top: 149,
  profile_footer: 79,
  search_top: 199,
} as const

// ===== PAGINATION =====
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// ===== DESIGN TOKENS =====
export const COLORS = {
  primary: '#2D5016', // Tiefes Grün
  secondary: '#D4A574', // Warmgold
  accent: '#E8B44F', // Helles Gold
  light: '#F5F5F5',
  dark: '#1a1a1a',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
}

export const TYPOGRAPHY = {
  fontSans: 'system-ui, -apple-system, sans-serif',
  fontSerif: 'Georgia, serif',
}

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// ===== BUSINESS CATEGORIES =====
export const BUSINESS_CATEGORIES = [
  { id: 'restaurants', name: 'Restaurants', icon: '🍽️' },
  { id: 'wineries', name: 'Weingüter', icon: '🍇' },
  { id: 'accommodation', name: 'Unterkunft', icon: '🏨' },
  { id: 'activities', name: 'Aktivitäten', icon: '🚴' },
  { id: 'services', name: 'Dienstleistungen', icon: '🔧' },
  { id: 'retail', name: 'Einzelhandel', icon: '🛍️' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: '💅' },
  { id: 'health', name: 'Gesundheit', icon: '⚕️' },
  { id: 'education', name: 'Bildung', icon: '📚' },
  { id: 'real_estate', name: 'Immobilien', icon: '🏠' },
  { id: 'events', name: 'Events', icon: '🎉' },
  { id: 'other', name: 'Sonstiges', icon: '✨' },
]

// ===== REGIONS =====
export const REGIONS = [
  { code: 'rheingau', name: 'Rheingau', country: 'DE' },
  { code: 'hessen', name: 'Hessen', country: 'DE' },
]

// ===== FEATURED CATEGORIES - FÜR HOMEPAGE =====
export const FEATURED_CATEGORIES = ['restaurants', 'wineries', 'accommodation', 'activities']

// ===== SEO CONFIG =====
export const SEO_CONFIG = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: ['Rheingau', 'Restaurants', 'Events', 'Weingüter', 'Dienstleistungen', 'Unternehmen'],
  ogImage: `${BASE_URL}/og-image.png`,
  twitterHandle: '@RheingauPortal',
}

// ===== GOOGLE MAPS =====
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// ===== EMAIL CONFIG =====
export const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rheingau.de'
export const SUPPORT_EMAIL = 'support@rheingau.de'

// ===== FEATURE FLAGS =====
export const FEATURES = {
  PREMIUM_MAPS: true,
  BLOG_ENABLED: true,
  ADS_ENABLED: true,
  RATINGS_ENABLED: false, // Wird später aktiviert
  ANALYTICS: true,
}
