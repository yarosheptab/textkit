import { Navbar } from "@/components/navbar"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { marked } from "marked"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked(post.content)

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px", color: "var(--subtle)", marginBottom: "24px",
        }}>
          <Link href="/blog" style={{ color: "var(--subtle)", textDecoration: "none" }}>blog</Link>
          {" / "}{post.slug}
        </div>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px", color: "var(--subtle)", marginBottom: "12px",
        }}>
          {post.datePublished}{post.readTime ? ` · ${post.readTime}` : ""}
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "36px", fontWeight: 400, color: "var(--fg)",
          lineHeight: 1.15, marginBottom: "32px",
        }}>{post.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
