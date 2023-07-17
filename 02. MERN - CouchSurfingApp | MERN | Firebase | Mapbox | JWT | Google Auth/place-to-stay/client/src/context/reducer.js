import { UPDATE_USER, OPEN_LOGIN, CLOSE_LOGIN } from "../constants/actionTypes";

//  the state is managed by a reducer. The reducer function contains all of the state update logic
// reducer - a pure function, accepting a state & action, and returning a new state to he context system
const reducer = (state, action) => {
	switch (action.type) {
		// Checks wether the Login Menu is  open or closed
		case OPEN_LOGIN:
			return { ...state, openLogin: true };
		case CLOSE_LOGIN:
			return { ...state, openLogin: false };
		// Checks if a user is looged in or logged out
		case UPDATE_USER:
			return { ...state, currentUser: action.payload };

		default:
			throw new Error("No matched actions");
	}
};

export default reducer;
