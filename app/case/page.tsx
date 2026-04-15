import type { Metadata } from "next"
import CaseConverter from "./CaseConverter"

export const metadata: Metadata = {
  title: "Case Converter — Upper, Lower, Title, Camel Case",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Instant, in-browser.",
  keywords: [
    "case converter",
    "text case",
    "uppercase converter",
    "lowercase converter",
    "camelCase converter",
    "snake_case",
    "kebab-case",
    "title case",
  ],
  openGraph: {
    title: "Case Converter — Upper, Lower, Title, Camel Case",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Instant, in-browser.",
    url: "https://textkit.yaro-labs.com/case",
    images: [{ url: "https://textkit.yaro-labs.com/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter — Upper, Lower, Title, Camel Case",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Instant, in-browser.",
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Case Converter",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "url": "https://textkit.yaro-labs.com/case",
  "description":
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Instant, in-browser.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" },
}

export default function CasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseConverter />
    </>
  )
}
