import "./Login.css";

import { Link, TextField } from "@mui/material";
import React, { useContext, useState } from "react";

/* import BackButton from "../BackButton/BackButton"; */
import Button from "@mui/material/Button";
/* import { authContext } from "../../contexts/authContext"; */
import { useNavigate } from "react-router-dom";

export default function Login() {
  /*   const { login } = useContext(authContext); */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password);
    navigate("/characters");
  };

  return (
    <div className="login-container" action="">
      <div>
        <h2>Log In</h2>
      </div>
      <div>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          type="email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </div>
      <div>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
      <div>
        <p>
          <span>Need an Account? </span>
          <Link href="signup" underline="hover">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
