import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBusinessBySlug } from '@/server/actions'
import { BASE_URL, COLORS } from '@/config'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getBusinessBySlug(params.slug)

  if (!result.success || !result.data) {
    return {
      title: 'Unternehmen nicht gefunden',
      description: 'Das gesuchte Unternehmen existiert nicht.',
    }
  }

  const business = result.data
  const fullUrl = `${BASE_URL}/verzeichnis/${params.slug}`

  return {
    title: `${business.name} | Rheingau Portal`,
    description: business.description.slice(0, 160),
    keywords: [business.name, 'Rheingau', business.category_ids.join(', ')],
    authors: [{ name: business.name }],
    openGraph: {
      type: 'website',
      url: fullUrl,
      title: business.name,
      description: business.description.slice(0, 160),
      images: business.logo_url
        ? [
            {
              url: business.logo_url,
              width: 1200,
              height: 630,
              alt: business.name,
            },
          ]
        : [],
      siteName: 'Rheingau Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title: business.name,
      description: business.description.slice(0, 160),
      images: business.logo_url ? [business.logo_url] : [],
    },
  }
}

export default async function BusinessProfilePage({ params }: Props) {
  const result = await getBusinessBySlug(params.slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const business = result.data
  const rating = business.ratings?.length
    ? (
        business.ratings.reduce((sum, r) => sum + r.score, 0) / business.ratings.length
      ).toFixed(1)
    : null

  // Generate JSON-LD LocalBusiness schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/verzeichnis/${params.slug}`,
    name: business.name,
    description: business.description,
    image: business.logo_url,
    url: business.website || `${BASE_URL}/verzeichnis/${params.slug}`,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Rheingau-Taunus-Kreis',
      addressCountry: 'DE',
    },
    priceRange: '€€',
    sameAs: business.website ? [business.website] : [],
    aggregateRating:
      rating && business.ratings && business.ratings.length > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: parseFloat(rating),
            reviewCount: business.ratings.length,
          }
        : undefined,
  }

  return (
    <main style={{ padding: 'var(--space-6)', background: '#f9f9f9', minHeight: '100vh' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: 'var(--space-6)' }}>
        <nav style={{ fontSize: 'var(--text-sm)', color: '#666' }}>
          <Link href="/" style={{ color: COLORS.primary, textDecoration: 'none' }}>
            Startseite
          </Link>
          {' > '}
          <Link href="/verzeichnis" style={{ color: COLORS.primary, textDecoration: 'none' }}>
            Verzeichnis
          </Link>
          {' > '}
          <span>{business.name}</span>
        </nav>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with Logo and Info */}
        <Card variant="elevated">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 'var(--space-8)',
              padding: 'var(--space-8)',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <div>
              {business.logo_url ? (
                <img
                  src={business.logo_url}
                  alt={business.name}
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    background: COLORS.light,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                  }}
                >
                  Kein Logo
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 style={{ marginBottom: 'var(--space-4)' }}>{business.name}</h1>

              {rating && (
                <div style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <span>⭐ {rating}</span>
                  <span style={{ color: '#666', fontSize: 'var(--text-sm)' }}>
                    ({business.ratings?.length || 0} Bewertungen)
                  </span>
                </div>
              )}

              <p style={{ color: '#666', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                {business.description}
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                {business.website && (
                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary">Website besuchen</Button>
                  </a>
                )}
                {business.phone && (
                  <a href={`tel:${business.phone}`}>
                    <Button variant="secondary">Anrufen</Button>
                  </a>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`}>
                    <Button variant="outline">E-Mail schreiben</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-6)',
            margin: 'var(--space-8) 0',
          }}
        >
          {business.phone && (
            <Card variant="default">
              <div style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>📞 Telefon</h3>
                <a href={`tel:${business.phone}`} style={{ color: COLORS.primary, textDecoration: 'none' }}>
                  {business.phone}
                </a>
              </div>
            </Card>
          )}

          {business.email && (
            <Card variant="default">
              <div style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>✉️ E-Mail</h3>
                <a href={`mailto:${business.email}`} style={{ color: COLORS.primary, textDecoration: 'none' }}>
                  {business.email}
                </a>
              </div>
            </Card>
          )}

          {business.subscription_tier === 'premium' && (
            <Card variant="default">
              <div style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>⭐ Premium Member</h3>
                <p style={{ color: '#666', fontSize: 'var(--text-sm)', margin: 0 }}>
                  Verifikoziertes Premium-Profil
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Events */}
        {business.events && business.events.length > 0 && (
          <Card variant="default">
            <div style={{ padding: 'var(--space-6)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>📅 Aktuelle Events</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {business.events.map((event) => (
                  <div key={event.id} style={{ paddingBottom: 'var(--space-4)', borderBottom: '1px solid #eee' }}>
                    <h3 style={{ margin: '0 0 0.5em 0' }}>{event.title}</h3>
                    <p style={{ color: '#666', margin: '0 0 0.5em 0', fontSize: 'var(--text-sm)' }}>
                      📍 {event.location}
                    </p>
                    <p style={{ color: '#666', margin: '0 0 0.5em 0', fontSize: 'var(--text-sm)' }}>
                      🕐 {new Date(event.date_start).toLocaleDateString('de-DE')}
                    </p>
                    <p style={{ margin: '0.5em 0', color: '#333' }}>{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <Card variant="elevated" style={{ marginTop: 'var(--space-12)' }}>
          <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Möchten Sie auch im Verzeichnis gelistet sein?</h2>
            <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
              Registrieren Sie Ihr Unternehmen kostenlos und erreichen Sie mehr Kunden!
            </p>
            <Link href="/unternehmen-registrieren">
              <Button variant="primary">Unternehmen registrieren</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}
