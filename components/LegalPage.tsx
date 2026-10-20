import type { ReactNode } from "react"

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">Información legal</p>
        <h1 className="page-title text-black">{title}</h1>
        <p className="mt-4 text-sm text-stone-500">Última actualización: {updated}</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-stone-700 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-black [&_a]:underline [&_a:hover]:text-black [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </div>
  )
}
