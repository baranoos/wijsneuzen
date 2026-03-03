export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  status: "published" | "draft"
  tags: string[]
}

// Geen standaard blogposts — vul via Admin → Blogbeheer
export const blogPosts: BlogPost[] = []

export function getAllPublishedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.status === "published")
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
}
