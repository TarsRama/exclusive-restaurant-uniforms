import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const COOKIE = "atelier_admin";
function secret() { return new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-change-this-secret"); }
export async function createSession() { return new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret()); }
export async function isAuthenticated() { const token = (await cookies()).get(COOKIE)?.value; if (!token) return false; try { await jwtVerify(token, secret()); return true; } catch { return false; } }
export const sessionCookie = COOKIE;
