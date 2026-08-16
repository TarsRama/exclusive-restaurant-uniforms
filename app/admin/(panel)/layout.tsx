import Link from "next/link";
import { BarChart3, FileText, Images, Inbox, Palette, ExternalLink, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import "../admin.css";
const links = [["/admin",BarChart3,"Overview"],["/admin/pages",FileText,"Pages"],["/admin/designs",Palette,"Designs"],["/admin/media",Images,"Media"],["/admin/enquiries",Inbox,"Enquiries"]] as const;
export default async function AdminLayout({children}:{children:React.ReactNode}) { if(!await isAuthenticated()) redirect("/admin/login"); return <div className="admin-shell"><aside className="admin-sidebar"><div><span className="admin-mark">AS</span><strong>Atelier Admin</strong></div><nav>{links.map(([href,Icon,label])=><Link href={href} key={href}><Icon size={18}/>{label}</Link>)}</nav><div className="sidebar-bottom"><Link href="/" target="_blank"><ExternalLink size={18}/>View website</Link><form action="/api/auth/logout" method="post"><button><LogOut size={18}/>Sign out</button></form></div></aside><main className="admin-main">{children}</main></div>; }
