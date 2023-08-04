import tryCatch from "./utils/tryCatch.js";
import Room from "../models/Room.js";

// Creating a new room. Wrapped with tryCatch util function.
export const createRoom = tryCatch(async (req, res) => {
	// Destructuuring the needed values of the user object which was added in the auth middleware:
	const { id: uid, name: uName, photoUrl: uPhoto } = req.user;
	// Creating a new room. We first spread the fields for the room and then add the user info
	const newRoom = new Room({ ...req.body, uid, uName, uPhoto });
	// Then savingg to DB:
	await newRoom.save();
	// Then sending back response
	res.status(201).jason({ success: true, result: newRoom });
});
