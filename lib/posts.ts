import { supabase } from "./supabase"
import type { Post } from "./supabase"
import toast from "react-hot-toast"

export const postsService = {
  // Get all posts
  async getPosts(
    filters: {
      category?: string
      status?: string
      search?: string
      limit?: number
      offset?: number
    } = {},
  ) {
    try {
      let query = supabase
        .from("posts")
        .select(`
          *,
          profiles:author_id (
            full_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })

      if (filters.category) {
        query = query.eq("category", filters.category)
      }

      if (filters.status) {
        query = query.eq("status", filters.status)
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Get single post
  async getPost(slug: string) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles:author_id (
            full_name,
            avatar_url
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) throw error

      // Increment views
      await supabase
        .from("posts")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", data.id)

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error }
    }
  },

  // Create post
  async createPost(post: Omit<Post, "id" | "created_at" | "updated_at" | "views" | "likes">) {
    try {
      const { data, error } = await supabase.from("posts").insert([post]).select().single()

      if (error) throw error

      toast.success("Post created successfully!")
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Update post
  async updatePost(id: string, updates: Partial<Post>) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast.success("Post updated successfully!")
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Delete post
  async deletePost(id: string) {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)

      if (error) throw error

      toast.success("Post deleted successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },

  // Like post
  async likePost(postId: string, userId: string) {
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .single()

      if (existingLike) {
        // Unlike
        await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", userId)

        // Decrement likes count
        const { data: post } = await supabase.from("posts").select("likes").eq("id", postId).single()

        await supabase
          .from("posts")
          .update({ likes: Math.max(0, (post?.likes || 0) - 1) })
          .eq("id", postId)

        return { liked: false, error: null }
      } else {
        // Like
        await supabase.from("post_likes").insert([{ post_id: postId, user_id: userId }])

        // Increment likes count
        const { data: post } = await supabase.from("posts").select("likes").eq("id", postId).single()

        await supabase
          .from("posts")
          .update({ likes: (post?.likes || 0) + 1 })
          .eq("id", postId)

        return { liked: true, error: null }
      }
    } catch (error: any) {
      toast.error(error.message)
      return { liked: false, error }
    }
  },
}
