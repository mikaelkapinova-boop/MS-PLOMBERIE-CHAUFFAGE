# MS-PLOMBERIE-CHAUFFAGE - Final (Carefully applied)

This package contains a non-invasive, carefully tested version of your site adjusted only where authorized:
- Menu (mobile): full screen overlay, 2-bar hamburger -> animated cross (keeps visible to close)
- Dark mode: **starts in dark** by default; toggle available; preference saved in localStorage
- Hero: background image visible in both modes; overlay brightness adjusted per theme
- Buttons: metallic grey style for primary buttons (Demander un devis / Envoyer)
- Gallery: images with rounded corners and spacing
- Contact form: responsive, full width inputs, centered and aligned
- Services: text updated as requested (Plomberie / Chauffage / VMC)

## Files to upload
Replace the matching files in your GitHub Pages repository (root):
- index.html
- services.html
- realisations.html
- contact.html
- style.css
- script.js

Keep your `images/` folder in the repo (logo.png, real1.jpg, real2.jpg, real3.jpg).

## Notes & pro practices used
- Dark/light theme uses `body.dark-mode` and `body.light-mode` with a saved preference (`ms_theme`).
- Menu overlay uses `aria-hidden` and `aria-expanded` for accessibility and `Escape` to close.
- Minimal, targeted CSS changes to avoid changing theme/layout you didn't authorize.
- Buttons use a subtle gradient to mimic a modern metallic look while keeping accessibility (contrast).
- Tested for responsiveness (mobile-first).

## How to upload
1. Download ZIP and extract.
2. Replace files in your repository root with these files.
3. Push to GitHub and open your Pages site; clear cache / hard refresh (cmd+shift+R) if necessary.

If anything still doesn't match the look you expect, tell me exactly which page and which element (with a screenshot) and I will make a focused correction — this time I'll only touch the requested bits.
