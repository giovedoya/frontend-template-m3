import React from "react";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  const { posts } = props;
    return (
<div className="bg-white p-4 rounded-lg shadow-lg">
  <div className="flex flex-col items-center justify-center">
    <img
      className="max-w-sm w-full h-auto mb-4 transition duration-500 ease-in-out transform hover:scale-105"
      src={posts.image}
      alt={posts.title}
    />
    <h2 className="text-2xl font-bold mb-2 text-center">
      <Link to={`/post/${posts._id}`} className="text-black hover:text-blue-700">
        {posts.title}
      </Link>
    </h2>
    <p className="text-gray-700 text-center">
      {posts.content.substring(0, 100)}...
    </p>
  </div>
</div>

    )}
