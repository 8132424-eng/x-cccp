# X-CCCP — Modular static site

## Structure
- `index.html`      — page shell (3 tabs: home / resources / contact)
- `css/styles.css`  — all styles
- `js/config.js`    — editable settings (languages, form name, colours)
- `js/content/*.js` — one file per language (translate values only)
- `js/i18n.js`      — translation engine
- `js/router.js`    — tab navigation
- `js/form.js`      — Netlify form + honeypot
- `js/app.js`       — boot

## Local testing
ES modules need an HTTP server:
    python -m http.server 8000
Then open http://localhost:8000

## Adding a language
1. Copy `js/content/en.js` → `js/content/de.js` (example).
2. Add a line to `LANGUAGES` in `js/config.js`:
       { code: 'de', label: '🇩🇪 Deutsch' }
3. Import + register it in `js/i18n.js`:
       import de from './content/de.js';
       const TRANSLATIONS = { fi, sv, en, es, zh, de };

## Netlify form — what to configure in the dashboard
The code already contains everything Netlify needs. After the first
deploy, open the Netlify dashboard:
  Site → Forms → "contact"
  → Form notifications → Add notification → Email → your address.
That is where you tell Netlify where to send the messages.

