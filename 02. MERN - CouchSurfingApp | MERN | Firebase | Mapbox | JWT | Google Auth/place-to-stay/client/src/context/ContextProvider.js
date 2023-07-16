import { createContext, useContext, useReducer } from "react";

import reducer from "./reducer";

// contains all our public values:
const initialState = {
	currentUser: null,
};

//
const Context = createContext(initialState);

// create a hook to extract values of context easily:
export const useValue = () => {
	return useContext(Context);
};

// Now all the variables inside the state will be available to all components wrapped by this provider
const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		// CAUTION!!! There has to be ad . bevore Provider!
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
