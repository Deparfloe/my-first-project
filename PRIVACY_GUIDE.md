# 🔐 PRIVACY & REPOSITORY SETUP

## GitHub Repository Privat Stellen

Das Repository ist bereits unter `https://github.com/Deparfloe/my-first-project`

### ✅ Schritt-für-Schritt (GitHub Web)

1. **Gehe zu GitHub:** https://github.com/Deparfloe/my-first-project
2. **Klicke auf Settings (Zahnrad-Icon)**
3. **Scrolle zu "Danger Zone"**
4. **Klicke "Change repository visibility"**
5. **Wähle "Private"** ✅
6. **Bestätige mit deinem Passwort**

**Status nach diesem Schritt:** Repository ist PRIVAT
- ✅ Nur du kannst es sehen
- ✅ Nur du kannst es clonen
- ✅ Code ist nicht öffentlich sichtbar

---

## Weitere Privacy-Einstellungen

### GitHub Settings überprüfen:

1. **Settings → Access**
   - Collaborators: ✅ Nur du
   - Teams: ✅ Keine

2. **Settings → Branches**
   - Branch protection rules (optional, für Sicherheit)

3. **Settings → Actions**
   - GitHub Actions: Disable (falls nicht genutzt)

4. **.gitignore überprüfen** ✅ Already set:
   ```
   .env.local          # 🔒 Secrets NICHT committen!
   .next/
   node_modules/
   *.log
   .DS_Store
   ```

---

## Lokale Sicherheit

### 🔒 Niemals committen:
```
❌ Deine API Keys
❌ Deine Secrets (.env.local)
❌ Passwörter
❌ Stripe Secret Keys
❌ Supabase Keys (Secret)
```

### ✅ Immer in .env.local speichern:
```bash
# .env.local (NICHT in Git!)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

### ✅ Template erstellen (.env.local.example):
```bash
# .env.local.example (IN Git - aber OHNE echte Werte)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

## Vercel Deployment Privacy

Falls du zu Vercel deployst:

1. Gehe zu https://vercel.com/settings/teams
2. **Team Settings** → **Access Control**
3. Stelle sicher, dass nur du im Team bist
4. **Project Settings** (pro Projekt):
   - Production Branch Protection
   - Environment Variables: ✅ Gespeichert (nicht sichtbar)

---

## Lokale Git Sicherheit

### Überprüfe deine Git Config:
```bash
git config --list | grep user
```

Sollte zeigen:
```
user.name=Florian Bauböck
user.email=florianbaubock@...
```

### Automatische Commits signieren (optional):
```bash
# GPG Key generieren (einmalig)
gpg --gen-key

# Alle Commits signieren
git config --global commit.gpfsign true
```

---

## Zugriff Kontrollieren

### Wer kann auf dein Projekt zugreifen?

| Bereich | Zugriff | Status |
|---------|---------|--------|
| GitHub Repository | Public | 🔒 PRIVAT |
| GitHub Code | Public | 🔒 PRIVAT |
| Vercel Deployment | Public | 🔒 PRIVAT (mit Passwort) |
| .env.local Secrets | Local Only | ✅ Sicher |
| Database (Supabase) | RLS Protected | ✅ Row-Level Security |

---

## Regelmäßige Sicherheitschecks

```bash
# 1. Überprüfe, was in Git ist
git log --name-only | head -20

# 2. Überprüfe, ob sensible Dateien komittet wurden
git log --all --full-history -- ".env.local"
git log --all --full-history -- "*secret*"
git log --all --full-history -- "*key*"

# 3. Falls versehentlich Secrets gepushed: 
# Neuen Key generieren und alte invalidieren!
# (Stripe, Supabase, etc. sofort neue Keys!)
```

---

## Checkliste für Sicherheit

- ✅ GitHub Repository: PRIVAT
- ✅ .gitignore: Enthält .env.local
- ✅ .env.local: Nicht in Git
- ✅ .env.local.example: In Git (als Template)
- ✅ Keine Secrets im Code
- ✅ Database RLS: Aktiviert
- ✅ Email OTP: Aktiviert
- ✅ Vercel: Team kontrolliert
- ✅ Git Commits: Mit deinem Namen signiert

---

## Notfall: Secrets wurden gepushed

Falls du versehentlich Secrets komittet hast:

```bash
# 1. Sofort neue Keys generieren (Stripe, Supabase, etc.)
# 2. Alte Keys invalidieren
# 3. History rewrite (nur privat empfohlen):
git filter-branch --tree-filter 'rm -f .env.local' HEAD

# 4. Force Push (NUR im privaten Repo!)
git push --force-with-lease origin main
```

---

## Zusammenfassung

✅ **Dein Projekt ist sicher, wenn:**
1. GitHub Repository ist PRIVAT
2. .env.local ist in .gitignore
3. Keine Secrets im Code
4. Nur du hast Zugriff auf Repository
5. Regelmäßig Git Logs überprüfen

**Status: SICHER ✅**

---

*Zuletzt überprüft: 16. Januar 2026*
