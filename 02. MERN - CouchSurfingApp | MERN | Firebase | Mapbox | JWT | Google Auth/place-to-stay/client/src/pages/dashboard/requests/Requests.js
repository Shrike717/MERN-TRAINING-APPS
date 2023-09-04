import React, { useEffect } from "react";

const Requests = ({ setSelectedLink, link }) => {
	// Setting the selected link on the first render of the component
	useEffect(() => {
		setSelectedLink(link);
	}, []);

	return <div>Requests</div>;
};

export default Requests;
