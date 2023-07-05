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
const postsReducer = (state = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				totalNumberOfPages: action.payload.totalNumberOfPages,
			}; // Redux 14. Setting the return to action.payload = Updating the state in store

		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload }; //  Text Search 17: Setting the return to action.payload = Updating the state in stor
		case DELETE:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post._id !== action.payload
				),
			}; // Delete 5: Returns every post exept the deleted one
		case UPDATE:
		case LIKE: // Like 5:
			// console.log(
			// 	"This is the state in reducer UPDATE before stored in store",
			// 	state
			// );
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			}; // Edit 13: Mapping over posts, find updated post and change it. Otherwise returrn all other posts

		case CREATE:
			// console.log(
			// 	"This is the state in reducer CREATE before stored in store",
			// 	state,
			// 	action.payload
			// );
			return { ...state, posts: action.payload }; // Updating the state in store
		default:
			return state;
	}
};

export default postsReducer;
