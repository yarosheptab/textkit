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
