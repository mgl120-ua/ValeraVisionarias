import { ArrowUpRight } from "lucide-react"
import { PROMOCION_PATH } from "@/lib/promocion"

// Enlace al dosier de la promoción. Se usa <a> (no <Link>) porque el dosier es
// un HTML estático fuera del router de Next.js.
export default function PromocionBanner({ className = "" }: { className?: string }) {
  return (
    <a
      href={PROMOCION_PATH}
      className={`group flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-stone-50 p-6 transition-colors hover:bg-stone-100 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}
    >
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-stone-500">Obra nueva</p>
        <p className="text-xl font-light tracking-[-0.02em] text-black sm:text-2xl">
          Residencial de 57 viviendas en San Vicente del Raspeig
        </p>
        <p className="mt-1 text-sm text-stone-600 sm:text-base">
          Esquina C/ Reyes Católicos con C/ Joaquín Blume. Consulta planos, calidades y ubicación.
        </p>
      </div>
      <span className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 text-[15px] text-white transition-colors group-hover:bg-stone-800">
        Ver el dosier
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </a>
  )
}
