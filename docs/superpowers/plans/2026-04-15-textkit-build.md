# textkit.yaro-labs.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold and fully implement textkit.yaro-labs.com — a warm serif text utilities site with 6 working browser-based tools, a blog, and an about page using Next.js 15 App Router + Tailwind CSS v4.

**Architecture:** Static Next.js 15 App Router site with no API routes; all tool logic runs client-side. Each tool lives in its own `app/<slug>/page.tsx`. Shared design tokens live in `app/globals.css` as CSS custom properties. Blog posts are MDX files parsed at build time with `gray-matter` + `marked`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/postcss`), `next/font/google` (DM Serif Display + DM Sans + Geist Mono), `gray-matter`, `marked`, GA4 via `next/script`.

---

## File Map

```
textkit/
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .gitignore
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                  (homepage)
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── case/page.tsx
│   ├── wordcount/page.tsx
│   ├── markdown/page.tsx
│   ├── slug/page.tsx
│   ├── find-replace/page.tsx
│   └── lorem/page.tsx
├── components/
│   ├── navbar.tsx
│   ├── tool-layout.tsx
│   └── tool-card.tsx
├── lib/
│   ├── blog.ts
│   └── tools.ts
└── content/
    └── blog/
        └── welcome.md
```

---

## Task 1: Scaffold project — package.json, configs, tsconfig

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

Content:
```json
{
  "name": "textkit",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^15.0.12",
    "next": "15.3.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.4",
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

Content:
```ts
import path from "path"
import { fileURLToPath } from "url"
import type { NextConfig } from "next"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 3: Create postcss.config.mjs**

Content:
```js
const config = { plugins: { "@tailwindcss/postcss": {} } }
export default config
```

- [ ] **Step 4: Create tsconfig.json**

Content:
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create .gitignore**

Content:
```
node_modules/
.next/
out/
.env
.env.local
.DS_Store
*.tsbuildinfo
```

- [ ] **Step 6: Install dependencies**

Run from /Users/a1111/Public/Prog/js/textkit/:
```bash
npm install
```
Expected: node_modules/ created, no errors.

- [ ] **Step 7: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git init
git add package.json next.config.ts postcss.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold project config"
```

---

## Task 2: Design system — app/globals.css

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create app/globals.css**

Content:
```css
@import "tailwindcss";

:root {
  --bg:             #faf9f7;
  --surface:        #ffffff;
  --muted:          #f5f3ef;
  --border:         #ece9e3;
  --border-2:       #ddd9d1;
  --fg:             #1c1917;
  --muted-fg:       #78716c;
  --subtle:         #a8a29e;
  --accent:         #f43f5e;
  --accent-light:   #fff1f2;
  --accent-border:  #fecdd3;
  --radius:         8px;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.prose h1, .prose h2, .prose h3 {
  font-family: var(--font-serif), Georgia, serif;
  color: var(--fg);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}
.prose h1 { font-size: 2rem; }
.prose h2 { font-size: 1.5rem; }
.prose h3 { font-size: 1.2rem; }
.prose p {
  color: var(--muted-fg);
  line-height: 1.75;
  margin-bottom: 1.25rem;
  font-size: 0.9375rem;
}
.prose ul, .prose ol {
  color: var(--muted-fg);
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  line-height: 1.75;
}
.prose li { margin-bottom: 0.35rem; }
.prose code {
  font-family: var(--font-mono), monospace;
  font-size: 0.82em;
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
}
.prose pre {
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}
.prose pre code { background: none; border: none; padding: 0; font-size: 0.85rem; }
.prose a { color: var(--accent); text-decoration: underline; text-decoration-color: var(--accent-border); }
.prose strong { color: var(--fg); font-weight: 600; }
.prose blockquote {
  border-left: 3px solid var(--accent-border);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--muted-fg);
  font-style: italic;
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/globals.css
git commit -m "feat: design system tokens and prose styles"
```

---

## Task 3: Root layout — fonts, metadata, GA4

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Create app/layout.tsx**

Content:
```tsx
import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const GA_ID = "G-XXXXXXXXXX"

export const metadata: Metadata = {
  metadataBase: new URL("https://textkit.yaro-labs.com"),
  title: {
    default: "textkit — Free text utilities for writers & developers",
    template: "%s | textkit",
  },
  description:
    "Six focused, browser-based text tools: case converter, word count, Markdown preview, slug generator, find & replace, and lorem ipsum. No sign-up required.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://textkit.yaro-labs.com",
    siteName: "textkit",
    locale: "en_US",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/layout.tsx
git commit -m "feat: root layout with DM Serif + DM Sans + Geist Mono and GA4"
```

---

## Task 4: Shared components — Navbar, ToolLayout, ToolCard, lib/tools.ts

**Files:**
- Create: `lib/tools.ts`
- Create: `components/navbar.tsx`
- Create: `components/tool-layout.tsx`
- Create: `components/tool-card.tsx`

- [ ] **Step 1: Create lib/tools.ts**

Content:
```ts
export type Tool = {
  slug: string
  name: string
  description: string
  icon: string
}

export const TOOLS: Tool[] = [
  {
    slug: "case",
    name: "Case Converter",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    icon: "M4 7h16M4 12h10M4 17h6",
  },
  {
    slug: "wordcount",
    name: "Word Count",
    description: "Count words, characters, sentences, and paragraphs. Estimate reading and speaking time.",
    icon: "M3 3h18v4H3zM3 10h12v4H3zM3 17h8v4H3z",
  },
  {
    slug: "markdown",
    name: "Markdown Preview",
    description: "Type Markdown on the left, see rendered HTML on the right. Live, as you type.",
    icon: "M4 7h4M4 12h16M4 17h12",
  },
  {
    slug: "slug",
    name: "Slug Generator",
    description: "Turn any string into a clean URL slug. Handles Unicode, spaces, and special characters.",
    icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  },
  {
    slug: "find-replace",
    name: "Find & Replace",
    description: "Search and replace text with plain strings or regular expressions. Highlights all matches.",
    icon: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z",
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum",
    description: "Generate placeholder text by words, sentences, or paragraphs. Copy in one click.",
    icon: "M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83",
  },
]
```

- [ ] **Step 2: Create components/navbar.tsx**

Content:
```tsx
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
        {[{ href: "/", label: "Tools" }, { href: "/blog", label: "Blog" }, { href: "/about", label: "About" }].map(({ href, label }) => (
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
        <span style={{ fontSize: "12px", color: "var(--subtle)", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
          Search tools…
        </span>
        <kbd style={{
          fontFamily: "var(--font-mono), monospace", fontSize: "10px",
          color: "var(--subtle)", background: "var(--border)",
          borderRadius: "3px", padding: "1px 5px", marginLeft: "8px",
        }}>⌘K</kbd>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Create components/tool-layout.tsx**

Content:
```tsx
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
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--subtle)", marginBottom: "10px" }}>
          <Link href="/" style={{ color: "var(--subtle)", textDecoration: "none" }}>textkit</Link>
          <span style={{ color: "var(--border-2)" }}>/</span>
          <span>{name}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "26px", fontWeight: 400, color: "var(--fg)", marginBottom: "4px" }}>{name}</h1>
        <p style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px", color: "var(--muted-fg)" }}>{description}</p>
      </div>
      {children}
    </div>
  )
}

