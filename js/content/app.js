/* =====================================================================
   APPLICATION ENTRY POINT
   Boots the router, i18n engine, and form handler.
   Order matters: i18n must run before form so translated labels exist.
   ===================================================================== */

import { initI18n } from './i18n.js';
import { initRouter } from './router.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
    initI18n();     // 1. populate language bar, apply default language
    initRouter();   // 2. wire up navigation and restore current page
    initForm();     // 3. attach Netlify form handler
});

