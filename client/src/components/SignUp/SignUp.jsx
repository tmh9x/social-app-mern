import "./SignUp.css";

import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <div className="signup-container">
      <div>
        <h2>Sign Up</h2>
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
