// app/propiedad/[id]/loading.tsx
export default function LoadingProperty() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-2/3 bg-stone-200 rounded" />
        <div className="aspect-[16/10] w-full bg-stone-200 rounded" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-48 bg-stone-200 rounded" />
          <div className="h-48 bg-stone-200 rounded" />
        </div>
      </div>
    </main>
  );
}
