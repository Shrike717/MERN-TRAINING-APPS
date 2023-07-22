import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import tryCatch from "./utils/tryCatch.js";

// Wrapped with tryCatch util function
export const register = tryCatch(async (req, res) => {
	const { name, email, password } = req.body;

	if (password.length < 6) {
		return res.status(400).json({
			// return otherwise app crashes because headers are alrady sent
			success: false,
			message: "Password must be at least 6 characters.",
		});
	}
	const emailToLowerCase = email.toLowerCase();
	const existingUser = await User.findOne({ email: emailToLowerCase });
	if (existingUser) {
		return res.status(400).json({
			success: false,
			message: "User already exists.",
		});
	}
	// If we make it this far we can hash the password wih 12 salts:
	const hashedPassword = await bcrypt.hash(password, 12);
	// Creating User in DB
	const user = await User.create({
		name,
		email: emailToLowerCase,
		password: hashedPassword,
	});
	// Now extracting some fields to send back to FE
	const { _id: id, photoUrl } = user;
	// Then creating the token:
	const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	// Then send result:
	res.status(201).json({
		success: true,
		result: { id, name, email: user.email, photoUrl, token },
	});
});

export const login = tryCatch(async (req, res) => {
	const { email, password } = req.body;

	const emailToLowerCase = email.toLowerCase();
	const existingUser = await User.findOne({ email: emailToLowerCase });
	if (!existingUser) {
		return res.status(404).json({
			success: false,
			message: "User does not exists.",
		});
	}
	// Comparing sent pw with pw returned from DB:
	const correctPassword = await bcrypt.compare(
		password,
		existingUser.password
	);
	if (!correctPassword)
		return res
			.status(400)
			.json({ success: false, message: "Invalid credentials." });

	// Now extracting some fields to send back to FE
	const { _id: id, name, photoUrl } = existingUser;
	// Then creating the token:
	const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	// Then send result:
	res.status(200).json({
		success: true,
		result: { id, name, email: emailToLowerCase, photoUrl, token },
	});
});
