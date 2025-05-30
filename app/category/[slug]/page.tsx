"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Eye, Heart, MessageCircle, CalendarDays } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for category posts
const categoryData = {
  technology: {
    name: "Technology",
    description: "Latest tech trends, programming tutorials, and innovation insights",
    color: "bg-blue-500",
    subscriberCount: 12500,
    postCount: 245,
    posts: [
      {
        id: 1,
        title: "The Future of AI in Web Development",
        excerpt:
          "Exploring how artificial intelligence is revolutionizing the way we build web applications and user experiences.",
        author: "John Doe",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-15",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        views: 2500,
        likes: 189,
        comments: 45,
        tags: ["AI", "Web Development", "Future Tech"],
        featured: true,
      },
      {
        id: 2,
        title: "Building Scalable Microservices with Node.js",
        excerpt:
          "A comprehensive guide to designing and implementing microservices architecture using Node.js and modern tools.",
        author: "Jane Smith",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-14",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        views: 1800,
        likes: 156,
        comments: 32,
        tags: ["Node.js", "Microservices", "Architecture"],
        featured: false,
      },
      {
        id: 3,
        title: "React 18 New Features and Performance Improvements",
        excerpt: "Deep dive into React 18's concurrent features, automatic batching, and performance optimizations.",
        author: "Mike Johnson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-13",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        views: 3200,
        likes: 245,
        comments: 67,
        tags: ["React", "JavaScript", "Performance"],
        featured: false,
      },
    ],
  },
  design: {
    name: "Design",
    description: "UI/UX design principles, creative inspiration, and design tools",
    color: "bg-purple-500",
    subscriberCount: 8900,
    postCount: 189,
    posts: [
      {
        id: 4,
        title: "Minimalist Design Principles for Modern Interfaces",
        excerpt: "Learn how to create clean, effective designs that prioritize user experience and functionality.",
        author: "Sarah Wilson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-15",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        views: 1900,
        likes: 167,
        comments: 28,
        tags: ["Minimalism", "UI Design", "UX"],
        featured: true,
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [filterBy, setFilterBy] = useState("all")

  const category = categoryData[slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/categories">
            <Button>Browse All Categories</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredPosts = category.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Category Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <span className="text-white font-bold text-2xl">{category.name.charAt(0)}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{category.description}</p>

            {/* Category Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{category.postCount}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{category.subscriberCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Follow Category
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {category.posts.find((post) => post.featured) && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Post</h2>
            {(() => {
              const featuredPost = category.posts.find((post) => post.featured)!
              return (
                <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">Featured</Badge>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{featuredPost.title}</h3>
                      <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                      {/* Author Info */}
                      <div className="flex items-center mb-4">
                        <Image
                          src={featuredPost.authorAvatar || "/placeholder.svg"}
                          alt={featuredPost.author}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold text-sm">{featuredPost.author}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            <span className="mr-3">{featuredPost.date}</span>
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{featuredPost.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{featuredPost.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{featuredPost.comments}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/blog/${featuredPost.id}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Read Full Article
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })()}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Posts</h2>
            <span className="text-gray-600">{filteredPosts.length} posts found</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <Image
                      src={post.authorAvatar || "/placeholder.svg"}
                      alt={post.author}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{post.author}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span className="mr-3">{post.date}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all"
                    >
                      Read Article
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Load More Posts
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Related Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(categoryData)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, cat]) => (
                <Link key={key} href={`/category/${key}`}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 ${cat.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <span className="text-white font-bold text-lg">{cat.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{cat.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{cat.postCount} articles</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-blue-600 group-hover:text-white transition-all"
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with {category.name}</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest {category.name.toLowerCase()} articles delivered to your inbox. Never miss an update!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