export function SplitPane({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "340px" }}>
      <div style={{ padding: "20px 24px" }}>{left}</div>
      <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--border)" }}>{right}</div>
    </div>
  )
}

export function PaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "10px", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: "10px" }}>
      {children}
    </div>
  )
}

type PaneButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "default" }

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

export function OutputBox({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
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
```

- [ ] **Step 4: Create components/tool-card.tsx**

Content:
```tsx
import Link from "next/link"
import type { Tool } from "@/lib/tools"

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/${tool.slug}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "10px", padding: "20px 20px 16px",
        cursor: "pointer", display: "flex", flexDirection: "column",
        transition: "border-color 0.12s, box-shadow 0.12s", height: "100%",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(244,63,94,.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "8px", background: "var(--accent-light)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={1.8} style={{ width: 16, height: 16 }}>
            <path d={tool.icon} />
          </svg>
        </div>
        <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--fg)", marginBottom: "5px" }}>{tool.name}</div>
        <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", color: "var(--muted-fg)", lineHeight: 1.5, flex: 1 }}>{tool.description}</div>
        <div style={{ marginTop: "12px", fontFamily: "var(--font-mono), monospace", fontSize: "10px", color: "var(--subtle)" }}>/{tool.slug}</div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add lib/tools.ts components/navbar.tsx components/tool-layout.tsx components/tool-card.tsx
git commit -m "feat: shared components — Navbar, ToolLayout, ToolCard"
```

---

## Task 5: Homepage — app/page.tsx

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

Content:
```tsx
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

      <section style={{
        padding: "64px 28px 52px", borderBottom: "1px solid var(--border)",
        background: "var(--surface)", display: "grid",
        gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center",
      }}>
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
            fontSize: "14px", fontWeight: 600, border: "none",
            borderRadius: "var(--radius)", padding: "10px 22px",
            cursor: "pointer", textDecoration: "none", marginRight: "10px",
          }}>Browse tools</a>
          <a href="https://github.com/yaro-labs/textkit" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "none", color: "var(--muted-fg)",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "14px", fontWeight: 500, border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "9px 18px",
            cursor: "pointer", textDecoration: "none",
          }}>View source ↗</a>
        </div>

        <div style={{
          display: "flex", flexDirection: "column",
          border: "1px solid var(--border)", borderRadius: "10px",
          overflow: "hidden", background: "var(--muted)", minWidth: "160px",
        }}>
          {[{ n: "6", label: "Tools" }, { n: "0", label: "Sign-ups required" }, { n: "100%", label: "In-browser" }].map(({ n, label }, i, arr) => (
            <div key={label} style={{ padding: "16px 20px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "28px", color: "var(--fg)", lineHeight: 1, marginBottom: "3px" }}>{n}</div>
              <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "11px", color: "var(--subtle)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" style={{ padding: "36px 28px 48px", background: "var(--bg)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "22px", color: "var(--fg)" }}>All tools</h2>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--subtle)" }}>{TOOLS.length} tools</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {TOOLS.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/page.tsx
git commit -m "feat: homepage with hero and tool grid"
```

---

## Task 6: Tool — Case Converter — app/case/page.tsx

**Files:**
- Create: `app/case/page.tsx`

- [ ] **Step 1: Create app/case/page.tsx**

Content:
```tsx
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
    <ToolLayout slug="case" name="Case Converter" description="Convert text between uppercase, lowercase, title case, camelCase, snake_case, and kebab-case.">
      <SplitPane
        left={<>
          <PaneLabel>Input</PaneLabel>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste or type text here…" spellCheck={false} />
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <PaneButton variant="primary" onClick={async () => { const t = await navigator.clipboard.readText(); setInput(t) }}>Paste</PaneButton>
            <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
          </div>
        </>}
        right={<>
          <PaneLabel>Output — click to copy</PaneLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {VARIANTS.map(({ label, fn }) => {
              const value = input ? fn(input) : ""
              const isCopied = copied === label
              return (
                <div key={label} onClick={() => value && copy(value, label)}
                  style={{ background: "var(--surface)", border: `1px solid ${isCopied ? "var(--accent-border)" : "var(--border)"}`, borderRadius: "6px", padding: "10px 12px", cursor: value ? "pointer" : "default", transition: "border-color 0.12s" }}
                  onMouseEnter={(e) => { if (value) e.currentTarget.style.borderColor = "var(--accent-border)" }}
                  onMouseLeave={(e) => { if (!isCopied) e.currentTarget.style.borderColor = "var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", color: "var(--fg)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {value || <span style={{ color: "var(--subtle)" }}>—</span>}
                  </div>
                  <div style={{ fontSize: "10px", color: isCopied ? "var(--accent)" : "var(--subtle)", marginTop: "3px" }}>
                    {isCopied ? "Copied!" : "Click to copy"}
                  </div>
                </div>
              )
            })}
          </div>
        </>}
      />
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/case/page.tsx
git commit -m "feat: Case Converter tool"
```

---

## Task 7: Tool — Word Count — app/wordcount/page.tsx

**Files:**
- Create: `app/wordcount/page.tsx`

- [ ] **Step 1: Create app/wordcount/page.tsx**

Content:
```tsx
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
    <ToolLayout slug="wordcount" name="Word Count" description="Count words, characters, sentences, and paragraphs. Estimate reading time.">
      <SplitPane
        left={<>
          <PaneLabel>Input</PaneLabel>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste or type text here…" style={{ minHeight: "260px" }} />
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <PaneButton variant="primary" onClick={async () => { const t = await navigator.clipboard.readText(); setInput(t) }}>Paste</PaneButton>
            <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
          </div>
        </>}
        right={<>
          <PaneLabel>Stats</PaneLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {STAT_LABELS.map(({ key, label }) => (
              <div key={key} style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "28px", color: "var(--fg)", lineHeight: 1, marginBottom: "4px" }}>{stats[key].toLocaleString()}</div>
                <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "11px", color: "var(--subtle)" }}>{label}</div>
              </div>
            ))}
          </div>
        </>}
      />
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/wordcount/page.tsx
git commit -m "feat: Word Count tool"
```

---

## Task 8: Tool — Markdown Preview — app/markdown/page.tsx

**Files:**
- Create: `app/markdown/page.tsx`

- [ ] **Step 1: Create app/markdown/page.tsx**

Content:
```tsx
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
    <ToolLayout slug="markdown" name="Markdown Preview" description="Type Markdown on the left, see rendered HTML on the right. Live, as you type.">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 160px)" }}>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column" }}>
          <PaneLabel>Markdown</PaneLabel>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} style={{
            flex: 1, width: "100%", minHeight: "400px",
            background: "var(--muted)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", color: "var(--fg)",
            fontFamily: "var(--font-mono), monospace", fontSize: "13px",
            lineHeight: 1.6, padding: "12px 14px", resize: "none", outline: "none",
          }} />
        </div>
        <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--border)", overflowY: "auto" }}>
          <PaneLabel>Preview</PaneLabel>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} style={{ maxWidth: "none" }} />
        </div>
      </div>
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/markdown/page.tsx
git commit -m "feat: Markdown Preview tool with live split-pane"
```

---

## Task 9: Tool — Slug Generator — app/slug/page.tsx

**Files:**
- Create: `app/slug/page.tsx`

- [ ] **Step 1: Create app/slug/page.tsx**

Content:
```tsx
"use client"

