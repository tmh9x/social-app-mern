import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function Login() {
  const [userLogin, setUserLogin] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const login = async () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      const { token, user } = result;
      console.log("log in successful", result);
      if (token) {
        localStorage.setItem("token", token);
        navigate("/posts");
      }
    } catch (error) {
      console.log("error during login", error);
    }
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
          name="email"
          type="email"
          onChange={handleChange}
          value={userLogin.email ? userLogin.email : ""}
          required
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          variant="standard"
          name="password"
          type="password"
          onChange={handleChange}
          value={userLogin.password ? userLogin.password : ""}
          required
        />
      </div>
      <div>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={login}
        >
          Log In
        </Button>
      </div>
      <div>
        <p>
          <span>Need an Account? </span>
          <Link to="/signup" underline="hover">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
