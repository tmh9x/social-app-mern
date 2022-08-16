import "./HomeView.css";

import React, { useContext, useEffect } from "react";

import Home from "../../components/Home/Home";
import { bgColorContext } from "../../contexts/bgColorContext";
import { useLocation } from "react-router-dom";

export default function HomeView() {
  const { bgColor, setBgColor } = useContext(bgColorContext);

  let location = useLocation();
  console.log("location", location);

  const changeBgColor = () => {
    if (location.pathname === "/") {
      setBgColor("linear-gradient(45deg, #ffcaa6, #f86594)");
    }
  };

  useEffect(() => {
    changeBgColor();
  }, []);

  return (
    <div className="home-container" style={{ background: bgColor }}>
      <Home />
    </div>
  );
}
