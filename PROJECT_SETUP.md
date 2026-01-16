# 🍇 Rheingau Portal - Projekt Setup & Übersicht

## 📖 Projektinformation

**Projektname:** Rheingau Portal - Lokales Business Verzeichnis
**Framework:** Next.js 16.1.1  
**Sprache:** TypeScript 5  
**Styling:** Tailwind CSS 4 + CSS Modules  
**Backend:** Supabase PostgreSQL  
**Authentication:** Email OTP  
**Payments:** Stripe Integration  
**Deployment:** Vercel  

**Repository:** `https://github.com/Deparfloe/my-first-project` (PRIVAT)

---

## 🚀 Projekt Starten

### Schritt 1: Terminal öffnen
```bash
cd /Users/florianbaubock/test-project/next-app
```

### Schritt 2: Abhängigkeiten installieren (nur beim ersten Mal)
```bash
npm install
```

### Schritt 3: Development Server starten
```bash
npm run dev
```

### Schritt 4: Im Browser öffnen
```
http://localhost:3000
```

---

## 📁 Projektstruktur

```
next-app/
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root Layout mit Header/Footer (🔒 Sticky Navigation)
│   │   ├── page.tsx                # 🏠 SEO-optimierte Homepage
│   │   ├── sitemap.ts              # XML Sitemap für Google
│   │   ├── robots.ts               # Crawl-Richtlinien
│   │   │
│   │   ├── verzeichnis/            # 📋 Business Directory
│   │   │   ├── page.tsx            # Suchverzeichnis mit Filtern
│   │   │   └── [slug]/             # Dynamic Business Profiles
│   │   │       └── page.tsx        # LocalBusiness Schema.org ⭐
│   │   │
│   │   ├── events/                 # 📅 Event System
│   │   │   ├── page.tsx            # Event Listing mit Pagination
│   │   │   └── [id]/               # Dynamic Event Pages
│   │   │       └── page.tsx        # Event Schema.org ⭐
│   │   │
│   │   ├── business/               # 💼 Business Features
│   │   │   ├── dashboard/          # Zahlungshistorie
│   │   │   │   └── page.tsx
│   │   │   └── subscription/       # 💳 Stripe Checkout
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                  # 👨‍💼 Admin Dashboard
│   │   │   └── page.tsx            # 6 Tabs: Overview, Businesses, Events, Users, Moderation, Analytics
│   │   │
│   │   ├── blog/                   # 📝 Blog System
│   │   │   └── page.tsx            # Blog Listing mit Featured Post
│   │   │
│   │   ├── rechtliches/            # ⚖️ Legal Pages
│   │   │   └── page.tsx            # Disclaimer, Terms
│   │   │
│   │   ├── rheingau/               # 🌍 Regional SEO Hub
│   │   │   ├── page.tsx            # Rheingau Overview (Hub Page)
│   │   │   └── restaurants/        # Category-specific Pages
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                    # 🔌 API Routes
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts    # Stripe Payment Webhooks
│   │
│   ├── components/
│   │   ├── ui/                     # 🎨 UI Component Library
│   │   │   ├── Button.tsx          # 5 Varianten (primary, secondary, outline, ghost, danger)
│   │   │   ├── Button.module.css   # Styling
│   │   │   ├── Card.tsx            # Layout Component (3 Varianten)
│   │   │   ├── Card.module.css
│   │   │   ├── Input.tsx           # Form Inputs (Input, Textarea, Select)
│   │   │   ├── Input.module.css
│   │   │   └── index.ts            # Exports
│   │   │
│   │   └── features/               # Business-spezifische Komponenten
│   │       └── (weitere Komponenten können hier hinzugefügt werden)
│   │
│   ├── server/                     # 🖥️ Server Actions (TypeScript)
│   │   ├── actions.ts              # Business, Event, Category Queries
│   │   │   ├── getFeaturedBusinesses()
│   │   │   ├── searchBusinessesByProblem()
│   │   │   ├── getBusinessBySlug()
│   │   │   ├── getUpcomingEvents()
│   │   │   ├── getEventsByDate()
│   │   │   ├── getCategoriesWithCounts()
│   │   │   └── getHomepageStats()
│   │   │
│   │   ├── auth.ts                 # Authentication & User Management
│   │   │   ├── sendOTP()
│   │   │   ├── verifyOTPAndSignIn()
│   │   │   ├── createBusinessAccount()
│   │   │   └── getCurrentUser()
│   │   │
│   │   └── payments.ts             # Stripe Payment Processing
│   │       ├── createSubscriptionCheckout()
│   │       ├── createAdSlotCheckout()
│   │       ├── verifySubscriptionCheckout()
│   │       ├── cancelSubscription()
│   │       ├── getPaymentHistory()
│   │       └── createPayPalOrder()
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── client.ts           # Supabase Client Setup
│   │   └── utils.ts                # Utility Helper Functions
│   │
│   ├── styles/
│   │   └── globals.css             # 🎨 Design Tokens & Global Styles
│   │       ├── CSS Variables (--color-*, --space-*)
│   │       ├── Typography
│   │       ├── Shadows
│   │       └── Transitions
│   │
│   ├── types/
│   │   └── index.ts                # 📋 Global TypeScript Definitions
│   │       ├── User, BusinessProfile, Event, Category
│   │       ├── Rating, Message, Payment, AdSlot
│   │       ├── BlogPost, RegionalConfig
│   │       ├── ApiResponse, PaginatedResponse
│   │       └── SearchFilters, SearchResult
│   │
│   ├── config/
│   │   └── index.ts                # ⚙️ Zentrale Konfiguration
│   │       ├── APP_NAME, APP_DESCRIPTION
│   │       ├── COLORS (Design System)
│   │       ├── PREMIUM_PRICE = €49/month
│   │       ├── AD_SLOT_PRICES
│   │       ├── BUSINESS_CATEGORIES
│   │       └── STRIPE_CONFIG
│   │
│   ├── constants/
│   │   └── index.ts                # 📌 Constants & Messages
│   │       ├── ERROR_MESSAGES
│   │       ├── SUCCESS_MESSAGES
│   │       ├── VALIDATION Rules
│   │       ├── SUBSCRIPTION_BENEFITS
│   │       └── FEATURES_BY_ROLE
│   │
│   └── utils/
│       └── helpers.ts              # 🔧 Helper Functions
│           ├── isValidEmail(), createSlug()
│           ├── truncateText(), formatDateDE()
│           └── getTimeUntilEvent()
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # 📊 Database Schema
│           ├── users (User Accounts)
│           ├── business_profiles (Businesses)
│           ├── events (Events)
│           ├── categories (Business Categories)
│           ├── ratings (Reviews)
│           ├── messages (Contact Messages)
│           ├── premium_inquiries (Premium Requests)
│           ├── payments (Payment Records)
│           ├── ad_slots (Ad Slots Config)
│           ├── ad_slot_bookings (Ad Bookings)
│           ├── blog_posts (Blog Articles)
│           └── regional_configs (Regional Settings)
│
├── public/                         # 🖼️ Static Assets
│   └── (Bilder, Icons, etc.)
│
├── .env.local.example              # Environment Variables Template
├── package.json                    # Project Dependencies
├── tsconfig.json                   # TypeScript Configuration
├── next.config.ts                  # Next.js Configuration
├── tailwind.config.ts              # Tailwind CSS Configuration
├── postcss.config.mjs              # PostCSS Configuration
├── eslint.config.mjs               # ESLint Rules
├── components.json                 # Shadcn Components Config
└── README.md                       # Project Documentation
```

