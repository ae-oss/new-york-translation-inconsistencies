import Link from "next/link";

const links = [
  ["/", "Overview"],
  ["/findings/", "Findings"],
  ["/government-guidance/", "Government guidance"],
  ["/legislation/", "Legislation"],
  ["/statistics/", "Statistics"],
  ["/methodology/", "Methodology"],
  ["/sources/", "Sources"],
] as const;

export function SiteHeader() {
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand">New York Translation Inconsistencies</Link>
      <nav aria-label="Main navigation">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
