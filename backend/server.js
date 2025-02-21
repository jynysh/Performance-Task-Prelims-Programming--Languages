const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Define Blog Schema and Model
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now } // Automatically store date & time
});
const Blog = mongoose.model("Blog", BlogSchema);

// POST endpoint: Create a new blog
app.post("/api/blogs", async (req, res) => {
  console.log("Received POST with data:", req.body);
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    const savedBlog = await newBlog.save();
    console.log("Blog successfully saved:", savedBlog);
    res.json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
});

// GET endpoint: Retrieve all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    // Optionally, sort blogs by newest first:
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log("Current Blogs in DB:", blogs);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blogs" });
  }
});

// DELETE endpoint: Remove a blog by its ID
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    console.log("Blog deleted:", deletedBlog);
    res.json({ message: "Blog deleted", blog: deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
