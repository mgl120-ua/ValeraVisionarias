// app/propiedad/[id]/not-found.tsx
import Link from "next/link";

export default function NotFoundProperty() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold mb-3">Propiedad no encontrada</h1>
      <p className="text-stone-600 mb-6">Es posible que haya sido despublicada o no exista.</p>
      <Link href="/propiedades" className="inline-block underline underline-offset-2">
        ← Volver a propiedades
      </Link>
    </main>
  );
}
