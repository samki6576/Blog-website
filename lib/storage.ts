import { supabase } from "./supabase"
import toast from "react-hot-toast"

export const storageService = {
  // Upload image
  async uploadImage(file: File, bucket = "images") {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath)

      return { url: publicUrl, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { url: null, error }
    }
  },

  // Delete image
  async deleteImage(url: string, bucket = "images") {
    try {
      const fileName = url.split("/").pop()
      if (!fileName) return { error: null }

      const { error } = await supabase.storage.from(bucket).remove([fileName])

      if (error) throw error

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  },
}
