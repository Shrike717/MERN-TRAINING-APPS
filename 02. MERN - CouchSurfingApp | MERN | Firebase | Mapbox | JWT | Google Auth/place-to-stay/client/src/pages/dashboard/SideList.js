import React from "react";
import { useNavigate } from "react-router-dom";

import MuiDrawer from "@mui/material/Drawer";
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	Typography,
	styled,
} from "@mui/material";
import { ChevronLeft, Inbox, Logout, Mail } from "@mui/icons-material";

import { useValue } from "../../context/ContextProvider";

import { UPDATE_USER } from "../../constants/actionTypes";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const SideList = ({ open, setOpen }) => {
	// Importing the user from he lobal state:
	const {
		state: { currentUser },
		dispatch,
	} = useValue();

	// Temporarily forwarding user to home page after logout so that he can login again
	const navigate = useNavigate();

	// Function for logout. Clears user information
	const handleLogout = () => {
		dispatch({ type: UPDATE_USER, payload: null });
		navigate("/");
	};

	return (
		<>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					{/* This closes the drawer */}
					<IconButton
						onClick={() => {
							setOpen(false);
						}}
					>
						<ChevronLeft />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map(
						(text, index) => (
							<ListItem
								key={text}
								disablePadding
								sx={{ display: "block" }}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open
											? "initial"
											: "center",
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{index % 2 === 0 ? <Inbox /> : <Mail />}
									</ListItemIcon>
									<ListItemText
										primary={text}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						)
					)}
				</List>
				<Divider />
				{/* Here we have the user information */}
				{/* Styling keeps cotnext in thee centeer */}
				<Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
					{/* Iff name  of user is undefined we have empty string to avoid error */}
					<Tooltip title={currentUser?.name || ""}>
						<Avatar
							src={currentUser?.photoUrl}
							// When we open drawer it needs to be bigger. Then different styling
							{...(open && { sx: { width: 100, height: 100 } })}
						/>
					</Tooltip>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					{/* When drawer open we show username */}
					{open && <Typography>{currentUser?.name}</Typography>}
					<Typography variant="body2">
						{/* Showing authorization status = role */}
						{currentUser?.role || "role"}
					</Typography>
					{/* When drawer open we show email */}
					{open && (
						<Typography variant="body2">
							{currentUser?.email}
						</Typography>
					)}
					{/* Logout Icon */}
					<Tooltip title="Logout" sx={{ mt: 1 }}>
						<IconButton onClick={handleLogout}>
							<Logout />
						</IconButton>
					</Tooltip>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{/* Here is the content section of Dashboard */}
			</Box>
		</>
	);
};

export default SideList;
