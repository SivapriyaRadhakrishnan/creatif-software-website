# Creatif Digital Solutions: Website

Corporate website for Creatif Digital Solutions, built with React, Vite, GSAP ScrollTrigger and Framer Motion.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About, team, FAQ, impact |
| `/contact` | Contact form, FAQ |
| `/services/crm` | CRM Software |
| `/services/erp` | ERP Software |
| `/services/flexflow-ai` | FlexFlow AI |
| `/services/kinetix-payroll` | Kinetix Payroll System |
| `/services/ai-chatbot` | AI Chatbot |

## Where to change things

| What | File |
| --- | --- |
| Email, phone, address, footer name, social links | `src/config/site.js` |
| Product names, card copy, menu labels | `src/data/services.js` |
| Team members and photos | `src/data/team.js` |
| FAQ questions and answers | `src/data/faqs.js` |
| Brand colours, type scale, spacing | `src/styles/global.css` (`:root` tokens) |

### Team photos
Put portraits in `public/images/team/` (4:5 portrait works best, `.webp` recommended) and set the `image` path in `src/data/team.js`.
Rashin, Ameen and Thanzeeb already point to `rashin.webp`, `ameen.webp` and `thanzeeb.webp`. Until a file exists, a branded "Photo coming soon" placeholder is shown automatically.

### Client logos
`<LogoMarquee />` in `src/sections/home/Impact.jsx` shows labelled placeholders. Pass real logos:

```jsx
<LogoMarquee logos={[{ name: 'Client name', src: '/images/clients/client.svg' }]} />
```

### Testimonials
`<Testimonials />` in `src/pages/Home.jsx` shows placeholders. Pass verified reviews:

```jsx
<Testimonials items={[{ quote: '…', name: '…', role: '…', company: '…', rating: 5, verified: true }]} />
```

Stars only appear for entries marked `verified: true`.

### Contact form
The form validates input but **does not send anything until an endpoint is configured**. Until then, visitors see a clear notice with email and phone fallbacks, never a fake "sent" message.

1. Copy `.env.example` to `.env`.
2. Set `VITE_CONTACT_ENDPOINT` to any URL that accepts a JSON `POST` of `{ name, email, message }` (your API, Formspree, Web3Forms, a serverless function).
3. Rebuild.

## Animation system
`src/animations/scrollAnimations.js` holds the GSAP setup. Elements opt in with data attributes:

| Attribute | Effect |
| --- | --- |
| `data-anim="words"` | word-by-word heading reveal (use `<SplitText>`) |
| `data-anim="lines"` | line-by-line paragraph reveal (`<SplitText mode="lines">`) |
| `data-anim="fade-up" / "fade" / "scale-in" / "slide-left" / "slide-right"` | simple entrances |
| `data-anim="clip"` | clip-path image reveal; inner `[data-clip-inner]` scales down |
| `data-stagger="0.1"` | children enter one after another |
| `data-parallax="0.15"` | scroll-linked drift (tablet/desktop only) |
| `data-delay="0.2"` | extra delay |

Section-specific choreography (hero timeline, pinned horizontal "Our Advantage", expanding "Built for your business" panel, ERP hub wiring, Kinetix process) lives next to each section in `useScrollAnimations` hooks.
Everything runs inside `gsap.matchMedia`, so visitors with **reduced motion** enabled get fully visible, static content, and every animation is reverted when you leave a page.

## Deployment
This is a single-page app. The host must serve `index.html` for every route:

- **Netlify:** `public/_redirects` is included.
- **Vercel:** `vercel.json` is included.
- **Apache / cPanel:** add a rewrite of all non-file requests to `/index.html`.
