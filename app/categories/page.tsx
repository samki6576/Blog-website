"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Clock, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Technology",
    slug: "technology",
    description: "Latest tech trends, programming tutorials, and innovation insights",
    postCount: 245,
    subscriberCount: 12500,
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    trending: true,
    recentPosts: [
      { title: "The Future of AI in Web Development", author: "John Doe", date: "2024-01-15" },
      { title: "Building Scalable Microservices", author: "Jane Smith", date: "2024-01-14" },
      { title: "React 18 New Features Guide", author: "Mike Johnson", date: "2024-01-13" },
    ],
  },
  {
    id: 2,
    name: "Design",
    slug: "design",
    description: "UI/UX design principles, creative inspiration, and design tools",
    postCount: 189,
    subscriberCount: 8900,
    color: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww",
    trending: true,
    recentPosts: [
      { title: "Minimalist Design Principles", author: "Sarah Wilson", date: "2024-01-15" },
      { title: "Color Theory for Beginners", author: "Alex Chen", date: "2024-01-14" },
      { title: "Typography in Modern Web Design", author: "Emma Davis", date: "2024-01-13" },
    ],
  },
  {
    id: 3,
    name: "Development",
    slug: "development",
    description: "Programming tutorials, best practices, and software development",
    postCount: 312,
    subscriberCount: 15600,
    color: "bg-green-500",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    trending: false,
    recentPosts: [
      { title: "Clean Code Principles", author: "David Brown", date: "2024-01-15" },
      { title: "API Design Best Practices", author: "Lisa Garcia", date: "2024-01-14" },
      { title: "Testing Strategies for React Apps", author: "Tom Wilson", date: "2024-01-13" },
    ],
  },
  {
    id: 4,
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, startup insights, and business strategy",
    postCount: 156,
    subscriberCount: 7200,
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    trending: false,
    recentPosts: [
      { title: "Building a Successful Startup", author: "Mark Thompson", date: "2024-01-15" },
      { title: "Remote Team Management", author: "Anna Rodriguez", date: "2024-01-14" },
      { title: "Marketing on a Budget", author: "Chris Lee", date: "2024-01-13" },
    ],
  },
  {
    id: 5,
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Personal development, wellness, and life improvement tips",
    postCount: 98,
    subscriberCount: 5400,
    color: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1455894127589-22f75500213a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    trending: false,
    recentPosts: [
      { title: "Morning Routines for Productivity", author: "Rachel Green", date: "2024-01-15" },
      { title: "Mindfulness in Daily Life", author: "Kevin Park", date: "2024-01-14" },
      { title: "Work-Life Balance Tips", author: "Sophie Turner", date: "2024-01-13" },
    ],
  },
  {
    id: 6,
    name: "Tutorial",
    slug: "tutorial",
    description: "Step-by-step guides and how-to articles",
    postCount: 203,
    subscriberCount: 9800,
    color: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    trending: true,
    recentPosts: [
      { title: "Complete Guide to Next.js", author: "Peter Kim", date: "2024-01-15" },
      { title: "Docker for Beginners", author: "Maria Santos", date: "2024-01-14" },
      { title: "Git Workflow Best Practices", author: "James Miller", date: "2024-01-13" },
    ],
  },
]

const stats = [
  { label: "Total Categories", value: "6", icon: BookOpen },
  { label: "Total Posts", value: "1,203", icon: TrendingUp },
  { label: "Active Writers", value: "450", icon: Users },
  { label: "This Month", value: "+89", icon: Clock },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCategories(filtered)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Explore Categories
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover content organized by topics you love. From technology to lifestyle, find your niche and connect
            with like-minded readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {category.trending && (
                      <Badge className="bg-red-500 hover:bg-red-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-3`}>
                      <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{category.postCount} posts</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{category.subscriberCount.toLocaleString()} followers</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm text-gray-700">Recent Posts:</h4>
                    {category.recentPosts.slice(0, 2).map((post, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        <span className="font-medium">{post.title}</span>
                        <span className="block">by {post.author}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/category/${category.slug}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all"
                      >
                        Explore
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${selectedCategory.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{selectedCategory.name.charAt(0)}</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedCategory.name}</CardTitle>
                    <CardDescription>{selectedCategory.description}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{selectedCategory.postCount}</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedCategory.subscriberCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-3">
                  {selectedCategory.recentPosts.map((post, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-500">
                        by {post.author} • {post.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Link href={`/category/${selectedCategory.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Explore Category
                  </Button>
                </Link>
                <Button variant="outline">Follow Category</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Topic?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always adding new categories based on our community's interests. Suggest a new category or start
            writing in an existing one!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Suggest Category</Button>
            <Link href="/write">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Start Writing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
