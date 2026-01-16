'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createSubscriptionCheckout, verifySubscriptionCheckout } from '@/server/payments'
import { getCurrentUser } from '@/server/auth'
import { PREMIUM_PRICE, COLORS } from '@/config'
import { Button, Card } from '@/components/ui'
import { SUBSCRIPTION_BENEFITS } from '@/constants'

export default function SubscriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Verify successful payment
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      setVerifying(true)
      verifySubscriptionCheckout(sessionId)
        .then((result) => {
          if (result.success) {
            setSuccess(true)
            setTimeout(() => {
              router.push('/business/dashboard')
            }, 3000)
          } else {
            setError(result.error || 'Payment verification failed')
          }
        })
        .finally(() => setVerifying(false))
    }

    // Note: To get current user, you need to implement a server action
    // that retrieves the session from Supabase Auth
    setUser({ id: 'temp-id', email: 'user@example.com' })
  }, [searchParams, router])

  const handleSubscribe = async () => {
    if (!user) {
      setError('You must be logged in to subscribe')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createSubscriptionCheckout(
        user.id,
        user.email,
        `${window.location.origin}/business/subscription`
      )

      if (result.success && result.data?.url) {
        window.location.href = result.data.url
      } else {
        setError(result.error || 'Failed to create checkout')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Verification in progress
  if (verifying) {
    return (
      <main style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: 'var(--space-12)' }}>
          <h1>Verifying payment...</h1>
          <p style={{ color: '#666' }}>Please wait while we process your subscription.</p>
        </div>
      </main>
    )
  }

  // Success state
  if (success) {
    return (
      <main style={{ padding: 'var(--space-6)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: 'var(--space-12)' }}>
          <Card variant="default">
            <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
              <div style={{ fontSize: '3em', marginBottom: 'var(--space-4)' }}>✅</div>
              <h1>Subscription Successful!</h1>
              <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
                Your premium subscription is now active. Redirecting to your dashboard...
              </p>
              <Button onClick={() => router.push('/business/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </main>
    )
  }

  // Main subscription page
  return (
    <main style={{ padding: 'var(--space-6)', background: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', marginTop: 'var(--space-8)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          Premium Subscription
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Pricing Card */}
          <Card variant="elevated">
            <div style={{ padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-2)' }}>Premium Plan</h2>
              <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
                Unlock all features for your business
              </p>

              <div
                style={{
                  fontSize: '2.5em',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginBottom: 'var(--space-2)',
                }}
              >
                €{PREMIUM_PRICE}
              </div>
              <p style={{ color: '#666', marginBottom: 'var(--space-6)' }}>
                per month, cancel anytime
              </p>

              {error && (
                <div
                  style={{
                    background: '#fee',
                    border: '1px solid #f99',
                    borderRadius: '4px',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                    color: '#a00',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  {error}
                </div>
              )}

              <Button
                onClick={handleSubscribe}
                disabled={loading || !user}
                style={{
                  width: '100%',
                  background: COLORS.primary,
                  color: 'white',
                }}
              >
                {loading ? 'Processing...' : 'Start Premium'}
              </Button>
            </div>
          </Card>

          {/* Benefits */}
          <div>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>What You Get:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {SUBSCRIPTION_BENEFITS.map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2em', flexShrink: 0 }}>✅</span>
                  <div>
                    <strong>{benefit.title}</strong>
                    <p style={{ color: '#666', fontSize: 'var(--text-sm)', margin: 0 }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <Card variant="default">
          <div style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Häufig gestellte Fragen</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {[
                {
                  q: 'Kann ich mein Abonnement jederzeit kündigen?',
                  a: 'Ja, Sie können Ihr Abonnement jederzeit ohne Strafen kündigen.',
                },
                {
                  q: 'Ist meine Kreditkarte sicher?',
                  a: 'Ja, wir verwenden Stripe für sichere Zahlungen. Ihre Kartendaten werden nicht auf unseren Servern gespeichert.',
                },
                {
                  q: 'Wie lange dauert die Aktivierung?',
                  a: 'Ihre Premium-Funktionen sind sofort nach erfolgreicher Zahlung aktiviert.',
                },
              ].map((faq, idx) => (
                <div key={idx}>
                  <strong style={{ color: COLORS.primary }}>{faq.q}</strong>
                  <p style={{ color: '#666', margin: '0.5em 0 0 0' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
