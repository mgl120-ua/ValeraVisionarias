import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import dynamic from "next/dynamic"
import { contactInfo, openingHoursSpecification } from "@/lib/contact-info"

const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false })

export const metadata: Metadata = {
  title: "Contacto - Valera Visionarias",
  description:
    "Habla con Valera Visionarias por telefono, email o WhatsApp. Estamos en San Vicente del Raspeig, Alicante.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto - Valera Visionarias",
    description:
      "Compra, venta y alquiler cerca de la Universidad de Alicante. Escribenos para una consulta gratuita.",
    url: "https://valeravisionarias.com/contacto",
    images: [{ url: "/og/cover.jpg" }],
  },
}

export default function ContactoPage() {
  return (
    <>
      <Script id="contact-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto - Valera Visionarias",
          url: "https://valeravisionarias.com/contacto",
          mainEntity: {
            "@type": "RealEstateAgent",
            name: "Valera Visionarias",
            address: {
              "@type": "PostalAddress",
              streetAddress: contactInfo.addressLine1,
              addressLocality: "San Vicente del Raspeig",
              addressRegion: "Alicante",
              postalCode: contactInfo.postalCode,
              addressCountry: "ES",
            },
            telephone: contactInfo.phoneE164,
            email: contactInfo.email,
            areaServed: "San Vicente del Raspeig, Alicante",
            openingHoursSpecification,
            sameAs: [
              contactInfo.socialLinks.instagram,
              contactInfo.socialLinks.tiktok,
              contactInfo.socialLinks.idealista,
            ],
          },
        })}
      </Script>

      <section className="relative overflow-hidden">
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
          <div className="relative z-10 flex h-full items-center justify-center">
            <h1 className="font-playfair text-4xl font-light text-white sm:text-5xl">Contacto</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">Escribenos</p>
              <h2 className="mb-4 font-playfair text-3xl font-light text-black sm:text-4xl">
                Comencemos tu proyecto inmobiliario
              </h2>
              <p className="mb-8 text-stone-700">
                Completa el formulario y te responderemos en menos de 24 horas. Tambien puedes llamarnos, escribirnos
                por email o contactar por WhatsApp.
              </p>

              <ul className="space-y-4 text-sm text-stone-800">
                <li>
                  <strong>Telefono:</strong>{" "}
                  <a className="underline" href={contactInfo.phoneHref}>
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a className="break-all underline" href={contactInfo.emailHref}>
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  <strong>Direccion:</strong> {contactInfo.fullAddress}
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a className="underline" href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
                    Contacto directo
                  </a>
                </li>
                <li>
                  <strong>Redes:</strong>{" "}
                  <a className="underline" href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>{" "}
                  ·{" "}
                  <a className="underline" href={contactInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                    TikTok
                  </a>{" "}
                  ·{" "}
                  <a className="underline" href={contactInfo.socialLinks.idealista} target="_blank" rel="noopener noreferrer">
                    Idealista
                  </a>
                </li>
              </ul>

              <div className="mt-8 text-sm leading-relaxed text-stone-700">
                <h3 className="mb-2 font-semibold text-black">Horario</h3>
                <ul className="space-y-1 text-stone-600">
                  <li>Lunes a viernes: 9:00-20:00</li>
                  <li>Sabado: 9:00-14:00</li>
                  <li>Domingo: Cerrado</li>
                  <li>Atencion personal solo con cita previa</li>
                </ul>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-stone-200">
                <iframe
                  title="Ubicacion Valera Visionarias"
                  className="h-[280px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${contactInfo.mapsEmbedQuery}&output=embed`}
                />
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
