import "./CreatePost.css";

import Button from "@mui/material/Button";
import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function CreatePost() {
  return (
    <div className="createpost-container">
      <div>
        <h2>Tell your Story</h2>
      </div>
      <div>
        <input type="file" name="post" id="post" />
      </div>
      <div>
        <TextareaAutosize
          name="desciption"
          placeholder="Write your description here..."
          style={{ width: "250px", height: "150px" }}
        ></TextareaAutosize>
      </div>
      <div>
        <Button variant="contained">send</Button>
      </div>
    </div>
  );
}
