"use client"

import Link from "next/link"
import type { Tool } from "@/lib/tools"

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/${tool.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "10px", padding: "20px 20px 16px",
          cursor: "pointer", display: "flex", flexDirection: "column",
          transition: "border-color 0.12s, box-shadow 0.12s", height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-border)"
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(244,63,94,.06)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "8px",
          background: "var(--accent-light)", border: "1px solid var(--accent-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "12px", flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={1.8}
            style={{ width: 16, height: 16 }}>
            <path d={tool.icon} />
          </svg>
        </div>
        <div style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "14px", fontWeight: 600, color: "var(--fg)", marginBottom: "5px",
        }}>{tool.name}</div>
        <div style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "12px", color: "var(--muted-fg)", lineHeight: 1.5, flex: 1,
        }}>{tool.description}</div>
        <div style={{
          marginTop: "12px", fontFamily: "var(--font-mono), monospace",
          fontSize: "10px", color: "var(--subtle)",
        }}>/{tool.slug}</div>
      </div>
    </Link>
  )
}
