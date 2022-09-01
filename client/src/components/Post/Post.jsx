import "./Post.css";

import { IconButton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendIcon from "@mui/icons-material/Send";
import { authContext } from "../../contexts/authContext";
import { formatDataYyMmDd } from "../../utils/formatDate";

export default function Post(post) {
  const [like, setLike] = useState(false);

  const { getProfile, newUser } = useContext(authContext);
  console.log("newUser", newUser);

  const handleLike = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      postId: post.post._id,
      userId: newUser._id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/like",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error during like", error);
    }

    setLike(!like);
  };

  useEffect(() => {
    getProfile();
    getMessages();
  }, []);

  return (
    <>
      <div className="post-container">
        <p>{post.post._id}</p>

        <div className="post-container-image">
          <img
            src={post.post.postPicture}
            alt=""
            width="390px"
            height="390px"
          />
        </div>

        <div className="post-container-bottom">
          <div>
            <p>{formatDataYyMmDd(post.post.createdAt)}</p>
            <p>{post.post.description}</p>
          </div>
          <div>
            {
              <IconButton onClick={handleLike}>
                {like ? (
                  <FavoriteOutlinedIcon color="error" />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
            }
          </div>
        </div>
        <div>
          <div className="chat-container">
            <div>
              <div className="chat-container-window"></div>
            </div>
            <div>
              <div>
                <TextField
                  id="comments"
                  name="comments"
                  variant="outlined"
                  size="small"
                  onChange={handleMsg}
                  onKeyUp={handleSubmit}
                  type="text"
                />
              </div>
              <div>
                <IconButton onClick={handleSendMsg}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
