// Dominio canónico único para metadatos, sitemap y datos estructurados.
export const SITE_URL = "https://www.valeravisionarias.com"

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString()
