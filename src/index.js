/**
 * src/index.js
 * ─────────────────────────────────────────────────────────────
 * React entry point — mounts <App /> into the #root div
 * defined in public/index.html.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
