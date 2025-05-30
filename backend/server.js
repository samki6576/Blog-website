const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const admin = require("firebase-admin")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Firebase Admin SDK initialization
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogspace", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// MongoDB Schemas
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  featuredImage: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: String,
  photoURL: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
})

const Post = mongoose.model("Post", PostSchema)
const Comment = mongoose.model("Comment", CommentSchema)
const User = mongoose.model("User", UserSchema)

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

// Middleware to check admin role
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" })
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: "Server error" })
  }
}

// Routes

// Auth Routes
app.post("/api/auth/register", verifyToken, async (req, res) => {
  try {
    const { email, displayName, photoURL } = req.body

    const existingUser = await User.findOne({ firebaseUid: req.user.uid })
    if (existingUser) {
      return res.json(existingUser)
    }

    const newUser = new User({
      firebaseUid: req.user.uid,
      email: email || req.user.email,
      displayName: displayName || req.user.name,
      photoURL: photoURL || req.user.picture,
    })

    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/auth/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Post Routes
app.get("/api/posts", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status = "published", search } = req.query

    const query = { status }

    if (category && category !== "all") {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Post.countDocuments(query)

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Increment views
    post.views += 1
    await post.save()

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/posts", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status, featuredImage } = req.body

    const user = await User.findOne({ firebaseUid: req.user.uid })

    const newPost = new Post({
      title,
      content,
      excerpt,
      author: user.displayName || user.email,
      authorId: req.user.uid,
      category,
      tags: tags || [],
      status: status || "draft",
      featuredImage,
    })

    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/api/posts/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status, featuredImage } = req.body

    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    post.title = title || post.title
    post.content = content || post.content
    post.excerpt = excerpt || post.excerpt
    post.category = category || post.category
    post.tags = tags || post.tags
    post.status = status || post.status
    post.featuredImage = featuredImage || post.featuredImage
    post.updatedAt = new Date()

    await post.save()
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/api/posts/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ postId: req.params.id })

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Comment Routes
app.get("/api/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/posts/:postId/comments", verifyToken, async (req, res) => {
  try {
    const { content } = req.body

    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const newComment = new Comment({
      postId: req.params.postId,
      author: user.displayName || user.email,
      authorId: req.user.uid,
      content,
    })

    await newComment.save()
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/api/comments/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }

    // Check if user owns the comment or is admin
    const user = await User.findOne({ firebaseUid: req.user.uid })
    if (comment.authorId !== req.user.uid && user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized" })
    }

    await Comment.findByIdAndDelete(req.params.id)
    res.json({ message: "Comment deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin Routes
app.get("/api/admin/stats", verifyToken, requireAdmin, async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments()
    const publishedPosts = await Post.countDocuments({ status: "published" })
    const draftPosts = await Post.countDocuments({ status: "draft" })
    const totalComments = await Comment.countDocuments()
    const totalUsers = await User.countDocuments()

    const totalViews = await Post.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }])

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalComments,
      totalUsers,
      totalViews: totalViews[0]?.total || 0,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/admin/posts", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query

    const query = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }]
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Post.countDocuments(query)

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/admin/users", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments()

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Categories Route
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Post.distinct("category", { status: "published" })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search Route
app.get("/api/search", async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query

    if (!q) {
      return res.status(400).json({ error: "Search query required" })
    }

    const query = {
      status: "published",
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ],
    }

    if (category && category !== "all") {
      query.category = category
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(Number.parseInt(limit))

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
