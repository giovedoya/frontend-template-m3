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
    const [ error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewPost((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };


      const handleFileUpload = (e) => {     
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        postService
          .uploadImage(uploadData)
          .then(response => {
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };


      const handleSubmit = async (e) => {    
        e.preventDefault();
        try {
          const postNew = await postService.createPost({ ...newPost, image: imageUrl });      
          if (postNew && postNew._id) {
            setImageUrl("");
            setError("");
            navigate(`/post/${postNew._id}`);
            setNewPost(initialState);
          } else {
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
        onSubmit={handleSubmit} encType="multipart/form-data"
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
        <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
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
