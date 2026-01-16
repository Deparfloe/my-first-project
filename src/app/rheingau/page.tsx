import { Metadata } from 'next'
import { getCategoriesWithCounts, getHomepageStats } from '@/server/actions'
import { BASE_URL, COLORS } from '@/config'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rheingau Unternehmen & Events - Lokales Verzeichnis',
  description: 'Dein lokales Verzeichnis für alle Restaurants, Weingüter, Dienstleistungen und Events im Rheingau (Hessen).',
  keywords: [
    'Rheingau',
    'Unternehmen',
    'Verzeichnis',
    'Restaurants Rheingau',
    'Weingüter Rheingau',
    'Events Rheingau',
    'Dienstleistungen Rheingau',
  ],
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/rheingau`,
    title: 'Rheingau Unternehmen & Events - Lokales Verzeichnis',
    description: 'Dein lokales Verzeichnis für alle Restaurants, Weingüter, Dienstleistungen und Events im Rheingau.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Rheingau Portal',
      },
    ],
  },
}

export default async function RheingauPage() {
  const [categoriesResult, statsResult] = await Promise.all([
    getCategoriesWithCounts(),
    getHomepageStats(),
  ])

  const categories = categoriesResult.success && Array.isArray(categoriesResult.data) ? categoriesResult.data : []
  const statsData = statsResult.success && statsResult.data ? statsResult.data : { totalBusinesses: 0, totalEvents: 0, totalUsers: 0 }
  const stats = {
    businesses: statsData.totalBusinesses || 0,
    events: statsData.totalEvents || 0,
    users: statsData.totalUsers || 0,
  }

  // Regional schema.org data
  const regionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Region',
    name: 'Rheingau',
    sameAs: 'https://de.wikipedia.org/wiki/Rheingau',
  }

  return (
    <main style={{ padding: 'var(--space-6)' }}>
      {/* Region Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(regionSchema),
        }}
      />

      {/* Hero Section */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`, color: 'white', padding: 'var(--space-20) var(--space-6)', borderRadius: '12px', marginBottom: 'var(--space-12)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>
            🍇 Willkommen in der Rheingau
          </h1>
          <p style={{ fontSize: '1.2em', marginBottom: 'var(--space-6)' }}>
            Das lokale Verzeichnis für Unternehmen, Events und Dienstleistungen
          </p>
          <p style={{ opacity: 0.9 }}>
            Entdecke {stats.businesses} lokale Unternehmen, {stats.events} Events und {stats.users} aktive Nutzer in deiner Region.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Quick Links */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>Was suchst du?</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            <Link href="/rheingau/restaurants">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>🍽️</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Restaurants</h3>
                  <p style={{ color: '#666', margin: 0 }}>Finde die besten Restaurants in der Rheingau</p>
                </div>
              </Card>
            </Link>

            <Link href="/rheingau/weingueter">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>🍷</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Weingüter</h3>
                  <p style={{ color: '#666', margin: 0 }}>Entdecke lokale Weinkellereien und Weingüter</p>
                </div>
              </Card>
            </Link>

            <Link href="/rheingau/dienstleistungen">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>🔧</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Dienstleistungen</h3>
                  <p style={{ color: '#666', margin: 0 }}>Finde Handwerker und Dienstleister</p>
                </div>
              </Card>
            </Link>

            <Link href="/rheingau/events">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>📅</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Events</h3>
                  <p style={{ color: '#666', margin: 0 }}>Bleibe auf dem Laufenden mit lokalen Events</p>
                </div>
              </Card>
            </Link>

            <Link href="/rheingau/tourismus">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>🏨</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Tourismus</h3>
                  <p style={{ color: '#666', margin: 0 }}>Hotels, Pensionen und Übernachtung</p>
                </div>
              </Card>
            </Link>

            <Link href="/verzeichnis">
              <Card variant="elevated" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>📍</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Alle Kategorien</h3>
                  <p style={{ color: '#666', margin: 0 }}>Browse all businesses in our directory</p>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>Nach Kategorie entdecken</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {categories.slice(0, 12).map((cat) => (
              <Link key={cat.id} href={`/verzeichnis?kategorie=${cat.slug}`}>
                <div
                  style={{
                    background: COLORS.light,
                    padding: 'var(--space-4)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: `2px solid transparent`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = COLORS.primary
                    ;(e.currentTarget as HTMLElement).style.background = '#f0f8f0'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.background = COLORS.light
                  }}
                >
                  <p style={{ fontSize: '1.5em', marginBottom: 'var(--space-2)' }}>
                    {cat.icon || '🏢'}
                  </p>
                  <strong>{cat.name}</strong>
                  <p style={{ fontSize: 'var(--text-sm)', color: '#666', margin: '0.5em 0 0 0' }}>
                    {cat.business_count || 0} Einträge
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section>
          <Card variant="default">
            <div style={{ padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Über die Rheingau</h2>
              <p style={{ lineHeight: 1.8, color: '#333', marginBottom: 'var(--space-4)' }}>
                Die Rheingau ist eine der bekanntesten Weinregionen Deutschlands und liegt in Hessen zwischen Wiesbaden und Rüdesheim. Mit malerischen Dörfern, hervorragenden Weingütern und einer reichen Kultur- und Gastronomieszene ist die Rheingau ein beliebtes Reiseziel.
              </p>
              <p style={{ lineHeight: 1.8, color: '#333', marginBottom: 'var(--space-4)' }}>
                Das Rheingau Portal ist dein lokales Verzeichnis für alle Unternehmen, Events und Dienstleistungen in der Region. Egal ob Restaurants, Weingüter, Hotels oder Handwerker - hier findest du alles, was du brauchst.
              </p>
              <Link href="/verzeichnis">
                <Button variant="primary">Zum Verzeichnis</Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
