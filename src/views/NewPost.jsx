import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postService from "../services/postService";

export default function NewPost() {
  const initialState = {
    title: "",
    author: "",
    content: "",
    image: "",
  };

  const [newPost, setNewPost] = useState(initialState);
  const [error, setError] = useState("");
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
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postNew = await postService.createPost({
        ...newPost,
        image: imageUrl,
      });
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
    <section className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Post new</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {error && (
            <p className="text-red-500">
              Something went wrong. Couldn't find your post
            </p>
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="font-bold text-gray-700">
              Post title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={newPost.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="author" className="font-bold text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={newPost.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="image" className="font-bold text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleFileUpload(e)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleFileUpload(e)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="content" className="font-bold text-gray-700">
              Content
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              value={newPost.content}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              rows="5"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