import { useState } from "react"
import { ToolLayout, SplitPane, PaneLabel, PaneButton, Textarea, OutputBox } from "@/components/tool-layout"

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
    <ToolLayout slug="slug" name="Slug Generator" description="Turn any string into a clean URL slug. Handles Unicode, spaces, and special characters.">
      <SplitPane
        left={<>
          <PaneLabel>Input</PaneLabel>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="My Amazing Blog Post Title!" spellCheck={false} style={{ minHeight: "120px" }} />
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <PaneButton variant="primary" onClick={async () => { const t = await navigator.clipboard.readText(); setInput(t) }}>Paste</PaneButton>
            <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
          </div>
        </>}
        right={<>
          <PaneLabel>Slug</PaneLabel>
          <OutputBox>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "14px", color: slug ? "var(--fg)" : "var(--subtle)", wordBreak: "break-all" }}>
              {slug || "slug-will-appear-here"}
            </span>
          </OutputBox>
          {slug && (
            <div style={{ marginTop: "10px" }}>
              <PaneButton variant="primary" onClick={copy}>{copied ? "Copied!" : "Copy slug"}</PaneButton>
            </div>
          )}
        </>}
      />
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/slug/page.tsx
git commit -m "feat: Slug Generator tool"
```

---

## Task 10: Tool — Find & Replace — app/find-replace/page.tsx

**Files:**
- Create: `app/find-replace/page.tsx`

- [ ] **Step 1: Create app/find-replace/page.tsx**

Content:
```tsx
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
  } catch { return [{ text, match: false }] }
}

