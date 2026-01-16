/**
 * Admin Dashboard - Management-Hub
 * Moderation, Analytics, Content-Analyse
 */

'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input } from '@/components/ui'
import styles from './admin.module.css'

type AdminTab = 'overview' | 'businesses' | 'events' | 'users' | 'moderation' | 'analytics'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  return (
    <main style={{ padding: 'var(--space-8) var(--space-4)' }}>
      <div className="container">
        <h1 style={{ marginBottom: 'var(--space-12)' }}>Admin Dashboard</h1>

        {/* Tabs Navigation */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--color-neutral-200)',
            overflowX: 'auto',
          }}
        >
          {(['overview', 'businesses', 'events', 'users', 'moderation', 'analytics'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  borderBottom: activeTab === tab ? '3px solid var(--color-primary)' : 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-neutral-600)',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Überblick</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-12)',
              }}
            >
              {[
                { title: 'Unternehmen', value: '142', trend: '+12% diese Woche' },
                { title: 'Events', value: '1,203', trend: '+45% diese Woche' },
                { title: 'Nutzer', value: '5,821', trend: '+8% diese Woche' },
                { title: 'Pending Verifications', value: '23', trend: '⚠️ Aktion erforderlich' },
              ].map((stat) => (
                <Card key={stat.title}>
                  <CardBody>
                    <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)' }}>
                      {stat.title}
                    </p>
                    <h3 style={{ marginBottom: 'var(--space-2)' }}>{stat.value}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                      {stat.trend}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>Letzte Aktivitäten</CardHeader>
              <CardBody>
                <p style={{ color: 'var(--color-neutral-500)' }}>
                  Aktivitätsverlauf wird hier angezeigt...
                </p>
              </CardBody>
            </Card>
          </div>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === 'businesses' && (
          <div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <Input
                placeholder="Unternehmen suchen..."
                style={{ flex: 1 }}
              />
              <Button variant="primary">Suchen</Button>
            </div>

            <Card>
              <CardBody>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-neutral-200)' }}>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontWeight: 600 }}>Name</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontWeight: 600 }}>Kategorie</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontWeight: 600 }}>Status</th>
                      <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontWeight: 600 }}>Plan</th>
                      <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontWeight: 600 }}>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                        <td style={{ padding: 'var(--space-4)' }}>Pizzeria Rosso</td>
                        <td style={{ padding: 'var(--space-4)' }}>🍽️ Restaurants</td>
                        <td style={{ padding: 'var(--space-4)' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: 'var(--space-1) var(--space-3)',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'var(--color-success)',
                              color: 'white',
                              fontSize: 'var(--text-sm)',
                            }}
                          >
                            Verifiziert
                          </span>
                        </td>
                        <td style={{ padding: 'var(--space-4)' }}>Premium</td>
                        <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        )}

        {/* MODERATION TAB */}
        {activeTab === 'moderation' && (
          <div>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Content-Moderation</h2>
            <Card>
              <CardBody>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-6)' }}>
                  <strong>23 Items</strong> warten auf Moderation
                </p>

                {[1, 2, 3].map((i) => (
                  <Card key={i} style={{ marginBottom: 'var(--space-4)' }}>
                    <CardBody style={{ padding: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h4>Neue Business-Registrierung</h4>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                            "Pizzeria Napoli" - Restaurant
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <Button variant="primary" size="sm">✓ Genehmigen</Button>
                          <Button variant="danger" size="sm">✗ Ablehnen</Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Analytics & Insights</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              <Card>
                <CardHeader>Top Kategorien</CardHeader>
                <CardBody>
                  <p style={{ marginBottom: 'var(--space-3)' }}>🍽️ Restaurants - 234 views</p>
                  <p style={{ marginBottom: 'var(--space-3)' }}>🍇 Weingüter - 198 views</p>
                  <p style={{ marginBottom: 'var(--space-3)' }}>🏨 Unterkunft - 156 views</p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>Top Events</CardHeader>
                <CardBody>
                  <p style={{ marginBottom: 'var(--space-3)' }}>Weintest 2026 - 1.2K views</p>
                  <p style={{ marginBottom: 'var(--space-3)' }}>Rheingau Marathon - 892 views</p>
                  <p style={{ marginBottom: 'var(--space-3)' }}>Street Food Fest - 654 views</p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>Revenue</CardHeader>
                <CardBody>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                    €4,829
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Diesen Monat
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
