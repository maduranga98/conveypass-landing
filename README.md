# ConvoyPass landing page

Static HTML + CSS (zero JavaScript, no build step), served by Firebase Hosting from `public/`.

```bash
npx serve public          # local preview
firebase deploy --only hosting
```

- `public/index.html` — page, meta tags, JSON-LD structured data
- `public/styles.css` — all styles
- `public/images/` — optimised WebP/PNG assets (hero, sections, OG image, icons)
- `public/robots.txt`, `public/sitemap.xml` — crawler files

The production domain is set to `https://conveypass.com` in `index.html`, `robots.txt` and `sitemap.xml`. Replace it everywhere if the live domain differs.
