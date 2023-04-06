import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/postService";

export default function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({ });
  const [imageUrl, setImageUrl] = useState(""); 
  const [isUploading, setIsUploading] = useState(false); 
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
  
  const handleFileUpload = (e) => {
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);     
    postService
      .uploadImage(uploadData)
      .then(response => {
        setIsUploading(false);
        setImageUrl(response.fileUrl);
      })
      .catch(err => {
        setIsUploading(false); 
        console.log("Error while uploading the file: ", err)
      });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {    
      const updatedPost = {
        title: post.title,
        author: post.author,
        content: post.content,
        image: imageUrl,        
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
        <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
        <label>Description</label>
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />               
        <button type="submit" disabled={isUploading}>
        {isUploading ? 'Loading...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
