import "./CreatePost.css";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPost, setNewPost] = useState({});

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
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
        "http://localhost:5000/api/posts/imageUpload",
        requestOptions
      );
      const result = await response.json();
      setNewPost({ ...newPost, newPostPicture: result.imageUrl });
    } catch (error) {}
  };

  const post = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("description", newPost.description);
    urlencoded.append("newPostPicture", newPost.newPostPicture);
    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts/createPost",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
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
            {newPost.newPostPicture && (
              <img src={newPost.newPostPicture} alt="post" width="100px" />
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
