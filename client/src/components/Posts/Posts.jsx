import "./Posts.css";

import React, { useContext, useEffect } from "react";

import { formatDataYyMmDd } from "../../utils/formatDate";
import { postsContext } from "../../contexts/postsContext";

export default function Posts() {
  const { posts, getAllPosts } = useContext(postsContext);

  console.log("POSTS", posts);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post, index) => (
          <div key={index} className="posts-container">
            <p>{post._id}</p>
            <div className="posts-container-image">
              <img src={post.postPicture} alt="" width="390px" />
            </div>
            <p>{formatDataYyMmDd(post.createdAt)}</p>
            <p>{post.description}</p>
          </div>
        ))}
    </div>
  );
}
