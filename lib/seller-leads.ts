"use client"

export type SellerPropertyType =
  | "piso"
  | "atico"
  | "chalet"
  | "adosado"
  | "duplex"
  | "loft"
  | "estudio"
  | "bungalow"
  | "local"
  | "otro"
  | ""

export interface SellerLeadPayload {
  contacto: string
  zona?: string
  tipo?: SellerPropertyType | string
  name?: string
  phone?: string
  email?: string
  message?: string
  source?: string
  timeline?: string
  reason?: string
  superficie?: string
  habitaciones?: string
  banos?: string
  estado?: string
  hp?: string
}

export type SellerTrackingEvent =
  | "lead_form_submit"
  | "whatsapp_click"
  | "cta_click"
  | "scroll_depth"

interface TrackingWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void
  fbq?: (...args: unknown[]) => void
}

const META_EVENT_NAMES: Partial<Record<SellerTrackingEvent, string>> = {
  lead_form_submit: "Lead",
  whatsapp_click: "Contact",
  cta_click: "Contact",
}

export const sellerExperiment = {
  heroVariant: "seller-focused-v1",
  primaryCta: "Quiero vender mi vivienda",
  secondaryCta: "Ver propiedades",
  heroTitle: "Vende tu vivienda en San Vicente",
  heroSubtitle: "con una estrategia que protege tu precio",
} as const

export function isValidSellerContact(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[0-9+()\-\s]{7,}$/
  return emailRegex.test(value) || phoneRegex.test(value)
}

export function getSellerWhatsAppMessage(context: "hero" | "sticky" | "contact" = "hero") {
  const messages = {
    hero: "Hola, quiero vender mi vivienda en San Vicente del Raspeig y me gustaría recibir una valoración orientativa sin compromiso.",
    sticky:
      "Hola, estoy pensando en vender mi vivienda en San Vicente del Raspeig. Quiero saber cuánto podría pedir y cómo trabajáis la venta.",
    contact:
      "Hola, quiero hablar con Valera Visionarias para valorar mi vivienda y revisar la mejor estrategia de venta.",
  }

  return messages[context]
}

export function trackSellerEvent(eventName: SellerTrackingEvent, payload: Record<string, unknown> = {}) {
  const eventPayload = {
    event: eventName,
    category: "seller_lead",
    timestamp: new Date().toISOString(),
    experiment_variant: sellerExperiment.heroVariant,
    ...payload,
  }

  if (typeof window !== "undefined") {
    const analyticsWindow = window as TrackingWindow

    analyticsWindow.dataLayer?.push(eventPayload)
    analyticsWindow.gtag?.("event", eventName, eventPayload)

    const metaEventName = META_EVENT_NAMES[eventName]
    if (metaEventName) {
      analyticsWindow.fbq?.("trackCustom", metaEventName, eventPayload)
    }
  }

  console.log("[seller-tracking]", eventPayload)
}

export function setupScrollDepthTracking() {
  if (typeof window === "undefined") return () => undefined

  const thresholds = [25, 50, 75, 100]
  const triggered = new Set<number>()

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const viewportHeight = window.innerHeight
    const fullHeight = document.documentElement.scrollHeight
    const depth = Math.min(100, Math.round(((scrollTop + viewportHeight) / fullHeight) * 100))

    thresholds.forEach((threshold) => {
      if (depth >= threshold && !triggered.has(threshold)) {
        triggered.add(threshold)
        trackSellerEvent("scroll_depth", { depth_percent: threshold })
      }
    })
  }

  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })

  return () => {
    window.removeEventListener("scroll", onScroll)
  }
}

export async function submitSellerLead(payload: SellerLeadPayload) {
  try {
    const response = await fetch("/api/valoraciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("request_failed")
    }

    return { ok: true as const, fallback: false as const }
  } catch (error) {
    console.log("[seller-lead:fallback]", payload, error)
    return { ok: true as const, fallback: true as const }
  }
}
