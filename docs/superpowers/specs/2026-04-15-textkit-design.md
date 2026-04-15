# textkit.yaro-labs.com — Design Specification

**Date:** 2026-04-15  
**Status:** Approved  
**Scope:** Homepage, tool pages, blog, about — full site design for textkit.yaro-labs.com

---

## Overview

textkit is a warm, editorial-styled text utilities site — the second of five tool-kit sub-sites under yaro-labs.com. It targets writers, developers, and content people who need fast browser-based text tools: case conversion, word counting, Markdown preview, slug generation, find/replace, and lorem ipsum generation.

**Design philosophy:** Warm serif + rose — editorial feel, DM Serif Display headlines with italic rose accents, off-white background, clean card grid. Feels human and readable, not developer-tool cold.

---

## Visual Design

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#faf9f7` | Page/section background |
| Surface | `#ffffff` | Navbar, hero, cards |
| Muted | `#f5f3ef` | Input fields, hover bg, stat panels |
| Border | `#ece9e3` | Default borders |
| Border (active) | `#ddd9d1` | Hover/focus borders |
| Foreground | `#1c1917` | Primary text |
| Muted foreground | `#78716c` | Body copy, descriptions |
| Subtle | `#a8a29e` | Placeholders, labels, tags |
| Accent | `#f43f5e` | Rose — CTA, icon fills, italic headlines |
| Accent light | `#fff1f2` | Icon backgrounds, badge fills |
| Accent border | `#fecdd3` | Icon/badge borders |

### Typography

- **Headlines:** DM Serif Display — large italic rose for emphasis words
- **Body / UI:** DM Sans — nav links, descriptions, buttons, labels
- **Code / tags:** Geist Mono — tool slugs, breadcrumbs, keyboard shortcuts
- **Border radius:** 8px

### Motion

Transitions: 120ms ease on border-color and box-shadow. Cards lift slightly (rose tinted border + subtle rose shadow) on hover.

---

## Site Structure

```
/                  → Homepage (hero + 3-col tool grid)
/[tool-slug]       → Tool page (e.g. /case, /wordcount, /markdown)
/blog              → Blog index (MDX posts)
/blog/[slug]       → Blog post
/about             → About page
```

### Tools (6 total)

| Slug | Name | Description |
|---|---|---|
| `/case` | Case Converter | UPPER, lower, Title, camelCase, snake_case, kebab-case |
| `/wordcount` | Word Count | Words, characters, sentences, paragraphs, reading time |
| `/markdown` | Markdown Preview | Live split-pane Markdown → HTML render |
| `/slug` | Slug Generator | URL-safe slugs from any string, handles Unicode |
| `/find-replace` | Find & Replace | Plain string or regex search/replace with match highlighting |
| `/lorem` | Lorem Ipsum | Generate placeholder text by words/sentences/paragraphs |

---

## Layout: Homepage

### Navbar
- Left: `text`*`kit`* — "text" in DM Serif regular, "kit" in DM Serif italic rose
- Center: Tools · Blog · About (DM Sans 500, muted inactive, dark active)
- Right: search bar (muted bg, `⌘K` kbd badge)
- Height: 56px, bottom border, white background

### Hero
- Two-column layout: left = text, right = stat panel
- **Left:** rose pill badge ("Text utilities") · DM Serif 52px headline with italic rose word · DM Sans body · primary (rose) + ghost CTA buttons
- **Right:** stacked stat panel — "6 Tools / 0 Sign-ups required / 100% In-browser" — each in a bordered muted-bg row

### Tool Grid
- Section title: "All tools" in DM Serif 22px + count in Geist Mono (right-aligned)
- 3 columns, 10px gap
- Card: white surface, 8px radius, 1px border → hover: rose border + soft rose shadow
- Card anatomy: rose icon box (36×36) · tool name (DM Sans 600 14px) · description (muted) · slug tag in Geist Mono (bottom, subtle)

---

## Layout: Tool Page

### Header
- Breadcrumb: `textkit / Tool Name` in Geist Mono 11px muted
- Headline: DM Serif 26px
- Description: DM Sans 13px muted

### Body — Split Pane (most tools)
- Two equal columns, `border-left` divider
- **Left:** "Input" label (Geist Mono uppercase) · textarea (muted bg) · action buttons
- **Right:** "Output" label · content varies per tool:
  - Case Converter: 2×3 grid of clickable copy tiles (each shows label + converted value)
  - Word Count: stat grid (words, chars, sentences, reading time)
  - Markdown Preview: rendered HTML in a styled prose container
  - Slug Generator: single output field + copy button
  - Find & Replace: highlighted text output
  - Lorem Ipsum: single output textarea

---

## Layout: Blog

- Post list: date (Geist Mono, subtle) · DM Serif title · one-line excerpt (DM Sans)
- Separated by hairline borders, no card styling
- Post page: DM Serif prose, max-width 680px, centered

---

## Technical Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 |
| Fonts | `next/font/google` — DM Serif Display + DM Sans + Geist Mono |
| Blog | MDX via `gray-matter` + `marked` |
| Analytics | GA4 via `next/script` afterInteractive |
| OG images | Playwright `browser_run_code` |
| Deployment | Vercel → textkit.yaro-labs.com |
| Repo | GitHub, repo named `textkit` |

### Key Notes
- All tool logic client-side only — no API routes
- No external UI libraries
- Tool pages at `app/[slug]/page.tsx` or individual `app/case/page.tsx`, etc.
- Blog posts in `content/blog/*.mdx`
- Design reference mockup: `/Users/a1111/Public/Prog/js/devkit/.superpowers/brainstorm/40054-1776278865/content/textkit-final.html`

---

## Success Criteria

- Loads < 1s on Vercel edge (SSG)
- All 6 tools work offline
- Lighthouse accessibility ≥ 90
- OG images for homepage + each tool
- GA4 fires on page load and tool usage
