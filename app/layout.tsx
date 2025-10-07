// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

import { Inter, Playfair_Display } from "next/font/google"

import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import SkipToContent from "@/components/skip-to-content"
import CookieBanner from "@/components/cookie-banner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  // conservamos tu metadato original
  generator: "v0.app",
  metadataBase: new URL("https://valeravisionarias.com"),
  title: {
    default: "Valera Visionarias — Inmobiliaria en San Vicente del Raspeig",
    template: "%s | Valera Visionarias",
  },
  description:
    "Compra, venta y alquiler en San Vicente del Raspeig (Alicante). Especialistas en UA. Valoración gratuita.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Valera Visionarias",
    url: "https://valeravisionarias.com",
    title: "Inmobiliaria en San Vicente del Raspeig",
    description:
      "Compra, venta y alquiler cerca de la Universidad de Alicante. Valoración gratuita.",
    images: [{ url: "/og/cover.jpg" }],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@valeravisionarias",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-screen bg-white text-stone-900 antialiased">
        {/* Accesibilidad + cookies */}
        <SkipToContent />
        <CookieBanner />

        {/* Header global */}
        <Header />

        {/* Contenido de las páginas (padding top para header fijo) */}
        <main id="main-content" className="pt-[72px] md:pt-[80px]">
          {children}
        </main>

        {/* Footer global */}
        <Footer year={year} />

        {/* JSON-LD global (RealEstateAgent) */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Valera Visionarias",
            image: "https://valeravisionarias.com/images/logo-dark.png",
            "@id": "https://valeravisionarias.com",
            url: "https://valeravisionarias.com",
            telephone: "+34645680339",
            email: "Valeravisionarias@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Villafranqueza 50, local 1",
              addressLocality: "San Vicente del Raspeig",
              addressRegion: "Alicante",
              postalCode: "03690",
              addressCountry: "ES",
            },
            geo: { "@type": "GeoCoordinates", latitude: 38.3936, longitude: -0.5247 },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "19:00",
            },
            sameAs: [
              "https://www.facebook.com/valeravisionarias",
              "https://www.instagram.com/valeravisionarias",
            ],
            priceRange: "€€",
            areaServed: "San Vicente del Raspeig, Alicante",
          })}
        </Script>

        {/* JSON-LD WebSite (Site Search) */}
        <Script id="site-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Valera Visionarias",
            url: "https://valeravisionarias.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://valeravisionarias.com/propiedades?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
      </body>
    </html>
  )
}
