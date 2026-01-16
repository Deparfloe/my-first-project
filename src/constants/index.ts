/**
 * Constants
 * Zentrale Konstanten für die App
 */

// ===== HTTP STATUS CODES =====
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const

// ===== ERROR MESSAGES =====
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Ungültige E-Mail-Adresse',
  INVALID_PASSWORD: 'Passwort muss mindestens 8 Zeichen lang sein',
  EMAIL_ALREADY_EXISTS: 'Diese E-Mail-Adresse ist bereits registriert',
  INVALID_CREDENTIALS: 'Ungültige E-Mail oder Passwort',
  UNAUTHORIZED: 'Nicht authentifiziert',
  FORBIDDEN: 'Zugriff verweigert',
  NOT_FOUND: 'Nicht gefunden',
  SERVER_ERROR: 'Ein Fehler ist aufgetreten',
  INVALID_INPUT: 'Ungültige Eingabe',
  PAYMENT_FAILED: 'Zahlung fehlgeschlagen',
} as const

// ===== SUCCESS MESSAGES =====
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.',
  PROFILE_UPDATED: 'Profil aktualisiert',
  PASSWORD_CHANGED: 'Passwort geändert',
  EMAIL_SENT: 'E-Mail versendet',
  PAYMENT_SUCCESS: 'Zahlung erfolgreich',
} as const

// ===== VALIDATION RULES =====
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_BUSINESS_NAME_LENGTH: 100,
  MIN_BUSINESS_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_SEARCH_QUERY_LENGTH: 2,
  MAX_CATEGORIES_PER_BUSINESS: 5,
} as const

// ===== PAGINATION DEFAULTS =====
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE_SMALL: 10,
  PAGE_SIZE_MEDIUM: 20,
  PAGE_SIZE_LARGE: 50,
  MAX_PAGES: 1000,
} as const

// ===== CACHE DURATIONS (in seconds) =====
export const CACHE_DURATIONS = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  VERY_LONG: 86400,
} as const

// ===== DATE FORMATS =====
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  DE: 'DD.MM.YYYY',
  DE_TIME: 'DD.MM.YYYY HH:mm',
} as const

// ===== SUBSCRIPTION BENEFITS =====
export const SUBSCRIPTION_BENEFITS = [
  {
    title: 'Unbegrenzte Events',
    description: 'Erstellen und verwalten Sie so viele Events wie Sie möchten',
  },
  {
    title: 'Google Maps Integration',
    description: 'Zeigen Sie Ihren Standort auf einer interaktiven Karte',
  },
  {
    title: 'Foto-Galerie (bis zu 20 Bilder)',
    description: 'Präsentieren Sie Ihr Unternehmen mit professionellen Fotos',
  },
  {
    title: 'Erweiterte Beschreibung',
    description: 'Nutzen Sie erweiterte Textformatierung für Ihre Profilbeschreibung',
  },
  {
    title: 'Priority in Suchergebnissen',
    description: 'Erscheinen Sie prominenter in den Suchergebnissen',
  },
  {
    title: 'Werbeslot-Buchung',
    description: 'Buchen Sie Werbeplätze auf der Website',
  },
  {
    title: 'Erweiterte Analytics',
    description: 'Sehen Sie, wie viele Menschen Ihr Profil besuchen',
  },
  {
    title: 'Kontaktformular-Anpassung',
    description: 'Passen Sie das Anfrageformular nach Ihren Bedürfnissen an',
  },
] as const

// ===== ROLE-BASED FEATURES =====
export const FEATURES_BY_ROLE = {
  normal: ['search', 'view_profiles', 'view_events', 'send_message'],
  business: [
    ...['search', 'view_profiles', 'view_events', 'send_message'],
    'create_business',
    'manage_events',
    'upload_images',
    'view_mailbox',
    'book_ad_slots',
  ],
  admin: ['all'],
} as const
