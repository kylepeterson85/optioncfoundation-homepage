# Option C Foundation — Website

**Live site:** https://optioncfoundation.org  
**GitHub repo:** https://github.com/kylepeterson85/optioncfoundation-homepage  
**Owner:** Kyle K. Peterson · info@optioncfoundation.org  
**Last major update:** April 29, 2026

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
│   └── loader.js         ← Fetches header + footer, injects GTM, canonical tags, active nav
│
├── style.css             ← Global styles (shared across all pages)
├── script.js             ← Global JavaScript (nav toggle, scroll effects, FAQ accordion)
│
├── sitemap.xml           ← XML sitemap — update when adding new pages
├── robots.txt            ← Crawler rules — points to sitemap, blocks utility pages
│
├── index.html            ← Homepage
├── about.html            ← About page
├── program.html          ← Our Program page
├── who-we-help.html      ← Who We Help overview
├── who-we-help-disabilities.html
├── who-we-help-felony-conviction.html
├── who-we-help-unemployed.html
├── who-we-help-entrepreneurs.html
├── blog.html             ← Blog listing page
├── blog-*.html           ← Individual blog posts (8 posts)
├── contact.html          ← Contact page
├── donate.html           ← Donate page
├── qualify.html          ← Qualify/apply page
├── partners.html         ← Partner organizations page
├── volunteer.html        ← Volunteer/mentor page
├── board.html            ← Board of Directors & Governance page
├── accessibility.html    ← Accessibility Statement page
├── privacy-policy.html   ← Privacy Policy
├── terms.html            ← Terms of Use
├── 404.html              ← Custom 404 error page
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
- `components/loader.js` fetches both files, injects them into placeholder `<div>` elements, fires GTM, injects canonical tags, and highlights the active nav link
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
6. **Add the new URL to `sitemap.xml`** — this keeps Google's index current
7. Commit the new file — Netlify deploys automatically

The header, footer, GTM tracking, and canonical tag will all appear automatically. No extra setup needed.

---

## 6. Deployment

- **Hosting:** Netlify (paid plan)
- **Deploy trigger:** Every push to the `main` branch auto-deploys
- **Deploy time:** Typically under 60 seconds
- **No build step required** — this is a plain static site (no npm, no bundler)
- **Bandwidth:** Netlify paid plan — monitor usage in the Netlify dashboard

---

## 7. Analytics & Tracking

### Google Tag Manager
- **Container ID:** GTM-TMGTMNW9
- **How it's installed:** Via Netlify Snippet Injection (Site configuration → Build & deploy → Post processing → Snippet injection) — NOT hardcoded in HTML files
- **Head snippet:** Injected before `</head>` on every page
- **Body snippet:** Injected before `</body>` on every page
- To update the GTM container ID, update the Netlify snippet — no code changes needed

### Google Analytics 4
- **Measurement ID:** G-HXE33MJQYX
- **Configuration:** GA4 tag is configured inside GTM (tag: "GA4 – Configuration – All Pages")
- **Page views:** Tracked automatically on every page load

### Conversion Events (Key Events)
| Event Name | When It Fires | GA4 Key Event? |
|---|---|---|
| `generate_lead` | User visits `/thank-you` (qualify form submitted) | Set in GTM, mark as key event in GA4 after first fire |
| `contact` | User visits `/contact-thanks` (contact form submitted) | Set in GTM, mark as key event in GA4 after first fire |
| `qualify_lead` | Previously configured conversion | ✅ Already marked as key event |

**To mark a new event as a key event in GA4:** GA4 → Admin → Data display → Events → Key events tab → star the event after it fires for the first time.

---

## 8. SEO & Crawling

### Sitemap
- **URL:** https://optioncfoundation.org/sitemap.xml
- **File:** `sitemap.xml` in the repo root
- **Submitted to:** Google Search Console
- **When to update:** Any time a new page is added or an important page is removed
- **Excluded pages:** `/thank-you`, `/contact-thanks`, `/PAGE-TEMPLATE` (utility/conversion pages)

### robots.txt
- **URL:** https://optioncfoundation.org/robots.txt
- **File:** `robots.txt` in the repo root
- Allows all crawlers, blocks utility pages, points to sitemap

### Canonical Tags
- Injected automatically on every page by `components/loader.js`
- Uses the current page URL to declare the preferred version — prevents duplicate indexing

### Google Search Console
- **Property:** https://optioncfoundation.org/
- Sitemap submitted — Google will crawl and index all 26 pages
- Use Search Console to request reindexing after major site changes

---

## 9. Google Ad Grants Readiness

The site has been prepared for Google Ad Grant application. Key elements in place:

| Requirement | Status |
|---|---|
| Clear nonprofit mission on homepage | ✅ |
| EIN visible in footer (41-3208039) | ✅ |
| 501(c)(3) status displayed | ✅ |
| Board & Governance page | ✅ `/board` |
| Accessibility Statement | ✅ `/accessibility` |
| Privacy Policy | ✅ `/privacy-policy` |
| Terms of Use | ✅ `/terms` |
| "No guarantees" language | ✅ On program and apply pages |
| Donation transparency (how funds are used) | ✅ On `/donate` |
| "Current Stage" transparency section | ✅ On homepage |
| GA4 tracking active | ✅ |
| Conversion event configured | ✅ `generate_lead` fires on form submission |
| Sitemap submitted to Search Console | ✅ |
| robots.txt live | ✅ |

