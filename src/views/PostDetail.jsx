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
    <div>  
     {post !== null ? (
  <>
    <h3>{post.title}</h3>
    <h2>{post.author}</h2>          
    <img style={{ width: "300px" }} src={post.image} alt={post.title} />
    <p>{post.content}</p>
    <div>
      {user && (user._id === post.author._id || user.role === "admin") && (
        <>
          <button>
            <Link to={`/post/newpost`}>Create</Link>
          </button>
          <button>
            <Link to={`/post/${post._id}/edit`}>Edit post</Link>
          </button>
          <button type="button" onClick={() => handleDelete(post._id)}>
            Delete post
          </button>
        </>
      )}
    </div>
  </>
) : null}

      {error ? <p>{error}</p> : null}
    </div>
  );
}
