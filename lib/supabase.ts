import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  category: string
  tags: string[]
  status: "draft" | "published"
  author_id: string
  author_name: string
  author_avatar?: string
  views: number
  likes: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  author_name: string
  author_avatar?: string
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: "user" | "admin"
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  post_count: number
}
