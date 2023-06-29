// Test images 8: Creeaing controller
export const createImage = async (req, res) => {
	// 4
	const imageName = req.file.filename;
	const description = req.body.description;

	// Save this data to a database probably

	console.log(description, imageName);
	res.send({ description, imageName });
};
