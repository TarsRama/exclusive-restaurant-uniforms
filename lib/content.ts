import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/db/schema";

export const defaultContent = {
  brand: "ATELIER SERVICE", email: "studio@example.com", eyebrow: "Uniforms for remarkable hospitality",
  heroTitle: "Dress the experience.", heroIntro: "Bespoke restaurant uniforms that translate your identity into every gesture, every service, every detail.",
  heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1500&q=85",
  statementTitle: "Your team is the face of your restaurant.", statementBody: "We create uniforms with the same care you bring to your menu: considered materials, precise construction, and a point of view guests remember.",
};
export type SiteContent = typeof defaultContent;
export async function getContent(): Promise<SiteContent> {
  if (!db) return defaultContent;
  try { const row = await db.select().from(siteContent).where(eq(siteContent.key, "website")).limit(1); return { ...defaultContent, ...((row[0]?.value as Partial<SiteContent>) ?? {}) }; }
  catch { return defaultContent; }
}
