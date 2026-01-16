import { Metadata } from 'next'
import { searchBusinessesByProblem } from '@/server/actions'
import { BASE_URL, COLORS } from '@/config'
import { Card, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurants im Rheingau - Lokale Gastronomie',
  description: 'Entdecke die besten Restaurants in der Rheingau. Von traditioneller bis moderner Küche - finde dein Lieblings-Restaurant!',
  keywords: ['Restaurants Rheingau', 'Gastronomie', 'Essen gehen', 'Rheinau Restaurants'],
}

export default async function RheingauRestaurantsPage() {
  // Fetch restaurants by searching for "restaurant" category
  const result = await searchBusinessesByProblem('restaurant', undefined, {
    pageSize: 20,
    page: 1,
  })
  const restaurants = result.success ? result.data : []

  return (
    <main style={{ padding: 'var(--space-6)' }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%)`,
          color: 'white',
          padding: 'var(--space-16) var(--space-6)',
          borderRadius: '12px',
          marginBottom: 'var(--space-12)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5em', marginBottom: 'var(--space-4)' }}>
          🍽️ Restaurants in der Rheingau
        </h1>
        <p style={{ fontSize: '1.1em', opacity: 0.95 }}>
          Entdecke {restaurants.length || 0} fantastische Restaurants und Gaststätten
        </p>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {restaurants.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/verzeichnis/${restaurant.id}`}>
                <Card variant="elevated" style={{ cursor: 'pointer', height: '100%' }}>
                  <div style={{ padding: 'var(--space-6)' }}>
                    {restaurant.image_url && (
                      <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: 'var(--space-4)',
                        }}
                      />
                    )}
                    <h3 style={{ marginBottom: 'var(--space-2)' }}>{restaurant.name}</h3>
                    <p style={{ color: '#666', marginBottom: 'var(--space-4)', minHeight: '60px' }}>
                      {restaurant.description.slice(0, 100)}...
                    </p>
                    <Button variant="outline" size="sm">
                      Profil ansehen
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card variant="default">
            <div style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
                Aktuell sind noch keine Restaurants eingetragen.
              </p>
              <Link href="/unternehmen-registrieren">
                <Button variant="primary">Dein Restaurant registrieren</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
