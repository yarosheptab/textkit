import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "0 24px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "var(--muted-fg)" }}>
      <a href="https://yaro-labs.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>© {year} Yaro Labs</a>
      <div style={{ display: "flex", gap: "14px" }}>
        {[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
          { href: "/cookies", label: "Cookies" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
        ].map(({ href, label }) => (
          <Link key={label} href={href} style={{ color: "inherit", textDecoration: "none" }}>{label}</Link>
        ))}
      </div>
    </footer>
  )
}
