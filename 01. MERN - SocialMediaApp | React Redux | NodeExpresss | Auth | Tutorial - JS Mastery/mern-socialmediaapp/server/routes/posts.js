import express from "express";

import {
	getPosts,
	createPost,
	updatePost, // Edit 1b: Importing controller action
	deletePost, // Delete 1b: Importing controller action
	likePost, // Like 1b: Importing controller action
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

// Setting up router
const router = express.Router();

// http://localhost:5000/posts -> Prefix!
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); // Edit 1a: Route
router.delete("/:id", auth, deletePost); // Delete 1a: Route
router.patch("/:id/likePost", auth, likePost); // Like 1a: Route

export default router;
