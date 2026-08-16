import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Atelier Service — Exclusive Restaurant Uniforms", description: "Bespoke uniforms for restaurants, hotels, and hospitality teams." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
