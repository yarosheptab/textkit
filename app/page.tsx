import { Navbar } from "@/components/navbar"
import { ToolCard } from "@/components/tool-card"
import { TOOLS } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "textkit — Free text utilities for writers & developers",
  description: "Six focused, browser-based text tools. No sign-up required.",
}

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        padding: "64px 28px 52px", borderBottom: "1px solid var(--border)",
        background: "var(--surface)", display: "grid",
        gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center",
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "11px", fontWeight: 500, color: "var(--accent)",
            background: "var(--accent-light)", border: "1px solid var(--accent-border)",
            borderRadius: "20px", padding: "3px 10px", marginBottom: "20px",
          }}>Text utilities</div>

          <h1 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "52px", fontWeight: 400, color: "var(--fg)",
            lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "18px",
          }}>
            Words,<br />shaped<br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>your way.</em>
          </h1>

          <p style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "15px", color: "var(--muted-fg)", lineHeight: 1.65,
            maxWidth: "420px", marginBottom: "28px",
          }}>
            Transform, count, format, and inspect text instantly. Six focused tools
            for writers, developers, and everyone who works with words.
          </p>

          <a href="#tools" style={{
            display: "inline-block", background: "var(--accent)", color: "#fff",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "14px", fontWeight: 600,
            borderRadius: "var(--radius)", padding: "10px 22px",
            cursor: "pointer", textDecoration: "none", marginRight: "10px",
          }}>Browse tools</a>
          <a href="https://github.com/yaro-labs/textkit"
            target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", background: "none", color: "var(--muted-fg)",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "14px", fontWeight: 500, border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "9px 18px",
              cursor: "pointer", textDecoration: "none",
            }}>View source ↗</a>
        </div>

        {/* Right — stat panel */}
        <div style={{
          display: "flex", flexDirection: "column",
          border: "1px solid var(--border)", borderRadius: "10px",
          overflow: "hidden", background: "var(--muted)", minWidth: "160px",
        }}>
          {[
            { n: "6", label: "Tools" },
            { n: "0", label: "Sign-ups required" },
            { n: "100%", label: "In-browser" },
          ].map(({ n, label }, i, arr) => (
            <div key={label} style={{
              padding: "16px 20px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "28px", color: "var(--fg)", lineHeight: 1, marginBottom: "3px",
              }}>{n}</div>
              <div style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "11px", color: "var(--subtle)",
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool grid */}
      <section id="tools" style={{ padding: "36px 28px 48px", background: "var(--bg)" }}>
        <div style={{
          display: "flex", alignItems: "baseline",
          justifyContent: "space-between", marginBottom: "20px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "22px", color: "var(--fg)",
          }}>All tools</h2>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "11px", color: "var(--subtle)",
          }}>{TOOLS.length} tools</span>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px",
        }}>
          {TOOLS.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>
    </div>
  )
}
