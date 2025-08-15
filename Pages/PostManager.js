import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostManager.css"; 

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editData, setEditData] = useState({ name: "" });
  const [newPost, setNewPost] = useState({ name: "" });

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4004/api/post?limit=10&start=1");
      setPosts(res.data.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      alert("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditPostId(post._id);
    setEditData({ name: post.name || "" });
  };

  const handleUpdate = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:4004/api/post/update?post_Id=${postId}`, editData);
      if (response.data.success) {
        alert("Post updated successfully!");
        setEditPostId(null);
        setEditData({ name: "" });
        fetchPosts();
      } else {
        alert("Failed to update post.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post.");
    }
  };

  const handleDelete = async (post_Id) => {
    try {
      await axios.delete(`http://localhost:4004/api/postd/?post_id=${post_Id}`);
      alert("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  const handleAddPost = async () => {
    try {
      if (!newPost.name.trim()) {
        alert("Post name cannot be empty");
        return;
      }
      await axios.post("http://localhost:4004/api/post", newPost);
      alert("New post added");
      setNewPost({ name: "" });
      fetchPosts();
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add post.");
    }
  };

  return (
    <div className="post-manager">
      <h1> Post Manager</h1>

      <div className="add-post">
        <input
          type="text"
          placeholder="Enter new post name"
          value={newPost.name}
          onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
        />
        <button onClick={handleAddPost}> Add</button>
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            {editPostId === post._id ? (
              <div className="add-post">
                <input
                  type="text"
                  className="edit-input"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <button onClick={() => handleUpdate(post._id)} className="save-btn post-buttons" >
                Edit </button>
                <button onClick={() => setEditPostId(null)} className="cancel-btn post-buttons">
               cancel </button>
              </div>
            ) : (
              <>
                <p><strong>ID:</strong> {post._id}</p>
                <p><strong>Name:</strong> {post.name}</p>
                {post.createdAt && (
                  <p><strong>Created:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                )}
                {post.updatedAt && (
                  <p><strong>Updated:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
                )}
                <div className="post-buttons">
                  <button onClick={() => handleEdit(post)} className="edit-btn">✏️ Edit</button>
                  <button onClick={() => handleDelete(post._id)} className="delete-btn">🗑️ Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostManager;
