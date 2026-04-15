"use client"

import { useState, useEffect } from "react"
import { ToolLayout, PaneLabel } from "@/components/tool-layout"

const DEFAULT_MD = `# Hello, textkit

Type **Markdown** here and see it rendered on the right.

- Supports *italic* and **bold**
- Lists and [links](https://textkit.yaro-labs.com)
- \`inline code\` and fenced blocks

\`\`\`js
console.log("Hello, world!")
\`\`\`
`

export default function MarkdownPage() {
  const [input, setInput] = useState(DEFAULT_MD)
  const [html, setHtml] = useState("")

  useEffect(() => {
    import("marked").then(({ marked }) => {
      Promise.resolve(marked(input)).then(setHtml)
    })
  }, [input])

  return (
    <ToolLayout
      slug="markdown"
      name="Markdown Preview"
      description="Type Markdown on the left, see rendered HTML on the right. Live, as you type."
    >
      <div className="split-pane" style={{
        minHeight: "calc(100vh - 160px)",
      }}>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column" }}>
          <PaneLabel>Markdown</PaneLabel>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1, width: "100%", minHeight: "400px",
              background: "var(--muted)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", color: "var(--fg)",
              fontFamily: "var(--font-mono), monospace", fontSize: "13px",
              lineHeight: 1.6, padding: "12px 14px", resize: "none", outline: "none",
            }}
          />
        </div>
        <div className="split-pane-right" style={{
          padding: "20px 24px", overflowY: "auto",
        }}>
          <PaneLabel>Preview</PaneLabel>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ maxWidth: "none" }}
          />
        </div>
      </div>
    </ToolLayout>
  )
}
