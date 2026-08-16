import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { pages, sections } from "@/db/schema";
import { sectionLabels, sectionTypes, type SectionType } from "@/lib/page-builder";
import { Header } from "../../components";

export default async function PageEditor({params}:{params:Promise<{id:string}>}){
  const {id}=await params;if(!db)return null;
  const [page]=await db.select().from(pages).where(eq(pages.id,id)).limit(1);if(!page)notFound();
  const rows=await db.select().from(sections).where(eq(sections.pageId,id)).orderBy(asc(sections.sortOrder));
  return <><Header title={page.title} text="Edit page settings, then add and arrange content sections." action={<Link href={page.slug?`/${page.slug}`:"/"} target="_blank">Preview ↗</Link>}/>
    <form className="admin-card editor-form" action="/api/admin/page-builder" method="post"><input type="hidden" name="action" value="update-page"/><input type="hidden" name="id" value={page.id}/><div className="form-grid"><label>Title<input name="title" defaultValue={page.title} required/></label><label>URL slug<input name="slug" defaultValue={page.slug}/></label><label>Navigation label<input name="navLabel" defaultValue={page.navLabel}/></label><label>Navigation order<input type="number" name="navOrder" defaultValue={page.navOrder}/></label><label className="wide">SEO title<input name="metaTitle" defaultValue={page.metaTitle}/></label><label className="wide">SEO description<textarea name="metaDescription" defaultValue={page.metaDescription}/></label><label className="check"><input type="checkbox" name="showInNav" defaultChecked={page.showInNav}/> Show in navigation</label><label className="check"><input type="checkbox" name="published" defaultChecked={page.published}/> Published</label></div><div className="form-actions"><span>Page settings and SEO</span><button>Save page</button></div></form>
    <section className="admin-card"><div className="card-heading"><h2>Page sections</h2><span>Rendered from top to bottom</span></div><div className="builder-list">{rows.map((s,i)=><article key={s.id}><span className="order-number">{i+1}</span><div><strong>{sectionLabels[s.type as SectionType]??s.type}</strong><span>{s.visible?"Visible":"Hidden"}</span></div><div className="row-actions"><form action="/api/admin/page-builder" method="post"><input type="hidden" name="action" value="move-section"/><input type="hidden" name="id" value={s.id}/><input type="hidden" name="direction" value="up"/><button disabled={i===0}>↑</button></form><form action="/api/admin/page-builder" method="post"><input type="hidden" name="action" value="move-section"/><input type="hidden" name="id" value={s.id}/><input type="hidden" name="direction" value="down"/><button disabled={i===rows.length-1}>↓</button></form><Link href={`/admin/sections/${s.id}`}>Edit →</Link></div></article>)}</div>
      <form className="add-section" action="/api/admin/page-builder" method="post"><input type="hidden" name="action" value="add-section"/><input type="hidden" name="pageId" value={page.id}/><select name="type">{sectionTypes.map(t=><option key={t} value={t}>{sectionLabels[t]}</option>)}</select><button>Add section</button></form>
    </section></>;
}
