// Image test 9: Creating a model
import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
	{
		description: String,
		imageUrl: String,
	},
	{ timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
