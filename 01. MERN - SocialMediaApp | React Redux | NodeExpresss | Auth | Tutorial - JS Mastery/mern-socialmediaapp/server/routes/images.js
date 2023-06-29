// Test images 7: Creating a route
import express from "express";

import { createImage } from "../controllers/images.js";

// Setting up router
const router = express.Router();

router.post("/images", createImage);

export default router;
