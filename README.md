# Coffee R Us

React single-page application for an e-commerce **administrator portal** themed around coffee. Built for the Summative Lab **C5M8** using the provided design mock-up.

## Live website

**https://ben-154.github.io/coffee-r-us/**

## Repository

https://github.com/Ben-154/coffee-r-us

## Features

- **Home** landing page with brand and tagline
- **Shop** page with product grid, search, and location filters
- **Product detail** page with editable price (admin-style updates)
- **Admin Portal** form to add new coffee products
- **Client-side routing** with React Router
- **Simulated backend** via `json-server` (local) with **localStorage** fallback for the live GitHub Pages site
- Responsive layout inspired by the C5M8 mock-up
- Jest + React Testing Library coverage

## Tech stack

- React 19 + Vite
- React Router
- json-server
- Plain CSS (mock-up brown theme)
- Jest + React Testing Library

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Product catalog + search/filters |
| `/shop/:id` | Product details + price update |
| `/admin` | Add product form |

## Getting started

```bash
cd coffee-r-us
npm install --strict-ssl=false
npm start
```

`npm start` runs **json-server** on port `3001` and the Vite app on port `5173`.

Other scripts:

```bash
npm run dev       # frontend only (uses localStorage if API is offline)
npm run server    # json-server only
npm test          # Jest suite
npm run build     # production build
```

## Data model

```js
{
  id: number,
  name: string,
  description: string,
  origin: "Location 1" | "Location 2" | "Location 3" | "Location 4",
  image: string, // URL
  price: number
}
```

Seed data lives in `db.json` (API) and `src/data/seedProducts.js` (Pages/localStorage fallback).

## Testing

```bash
npm test
```

Covers branding, navigation, shop search wiring, and admin form validation.

## Design notes (C5M8)

- Nav: Home · Shop · Admin Portal (active link underlined)
- Home: brown hero, **Coffee R Us**, white tagline
- Shop: left sidebar search + location checkboxes; gray product cards
- Admin: dark form card with Coffee Name, Description, Image, Origin, Price, red Submit

## Submission

Submit the live site URL:

**https://ben-154.github.io/coffee-r-us/**
