import "./Posts.css";

import React, { useContext, useEffect } from "react";

import { postsContext } from "../../contexts/postsContext";

export default function Posts() {
  const { posts, getPosts } = useContext(postsContext);

  console.log("posts", posts);
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post, index) => (
          <div key={index} className="posts-container">
            <p>{post._id}</p>
            <div className="posts-container-image"></div>
            <p>{post.description}</p>
            <p>{post.likes}</p>
          </div>
        ))}
    </div>
  );
}
