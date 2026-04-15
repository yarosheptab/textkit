import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
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

const siteTitle = "textkit — Free text utilities for writers & developers"
const siteDescription =
  "Text utilities — Case Converter, Word Count, Markdown Preview, Slug Generator, Find & Replace, Lorem Ipsum. Six focused, browser-based tools. No sign-up required."

export const metadata: Metadata = {
  metadataBase: new URL("https://textkit.yaro-labs.com"),
  title: {
    default: siteTitle,
    template: "%s | textkit",
  },
  description: siteDescription,
  keywords: [
    "text tools",
    "case converter",
    "word count",
    "markdown preview",
    "slug generator",
    "find and replace",
    "lorem ipsum",
    "text utilities",
    "browser text tools",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://textkit.yaro-labs.com",
    siteName: "textkit",
    locale: "en_US",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "https://textkit.yaro-labs.com/og/home.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["https://textkit.yaro-labs.com/og/home.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} ${geistMono.variable}`}>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9C73GBJ" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "textkit",
              "url": "https://textkit.yaro-labs.com",
              "description": siteDescription,
              "publisher": {
                "@type": "Organization",
                "name": "Yaro Labs",
                "url": "https://yaro-labs.com",
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://textkit.yaro-labs.com/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <Footer />
        <CookieConsent />
        <Analytics />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P9C73GBJ');`,
          }}
        />
      </body>
    </html>
  )
}
