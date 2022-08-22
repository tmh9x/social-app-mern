import {
  login,
  signUp,
  uploadUserPicture,
} from "../controllers/usersController.js";

import express from "express";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);

router.post("/login", login);
export default router;
