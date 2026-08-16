import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPage } from "@/lib/page-builder";
import { PageRenderer } from "@/app/components/page-renderer";
import { SiteFooter, SiteHeader } from "@/app/components/site-shell";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params,p=await getPublishedPage(slug);return p?{title:p.metaTitle||p.title,description:p.metaDescription||undefined}:{};}
export default async function DynamicPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params,p=await getPublishedPage(slug);if(!p)notFound();return <><SiteHeader/><main><PageRenderer sections={p.sections}/></main><SiteFooter/></>}
