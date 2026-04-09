/**
 * components/ErrorCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Displays a friendly error message (e.g. "City not found").
 * Animates with a shake effect to draw the user's attention.
 */

export default function ErrorCard({ message }) {
  return (
    <div className="error-card" role="alert">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
}
