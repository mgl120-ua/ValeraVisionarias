# Guía de traspaso: cómo gestionar tu web con Claude

Esta guía es para ti, la responsable de Valera Visionarias. No necesitas saber programar: Claude hace los cambios en la web y tú decides qué se publica.

## 1. Cómo funciona tu web, en pocas palabras

- El **código** de la web está guardado en **GitHub** (en el repositorio `ValeraVisionarias`).
- **Vercel** es el servicio que la pone en internet en www.valeravisionarias.com.
- Están conectados: **cuando un cambio se aprueba en GitHub, Vercel lo publica solo en un par de minutos.**
- Los **inmuebles** (pisos, precios, fotos, destacados) **no** se cambian con código: los gestionas tú desde el panel privado **www.valeravisionarias.com/admin**, con la contraseña de administración.

## 2. Accesos que necesitas (una sola vez)

Pide a la dueña actual de las cuentas (usuario de GitHub **mgl120-ua**) lo siguiente:

### GitHub
1. Crea una cuenta gratuita en https://github.com si no la tienes.
2. Envía tu nombre de usuario de GitHub a mgl120-ua y pídele que te invite como **colaboradora** del repositorio `ValeraVisionarias` (en GitHub: Settings → Collaborators → Add people). Lo ideal es que, cuando todo esté en orden, te **transfiera el repositorio** a tu cuenta para que sea tuyo.
3. Acepta la invitación que te llegará por email.

### Vercel
1. Crea una cuenta en https://vercel.com (puedes entrar con tu cuenta de GitHub).
2. Pide a mgl120-ua que te **transfiera el proyecto** de Vercel o te añada a su equipo. La transferencia es lo más recomendable: así el dominio, las estadísticas y las variables de configuración quedan a tu nombre.
3. Comprueba que el **dominio** valeravisionarias.com sigue apuntando al proyecto tras la transferencia.

### Otras cuentas que usa la web
Pregunta también quién tiene el acceso a estos servicios y pide que pasen a tu nombre (o que te den acceso):
- **Supabase**: donde se guardan los inmuebles y sus fotos.
- **Resend**: el servicio que te envía por email los formularios de la web.
- **Google Cloud**: la clave que muestra tus reseñas de Google en la portada.
- La **contraseña del panel /admin**. Te conviene cambiarla en cuanto la recibas (en Vercel → Settings → Environment Variables → `ADMIN_PASSWORD`, y después volver a publicar).

> Nunca pegues contraseñas ni claves en el chat con Claude ni las envíes por WhatsApp o email sin necesidad.

## 3. Conectar Claude a tu web

1. Entra en https://claude.ai con tu cuenta (necesitas un plan que incluya **Claude Code**).
2. Ve a **Claude Code** (claude.ai/code) y conecta tu cuenta de GitHub cuando te lo pida.
3. Elige el repositorio **ValeraVisionarias**.
4. Listo: Claude leerá automáticamente el archivo `CLAUDE.md` del repositorio, que le explica cómo es la web, los colores, la tipografía, los datos de contacto correctos y las reglas que debe respetar.

## 4. Cómo pedir cambios de forma segura

1. **Pide el cambio con tus palabras.** Por ejemplo:
   - "Cambia el horario de los sábados a 10:00–14:00."
   - "Añade una pregunta frecuente sobre cuánto cuesta vender un piso."
   - "Pon una foto nueva en la sección Nosotros" (y adjunta la foto).
2. Claude prepara el cambio en una **copia aparte** (un "Pull Request"); **la web real no cambia todavía**.
3. Claude te dará un **enlace de vista previa** de Vercel. Ábrelo en el móvil y en el ordenador y comprueba que todo está bien.
4. Si quieres retoques, díselo y Claude los aplica en la misma copia.
5. Cuando esté perfecto, dile **"publícalo"** (o pulsa "Merge" en GitHub). En un par de minutos estará en la web real.

### Reglas de oro
- **Revisa siempre la vista previa antes de publicar.**
- Pide **un cambio cada vez**; es más fácil revisar y deshacer.
- **Solo información real.** No publiques cifras de ventas, plazos o valoraciones que no puedas demostrar (por ejemplo "vendemos en 21 días"). Claude ya tiene esta regla, pero tú tienes la última palabra.
- Si cambias **teléfono, dirección u horario**, actualízalos también en tu **ficha de Google (Google Business Profile)** para que coincidan con la web.

## 5. Si algo sale mal

- **No te preocupes: todo se puede deshacer.** Dile a Claude: "El último cambio ha roto X, vuelve a la versión anterior".
- También puedes hacerlo tú en Vercel: *Deployments* → elige la versión anterior que funcionaba → *Promote to Production*.

## 6. Tareas pendientes para tener la web al 100 %

- [ ] Configurar en Vercel `GOOGLE_MAPS_API_KEY` y `GOOGLE_PLACE_ID` para que las reseñas de Google se muestren en directo.
- [ ] Dar de alta la web en **Google Search Console**.
- [ ] Actualizar la **ficha de Google** con la dirección (Avenida Ancha de Castelar 46-48) y el teléfono (617 31 45 84) de la web.
- [ ] Facilitar la **razón social y el NIF** de la empresa para completar la política de privacidad y la de cookies.
