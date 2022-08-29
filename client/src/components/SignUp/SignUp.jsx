import "./SignUp.css";

import { Alert, TextField } from "@mui/material";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [showAlert, setShowAlert] = useState();

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      setNewUser({ ...newUser, avatarPicture: result.imageUrl });
    } catch (error) {}
  };

  const signUp = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("firstName", newUser.firstName);
    urlencoded.append("lastName", newUser.lastName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("birthday", newUser.birthday);

    urlencoded.append(
      "avatarPicture",
      newUser.avatarPicture
        ? newUser.avatarPicture
        : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    );
    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
      setShowAlert(results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="signup-container">
      {showAlert && (
        <div>
          <Alert severity={showAlert.success ? "success" : "error"}>
            {showAlert.message}
            {showAlert.success && (
              <div>
                Please <Link to="/login">log in </Link>to your Account.
              </div>
            )}
          </Alert>
        </div>
      )}
      <div>
        <h2>Sign Up</h2>
      </div>
      <div>
        <TextField
          id="username"
          label="Username"
          variant="standard"
          name="userName"
          type="text"
          onChange={handleChange}
          value={newUser.userName ? newUser.userName : ""}
          required
        />
      </div>
      <div>
        <TextField
          id="firstName"
          label="Firstname"
          variant="standard"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={newUser.firstName ? newUser.firstName : ""}
          required
        />
      </div>
      <div>
        <TextField
          id="lastName"
          label="Lastname"
          variant="standard"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={newUser.lastName ? newUser.lastName : ""}
          required
        />
      </div>
      <div>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          name="email"
          type="email"
          onChange={handleChange}
          value={newUser.email ? newUser.email : ""}
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
          value={newUser.password ? newUser.password : ""}
          required
        />
      </div>
      <div>
        <TextField
          id="birthday"
          variant="standard"
          name="birthday"
          type="date"
          onChange={handleChange}
          value={newUser.birthday ? newUser.birthday : ""}
        />
      </div>
      <div>
        <form>
          <div className="upload-container">
            <label htmlFor="upload">
              {/*  <img src={Upload} alt="" width="70px" /> */}
            </label>
            <input
              id="upload"
              type="file"
              onChange={handleFile}

              /*  style={{ display: "none" }} */
            />
            {newUser.avatarPicture && (
              <img src={newUser.avatarPicture} alt="userPic" width="100px" />
            )}
          </div>
          <div>
            <Button variant="outlined" size="small" onClick={submitForm}>
              upload
            </Button>
          </div>
        </form>
      </div>
      <div>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={signUp}
        >
          Sign Up
        </Button>
      </div>
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
