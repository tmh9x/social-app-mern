import { createContext, useState } from "react";

export const postsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const requestOptions = {
      method: "GET",
    };
    try {
      const response = await fetch(
        "https://social-app-mern-backend-tmh9x.vercel.app/api/posts/all",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      const posts = result.post;
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <postsContext.Provider value={{ posts, getAllPosts, setPosts }}>
      {props.children}
    </postsContext.Provider>
  );
};
