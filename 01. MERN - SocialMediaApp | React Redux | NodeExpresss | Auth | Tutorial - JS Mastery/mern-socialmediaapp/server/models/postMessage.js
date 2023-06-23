import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		title: String,
		message: String,
		name: String,
		creator: String,
		tags: [String],
		selectedFile: String, // This will  be converted to string with react-file-base64
		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
