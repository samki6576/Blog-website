const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "An error occurred")
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth methods
  async registerUser(userData: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request("/auth/user")
  }

  // Post methods
  async getPosts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/posts?${queryString}`)
  }

  async getPost(id: string) {
    return this.request(`/posts/${id}`)
  }

  async createPost(postData: any) {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    })
  }

  async updatePost(id: string, postData: any) {
    return this.request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    })
  }

  async deletePost(id: string) {
    return this.request(`/posts/${id}`, {
      method: "DELETE",
    })
  }

  // Comment methods
  async getComments(postId: string) {
    return this.request(`/posts/${postId}/comments`)
  }

  async createComment(postId: string, content: string) {
    return this.request(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  async deleteComment(commentId: string) {
    return this.request(`/comments/${commentId}`, {
      method: "DELETE",
    })
  }

  // Admin methods
  async getAdminStats() {
    return this.request("/admin/stats")
  }

  async getAdminPosts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/admin/posts?${queryString}`)
  }

  async getAdminUsers(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/admin/users?${queryString}`)
  }

  // Search methods
  async searchPosts(query: string, category?: string) {
    const params = new URLSearchParams({ q: query })
    if (category) params.append("category", category)
    return this.request(`/search?${params.toString()}`)
  }

  // Categories
  async getCategories() {
    return this.request("/categories")
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
