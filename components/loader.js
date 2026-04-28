// ===== Option C Foundation — Component Loader =====
// Fetches /components/header.html and /components/footer.html,
// injects them into the page, highlights the active nav link,
// then dispatches a "componentsLoaded" event so script.js can
// safely wire up nav toggle, scroll effects, etc.

(async function () {

  // ---- Helper: fetch an HTML file and replace a placeholder element ----
  async function injectComponent(placeholderId, path) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
      const html = await res.text();

      // Parse and insert the component
      const temp = document.createElement('div');
      temp.innerHTML = html.trim();
      const component = temp.firstElementChild;
      placeholder.replaceWith(component);
    } catch (err) {
      console.error('[ComponentLoader]', err);
    }
  }

  // ---- Load both components in parallel ----
  await Promise.all([
    injectComponent('header-placeholder', '/components/header.html'),
    injectComponent('footer-placeholder', '/components/footer.html'),
  ]);

  // ---- Highlight active nav link based on current page ----
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.main-nav a').forEach(link => {
    try {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    } catch (_) {}
  });

  // ---- Notify script.js (and any other listeners) that components are ready ----
  document.dispatchEvent(new CustomEvent('componentsLoaded'));

})();
