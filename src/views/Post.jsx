import React, { useState, useEffect } from "react";
import postService from "../services/postService";
// import { Link } from 'react-router-dom'
import PostCards from "../components/PostCards";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await postService.getPosts();
      setPosts(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
<div className="flex gap-4">
  {posts &&
    posts.length > 0 &&
    posts.map((elem) => {
      return <PostCards key={elem._id} posts={elem} />;
    })}
</div>
  );
}
