"use client"

import { useState } from "react"
import {
  ToolLayout, SplitPane, PaneLabel, PaneButton, Textarea, OutputBox,
} from "@/components/tool-layout"

function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function SlugPage() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const slug = toSlug(input)

  const copy = () => {
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      slug="slug"
      name="Slug Generator"
      description="Turn any string into a clean URL slug. Handles Unicode, spaces, and special characters."
    >
      <SplitPane
        left={
          <>
            <PaneLabel>Input</PaneLabel>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="My Amazing Blog Post Title!"
              spellCheck={false}
              style={{ minHeight: "120px" }}
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
            <PaneLabel>Slug</PaneLabel>
            <OutputBox>
              <span style={{
                fontFamily: "var(--font-mono), monospace", fontSize: "14px",
                color: slug ? "var(--fg)" : "var(--subtle)", wordBreak: "break-all",
              }}>
                {slug || "slug-will-appear-here"}
              </span>
            </OutputBox>
            {slug && (
              <div style={{ marginTop: "10px" }}>
                <PaneButton variant="primary" onClick={copy}>
                  {copied ? "Copied!" : "Copy slug"}
                </PaneButton>
              </div>
            )}
          </>
        }
      />
    </ToolLayout>
  )
}
