import React from "react";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  const { posts } = props;
    return (
<div>
 <h2 >
    <Link to={`/post/${posts._id}`} >{posts.title}</Link>
  </h2>
 <p>{posts.content}</p>
 </div>
  );
}
