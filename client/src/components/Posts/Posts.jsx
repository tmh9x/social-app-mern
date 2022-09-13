import "./Posts.css";

import React, { useContext, useEffect } from "react";

import Post from "../Post/Post";
import opps from "../../assets/opps-error.png";
import { postsContext } from "../../contexts/postsContext";

export default function Posts() {
  const { posts, getAllPosts } = useContext(postsContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts ? (
        posts.map((post, i) => <Post key={i} post={post} />)
      ) : (
        <div style={{ position: "relative", top: "30%" }}>
          <div>
            <img src={opps} alt="" />
          </div>
          <p>You don't have any posts yet.</p>
        </div>
      )}
    </div>
  );
}
