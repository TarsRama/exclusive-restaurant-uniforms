import type { SectionType } from "@/lib/page-builder";

type Content = Record<string, any>;
type Section = { id: string; type: string; content: unknown };

export function PageRenderer({ sections }: { sections: Section[] }) {
  return <>{sections.map((section) => <SectionRenderer key={section.id} type={section.type as SectionType} content={(section.content ?? {}) as Content} />)}</>;
}

function SectionRenderer({ type, content: c }: { type: SectionType; content: Content }) {
  if (type === "hero") return <section className="hero"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="intro">{c.intro}</p>{c.ctaLabel && <a className="button" href={c.ctaHref || "#"}>{c.ctaLabel} <span>↗</span></a>}</div><div className="hero-visual" style={{backgroundImage:`linear-gradient(0deg,rgba(25,24,22,.2),rgba(25,24,22,.05)),url('${c.image}')`}} /></section>;
  if (type === "statement" || type === "text") return <section className="statement"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p>{c.body}</p></section>;
  if (type === "collection_grid") return <section className="collections" id="collections"><div className="section-heading"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2></div>{(c.items ?? []).map((item: Content, i: number)=><article className="collection-card" key={i} style={{backgroundImage:`url('${item.image}')`}}><div><span>{String(i+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</section>;
  if (type === "process") return <section className="process"><div><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2></div><ol>{(c.items ?? []).map((item: Content, i: number)=><li key={i}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>;
  if (type === "gallery") return <section className="gallery-section"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><div className="gallery-grid">{(c.images ?? []).filter((x: Content)=>x.src).map((image: Content, i: number)=><img key={i} src={image.src} alt={image.alt || ""}/>)}</div></section>;
  if (type === "contact") return <section className="contact" id="contact"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2>{c.intro && <p>{c.intro}</p>}<form className="contact-form" action="/api/enquiries" method="post"><input required name="name" placeholder="Your name"/><input required name="email" type="email" placeholder="Email address"/><input name="company" placeholder="Restaurant or company"/><textarea required name="message" rows={4} placeholder="Tell us about your project"/><button className="button light" type="submit">Send project enquiry <span>↗</span></button></form></section>;
  if (type === "cta") return <section className="contact"><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2>{c.text && <p>{c.text}</p>}<a className="button light" href={c.href || "#"}>{c.label}</a></section>;
  return null;
}
