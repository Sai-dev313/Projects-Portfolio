# Projects Portfolio

A personal project showcase for Sainath Radharapu — a "playground"-style grid of shipped work, each project with its own detail page.

## Projects

- **Maha Furnitures** — production site for a custom furniture brand (catalog, booking, showroom finder)
- **SolarCredit** — blockchain-backed marketplace turning surplus rooftop solar generation into tradable credits
- **Ammamma Inti Vantalu** — custom Shopify storefront for a homemade Telugu food brand
- **Video Editor** — embedded Instagram Reels portfolio featuring 6 Best Picks and 18 total edited reels

## Structure

Plain HTML/CSS/JS — no framework, no build step.

```
index.html                        home page: scattered project grid, auto-rotating screenshot carousels
projects/<slug>/index.html        one detail page per project
video-editor/index.html           All Reels page (18 embedded reels, grouped by 9:16 and 16:9)
video-editor/best-picks/index.html Best Picks page (6 featured reels, grouped by 9:16 and 16:9)
css/style.css                     shared styling
js/carousel.js                    auto-rotating screenshot carousel
js/avatar-tilt.js                 cursor-reactive 3D avatar tilt
js/reels.js                       Instagram Reels embed grid and 9:16 / 16:9 grouping
assets/                           project screenshots and avatar image
```

## Running locally

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying

Static site, no build step — works as-is on GitHub Pages, Vercel, or Netlify.

## Author

**Sainath Radharapu**
[LinkedIn](https://www.linkedin.com/in/sainath-radharapu-a540882b7/) · [Instagram](https://www.instagram.com/s_parker.03/) · [GitHub](https://github.com/Sai-dev313)
