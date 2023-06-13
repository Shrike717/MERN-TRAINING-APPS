import { combineReducers } from "redux"; // Redux 4a. import this

import posts from "./posts"; // Redux 4b. Import what is needed for a singlle educer

export default combineReducers({
	// Redux 4c. Set combineReducer with single reducer inside
	posts,
});