function doReplace(text: string, find: string, replace: string, useRegex: boolean): string {
  if (!find) return text
  try {
    const re = useRegex
      ? new RegExp(find, "g")
      : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    return text.replace(re, replace)
  } catch { return text }
}

export default function FindReplacePage() {
  const [input, setInput] = useState("")
  const [find, setFind] = useState("")
  const [replace, setReplace] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [copied, setCopied] = useState(false)

  const replaced = useMemo(() => doReplace(input, find, replace, useRegex), [input, find, replace, useRegex])
  const segments = useMemo(() => buildSegments(input, find, useRegex), [input, find, useRegex])
  const matchCount = segments.filter((s) => s.match).length

  return (
    <ToolLayout slug="find-replace" name="Find & Replace" description="Search and replace text with plain strings or regular expressions. Highlights all matches.">
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0 28px", display: "flex", alignItems: "center", gap: "16px", height: "44px" }}>
        <input type="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder={useRegex ? "Regex pattern…" : "Find…"}
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "6px", padding: "4px 10px", color: "var(--fg)", outline: "none", width: "200px" }} />
        <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace with…"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "6px", padding: "4px 10px", color: "var(--fg)", outline: "none", width: "200px" }} />
        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", color: "var(--muted-fg)", cursor: "pointer" }}>
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Regex
        </label>
        {find && (
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: matchCount > 0 ? "var(--accent)" : "var(--subtle)" }}>
            {matchCount} match{matchCount !== 1 ? "es" : ""}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "340px" }}>
        <div style={{ padding: "20px 24px" }}>
          <PaneLabel>Input</PaneLabel>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text to search in…" spellCheck={false} />
          {find && input && (
            <div style={{ marginTop: "10px", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "10px 14px", fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "120px", overflowY: "auto" }}>
              {segments.map((seg, i) => seg.match
                ? <mark key={i} style={{ background: "var(--accent-light)", color: "var(--accent)", borderRadius: "2px", padding: "0 1px" }}>{seg.text}</mark>
                : <span key={i}>{seg.text}</span>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <PaneButton onClick={() => setInput("")}>Clear</PaneButton>
          </div>
        </div>

        <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--border)" }}>
          <PaneLabel>Output</PaneLabel>
          <div style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "12px 14px", fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.6, color: replaced ? "var(--fg)" : "var(--subtle)", minHeight: "180px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {replaced || "Output will appear here…"}
          </div>
          {replaced && replaced !== input && (
            <div style={{ marginTop: "10px" }}>
              <PaneButton variant="primary" onClick={() => { navigator.clipboard.writeText(replaced); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>
                {copied ? "Copied!" : "Copy result"}
              </PaneButton>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/find-replace/page.tsx
git commit -m "feat: Find & Replace tool with regex support and match highlighting"
```

---

## Task 11: Tool — Lorem Ipsum — app/lorem/page.tsx

**Files:**
- Create: `app/lorem/page.tsx`

- [ ] **Step 1: Create app/lorem/page.tsx**

Content:
```tsx
"use client"

import { useState } from "react"
import { ToolLayout, SplitPane, PaneLabel, PaneButton, OutputBox } from "@/components/tool-layout"

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")

function pickWords(n: number): string {
  return Array.from({ length: n }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]).join(" ")
}
function makeSentence(wordCount = 10): string {
  const w = pickWords(wordCount)
  return w.charAt(0).toUpperCase() + w.slice(1) + "."
}
function makeParagraph(): string {
  return Array.from({ length: 4 }, () => makeSentence(8 + Math.floor(Math.random() * 6))).join(" ")
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
    <ToolLayout slug="lorem" name="Lorem Ipsum" description="Generate placeholder text by words, sentences, or paragraphs. Copy in one click.">
      <SplitPane
        left={<>
          <PaneLabel>Options</PaneLabel>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "11px", color: "var(--subtle)", fontFamily: "var(--font-sans)", marginBottom: "6px" }}>Generate by</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["words", "sentences", "paragraphs"] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)} style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 500, padding: "5px 12px", borderRadius: "6px", border: "1px solid var(--border)", cursor: "pointer", background: mode === m ? "var(--accent-light)" : "var(--surface)", color: mode === m ? "var(--accent)" : "var(--muted-fg)" }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", color: "var(--subtle)", fontFamily: "var(--font-sans)", marginBottom: "6px" }}>Count</div>
            <input type="number" min={1} max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20} value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "8px 12px", color: "var(--fg)", outline: "none", width: "80px" }} />
          </div>
          <PaneButton variant="primary" onClick={() => setOutput(generate(mode, count))}>Generate</PaneButton>
        </>}
        right={<>
          <PaneLabel>Output</PaneLabel>
          <OutputBox style={{ whiteSpace: "pre-wrap", minHeight: "260px" }}>
            {output || <span style={{ color: "var(--subtle)" }}>Click Generate to create lorem ipsum text.</span>}
          </OutputBox>
          {output && (
            <div style={{ marginTop: "10px" }}>
              <PaneButton variant="primary" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>
                {copied ? "Copied!" : "Copy"}
              </PaneButton>
            </div>
          )}
        </>}
      />
    </ToolLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/lorem/page.tsx
