export default function Loading() {
  return (
    <main className="mx-auto max-w-page px-4 py-16">
      <div className="h-6 w-48 bg-stone-200 rounded mb-6" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-black/[0.08] bg-white">
            <div className="h-56 sm:h-64 lg:h-80 bg-stone-200" />
            <div className="p-5">
              <div className="h-5 w-40 bg-stone-200 rounded mb-3" />
              <div className="h-4 w-24 bg-stone-200 rounded mb-4" />
              <div className="h-4 w-full bg-stone-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
