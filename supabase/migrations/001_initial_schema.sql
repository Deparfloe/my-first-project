-- ===== DATABASE SCHEMA - RHEINGAU PORTAL =====
-- Alle Migrations für Supabase PostgreSQL
-- Run in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== USERS TABLE =====
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'normal' CHECK (role IN ('normal', 'business', 'admin')),
  is_email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ===== CATEGORIES TABLE =====
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- ===== BUSINESS PROFILES TABLE =====
CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  website VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  logo_url VARCHAR(500),
  category_ids UUID[],
  subscription_tier VARCHAR(20) DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'premium')),
  premium_expires_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX idx_business_profiles_slug ON business_profiles(slug);
CREATE INDEX idx_business_profiles_subscription_tier ON business_profiles(subscription_tier);
CREATE INDEX idx_business_profiles_created_at ON business_profiles(created_at);

-- ===== EVENTS TABLE =====
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date_start TIMESTAMP NOT NULL,
  date_end TIMESTAMP,
  location VARCHAR(255),
  address VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_business_id ON events(business_id);
CREATE INDEX idx_events_date_start ON events(date_start);
CREATE INDEX idx_events_is_published ON events(is_published);

-- ===== RATINGS TABLE =====
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ratings_business_id ON ratings(business_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);

-- ===== MESSAGES TABLE (Postfach) =====
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(100),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_to_business_id ON messages(to_business_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- ===== PREMIUM INQUIRIES TABLE =====
CREATE TABLE IF NOT EXISTS premium_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  form_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_premium_inquiries_business_id ON premium_inquiries(business_id);

-- ===== PAYMENTS TABLE =====
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('premium_subscription', 'ad_slot', 'other')),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_id VARCHAR(255),
  paypal_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_business_id ON payments(business_id);
CREATE INDEX idx_payments_status ON payments(status);

-- ===== AD SLOTS TABLE =====
CREATE TABLE IF NOT EXISTS ad_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position VARCHAR(50) NOT NULL CHECK (position IN ('hero', 'sidebar', 'directory_top', 'profile_footer', 'search_top')),
  name VARCHAR(100) NOT NULL,
  monthly_price DECIMAL(10, 2) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  booked_until TIMESTAMP,
  business_id UUID REFERENCES business_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ad_slots_position ON ad_slots(position);
CREATE INDEX idx_ad_slots_is_available ON ad_slots(is_available);
CREATE INDEX idx_ad_slots_business_id ON ad_slots(business_id);

-- ===== AD SLOT BOOKINGS TABLE =====
CREATE TABLE IF NOT EXISTS ad_slot_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_slot_id UUID NOT NULL REFERENCES ad_slots(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  booked_from TIMESTAMP NOT NULL,
  booked_until TIMESTAMP NOT NULL,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ad_slot_bookings_ad_slot_id ON ad_slot_bookings(ad_slot_id);
CREATE INDEX idx_ad_slot_bookings_business_id ON ad_slot_bookings(business_id);

-- ===== BLOG POSTS TABLE =====
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(100),
  cover_image_url VARCHAR(500),
  seo_meta JSONB,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- ===== REGIONAL CONFIGS TABLE =====
CREATE TABLE IF NOT EXISTS regional_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region VARCHAR(100) UNIQUE NOT NULL,
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  accent_color VARCHAR(7),
  font_family_serif VARCHAR(100),
  font_family_sans VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== ROW LEVEL SECURITY (RLS) =====

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Users: Jeder kann lesen, nur owner kann schreiben
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Business Profiles: Öffentlich lesbar, nur owner kann ändern
CREATE POLICY "Business profiles are viewable by everyone" ON business_profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own business" ON business_profiles FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Events: Öffentlich lesbar, owner kann ändern
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (is_published = true OR business_profiles.user_id::text = auth.uid()::text FROM business_profiles WHERE business_profiles.id = events.business_id);
CREATE POLICY "Business can manage their events" ON events FOR ALL USING (business_profiles.user_id::text = auth.uid()::text FROM business_profiles WHERE business_profiles.id = events.business_id);

-- Messages: Nur empfänger kann lesen
CREATE POLICY "Users can view their messages" ON messages FOR SELECT USING (business_profiles.user_id::text = auth.uid()::text FROM business_profiles WHERE business_profiles.id = messages.to_business_id);

-- Ratings: Öffentlich lesbar
CREATE POLICY "Ratings are viewable by everyone" ON ratings FOR SELECT USING (true);

-- ===== INITIAL CATEGORIES =====
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Restaurants', 'restaurants', '🍽️', 'Restaurants und Cafés'),
  ('Weingüter', 'wineries', '🍇', 'Weingüter und Weinhandel'),
  ('Unterkunft', 'accommodation', '🏨', 'Hotels, Gästehäuser und Ferienwohnungen'),
  ('Aktivitäten', 'activities', '🚴', 'Freizeit- und Sportaktivitäten'),
  ('Dienstleistungen', 'services', '🔧', 'Handwerk und Dienstleistungen'),
  ('Einzelhandel', 'retail', '🛍️', 'Geschäfte und Einzelhandel'),
  ('Beauty & Wellness', 'beauty', '💅', 'Wellness, Spa und Beauty'),
  ('Gesundheit', 'health', '⚕️', 'Ärzte, Zahnärzte und Gesundheit'),
  ('Bildung', 'education', '📚', 'Schulen, Kurse und Bildung'),
  ('Immobilien', 'real_estate', '🏠', 'Immobilienagenturen'),
  ('Events', 'events', '🎉', 'Veranstalter und Event-Orte'),
  ('Sonstiges', 'other', '✨', 'Andere Kategorien');

-- ===== INITIAL AD SLOTS =====
INSERT INTO ad_slots (position, name, monthly_price, is_available) VALUES
  ('hero', 'Hero Banner - Großformatig', 199, true),
  ('sidebar', 'Seitenleiste', 99, true),
  ('directory_top', 'Verzeichnis Top', 149, true),
  ('profile_footer', 'Profil Footer', 79, true),
  ('search_top', 'Suchergebnisse Top', 199, true);

-- ===== INITIAL REGIONAL CONFIG =====
INSERT INTO regional_configs (region, primary_color, secondary_color, accent_color, font_family_serif, font_family_sans) VALUES
  ('Rheingau', '#2D5016', '#D4A574', '#E8B44F', 'Georgia, serif', 'Inter, system-ui, sans-serif');
