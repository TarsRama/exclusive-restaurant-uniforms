import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { sections } from "@/db/schema";
import { sectionLabels, type SectionType } from "@/lib/page-builder";
import { Header } from "../../components";
import { SectionFields } from "./section-fields";
export default async function SectionPage({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!db)return null;const [section]=await db.select().from(sections).where(eq(sections.id,id)).limit(1);if(!section)notFound();return <><Header title={`Edit ${sectionLabels[section.type as SectionType]??section.type}`} text="Section content publishes with the page."/><SectionFields section={section}/></>}
