import React, { useContext, useEffect } from "react";

import Login from "../../components/Login/Login";
import { bgColorContext } from "../../contexts/bgColorContext";
import { useLocation } from "react-router-dom";

export default function LoginView() {
  const { bgColor, setBgColor } = useContext(bgColorContext);

  let location = useLocation();
  console.log("location", location);

  const changeBgColor = () => {
    if (location.pathname === "/login") {
      setBgColor("linear-gradient(45deg, #ffcaa6, #f86594)");
    }
  };

  useEffect(() => {
    changeBgColor();
  }, []);

  return (
    <div className="loginView-container" style={{ background: bgColor }}>
      <Login />
    </div>
  );
}