**Before submitting for Ad Grants:** Verify GA4 is recording `qualify_lead` or `generate_lead` as a key event. Test the qualify form by submitting it on the live site and confirming you reach `/thank-you`.

---

## 10. Images

All photos on the site are sourced from **Unsplash** (free, commercially licensed).

### Key photos in use
| Location | Description | Unsplash ID |
|---|---|---|
| Homepage — community section | Diverse women collaborating at table | 1573497701240-345a300b8d36 |
| About page — hero | Adults working through plans | 1752659504296-16a5fd9fa86a |
| Blog — background checks post | Person reviewing documents | 1648747067160-ae85cf5c6071 |
| Blog — low cost businesses post | Small business owner at shop | 1661658571095-80fd0167a812 |
| Blog — disability post | Person with Down syndrome and mentor | 1663122607630-f7ed0f900515 |

### To swap a photo
Replace the Unsplash URL in the relevant HTML file. Use this format for consistent sizing:
```
https://images.unsplash.com/photo-{ID}?w=900&auto=format&q=80
```

Unsplash images are free to use commercially without attribution, but attribution is appreciated.

---

## 11. Key Contacts

| Role | Name | Email |
|------|------|-------|
| Owner / Decision Maker | Kyle K. Peterson | info@optioncfoundation.org |


---

## 12. Donation Processing

Donations are handled via **Donorbox**, embedded on `/donate.html`. Payments are processed through **Stripe**.

### Donorbox
- Dashboard: https://donorbox.org/org_admin/dashboard_v2
- - Campaign: "Support Option C Foundation"
  - - Login: info@optioncfoundation.org
    - - Amounts: $25, $50, $100, $250, $500, Custom (one-time and monthly recurring)
      - - Tax receipts sent automatically to donors
       
        - ### Stripe
        - - Connected to Donorbox as the payment processor
          - - Account name: OPTION C FOUNDATION
            - - Accepts: credit/debit cards, Apple Pay, Google Pay
              - - **Payouts**: Add Relay bank routing/account numbers to Stripe once Relay approves (2-3 days from application)
               
                - ### Relay (Business Banking — Pending Approval)
                - - Applied at relayfi.com for nonprofit business checking account
                  - - Once approved: go to Stripe Dashboard → Settings → Bank accounts → add Relay routing + account numbers
                    - - All donor payouts will then deposit directly to the Option C Foundation account
                     
                      - ---

                      ## 13. Performance & Technical Health

                      *Last audited: May 3, 2026*

                      ### PageSpeed Insights — optioncfoundation.org

                      | Score | Mobile | Desktop |
                      |-------|--------|---------|
                      | Performance | 80 | 99 |
                      | Accessibility | 93 | 93 |
                      | Best Practices | 100 | 100 |
                      | SEO | 100 | 100 |

                      ### Optimizations Applied
                      - **Async Google Fonts** — all 26 HTML pages use `rel="preload"` + onload swap. Eliminated ~750ms render-blocking delay on mobile. Improved mobile score from 72 to 80.
                      - - **Schema.org JSON-LD** — NonprofitOrganization structured data added to index.html
                        - - **Sitemap** — sitemap.xml covers all 26 indexable pages, submitted to Google Search Console
                          - - **Broken links** — all 28 pages return HTTP 200, no broken links as of last audit
                            - - **Privacy Policy** — linked inline near the submit button on /qualify.html
                             
                              - ---

                              ## 14. Google Ad Grants Status

                              *Updated: May 3, 2026*

                              | Step | Status |
                              |------|--------|
                              | Google for Nonprofits registration | Approved |
                              | Candid / GuideStar profile | Created |
                              | Google Ad Grants application submitted | Awaiting approval (2-5 business days) |
                              | Donation page with live payment processing | Complete — Donorbox + Stripe |
                              | Privacy Policy linked near application form | Done — /qualify.html |
                              | Schema.org structured data on homepage | Done — index.html |
                              | Mobile PageSpeed score is 70 or above | Score: 80 |
                              | SEO score | Score: 100 |
                              | All pages return 200 / no broken links | Verified May 3, 2026 |

                              ### Once Ad Grants is approved:
                              1. Log into Google for Nonprofits and activate the Google Ads account
                              2. 2. Create at least 2 campaigns with 2+ ad groups each
                                 3. 3. Target keywords: "start business with felony record", "self employment with disability", "small business support disabled adults"
                                    4. 4. Add sitelink assets to all campaigns: About, Our Program, Apply Now, Donate
                                       5. 5. Import the GA4 form submission conversion event into Google Ads
                                          6. 6. Monitor CTR weekly — must stay above 5% to remain compliant
                                             7. 7. Respond to the annual Google Ad Grants compliance survey promptly each year
