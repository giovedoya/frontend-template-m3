import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../services/postService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RelatedDreses from "../components/RelatedDreses";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  const getPost = async () => {
    try {
      const response = await postService.getPost(postId);
      setPost(response);
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, [postId]);

  const handleDelete = async (postId) => {
    try {
      const deletedPost = await postService.deletePost(postId);
      setPost(deletedPost);
      navigate("/post");
    } catch (error) {
      console.error(error);
    } finally {
      getPost();
    }
  };

  return (
    <section className="container mx-auto px-8 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {post !== null ? (
          <>
            <img
              className="w-full h-96 object-cover object-center"
              src={post.image}
              alt={post.title}
            />
            <div className="p-6">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              <h2 className="text-2xl font-semibold mb-4">{post.author}</h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex justify-center space-x-4">
                {user &&
                  (user._id === post.author._id || user.role === "admin") && (
                    <>
                      <button className=" hover:bg-blue-600 text-black font-bold py-2 px-4 rounded">
                        <Link to={`/post/${post._id}/edit`}><FaEdit className="inline-block mr-2" /></Link>
                        
                      </button>
                      <button
                        className="px-4 py-2 text-black rounded-lg shadow-md hover:bg-red-700"
                        type="button"
                        onClick={() => handleDelete(post._id)}
                      >
                        <FaTrash className="inline-block mr-2" />
                      </button>
                    </>
                  )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-2xl text-center text-gray-800 font-semibold">
            No post found.
          </p>
        )}

        {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
      </div>

      <RelatedDreses />
    </section>
  );
}
