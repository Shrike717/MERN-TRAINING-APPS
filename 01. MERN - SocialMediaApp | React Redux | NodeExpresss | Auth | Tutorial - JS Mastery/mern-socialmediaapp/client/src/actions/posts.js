import * as api from "../api"; // Redux 13a. Importing everything from api file

// Redux 13b. Creating Action Creators:
export const getPosts = () => async (dispatch) => {
	try {
		// const { data } = await api.fetchPosts(); // This was throwing a type error for fetchPosts function
		const { data } = await api.fetchPosts; //  Fetches all posts from BE through axios call in api/index.js

		dispatch({ type: "FETCH_ALL", payload: data }); // Action that gets dispatched
	} catch (error) {
		console.log(error);
	}
};
