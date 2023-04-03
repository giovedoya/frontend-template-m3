import React from "react";
// import { Link } from "react-router-dom";

export default function PostCard(props) {
  const { posts } = props;
    return (
<div className="flex justify-center flex-col items-center">
 <h1>{posts.title}</h1>
 <p>{posts.content}</p>
 </div>
  );
}
