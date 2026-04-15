import type { Metadata } from "next"
import WordCount from "./WordCount"

export const metadata: Metadata = {
  title: "Word Count & Text Stats",
  description:
    "Count words, characters, sentences, and reading time. Paste any text for instant statistics.",
  keywords: [
    "word count",
    "character count",
    "reading time",
    "word counter online",
    "text statistics",
  ],
  openGraph: {
    title: "Word Count & Text Stats",
    description:
      "Count words, characters, sentences, and reading time. Paste any text for instant statistics.",
    url: "https://textkit.yaro-labs.com/wordcount",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Count & Text Stats",
    description:
      "Count words, characters, sentences, and reading time. Paste any text for instant statistics.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Word Count & Text Stats",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/wordcount",
  "description":
    "Count words, characters, sentences, and reading time. Paste any text for instant statistics.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function WordCountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WordCount />
    </>
  )
}
