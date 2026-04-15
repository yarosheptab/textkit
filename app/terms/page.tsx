import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for textkit by Yaro Labs.",
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px",
        }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted-fg)", marginBottom: "40px" }}>
          Last updated: 16 April 2026
        </p>

        <div className="prose">
          <h2>1. Acceptance</h2>
          <p>
            By using textkit at textkit.yaro-labs.com, you agree to these Terms of Use. If you do
            not agree, please do not use the site.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            textkit provides a suite of browser-based text utilities including a case converter,
            word counter, Markdown previewer, slug generator, find &amp; replace tool, and lorem
            ipsum generator. All processing happens locally in your browser — no text is
            transmitted to our servers.
          </p>

          <h2>3. Permitted Use</h2>
          <p>
            You may use textkit for any lawful purpose. You agree not to:
          </p>
          <ul>
            <li>Use textkit in any way that violates applicable law or regulation.</li>
            <li>Attempt to reverse-engineer, scrape, or otherwise misuse the site.</li>
            <li>Use automated tools to generate excessive traffic.</li>
          </ul>

          <h2>4. No Warranty</h2>
          <p>
            textkit is provided "as is" without warranty of any kind. Yaro Labs makes no
            representations about accuracy, reliability, or fitness for a particular purpose. Use
            textkit at your own risk.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Yaro Labs shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of textkit.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The textkit name, design, and site content are owned by Yaro Labs. The underlying
            browser-based tool logic processes your text locally and does not claim any rights
            to content you enter.
          </p>

          <h2>7. Changes</h2>
          <p>
            We reserve the right to update these terms at any time. The "Last updated" date
            reflects the most recent revision. Continued use of textkit constitutes acceptance
            of the updated terms.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com">hello@yaro-labs.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
