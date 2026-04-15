"use client"

import { useState } from "react"
import {
  ToolLayout, SplitPane, PaneLabel, PaneButton, OutputBox,
} from "@/components/tool-layout"

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")

function pickWords(n: number): string {
  return Array.from({ length: n }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]).join(" ")
}
function makeSentence(wordCount = 10): string {
  const w = pickWords(wordCount)
  return w.charAt(0).toUpperCase() + w.slice(1) + "."
}
function makeParagraph(): string {
  return Array.from({ length: 4 }, () =>
    makeSentence(8 + Math.floor(Math.random() * 6))
  ).join(" ")
}

type Mode = "words" | "sentences" | "paragraphs"

function generate(mode: Mode, count: number): string {
  if (mode === "words") return pickWords(count)
  if (mode === "sentences") return Array.from({ length: count }, () => makeSentence()).join(" ")
  return Array.from({ length: count }, () => makeParagraph()).join("\n\n")
}

export default function LoremPage() {
  const [mode, setMode] = useState<Mode>("paragraphs")
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  return (
    <ToolLayout
      slug="lorem"
      name="Lorem Ipsum"
      description="Generate placeholder text by words, sentences, or paragraphs. Copy in one click."
    >
      <SplitPane
        left={
          <>
            <PaneLabel>Options</PaneLabel>
            <div style={{ marginBottom: "14px" }}>
              <div style={{
                fontSize: "11px", color: "var(--subtle)",
                fontFamily: "var(--font-sans)", marginBottom: "6px",
              }}>Generate by</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {(["words", "sentences", "paragraphs"] as Mode[]).map((m) => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "12px", fontWeight: 500, padding: "5px 12px",
                    borderRadius: "6px", border: "1px solid var(--border)", cursor: "pointer",
                    background: mode === m ? "var(--accent-light)" : "var(--surface)",
                    color: mode === m ? "var(--accent)" : "var(--muted-fg)",
                  }}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                fontSize: "11px", color: "var(--subtle)",
                fontFamily: "var(--font-sans)", marginBottom: "6px",
              }}>Count</div>
              <input
                type="number"
                min={1}
                max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20}
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px",
                  background: "var(--muted)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "8px 12px",
                  color: "var(--fg)", outline: "none", width: "80px",
                }}
              />
            </div>
            <PaneButton variant="primary" onClick={() => setOutput(generate(mode, count))}>
              Generate
            </PaneButton>
          </>
        }
        right={
          <>
            <PaneLabel>Output</PaneLabel>
            <OutputBox style={{ whiteSpace: "pre-wrap", minHeight: "260px" }}>
              {output || (
                <span style={{ color: "var(--subtle)" }}>
                  Click Generate to create lorem ipsum text.
                </span>
              )}
            </OutputBox>
            {output && (
              <div style={{ marginTop: "10px" }}>
                <PaneButton
                  variant="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(output)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </PaneButton>
              </div>
            )}
          </>
        }
      />
    </ToolLayout>
  )
}
