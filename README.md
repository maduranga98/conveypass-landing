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

## Contact form email

The form posts to the `book` Cloud Function (`/api/book`), which saves the request to Firestore and emails it to `info@lumoraventures.com`.
Hosting deploys alone do not publish the function, so deploy it once (and after changes):

```bash
cd functions && npm install && cd ..
firebase functions:secrets:set SMTP_USER   # mailbox that sends, e.g. info@lumoraventures.com
firebase functions:secrets:set SMTP_PASS   # its app password
firebase deploy --only functions
```

`SMTP_HOST` (default `smtp.gmail.com`), `SMTP_PORT` (default `465`) and `NOTIFY_TO` (default `info@lumoraventures.com`) can be overridden in `functions/.env`.
For Google Workspace, use an App Password (2-Step Verification required).
