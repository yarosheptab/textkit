import { Navbar } from "@/components/navbar"
import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on text tools, developer productivity, and the craft of language.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "32px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px",
        }}>Blog</h1>
        <p style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "14px", color: "var(--muted-fg)", marginBottom: "40px",
        }}>
          Writing on text tools, developer productivity, and the craft of language.
        </p>

        {posts.length === 0 ? (
          <p style={{ color: "var(--subtle)" }}>No posts yet.</p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div style={{
                  padding: "20px 0",
                  borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                  borderBottom: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px", color: "var(--subtle)", marginBottom: "6px",
                  }}>
                    {post.datePublished}{post.readTime ? ` · ${post.readTime}` : ""}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "20px", fontWeight: 400, color: "var(--fg)",
                    marginBottom: "6px", lineHeight: 1.3,
                  }}>{post.title}</div>
                  {post.description && (
                    <div style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "13px", color: "var(--muted-fg)", lineHeight: 1.55,
                    }}>{post.description}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
