import Link from 'next/link';
import { AmazonButton } from './AmazonButton';

export function Logo() { return <Link href="/" className="logo" aria-label="The Yellow Mango home"><span className="logo-mark">YM</span><span>The Yellow Mango</span></Link>; }
export function Header() {
  const nav = [['/','Home'],['/shop','Shop'],['/about','About'],['/support','Support'],['/contact','Contact']];
  return <header className="site-header"><div className="container header-inner"><Logo/><input id="menu-toggle" className="menu-toggle" type="checkbox" aria-label="Open menu"/><label className="hamburger" htmlFor="menu-toggle"><span></span><span></span><span></span></label><nav className="nav">{nav.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}<AmazonButton>Shop on Amazon</AmazonButton></nav></div></header>;
}
