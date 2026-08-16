import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";
export const metadata: Metadata = { title: "Atelier Service — Exclusive Restaurant Uniforms", description: "Bespoke uniforms for restaurants, hotels, and hospitality teams." };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const c=await getContent();const style={"--ink":c.inkColor,"--paper":c.paperColor,"--cream":c.surfaceColor,"--rust":c.accentColor,"--heading-font":`"${c.headingFont}",serif`,"--body-font":`"${c.bodyFont}",sans-serif`,"--content-width":`${c.contentWidth}px`} as React.CSSProperties;return <html lang="en"><body style={style}>{children}</body></html>; }
