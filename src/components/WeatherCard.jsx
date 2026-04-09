/**
 * components/WeatherCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Displays all weather data returned by the API:
 *   city name, country, temperature, condition, icon,
 *   feels-like, min/max, humidity, wind, pressure,
 *   and sunrise / sunset times.
 */

/**
 * Build the OpenWeatherMap icon URL from an icon code.
 * @2x gives the higher-resolution (64×64) PNG.
 */
function iconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

/**
 * Convert a Unix timestamp + timezone offset (seconds) to
 * a human-readable HH:MM time string.
 */
function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function WeatherCard({ data }) {
  // Destructure the fields we need from the API response
  const { name, sys, main, weather, wind } = data;
  const condition = weather[0]; // primary weather condition object

  return (
    <div className="weather-card">

      {/* ── Top row: city info + icon ── */}
      <div className="card-top">
        <div className="card-location">
          <h2 className="city-name">{name}</h2>
          <span className="country-badge">{sys.country}</span>
        </div>

        <div className="weather-icon-wrap">
          <img
            src={iconUrl(condition.icon)}
            alt={condition.description}
            className="weather-icon"
          />
          <span className="condition-label">{condition.description}</span>
        </div>
      </div>

      {/* ── Temperature ── */}
      <div className="temp-row">
        <span className="temp-big">{Math.round(main.temp)}</span>
        <span className="temp-unit">°C</span>
      </div>
      <p className="feels-like">Feels like {Math.round(main.feels_like)}°C</p>

      {/* ── Min / Max pills ── */}
      <div className="minmax-row">
        <span className="minmax-pill">↑ {Math.round(main.temp_max)}°</span>
        <span className="minmax-pill">↓ {Math.round(main.temp_min)}°</span>
      </div>

      {/* ── Stats: humidity, wind, pressure ── */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">💧</span>
          <span className="stat-value">{main.humidity}%</span>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌬️</span>
          <span className="stat-value">{Math.round(wind.speed)} m/s</span>
          <span className="stat-label">Wind</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔵</span>
          <span className="stat-value">{main.pressure}</span>
          <span className="stat-label">hPa</span>
        </div>
      </div>

      {/* ── Sunrise / Sunset ── */}
      <div className="sun-strip">
        <div className="sun-item">
          <span className="sun-icon">🌅</span>
          <span className="sun-val">{formatTime(sys.sunrise)}</span>
          <span className="sun-lbl">Sunrise</span>
        </div>
        <div className="sun-divider" />
        <div className="sun-item">
          <span className="sun-icon">🌇</span>
          <span className="sun-val">{formatTime(sys.sunset)}</span>
          <span className="sun-lbl">Sunset</span>
        </div>
      </div>

    </div>
  );
}
