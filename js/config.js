/* =====================================================================
   [MODIFY] GLOBAL CONFIGURATION
   All user-editable settings live here. Touch nothing else to customise.
   ===================================================================== */

export const CONFIG = {
    /* Default language when a visitor arrives for the first time.
       Must be one of the codes listed in LANGUAGES below. */
    DEFAULT_LANG: 'fi',

    /* localStorage key used to remember the visitor's language choice. */
    STORAGE_KEY: 'xcccp_lang',

    /* ================================================================
       [MODIFY] LANGUAGES
       Order here = order of buttons in the language bar.
       `code` must match the filename in js/content/ (e.g. fi → fi.js)
       ================================================================ */
    LANGUAGES: [
        { code: 'fi', label: '🇫🇮 Suomi'   },
        { code: 'sv', label: '🇸🇪 Svenska' },
        { code: 'en', label: '🇬🇧 English' },
        { code: 'es', label: '🇪🇸 Español' },
        { code: 'zh', label: '🇨🇳 中文'    }
    ],

    /* ================================================================
       [MODIFY] NETLIFY FORM
       NETLIFY_FORM_NAME  → must match name="…" in index.html <form>
       FORM_ACTION        → where Netlify redirects after a non-AJAX POST.
                            We use AJAX, so this is a fallback only.
       ================================================================ */
    NETLIFY_FORM_NAME: 'contact',
    FORM_ACTION: '/?success=true#contact'
};

