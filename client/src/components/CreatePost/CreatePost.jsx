import "./CreatePost.css";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { getToken } from "../../utils/getToken";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  console.log("abc", description);

  const navigate = useNavigate();

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setDescription(e.target.value);
  };

  const createHeader = () => {
    const token = getToken();
    console.log("token", token);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    return myHeaders;
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/posts/imageUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      return result.imageUrl;
    } catch (error) {}
  };

  const post = async () => {
    const img = await uploadImage();

    let urlencoded = new URLSearchParams();
    console.log("NEWPOST", description);
    urlencoded.append("description", description);
    urlencoded.append("newPostPicture", img);
    const token = getToken();
    console.log("token", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      const requestOptions = {
        method: "POST",
        body: urlencoded,
        headers: myHeaders,
        redirect: "follow",
      };
      console.log("createHeader", createHeader());
      try {
        const response = await fetch(
          "http://localhost:5000/api/posts/createPost",
          requestOptions
        );
        console.log("response", response);
        const results = await response.text();
        console.log("results", results);
        navigate("/posts");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="createpost-container">
      <div>
        <h2>Create your Story</h2>
      </div>
      <div>
        <form>
          <div className="upload-container">
            <label htmlFor="upload"></label>
            <input id="upload" type="file" onChange={handleFile} />
            {description.newPostPicture && (
              <img src={description.newPostPicture} alt="post" width="100px" />
            )}
          </div>
        </form>
      </div>
      <div>
        <TextareaAutosize
          name="description"
          placeholder="Write your description here..."
          style={{ width: "250px", height: "150px" }}
          onChange={handleChange}
        ></TextareaAutosize>
      </div>
      <div>
        <Button variant="contained" onClick={post}>
          post
        </Button>
      </div>
    </div>
  );
}
