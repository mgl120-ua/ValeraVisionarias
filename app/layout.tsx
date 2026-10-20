// app/layout.tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Inter, Playfair_Display } from "next/font/google"

import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import WhatsAppFloat from "@/components/site/WhatsAppFloat"
import SkipToContent from "@/components/skip-to-content"
import CookieBanner from "@/components/cookie-banner"
import { contactInfo, openingHoursSpecification } from "@/lib/contact-info"
import { SITE_URL } from "@/lib/site"

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Valera Visionarias — Inmobiliaria en San Vicente del Raspeig",
    template: "%s | Valera Visionarias",
  },
  description:
    "Inmobiliaria en San Vicente del Raspeig (Alicante): venta, compra y alquiler de viviendas con trato cercano. Solicita tu valoración gratuita.",
  // Sin canonical global: cada página declara el suyo para no canonicalizarlas todas a la portada
  openGraph: {
    type: "website",
    siteName: "Valera Visionarias",
    url: SITE_URL,
    title: "Valera Visionarias — Inmobiliaria en San Vicente del Raspeig",
    description: "Venta, compra y alquiler de viviendas en San Vicente del Raspeig. Valoración gratuita.",
    images: [{ url: "/images/hero-architecture.jpg", alt: "Valera Visionarias, inmobiliaria en San Vicente del Raspeig" }],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
  name: "Valera Visionarias",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-dark.png`,
  image: [`${SITE_URL}/images/logo-dark.png`, `${SITE_URL}/images/hero-architecture.jpg`],
  description:
    "Inmobiliaria en San Vicente del Raspeig especializada en la compraventa de viviendas, con valoración gratuita y acompañamiento durante todo el proceso.",
  telephone: contactInfo.phoneE164,
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.addressLine1,
    addressLocality: "San Vicente del Raspeig",
    addressRegion: "Alicante",
    postalCode: contactInfo.postalCode,
    addressCountry: "ES",
  },
  geo: { "@type": "GeoCoordinates", latitude: 38.3936, longitude: -0.5247 },
  openingHoursSpecification,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: contactInfo.phoneE164,
      contactType: "customer service",
      availableLanguage: ["Spanish"],
      areaServed: "ES",
    },
  ],
  sameAs: [contactInfo.socialLinks.instagram, contactInfo.socialLinks.tiktok, contactInfo.socialLinks.idealista],
  areaServed: [
    { "@type": "City", name: "San Vicente del Raspeig" },
    { "@type": "City", name: "Alicante" },
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Valera Visionarias",
  url: SITE_URL,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE_URL}/#organization` },
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
        <main id="main-content" tabIndex={-1} className="pt-[64px] lg:pt-[72px] focus:outline-none">
          {children}
        </main>

        <WhatsAppFloat />

        {/* Footer global */}
        <Footer year={year} />

        {/* Datos estructurados globales: se renderizan en el HTML para que los lean los buscadores */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
        />
      </body>
    </html>
  )
}
