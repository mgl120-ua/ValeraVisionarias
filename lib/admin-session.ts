// Sesión de administración firmada con HMAC (Web Crypto: funciona en Edge y Node).
// El valor de la cookie es "<expiración>.<firma>", así no se puede falsificar a mano.

export const ADMIN_COOKIE = "admin-session"
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 // 24 horas

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, "0")).join("")
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createAdminSessionToken() {
  const secret = getSecret()
  if (!secret) throw new Error("ADMIN_PASSWORD no configurada")
  const expires = String(Date.now() + ADMIN_SESSION_MAX_AGE * 1000)
  return `${expires}.${await hmac(expires, secret)}`
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  const secret = getSecret()
  if (!secret || !token) return false
  const [expires, signature] = token.split(".")
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return safeEqual(signature, await hmac(expires, secret))
}

/** Comprueba la cookie de sesión en un Route Handler. */
export async function isAdminRequest() {
  const { cookies } = await import("next/headers")
  return verifyAdminSessionToken(cookies().get(ADMIN_COOKIE)?.value)
}

export function isPasswordValid(password: unknown) {
  const expected = process.env.ADMIN_PASSWORD
  return Boolean(expected) && typeof password === "string" && safeEqual(password, expected as string)
}
