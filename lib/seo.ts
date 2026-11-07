import type { Metadata } from "next"
import { SITE_URL, absoluteUrl } from "@/lib/site"

const SITE_NAME = "Valera Visionarias"
const DEFAULT_OG_IMAGE = {
  url: "/images/hero-architecture.jpg",
  alt: "Valera Visionarias, inmobiliaria en San Vicente del Raspeig",
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  /** El título ya incluye la marca y no debe pasar por la plantilla "%s | Valera Visionarias" */
  absoluteTitle?: boolean
  ogTitle?: string
  ogDescription?: string
  images?: Array<{ url: string; alt?: string }>
  noindex?: boolean
}

/**
 * Metadatos completos de una página.
 * Next.js no fusiona openGraph entre layout y página: si una página define openGraph,
 * pierde la imagen, el siteName y el locale del layout. Este helper los repite siempre
 * y fija canonical y og:url a la propia página (no a la portada).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  ogTitle,
  ogDescription,
  images,
  noindex,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const ogImages = images && images.length ? images : [DEFAULT_OG_IMAGE]

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_ES",
      url: path,
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      images: ogImages.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

/** Migas de pan en JSON-LD. La portada se añade siempre como primer elemento. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  const all = [{ name: "Inicio", path: "/" }, ...items]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export const organizationRef = { "@id": `${SITE_URL}/#organization` }

/* ---------- URLs descriptivas de las fichas de inmuebles ---------- */

const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "")
}

/**
 * Ruta pública de una ficha: /propiedad/piso-3-habitaciones-centro-<uuid>.
 * Si el id no tiene formato UUID se usa tal cual, para no romper nada.
 */
export function propertyPath(p: { id: string | number; title?: string | null }) {
  const id = String(p.id)
  const slug = p.title ? slugify(p.title) : ""
  if (!slug || !UUID_RE.test(id)) return `/propiedad/${id}`
  return `/propiedad/${slug}-${id}`
}

/** Extrae el id de un parámetro que puede ser "<uuid>" o "<texto>-<uuid>". */
export function propertyIdFromParam(param: string) {
  let decoded = param
  try {
    decoded = decodeURIComponent(param)
  } catch {
    // parámetro mal codificado: se busca tal cual y acabará en 404
  }
  const match = decoded.match(UUID_RE)
  return match ? match[0] : decoded
}
