# IP Geolocation Dashboard

React frontend (Vite) for locating IP addresses with an interactive map, batch IP search, and synced search history.

## Prerequisites

- Node.js v20+ (npm included)

## Local setup

1. Clone the repository

```bash
git clone https://github.com/yanicells/ip-locator-dashboard
cd geo-web
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

- Create a `.env` file in the project root.
- Set the API base URL (local backend):

```bash
VITE_API_URL=http://localhost:8000
```

4. Run the development server

```bash
npm run dev
```

The app runs on http://localhost:5173 by default.

## Usage
- Login using admin@example.com / password123
- Use the sidebar to search for IP addresses, view popular IPs, and manage your search history
- Click on map pins to view IP details
- History items can be clicked to re-open on the map or deleted
- Sign up for a new account if needed
- Explore batch IP search by adding multiple IPs in the input field
- The map supports multiple pins for batch searches

## Features

- Split-screen layout with a sidebar and full-screen map interface
- Interactive map (Leaflet) that pins exact locations; supports multiple pins at once
- Batch IP search with dynamic inputs for multiple IP lookups
- Popular IPs dropdown for quick-select (Google, Cloudflare, Facebook)
- History management synced with the backend; click to re-open on map; delete supported
- Authentication with Login and Sign Up forms

## Deployment

- Deployed on Vercel; configured to switch API URLs automatically in production
