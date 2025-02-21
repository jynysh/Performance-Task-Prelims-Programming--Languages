import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs", formData);
      setFormData({ title: "", content: "", author: "" });
      fetchBlogs();
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting blog with id:", id);
    try {
      const res = await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      console.log("Delete response:", res.data);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container">
      <h1>STI Pasay-EDSA Student Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <button type="submit">Post Blog</button>
      </form>

      <h2>All Blogs</h2>
      {blogs.map((blog) => {
        // Format the creation date using toLocaleString()
        const formattedDate = new Date(blog.createdAt).toLocaleString();
        return (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>By {blog.author}</small>
            <br />
            <small>Published on: {formattedDate}</small>
            <br />
            <button onClick={() => handleDelete(blog._id)} className="delete-btn">
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
