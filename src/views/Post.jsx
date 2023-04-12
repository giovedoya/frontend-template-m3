import React, { useState, useEffect } from "react";
import postService from "../services/postService";
import PostCards from "../components/PostCards";
import SearchPost from "../components/SearchPost";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [searchValuePost, setSearchValuePost] = useState("");

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

  const handleSearch = (value) => {
    setSearchValuePost(value);
  };

  const filteredPosts = posts.filter(
    (elem) =>
      elem.title.toLowerCase().includes(searchValuePost.toLowerCase()) ||
      elem.content.toLowerCase().includes(searchValuePost.toLowerCase())
  );

  return (
    <div>
  <div className="bg-white py-4 ">
    <div className="container mx-auto px-4 flex justify-between items-center">      
      <div className="flex-1">
        <p className="text-gray-700">Organizing a wedding is something magical, really special. We want to help you make the most of this unique and unrepeatable moment with the best ideas and the most useful advice. Discover in our articles all the inspiration you are looking for for your big day.</p>
      </div>
      <SearchPost handleSearchValue={handleSearch} />
    </div>
  </div>
  <div className="container mx-auto py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {filteredPosts.map((elem) => (
      <article
        key={elem._id}
        className="bg-white rounded-lg  transform transition duration-400 hover:scale-8"
      >
        <PostCards posts={elem} />
      </article>
    ))}
  </div>
</div>
  )};
