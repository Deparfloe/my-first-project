import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BASE_URL, COLORS } from '@/config'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'

interface Props {
  params: {
    id: string
  }
}

// Mock event data - replace with actual database query
const MOCK_EVENTS: Record<
  string,
  {
    id: string
    businessId: string
    businessName: string
    businessSlug: string
    title: string
    description: string
    dateStart: string
    dateEnd: string
    location: string
    address: string
    imageUrl?: string
  }
> = {
  'rheingau-weintest-2024': {
    id: 'event1',
    businessId: 'biz1',
    businessName: 'Weingut am Berg',
    businessSlug: 'weingut-am-berg',
    title: 'Rheingau Weintest 2024',
    description:
      'Großes Weinfestival mit über 30 lokalen Weingütern. Kostproben, Live-Musik und regionale Spezialitäten. Perfekt für Weinliebhaber und alle, die es werden möchten!',
    dateStart: '2024-06-15',
    dateEnd: '2024-06-16',
    location: 'Rüdesheim am Rhein',
    address: 'Marktplatz 1, 65385 Rüdesheim',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = MOCK_EVENTS[params.id]

  if (!event) {
    return {
      title: 'Event nicht gefunden',
      description: 'Das gesuchte Event existiert nicht.',
    }
  }

  const fullUrl = `${BASE_URL}/events/${params.id}`

  return {
    title: `${event.title} | Rheingau Portal`,
    description: event.description.slice(0, 160),
    keywords: [event.title, event.location, 'Event', 'Rheingau'],
    openGraph: {
      type: 'website',
      url: fullUrl,
      title: event.title,
      description: event.description,
      images: event.imageUrl
        ? [
            {
              url: event.imageUrl,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description.slice(0, 160),
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const event = MOCK_EVENTS[params.id]

  if (!event) {
    notFound()
  }

  const startDate = new Date(event.dateStart)
  const endDate = new Date(event.dateEnd)
  const isMultiDay = startDate.toDateString() !== endDate.toDateString()

  // Generate JSON-LD Event schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${BASE_URL}/events/${params.id}`,
    name: event.title,
    description: event.description,
    image: event.imageUrl,
    url: `${BASE_URL}/events/${params.id}`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressStreet: event.address,
        addressRegion: 'Hessen',
        addressCountry: 'DE',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.businessName,
      url: `${BASE_URL}/verzeichnis/${event.businessSlug}`,
    },
  }

  return (
    <main style={{ padding: 'var(--space-6)', background: '#f9f9f9', minHeight: '100vh' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: 'var(--space-6)' }}>
        <nav style={{ fontSize: 'var(--text-sm)', color: '#666' }}>
          <Link href="/" style={{ color: COLORS.primary, textDecoration: 'none' }}>
            Startseite
          </Link>
          {' > '}
          <Link href="/events" style={{ color: COLORS.primary, textDecoration: 'none' }}>
            Events
          </Link>
          {' > '}
          <span>{event.title}</span>
        </nav>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Event Header */}
        <Card variant="elevated">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMultiDay ? '1fr' : '1fr',
              gap: 'var(--space-6)',
            }}
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            )}

            <div style={{ padding: 'var(--space-8)' }}>
              <h1 style={{ marginBottom: 'var(--space-4)' }}>{event.title}</h1>

              {/* Date & Time */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                  🕐 {startDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {isMultiDay && (
                  <p style={{ color: '#666' }}>
                    bis{' '}
                    {endDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>

              {/* Location */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                  📍 {event.location}
                </p>
                <p style={{ color: '#666' }}>{event.address}</p>
              </div>

              {/* Organizer */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-2)' }}>
                  Organisiert von:
                </p>
                <Link href={`/verzeichnis/${event.businessSlug}`}>
                  <Button variant="outline">{event.businessName}</Button>
                </Link>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <Button variant="primary">Interessant!</Button>
                <Button variant="secondary">Zur Webseite</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card variant="default" style={{ marginTop: 'var(--space-8)' }}>
          <div style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Details</h2>
            <p style={{ lineHeight: 1.8, color: '#333' }}>{event.description}</p>
          </div>
        </Card>

        {/* CTA Section */}
        <Card variant="elevated" style={{ marginTop: 'var(--space-12)' }}>
          <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Ihr Event bekannt machen!</h2>
            <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
              Registrieren Sie Ihr Unternehmen und präsentieren Sie Ihre Events im Rheingau Portal.
            </p>
            <Link href="/unternehmen-registrieren">
              <Button variant="primary">Jetzt registrieren</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}
