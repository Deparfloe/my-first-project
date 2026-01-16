import type { Metadata, Viewport } from 'next'
import { APP_NAME, APP_DESCRIPTION, BASE_URL, SEO_CONFIG, COLORS } from '@/config'
import { Button } from '@/components/ui'
import Link from 'next/link'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: 'Rheingau Portal' }],
  creator: 'Rheingau Portal',
  publisher: 'Rheingau Portal',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: BASE_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [SEO_CONFIG.ogImage],
    creator: SEO_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: APP_NAME,
              description: APP_DESCRIPTION,
              url: BASE_URL,
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Hessen',
                addressCountry: 'DE',
              },
            }),
          }}
        />
      </head>
      <body>
        {/* HEADER */}
        <header
          style={{
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) var(--space-6)',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {/* Logo */}
            <Link href="/">
              <div
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  textDecoration: 'none',
                }}
              >
                🍇 {APP_NAME}
              </div>
            </Link>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-6)',
                alignItems: 'center',
              }}
            >
              <Link href="/verzeichnis" style={{ color: 'inherit', textDecoration: 'none' }}>
                Verzeichnis
              </Link>
              <Link href="/events" style={{ color: 'inherit', textDecoration: 'none' }}>
                Events
              </Link>
              <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
                Blog
              </Link>
            </div>

            {/* CTA */}
            <Link href="/unternehmen-registrieren">
              <Button variant="secondary" size="sm">
                Registrieren
              </Button>
            </Link>
          </nav>
        </header>

        {/* MAIN */}
        {children}

        {/* FOOTER */}
        <footer
          style={{
            background: COLORS.primary,
            color: 'white',
            padding: 'var(--space-12) var(--space-6)',
            marginTop: 'var(--space-20)',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-12)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Über uns</h3>
                <p style={{ opacity: 0.9 }}>
                  {APP_NAME} - Das lokale Portal für Unternehmen & Events im Rheingau
                </p>
              </div>
              <div>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Schnelllinks</h3>
                <ul style={{ listStyle: 'none', marginLeft: 0 }}>
                  <li><Link href="/verzeichnis" style={{ color: 'white', opacity: 0.8 }}>Verzeichnis</Link></li>
                  <li><Link href="/events" style={{ color: 'white', opacity: 0.8 }}>Events</Link></li>
                  <li><Link href="/blog" style={{ color: 'white', opacity: 0.8 }}>Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Rechtliches</h3>
                <ul style={{ listStyle: 'none', marginLeft: 0 }}>
                  <li><Link href="/rechtliches" style={{ color: 'white', opacity: 0.8 }}>Rechtliches</Link></li>
                  <li><Link href="mailto:support@rheingau.de" style={{ color: 'white', opacity: 0.8 }}>Kontakt</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 'var(--space-6)', textAlign: 'center', opacity: 0.7 }}>
              <p>© 2026 {APP_NAME}. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
      </body>
    </html>
  );
}
