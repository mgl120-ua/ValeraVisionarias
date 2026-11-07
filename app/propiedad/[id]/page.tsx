// app/propiedad/[id]/page.tsx
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import PropertyGallery from "@/components/PropertyGallery";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin, Bed, Bath, Ruler, Share2, Heart, CalendarDays, Award, Home, Shield
} from "lucide-react";
import type { Metadata } from "next"
import VisitForm from "@/components/VisitForm"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { breadcrumbJsonLd, pageMetadata, propertyIdFromParam, propertyPath } from "@/lib/seo"


// Opcional: ISR
export const revalidate = 60;

type PropertyImage = { id: string; url: string; position: number | null };
type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  category: "venta" | "alquiler" | null;
  status: "activo" | "inactivo" | null;
  featured: boolean | null;
  created_at: string;
  property_images?: PropertyImage[];
};

const formatEUR = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

// Descripción para buscadores: datos clave primero y el texto del anuncio cortado sin partir palabras
function buildDescription(d: { title: string; city: string | null; description: string | null; category: string | null; size?: number | null; bedrooms?: number | null }) {
  const operacion = d.category === "alquiler" ? "en alquiler" : "en venta";
  const datos = [d.bedrooms ? `${d.bedrooms} hab.` : null, d.size ? `${d.size} m²` : null].filter(Boolean).join(", ");
  const base = `${d.title} ${operacion} en ${d.city || "San Vicente del Raspeig"}${datos ? ` (${datos})` : ""}.`;
  const resto = (d.description ?? "").replace(/\s+/g, " ").trim();
  const full = resto ? `${base} ${resto}` : base;
  if (full.length <= 158) return full;
  return full.slice(0, 155).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = propertyIdFromParam(params.id);
  const supabase = createSupabaseServer();
  const { data } = await supabase
    .from("properties")
    .select("id, title, city, description, price, category, size, bedrooms, status, property_images(url, position)")
    .eq("id", id)
    .single();

  if (!data) return { title: "Propiedad no encontrada", robots: { index: false } };

  // La redirección se hace aquí y no solo en la página: los metadatos se resuelven antes de enviar
  // la respuesta, así que da un 308 real. En la página, por el loading.tsx, ya se ha empezado a enviar
  // el HTML y Next.js solo puede usar un meta refresh.
  const canonicalPath = propertyPath(data);
  if (`/propiedad/${params.id}` !== canonicalPath) permanentRedirect(canonicalPath);

  const cover =
    (data.property_images ?? [])
      .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))[0]?.url;

  const title = `${data.title} · ${formatEUR(Number(data.price))}${data.category === "alquiler" ? " / mes" : ""} | Valera Visionarias`;

  const meta = pageMetadata({
    // absolute: el título ya incluye la marca y no debe repetirse con la plantilla del layout
    title,
    absoluteTitle: true,
    description: buildDescription(data),
    path: canonicalPath,
    images: cover ? [{ url: cover, alt: data.title }] : undefined,
  });

  // Fichas retiradas: siguen accesibles por enlace, pero fuera del índice de Google
  if (data.status !== "activo") meta.robots = { index: false, follow: true };

  return meta;
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();

  // FICHA
  const { data: p, error } = await supabase
    .from("properties")
    .select(`
      id, title, description, price, size, bedrooms, bathrooms,
      address, city, postal_code, category, status, featured, created_at,
      property_images ( id, url, position )
    `)
    .eq("id", propertyIdFromParam(params.id))
    .single();

  if (error || !p) notFound();
  const prop = p as Property;

  // Una sola URL por ficha: /propiedad/<titulo>-<id>. Las antiguas (/propiedad/<id>) redirigen con 308.
  const canonicalPath = propertyPath(prop);
  if (`/propiedad/${params.id}` !== canonicalPath) permanentRedirect(canonicalPath);

  // Galería ordenada
  const images = (prop.property_images ?? []).sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const imageUrls = images.map((i) => i.url);

  // Propiedades similares (misma ciudad o misma categoría)
  const similarQuery = supabase
    .from("properties")
    .select(`
      id, title, price, size, bedrooms, bathrooms, city, category, featured, created_at,
      property_images ( url, position )
    `)
    .eq("status", "activo")
    .neq("id", prop.id)
    .or(`city.eq.${prop.city ?? ""},category.eq.${prop.category ?? ""}`)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: related } = await similarQuery;

  // Mapa (embed público sin API key)
  const mapQuery = encodeURIComponent([prop.address, prop.city].filter(Boolean).join(", "));
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  // JSON-LD RealEstateListing + Offer + BreadcrumbList
  const pageUrl = absoluteUrl(canonicalPath)
  const toAbsolute = (u: string) => (u.startsWith("http") ? u : absoluteUrl(u))
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: prop.title,
      description: prop.description,
      url: pageUrl,
      datePosted: prop.created_at,
      image: imageUrls.length ? imageUrls.map(toAbsolute) : [absoluteUrl("/images/logo-dark.png")],
      offers: {
        "@type": "Offer",
        price: Number(prop.price),
        priceCurrency: "EUR",
        availability: prop.status === "activo" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        url: pageUrl,
        businessFunction:
          prop.category === "alquiler" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        seller: { "@id": `${SITE_URL}/#organization` },
        itemOffered: {
          "@type": "Accommodation",
          name: prop.title,
          numberOfBedrooms: Number(prop.bedrooms),
          numberOfBathroomsTotal: Number(prop.bathrooms),
          floorSize: { "@type": "QuantitativeValue", value: prop.size, unitCode: "MTK" },
          address: {
            "@type": "PostalAddress",
            ...(prop.address ? { streetAddress: prop.address } : {}),
            addressLocality: prop.city ?? "San Vicente del Raspeig",
            ...(prop.postal_code ? { postalCode: prop.postal_code } : {}),
            addressRegion: "Alicante",
            addressCountry: "ES",
          },
        },
      },
    },
    breadcrumbJsonLd([
      { name: "Propiedades", path: "/propiedades" },
      { name: prop.title, path: canonicalPath },
    ]),
  ]

  return (
    <div className="mx-auto max-w-page px-4 py-8 pb-28 sm:px-6 lg:px-10 lg:pb-24">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb / back */}
      <div className="mb-4 flex items-center justify-between gap-4 flex-wrap text-sm">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-2">
          <Link href="/propiedades" className="text-stone-600 hover:underline">Propiedades</Link>
          <span className="text-stone-400" aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-800 truncate max-w-[70vw]">{prop.title}</span>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9" asChild>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Estoy interesado/a en ${prop.title} - ${pageUrl}`)}`} target="_blank" rel="noopener noreferrer">
              <Share2 className="w-4 h-4 mr-2" /> Compartir
            </a>
          </Button>
        </div>
      </div>

      <h1 className="mb-6 font-display text-3xl font-light leading-[1.02] tracking-[-0.04em] text-black sm:text-4xl md:text-5xl">
        {prop.title}
      </h1>

      {/* Hero: galería + panel sticky (desktop) */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <PropertyGallery images={imageUrls} title={prop.title} />
        </div>

        {/* Panel sticky con CTA (inspirado en layouts con lateral fijo) */}
        <aside className="min-w-0 lg:sticky lg:top-24 h-fit space-y-4">
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[30px] font-light leading-none tracking-[-0.03em]">
                    {formatEUR(Number(prop.price))}{prop.category === "alquiler" && <span className="text-sm text-stone-600"> / mes</span>}
                  </div>
                  <div className="mt-1 text-stone-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {[prop.address, prop.city].filter(Boolean).join(", ")}
                  </div>
                </div>
                <div className="flex gap-1">
                  {prop.category && (
                    <Badge variant="secondary" className={prop.category === "venta" ? "rounded-3xl bg-stone-100 text-black" : "rounded-3xl bg-stone-200 text-black"}>
                      {prop.category === "venta" ? "Venta" : "Alquiler"}
                    </Badge>
                  )}
                  {prop.featured && <Badge className="rounded-3xl bg-black text-white">Destacada</Badge>}
                </div>
              </div>

              {/* key facts */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-stone-100 p-3">
                  <Bed className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.bedrooms} hab</div>
                </div>
                <div className="rounded-xl bg-stone-100 p-3">
                  <Bath className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.bathrooms} baños</div>
                </div>
                <div className="rounded-xl bg-stone-100 p-3">
                  <Ruler className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.size} m²</div>
                </div>
              </div>

              {/* CTA primaria */}
              <Button className="w-full bg-black text-white h-12 hover:bg-stone-800" asChild>
                <a href="#solicitar-visita">
                  <CalendarDays className="w-4 h-4 mr-2" aria-hidden="true" /> Solicitar información / visita
                </a>
              </Button>

              <p className="text-[11px] text-stone-500 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Respuesta en menos de 24h.
              </p>
            </CardContent>
          </Card>

        </aside>
      </section>

      {/* Barra pegajosa móvil */}
      <div className="fixed bottom-0 inset-x-0 z-20 border-t border-black/[0.08] bg-stone-50/95 backdrop-blur-md p-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-light tracking-[-0.02em] leading-none">{formatEUR(Number(prop.price))}{prop.category === "alquiler" && <span className="text-xs text-stone-600"> / mes</span>}</div>
            <div className="text-xs text-stone-500">{prop.size} m² · {prop.bedrooms} hab · {prop.bathrooms} baños</div>
          </div>
          <Button className="bg-black text-white h-10" asChild>
            <a href="#solicitar-visita">Solicitar visita</a>
          </Button>
        </div>
      </div>

      {/* Sección descripción + características + mapa */}
      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Descripción */}
        <div className="min-w-0 lg:col-span-2 space-y-8">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-light tracking-[-0.03em] mb-4">Descripción</h2>
              <p className="text-stone-700 leading-relaxed whitespace-pre-line">{prop.description}</p>
            </CardContent>
          </Card>

          {/* Mapa / entorno 
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-2xl font-light tracking-[-0.03em]">Ubicación y entorno</h3>
                <p className="text-sm text-stone-600 mt-1">
                  Consulta transporte, servicios y colegios cercanos en el mapa interactivo.
                </p>
              </div>
              <div className="aspect-[16/10] w-full">
                <iframe
                  src={mapSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 text-right">
                <a
                  className="text-sm underline underline-offset-2"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </CardContent>
          </Card>*/}
        </div>

        {/* Especificaciones / “Key facts” ampliados */}
        <aside className="min-w-0 space-y-6">

          {/* Mini “cómo concertar visita” */}
          <Card id="solicitar-visita" className="rounded-2xl scroll-mt-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-light tracking-[-0.03em]">¿Te interesa?</h2>
              <p className="text-sm text-stone-600">Selecciona una fecha y solicita tu visita.</p>
              <VisitForm propiedad={prop.title} propiedadUrl={`${pageUrl}`} />
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* Similares */}
      {related && related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title !text-[2rem] sm:!text-[2.5rem]">También podría interesarte</h2>
            <Link href="/propiedades" className="text-sm underline underline-offset-2">Ver todas</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r: any) => {
              const cover = (r.property_images ?? [])
                .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))[0]?.url;
              return (
                <article key={r.id} className="rounded-xl border border-black/[0.06] bg-white overflow-hidden shadow-subtle">
                  <div className="relative aspect-[16/10] bg-stone-100">
                    {cover ? (
                      <img src={cover} alt={`${r.title} en ${r.city || "San Vicente del Raspeig"}`} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-stone-400 text-sm">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-medium">{r.title}</h3>
                      {r.featured && (
                        <span className="text-[10px] uppercase tracking-wide rounded-3xl bg-black text-white px-2 py-1">Destacada</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{r.city}</p>
                    <div className="mt-2 text-sm text-stone-700 flex flex-wrap gap-3">
                      <span className="font-semibold">{formatEUR(Number(r.price))}{r.category === "alquiler" && " / mes"}</span>
                      <span>· {r.size} m²</span>
                      <span>· {r.bedrooms} hab</span>
                      <span>· {r.bathrooms} baños</span>
                    </div>
                    <div className="mt-3">
                      <Link
                        href={propertyPath(r)}
                        className="inline-flex items-center text-sm underline underline-offset-2"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-black/[0.08] p-3">
      <p className="text-[11px] uppercase tracking-wide text-stone-500">{label}</p>
      <p className="text-stone-900 mt-0.5">{value}</p>
    </div>
  );
}
