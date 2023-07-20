// For testing authorization: User adds dummy  room:
export const createRoom = async (req, res) => {
	// Testing ressource access:
	res.status(201).json({
		success: true,
		result: { id: 123, title: "Test Room" },
	});
};