git commit -m "feat: Lorem Ipsum generator tool"
```

---

## Task 12: Blog data layer — lib/blog.ts + placeholder post

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/welcome.md`

- [ ] **Step 1: Create content/blog/welcome.md**

Content:
```md
---
title: "Welcome to textkit"
description: "textkit is a collection of six focused, browser-based text tools for writers, developers, and everyone who works with words."
datePublished: "2026-04-15"
readTime: "2 min read"
---

## Six tools, zero sign-ups

textkit ships with six tools: a case converter, word count, Markdown preview, slug generator, find & replace, and a lorem ipsum generator. Every tool runs entirely in your browser — no data leaves your device.

## Why textkit?

Most text utility sites are cluttered with ads, require accounts, or force you through slow page loads. textkit is fast, free, and stays out of your way.

## What's coming

More tools are on the way. Follow along at [yaro-labs.com](https://yaro-labs.com).
```

- [ ] **Step 2: Create lib/blog.ts**

Content:
```ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string
  readTime: string
  content: string
}

export function getAllPosts(): Omit<Post, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        datePublished: data.datePublished ?? "",
        readTime: data.readTime ?? "",
      }
    })
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    datePublished: data.datePublished ?? "",
    readTime: data.readTime ?? "",
    content,
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add lib/blog.ts content/blog/welcome.md
git commit -m "feat: blog data layer and placeholder post"
```

