import { UPDATE_USER } from "../constants/actionTypes";

//  the state is managed by a reducer. The reducer function contains all of the state update logic
// reducer - a pure function, accepting a state & action, and returning a new state to he context system
const reducer = (state, action) => {
	switch (action.type) {
		// Checks if a useer is looged in or logged out
		case UPDATE_USER:
			return { ...state, currentUser: action.payload };

		default:
			throw new Error("No matched actions");
	}
};

export default reducer;
