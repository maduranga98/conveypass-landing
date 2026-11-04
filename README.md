# ConvoyPass landing page

Static HTML + CSS (no JavaScript, no build step), served by Firebase Hosting from `public/`.

## Deploy

```bash
npm i -g firebase-tools
firebase login
firebase use --add          # pick your project; creates .firebaserc
firebase deploy --only hosting
```

Local preview: `firebase emulators:start --only hosting` (or `npx serve public`).

## Files

- `public/index.html`: page, meta tags, JSON-LD
- `public/styles.css`: all styles
- `public/images/`: optimised WebP/PNG assets
- `public/robots.txt`, `public/sitemap.xml`, `public/404.html`
- `firebase.json`: hosting config (cache + security headers, clean URLs, real 404s)

The domain `https://convoypass.com` is used in `index.html`, `robots.txt` and `sitemap.xml`. Replace it if the live domain differs, and connect the custom domain in Firebase Console → Hosting.
