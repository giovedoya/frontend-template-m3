import React from "react";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  const { posts } = props;
    return (
<div className="bg-white p-4 rounded-lg shadow-lg">
  <div className="flex flex-col">
    <img className="max-w-sm w-full h-auto mb-4" src={posts.image} alt={posts.title} />
    <h2 className="text-lg font-bold mb-2">
      <Link to={`/post/${posts._id}`} className="text-blue-500 hover:text-blue-700">{posts.title}</Link>
    </h2>
    <p className="text-gray-700">{posts.content.substring(0, 100)}...</p>
  </div>
</div>


    )}
