// app/propiedad/[id]/page.tsx
import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();
  const { data } = await supabase
    .from("properties")
    .select("title, city, description, price, category, property_images(url, position)")
    .eq("id", params.id)
    .single();

  if (!data) return { title: "Propiedad | Valera Visionarias" };

  const cover =
    (data.property_images ?? [])
      .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))[0]?.url;

  const title = `${data.title} · ${formatEUR(Number(data.price))}${data.category === "alquiler" ? " / mes" : ""} | Valera Visionarias`;

  return {
    title,
    description: data.description?.slice(0, 155) ?? "",
    openGraph: {
      title,
      images: cover ? [cover] : [],
    },
  };
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
    .eq("id", params.id)
    .single();

  if (error || !p) notFound();
  const prop = p as Property;

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

  // JSON-LD RealEstateListing (mejora SEO + enriquecimiento)
  // JSON-LD RealEstateListing + Offer + Place + Agent
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: prop.title,
  description: prop.description,
  url: `https://www.valeravisionarias.com/propiedad/${prop.id}`,
  datePosted: prop.created_at,
  image: imageUrls.length
    ? imageUrls.map((u) => `https://www.valeravisionarias.com${u}`)
    : ["https://www.valeravisionarias.com/images/logo-dark.png"],
  address: {
    "@type": "PostalAddress",
    streetAddress: prop.address ?? "",
    addressLocality: prop.city ?? "San Vicente del Raspeig",
    postalCode: prop.postal_code ?? "03690",
    addressRegion: "Alicante",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.3936,
    longitude: -0.5247,
  },
  offers: {
    "@type": "Offer",
    price: Number(prop.price),
    priceCurrency: "EUR",
    availability:
      prop.status === "activo"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    url: `https://www.valeravisionarias.com/propiedad/${prop.id}`,
    itemOffered: {
      "@type": "House",
      name: prop.title,
      numberOfRoomsTotal: Number(prop.bedrooms),
      numberOfBathroomsTotal: Number(prop.bathrooms),
      floorSize: {
        "@type": "QuantitativeValue",
        value: prop.size,
        unitCode: "MTK",
      },
      category: prop.category === "alquiler" ? "for rent" : "for sale",
    },
    seller: {
      "@type": "RealEstateAgent",
      name: "Valera Visionarias",
      url: "https://www.valeravisionarias.com",
      telephone: "+34645680339",
      logo: "https://www.valeravisionarias.com/images/logo-dark.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Villafranqueza 50, local 1",
        addressLocality: "San Vicente del Raspeig",
        addressRegion: "Alicante",
        postalCode: "03690",
        addressCountry: "ES",
      },
    },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Superficie", value: `${prop.size} m²` },
    { "@type": "PropertyValue", name: "Dormitorios", value: prop.bedrooms },
    { "@type": "PropertyValue", name: "Baños", value: prop.bathrooms },
    { "@type": "PropertyValue", name: "Categoría", value: prop.category },
  ],
}


  return (
    <main className="container mx-auto px-4 py-6">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb / back */}
      <div className="mb-4 flex items-center justify-between gap-4 flex-wrap text-sm">
        <div className="flex items-center gap-2">
          <Link href="/propiedades" className="text-stone-600 hover:underline">Propiedades</Link>
          <span className="text-stone-400">/</span>
          <span className="text-stone-800 truncate max-w-[70vw]">{prop.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9" asChild>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Estoy interesado/a en ${prop.title} - https://valeravisionarias.com/propiedad/${prop.id}`)}`} target="_blank" rel="noopener noreferrer">
              <Share2 className="w-4 h-4 mr-2" /> Compartir
            </a>
          </Button>
        </div>
      </div>

      {/* Hero: galería + panel sticky (desktop) */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PropertyGallery images={imageUrls} />
        </div>

        {/* Panel sticky con CTA (inspirado en layouts con lateral fijo) */}
        <aside className="lg:sticky lg:top-6 h-fit space-y-4">
          <Card className="border-stone-200">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl font-semibold leading-none">
                    {formatEUR(Number(prop.price))}{prop.category === "alquiler" && <span className="text-sm text-stone-600"> / mes</span>}
                  </div>
                  <div className="mt-1 text-stone-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {[prop.address, prop.city].filter(Boolean).join(", ")}
                  </div>
                </div>
                <div className="flex gap-1">
                  {prop.category && (
                    <Badge variant="secondary" className={prop.category === "venta" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                      {prop.category === "venta" ? "Venta" : "Alquiler"}
                    </Badge>
                  )}
                  {prop.featured && <Badge className="bg-black text-white">Destacada</Badge>}
                </div>
              </div>

              {/* key facts */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded bg-stone-50 p-3">
                  <Bed className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.bedrooms} hab</div>
                </div>
                <div className="rounded bg-stone-50 p-3">
                  <Bath className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.bathrooms} baños</div>
                </div>
                <div className="rounded bg-stone-50 p-3">
                  <Ruler className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">{prop.size} m²</div>
                </div>
              </div>

              {/* CTA primaria */}
              <Button className="w-full bg-black text-white h-11" asChild>
                <a href={`/contacto`}>
                  <CalendarDays className="w-4 h-4 mr-2" /> Solicitar información / visita
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
      <div className="fixed bottom-0 inset-x-0 z-20 border-t bg-white p-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold leading-none">{formatEUR(Number(prop.price))}{prop.category === "alquiler" && <span className="text-xs text-stone-600"> / mes</span>}</div>
            <div className="text-xs text-stone-500">{prop.size} m² · {prop.bedrooms} hab · {prop.bathrooms} baños</div>
          </div>
          <Button className="bg-black text-white h-10" asChild>
            <a href={`/colabora?ref=${encodeURIComponent(prop.id)}&title=${encodeURIComponent(prop.title)}`}>Contactar</a>
          </Button>
        </div>
      </div>

      {/* Sección descripción + características + mapa */}
      <section className="mt-10 grid lg:grid-cols-3 gap-8">
        {/* Descripción */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-stone-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-3">Descripción</h2>
              <p className="text-stone-700 leading-relaxed whitespace-pre-line">{prop.description}</p>
            </CardContent>
          </Card>

          {/* Mapa / entorno 
          <Card className="border-stone-200">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-lg font-medium">Ubicación y entorno</h3>
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
        <aside className="space-y-6">

          {/* Mini “cómo concertar visita” */}
          <Card className="border-stone-200">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">¿Te interesa?</h3>
              <p className="text-sm text-stone-600">Selecciona una fecha y solicita tu visita.</p>
              <VisitForm propiedad={prop.title} propiedadUrl={`https://valeravisionarias.com/propiedad/${prop.id}`} />
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* Similares */}
      {related && related.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">También podría interesarte</h2>
            <Link href="/propiedades" className="text-sm underline underline-offset-2">Ver todas</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r: any) => {
              const cover = (r.property_images ?? [])
                .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))[0]?.url;
              return (
                <article key={r.id} className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                  <div className="relative aspect-[16/10] bg-stone-100">
                    {cover ? (
                      <img src={cover} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-stone-400 text-sm">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-medium">{r.title}</h3>
                      {r.featured && (
                        <span className="text-[10px] uppercase tracking-wide bg-black text-white px-2 py-1">Destacada</span>
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
                        href={`/propiedad/${r.id}`}
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
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-stone-200 p-3">
      <p className="text-[11px] uppercase tracking-wide text-stone-500">{label}</p>
      <p className="text-stone-900 mt-0.5">{value}</p>
    </div>
  );
}
