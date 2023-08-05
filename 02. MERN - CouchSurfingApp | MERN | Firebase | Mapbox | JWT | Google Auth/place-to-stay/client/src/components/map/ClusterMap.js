import React, { useEffect } from "react";

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
	useEffect(() => {
		console.log(rooms);
	}, [rooms]);

	return <div>ClusterMap</div>;
};

export default ClusterMap;
