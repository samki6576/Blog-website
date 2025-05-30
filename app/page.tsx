import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ArrowRight, Heart, MessageCircle, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DatabaseSetup } from "@/components/database-setup"

// Mock data for blog posts
const featuredPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the future of web development, from AI integration to new frameworks.",
    author: "Sarah Johnson",
    author_avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Learn how to design and build applications that can scale with your business needs.",
    author: "Mike Chen",
    
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    views: 890,
    likes: 67,
    comments: 15,
  },
  {
    id: 3,
    title: "The Art of User Experience Design",
    excerpt: "Discover the principles and practices that make great user experiences.",
    author: "Emily Davis",
    
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    views: 1100,
    likes: 92,
    comments: 31,
  },
]

const categories = [
  { name: "Technology", count: 45, color: "bg-blue-500" },
  { name: "Design", count: 32, color: "bg-purple-500" },
  { name: "Development", count: 28, color: "bg-green-500" },
  { name: "Business", count: 19, color: "bg-orange-500" },
  { name: "Lifestyle", count: 15, color: "bg-pink-500" },
]

export default function HomePage() {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isConfigured = supabaseUrl && supabaseKey && supabaseUrl !== "" && supabaseKey !== ""

  if (!isConfigured) {
    return <DatabaseSetup />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to BlogSpace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, insights, and knowledge from our community of writers. Join us on a journey of
            learning and inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input placeholder="Search articles..." className="flex-1" />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} articles</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPosts[0] && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPosts[0].image || "/placeholder.svg"}
                    alt={featuredPosts[0].title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    {featuredPosts[0].category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{featuredPosts[0].title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPosts[0].excerpt}</p>

                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                   
                    <div>
                      <p className="font-semibold text-sm">{featuredPosts[0].author}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span className="mr-3">{featuredPosts[0].date}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{featuredPosts[0].readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{featuredPosts[0].views}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{featuredPosts[0].likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{featuredPosts[0].comments}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPosts[0].id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Link href="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(1).map((post) => (
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
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    {post.category}
                  </Badge>
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
                    
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{post.author}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span>{post.date}</span>
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
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles and insights.
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">BlogSpace</span>
              </div>
              <p className="text-gray-400">Your go-to destination for insightful articles and engaging content.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/technology" className="hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/category/design" className="hover:text-white transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/category/development" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/category/business" className="hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; Website develop by Samra </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
