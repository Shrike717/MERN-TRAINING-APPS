// Here we store all room related functionality - like api calls - for communicating with BE:

import fetchData from "./utils/fetchData";

import {
	CLOSE_LOGIN,
	END_LOADING,
	START_LOADING,
	UPDATE_ALERT,
	UPDATE_USER,
	UPDATE_PROFILE,
	PATCH,
} from "../constants/actionTypes";

const url = process.env.REACT_APP_SERVER_URL + "/room";

// We have to add current user because we have to send the token
export const createRoom = async (room, currentUser, dispatch) => {
	dispatch({ type: START_LOADING });

	const result = await fetchData(
		{ url, body: room, token: currentUser?.token },
		dispatch
	);

	// If the result is not null we receive an object and update the room:
	if (result) {
		dispatch({
			type: UPDATE_ALERT,
			payload: {
				open: true,
				severity: "success",
				message: "The room has been added successfully",
			},
		});
	}

	dispatch({ type: END_LOADING });
};
