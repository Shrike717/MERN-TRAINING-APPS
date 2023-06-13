// Redux 5. Create posts reducer:
// posts  is the state
const postsReducer = (posts = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case "FETCH_ALL":
			return action.payload; // Redux 14. Setting the return to action.payload
		case "CREATE":
			return [...posts, action.payload];
		default:
			return posts;
	}
};

export default postsReducer;