---

## Task 13: Blog pages — index + post

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/blog/page.tsx**

Content:
```tsx
import { Navbar } from "@/components/navbar"
import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on text tools, developer productivity, and the craft of language.",
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <h1 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px" }}>Blog</h1>
        <p style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "14px", color: "var(--muted-fg)", marginBottom: "40px" }}>
          Writing on text tools, developer productivity, and the craft of language.
        </p>
        {posts.length === 0 ? (
          <p style={{ color: "var(--subtle)" }}>No posts yet.</p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ padding: "20px 0", borderTop: i === 0 ? "1px solid var(--border)" : undefined, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--subtle)", marginBottom: "6px" }}>
                    {post.datePublished}{post.readTime ? ` · ${post.readTime}` : ""}
                  </div>
                  <div style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "20px", fontWeight: 400, color: "var(--fg)", marginBottom: "6px", lineHeight: 1.3 }}>{post.title}</div>
                  {post.description && (
                    <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "13px", color: "var(--muted-fg)", lineHeight: 1.55 }}>{post.description}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/blog/[slug]/page.tsx**

Content:
```tsx
import { Navbar } from "@/components/navbar"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { marked } from "marked"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked(post.content)

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--subtle)", marginBottom: "24px" }}>
          <Link href="/blog" style={{ color: "var(--subtle)", textDecoration: "none" }}>blog</Link>
          {" / "}{post.slug}
        </div>
        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11px", color: "var(--subtle)", marginBottom: "12px" }}>
          {post.datePublished}{post.readTime ? ` · ${post.readTime}` : ""}
        </div>
        <h1 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "36px", fontWeight: 400, color: "var(--fg)", lineHeight: 1.15, marginBottom: "32px" }}>{post.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/blog/page.tsx "app/blog/[slug]/page.tsx"
git commit -m "feat: blog index and post pages"
```

---

## Task 14: About page — app/about/page.tsx

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

Content:
```tsx
import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "textkit is a collection of focused browser-based text tools by Yaro Labs.",
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <h1 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "24px" }}>
          About textkit
        </h1>
        <div className="prose">
          <p>textkit is a collection of six focused, browser-based text tools for writers, developers, and everyone who works with words. No account required. No data leaves your device.</p>
          <h2>The tools</h2>
          <ul>
            <li><strong>Case Converter</strong> — UPPER, lower, Title, camelCase, snake_case, kebab-case</li>
            <li><strong>Word Count</strong> — words, characters, sentences, paragraphs, reading time</li>
            <li><strong>Markdown Preview</strong> — live split-pane render</li>
            <li><strong>Slug Generator</strong> — URL-safe slugs, Unicode-aware</li>
            <li><strong>Find &amp; Replace</strong> — plain text or regex, highlights matches</li>
            <li><strong>Lorem Ipsum</strong> — generate by words, sentences, or paragraphs</li>
          </ul>
          <h2>Built by</h2>
          <p>textkit is part of the <a href="https://yaro-labs.com">Yaro Labs</a> family of tool-kit sites.</p>
          <h2>Tech stack</h2>
          <p>Next.js 15 App Router · TypeScript · Tailwind CSS v4 · DM Serif Display · DM Sans · Geist Mono. Hosted on Vercel.</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add app/about/page.tsx
