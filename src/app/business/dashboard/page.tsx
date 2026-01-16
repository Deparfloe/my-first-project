'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPaymentHistory, cancelSubscription } from '@/server/payments'
import { COLORS } from '@/config'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'

// Placeholder user object - in production, get from Supabase session
const TEMP_USER = {
  id: 'temp-user-id',
  email: 'user@example.com',
  subscription_tier: 'basic',
  role: 'business',
}

export default function BusinessDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(TEMP_USER)
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        // Note: In production, implement getSession() to retrieve
        // the current user from Supabase Auth
        setUser(TEMP_USER)

        // Get payment history
        const paymentsResult = await getPaymentHistory(TEMP_USER.id, 10, 0)
        if (paymentsResult.success) {
          setPayments(paymentsResult.data)
        }
      } catch (err) {
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleCancelSubscription = async () => {
    if (!user?.id) return

    setCanceling(true)
    try {
      const result = await cancelSubscription(user.id)
      if (result.success) {
        setUser({ ...user, subscription_tier: 'basic' })
        alert('Subscription canceled successfully')
      } else {
        setError(result.error || 'Failed to cancel subscription')
      }
    } finally {
      setCanceling(false)
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 'var(--space-6)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', marginTop: 'var(--space-12)' }}>
          <p>Loading dashboard...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main style={{ padding: 'var(--space-6)', background: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: 'var(--space-8)' }}>Business Dashboard</h1>

        {error && (
          <div
            style={{
              background: '#fee',
              border: '1px solid #f99',
              borderRadius: '4px',
              padding: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
              color: '#a00',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Current Plan */}
          <Card variant="elevated">
            <div style={{ padding: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Aktueller Plan</h3>
              <div
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  textTransform: 'capitalize',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {user.subscription_tier || 'basic'}
              </div>
              {user.subscription_tier === 'basic' ? (
                <Link href="/business/subscription">
                  <Button variant="primary">Upgrade to Premium</Button>
                </Link>
              ) : (
                <Button
                  variant="danger"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                >
                  {canceling ? 'Canceling...' : 'Cancel Subscription'}
                </Button>
              )}
            </div>
          </Card>

          {/* Profile */}
          <Card variant="elevated">
            <div style={{ padding: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Profile</h3>
              <p style={{ margin: 0 }}>{user.email}</p>
              <p style={{ margin: 0, color: '#666', fontSize: 'var(--text-sm)' }}>
                Role: {user.role}
              </p>
              <Link href="/unternehmen-registrieren">
                <Button variant="secondary" size="sm" style={{ marginTop: 'var(--space-4)' }}>
                  Edit Profile
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated">
            <div style={{ padding: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Link href="/verzeichnis">
                  <Button variant="ghost" size="sm">
                    View Directory
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="ghost" size="sm">
                    View Events
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment History */}
        <Card variant="default">
          <div style={{ padding: 'var(--space-6)' }}>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Payment History</h2>

            {payments.length === 0 ? (
              <p style={{ color: '#666' }}>No payments yet</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)' }}>Amount</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <td style={{ padding: 'var(--space-4)' }}>
                          {new Date(payment.created_at).toLocaleDateString('de-DE')}
                        </td>
                        <td style={{ padding: 'var(--space-4)', textTransform: 'capitalize' }}>
                          {payment.type}
                        </td>
                        <td style={{ padding: 'var(--space-4)' }}>
                          €{payment.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: 'var(--space-4)' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.25em 0.75em',
                              borderRadius: '4px',
                              fontSize: 'var(--text-sm)',
                              background:
                                payment.status === 'completed'
                                  ? '#d4edda'
                                  : payment.status === 'failed'
                                    ? '#f8d7da'
                                    : '#e2e3e5',
                              color:
                                payment.status === 'completed'
                                  ? '#155724'
                                  : payment.status === 'failed'
                                    ? '#721c24'
                                    : '#383d41',
                              textTransform: 'capitalize',
                            }}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  )
}
