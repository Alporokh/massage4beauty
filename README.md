# Massage 4 Beauty — website

Static website (plain HTML + CSS + JavaScript). No build tools, no framework — open it and it runs.

## Files
```
site/
├── index.html      ← page structure
├── styles.css      ← all styling (colors at the top under :root)
├── content.js      ← ALL text + prices, in Czech / English / Russian
├── script.js       ← language switching, price-list rendering, contact form
└── assets/         ← logo, signature, photos
```

## Run it locally
- Easiest: open `index.html` in your browser.
- In VS Code: install the **Live Server** extension → right-click `index.html` → *Open with Live Server*.

## Edit common things
- **Prices & service text** → `content.js` (each language has `facial` and `body` arrays; `price` is a number in CZK).
- **Colors** → top of `styles.css`, the `:root { --deep: …; --ivory: … }` block.
- **Phone / e-mail / address** → `contact` block at the top of `content.js` (and the `tel:` / `mailto:` links in `index.html`).
- **Photos** → replace files in `assets/` (keep the same names, or update the `src` in `index.html`).

## Language
CZ / EN / RU switch is in the header and footer. The choice is remembered in the browser. Default falls back to the visitor's browser language, then English.

## Contact form
Currently shows a thank-you message on the page only — it does **not** send anywhere yet. To receive submissions, connect the `<form>` in `index.html` to a form service (e.g. Formspree) or your own endpoint. Ask and I can wire this up.
