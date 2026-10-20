"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cuánto tiempo tardan en venderse las propiedades?",
      answer:
        "El 80% de nuestras ventas se cierran en menos de una semana, muchas en menos de 48 horas. El 20% restante, siempre al precio estipulado, no tarda más de tres meses. Trabajamos con estrategias de marketing efectivas y una red consolidada de clientes.",
    },
    {
      question: "¿Qué zonas de San Vicente del Raspeig recomiendan?",
      answer:
        "Las zonas más demandadas son las cercanas a la Universidad de Alicante (ideal para inversores en alquiler estudiantil), el centro urbano con todos los servicios, y las urbanizaciones residenciales más tranquilas del término municipal. Cada zona tiene ventajas según tu perfil: familia, estudiante o inversor.",
    },
    {
      question: "¿Qué rentabilidad puedo esperar del alquiler en San Vicente?",
      answer:
        "La rentabilidad media en San Vicente del Raspeig ronda el 5-7% anual, especialmente en propiedades cercanas a la Universidad de Alicante. El alquiler estudiantil tiene alta demanda todo el año, lo que reduce los períodos de vacío y maximiza los ingresos.",
    },
    {
      question: "¿Cuáles son los gastos de compraventa que debo considerar?",
      answer:
        "En la compra, en la Comunitat Valenciana: ITP en segunda mano (tipo general del 9 % desde junio de 2026, con tipos reducidos para algunos perfiles) o IVA del 10 % + AJD en obra nueva, además de notaría, registro y gestoría. En la venta: plusvalía municipal e IRPF si hay ganancia patrimonial. Los tipos dependen de la fecha de la escritura y de tu situación, así que confírmalos con tu notaría o asesor; nosotros te acompañamos en todo el proceso para que no haya sorpresas.",
    },
  ]

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Preguntas frecuentes</p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-black mb-4 sm:mb-6 leading-tight">
              Resolvemos tus dudas
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Las preguntas más comunes sobre compraventa y alquiler en San Vicente del Raspeig.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-stone-200 bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-stone-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-playfair text-base sm:text-lg font-semibold text-black pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-black flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`transition-all duration-300 ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
