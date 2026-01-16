/**
 * Utility Functions & Helpers
 * Zentrale Hilfsfunktionen
 */

// ===== VALIDATION =====

/**
 * Validiert Email-Format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validiert Business-Namen
 */
export const isValidBusinessName = (name: string): boolean => {
  return name.trim().length >= 3 && name.trim().length <= 100
}

/**
 * Sanitiert String-Input (Basic Protection)
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<[^>]*>/g, '')
}

// ===== STRING MANIPULATION =====

/**
 * Erstellt URL-freundlichen Slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

/**
 * Truncates Text auf bestimmte Länge
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Formatiert große Zahlen (1000 -> 1K)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

// ===== DATE FORMATTING =====

/**
 * Formatiert Datum zu deutscher Schreibweise
 */
export const formatDateDE = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formatiert Zeit
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  return `${hours}:${minutes}`
}

/**
 * Berechnet Zeit bis Event
 */
export const getTimeUntilEvent = (eventDate: string): string => {
  const now = new Date()
  const event = new Date(eventDate)
  const diffMs = event.getTime() - now.getTime()

  if (diffMs < 0) return 'Vorbei'

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (diffDays > 0) return `in ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`
  if (diffHours > 0) return `in ${diffHours} Stunde${diffHours > 1 ? 'n' : ''}`
  return 'Heute'
}

// ===== ERROR HANDLING =====

/**
 * Sichere Error-Nachricht
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Ein unbekannter Fehler ist aufgetreten'
}

// ===== OBJECT MANIPULATION =====

/**
 * Entfernt leere Felder aus Objekt
 */
export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '') {
      result[key] = value
    }
  }
  return result
}

/**
 * Deep-merges zwei Objekte
 */
export const mergeObjects = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T => {
  return { ...target, ...source }
}
