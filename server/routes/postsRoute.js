import {
  createPost,
  getPosts,
  uploadPostPicture,
} from "../controllers/postsController.js";

import express from "express";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getPosts);

router.post("/imageUpload", multerUploads.single("image"), uploadPostPicture);
router.post("/createPost", createPost);

export default router;
