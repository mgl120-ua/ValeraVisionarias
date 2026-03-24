"use client"

import { MessageCircle } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"
import { getSellerWhatsAppMessage, trackSellerEvent } from "@/lib/seller-leads"

export default function SellerStickyBar() {
  const whatsappHref = `${contactInfo.whatsappHref}?text=${encodeURIComponent(getSellerWhatsAppMessage("sticky"))}`

  const scrollToForm = () => {
    trackSellerEvent("cta_click", { placement: "sticky-bar", target: "seller-contact-form" })
    document.getElementById("seller-contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <button
          type="button"
          onClick={scrollToForm}
          className="flex-1 rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800 active:translate-y-0"
        >
          Valorar mi vivienda
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSellerEvent("whatsapp_click", { placement: "sticky-bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:border-black active:translate-y-0"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
