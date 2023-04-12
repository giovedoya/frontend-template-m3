import React, { useState, useEffect } from "react";
import postService from "../services/postService";
// import { Link } from 'react-router-dom'
import PostCards from "../components/PostCards";


export default function Post() {
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
    <div className="flex flex-wrap justify-center gap-4 mx-4">      
      {posts &&
        posts.length > 0 &&
        posts.map((elem) => {
          return (
            <article
              key={elem._id}
              className="bg-white rounded-lg p-6 w-full lg:w-1/2 xl:w-1/3 mx-4 my-4"
            >
              <PostCards posts={elem} />
            </article>
          );
        })}
    </div>
  );
}
