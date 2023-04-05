import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import postService from "../services/postService";

export default function NewPost() {
    const initialState = {
        title: "",
        author: "",
        content: "",
        image: "",
    };
   
    const [ newPost, setNewPost] = useState(initialState);
   console.log(newPost)
    const [ error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewPost((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };

      const handleSubmit = async (e) => {
    
        e.preventDefault();
        try {
            console.log("Datos del formulario:", newPost);
          const postNew = await postService.createPost(newPost);     
          console.log(postNew)   
          if (postNew && postNew._id) {
            setError("");
            navigate(`/post/${postNew._id}`);
            setNewPost(initialState);
          } else {
            console.error("No se pudo obtener el ID del vestido");
            setError("No se pudo obtener el ID del vestido");
          }
        } catch (err) {
          console.error(err);
          setError(err);
        }
      };
      

  return (
    <div>
      <h2>Post new</h2>
      <form
        onSubmit={handleSubmit}
      >
        {error && <p>Something went wrong. Couldn't find your post</p>}
        <label>Post title</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        
        <label>author</label>
        <input
          type="text"
          name="author"
          value={newPost.author}
          onChange={handleChange}
          required
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={newPost.image}
          onChange={handleChange}
          required
        />
        <label>Content</label>
        <textarea
        type="text"
        name="content"
        value={newPost.content}
        onChange={handleChange}
        required
        />
        <button type="submit">
          Save changes
        </button>
      </form>
    </div>
  )
}
