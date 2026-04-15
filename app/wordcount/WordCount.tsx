"use client"

import { useState } from "react"
import { ToolLayout, SplitPane, PaneLabel, PaneButton, Textarea } from "@/components/tool-layout"

function analyze(text: string) {
  const trimmed = text.trim()
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, "").length
  const sentences = trimmed === "" ? 0 : (trimmed.match(/[^.!?]*[.!?]+/g) || [trimmed]).length
  const paragraphs = trimmed === "" ? 0 : (trimmed.split(/\n\s*\n/).filter(Boolean).length || 1)
  const readingTime = Math.max(1, Math.ceil(words / 200))
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime }
}

const STAT_LABELS: { key: keyof ReturnType<typeof analyze>; label: string }[] = [
  { key: "words", label: "Words" },
  { key: "chars", label: "Characters" },
  { key: "charsNoSpaces", label: "Chars (no spaces)" },
  { key: "sentences", label: "Sentences" },
  { key: "paragraphs", label: "Paragraphs" },
  { key: "readingTime", label: "Reading time (min)" },
]

export default function WordCountPage() {
  const [input, setInput] = useState("")
  const stats = analyze(input)

  return (
    <ToolLayout
      slug="wordcount"
      name="Word Count"
      description="Count words, characters, sentences, and paragraphs. Estimate reading time."
    >
      <SplitPane
        left={
          <>
            <PaneLabel>Input</PaneLabel>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type text here…"
              style={{ minHeight: "260px" }}
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
            <PaneLabel>Stats</PaneLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {STAT_LABELS.map(({ key, label }) => (
                <div key={key} style={{
                  background: "var(--muted)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "14px 16px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "28px", color: "var(--fg)", lineHeight: 1, marginBottom: "4px",
                  }}>{stats[key].toLocaleString()}</div>
                  <div style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "11px", color: "var(--subtle)",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </>
        }
      />
    </ToolLayout>
  )
}
