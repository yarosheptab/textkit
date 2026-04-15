import Link from "next/link"
import { Navbar } from "./navbar"

type ToolLayoutProps = {
  slug: string
  name: string
  description: string
  children: React.ReactNode
}

export function ToolLayout({ slug, name, description, children }: ToolLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      <div style={{
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "24px 28px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "var(--font-mono), monospace", fontSize: "11px",
          color: "var(--subtle)", marginBottom: "10px",
        }}>
          <Link href="/" style={{ color: "var(--subtle)", textDecoration: "none" }}>textkit</Link>
          <span style={{ color: "var(--border-2)" }}>/</span>
          <span>{name}</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "26px", fontWeight: 400, color: "var(--fg)", marginBottom: "4px",
        }}>{name}</h1>
        <p style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "13px", color: "var(--muted-fg)",
        }}>{description}</p>
      </div>
      {children}
    </div>
  )
}

export function SplitPane({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="split-pane" style={{ minHeight: "340px" }}>
      <div style={{ padding: "20px 24px" }}>{left}</div>
      <div className="split-pane-right" style={{ padding: "20px 24px" }}>{right}</div>
    </div>
  )
}

export function PaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono), monospace", fontSize: "10px", fontWeight: 500,
      letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--subtle)",
      marginBottom: "10px",
    }}>
      {children}
    </div>
  )
}

type PaneButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "default"
}

export function PaneButton({ variant = "default", style, ...props }: PaneButtonProps) {
  return (
    <button style={{
      fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 500,
      borderRadius: "6px", padding: "6px 14px", cursor: "pointer",
      border: variant === "primary" ? "1px solid var(--accent)" : "1px solid var(--border)",
      background: variant === "primary" ? "var(--accent)" : "var(--surface)",
      color: variant === "primary" ? "#fff" : "var(--muted-fg)",
      ...style,
    }} {...props} />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea style={{
      width: "100%", minHeight: "180px",
      background: "var(--muted)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", color: "var(--fg)",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      fontSize: "13px", lineHeight: 1.6, padding: "12px 14px",
      resize: "vertical", outline: "none",
    }} {...props} />
  )
}

export function OutputBox({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      background: "var(--muted)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "12px 14px",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", minHeight: "180px",
      ...style,
    }}>
      {children}
    </div>
  )
}
