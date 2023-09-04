import React, { useEffect } from "react";

const Rooms = ({ setSelectedLink, link }) => {
	// Setting the selected link on the first render of the component
	useEffect(() => {
		setSelectedLink(link);
	}, []);

	return <div>Rooms</div>;
};

export default Rooms;
