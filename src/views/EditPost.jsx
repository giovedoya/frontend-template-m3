import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/postService";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

export default function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); 
  const [isUploading, setIsUploading] = useState(false); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // const [content, setContent] = useState(post.content);
 
  const getPost = async () => {
    try {
      const response = await postService.getPost(postId);
      setPost({
        ...response,
        title: response.title || '',
        author: response.author || '',
        content: response.content || '',
        image: response.imageUrl || '',        
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

  // const handleContentChange = (value) => {
  //   setPost((prev) => {
  //     return {
  //       ...prev,
  //       content: value,
  //     };
  //   });
  //   setContent(value);
  // };

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

<section className="container mx-auto px-4 py-8 flex justify-center">
  <div className="w-full max-w-2xl">
    <h2 className="text-2xl font-bold mb-4 text-center">Edit post</h2>
    {error && (
        <p className="text-red-500">
          Something went wrong. Couldn't find your post
        </p>
      )}
   {post &&  <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-4"
    >
      
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="block mb-1 font-bold text-gray-700">
          Post title
        </label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        {/* <ReactQuill value={content} onChange={handleContentChange} /> */}
      <button onSubmit={handleSubmit}>Submit</button>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="author" className="block mb-1 font-bold text-gray-700">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="image" className="block mb-1 font-bold text-gray-700">
          Image
        </label>
        <input
          type="file"
          name="image"
          value={post.image}
          onChange={(e) => handleFileUpload(e)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="content" className="block mb-1 font-bold text-gray-700">
          Content
        </label>
        <textarea
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
          rows="5"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isUploading ? 'Loading...' : 'Save changes'}
        </button>
      </div>
    </form>}
  </div>
</section>



  );
}
