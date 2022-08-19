import AppBar from "../../components/AppBar/AppBar";
import NavBar from "../../components/NavBar/NavBar";
import Posts from "../../components/Posts/Posts";
import React from "react";

export default function PostsView() {
  return (
    <>
      <AppBar />
      <Posts />
      <NavBar />
    </>
  );
}
