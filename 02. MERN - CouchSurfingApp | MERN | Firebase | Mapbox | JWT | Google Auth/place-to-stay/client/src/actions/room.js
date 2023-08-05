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
	RESET_ROOM,
} from "../constants/actionTypes";

const url = process.env.REACT_APP_SERVER_URL + "/room";

// We have to add current user because we have to send the token
export const createRoom = async (room, currentUser, dispatch, setPage) => {
	dispatch({ type: START_LOADING });

	const result = await fetchData(
		{ url, body: room, token: currentUser?.token },
		dispatch
	);

	// If the result is not null we receive an object and return success message:
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

	// After saving room we reset the state again:
	dispatch({ type: RESET_ROOM });
	// This will set the component in the main section to show the cluster map:
	setPage(0);

	dispatch({ type: END_LOADING });
};
