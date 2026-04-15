import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string
  readTime: string
  content: string
}

export function getAllPosts(): Omit<Post, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        datePublished: data.datePublished ?? "",
        readTime: data.readTime ?? "",
      }
    })
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    datePublished: data.datePublished ?? "",
    readTime: data.readTime ?? "",
    content,
  }
}
