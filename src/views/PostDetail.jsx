import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../services/postService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function PostDetail() {
  const { postId } = useParams();
  const [ post, setPost ] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext)


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
    <section className="container mx-auto px-4 py-8">
  <div className="max-w-2xl mx-auto">
    {post !== null ? (
      <>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <h2 className="text-lg font-semibold mb-4">{post.author}</h2>
        <img
          className="w-full max-w-md mx-auto mb-4"
          src={post.image}
          alt={post.title}
        />
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          {post.content}
        </p>
        <div className="flex justify-center space-x-4">
          {user && (user._id === post.author._id || user.role === "admin") && (
            <>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <Link to={`/post/newpost`}>Create</Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <Link to={`/post/${post._id}/edit`}>Edit post</Link>
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => handleDelete(post._id)}
              >
                Delete post
              </button>
            </>
          )}
        </div>
      </>
    ) : (
      <p>No post found.</p>
    )}

    {error ? <p className="text-red-500">{error}</p> : null}
  </div>
</section>

  );
}
