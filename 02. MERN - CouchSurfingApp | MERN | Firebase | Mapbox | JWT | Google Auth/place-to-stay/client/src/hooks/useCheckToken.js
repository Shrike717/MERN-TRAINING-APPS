import { useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import jwtDecode from "jwt-decode";

import { UPDATE_USER } from "../constants/actionTypes";

// Checks expiry date of token
const useCheckToken = () => {
	const {
		state: { currentUser },
		dispatch,
	} = useValue();

	useEffect(() => {
		if (currentUser) {
			const decodedToken = jwtDecode(currentUser.token);
			// Unix timestamp * 1000
			if (decodedToken.exp * 1000 < new Date().getTime())
				dispatch({ type: UPDATE_USER, payload: null }); // Logs
		}
	}, []);
};

export default useCheckToken;
