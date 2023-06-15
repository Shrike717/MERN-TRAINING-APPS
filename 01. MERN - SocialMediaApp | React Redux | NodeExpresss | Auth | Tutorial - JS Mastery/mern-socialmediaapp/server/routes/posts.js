import express from "express";

import { getPosts, createPost, updatePost } from "../controllers/posts.js";

// Setting up router
const router = express.Router();

// http://localhost:5000/posts -> Prefix!
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); // Edit 1. Route

export default router;
