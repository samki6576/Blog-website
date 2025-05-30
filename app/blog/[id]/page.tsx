"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  Clock,
  ThumbsUp,
  Flag,
  Twitter,
  Facebook,
  Linkedin,
  LinkIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

// Mock blog post data
const blogPost = {
  id: 1,
  title: "The Future of Web Development: Trends to Watch in 2024",
  content: `
    <h2>Introduction</h2>
    <p>Web development is evolving at an unprecedented pace. As we move through 2024, several key trends are shaping the future of how we build and interact with web applications. From artificial intelligence integration to new frameworks and tools, the landscape is more exciting than ever.</p>
    
    <h2>1. AI-Powered Development Tools</h2>
    <p>Artificial Intelligence is revolutionizing the development process. Tools like GitHub Copilot, ChatGPT, and specialized AI coding assistants are becoming integral parts of developers' workflows. These tools help with:</p>
    <ul>
      <li>Code generation and completion</li>
      <li>Bug detection and fixing</li>
      <li>Code optimization suggestions</li>
      <li>Documentation generation</li>
    </ul>
    
    <h2>2. The Rise of Edge Computing</h2>
    <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. This trend is particularly important for:</p>
    <ul>
      <li>Real-time applications</li>
      <li>IoT devices</li>
      <li>Content delivery networks</li>
      <li>Mobile applications</li>
    </ul>
    
    <h2>3. WebAssembly (WASM) Adoption</h2>
    <p>WebAssembly is enabling high-performance applications in the browser. Languages like Rust, C++, and Go can now run efficiently in web browsers, opening up new possibilities for web applications.</p>
    
    <h2>4. Progressive Web Apps (PWAs)</h2>
    <p>PWAs continue to bridge the gap between web and native applications. With improved capabilities and better browser support, PWAs are becoming a viable alternative to native apps for many use cases.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is bright and full of opportunities. By staying updated with these trends and continuously learning, developers can build better, faster, and more engaging web experiences.</p>
  `,
  excerpt:
    "Explore the latest trends shaping the future of web development, from AI integration to new frameworks and tools that are revolutionizing how we build applications.",
  author: {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Senior Full-Stack Developer with 8+ years of experience. Passionate about emerging technologies and developer education.",
    followers: 2500,
    posts: 45,
  },
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Technology",
  tags: ["Web Development", "AI", "Future Tech", "Programming"],
  featuredImage: "/placeholder.svg?height=400&width=800",
  views: 2500,
  likes: 189,
  bookmarks: 67,
  comments: 45,
  isLiked: false,
  isBookmarked: false,
}

const comments = [
  {
    id: 1,
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Great article! I'm particularly excited about WebAssembly. The performance improvements are incredible.",
    createdAt: "2024-01-16",
    likes: 12,
    replies: [
      {
        id: 2,
        author: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Thanks Mike! WebAssembly is definitely a game-changer. Have you tried using it in any projects yet?",
        createdAt: "2024-01-16",
        likes: 5,
      },
    ],
  },
  {
    id: 3,
    author: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "The AI tools section really resonates with me. GitHub Copilot has significantly improved my productivity.",
    createdAt: "2024-01-16",
    likes: 8,
    replies: [],
  },
]

const relatedPosts = [
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Learn how to design and build applications that can scale with your business needs.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "The Art of User Experience Design",
    excerpt: "Discover the principles and practices that make great user experiences.",
    author: "Emily Davis",
    date: "2024-01-10",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(blogPost)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleBookmark = () => {
    setPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      bookmarks: prev.isBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1,
    }))
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsSubmittingComment(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNewComment("")
    setIsSubmittingComment(false)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <Link href={`/category/${post.category.toLowerCase()}`} className="hover:text-blue-600">
                {post.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900">Article</span>
            </div>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Author and Meta Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/author/${post.author.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                    {post.author.name}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.publishedAt}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={post.isLiked ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={post.isBookmarked ? "text-blue-600 border-blue-600" : ""}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${post.isBookmarked ? "fill-current" : ""}`} />
                  {post.bookmarks}
                </Button>
                <div className="relative">
                  <Button variant="outline" size="sm" onClick={() => setShowShareMenu(!showShareMenu)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {showShareMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border p-2 z-10">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="p-2">
                          <Twitter className="w-4 h-4 text-blue-400" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <Facebook className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <Linkedin className="w-4 h-4 text-blue-700" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <LinkIcon className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="hover:bg-blue-100 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Author Bio */}
              <Card className="mt-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
                      <p className="text-gray-600 mb-4">{post.author.bio}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>{post.author.followers} followers</span>
                        <span>{post.author.posts} posts</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Follow
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="mt-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Comments ({post.comments})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Comment Form */}
                  {user ? (
                    <form onSubmit={handleSubmitComment} className="mb-8">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt="You" />
                          <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                            className="mb-4"
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{newComment.length}/500 characters</span>
                            <Button
                              type="submit"
                              disabled={!newComment.trim() || isSubmittingComment}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              {isSubmittingComment ? "Posting..." : "Post Comment"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-600 mb-4">Please sign in to leave a comment</p>
                      <Link href="/auth/login">
                        <Button>Sign In</Button>
                      </Link>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold">{comment.author.name}</span>
                              <span className="text-sm text-gray-500">{comment.createdAt}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{comment.content}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-400">
                                <Flag className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="ml-12 flex items-start space-x-4">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold text-sm">{reply.author.name}</span>
                                <span className="text-xs text-gray-500">{reply.createdAt}</span>
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                              <div className="flex items-center space-x-4 text-xs">
                                <Button variant="ghost" size="sm" className="p-0 h-auto">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {reply.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="p-0 h-auto">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Table of Contents */}
              <Card className="mb-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#introduction" className="block text-gray-600 hover:text-blue-600">
                      Introduction
                    </a>
                    <a href="#ai-tools" className="block text-gray-600 hover:text-blue-600">
                      AI-Powered Development Tools
                    </a>
                    <a href="#edge-computing" className="block text-gray-600 hover:text-blue-600">
                      The Rise of Edge Computing
                    </a>
                    <a href="#webassembly" className="block text-gray-600 hover:text-blue-600">
                      WebAssembly (WASM) Adoption
                    </a>
                    <a href="#pwa" className="block text-gray-600 hover:text-blue-600">
                      Progressive Web Apps (PWAs)
                    </a>
                    <a href="#conclusion" className="block text-gray-600 hover:text-blue-600">
                      Conclusion
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Related Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">{relatedPost.title}</h4>
                            <p className="text-xs text-gray-500">
                              {relatedPost.author} • {relatedPost.readTime}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
