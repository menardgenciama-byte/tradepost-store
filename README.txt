# TRADEPOST — Luxury E-commerce Website

A responsive black-and-gold storefront for TradePost.

## Included
- Luxury homepage
- 35 sample product entries from ₱850–₱6,500
- Category filtering
- Search
- Price sorting
- Shopping bag/cart using browser localStorage
- Checkout form with GCash, Maya, Bank Transfer and COD options
- Responsive mobile layout
- Generated TradePost hero artwork in `assets/`

## Run it
1. Keep `index.html`, `style.css`, `script.js`, and `assets/` in the same folder.
2. Double-click `index.html` to preview locally.
3. For free hosting, upload the folder to a static host such as GitHub Pages or Cloudflare Pages.

## Before accepting real orders
The checkout is a front-end demo. Connect a real order database, email/notification service, shipping workflow, and payment gateway before taking live payments.

## Add real product photos
Replace the placeholder TP product tiles in `index.html`/`style.css` with your actual product images, or extend `products` in `script.js` with image URLs and update `productCard()` to display them.
