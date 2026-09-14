/* =====================================================================
   I18N ENGINE — do not edit unless you know what you're doing.
   To add/remove languages: edit LANGUAGES in config.js and add/remove
   the corresponding file in js/content/.
   ===================================================================== */

import { CONFIG } from './config.js';

/* Import all language packs. When you add a new language in config.js,
   also add an import line and register it in TRANSLATIONS below. */
import fi from './content/fi.js';
import sv from './content/sv.js';
import en from './content/en.js';
import es from './content/es.js';
import zh from './content/zh.js';

const TRANSLATIONS = { fi, sv, en, es, zh };

let currentLang = CONFIG.DEFAULT_LANG;

/* Build language buttons in the language bar. */
function buildLangBar() {
    const bar = document.getElementById('langBar');
    if (!bar) return;
    bar.innerHTML = '';
    CONFIG.LANGUAGES.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.dataset.lang = lang.code;
        btn.textContent = lang.label;
        btn.addEventListener('click', () => applyLanguage(lang.code));
        bar.appendChild(btn);
    });
}

/* Apply translations to all elements with a data-i18n attribute. */
export function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) {
        console.warn(`[i18n] Missing translation pack for "${lang}".`);
        return;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key] !== undefined) el.textContent = dict[key];
    });

    /* Keep <html lang="…"> in sync — critical for SEO and AI agents. */
    document.documentElement.lang = lang;
    currentLang = lang;

    /* Highlight the active language button. */
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active-lang', b.dataset.lang === lang);
    });

    /* Remember the choice. */
    try { localStorage.setItem(CONFIG.STORAGE_KEY, lang); } catch (e) {}

    /* Let the rest of the app know the language changed. */
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

export function getCurrentLang() {
    return currentLang;
}

export function t(key) {
    return TRANSLATIONS[currentLang]?.[key] ?? key;
}

/* Public initialiser called from app.js. */
export function initI18n() {
    buildLangBar();

    /* Restore the previously chosen language, else fall back to default. */
    let startLang = CONFIG.DEFAULT_LANG;
    try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (stored && TRANSLATIONS[stored]) startLang = stored;
    } catch (e) {}

    applyLanguage(startLang);
}

