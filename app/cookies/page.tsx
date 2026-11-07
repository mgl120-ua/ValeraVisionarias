import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import Link from "next/link"
import LegalPage from "@/components/LegalPage"

export const metadata: Metadata = pageMetadata({
  title: "Política de cookies",
  description: "Qué cookies y tecnologías de almacenamiento utiliza la web de Valera Visionarias.",
  path: "/cookies",
})

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="octubre de 2026">
      <section>
        <h2>Qué utilizamos</h2>
        <ul>
          <li>
            <strong>Almacenamiento técnico propio:</strong> guardamos en tu navegador si has aceptado o rechazado el aviso
            de cookies, para no volver a mostrártelo. Es necesario para el funcionamiento de la web.
          </li>
          <li>
            <strong>Mapas de Google:</strong> las páginas de contacto y de quiénes somos incluyen un mapa de Google Maps
            para mostrar la ubicación de la oficina. Google puede instalar sus propias cookies al cargarlo; puedes
            consultar su política en{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
              policies.google.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2>Cómo gestionarlas</h2>
        <p>
          Puedes borrar o bloquear las cookies desde la configuración de tu navegador. Si las bloqueas, algunos
          elementos como el mapa pueden no mostrarse correctamente.
        </p>
      </section>

      <section>
        <h2>Más información</h2>
        <p>
          Para saber cómo tratamos los datos que nos envías en los formularios, consulta la{" "}
          <Link href="/privacidad">política de privacidad</Link>.
        </p>
      </section>
    </LegalPage>
  )
}
