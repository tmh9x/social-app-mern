import "./SignUpView.css";

import React, { useContext, useEffect } from "react";

import SignUp from "../../components/SignUp/SignUp";
import { bgColorContext } from "../../contexts/bgColorContext";
import { useLocation } from "react-router-dom";

export default function RegisterView() {
  const { bgColor, setBgColor } = useContext(bgColorContext);

  let location = useLocation();
  console.log("location", location);

  const changeBgColor = () => {
    if (location.pathname === "/signup") {
      setBgColor("linear-gradient(45deg, #ffcaa6, #f86594)");
    }
  };

  useEffect(() => {
    changeBgColor();
  }, []);

  return (
    <div className="signup-container" style={{ background: bgColor }}>
      <SignUp />
    </div>
  );
}
