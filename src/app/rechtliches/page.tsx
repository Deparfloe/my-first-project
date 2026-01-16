/**
 * Datenschutz & Rechtliches
 */

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz | Rheingau Portal',
  robots: {
    index: false, // Don't index legal pages
  },
}

export default function PrivacyPage() {
  return (
    <main style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1>Datenschutz & Rechtliches</h1>

        <h2>⚖️ Wichtige Hinweise für Nutzer & Unternehmen</h2>

        <p style={{ marginTop: 'var(--space-6)' }}>
          Folgende Bestimmungen sind bindend für alle Nutzer und registrierten Unternehmen auf dieser Plattform:
        </p>

        <h3>1. Haftungsausschluss für Unternehmen</h3>
        <p>
          Alle Inhalte, die von Unternehmen auf dieser Plattform eingestellt werden, sind deren eigene Verantwortung.
          Die Plattform ist nicht haftbar für:
        </p>
        <ul>
          <li>Falsche oder irreführende Informationen von Unternehmen</li>
          <li>Verstöße gegen Gesetze durch eingestellte Inhalte</li>
          <li>Verletzung von Urheberrechten oder Markenrechten</li>
          <li>Geschäftsausfälle oder Verluste durch fehlerhafte Daten</li>
        </ul>

        <h3>2. Content-Moderation & Compliance</h3>
        <p>
          Wir prüfen alle eingestellten Inhalte auf:
        </p>
        <ul>
          <li>Korrekte Geschäftsdaten und Kontaktinformationen</li>
          <li>Einhaltung von Werberichtlinien (kein Spam, keine Hate Speech)</li>
          <li>Datenschutz-Compliance (DSGVO)</li>
          <li>Rechtmäßigkeit der Informationen</li>
        </ul>
        <p>
          <strong>Bei Verstößen:</strong> Inhalte werden gelöscht und der Account kann gesperrt werden.
        </p>

        <h3>3. Datenschutz (DSGVO)</h3>
        <p>
          Deine Daten sind bei uns sicher. Wir speichern nur das Minimum an Informationen für den Betrieb der Plattform.
          Weitere Details in unserer <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>

        <h3>4. Nutzungsbedingungen für Unternehmen</h3>
        <ul>
          <li>Kostenfreie Basic-Profile müssen korrekte Daten enthalten</li>
          <li>Spamming, Fake-Reviews und Manipulation werden nicht toleriert</li>
          <li>Premium-Accounts können ohne Rückerstattung widerrufen werden bei Verstößen</li>
          <li>Keine illegalen Aktivitäten oder Diskriminierung</li>
        </ul>

        <h3>5. E-Mail Verification</h3>
        <p>
          Alle Registrierungen erfolgen mit Double-Opt-In per E-Mail. Dies schützt vor Missbrauch und Spam.
        </p>

        <h2 style={{ marginTop: 'var(--space-12)' }}>❓ Fragen?</h2>
        <p>
          Kontaktiere uns unter: <a href="mailto:support@rheingau.de">support@rheingau.de</a>
        </p>
      </div>
    </main>
  )
}
