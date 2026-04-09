# 🌤️ WeatherLens

A clean, modern weather app built with **React.js** and the **OpenWeatherMap API**.  
Features glassmorphism UI, dynamic backgrounds, geolocation, and a debounced search.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Copy `.env.example` to `.env` and paste your key:
```bash
cp .env.example .env
```
Then edit `.env`:
```
REACT_APP_WEATHER_API_KEY=your_key_here
```
Get a free key at → https://openweathermap.org/api

### 3. Run the app
```bash
npm start
```
Opens at http://localhost:3000

---

## 📁 Project Structure

```
weather-app/
├── public/
│   └── index.html              # HTML shell (loads Google Fonts)
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Debounced city search input
│   │   ├── WeatherCard.jsx     # Main weather display card
│   │   ├── LoadingCard.jsx     # Spinner shown during fetch
│   │   ├── ErrorCard.jsx       # Error message with shake animation
│   │   └── PlaceholderCard.jsx # First-load welcome card
│   ├── services/
│   │   └── api.js              # All OpenWeatherMap fetch calls
│   ├── App.js                  # Root component & state management
│   ├── index.js                # React entry point
│   └── styles.css              # All styles (glassmorphism + responsive)
├── .env                        # 🔒 Your secret API key (never commit this)
├── .env.example                # Template — safe to commit
├── .gitignore
└── package.json
```

---

## ✨ Features

| Feature | Detail |
|---|---|
| Search by city | Type any city name, press Enter or click Search |
| Debounced input | Auto-searches 500 ms after you stop typing |
| Geolocation | "Use my location" button for instant local weather |
| Dynamic background | Gradient shifts based on weather condition |
| Weather data | Temp, feels-like, min/max, humidity, wind, pressure |
| Sunrise & sunset | Local times displayed on the card |
| Loading state | Animated spinner while fetching |
| Error handling | Friendly message for unknown cities or network errors |
| Responsive | Works on mobile, tablet, and desktop |

---

## 🔒 Security Note

- Your API key lives in `.env` — it is listed in `.gitignore` and **will not** be committed.  
- Never push `.env` to a public repository.  
- For production deployment, set `REACT_APP_WEATHER_API_KEY` as an environment variable in your hosting platform (Vercel, Netlify, etc.).

---

## 🛠️ Build for Production

```bash
npm run build
```
Outputs an optimised bundle to the `build/` folder.
