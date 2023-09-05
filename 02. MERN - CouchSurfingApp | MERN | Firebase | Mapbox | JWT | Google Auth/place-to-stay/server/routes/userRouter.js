import { Router } from "express";
import {
	register,
	login,
	updateProfile,
	getUsers,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/updateProfile", auth, updateProfile); // auth: HAs to  be user owning his profile
userRouter.get("/", getUsers);

export default userRouter;
