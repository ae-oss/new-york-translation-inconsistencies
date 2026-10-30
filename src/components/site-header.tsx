import Link from "next/link";

const links = [
  ["/issue-sweeps/", "Issue sweeps"],
  ["/findings/", "Findings"],
  ["/agencies/", "Agencies"],
  ["/coverage/", "Coverage"],
  ["/methodology/", "Method"],
  ["/limitations/", "Limitations"],
  ["/archive/translation/", "Translation archive"],
] as const;

export function SiteHeader() {
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand">New York Legal Misrepresentation</Link>
      <nav aria-label="Main navigation">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
