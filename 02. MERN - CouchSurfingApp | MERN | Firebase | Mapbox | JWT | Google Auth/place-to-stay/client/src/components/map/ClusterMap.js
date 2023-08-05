import React, { useEffect } from "react";
import ReactMapGL from "react-map-gl";

import { useValue } from "../../context/ContextProvider";
import { getRooms } from "../../actions/room";

const ClusterMap = () => {
	// Extracting the rooms from the state:
	const {
		state: { rooms },
		dispatch,
	} = useValue();

	// In the first render we use useEffect to fetch al rooms
	useEffect(() => {
		getRooms(dispatch);
	}, []);

	// This depends on the state rooms chane
	useEffect(() => {}, [rooms]);

	return (
		// This renders the map. Initial locaion is London
		<ReactMapGL
			initialViewState={{ longitude: 0.1276, latitude: 51.5072 }}
			mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		></ReactMapGL>
	);
};

export default ClusterMap;
