import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, sections } from "@/db/schema";

export const sectionTypes = ["hero", "statement", "collection_grid", "process", "text", "gallery", "contact", "cta"] as const;
export type SectionType = (typeof sectionTypes)[number];

export const sectionLabels: Record<SectionType, string> = {
  hero: "Hero", statement: "Statement", collection_grid: "Collection grid",
  process: "Process", text: "Text", gallery: "Gallery", contact: "Contact form", cta: "Call to action",
};

export const sectionDefaults: Record<SectionType, Record<string, unknown>> = {
  hero: { eyebrow: "Uniforms for remarkable hospitality", title: "Dress the experience.", intro: "Tell your story here.", image: "", ctaLabel: "Explore", ctaHref: "#collections" },
  statement: { eyebrow: "Our point of view", title: "A considered statement.", body: "Add your message here." },
  collection_grid: { eyebrow: "The collection", title: "Every role, one identity.", items: [{ title: "Front of house", text: "Elegant tailoring with freedom to move.", image: "" }] },
  process: { eyebrow: "Our process", title: "How we work", items: [{ title: "Discover", text: "We learn your concept and practical needs." }] },
  text: { eyebrow: "", title: "New section", body: "Add your content here." },
  gallery: { eyebrow: "Gallery", title: "Selected work", images: [{ src: "", alt: "" }] },
  contact: { eyebrow: "Begin a collaboration", title: "Let's create something memorable.", intro: "Tell us about your project." },
  cta: { eyebrow: "Ready to begin?", title: "Start your uniform project.", text: "", label: "Contact us", href: "#contact" },
};

export async function getPublishedPage(slug: string) {
  if (!db) return null;
  const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  if (!page?.published) return null;
  const rows = await db.select().from(sections).where(eq(sections.pageId, page.id)).orderBy(asc(sections.sortOrder));
  return { ...page, sections: rows.filter((row) => row.visible) };
}

export async function getNavigation() {
  if (!db) return [];
  return db.select().from(pages).where(eq(pages.published, true)).orderBy(asc(pages.navOrder));
}
