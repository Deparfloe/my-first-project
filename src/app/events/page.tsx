/**
 * Events Page - Event-Kalender & Listenansicht
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import { Button, Card, CardBody } from '@/components/ui'
import { getUpcomingEvents } from '@/server/actions'
import { APP_NAME } from '@/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Events im Rheingau | ${APP_NAME}`,
  description: 'Entdecke lokale Events, Veranstaltungen und Aktivitäten im Rheingau.',
  robots: {
    index: true,
    follow: true,
  },
}

interface PageProps {
  searchParams: {
    page?: string
  }
}

async function EventsList({ page }: { page: number }) {
  const pageSize = 10
  const offset = (page - 1) * pageSize
  const { data: events, total, hasMore } = await getUpcomingEvents(pageSize, offset)

  if (!events || events.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
        <p style={{ color: 'var(--color-neutral-500)' }}>
          Keine bevorstehenden Events gefunden.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'grid', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        {events.map((event) => (
          <Card key={event.id} hoverable>
            <CardBody style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  style={{
                    width: '100%',
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
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  📅 {new Date(event.date_start).toLocaleDateString('de-DE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p
                  style={{
                    color: 'var(--color-neutral-600)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  📍 {event.location}
                </p>
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  {event.description?.substring(0, 150)}...
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

      {/* Pagination */}
      {(total || 0) > pageSize && (
        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
            Seite {page} von {Math.ceil((total || 0) / pageSize)}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            {page > 1 && (
              <Link href={`/events?page=${page - 1}`}>
                <Button variant="outline">← Zurück</Button>
              </Link>
            )}
            {hasMore && (
              <Link href={`/events?page=${page + 1}`}>
                <Button variant="outline">Weiter →</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EventsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1')

  return (
    <main style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <div className="container">
        <h1 style={{ marginBottom: 'var(--space-6)' }}>Events im Rheingau</h1>
        <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-12)' }}>
          Entdecke kommende Veranstaltungen und Aktivitäten
        </p>

        <Suspense fallback={<div>Events werden geladen...</div>}>
          <EventsList page={page} />
        </Suspense>
      </div>
    </main>
  )
}
