"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", height: "56px",
      borderBottom: "1px solid var(--border)", background: "var(--surface)",
    }}>
      <Link href="/" style={{
        fontFamily: "var(--font-serif), Georgia, serif",
        fontSize: "18px", color: "var(--fg)", textDecoration: "none",
        letterSpacing: "-0.01em",
      }}>
        text<em style={{ fontStyle: "italic", color: "var(--accent)" }}>kit</em>
      </Link>

      <div style={{ display: "flex", gap: "4px" }}>
        {[
          { href: "/", label: "Tools" },
          { href: "/blog", label: "Blog" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "13px", fontWeight: 500,
            color: isActive(href) ? "var(--fg)" : "var(--subtle)",
            textDecoration: "none", padding: "5px 11px", borderRadius: "6px",
          }}>{label}</Link>
        ))}
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: "var(--muted)", border: "1px solid var(--border)",
        borderRadius: "6px", padding: "5px 12px", cursor: "text",
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          style={{ width: 13, height: 13, color: "var(--subtle)", flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{
          fontSize: "12px", color: "var(--subtle)",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        }}>Search tools…</span>
        <kbd style={{
          fontFamily: "var(--font-mono), monospace", fontSize: "10px",
          color: "var(--subtle)", background: "var(--border)",
          borderRadius: "3px", padding: "1px 5px", marginLeft: "8px",
        }}>⌘K</kbd>
      </div>
    </nav>
  )
}
