# IP Geolocation Web

React + Vite + Tailwind + Zustand web client for IP geolocation. Login talks to a local auth API, geolocation uses ipinfo.io. Maps are rendered with React Leaflet.

## Features

- Login screen (email/password) hitting `POST /api/login` at `http://localhost:8000`
- Home screen auto-loads the current user IP from ipinfo
- Batch IP search: multiple inputs, validate per IP, fetch in parallel, show markers for all results
- Map: multi-marker, auto-fit bounds, supports navigation across searched IPs
- History: persists last 10 searches, clickable, multi-select delete, preserves scroll position
- Popular IP dropdown: quick-pick well-known IPs, triggers search
- Collapsible panels: IP info (open by default), history (collapsed by default), popular list dropdown

## Run locally

Prereqs: Node.js 18+, npm. Auth API running at `http://localhost:8000` with seeded user.

```bash
git clone <repo>
cd geo-web
npm install
npm run dev
# app at http://localhost:5173
```

Demo creds (seeded in API):

- Email: admin@example.com
- Password: password123

## Build and preview

```bash
npm run build
npm run preview
```

## API notes

- Login: `POST http://localhost:8000/api/login` with `{ email, password }`
- Geolocation: `GET https://ipinfo.io/{ip}/json?token=YOUR_TOKEN` or `GET https://ipinfo.io/json` for current IP

## File map (web)

```
src/
  components/
    auth/LoginForm.jsx
    common/Header.jsx
    geo/GeoSearch.jsx
    geo/GeoDisplay.jsx
    geo/HistoryList.jsx
    geo/PopularIPs.jsx
    geo/MapDisplay.jsx
  pages/HomePage.jsx
  pages/LoginPage.jsx
  services/authService.js
  services/geoService.js
  store/useAppStore.js
  App.jsx
  main.jsx
  index.css
```

## Hosting

- Build with `npm run build`
- Deploy `dist/` to Vercel
