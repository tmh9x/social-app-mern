import {
  createMessage,
  createPost,
  deletePost,
  getPosts,
  uploadPostPicture,
} from "../controllers/postsController.js";

import express from "express";
import jwtAuth from "../utils/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getPosts);

router.post(
  "/imageUpload",
  /*  jwtAuth, */
  multerUploads.single("image"),
  uploadPostPicture
);
router.post("/createPost", jwtAuth, createPost);
router.post("/deletePost", jwtAuth, deletePost);

router.post("/message", createMessage);

export default router;
