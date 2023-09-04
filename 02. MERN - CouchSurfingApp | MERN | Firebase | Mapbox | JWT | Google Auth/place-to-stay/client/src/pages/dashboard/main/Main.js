import React, { useEffect } from "react";

const Main = ({ setSelectedLink, link }) => {
	// Setting the selected link on the first render of the component
	useEffect(() => {
		setSelectedLink(link);
	}, []);

	return <div>Main</div>;
};

export default Main;
