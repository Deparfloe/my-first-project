/**
 * Server Actions für API-Layer
 * Type-safe, Error-handled, SEO-optimiert
 */

'use server'

import { getSupabaseClient } from '@/lib/supabase/client'
import type { ApiResponse, PaginatedResponse, BusinessData, Event, Category, SearchFilters, SearchResult } from '@/types'
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@/config'
import { getErrorMessage } from '@/utils/helpers'

// ===== BUSINESS QUERIES =====

/**
 * Holt Featured/Premium Businesses für Homepage
 * SEO: Featured Businesses fördern organisches Traffic
 */
export async function getFeaturedBusinesses(limit = 6): Promise<ApiResponse<BusinessData[]>> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('business_profiles')
      .select('*, events(*), ratings(*)')
      .eq('subscription_tier', 'premium')
      .eq('is_verified', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return {
      success: true,
      data: data as BusinessData[],
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

/**
 * Intelligente Business-Suche
 * Nutzer können ihr "Problem" eingeben, wir machen AI-Matching
 */
export async function searchBusinessesByProblem(
  query: string,
  categoryId?: string,
  filters?: SearchFilters
): Promise<PaginatedResponse<SearchResult>> {
  try {
    const supabase = getSupabaseClient()
    const pageSize = Math.min(filters?.pageSize || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
    const page = filters?.page || 1
    const offset = (page - 1) * pageSize

    // Build query
    let dbQuery = supabase
      .from('business_profiles')
      .select('*', { count: 'exact' })
      .eq('is_verified', true)

    // Text-Suche (Full-Text in Supabase)
    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    // Kategorie-Filter
    if (categoryId) {
      dbQuery = dbQuery.contains('category_ids', [categoryId])
    }

    // Premium-Filter
    if (filters?.subscriptionTier) {
      dbQuery = dbQuery.eq('subscription_tier', filters.subscriptionTier)
    }

    // Sorting
    const sortBy = filters?.sortBy || 'relevance'
    if (sortBy === 'newest') {
      dbQuery = dbQuery.order('created_at', { ascending: false })
    } else if (sortBy === 'popular') {
      dbQuery = dbQuery.order('created_at', { ascending: false }) // TODO: Add rating
    }

    const { data, count, error } = await dbQuery.range(offset, offset + pageSize - 1)

    if (error) throw error

    const total = count || 0
    const searchResults: SearchResult[] = (data || []).map((biz) => ({
      id: biz.id,
      name: biz.name,
      description: biz.description,
      category: biz.category_ids?.[0] || 'other',
      image_url: biz.logo_url,
      relevance_score: query ? 0.9 : 0.7, // TODO: Better scoring
    }))

    return {
      success: true,
      data: searchResults,
      total,
      page,
      pageSize,
      hasMore: offset + pageSize < total,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      hasMore: false,
    }
  }
}

/**
 * Holt Business nach Slug (für Public Profil-Seiten)
 * SEO: Einzelne Business-Seiten sind crawlbar
 */
export async function getBusinessBySlug(slug: string): Promise<ApiResponse<BusinessData>> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('business_profiles')
      .select('*, events(*), ratings(*)')
      .eq('slug', slug)
      .eq('is_verified', true)
      .single()

    if (error) throw error
    if (!data) {
      return {
        success: false,
        error: 'Unternehmen nicht gefunden',
      }
    }

    return {
      success: true,
      data: data as BusinessData,
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

// ===== EVENT QUERIES =====

/**
 * Holt anstehende Events
 * SEO: Events sind zeitgebunden, wichtig für Local SEO
 */
export async function getUpcomingEvents(
  limit = 10,
  offset = 0
): Promise<PaginatedResponse<Event>> {
  try {
    const supabase = getSupabaseClient()
    const now = new Date().toISOString()

    const { data, count, error } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .gte('date_start', now)
      .order('date_start', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) throw error

    const total = count || 0

    return {
      success: true,
      data: data as Event[],
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < total,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
    }
  }
}

/**
 * Holt Events nach Datum
 * Für Event-Kalender View
 */
export async function getEventsByDate(
  startDate: string,
  endDate: string
): Promise<ApiResponse<Event[]>> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('date_start', startDate)
      .lte('date_start', endDate)
      .order('date_start', { ascending: true })

    if (error) throw error

    return {
      success: true,
      data: data as Event[],
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

// ===== CATEGORY QUERIES =====

/**
 * Holt alle Kategorien (gecacht)
 * SEO: Kategorien sind Navigation & interne Links
 */
export async function getAllCategories(): Promise<ApiResponse<Category[]>> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error

    return {
      success: true,
      data: data as Category[],
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

/**
 * Holt Kategorien mit Anzahl Businesses
 * Für Homepage-Grid
 */
export async function getCategoriesWithCounts(): Promise<
  ApiResponse<(Category & { business_count: number })[]>
> {
  try {
    const supabase = getSupabaseClient()

    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (catError) throw catError

    // Für jede Kategorie: Zähle Businesses
    const result = await Promise.all(
      (categories || []).map(async (cat) => {
        const { count } = await supabase
          .from('business_profiles')
          .select('*', { count: 'exact' })
          .contains('category_ids', [cat.id])
          .eq('is_verified', true)

        return {
          ...cat,
          business_count: count || 0,
        }
      })
    )

    return {
      success: true,
      data: result.filter((cat) => cat.business_count > 0),
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

// ===== STATISTICS (für Homepage & Admin) =====

/**
 * Statistiken für Homepage-Hero Section
 * "X Unternehmen, Y Events, Z Nutzer"
 */
export async function getHomepageStats(): Promise<
  ApiResponse<{
    totalBusinesses: number
    totalEvents: number
    totalUsers: number
  }>
> {
  try {
    const supabase = getSupabaseClient()

    const [businesses, events, users] = await Promise.all([
      supabase
        .from('business_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_published', true),
      supabase.from('users').select('*', { count: 'exact', head: true }),
    ])

    return {
      success: true,
      data: {
        totalBusinesses: businesses.count || 0,
        totalEvents: events.count || 0,
        totalUsers: users.count || 0,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}
