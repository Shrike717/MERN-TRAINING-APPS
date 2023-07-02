import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_SEARCH,
} from "../constants/actionTypes";

// Redux 5. Create posts reducer:
// posts  is the state
const postsReducer = (posts = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case FETCH_ALL:
			return action.payload; // Redux 14. Setting the return to action.payload = Updating the state in store

		case FETCH_BY_SEARCH:
			return action.payload; //  Text Search 17: Setting the return to action.payload = Updating the state in stor
		case DELETE:
			return posts.filter((post) => post._id !== action.payload); // Delete 5: Returns every post exept the deleted one
		case UPDATE:
		case LIKE: // Like 5:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			); // Edit 13: Mapping over posts, find updated post and change it. Otherwise returrn all other posts

		case CREATE:
			return [...posts, action.payload]; // Updating the state in store
		default:
			return posts;
	}
};

export default postsReducer;
