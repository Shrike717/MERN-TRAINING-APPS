import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const createPost = async (req, res, next) => {
	const post = req.body;

	const newPost = new PostMessage(post);
	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const updatePost = async (req, res, next) => {
	// Edit 2. Controller action. Then go  to FE
	// /posts/123 => is filling the value of  { _id }
	const { id } = req.params; // Destructuring and renaming it => Mongoosse syntax
	const _id = id;
	const post = req.body; // Extracting updated post from body

	// If not a valid MG _id send back error Message
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	try {
		// Finding, updating an recieving (new: true) post again.
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
			new: true,
		});

		res.status(200).json(updatedPost); // And sending it back
	} catch (error) {
		res.status(409).json({ message: error });
	}
};
