import { getContent } from "@/lib/content";
import { getPublishedPage } from "@/lib/page-builder";
import { PageRenderer } from "@/app/components/page-renderer";
import { SiteFooter, SiteHeader } from "@/app/components/site-shell";
const collections = [
  ["Front of house", "Elegant tailoring with the freedom to move.", "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85"],
  ["Kitchen", "Technical performance, refined down to the seam.", "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1200&q=85"],
  ["Bar & lounge", "Distinctive silhouettes for after-dark service.", "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85"],
];
export const dynamic = "force-dynamic";
export default async function Home() { const builderPage=await getPublishedPage("");if(builderPage)return <><SiteHeader/><main id="top"><PageRenderer sections={builderPage.sections}/></main><SiteFooter/></>; const c = await getContent(); return <>
  <header className="site-header"><a className="brand" href="#top">{c.brand}</a><nav><a href="#collections">Collections</a><a href="#process">Process</a><a href="#about">About</a><a className="nav-cta" href="#contact">Start a project</a></nav></header>
  <main id="top"><section className="hero"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.heroTitle}</h1><p className="intro">{c.heroIntro}</p><a className="button" href="#collections">Explore the collection <span>↗</span></a></div><div className="hero-visual" style={{backgroundImage:`linear-gradient(0deg,rgba(25,24,22,.2),rgba(25,24,22,.05)),url('${c.heroImage}')`}}><div className="visual-label"><span>01</span> Tailored for service</div></div><aside className="hero-note">Designed in Europe<br/>Made for the world</aside></section>
  <section className="statement" id="about"><p className="eyebrow">The first impression</p><h2>{c.statementTitle}</h2><p>{c.statementBody}</p></section>
  <section className="collections" id="collections"><div className="section-heading"><p className="eyebrow">The collection</p><h2>Every role,<br/><em>one identity.</em></h2></div>{collections.map((item,i)=><article className="collection-card" key={item[0]} style={{backgroundImage:`url('${item[2]}')`}}><div><span>0{i+1}</span><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}</section>
  <section className="process" id="process"><div><p className="eyebrow">Our process</p><h2>From your world<br/>to their <em>wardrobe.</em></h2></div><ol>{[["Discover","We learn your concept, space, service style, and practical needs."],["Design","We develop silhouettes, palettes, details, and a complete visual direction."],["Refine","Samples are fitted, tested in service, and perfected with your team."],["Deliver","Production, quality control, sizing, and global delivery—managed end to end."]].map((p,i)=><li key={p[0]}><span>0{i+1}</span><div><h3>{p[0]}</h3><p>{p[1]}</p></div></li>)}</ol></section>
  <section className="contact" id="contact"><p className="eyebrow">Begin a collaboration</p><h2>Let&apos;s create something<br/>your guests will <em>remember.</em></h2><form className="contact-form" action="/api/enquiries" method="post"><input required name="name" placeholder="Your name"/><input required name="email" type="email" placeholder="Email address"/><input name="company" placeholder="Restaurant or company"/><textarea required name="message" rows={4} placeholder="Tell us about your project"/><button className="button light" type="submit">Send project enquiry <span>↗</span></button></form></section></main>
  <footer><span className="brand">{c.brand}</span><p>Exclusive uniforms for exceptional places.</p><p>© {new Date().getFullYear()} {c.brand}</p></footer>
  </>; }
