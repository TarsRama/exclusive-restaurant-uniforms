import Link from "next/link";
import { getContent } from "@/lib/content";
import { getNavigation } from "@/lib/page-builder";
export async function SiteHeader(){const [c,pages]=await Promise.all([getContent(),getNavigation()]);return <header className="site-header"><Link className="brand" href="/">{c.brand}</Link><nav>{pages.filter(p=>p.showInNav).map(p=><Link key={p.id} href={p.slug?`/${p.slug}`:"/"}>{p.navLabel||p.title}</Link>)}<a className="nav-cta" href="/#contact">Start a project</a></nav></header>}
export async function SiteFooter(){const c=await getContent();return <footer><span className="brand">{c.brand}</span><p>Exclusive uniforms for exceptional places.</p><p>© {new Date().getFullYear()} {c.brand}</p></footer>}
