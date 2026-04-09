/**
 * components/PlaceholderCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Shown on first load before any search has been made.
 * Encourages the user to search or use geolocation.
 */

export default function PlaceholderCard() {
  return (
    <div className="placeholder-card">
      <div className="ph-icon" aria-hidden="true">🌤️</div>
      <h2>Discover the Weather</h2>
      <p>
        Search for any city above, or tap{" "}
        <strong>"Use my current location"</strong> to see live
        conditions right where you are.
      </p>
    </div>
  );
}
