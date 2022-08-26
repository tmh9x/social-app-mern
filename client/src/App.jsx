import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/authContext";
import { BgColorContextProvider } from "./contexts/bgColorContext";
import CreatePostView from "./views/CreatePostView/CreatePostView";
import HomeView from "./views/HomeView/HomeView";
import LoginView from "./views/LoginView/LoginView";
import { PostsContextProvider } from "./contexts/postsContext";
import PostsView from "./views/PostsView/PostsView";
import ProfileView from "./views/ProfileView/ProfileView";
import SignUpView from "./views/SignUpView/SignUpView";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostsContextProvider>
          <BgColorContextProvider>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignUpView />} />
              <Route path="/posts" element={<PostsView />} />
              <Route path="/create" element={<CreatePostView />} />
              <Route path="/profile" element={<ProfileView />} />
            </Routes>
          </BgColorContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
