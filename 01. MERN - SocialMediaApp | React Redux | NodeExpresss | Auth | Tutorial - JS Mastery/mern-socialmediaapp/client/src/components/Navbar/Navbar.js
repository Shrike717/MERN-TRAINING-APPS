import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	AppBar,
	Typography,
	Toolbar,
	Avatar,
	Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import memories from "../../assets/images/photography-icon-png-2392.png";
import { themeApp } from "../../appStyles";

function Navbar() {
	const user = null; // Dummy vaiable during construction

	return (
		<AppBar
			position="static"
			color="inherit"
			sx={{
				borderRadius: 15,
				margin: "30px 0",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "10px 50px",
				[themeApp.breakpoints.down("sm")]: {
					flexDirection: "column",
				},
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Link to={"/"}>
					<Typography
						variant="h3"
						align="center"
						sx={{
							color: "#1665C0",
							marginRight: "15px",
						}}
					>
						Memories
					</Typography>
				</Link>
				<img src={memories} alt="memories" height="50" />
			</Box>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					width: "400px",
					[themeApp.breakpoints.down("tablet")]: {
						width: "auto",
					},
				}}
			>
				{user ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "400px",
							alignItems: "center",
							[themeApp.breakpoints.down("mobile")]: {
								width: "auto",
								marginTop: 20,
								justifyContent: "center",
							},
						}}
					>
						<Avatar
							sx={{
								color: themeApp.palette.getContrastText(
									deepPurple[500]
								),
								backgroundColor: deepPurple[500],
							}}
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography
							variant="h6"
							sx={{
								display: "flex",
								alignItems: "center",
								textAlign: "center",
							}}
						>
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							color="secondary"
							sx={{ marginLeft: "20px" }}
						>
							LOGOUT
						</Button>
					</Box>
				) : (
					<Link to="/auth">
						<Button
							variant="contained"
							color="primary"
							sx={{ marginLeft: "20px" }}
						>
							SIGN IN
						</Button>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
