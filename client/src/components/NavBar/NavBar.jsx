import "./NavBar.css";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Link } from "react-router-dom";
import React from "react";

export default function NavBar() {
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
            src="/static/images/avatar/2.jpg"
            style={{ width: "30px", height: "30px" }}
          />
        </Link>
      </div>
    </div>
  );
}
