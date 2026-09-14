/* =====================================================================
   ROUTER — do not edit unless you add/remove pages.
   Each page is a <div id="page-XXX" class="page">…</div> in index.html.
   Nav links carry data-page="XXX" and href="#XXX".
   ===================================================================== */

const PAGES = ['home', 'resources', 'contact'];

function getPageEl(id) { return document.getElementById('page-' + id); }

export function showPage(pageId) {
    if (!PAGES.includes(pageId)) pageId = 'home';

    PAGES.forEach(id => {
        const el = getPageEl(id);
        if (el) el.classList.toggle('active-page', id === pageId);
    });

    /* Highlight the corresponding nav link. */
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });

    /* Update URL hash without reloading. */
    if (history.replaceState) {
        history.replaceState({ page: pageId }, '', '#' + pageId);
    } else {
        location.hash = pageId;
    }
}

export function initRouter() {
    /* Delegate clicks on anything carrying data-page. */
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page]');
        if (!link) return;
        e.preventDefault();
        showPage(link.dataset.page);
    });

    /* Support direct navigation via hash (e.g. #contact). */
    window.addEventListener('hashchange', () => {
        const id = location.hash.replace('#', '') || 'home';
        showPage(id);
    });

    /* Initial page from hash or default home. */
    const initial = location.hash.replace('#', '') || 'home';
    showPage(initial);
}

