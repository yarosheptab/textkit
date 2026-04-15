export type Tool = {
  slug: string
  name: string
  description: string
  icon: string
}

export const TOOLS: Tool[] = [
  {
    slug: "case",
    name: "Case Converter",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    icon: "M4 7h16M4 12h10M4 17h6",
  },
  {
    slug: "wordcount",
    name: "Word Count",
    description: "Count words, characters, sentences, and paragraphs. Estimate reading and speaking time.",
    icon: "M3 3h18v4H3zM3 10h12v4H3zM3 17h8v4H3z",
  },
  {
    slug: "markdown",
    name: "Markdown Preview",
    description: "Type Markdown on the left, see rendered HTML on the right. Live, as you type.",
    icon: "M4 7h4M4 12h16M4 17h12",
  },
  {
    slug: "slug",
    name: "Slug Generator",
    description: "Turn any string into a clean URL slug. Handles Unicode, spaces, and special characters.",
    icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  },
  {
    slug: "find-replace",
    name: "Find & Replace",
    description: "Search and replace text with plain strings or regular expressions. Highlights all matches.",
    icon: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z",
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum",
    description: "Generate placeholder text by words, sentences, or paragraphs. Copy in one click.",
    icon: "M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83",
  },
]
