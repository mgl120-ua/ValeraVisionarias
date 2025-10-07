// app/contacto/page.tsx
import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import dynamic from "next/dynamic"

const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false })

export const metadata: Metadata = {
  title: "Contacto — Valera Visionarias",
  description:
    "¿Hablamos? Escríbenos y te respondemos en menos de 24 horas. Inmobiliaria en San Vicente del Raspeig.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Valera Visionarias",
    description:
      "Compra, venta y alquiler cerca de la Universidad de Alicante. Escríbenos para una consulta gratuita.",
    url: "https://valeravisionarias.com/contacto",
    images: [{ url: "/og/cover.jpg" }],
  },
}

export default function ContactoPage() {
  return (
    <>
      {/* JSON-LD específico de la página (ContactPage) */}
      <Script id="contact-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto — Valera Visionarias",
          url: "https://valeravisionarias.com/contacto",
          mainEntity: {
            "@type": "RealEstateAgent",
            name: "Valera Visionarias",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Villafranqueza 50, local 1",
              addressLocality: "San Vicente del Raspeig",
              addressRegion: "Alicante",
              postalCode: "03690",
              addressCountry: "ES",
            },
            telephone: "+34645680339",
            email: "Valeravisionarias@gmail.com",
            areaServed: "San Vicente del Raspeig, Alicante",
          },
        })}
      </Script>

      <section className="relative overflow-hidden">
        {/* Hero simple */}
        <div className="relative h-[280px] sm:h-[360px]">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Arquitectura en San Vicente del Raspeig"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <h1 className="font-playfair text-white text-4xl sm:text-5xl font-light">Contacto</h1>
          </div>
        </div>

        {/* Contenido */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Datos de contacto + mapa */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">Escríbenos</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-black mb-4">
                Comencemos tu proyecto inmobiliario
              </h2>
              <p className="text-stone-700 mb-8">
                Completa el formulario y te responderemos en menos de 24 horas. También puedes llamarnos o
                escribirnos por email.
              </p>

              <ul className="space-y-4 text-sm">
                <li>
                  <strong>Teléfono:</strong>{" "}
                  <a className="underline" href="tel:+34645680339">
                    645 68 03 39
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a className="underline break-all" href="mailto:Valeravisionarias@gmail.com">
                    Valeravisionarias@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Dirección:</strong> Villafranqueza 50, local 1 — 03690, San Vicente del Raspeig (Alicante)
                </li>
              </ul>

              {/* --- Horario detallado --- */}
              <div className="mt-8 text-sm text-stone-700 leading-relaxed">
                <h3 className="font-semibold mb-2 text-black">Horario</h3>
                <ul className="space-y-1 text-stone-600">
                  <li>Lunes: 9:00–14:00, 16:00–19:00</li>
                  <li>Martes: 9:00–14:00, 16:00–19:00</li>
                  <li>Miércoles: 9:00–14:00, 16:00–19:00</li>
                  <li>Jueves: 9:00–14:00, 16:00–19:00</li>
                  <li>Viernes: 9:00–14:00, 16:00–19:00</li>
                  <li>Sábado: 9:00–14:00</li>
                  <li>Domingo: Cerrado</li>
                </ul>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-stone-200">
                <iframe
                  title="Ubicación Valera Visionarias"
                  className="w-full h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Villafranqueza+50,+03690+San+Vicente+del+Raspeig,+Alicante&output=embed"
                />
              </div>
            </div>

            {/* Formulario */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
