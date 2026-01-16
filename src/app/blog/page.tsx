/**
 * Blog - CMS für regionale Inhalte
 * SEO-optimiert, Category-basiert, Interne Links
 */

import { Metadata } from 'next'
import { Button, Card, CardBody } from '@/components/ui'
import { APP_NAME } from '@/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Blog | ${APP_NAME}`,
  description: 'Lese Artikel über lokale Events, Unternehmen und Leben im Rheingau.',
  robots: {
    index: true,
    follow: true,
  },
}

// Mock Blog Posts (später aus DB)
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Die besten Weingüter im Rheingau - Ein Guide',
    slug: 'beste-weinguter-rheingau',
    excerpt: 'Entdecke die Top-Weingüter der Region mit einmaligen Weinfesten und Verkostungen.',
    category: 'Weingüter',
    date: '2026-01-15',
    readTime: 8,
    image: '/blog/wine.jpg',
  },
  {
    id: '2',
    title: 'Top 10 Restaurants im Rheingau',
    slug: 'top-restaurants-rheingau',
    excerpt: 'Von traditionsreich bis modern: Die besten Restaurants der Region.',
    category: 'Restaurants',
    date: '2026-01-12',
    readTime: 6,
    image: '/blog/food.jpg',
  },
  {
    id: '3',
    title: 'Events im Januar - Was ist los im Rheingau?',
    slug: 'events-januar-rheingau',
    excerpt: 'Aktuelle Events und Veranstaltungen, die du nicht verpassen solltest.',
    category: 'Events',
    date: '2026-01-10',
    readTime: 4,
    image: '/blog/events.jpg',
  },
]

export default function BlogPage() {
  return (
    <main style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>Blog</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-600)' }}>
            Entdecke lokale Guides, Events und Tipps rund um den Rheingau
          </p>
        </div>

        {/* Featured Post */}
        {BLOG_POSTS.length > 0 && (
          <Card style={{ marginBottom: 'var(--space-12)' }} hoverable>
            <CardBody style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: 'var(--space-2) var(--space-4)',
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {BLOG_POSTS[0].category}
                </span>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>{BLOG_POSTS[0].title}</h2>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
                  {BLOG_POSTS[0].excerpt}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>
                  📅 {new Date(BLOG_POSTS[0].date).toLocaleDateString('de-DE')} • ☕ {BLOG_POSTS[0].readTime} min Lesezeit
                </p>
                <Link href={`/blog/${BLOG_POSTS[0].slug}`}>
                  <Button variant="primary">Artikel lesen</Button>
                </Link>
              </div>
              {BLOG_POSTS[0].image && (
                <img
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)',
                  }}
                />
              )}
            </CardBody>
          </Card>
        )}

        {/* All Posts */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{ marginBottom: 'var(--space-8)' }}>Neueste Artikel</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {BLOG_POSTS.slice(1).map((post) => (
              <Card key={post.id} hoverable>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <CardBody>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: 'var(--space-1) var(--space-3)',
                      backgroundColor: 'var(--color-neutral-200)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      marginBottom: 'var(--space-3)',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {post.category}
                  </span>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>{post.title}</h3>
                  <p
                    style={{
                      color: 'var(--color-neutral-600)',
                      marginBottom: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-4)' }}>
                    {new Date(post.date).toLocaleDateString('de-DE')} • {post.readTime} min
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm" style={{ width: '100%' }}>
                      Lesen →
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', color: 'white' }}>
          <CardBody style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Du hast eine Story?</h2>
            <p style={{ marginBottom: 'var(--space-6)', opacity: 0.95 }}>
              Schreib einen Artikel über dein Unternehmen oder Event
            </p>
            <Button variant="secondary">Artikel schreiben</Button>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
