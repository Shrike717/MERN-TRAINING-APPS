import express from "express";

import {
	getPosts,
	createPost,
	updatePost, // Edit 1b: Importing controller action
	deletePost, // Delete 1b: Importing controller action
} from "../controllers/posts.js";

// Setting up router
const router = express.Router();

// http://localhost:5000/posts -> Prefix!
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); // Edit 1a: Route
router.delete("/:id", deletePost); // Delete 1a: Route

export default router;
