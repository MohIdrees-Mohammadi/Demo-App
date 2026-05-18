## Goal
Turn every hardcoded piece of content on the public site (text, images, contact info, section headings, CTAs, testimonials, features, footer) into admin-editable fields. Services, Projects, Careers, News, What We Do, and Quotes are already dynamic — this plan covers everything that's still hardcoded.

## Approach: Generic key/value content store
Reuse the existing `site_settings` table (key, value). Every editable string/image URL becomes a key like `home.hero.title`, `home.about.image`, `footer.tagline`, `contact.email`, etc.

Benefits:
- One table, one admin UI handles everything
- No new migrations needed when adding fields later
- Section-level grouping in the admin UI

## What becomes editable

**Site-wide**
- Logo, brand name, tagline
- Contact: address, phone, email, working hours
- Social links
- Footer columns, copyright
- Navbar contact bar text

**Home page**
- Hero: title lines, description, primary/secondary CTA labels & links, background image, stats (4 items: value + label)
- About section: heading, paragraphs, image, bullet points
- Features section: heading, subheading, 4 feature cards (icon, title, text)
- CTA section: heading, description, button label/link, background image
- Testimonials: heading, 3 testimonials (quote, author, role)
- Featured projects/news section headings

**About page**
- Page header title/subtitle
- Story paragraphs, image
- Vision & Mission text + icons
- Values list
- Team/leadership section text

**Contact page**
- Page intro text
- Map embed URL
- Form heading

**Services / Projects / News / Careers index pages**
- Page header title + subtitle + banner image
- Intro paragraph

## Admin UI

New page: `/admin/content`

- Tabbed layout grouped by area: **Site-wide · Home · About · Contact · Page Headers**
- Each tab shows a form with labeled inputs (text, textarea, image upload, repeater for stats/features/testimonials)
- Repeater data (stats, features, testimonials, social links) stored as JSON string in `value`, parsed in the UI
- Save button writes/upserts each key into `site_settings`
- Image uploads use the existing `quote-uploads` bucket (or a new `site-assets` public bucket)
- Added to admin sidebar as "Site Content"

## Frontend wiring

- New hook `useSiteContent()` — fetches all `site_settings` once, returns `{ get(key, fallback), getJSON(key, fallback) }`
- Cached via React Query so all components share one request
- Update each currently-hardcoded component to read from the hook with the existing text as fallback (so nothing breaks before the admin saves anything):
  - `HeroSection`, `AboutSection`, `FeaturesSection`, `CtaSection`, `TestimonialsSection`
  - `Navbar`, `Footer`, `ContactSection`
  - `About.tsx`, `Contact.tsx`, all page banners

## Migration

- Add public read (already exists) — no schema changes needed
- Create `site-assets` public storage bucket for content images
- Seed `site_settings` with current default values so the admin sees them pre-filled

## Out of scope (already dynamic)
Services, Projects, News, What We Do, Job Postings, Quotes, Theme colors — already have admin pages.

## Deliverables
1. Migration: create `site-assets` bucket + seed default content keys
2. `src/hooks/useSiteContent.ts`
3. `src/pages/admin/AdminContent.tsx` + route + sidebar link
4. Refactor of all listed frontend components/pages to use the hook
