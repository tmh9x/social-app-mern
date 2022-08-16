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
            <div>{post._id}</div>
            <div className="posts-container-image"></div>
            <div>s{post.description}</div>
            <div>s{post.likes}</div>
          </div>
        ))}
    </div>
  );
}
