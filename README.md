# Option C Foundation — Website

**Live site:** https://optioncfoundation.org  
**GitHub repo:** https://github.com/kylepeterson85/optioncfoundation-homepage  
**Owner:** Kyle K. Peterson · info@optioncfoundation.org  
**Last major update:** April 28, 2026

---

## 1. Project Overview

This is the static website for **Option C Foundation**, a registered 501(c)(3) nonprofit based in Charlotte, NC. The foundation provides free entrepreneurship training, mentorship, and launch support to adults facing employment barriers — including people with disabilities, people with prior felony convictions, and long-term unemployed adults.

The site is a clean static HTML/CSS/JS site hosted on **Netlify**, deployed automatically from this GitHub repository whenever changes are pushed to the `main` branch.

---

## 2. How This Site Is Managed

All edits to this website are made through **Claude Cowork** (Anthropic's AI desktop tool), not by hand-editing files directly. Claude reads and writes files in this repository and commits changes via the GitHub web interface.

If you need to request a change — new page, content update, design adjustment, new section — open a Claude Cowork session and describe what you need. Claude will make the change, commit it to GitHub, and Netlify will deploy it automatically.

**Do not edit files directly in GitHub or in a code editor unless you know exactly what you are doing.** The component system (see Section 4) requires all pages to stay in sync.

---

## 3. File Structure

```
/
├── components/
│   ├── header.html       ← The site header — edit this to update nav on ALL pages
│   ├── footer.html       ← The site footer — edit this to update footer on ALL pages
│   └── loader.js         ← Fetches and injects header + footer on every page load
│
├── style.css             ← Global styles (shared across all pages)
├── script.js             ← Global JavaScript (nav toggle, scroll effects, FAQ accordion)
│
├── index.html            ← Homepage
├── about.html            ← About page
├── program.html          ← Our Program page
├── who-we-help.html      ← Who We Help overview
├── blog.html             ← Blog listing page
├── contact.html          ← Contact page
├── donate.html           ← Donate page
├── qualify.html          ← Qualify/apply page
├── partners.html         ← Partners page
├── volunteer.html        ← Volunteer page
├── ...                   ← Other pages (blog posts, legal, who-we-help subpages, etc.)
│
├── PAGE-TEMPLATE.html    ← Starter template — copy this when creating any new page
│
├── [page-name].css       ← Page-specific styles (e.g. blog.css, contact.css)
└── [page-name].js        ← Page-specific scripts (e.g. blog.js, donate.js)
```

---

## 4. Component System (Header & Footer)

The site uses a lightweight JavaScript component system so the header and footer only exist in **one place each** — changes made there automatically apply to every page on the site.

### How it works

- `components/header.html` contains the full site header HTML
- `components/footer.html` contains the full site footer HTML
- `components/loader.js` fetches both files asynchronously on every page load and injects them into placeholder `<div>` elements
- After injection, `loader.js` fires a `componentsLoaded` event so `script.js` can safely initialize the nav toggle and scroll effects

### To update the nav links or footer

Edit **only** `components/header.html` or `components/footer.html`. Every page on the site will reflect the change immediately after Netlify deploys.

### How pages reference the components

Every page contains these two placeholder divs and script tags — do not remove them:

```html
<!-- At the top of <body> -->
<div id="header-placeholder"></div>

<!-- Page content here -->

<!-- At the bottom of <body> -->
<div id="footer-placeholder"></div>
<script src="/components/loader.js"></script>
<script src="/script.js"></script>
```

---

## 5. Adding a New Page

1. Copy `PAGE-TEMPLATE.html` and rename it (e.g. `new-page.html`)
2. Update the `<title>` tag and `<meta name="description">` tag
3. Add your page content inside the `<main>` section
4. If the page needs its own styles, create a `new-page.css` file and link it in the `<head>`
5. If the page needs its own JavaScript, create a `new-page.js` file and add a `<script>` tag after `/script.js`
6. Commit the new file — Netlify deploys automatically

The header and footer will appear automatically. No additional setup needed.

---

## 6. Deployment

- **Hosting:** Netlify  
- **Deploy trigger:** Every push to the `main` branch auto-deploys  
- **Deploy time:** Typically under 60 seconds  
- **No build step required** — this is a plain static site (no npm, no bundler)

---

## 7. Key Contacts

| Role | Name | Email |
|------|------|-------|
| Owner / Decision Maker | Kyle K. Peterson | info@optioncfoundation.org |
