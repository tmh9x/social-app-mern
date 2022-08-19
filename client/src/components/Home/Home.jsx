import "./Home.css";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="home-container">
      <div>
        <h1>Start your Story</h1>
        <div className="button-pos">
          <div>
            <Button
              component={Link}
              to="/login"
              style={{ width: "200px" }}
              variant="contained"
            >
              login
            </Button>
          </div>
          <div>
            <Button
              component={Link}
              to="/signup"
              style={{ width: "200px" }}
              variant="contained"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
