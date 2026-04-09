/**
 * components/SearchBar.jsx
 * ─────────────────────────────────────────────────────────────
 * City search input with Enter-key and button support.
 * Includes a debounced value hook to avoid excess API calls
 * while the user is still typing.
 */

import { useState, useEffect } from "react";

/**
 * Simple debounce hook — waits `delay` ms after the last
 * keystroke before returning the updated value.
 */
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on re-render
  }, [value, delay]);
  return debounced;
}

export default function SearchBar({ onSearch, disabled }) {
  const [input, setInput] = useState("");

  // Debounced value — 500 ms after the user stops typing
  const debouncedInput = useDebounce(input, 500);

  // Trigger search automatically when debounced value updates
  // (only if the input isn't empty)
  useEffect(() => {
    if (debouncedInput.trim()) {
      onSearch(debouncedInput.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  // Also allow instant search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search city…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="Search for a city"
      />
      {/* Manual search button */}
      <button
        onClick={() => input.trim() && onSearch(input.trim())}
        disabled={disabled || !input.trim()}
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
}
