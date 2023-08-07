import React from "react";
import { Box, Drawer, IconButton, Typography, styled } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Defiining a styled component. We have to make the Drawer the same height as the main menu
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: theme.spacing(0, 1), // 1: Left and right 8pxs
	...theme.mixins.toolbar, // This gives the drawer the same height as the main menu. Sx wouldn't be working
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
	return (
		// Persistent: not closing automatically. Usr has  to close i
		<Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
			<DrawerHeader>
				<Typography>Apply Search or Filter</Typography>
				{/* Closes drawer */}
				<IconButton onClick={() => setIsOpen(false)}>
					<ChevronLeftIcon fontSize="large" />
				</IconButton>
			</DrawerHeader>
			{/* Contains search input box and pricee slider */}
			<Box sx={{ width: 240, p: 3 }}></Box>
		</Drawer>
	);
};

export default Sidebar;
