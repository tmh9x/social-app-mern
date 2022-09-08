import "./NavBar.css";

import React, { useContext } from "react";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

export default function NavBar() {
  const { newUser } = useContext(authContext);

  return (
    <div className="navbar-container">
      <div>
        <Link to="/posts">
          <ImageOutlinedIcon fontSize="large" />
        </Link>
      </div>
      <div>
        <IconButton>
          <Link to="/create">
            <AddCircleOutlineOutlinedIcon fontSize="large" />
          </Link>
        </IconButton>
      </div>
      <div>
        <Link to="/profile">
          <Avatar
            alt="Travis Howard"
            src={newUser.avatarPicture}
            style={{
              width: "30px",
              height: "30px",
              position: "relative",
              top: "9px",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
