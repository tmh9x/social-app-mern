import "./Profile.css";

import { Button, TextField } from "@mui/material";

import React from "react";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-container-content">
        <h2>Profile</h2>

        <div className="profile-container-image">
          <img src="" alt="" />
        </div>

        <div>
          <TextField
            style={{
              width: "250px",
              borderRadius: "5px",
            }}
            id="userName"
            label="Username"
            variant="outlined"
            type="text"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{
              width: "250px",
              borderRadius: "5px",
            }}
            id="firstName"
            label="Firstname"
            variant="outlined"
            type="text"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{
              width: "250px",
              borderRadius: "5px",
            }}
            id="lastName"
            label="Lastname"
            variant="outlined"
            type="text"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{
              width: "250px",
              borderRadius: "5px",
            }}
            id="email"
            label="Email"
            variant="outlined"
            type="text"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{
              width: "250px",
              borderRadius: "5px",
            }}
            id="birthday"
            label="Birthday"
            variant="outlined"
            type="text"
          ></TextField>
        </div>
        <div>
          <Button
            style={{
              width: "250px",
            }}
            variant="contained"
          >
            save
          </Button>
        </div>
      </div>
    </div>
  );
}
