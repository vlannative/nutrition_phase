# Shemomo Nutrition — Phase 1 (MVP)

A static, no-build-step prototype of the Phase 1 sitemap: Home, Services, Programs, Recipes/Blog ("Learn"), About, Contact, and the legal footer pages. Pure HTML/CSS/JS — no framework, no bundler, so it can be pushed straight to GitHub and served for free with GitHub Pages.

## What's in here

Everything lives in one flat directory — no subfolders — so it's easy to browse and easy to push:

```
shemomo-nutrition/
├── index.html                            Home
├── about.html
├── services.html                         1:1 Consultation, Follow-up, Meal Planning
├── programs.html                         Gut Health, Weight Management
├── learn.html                            Recipes/Blog listing
├── learn-gut-friendly-breakfast-bowl.html One full recipe template — duplicate this file for new posts
├── contact.html                          Form (placeholder), WhatsApp, email, FAQ
├── privacy.html
├── terms.html
├── disclaimer.html
├── style.css
├── main.js                               Nav toggle, quiz logic, form placeholders
└── README.md
```

## Before you launch — placeholders to replace

Search the project for these and swap in real content:

- **Brand name**: currently "Shemomo Nutrition" everywhere — rename if that's not right.
- **Phone/WhatsApp number**: `254700000000` appears in every WhatsApp link (`wa.me/254700000000`) and in `contact.html`.
- **Email**: `hello@shemomonutrition.com`.
- **Bio, qualifications, credentials**: in `about.html` and the credentials strip in `index.html` — currently marked `[Replace]` / `[Placeholder]`.
- **Pricing**: in `services.html` and `programs.html` — currently illustrative KES figures.
- **Legal pages**: `privacy.html`, `terms.html`, `disclaimer.html` are structurally complete but contain placeholder clauses — **have an actual lawyer review these before going live**, especially around Kenya's Data Protection Act, 2019, and any health-advice liability language.
- **Testimonials**: in `index.html` — currently invented examples, replace with real (consented) quotes.

## Adding your YouTube videos

Videos appear in two places: a "Watch and learn" strip on the Home page and a "Videos" section at the bottom of `learn.html`. They are click-to-load, so YouTube only loads when someone presses play (faster page, fewer cookies).

For each video:

1. Open the video on YouTube and copy the 11-character ID from the address, e.g. `youtube.com/watch?v=`**`dQw4w9WgXcQ`**.
2. In `index.html` and `learn.html`, replace `REPLACE_ID_1`, `REPLACE_ID_2`, `REPLACE_ID_3` in the `data-video-id` attributes with your real IDs. Thumbnails appear automatically once the ID is real.
3. Update the video titles (the `<h3>` and the `aria-label`) to match.
4. Replace `@REPLACE_CHANNEL` in both "Watch more on YouTube" links with your channel handle, e.g. `https://www.youtube.com/@yourhandle`.

To show more or fewer videos, copy or delete a `<div class="video-card">` block. Only embed videos you own or have permission to use.

## Things that need a real backend before launch

This is a static site, so anything that "submits" data needs a third-party service wired in:

1. **Contact form** (`contact.html`): currently shows a fake success message via JS. Recommended: [Formspree](https://formspree.io) (free tier, just change the `<form>` tag's `action`/add their script) or Netlify Forms if you host on Netlify instead of GitHub Pages.
2. **Newsletter signup** (`index.html`): same idea — connect Mailchimp, ConvertKit, or Buttondown.
3. **Booking ("Book Now" buttons)**: currently link to `contact.html` with a query string noting which service was clicked. If you want real scheduling, consider adding Calendly or a similar booking tool later — Phase 1 keeps it manual via the contact form.

## Running it locally

No build step needed. Either:

- Open `index.html` directly in a browser, or
- Run a simple local server so relative paths behave exactly like they will on GitHub Pages:
  ```bash
  cd shemomo-nutrition
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Pushing to GitHub

If you haven't already got a repo:

```bash
cd shemomo-nutrition
git init
git add .
git commit -m "Phase 1: MVP site structure"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If you already have an empty repo created on GitHub, skip `git init` and just add your existing remote instead.

## Turning on GitHub Pages (free hosting)

1. Push the code (above).
2. On GitHub, go to your repo → **Settings** → **Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. GitHub will give you a URL like `https://<your-username>.github.io/<your-repo-name>/` — usually live within a minute or two.

If you'd rather use a custom domain (e.g. `shemomonutrition.com`), add a `CNAME` file at the project root with just the domain name in it, and point your domain's DNS to GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## What's deliberately NOT in Phase 1

Per the sitemap, **Shop** is deferred to Phase 2 — there's no e-commerce, cart, or product pages here yet. When you're ready to add it, GitHub Pages alone won't handle payments/checkout, so that phase will likely need a proper backend or a service like Shopify Buy Button / Gumroad embedded into the static pages.

## Adding a new recipe/article

Duplicate `learn-gut-friendly-breakfast-bowl.html` (e.g. as `learn-your-new-post.html`), edit the content and nutrition-facts table, then add a matching `<article class="article-card">` block to `learn.html` linking to your new file. Keeping a `learn-` prefix on the filename is just a naming convention here to keep posts easy to spot even in a flat folder — nothing technical depends on it.
