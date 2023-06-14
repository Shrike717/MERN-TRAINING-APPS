import * as api from "../api"; // Redux 13a. Importing everything from api file

// Redux 13b. Creating Action Creators:
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts(); // Fetches all posts from BE through axios call in api/index.js

		dispatch({ type: "FETCH_ALL", payload: data }); // Action that gets dispatched
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post); // Axios request sending new post to BeE triggert from here. Response gets saved

		dispatch({ type: "CREATE", payload: data }); // Action that gets dispatched. Sends response data to postsReducer
	} catch (error) {
		console.log(error);
	}
};
