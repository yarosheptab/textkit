import type { Metadata } from "next"
import FindReplace from "./FindReplace"

export const metadata: Metadata = {
  title: "Find & Replace",
  description:
    "Find and replace text with plain strings or regex patterns. Paste text, enter your search term, and replace in one click.",
  keywords: [
    "find and replace",
    "text find replace",
    "bulk replace text",
    "regex replace",
    "string replacement tool",
  ],
  openGraph: {
    title: "Find & Replace",
    description:
      "Find and replace text with plain strings or regex patterns. Paste text, enter your search term, and replace in one click.",
    url: "https://textkit.yaro-labs.com/find-replace",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find & Replace",
    description:
      "Find and replace text with plain strings or regex patterns. Paste text, enter your search term, and replace in one click.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Find & Replace",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/find-replace",
  "description":
    "Find and replace text with plain strings or regex patterns. Paste text, enter your search term, and replace in one click.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function FindReplacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FindReplace />
    </>
  )
}
