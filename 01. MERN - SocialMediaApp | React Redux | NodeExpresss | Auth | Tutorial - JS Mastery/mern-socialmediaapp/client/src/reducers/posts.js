// Redux 5. Create posts reducer:
// posts  is the state
const postsReducer = (posts = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case "DELETE":
			return posts.filter((post) => post._id !== action.payload); // Delete 5: Returns every post exept the deleted one
		case "UPDATE":
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			); // Edit 13: Mapping ove posts, find updated post and change it. Otherwise returrn all otther posts
		case "FETCH_ALL":
			return action.payload; // Redux 14. Setting the return to action.payload = Updating the state in store
		case "CREATE":
			return [...posts, action.payload]; // Updating the state in store
		default:
			return posts;
	}
};

export default postsReducer;
