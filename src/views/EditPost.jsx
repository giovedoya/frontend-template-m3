import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/postService";

export default function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({ });

  
  const [error, setError] = useState(false);
  const navigate = useNavigate();

 
  const getPost = async () => {
    try {
      const response = await postService.getPost(postId);
      setPost({
        ...response,
        title: response.title || '',
        neckline: response.author || '',
        court: response.content || '',
        long: response.image || '',        
      });
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {    
      const updatedPost = {
        title: post.title,
        author: post.author,
        content: post.content,
        image: post.image,        
      };
      await postService.editPost(postId, updatedPost);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };
   

  return (
    <div>
      <h2>Post edit</h2>
      <form
        onSubmit={handleSubmit}
      >
        {error && <p>Something went wrong. Couldn't find your post</p>}
        <label>Title Name</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />        
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          required
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={post.image}
          onChange={handleChange}
          required
        /> 
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />               
        <button type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
