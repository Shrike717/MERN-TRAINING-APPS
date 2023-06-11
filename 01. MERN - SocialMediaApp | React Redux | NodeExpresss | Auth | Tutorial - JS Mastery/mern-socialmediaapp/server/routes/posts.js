import express from "express";

import { getPosts, createPost } from "../controllers/posts.js";

// Setting up router
const router = express.Router();

// http://localhost:5000/posts -> Prefix!
router.get("/", getPosts);
router.post("/", createPost);

export default router;
