// Test images 8: Creating controller

import Image from "../models/image.js";

export const createImage = async (req, res) => {
	// 4
	console.log(req.body);
	// const imageName = req.file.filename;
	const imageUrl = req.file.path;
	const description = req.body.description;

	// Save this data to a database
	const newImage = new Image({
		description,
		imageUrl,
	});
	try {
		await newImage.save();

		res.status(201).json(newImage);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};
