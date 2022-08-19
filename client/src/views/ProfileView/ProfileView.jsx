import AppBar from "../../components/AppBar/AppBar";
import NavBar from "../../components/NavBar/NavBar";
import Profile from "../../components/Profile/Profile";
import React from "react";

export default function ProfileView() {
  return (
    <div>
      <AppBar />
      <Profile />
      <NavBar />
    </div>
  );
}
