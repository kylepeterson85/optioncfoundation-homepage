// ===== Option C Foundation — Component Loader =====
// Fetches /components/header.html and /components/footer.html,
// injects them into the page, highlights the active nav link,
// then dispatches a "componentsLoaded" event so script.js can
// safely wire up nav toggle, scroll effects, etc.

(async function () {

  // ---- Canonical + favicon + Open Graph injection ----
  // Adds tags to <head> on every page so they don't have to be hand-edited per file.
  (function () {
    const head = document.head;
    const origin = 'https://optioncfoundation.org';
    const path = window.location.pathname;
    const cleanPath = path.replace(/\.html$/, '').replace(/\/$/, '');
    const canonicalUrl = origin + cleanPath + (path === '/' ? '/' : '');

    // Helper — only add if not already present (so per-page overrides win)
    const has = (sel) => !!head.querySelector(sel);
    const addLink = (rel, href, attrs = {}) => {
      const sel = `link[rel="${rel}"]` + (attrs.sizes ? `[sizes="${attrs.sizes}"]` : '') + (attrs.type ? `[type="${attrs.type}"]` : '');
      if (has(sel)) return;
      const el = document.createElement('link');
      el.rel = rel;
      el.href = href;
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      head.appendChild(el);
    };
    const addMeta = (key, val, attrName = 'name') => {
      if (has(`meta[${attrName}="${key}"]`)) return;
      const el = document.createElement('meta');
      el.setAttribute(attrName, key);
      el.content = val;
      head.appendChild(el);
    };

    // Canonical
    addLink('canonical', canonicalUrl);

    // Favicons
    addLink('icon', '/favicon.ico', { sizes: 'any' });
    addLink('icon', '/favicon-32.png', { type: 'image/png', sizes: '32x32' });
    addLink('icon', '/favicon-192.png', { type: 'image/png', sizes: '192x192' });
    addLink('apple-touch-icon', '/apple-touch-icon.png', { sizes: '180x180' });

    // Open Graph + Twitter card (per-page <title>/<meta name="description"> still apply)
    const pageTitle = document.title || 'Option C Foundation';
    const descEl = head.querySelector('meta[name="description"]');
    const pageDesc = descEl ? descEl.content : 'Free entrepreneurship support for adults facing employment barriers.';

    addMeta('og:type', 'website', 'property');
    addMeta('og:site_name', 'Option C Foundation', 'property');
    addMeta('og:title', pageTitle, 'property');
    addMeta('og:description', pageDesc, 'property');
    addMeta('og:url', canonicalUrl, 'property');
    addMeta('og:image', origin + '/og-image.png', 'property');
    addMeta('og:image:width', '1200', 'property');
    addMeta('og:image:height', '630', 'property');
    addMeta('twitter:card', 'summary_large_image');
    addMeta('twitter:title', pageTitle);
    addMeta('twitter:description', pageDesc);
    addMeta('twitter:image', origin + '/og-image.png');

    // Theme color (browser chrome on mobile)
    addMeta('theme-color', '#1F4E79');
  })();

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
