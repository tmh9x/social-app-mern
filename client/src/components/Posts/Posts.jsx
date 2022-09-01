import "./Posts.css";

import React, { useContext, useEffect } from "react";

import Post from "../Post/Post";
import { postsContext } from "../../contexts/postsContext";

export default function Posts() {
  const { posts, getAllPosts } = useContext(postsContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts && posts.map((post) => <Post post={post} />)}
    </div>
  );
}
