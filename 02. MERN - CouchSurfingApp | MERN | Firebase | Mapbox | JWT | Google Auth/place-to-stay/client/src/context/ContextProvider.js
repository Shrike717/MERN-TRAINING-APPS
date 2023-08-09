import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from "react";

import reducer from "./reducer";
import { UPDATE_USER } from "../constants/actionTypes";

// Contains all our global public values:
const initialState = {
	currentUser: null,
	openLogin: false,
	loading: false,
	alert: { open: false, severity: "info", message: "" },
	profile: { open: false, file: null, photoUrl: "" },
	images: [], // Array storing the imageurls from Firebase
	details: { title: "", description: "", price: 0 },
	location: { lng: 0, lat: 0 },
	rooms: [],
	priceFilter: 50, // Default is the maximun price
	addressFilter: null, // This is for the address search in the Sidebar component. It will be lng and lat
	filteredRooms: [], // This is an array with rooms that changess depending on the filter applied
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
	// The ref for controlling the map:
	const mapRef = useRef();
	// The ref for controlling the search box in drawer component:
	const containerRef = useRef();

	useEffect(() => {
		// Getting user from local storage on first rendering
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (currentUser) dispatch({ type: UPDATE_USER, payload: currentUser }); // And updating state if there is one
	}, []);

	return (
		// CAUTION!!! There has to be ad . bevore Provider!
		<Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
