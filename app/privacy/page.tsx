import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for textkit — how we collect and use your information.",
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px",
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted-fg)", marginBottom: "40px" }}>
          Last updated: 16 April 2026
        </p>

        <div className="prose">
          <h2>1. Introduction</h2>
          <p>
            Yaro Labs operates textkit.yaro-labs.com ("textkit"), a collection of browser-based
            text utilities. All text processing runs entirely in your browser — your content is
            never sent to our servers.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect minimal information to understand how textkit is used:
          </p>
          <ul>
            <li><strong>Usage analytics</strong> — page views, session data, and feature usage via Google Analytics 4 (GA4). This data is anonymised and aggregated.</li>
            <li><strong>Cookie consent preference</strong> — stored in your browser's localStorage so we remember your choice.</li>
          </ul>
          <p>
            textkit does not require accounts, logins, or any personal information to use.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            Analytics data is used solely to understand which tools are most useful and how to
            improve the site. We do not use it for advertising, profiling, or any purpose beyond
            product improvement.
          </p>

          <h2>4. Sharing</h2>
          <p>
            We share data only with our analytics provider (Google Analytics 4). We do not sell,
            rent, or trade your information with any third parties.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete data
            held about you. Because we collect only anonymised analytics, we typically cannot
            identify you in that data. You can opt out of analytics by declining cookies in the
            banner, or by using a browser extension such as the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Add-on
            </a>.
          </p>

          <h2>6. Changes</h2>
          <p>
            We may update this policy from time to time. The "Last updated" date at the top of this
            page reflects the most recent revision. Continued use of textkit after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com">hello@yaro-labs.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
