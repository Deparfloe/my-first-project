/**
 * Business Registration Page
 * Signup + Business-Profil Erstellung
 */

'use client'

import { useState, FormEvent } from 'react'
import { Button, Input, Card, CardBody, CardHeader } from '@/components/ui'
import { sendOTP } from '@/server/auth'
import { BUSINESS_CATEGORIES } from '@/config'
import styles from './register.module.css'

type RegistrationStep = 'email' | 'otp' | 'business-details' | 'success'

export default function RegisterBusinessPage() {
  const [step, setStep] = useState<RegistrationStep>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await sendOTP(email)
      if (result.success) {
        setStep('otp')
      } else {
        setError(result.error || 'Fehler beim Versenden der OTP')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault()
    // TODO: Implement OTP verification
    setStep('business-details')
  }

  const handleBusinessDetails = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement business creation
      setStep('success')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  return (
    <main style={{ padding: 'var(--space-12) var(--space-4)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          Dein Unternehmen registrieren
        </h1>

        <Card>
          <CardBody style={{ padding: 'var(--space-8)' }}>
            {/* STEP 1: EMAIL */}
            {step === 'email' && (
              <form onSubmit={handleSendOTP}>
                <h2 style={{ marginBottom: 'var(--space-6)' }}>Schritt 1: E-Mail verifizieren</h2>

                <Input
                  type="email"
                  label="E-Mail-Adresse"
                  placeholder="your@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={error ? 'Ungültig' : undefined}
                />

                {error && <p style={{ color: 'var(--color-error)', marginTop: 'var(--space-4)' }}>{error}</p>}

                <Button type="submit" variant="primary" isLoading={isLoading} style={{ width: '100%', marginTop: 'var(--space-6)' }}>
                  Verifizierungscode senden
                </Button>
              </form>
            )}

            {/* STEP 2: OTP */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP}>
                <h2 style={{ marginBottom: 'var(--space-6)' }}>Schritt 2: OTP eingeben</h2>

                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
                  Wir haben einen Code an {email} gesendet
                </p>

                <Input
                  type="text"
                  label="Verifizierungscode"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                {error && <p style={{ color: 'var(--color-error)', marginTop: 'var(--space-4)' }}>{error}</p>}

                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('email')}
                    style={{ flex: 1 }}
                  >
                    Zurück
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading} style={{ flex: 1 }}>
                    Verifizieren
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: BUSINESS DETAILS */}
            {step === 'business-details' && (
              <form onSubmit={handleBusinessDetails}>
                <h2 style={{ marginBottom: 'var(--space-6)' }}>Schritt 3: Unternehmensdaten</h2>

                <Input
                  type="text"
                  label="Unternehmenname"
                  placeholder="z.B. Pizzeria Rosso"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />

                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-3)', fontWeight: 500 }}>
                    Beschreibung (max 500 Zeichen)
                  </label>
                  <textarea
                    placeholder="Beschreibe dein Unternehmen..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value.substring(0, 500))}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-base)',
                      border: '1px solid var(--color-neutral-300)',
                      fontFamily: 'inherit',
                      fontSize: 'var(--text-base)',
                      resize: 'vertical',
                    }}
                    required
                  />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginTop: 'var(--space-2)' }}>
                    {description.length}/500
                  </p>
                </div>

                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-3)', fontWeight: 500 }}>
                    Kategorie(n) wählen
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 'var(--space-3)',
                    }}
                  >
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <label
                        key={cat.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          padding: 'var(--space-3)',
                          border: '1px solid var(--color-neutral-300)',
                          borderRadius: 'var(--radius-base)',
                          cursor: 'pointer',
                          background: selectedCategories.includes(cat.id)
                            ? 'rgba(45, 80, 22, 0.05)'
                            : 'transparent',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>
                          {cat.icon} {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {error && <p style={{ color: 'var(--color-error)', marginTop: 'var(--space-4)' }}>{error}</p>}

                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('otp')}
                    style={{ flex: 1 }}
                  >
                    Zurück
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading} style={{ flex: 1 }}>
                    Registrieren
                  </Button>
                </div>
              </form>
            )}

            {/* SUCCESS */}
            {step === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-6)' }}>✅</div>
                <h2>Herzlichen Glückwunsch!</h2>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
                  Dein Unternehmen wurde erfolgreich registriert.
                </p>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-8)' }}>
                  Dein Profil wird in Kürze überprüft und dann veröffentlicht.
                </p>
                <Button variant="primary" style={{ width: '100%' }}>
                  Zum Account
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card style={{ marginTop: 'var(--space-8)' }}>
          <CardHeader style={{ background: 'var(--color-neutral-50)' }}>
            <h3 style={{ marginBottom: 0 }}>❓ Das Basic Paket umfasst</h3>
          </CardHeader>
          <CardBody>
            <ul style={{ marginLeft: 'var(--space-6)' }}>
              <li>Kostenfreies Profil</li>
              <li>Bis zu 3 Events</li>
              <li>1 Bild/Logo</li>
              <li>Postfach-System für Kundennachrichten</li>
              <li>Eintrag im Verzeichnis</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
