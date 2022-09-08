import "./Post.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendIcon from "@mui/icons-material/Send";
import { authContext } from "../../contexts/authContext";
import { formatDataYyMmDd } from "../../utils/formatDate";
import { postsContext } from "../../contexts/postsContext";

export default function Post(post) {
  const [like, setLike] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const { getAllPosts } = useContext(postsContext);
  const { newUser, getProfile } = useContext(authContext);
  console.log("newUser", newUser);

  const handleMsg = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setChatMsg(e.target.value);
  };

  const handleSendMsg = async (e) => {
    const newChatMsg = {
      userId: newUser._id,
      postId: post.post._id,
      message: chatMsg,
    };
    console.log("newChatMsg", newChatMsg);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newChatMsg),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts/message",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
      getAllPosts();
      setChatMsg("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  const handleDelete = async () => {
    let urlencoded = new URLSearchParams();
    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts/deletePost",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
      getAllPosts();
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  const handleLike = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      postId: post.post._id,
      userId: newUser._id,
    });

    console.log("newUser", newUser);
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
  }, []);

  console.log("post", post.post);

  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <div>
            <h3>{post.post.author.userName}</h3>
            <p>{post.post.description}</p>
          </div>
          <div>
            <img src={post.post.author.avatarPicture} />
          </div>
        </div>

        <div className="post-container-image">
          <img
            src={post.post.postPicture}
            alt=""
            width="390px"
            height="390px"
          />
        </div>

        <div>
          <div className="post-container-bottom">
            <div>
              <p>postet at: {formatDataYyMmDd(post.post.createdAt)}</p>
            </div>

            <div className="likeButton">
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
        </div>
        <div>
          <div className="chat-container">
            <Accordion className="chat-container-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {post.post.messages &&
                  post.post.messages.map((e, i) => (
                    <div key={i} className="post-container-messages">
                      <div className="post-container-messages-header">
                        <h3>{post.post.author.userName}</h3>
                        <p>{formatDataYyMmDd(e.date)}</p>
                      </div>

                      <p>{e.message}</p>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>

            <div className="post-container-input">
              <div>
                <TextField
                  id="comments"
                  name="comments"
                  variant="outlined"
                  size="small"
                  onChange={handleMsg}
                  /*   onKeyUp={handleSubmit} */
                  type="text"
                  value={chatMsg}
                />
              </div>
              <div>
                <IconButton onClick={handleSendMsg}>
                  <SendIcon />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
