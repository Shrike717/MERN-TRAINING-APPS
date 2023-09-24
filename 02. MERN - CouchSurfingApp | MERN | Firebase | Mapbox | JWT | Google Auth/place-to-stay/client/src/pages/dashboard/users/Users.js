import React, { useEffect, useMemo } from "react";

import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useValue } from "../../../context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";

const Users = ({ setSelectedLink, link }) => {
	// Extracting the users from globbal state:
	const {
		state: { users },
		dispatch,
	} = useValue();

	// Setting the selected link on the first render of the component
	useEffect(() => {
		setSelectedLink(link);
		// If there are no users we get them from the server:
		if (users.length === 0) getUsers(dispatch);
	}, []);

	// Here we create thee columns:
	const columns = useMemo(
		() => [
			// It's an array of objects:
			// renderCell is to show the avatar imagge. There we rceive the params of the DataGrid. Frrom there the Url to the photo
			{
				field: "photoUrl",
				headerName: "Avatar",
				width: 60,
				renderCell: (params) => <Avatar src={params.row.photoUrl} />,
				sortable: false,
				filterable: false,
			},
			{ field: "name", headerName: "Name", width: 170 },
			{ field: "email", headerName: "Email", width: 200 },
			{
				field: "role",
				headerName: "Role",
				width: 100,
				type: "singleSelect",
				valueOptions: ["basic", "editor", "admin"],
				editable: true,
			},
			{
				field: "active",
				headerName: "Active",
				width: 100,
				type: "boolean",
				editable: true,
			},
			{
				field: "createdAt",
				headerName: "Created At",
				width: 200,
				renderCell: (params) =>
					moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
			},
			{ field: "_id", headerName: "Id", width: 220 },
		],
		[]
	);

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<Typography
				variant="h3"
				component="h3"
				sx={{ textAlign: "center", mt: 3, mb: 3 }}
			>
				Manage Users
			</Typography>
			{/* This component is a speciall component from Mui. We need to install @mui/x-data-grid */}
			{/* The columns specify the fields, rows are the data of the grid */}
			{/* The DataGrid needs Id's for every field.. We grap the user Id*/}
			<DataGrid
				columns={columns}
				rows={users}
				getRowId={(row) => row._id}
			/>
		</Box>
	);
};

export default Users;
