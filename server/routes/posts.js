import Post from "../models/postModel.js";
import express from "express";

const router = express.Router();

router.get("/posts", (req, res) => {
  try {
    Post.find({}, function (err, posts) {
      if (err) {
        res.send(err);
      } else {
        res.send(posts);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
});
export default router;
