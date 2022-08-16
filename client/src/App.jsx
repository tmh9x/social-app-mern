import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";

import { BgColorContextProvider } from "./contexts/bgColorContext";
import HomeView from "./views/HomeView/HomeView";
import LoginView from "./views/LoginView/LoginView";
import { PostsContextProvider } from "./contexts/postsContext";
import PostsView from "./views/PostsView/PostsView";
import SignUpView from "./views/SignUpView/SignUpView";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <PostsContextProvider>
        <BgColorContextProvider>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignUpView />} />
            <Route path="/posts" element={<PostsView />} />
          </Routes>
        </BgColorContextProvider>
      </PostsContextProvider>
    </div>
  );
}

export default App;
