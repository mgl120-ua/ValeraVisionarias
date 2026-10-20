"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cuánto tiempo tardan en venderse las propiedades?",
      answer:
        "Depende sobre todo del precio, el estado de la vivienda y la zona. Una vivienda con un precio ajustado al mercado y bien presentada se vende antes, por eso empezamos con una valoración realista y preparamos el anuncio, las visitas y la negociación para que no pierdas meses en el mercado.",
    },
    {
      question: "¿Qué zonas de San Vicente del Raspeig recomiendan?",
      answer:
        "Las zonas más demandadas son las cercanas a la Universidad de Alicante (ideal para inversores en alquiler estudiantil), el centro urbano con todos los servicios, y las urbanizaciones residenciales más tranquilas del término municipal. Cada zona tiene ventajas según tu perfil: familia, estudiante o inversor.",
    },
    {
      question: "¿Qué rentabilidad puedo esperar del alquiler en San Vicente?",
      answer:
        "Depende del precio de compra, de los gastos (comunidad, IBI, seguros, mantenimiento) y del tipo de alquiler. Las viviendas cercanas a la Universidad de Alicante tienen demanda de alquiler estudiantil. Puedes hacer una estimación con nuestra calculadora de rentabilidad y revisamos contigo el caso concreto.",
    },
    {
      question: "¿Cuáles son los gastos de compraventa que debo considerar?",
      answer:
        "En la compra, en la Comunitat Valenciana: ITP en segunda mano (tipo general del 9 % desde junio de 2026, con tipos reducidos para algunos perfiles) o IVA del 10 % + AJD en obra nueva, además de notaría, registro y gestoría. En la venta: plusvalía municipal e IRPF si hay ganancia patrimonial. Los tipos dependen de la fecha de la escritura y de tu situación, así que confírmalos con tu notaría o asesor; nosotros te acompañamos en todo el proceso para que no haya sorpresas.",
    },
  ]

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Preguntas frecuentes</p>
            <h2 className="section-title text-black">Resolvemos tus dudas</h2>
            <p className="mt-5 text-lg leading-[1.33] text-stone-600">
              Las preguntas más comunes sobre compraventa y alquiler en San Vicente del Raspeig.
            </p>
          </div>

          <div className="border-b border-black/10">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              return (
                <div key={index} className="border-t border-black/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-xl font-light leading-[1.25] tracking-[-0.02em] text-black sm:text-[23px]">
                      {faq.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={`mt-1 h-5 w-5 flex-shrink-0 text-black transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    aria-hidden={!open}
                    className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="max-w-2xl pb-6 text-base leading-[1.49] text-stone-600">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
