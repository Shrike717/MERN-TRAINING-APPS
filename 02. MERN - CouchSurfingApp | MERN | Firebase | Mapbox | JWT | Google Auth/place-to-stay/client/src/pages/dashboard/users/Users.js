import React, { useEffect } from "react";

const Users = ({ setSelectedLink, link }) => {
	// Setting the selected link on the first render of the component
	useEffect(() => {
		setSelectedLink(link);
	}, []);

	return <div>Users</div>;
};

export default Users;
