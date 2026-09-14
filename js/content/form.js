/* =====================================================================
   NETLIFY FORM HANDLER — do not edit unless you change form behaviour.
   - Intercepts submit, validates, checks honeypot, POSTs via fetch.
   - Netlify stores submissions in your dashboard.
   - Email notifications are configured in the Netlify dashboard.
   ===================================================================== */

import { CONFIG } from './config.js';
import { t } from './i18n.js';

export function initForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form || !status) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const sendLabel = () => t('form_send');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        /* --- 1. Honeypot check (client-side, instant feedback) --- */
        const honeypot = form.querySelector('[name="bot-field"]');
        if (honeypot && honeypot.value.trim() !== '') {
            status.textContent = t('form_bot');
            status.style.color = 'var(--accent)';
            return;
        }

        /* --- 2. Native validation (since form has novalidate) --- */
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        /* --- 3. Sending state --- */
        submitBtn.disabled = true;
        submitBtn.textContent = t('form_sending');
        status.textContent = '';
        status.style.color = '';

        /* --- 4. POST to Netlify --- */
        try {
            const data = new FormData(form);
            /* Netlify expects URL-encoded form data */
            const encoded = new URLSearchParams(data).toString();

            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encoded
            });

            if (!res.ok) throw new Error('HTTP ' + res.status);

            status.textContent = t('form_ok');
            status.style.color = '#1e7e34';
            form.reset();
        } catch (err) {
            console.error('[form]', err);
            status.textContent = t('form_error');
            status.style.color = 'var(--accent)';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = sendLabel();
        }
    });

    /* Re-render button label when the language changes. */
    document.addEventListener('languagechange', () => {
        if (!submitBtn.disabled) submitBtn.textContent = sendLabel();
    });
}

