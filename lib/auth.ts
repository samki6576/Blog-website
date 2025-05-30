import { supabase } from "./supabase"
import toast from "react-hot-toast"

export const authService = {
  // Sign up
  async signUp(email: string, password: string, fullName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role: "user",
          },
        ])

        if (profileError) throw profileError
      }

      toast.success("Account created successfully! Please check your email to verify.")
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success("Signed in successfully!")
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast.success("Signed out successfully!")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        return { user: { ...user, profile }, error: null }
      }

      return { user: null, error: null }
    } catch (error: any) {
      return { user: null, error }
    }
  },

  // Update profile
  async updateProfile(userId: string, updates: any) {
    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

      if (error) throw error

      toast.success("Profile updated successfully!")
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  },
}