---

## 🎯 Haupt-Features

### 🔍 Business Directory (Verzeichnis)
- **Full-Text Search** mit Problemtyp-Matching
- **Kategorie-Filter** (Restaurant, Weingut, etc.)
- **Pagination** (20 Einträge pro Seite)
- **Premium-Hervorhebung** für Premium-Members

### 📅 Event System
- **Event-Listing** mit Datum-Sortierung
- **Event-Details** mit Location & Organizer
- **Business-Integration** - Events pro Business

### 💳 Payment System
- **Stripe Checkout** für €49/month Premium
- **Subscription Management** Dashboard
- **Payment History** Tracking
- **Webhook Handler** für Zahlungsereignisse

### 👨‍💼 Admin Dashboard
1. **Overview** - Stats & KPIs
2. **Businesses** - Business Management Table
3. **Events** - Event Moderation
4. **Users** - User List
5. **Moderation** - Content Approval Queue
6. **Analytics** - Visitor & Conversion Stats

### 🏘️ Regional SEO
- **Rheingau Hub** (/rheingau) - Regional Übersicht
- **Category Pages** (/rheingau/restaurants) - By Category
- **Schema.org Markup** für Local Search
- **Breadcrumb Navigation**

### 📝 Blog System
- **Blog Listing** mit Featured Post
- **Article Grid** mit Kategorien
- **CMS-ready** Structure

