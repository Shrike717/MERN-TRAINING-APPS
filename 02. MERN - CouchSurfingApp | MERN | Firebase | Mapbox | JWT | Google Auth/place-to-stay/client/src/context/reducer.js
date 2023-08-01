import {
	UPDATE_USER,
	OPEN_LOGIN,
	CLOSE_LOGIN,
	UPDATE_ALERT,
	START_LOADING,
	END_LOADING,
	UPDATE_PROFILE,
	UPDATE_IMAGES,
	DELETE_IMAGE,
	UPDATE_DETAILS,
} from "../constants/actionTypes";

//  the state is managed by a reducer. The reducer function contains all of the state update logic
// reducer - a pure function, accepting a state & action, and returning a new state to he context system
const reducer = (state, action) => {
	switch (action.type) {
		// Checks wether the Login Menu is  open or closed
		case OPEN_LOGIN:
			return { ...state, openLogin: true };
		case CLOSE_LOGIN:
			return { ...state, openLogin: false };

		// Checks loading state
		case START_LOADING:
			return { ...state, loading: true };
		case END_LOADING:
			return { ...state, loading: false };

		// Notifications / Alerts
		case UPDATE_ALERT:
			return { ...state, alert: action.payload };

		// Updates user profile
		case UPDATE_PROFILE:
			return { ...state, profile: action.payload };

		// Checks if a user is looged in or logged out
		case UPDATE_USER:
			localStorage.setItem("currentUser", JSON.stringify(action.payload)); // set current user in localStorage
			return { ...state, currentUser: action.payload };

		// Updates the images
		case UPDATE_IMAGES:
			return {
				...state, // This are the old other images
				images: [...state.images, action.payload],
			}; // payload is the url received from firebase

		// Deleting images
		case DELETE_IMAGE:
			// The imageUrl which should be deleted is filtered ou. All other images pass
			return {
				...state,
				images: state.images.filter(
					(image) => image !== action.payload
				),
			};
		// Updating the details of a room
		case UPDATE_DETAILS:
			// Wee are returning all of the state, then details are the old state of the details and then we add the payload ass an object.
			return {
				...state,
				details: { ...state.details, ...action.payload },
			};

		default:
			throw new Error("No matched actions");
	}
};

export default reducer;
