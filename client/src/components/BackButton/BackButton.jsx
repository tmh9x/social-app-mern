import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIosOutlinedIcon style={{ color: "#f86594" }} />
    </IconButton>
  );
}
