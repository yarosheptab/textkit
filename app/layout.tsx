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
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9C73GBJ" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
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
