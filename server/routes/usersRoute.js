import {
  getProfile,
  login,
  signUp,
  updateUser,
  uploadUserPicture,
} from "../controllers/usersController.js";

import express from "express";
import jwtAuth from "../utils/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);

router.post("/login", login);

router.get("/profile", jwtAuth, getProfile);
router.post("/updateProfile", jwtAuth, updateUser);

export default router;