---

## 🔐 Sicherheit & Privacy

### ✅ Implementiert
- **Row-Level Security (RLS)** auf alle Tabellen
- **Email OTP** Verification (doppelte Verifizierung)
- **Role-based Access Control** (normal, business, admin)
- **Rate Limiting** auf API Routes möglich

### 🔒 GitHub Repository
**Status: PRIVAT** - Nur du kannst es sehen

Um es privat zu halten:
1. GitHub.com → Repository Settings → Visibility → Private ✅
2. Keine sensiblen Daten committen (nutze `.env.local` für Secrets)
3. `.gitignore` schließt `node_modules`, `.next`, `.env.local` aus

---

## 📊 Database Schema

**13 Tabellen:**
- `users` - Benutzerkonten
- `business_profiles` - Unternehmensprofile
- `events` - Veranstaltungen
- `categories` - Kategorien
- `ratings` - Bewertungen
- `messages` - Kontaktnachrichten
- `premium_inquiries` - Premium Anfragen
- `payments` - Zahlungshistorie
- `ad_slots` - Werbeplatzverwaltung
- `ad_slot_bookings` - Werbeplatz-Buchungen
- `blog_posts` - Blog Artikel
- `regional_configs` - Regionale Einstellungen

---

## 🚀 Deployment (Vercel)

```bash
# Vercel CLI installieren (optional)
npm install -g vercel

# Deployen
vercel

# Live: https://my-first-project.vercel.app (oder deine Domain)
```

---

## 📚 Wichtige Befehle

```bash
# Development Server
npm run dev

# Production Build
npm run build
npm run start

# Linting
npm run lint

# TypeScript Check
npx tsc --noEmit
```

---

## 🔑 Umgebungsvariablen (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_xxxxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxxxx
```

---

## 📈 Completion Status

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Project Setup | ✅ Complete |
| 2 | UI Component Kit | ✅ Complete |
| 3 | Server Actions/API | ✅ Complete |
| 4 | Authentication | ✅ Complete |
| 5 | Homepage | ✅ Complete |
| 6 | Business Directory | ✅ Complete |
| 7 | Business Registration | ✅ Complete |
| 8 | Admin Dashboard | ✅ Complete |
| 9 | Blog System | ✅ Complete |
| 10 | SEO (Sitemap, Robots) | ✅ Complete |
| 11 | Root Layout & Nav | ✅ Complete |
| 12 | Payment System | ✅ Complete |
| 13 | Advanced SEO | ✅ Complete |
| 14 | Google Maps | ⏳ Next |
| 15 | Ad Slots Booking | ⏳ Next |
| 16 | Testing & Deploy | ⏳ Next |

**Completion: 81% (13/16 phases)**

---

## 🎨 Design System

**Farben:**
- Primary: `#2D5016` (Forest Green)
- Secondary: `#D4A574` (Wine Gold)
- Accent: `#E8B44F` (Light Gold)

**Typography:**
- Sans-Serif: System Font
- Serif: Georgia
- Display: Poppins

**Spacing:** Modular Scale (0.5rem, 1rem, 1.5rem, 2rem, ...)

---

## 👤 Account Info

- **GitHub User:** Deparfloe
- **Repository:** my-first-project (PRIVAT)
- **Local Path:** `/Users/florianbaubock/test-project/next-app`

---

**Viel Spaß mit dem Projekt! 🚀**
