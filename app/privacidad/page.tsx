import type { Metadata } from "next"
import LegalPage from "@/components/LegalPage"
import { contactInfo } from "@/lib/contact-info"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Valera Visionarias los datos personales que nos facilitas a través de la web.",
  alternates: { canonical: "/privacidad" },
}

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="octubre de 2026">
      <section>
        <h2>Responsable del tratamiento</h2>
        <p>
          Valera Visionarias, con oficina en {contactInfo.fullAddress}. Puedes escribirnos a{" "}
          <a href={contactInfo.emailHref}>{contactInfo.email}</a> o llamarnos al{" "}
          <a href={contactInfo.phoneHref}>{contactInfo.phone}</a> para cualquier cuestión sobre tus datos.
        </p>
      </section>

      <section>
        <h2>Qué datos recogemos y para qué</h2>
        <p>Solo tratamos los datos que nos facilitas en los formularios de la web:</p>
        <ul>
          <li>
            <strong>Valoración de vivienda:</strong> datos de contacto y características de la vivienda, para preparar
            la valoración y comentarla contigo.
          </li>
          <li>
            <strong>Visitas y consultas sobre inmuebles:</strong> nombre, email, teléfono y fecha preferida, para
            organizar la visita o responder a tu consulta.
          </li>
          <li>
            <strong>Contacto general y programa de colaboradores:</strong> los datos que nos indiques, para responderte.
          </li>
        </ul>
        <p>No usamos estos datos para enviarte publicidad si no nos lo pides.</p>
      </section>

      <section>
        <h2>Base legal</h2>
        <p>
          Tratamos tus datos porque nos los envías para que te respondamos o te prestemos un servicio que solicitas
          (aplicación de medidas precontractuales a petición del interesado, art. 6.1.b del RGPD) y, en su caso, con tu
          consentimiento.
        </p>
      </section>

      <section>
        <h2>Cuánto tiempo los conservamos</h2>
        <p>
          Mientras gestionamos tu solicitud y, después, durante los plazos necesarios para atender posibles
          responsabilidades legales. Si no llegamos a colaborar, puedes pedirnos que los borremos en cualquier momento.
        </p>
      </section>

      <section>
        <h2>Con quién se comparten</h2>
        <p>
          No cedemos tus datos a terceros salvo obligación legal. Para que la web funcione utilizamos proveedores
          tecnológicos (alojamiento web y envío de correo electrónico) que solo acceden a ellos para prestarnos ese
          servicio.
        </p>
      </section>

      <section>
        <h2>Tus derechos</h2>
        <p>
          Puedes acceder, rectificar o suprimir tus datos, oponerte a su tratamiento, limitarlo o pedir su portabilidad
          escribiendo a <a href={contactInfo.emailHref}>{contactInfo.email}</a>. Si consideras que no hemos atendido
          correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </section>
    </LegalPage>
  )
}
