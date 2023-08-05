import { Router } from "express";

import auth from "../middleware/auth.js";
import { createRoom, getRooms } from "../controllers/room.js";

const roomRouter = Router();

roomRouter.post("/", auth, createRoom);
roomRouter.get("/", auth, getRooms);

export default roomRouter;
