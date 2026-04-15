import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "textkit is a collection of focused browser-based text tools by Yaro Labs.",
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "24px",
        }}>
          About textkit
        </h1>
        <div className="prose">
          <p>
            textkit is a collection of six focused, browser-based text tools for writers,
            developers, and everyone who works with words. No account required. No data
            leaves your device.
          </p>
          <h2>The tools</h2>
          <ul>
            <li><strong>Case Converter</strong> — UPPER, lower, Title, camelCase, snake_case, kebab-case</li>
            <li><strong>Word Count</strong> — words, characters, sentences, paragraphs, reading time</li>
            <li><strong>Markdown Preview</strong> — live split-pane render</li>
            <li><strong>Slug Generator</strong> — URL-safe slugs, Unicode-aware</li>
            <li><strong>Find &amp; Replace</strong> — plain text or regex, highlights matches</li>
            <li><strong>Lorem Ipsum</strong> — generate by words, sentences, or paragraphs</li>
          </ul>
          <h2>Built by</h2>
          <p>
            textkit is part of the{" "}
            <a href="https://yaro-labs.com">Yaro Labs</a>{" "}
            family of tool-kit sites. Yaro Labs builds custom internal tools and backoffice
            systems for SaaS teams.
          </p>
        </div>
      </div>
    </div>
  )
}
