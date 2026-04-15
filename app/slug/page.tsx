import type { Metadata } from "next"
import SlugGenerator from "./SlugGenerator"

export const metadata: Metadata = {
  title: "Slug Generator",
  description:
    "Convert any text into a URL-friendly slug. Removes special characters, lowercases, and replaces spaces with hyphens.",
  keywords: [
    "slug generator",
    "URL slug",
    "generate slug",
    "URL-friendly string",
    "permalink generator",
  ],
  openGraph: {
    title: "Slug Generator",
    description:
      "Convert any text into a URL-friendly slug. Removes special characters, lowercases, and replaces spaces with hyphens.",
    url: "https://textkit.yaro-labs.com/slug",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slug Generator",
    description:
      "Convert any text into a URL-friendly slug. Removes special characters, lowercases, and replaces spaces with hyphens.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Slug Generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/slug",
  "description":
    "Convert any text into a URL-friendly slug. Removes special characters, lowercases, and replaces spaces with hyphens.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function SlugPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SlugGenerator />
    </>
  )
}
