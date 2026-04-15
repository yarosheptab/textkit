import type { Metadata } from "next"
import MarkdownPreview from "./MarkdownPreview"

export const metadata: Metadata = {
  title: "Markdown Preview",
  description:
    "Write Markdown and see a live rendered preview side by side. Supports GFM — tables, code blocks, and more.",
  keywords: [
    "markdown preview",
    "markdown editor",
    "markdown renderer",
    "live markdown",
    "GFM preview",
  ],
  openGraph: {
    title: "Markdown Preview",
    description:
      "Write Markdown and see a live rendered preview side by side. Supports GFM — tables, code blocks, and more.",
    url: "https://textkit.yaro-labs.com/markdown",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Preview",
    description:
      "Write Markdown and see a live rendered preview side by side. Supports GFM — tables, code blocks, and more.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Markdown Preview",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/markdown",
  "description":
    "Write Markdown and see a live rendered preview side by side. Supports GFM — tables, code blocks, and more.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function MarkdownPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarkdownPreview />
    </>
  )
}
