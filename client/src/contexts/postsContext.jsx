import { createContext, useState } from "react";

export const postsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/all");
      const results = await response.json();
      setPosts(results.allPosts);
      console.log("results", results.allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <postsContext.Provider value={{ posts, getPosts }}>
      {props.children}
    </postsContext.Provider>
  );
};
