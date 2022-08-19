import AppBar from "../../components/AppBar/AppBar";
import CreatePost from "../../components/CreatePost/CreatePost";
import NavBar from "../../components/NavBar/NavBar";
import React from "react";

export default function CreatePostView() {
  return (
    <div className="cratepostview-container">
      <AppBar />
      <CreatePost />
      <NavBar />
    </div>
  );
}
