# IP Geolocation Application

A production-ready IP Geolocation application built with React, Vite, Tailwind CSS, and Zustand. This application allows users to search for IP address information and view geolocation details using the IPinfo.io API.

## Features

- 🔐 **Authentication**: Secure login system with JWT tokens
- 🌍 **IP Geolocation**: Fetch current user's IP or search specific IP addresses
- 📊 **Detailed Information**: View IP, city, region, country, location coordinates, hostname, and more
- 📜 **Search History**: Automatically saves and displays recent searches (up to 10)
- 🎨 **Minimal Design**: Clean, professional UI inspired by Google Maps aesthetic
- 🏗️ **Service-Oriented Architecture**: Clean separation of concerns with dedicated service layer

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **API**: IPinfo.io

## Project Structure

```
geo-web/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.jsx
│   │   ├── common/
│   │   │   └── Header.jsx
│   │   └── geo/
│   │       ├── GeoSearch.jsx
│   │       ├── GeoDisplay.jsx
│   │       └── HistoryList.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── HomePage.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── geoService.js
│   ├── store/
│   │   └── useAppStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000` (for authentication)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd geo-web
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file (optional):

```bash
cp .env.example .env
```

4. Add your IPinfo token to `.env` (optional, for higher rate limits):

```env
VITE_IPINFO_TOKEN=your_token_here
```

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Login with demo credentials:
   - **Email**: `admin@example.com`
   - **Password**: `password123`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## API Documentation

### Authentication API

**Endpoint**: `POST http://localhost:8000/api/login`

**Request Body**:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "token": "jwt_token_string",
  "user": {
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```

### Geolocation API (IPinfo.io)

**Current User IP**: `GET https://ipinfo.io/json?token=YOUR_TOKEN`

**Search Specific IP**: `GET https://ipinfo.io/{ip}/json?token=YOUR_TOKEN`

**Response Fields**:

- `ip`: IP address
- `city`: City name
- `region`: Region/state
- `country`: Country code
- `loc`: Latitude and longitude (comma-separated)
- `hostname`: Hostname
- `org`: Organization
- `postal`: Postal code
- `timezone`: Timezone

## Features Walkthrough

### Authentication

- Protected routes ensure only authenticated users can access the application
- Token stored in localStorage with Zustand persist middleware
- Automatic redirect to login page if not authenticated

### IP Geolocation

- **Auto-fetch**: Automatically fetches current user's IP information on load
- **Search**: Enter any valid IPv4 or IPv6 address to get its geolocation
- **Clear**: Reset view to show current user's IP
- **Validation**: Client-side IP format validation

### History Management

- Stores up to 10 recent searches
- Click on history item to view its details
- Clear all history with one click
- Prevents duplicate entries

## Development Guidelines

### Service-Oriented Architecture

- All API calls are handled in `src/services/`
- State management centralized in `src/store/`
- Components remain clean and focused on UI

### Styling Convention

- Tailwind CSS utility-first approach
- Consistent spacing and color palette
- Responsive design with mobile-first approach
- Professional blue accent color (`#1a73e8`)

## License

MIT

## Credits

- [IPinfo.io](https://ipinfo.io/) for geolocation API
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
