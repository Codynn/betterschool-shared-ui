"use client";

// Imports straight from the library's source — not from `dist/` — so there's
// nothing to build. Save a change in ../../src/components/Navbar.tsx and
// this page hot-reloads with it immediately.
import {
  Navbar,
  buildMainNavLinks,
  SCHOOL_TOKEN_KEY,
  SCHOOL_USER_KEY,
  SCHOOL_AUTH_EVENT,
} from "../../src/index";

function simulateLogin() {
  localStorage.setItem(SCHOOL_TOKEN_KEY, "playground-fake-token");
  localStorage.setItem(
    SCHOOL_USER_KEY,
    JSON.stringify({ name: "Test Admin", email: "test@example.com" }),
  );
  window.dispatchEvent(new Event(SCHOOL_AUTH_EVENT));
}

function simulateLogout() {
  localStorage.removeItem(SCHOOL_TOKEN_KEY);
  localStorage.removeItem(SCHOOL_USER_KEY);
  window.dispatchEvent(new Event(SCHOOL_AUTH_EVENT));
}

const logo = (
  <div
    style={{
      width: "2rem",
      height: "2rem",
      borderRadius: "0.5rem",
      background: "var(--bsu-primary)",
      color: "var(--bsu-primary-contrast)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "0.875rem",
    }}
  >
    BS
  </div>
);

export default function PlaygroundPage() {
  return (
    <main>
      <Navbar
        logo={logo}
        homeHref="/"
        navLinks={buildMainNavLinks("landing")}
        directoryLoginHref="/login"
        erpLoginHref="/login"
        erpSignupHref="/signup"
      />

      <div style={{ maxWidth: 720, margin: "3rem auto", padding: "0 1.5rem" }}>
        <h1>Shared UI Playground</h1>
        <p>
          Edit <code>src/components/Navbar.tsx</code> and save — this page
          hot-reloads instantly, no build step. Add more components to{" "}
          <code>src/index.ts</code> and render them below the same way as the
          Navbar is rendered here.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button onClick={simulateLogin}>Simulate logged-in state</button>
          <button onClick={simulateLogout}>Simulate logged-out state</button>
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          The Navbar reads its auth state from localStorage (
          <code>schoolToken</code>/<code>schoolUser</code>) and updates live —
          no reload needed after clicking.
        </p>
      </div>
    </main>
  );
}
