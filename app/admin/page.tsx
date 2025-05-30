"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, Users, FileText, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const mockPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    author: "Sarah Johnson",
    status: "published",
    category: "Technology",
    date: "2024-01-15",
    views: 1250,
    comments: 23,
  },
  {
    id: 2,
    title: "Building Scalable Applications",
    author: "Mike Chen",
    status: "draft",
    category: "Development",
    date: "2024-01-12",
    views: 0,
    comments: 0,
  },
  {
    id: 3,
    title: "User Experience Design",
    author: "Emily Davis",
    status: "published",
    category: "Design",
    date: "2024-01-10",
    views: 890,
    comments: 15,
  },
]

const mockStats = {
  totalPosts: 45,
  totalViews: 12500,
  totalComments: 234,
  totalUsers: 1250,
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft",
  })

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        author: "Admin",
        status: newPost.status,
        category: newPost.category,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        comments: 0,
      }
      setPosts([...posts, post])
      setNewPost({ title: "", content: "", category: "", status: "draft" })
    }
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Overview
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "posts" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("posts")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Posts
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "create" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("create")}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "users" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalPosts}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+25% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Comments</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalComments}</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>Your latest blog posts and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.slice(0, 5).map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                          </TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell>{post.comments}</TableCell>
                          <TableCell>{post.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Manage Posts</h2>
                <Button onClick={() => setActiveTab("create")}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input placeholder="Search posts..." className="max-w-sm" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Posts</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Posts Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                          </TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "create" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Create New Post</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                  <CardDescription>Fill in the details for your new blog post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newPost.status}
                        onValueChange={(value) => setNewPost({ ...newPost, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here..."
                      className="min-h-[300px]"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleCreatePost}>Publish Post</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">User Management</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>Manage your blog's user base</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                    <p className="text-gray-600">User management features will be implemented here.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
