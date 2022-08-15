import express from "express";
import { getAllPosts } from "../controllers/postsController.js";

const router = express.Router();

router.get("/all", getAllPosts);

export default router;
