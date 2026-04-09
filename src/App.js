/**
 * App.js — WeatherLens
 * ─────────────────────────────────────────────────────────────
 * Root component. Manages all state and orchestrates:
 *   - City search via SearchBar
 *   - Geolocation lookup
 *   - API calls (fetchWeatherByCity / fetchWeatherByCoords)
 *   - Rendering the correct UI state (loading / error / weather / placeholder)
 *   - Dynamic page background based on weather condition
 */

import { useState, useEffect, useCallback } from "react";
import "./styles.css";

import { fetchWeatherByCity, fetchWeatherByCoords } from "./services/api";
import SearchBar      from "./components/SearchBar";
import WeatherCard    from "./components/WeatherCard";
import LoadingCard    from "./components/LoadingCard";
import ErrorCard      from "./components/ErrorCard";
import PlaceholderCard from "./components/PlaceholderCard";

export default function App() {
  // ── State ──────────────────────────────────────────────────
  const [weather,    setWeather]    = useState(null);   // API response object
  const [loading,    setLoading]    = useState(false);  // fetch in-flight
  const [error,      setError]      = useState("");     // error message string
  const [locLoading, setLocLoading] = useState(false);  // geolocation in-flight

  // ── Background: update <body> data-weather on condition change ──
  // CSS uses attribute selectors like body[data-weather="clear"] { --bg: … }
  useEffect(() => {
    const condition = weather?.weather?.[0]?.main?.toLowerCase() ?? "";
    document.body.setAttribute("data-weather", condition);
  }, [weather]);

  // ── Core fetch helper ──────────────────────────────────────
  // Accepts any async function that returns weather data.
  // Handles loading, error, and success states in one place.
  const doFetch = useCallback(async (apiFn) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const data = await apiFn();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Search handler (called by SearchBar) ──────────────────
  const handleSearch = (city) => {
    doFetch(() => fetchWeatherByCity(city));
  };

  // ── Geolocation handler ───────────────────────────────────
  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocLoading(false);
        doFetch(() => fetchWeatherByCoords(coords.latitude, coords.longitude));
      },
      () => {
        setLocLoading(false);
        setError("Location access denied — please allow location or search by city");
      }
    );
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="app-wrapper">

      {/* App title */}
      <header className="app-header">
        <h1>Hoy-Hisid</h1>
        <p>Real-time weather, anywhere on Earth</p>
      </header>

      {/* City search — debounced input + Enter / button */}
      <SearchBar onSearch={handleSearch} disabled={loading} />

      {/* Geolocation button */}
      <button
        className="loc-btn"
        onClick={handleLocation}
        disabled={loading || locLoading}
        aria-label="Use current location"
      >
        {/* Pin icon */}
        <svg
          width="14" height="14"
          viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
        {locLoading ? "Detecting location…" : "Use my current location"}
      </button>

      {/* ── Content states ── */}

      {/* 1. Loading */}
      {loading && <LoadingCard />}

      {/* 2. Error */}
      {!loading && error && <ErrorCard message={error} />}

      {/* 3. Weather data */}
      {!loading && !error && weather && <WeatherCard data={weather} />}

      {/* 4. First-load placeholder */}
      {!loading && !error && !weather && <PlaceholderCard />}

      {/* Footer */}
      <footer className="app-footer">
        Powered by OpenWeatherMap · Hoy-hisid © 2026
      </footer>

    </div>
  );
}