git commit -m "feat: about page"
```

---

## Task 15: Full build verification

- [ ] **Step 1: Run production build**

```bash
cd /Users/a1111/Public/Prog/js/textkit && npm run build 2>&1
```
Expected: exits 0, prints route listing including /, /about, /blog, /blog/welcome, /case, /wordcount, /markdown, /slug, /find-replace, /lorem

- [ ] **Step 2: Spot-check all routes on prod server**

```bash
cd /Users/a1111/Public/Prog/js/textkit && npm start &
sleep 3
for route in "/" "/about" "/blog" "/blog/welcome" "/case" "/wordcount" "/markdown" "/slug" "/find-replace" "/lorem"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}")
  echo "$route -> $code"
done
kill %1 2>/dev/null || true
```
Expected: all routes print `200`

- [ ] **Step 3: Final commit**

```bash
cd /Users/a1111/Public/Prog/js/textkit
git add -A
git commit -m "chore: verified full production build — all 10 routes 200"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
|---|---|
| Design tokens: bg, surface, muted, border, accent, accent-light, accent-border | Task 2 |
| DM Serif Display + DM Sans + Geist Mono via next/font/google | Task 3 |
| GA4 via next/script afterInteractive | Task 3 |
| Navbar: logo text/kit italic rose, nav links, search bar with kbd | Task 4 |
| Hero: 2-col grid, rose pill badge, 52px DM Serif h1 with italic em, stat panel | Task 5 |
| Tool grid: 3 cols, white cards, rose icon box, hover rose border + shadow | Task 4 + 5 |
| Tool page header: breadcrumb in Geist Mono, DM Serif h1, muted description | Task 4 |
| Split pane: 50/50 grid, border-left divider, pane labels in Geist Mono | Task 4 |
| /case — 6 clickable copy tiles (UPPER, lower, Title, camel, snake, kebab) | Task 6 |
| /wordcount — stats grid (words, chars, chars-no-spaces, sentences, paragraphs, reading time) | Task 7 |
| /markdown — live split-pane with marked, mono textarea left, prose right | Task 8 |
| /slug — Unicode-aware slug, copy button | Task 9 |
| /find-replace — regex toggle, match count, highlight marks, copy output | Task 10 |
| /lorem — mode selector (words/sentences/paragraphs), count input, copy | Task 11 |
| Blog data layer: gray-matter + fs, getAllPosts + getPostBySlug | Task 12 |
| Blog index: Geist Mono date, DM Serif title, hairline borders | Task 13 |
| Blog post: DM Serif prose, max-width 680px, breadcrumb | Task 13 |
| generateStaticParams on blog post for SSG | Task 13 |
| About page | Task 14 |
| All tool logic client-side only ("use client") | Tasks 6–11 |
| No external UI libraries | All tasks |
| Production build passes, all routes return 200 | Task 15 |
