import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for textkit — how and why we use cookies.",
}

export default function CookiesPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px",
        }}>
          Cookie Policy
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted-fg)", marginBottom: "40px" }}>
          Last updated: 16 April 2026
        </p>

        <div className="prose">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored in your browser. They help websites remember
            information about your visit. textkit uses a minimal set of cookies — only what is
            necessary to understand site usage and remember your preferences.
          </p>

          <h2>Cookies We Use</h2>

          <h3>Analytics Cookies (Google Analytics 4)</h3>
          <p>
            We use Google Analytics 4 (GA4) to collect anonymised usage data — pages visited,
            time on site, and which tools are used. This helps us understand how textkit is used
            and where to improve. GA4 sets cookies such as <code>_ga</code> and <code>_ga_*</code>{" "}
            which persist for up to 2 years. Google may process this data in accordance with their
            own privacy policy.
          </p>

          <h3>Preference Cookie (localStorage)</h3>
          <p>
            When you respond to our cookie consent banner, your choice is saved in your browser's
            localStorage under the key <code>textkit-cookie-consent</code>. This is not a cookie
            in the traditional sense — it does not leave your device — but it stores your preference
            so we don't ask again.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can decline analytics cookies using the banner shown on your first visit. You can
            also clear your preference at any time by clearing localStorage in your browser's
            developer tools, which will cause the banner to appear again.
          </p>
          <p>
            For more control, you can install the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>{" "}
            or use your browser's built-in privacy settings to block third-party cookies.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy as our use of cookies changes. The "Last updated" date
            above reflects the most recent revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com">hello@yaro-labs.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
