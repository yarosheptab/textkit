"use client"

import { useState } from "react"
import { ToolLayout, SplitPane, PaneLabel, PaneButton, Textarea } from "@/components/tool-layout"

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}
function toCamelCase(str: string) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}
function toSnakeCase(str: string) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
}
function toKebabCase(str: string) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

const VARIANTS = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: toTitleCase },
  { label: "camelCase", fn: toCamelCase },
  { label: "snake_case", fn: toSnakeCase },
  { label: "kebab-case", fn: toKebabCase },
]

export default function CasePage() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      slug="case"
      name="Case Converter"
      description="Convert text between uppercase, lowercase, title case, camelCase, snake_case, and kebab-case."
    >
      <SplitPane
        left={
          <>
            <PaneLabel>Input</PaneLabel>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type text here…"
              spellCheck={false}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <PaneButton
                variant="primary"
                onClick={async () => {
                  const t = await navigator.clipboard.readText()
                  setInput(t)
                }}
              >Paste</PaneButton>
              <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
            </div>
          </>
        }
        right={
          <>
            <PaneLabel>Output — click to copy</PaneLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {VARIANTS.map(({ label, fn }) => {
                const value = input ? fn(input) : ""
                const isCopied = copied === label
                return (
                  <div
                    key={label}
                    onClick={() => value && copy(value, label)}
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${isCopied ? "var(--accent-border)" : "var(--border)"}`,
                      borderRadius: "6px", padding: "10px 12px",
                      cursor: value ? "pointer" : "default",
                      transition: "border-color 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      if (value) e.currentTarget.style.borderColor = "var(--accent-border)"
                    }}
                    onMouseLeave={(e) => {
                      if (!isCopied) e.currentTarget.style.borderColor = "var(--border)"
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--font-mono), monospace", fontSize: "9px",
                      color: "var(--subtle)", textTransform: "uppercase",
                      letterSpacing: "0.06em", marginBottom: "4px",
                    }}>{label}</div>
                    <div style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "12px", color: "var(--fg)", fontWeight: 500,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {value || <span style={{ color: "var(--subtle)" }}>—</span>}
                    </div>
                    <div style={{
                      fontSize: "10px",
                      color: isCopied ? "var(--accent)" : "var(--subtle)",
                      marginTop: "3px",
                    }}>
                      {isCopied ? "Copied!" : "Click to copy"}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        }
      />
    </ToolLayout>
  )
}
