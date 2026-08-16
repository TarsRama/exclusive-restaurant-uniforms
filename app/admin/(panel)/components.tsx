export function Header({title,text,action}:{title:string;text:string;action?:React.ReactNode}){return <header className="admin-header"><div><p className="admin-kicker">Content studio</p><h1>{title}</h1><p>{text}</p></div>{action}</header>}
export function Empty({text}:{text:string}){return <div className="empty"><p>{text}</p></div>}
