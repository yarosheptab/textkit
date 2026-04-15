import type { Metadata } from "next"
import LoremIpsum from "./LoremIpsum"

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description:
    "Generate lorem ipsum placeholder text — by paragraph, sentence, or word count. Copy instantly.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text generator",
    "lorem ipsum",
    "filler text",
  ],
  openGraph: {
    title: "Lorem Ipsum Generator",
    description:
      "Generate lorem ipsum placeholder text — by paragraph, sentence, or word count. Copy instantly.",
    url: "https://textkit.yaro-labs.com/lorem",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorem Ipsum Generator",
    description:
      "Generate lorem ipsum placeholder text — by paragraph, sentence, or word count. Copy instantly.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lorem Ipsum Generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/lorem",
  "description":
    "Generate lorem ipsum placeholder text — by paragraph, sentence, or word count. Copy instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function LoremPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoremIpsum />
    </>
  )
}
