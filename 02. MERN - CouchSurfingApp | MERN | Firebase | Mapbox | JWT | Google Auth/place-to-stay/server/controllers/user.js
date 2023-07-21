import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (password.length < 6)
			res.status(400).json({
				success: false,
				message: "Password must be at least 6 characters",
			});
		const emailToLowerCase = email.toLowerCase();
		const existingUser = await User.findOne({ email: emailToLowerCase });
		if (existingUser)
			res.status(400).json({
				success: false,
				message: "User already exists",
			});
		// If we make it this far we can hash the password wih 12 salts:
		const hashedPassword = await bcrypt.hash(password, 12);
		// Creatin User in DB
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
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong. Try again later.",
		});
	}
};
