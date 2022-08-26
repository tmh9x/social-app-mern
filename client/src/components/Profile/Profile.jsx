import "./Profile.css";

import { Alert, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { formatDataYyMmDd } from "../../utils/formatDate";
import { getToken } from "../../utils/getToken";

export default function Profile() {
  /* const [selectedFile, setSelectedFile] = useState(null); */
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  /*   const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  }; */

  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  console.log("newUser", newUser);

  const getProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        setNewUser({
          avatarPicture: result.avatarPicture,
          userName: result.userName,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          birthday: result.birthday,
          id: result.id,
        });
      } catch (error) {
        console.log("error getting profile", error);
        setError(error);
      }
    }
  };

  // UPDATE A USER BY ID

  const updateUser = async () => {
    const token = getToken();
    console.log("token", token);
    let urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("birthday", newUser.birthday);
    urlencoded.append("firstName", newUser.firstName);
    urlencoded.append("lastName", newUser.lastName);
    console.log("newUser.birthday", newUser.birthday);
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/updateProfile",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = () => {
    setDisabled((prev) => !prev);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile-container">
      {error && <Alert severity="error">You need to log in first!</Alert>}
      {newUser && (
        <div className="profile-container-content">
          <h2>Profile</h2>

          <div>
            <img
              className="profile-container-image"
              src={newUser.avatarPicture}
              alt=""
            />
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
              name="userName"
              type="text"
              disabled={disabled}
              onChange={handleChange}
              value={newUser.userName ? newUser.userName : ""}
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
              name="firstName"
              type="text"
              disabled={disabled}
              onChange={handleChange}
              value={newUser.firstName ? newUser.firstName : ""}
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
              name="lastName"
              type="text"
              disabled={disabled}
              onChange={handleChange}
              value={newUser.lastName ? newUser.lastName : ""}
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
              name="email"
              type="text"
              disabled={disabled}
              onChange={handleChange}
              value={newUser.email ? newUser.email : ""}
            ></TextField>
          </div>
          <div>
            <TextField
              style={{
                width: "250px",
                borderRadius: "5px",
              }}
              autoComplete="birthday"
              InputLabelProps={{
                shrink: true,
              }}
              id="birthday"
              label="Birthday"
              variant="outlined"
              name="birthday"
              type="date"
              disabled={disabled}
              onChange={handleChange}
              value={newUser.birthday ? formatDataYyMmDd(newUser.birthday) : ""}
            ></TextField>
          </div>
          <div>
            <Button
              variant="outlined"
              style={{
                width: "250px",
              }}
              color="error"
              onClick={handleEdit}
            >
              edit
            </Button>
          </div>
          <div>
            <Button
              style={{
                width: "250px",
              }}
              variant="contained"
              onClick={updateUser}
            >
              save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
