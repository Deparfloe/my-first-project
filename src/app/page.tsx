import { Metadata } from 'next'
import { Button } from '@/components/ui'
import { Card, CardBody, CardHeader } from '@/components/ui'
import {
  getFeaturedBusinesses,
  getCategoriesWithCounts,
  getHomepageStats,
  getUpcomingEvents,
} from '@/server/actions'
import { APP_NAME, APP_DESCRIPTION, BASE_URL } from '@/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `${APP_NAME} - Lokale Unternehmen & Events im Rheingau`,
  description: APP_DESCRIPTION,
  keywords: [
    'Rheingau',
    'Restaurants',
    'Weingüter',
    'Events',
    'Dienstleistungen',
    'Unternehmen',
    'Lokal',
  ],
  openGraph: {
    title: `${APP_NAME}`,
    description: APP_DESCRIPTION,
    url: BASE_URL,
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HomePage() {
  // Parallele Server-Requests für Performance
  const [
    { data: featuredBusinesses = [] },
    { data: categories = [] },
    { data: stats },
    { data: upcomingEvents = [] },
  ] = await Promise.all([
    getFeaturedBusinesses(6),
    getCategoriesWithCounts(),
    getHomepageStats(),
    getUpcomingEvents(4),
  ])

  return (
    <main className="w-full">
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)`,
          color: 'white',
          padding: 'var(--space-20) var(--space-4)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 style={{ color: 'white', marginBottom: 'var(--space-6)' }}>
            Entdecke lokale Unternehmen & Events im Rheingau
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              marginBottom: 'var(--space-8)',
              opacity: 0.95,
            }}
          >
            Finde Restaurants, Weingüter, Dienstleistungen und vieles mehr – alles an einem Ort.
          </p>

          {/* Search Bar */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Was brauchst du? (z.B. Italiener, Dachdecker...)"
              style={{
                flex: 1,
                maxWidth: '500px',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-base)',
                border: 'none',
                fontSize: 'var(--text-base)',
              }}
            />
            <Button variant="secondary">Suchen</Button>
          </div>

          {/* Stats */}
          {stats && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-8)',
                marginTop: 'var(--space-12)',
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold' }}>
                  {stats.totalBusinesses}+
                </div>
                <p style={{ opacity: 0.9 }}>Unternehmen</p>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold' }}>
                  {stats.totalEvents}+
                </div>
                <p style={{ opacity: 0.9 }}>Events</p>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold' }}>
                  {stats.totalUsers}+
                </div>
                <p style={{ opacity: 0.9 }}>Nutzer</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES =====*/}
      <section style={{ padding: 'var(--space-20) var(--space-4)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            Entdecke nach Kategorie
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {categories.slice(0, 6).map((category) => (
              <Card key={category.id} hoverable>
                <CardBody
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-8)',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
                    {category.icon}
                  </div>
                  <h3>{category.name}</h3>
                  <p style={{ color: 'var(--color-neutral-500)', marginTop: 'var(--space-2)' }}>
                    {category.business_count} Unternehmen
                  </p>
                  <Link href={`/verzeichnis?kategorie=${category.slug}`}>
                    <Button variant="outline" size="sm" style={{ marginTop: 'var(--space-4)' }}>
                      Entdecken
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED BUSINESSES =====*/}
      {featuredBusinesses.length > 0 && (
        <section
          style={{
            padding: 'var(--space-20) var(--space-4)',
            backgroundColor: 'var(--color-neutral-50)',
          }}
        >
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-12)' }}>Premium Partner</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-8)',
              }}
            >
              {featuredBusinesses.map((business) => (
                <Card key={business.id} elevated hoverable>
                  <CardHeader style={{ paddingBottom: 0 }}>
                    {business.logo_url && (
                      <img
                        src={business.logo_url}
                        alt={business.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </CardHeader>
                  <CardBody>
                    <h3>{business.name}</h3>
                    <p
                      style={{
                        color: 'var(--color-neutral-600)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {business.description?.substring(0, 100)}...
                    </p>
                    <Link href={`/unternehmen/${business.slug}`}>
                      <Button variant="primary" size="sm" style={{ width: '100%' }}>
                        Profil ansehen
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== UPCOMING EVENTS =====*/}
      {upcomingEvents.length > 0 && (
        <section style={{ padding: 'var(--space-20) var(--space-4)' }}>
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-12)' }}>Kommende Events</h2>

            <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
              {upcomingEvents.map((event) => (
                <Card key={event.id} hoverable>
                  <CardBody style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        style={{
                          width: '200px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-base)',
                        }}
                      />
                    )}
                    <div>
                      <h3>{event.title}</h3>
                      <p
                        style={{
                          color: 'var(--color-neutral-600)',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        📅 {new Date(event.date_start).toLocaleDateString('de-DE')}
                      </p>
                      <p
                        style={{
                          color: 'var(--color-neutral-600)',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        📍 {event.location}
                      </p>
                      <Link href={`/events/${event.id}`}>
                        <Button variant="primary" size="sm">
                          Mehr erfahren
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
              <Link href="/events">
                <Button variant="outline" size="lg">
                  Alle Events ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA SECTION =====*/}
      <section
        style={{
          background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)`,
          color: 'white',
          padding: 'var(--space-16) var(--space-4)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 style={{ color: 'white' }}>Du hast ein lokales Unternehmen?</h2>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', opacity: 0.95 }}>
            Registriere dein Unternehmen kostenlos und erreiche tausende lokale Kunden!
          </p>
          <Link href="/unternehmen-registrieren">
            <Button variant="primary" size="lg">
              Jetzt kostenlos registrieren
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
