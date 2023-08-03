import React from "react";
import { Box } from "@mui/material";

import ReactMapGL, { Marker } from "react-map-gl"; // This is the map component
import "mapbox-gl/dist/mapbox-gl.css"; // Importing the mapbox-gl styles

import { useValue } from "../../../context/ContextProvider";
import { UPDATE_LOCATION } from "../../../constants/actionTypes";

const AddLocation = () => {
	// Getting the location from state
	const {
		state: {
			location: { lng, lat },
		},
		dispatch,
	} = useValue();
	// console.log(lng, lat);
	return (
		<Box
			sx={{
				height: 400,
				position: "relative", // To contain our map
			}}
		>
			<ReactMapGL
				mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
				initialViewState={{
					// The place which is shown on map when starting
					longitude: lng,
					latitude: lat,
					zoom: 8,
				}}
				mapStyle="mapbox://styles/mapbox/streets-v11"
			>
				{/* This marker can be moved. Then location state gets updated with new lng and lat which is extracted from event*/}
				<Marker
					longitude={lng}
					latitude={lat}
					draggable
					onDragEnd={(e) =>
						dispatch({
							type: UPDATE_LOCATION,
							payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
						})
					}
				/>
			</ReactMapGL>
		</Box>
	);
};

export default AddLocation;
