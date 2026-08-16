import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages } from "@/db/schema";
import { Header, Empty } from "../components";

export default async function PagesAdmin(){
  const rows=db?await db.select().from(pages).orderBy(asc(pages.navOrder)):[];
  return <><Header title="Pages" text="Create pages, control navigation and build each page from reusable sections."/>
    <form className="admin-card compact-create" action="/api/admin/page-builder" method="post">
      <input type="hidden" name="action" value="create-page"/><input name="title" required placeholder="Page title"/><input name="slug" required placeholder="slug"/><button>Create page</button>
    </form>
    <section className="admin-card"><div className="card-heading"><h2>Website pages</h2><span>{rows.length} pages</span></div>
      {!rows.length?<Empty text="No builder pages yet. Create your first page above."/>:<div className="builder-list">{rows.map(p=><article key={p.id}><div><strong>{p.title}</strong><span>/{p.slug}</span></div><span className="badge">{p.published?"Published":"Draft"}</span><Link href={`/admin/pages/${p.id}`}>Edit page →</Link></article>)}</div>}
    </section></>;
}
