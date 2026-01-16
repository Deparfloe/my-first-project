/**
 * Business Directory - Verzeichnis-Seite
 * Intelligente Suche mit Problem-Matcher
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import { Button, Card, CardBody, Input } from '@/components/ui'
import { searchBusinessesByProblem, getAllCategories } from '@/server/actions'
import { APP_NAME } from '@/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Unternehmen-Verzeichnis | ${APP_NAME}`,
  description: 'Finde lokale Unternehmen in deiner Nähe. Suchbar nach Kategorie, Art der Leistung und Problem.',
  robots: {
    index: true,
    follow: true,
  },
}

interface PageProps {
  searchParams: {
    q?: string
    kategorie?: string
    page?: string
  }
}

async function BusinessGrid({
  query,
  categoryId,
  page,
}: {
  query?: string
  categoryId?: string
  page: number
}) {
  const { data: results, total, hasMore } = await searchBusinessesByProblem(
    query || '',
    categoryId,
    { page, pageSize: 20 }
  )

  if (!results || results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
        <p style={{ color: 'var(--color-neutral-500)' }}>
          Keine Unternehmen gefunden. Versuche eine andere Suche.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {results.map((business) => (
          <Card key={business.id} hoverable>
            <CardBody>
              <h3>{business.name}</h3>
              <p
                style={{
                  color: 'var(--color-neutral-600)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {business.description?.substring(0, 100)}...
              </p>
              <Link href={`/unternehmen/${business.id}`}>
                <Button variant="primary" size="sm" style={{ width: '100%' }}>
                  Profil ansehen
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {(total || 0) > 20 && (
        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
            Seite {page} von {Math.ceil((total || 0) / 20)} ({total || 0} Unternehmen gefunden)
          </p>
          {hasMore && (
            <Button variant="outline">Weitere laden</Button>
          )}
        </div>
      )}
    </div>
  )
}

async function CategoriesFilter({ selectedCategory }: { selectedCategory?: string }) {
  const { data: categories = [] } = await getAllCategories()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-8)',
      }}
    >
      {categories.map((cat) => (
        <Link key={cat.id} href={`/verzeichnis?kategorie=${cat.slug}`}>
          <Button
            variant={selectedCategory === cat.slug ? 'primary' : 'outline'}
            size="sm"
            style={{ width: '100%' }}
          >
            {cat.icon} {cat.name}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default function DirectoryPage({ searchParams }: PageProps) {
  const query = searchParams.q || ''
  const category = searchParams.kategorie
  const page = parseInt(searchParams.page || '1')

  return (
    <main style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <div className="container">
        <h1 style={{ marginBottom: 'var(--space-6)' }}>Unternehmen-Verzeichnis</h1>
        <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-12)' }}>
          Finde lokale Unternehmen nach deinen Bedürfnissen
        </p>

        {/* Search Bar */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <form
            action="/verzeichnis"
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
            }}
          >
            <input
              type="text"
              name="q"
              placeholder="Was brauchst du? (z.B. Pizzeria, Sanitär, Steuerberater...)"
              defaultValue={query}
              style={{
                flex: 1,
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--color-neutral-300)',
                fontSize: 'var(--text-base)',
              }}
            />
            <Button type="submit" variant="primary">
              Suchen
            </Button>
          </form>
        </div>

        {/* Categories Filter */}
        <Suspense fallback={<div>Kategorien werden geladen...</div>}>
          <CategoriesFilter selectedCategory={category} />
        </Suspense>

        {/* Business Grid */}
        <Suspense fallback={<div>Unternehmen werden geladen...</div>}>
          <BusinessGrid query={query} categoryId={category} page={page} />
        </Suspense>
      </div>
    </main>
  )
}
