/**
 * services/api.js
 * ─────────────────────────────────────────────────────────────
 * All OpenWeatherMap API calls live here.
 * The API key is read from the .env file so it's never
 * hard-coded or exposed in version control.
 *
 * Sign up for a free key at: https://openweathermap.org/api
 */

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch current weather by city name.
 * @param {string} city - City name (e.g. "London" or "New York,US")
 * @returns {Promise<Object>} OpenWeatherMap weather response
 */
export async function fetchWeatherByCity(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    // Provide a friendly error for the most common case
    if (response.status === 404) throw new Error(`City "${city}" not found`);
    if (response.status === 401) throw new Error("Invalid API key — check your .env file");
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

/**
 * Fetch current weather by geographic coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} OpenWeatherMap weather response
 */
export async function fetchWeatherByCoords(lat, lon) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Could not fetch weather for your location");

  return response.json();
}
