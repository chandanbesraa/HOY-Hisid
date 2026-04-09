/**
 * components/LoadingCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Shown while an API request is in-flight.
 * Uses a pure-CSS spinning ring — no extra libraries needed.
 */

export default function LoadingCard() {
  return (
    <div className="loading-card" role="status" aria-label="Loading weather data">
      <div className="spinner" />
      <span className="loading-text">Fetching live weather…</span>
    </div>
  );
}
