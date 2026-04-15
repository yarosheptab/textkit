"use client"

import { useState, useMemo } from "react"
import { ToolLayout, PaneLabel, PaneButton, Textarea } from "@/components/tool-layout"

type Segment = { text: string; match: boolean }

function buildSegments(text: string, find: string, useRegex: boolean): Segment[] {
  if (!find || !text) return [{ text, match: false }]
  try {
    const re = useRegex
      ? new RegExp(find, "g")
      : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    const segments: Segment[] = []
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) segments.push({ text: text.slice(last, m.index), match: false })
      segments.push({ text: m[0], match: true })
      last = re.lastIndex
      if (m[0].length === 0) re.lastIndex++
    }
    if (last < text.length) segments.push({ text: text.slice(last), match: false })
    return segments
  } catch {
    return [{ text, match: false }]
  }
}

function doReplace(text: string, find: string, replace: string, useRegex: boolean): string {
  if (!find) return text
  try {
    const re = useRegex
      ? new RegExp(find, "g")
      : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    return text.replace(re, replace)
  } catch {
    return text
  }
}

export default function FindReplacePage() {
  const [input, setInput] = useState("")
  const [find, setFind] = useState("")
  const [replace, setReplace] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [copied, setCopied] = useState(false)

  const replaced = useMemo(
    () => doReplace(input, find, replace, useRegex),
    [input, find, replace, useRegex]
  )
  const segments = useMemo(
    () => buildSegments(input, find, useRegex),
    [input, find, useRegex]
  )
  const matchCount = segments.filter((s) => s.match).length

  return (
    <ToolLayout
      slug="find-replace"
      name="Find & Replace"
      description="Search and replace text with plain strings or regular expressions. Highlights all matches."
    >
      <div style={{
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "0 28px", display: "flex", alignItems: "center", gap: "16px", height: "44px",
      }}>
        <input
          type="text"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          placeholder={useRegex ? "Regex pattern..." : "Find..."}
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px",
            background: "var(--muted)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "4px 10px", color: "var(--fg)",
            outline: "none", width: "200px",
          }}
        />
        <input
          type="text"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="Replace with..."
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px",
            background: "var(--muted)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "4px 10px", color: "var(--fg)",
            outline: "none", width: "200px",
          }}
        />
        <label style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "12px", color: "var(--muted-fg)", cursor: "pointer",
        }}>
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
          />
          Regex
        </label>
        {find && (
          <span style={{
            fontFamily: "var(--font-mono), monospace", fontSize: "11px",
            color: matchCount > 0 ? "var(--accent)" : "var(--subtle)",
          }}>
            {matchCount} match{matchCount !== 1 ? "es" : ""}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "340px" }}>
        <div style={{ padding: "20px 24px" }}>
          <PaneLabel>Input</PaneLabel>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text to search in..."
            spellCheck={false}
          />
          {find && input && (
            <div style={{
              marginTop: "10px", background: "var(--muted)",
              border: "1px solid var(--border)", borderRadius: "var(--radius)",
              padding: "10px 14px",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "13px", lineHeight: 1.6, color: "var(--fg)",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
              maxHeight: "120px", overflowY: "auto",
            }}>
              {segments.map((seg, i) =>
                seg.match ? (
                  <mark key={i} style={{
                    background: "var(--accent-light)", color: "var(--accent)",
                    borderRadius: "2px", padding: "0 1px",
                  }}>{seg.text}</mark>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
          </div>
        </div>

        <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--border)" }}>
          <PaneLabel>Output</PaneLabel>
          <div style={{
            background: "var(--muted)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "12px 14px",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "13px", lineHeight: 1.6,
            color: replaced ? "var(--fg)" : "var(--subtle)",
            minHeight: "180px", whiteSpace: "pre-wrap", wordBreak: "break-word",
          }}>
            {replaced || "Output will appear here..."}
          </div>
          {replaced && replaced !== input && (
            <div style={{ marginTop: "10px" }}>
              <PaneButton
                variant="primary"
                onClick={() => {
                  navigator.clipboard.writeText(replaced)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
              >
                {copied ? "Copied!" : "Copy result"}
              </PaneButton>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
