import { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { UPDATE_USER } from "../constants/actionTypes";

// Contains all our global public values:
const initialState = {
	currentUser: null,
	openLogin: false,
	loading: false,
	alert: { open: false, severity: "info", message: "" },
	profile: { open: false, file: null, photoUrl: "" },
	images: [],
	details: { title: "", description: "", price: 0 },
};

// Initiialising the context
const Context = createContext(initialState);

// create a hook to extract values of context easily:
export const useValue = () => {
	return useContext(Context);
};

// Now all the variables inside the state will be available to all components wrapped by this provider
const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		// Getting user from local storage on first rendering
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (currentUser) dispatch({ type: UPDATE_USER, payload: currentUser }); // And updating state if there is one
	}, []);

	return (
		// CAUTION!!! There has to be ad . bevore Provider!
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
