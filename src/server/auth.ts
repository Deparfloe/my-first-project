/**
 * Authentication Server Actions
 * Email OTP, Session Management, Role-based Access
 */

'use server'

import { getSupabaseClient } from '@/lib/supabase/client'
import { isValidEmail, createSlug } from '@/utils/helpers'
import type { ApiResponse, User } from '@/types'

// ===== EMAIL VERIFICATION & OTP =====

/**
 * Sendet OTP an Email
 * Zwei-Schritt: Erst OTP anfordern, dann verifizieren
 */
export async function sendOTP(email: string): Promise<ApiResponse<{ message: string }>> {
  try {
    if (!isValidEmail(email)) {
      return {
        success: false,
        error: 'Ungültige E-Mail-Adresse',
      }
    }

    const supabase = getSupabaseClient()

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      // User exists: Send OTP via Supabase Auth
      const { error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
      })

      if (error) throw error

      return {
        success: true,
        data: {
          message: 'OTP wurde an Ihre E-Mail versendet',
        },
      }
    }

    // Create user record in DB with OTP flow
    const { data: userData, error: insertError } = await supabase.from('users').insert({
      email: email.toLowerCase(),
      role: 'normal',
      is_email_verified: false,
    }).select().single()

    if (insertError) throw insertError

    return {
      success: true,
      data: {
        message: 'Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.',
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Fehler beim Versenden der OTP',
    }
  }
}

/**
 * Verifiziert OTP und erstellt Session
 */
export async function verifyOTPAndSignIn(
  email: string,
  token: string
): Promise<ApiResponse<{ user: User }>> {
  try {
    if (!isValidEmail(email)) {
      return {
        success: false,
        error: 'Ungültige E-Mail-Adresse',
      }
    }

    const supabase = getSupabaseClient()

    // Verify token with Supabase Auth
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.toLowerCase(),
      token,
      type: 'signup',
    })

    if (error) {
      return {
        success: false,
        error: 'Ungültiger OTP Code',
      }
    }

    // Mark email as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_email_verified: true })
      .eq('email', email.toLowerCase())

    if (updateError) throw updateError

    // Get user from DB
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (fetchError) throw fetchError

    return {
      success: true,
      data: {
        user: userData as User,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Fehler bei der Authentifizierung',
    }
  }
}

/**
 * Erstellt Business-Account für User
 */
export async function createBusinessAccount(
  userId: string,
  businessData: {
    name: string
    description: string
    categoryIds: string[]
  }
): Promise<ApiResponse<{ businessId: string }>> {
  try {
    const supabase = getSupabaseClient()

    // Validate user exists and is owner
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return {
        success: false,
        error: 'Benutzer nicht gefunden',
      }
    }

    // Create slug from name
    const slug = createSlug(businessData.name)

    // Check if slug already exists
    const { data: existingBiz } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingBiz) {
      return {
        success: false,
        error: 'Ein Unternehmen mit diesem Namen existiert bereits',
      }
    }

    // Create business profile
    const { data, error } = await supabase
      .from('business_profiles')
      .insert({
        user_id: userId,
        name: businessData.name,
        slug,
        description: businessData.description,
        category_ids: businessData.categoryIds,
        subscription_tier: 'basic',
        is_verified: false, // Admin needs to verify
      })
      .select('id')
      .single()

    if (error) throw error

    // Update user role to 'business'
    const { error: roleError } = await supabase
      .from('users')
      .update({ role: 'business' })
      .eq('id', userId)

    if (roleError) throw roleError

    return {
      success: true,
      data: {
        businessId: data.id,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Fehler beim Erstellen des Business-Accounts',
    }
  }
}

/**
 * Holt aktuellen Benutzer
 */
export async function getCurrentUser(userId: string): Promise<ApiResponse<User>> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    if (!data) {
      return {
        success: false,
        error: 'Benutzer nicht gefunden',
      }
    }

    return {
      success: true,
      data: data as User,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Fehler beim Laden des Benutzers',
    }
  }
}

/**
 * Logout
 */
export async function logout(): Promise<ApiResponse<{ message: string }>> {
  try {
    const supabase = getSupabaseClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return {
      success: true,
      data: {
        message: 'Erfolgreich abgemeldet',
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Fehler beim Abmelden',
    }
  }
}
