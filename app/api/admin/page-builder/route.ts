import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, sections } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth";
import { sectionDefaults, sectionTypes, type SectionType } from "@/lib/page-builder";

const redirect=(req:NextRequest,path:string)=>NextResponse.redirect(new URL(path,req.url),303);
const text=(f:FormData,k:string)=>String(f.get(k)??"").trim();

export async function POST(req:NextRequest){
  if(!await isAuthenticated())return new NextResponse("Unauthorized",{status:401});
  if(!db)return new NextResponse("DATABASE_URL is not configured",{status:503});
  const f=await req.formData(),action=text(f,"action");
  if(action==="create-page"){
    const title=text(f,"title"),slug=cleanSlug(text(f,"slug"));
    if(!title)return new NextResponse("Title is required",{status:400});
    const [created]=await db.insert(pages).values({title,slug,navLabel:title}).returning({id:pages.id});
    return redirect(req,`/admin/pages/${created.id}`);
  }
  if(action==="update-page"){
    const id=text(f,"id");await db.update(pages).set({title:text(f,"title"),slug:cleanSlug(text(f,"slug")),navLabel:text(f,"navLabel"),navOrder:Number(text(f,"navOrder"))||0,showInNav:f.has("showInNav"),published:f.has("published"),metaTitle:text(f,"metaTitle"),metaDescription:text(f,"metaDescription"),updatedAt:new Date()}).where(eq(pages.id,id));
    return redirect(req,`/admin/pages/${id}?saved=1`);
  }
  if(action==="add-section"){
    const pageId=text(f,"pageId"),type=text(f,"type") as SectionType;if(!sectionTypes.includes(type))return new NextResponse("Invalid section type",{status:400});
    const current=await db.select().from(sections).where(eq(sections.pageId,pageId));
    const [created]=await db.insert(sections).values({pageId,type,sortOrder:current.length,content:sectionDefaults[type]}).returning({id:sections.id});
    return redirect(req,`/admin/sections/${created.id}`);
  }
  if(action==="update-section"){
    const id=text(f,"id");let content:unknown;try{content=JSON.parse(String(f.get("content")??"{}"))}catch{return new NextResponse("Invalid section content",{status:400})}
    const [row]=await db.update(sections).set({content,visible:f.has("visible"),updatedAt:new Date()}).where(eq(sections.id,id)).returning({pageId:sections.pageId});
    return redirect(req,`/admin/pages/${row.pageId}?saved=1`);
  }
  if(action==="move-section"){
    const id=text(f,"id"),direction=text(f,"direction");const [row]=await db.select().from(sections).where(eq(sections.id,id)).limit(1);if(!row)return new NextResponse("Not found",{status:404});
    const all=await db.select().from(sections).where(eq(sections.pageId,row.pageId)).orderBy(asc(sections.sortOrder));const index=all.findIndex(x=>x.id===id),other=direction==="up"?index-1:index+1;
    if(other>=0&&other<all.length){await db.transaction(async tx=>{await tx.update(sections).set({sortOrder:all[other].sortOrder}).where(eq(sections.id,row.id));await tx.update(sections).set({sortOrder:row.sortOrder}).where(eq(sections.id,all[other].id));});}
    return redirect(req,`/admin/pages/${row.pageId}`);
  }
  return new NextResponse("Unknown action",{status:400});
}

function cleanSlug(value:string){return value.toLowerCase().replace(/^\/+|\/+$/g,"").replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-")}
