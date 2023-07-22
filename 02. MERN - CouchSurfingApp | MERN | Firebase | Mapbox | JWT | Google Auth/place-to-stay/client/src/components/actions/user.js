// Here we store  all user related functionality for communicating wiith BE:

import {
	CLOSE_LOGIN,
	END_LOADING,
	START_LOADING,
	UPDATE_ALERT,
	UPDATE_USER,
} from "../../constants/actionTypes";

import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const register = async (user, dispatch) => {
	dispatch({ type: START_LOADING });

	// Send request with fetch:
	const result = await fetchData(
		{
			url: url + "/register",
			body: user, // Is name, email, password
		},
		dispatch
	);
	// If we receive an object in result we update the user:
	if (result) {
		dispatch({ type: UPDATE_USER, payload: result });
		dispatch({ type: CLOSE_LOGIN }); // Close the sign p modal
		dispatch({
			type: UPDATE_ALERT,
			payload: {
				open: true,
				severity: "success",
				message: "Your account has been created successfully.",
			},
		});
	}

	dispatch({ type: END_LOADING });
};

export const login = async (user, dispatch) => {
	dispatch({ type: START_LOADING });

	// Send request with fetch:
	const result = await fetchData(
		{
			url: url + "/login",
			body: user, // Is name, email, password
		},
		dispatch
	);
	// If we receive an object in result we update the user:
	if (result) {
		dispatch({ type: UPDATE_USER, payload: result });
		dispatch({ type: CLOSE_LOGIN }); // Close the sign p modal
	}

	dispatch({ type: END_LOADING });
};
