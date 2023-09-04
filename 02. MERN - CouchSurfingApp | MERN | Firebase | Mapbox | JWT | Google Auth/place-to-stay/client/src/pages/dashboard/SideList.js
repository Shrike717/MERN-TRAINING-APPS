import React, { useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
import {
	ChevronLeft,
	Dashboard,
	KingBed,
	Logout,
	MarkChatUnread,
	NotificationsActive,
	PeopleAlt,
} from "@mui/icons-material";

import { useValue } from "../../context/ContextProvider";

import { UPDATE_USER } from "../../constants/actionTypes";
import Main from "./main/Main";
import Users from "./users/Users";
import Rooms from "./rooms/Rooms";
import Requests from "./requests/Requests";
import Messages from "./messages/Messages";

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
	// Importing the user from the global state:
	const {
		state: { currentUser },
		dispatch,
	} = useValue();

	// We create a list as an array of objects. Every object represents a component
	// This is needed because we show different icons depending on the status of the user.
	const list = useMemo(
		() => [
			{
				title: "Main",
				icon: <Dashboard />,
				link: "",
				component: <Main />,
			},
			{
				title: "Users",
				icon: <PeopleAlt />,
				link: "users",
				component: <Users />,
			},
			{
				title: "Rooms",
				icon: <KingBed />,
				link: "rooms",
				component: <Rooms />,
			},
			{
				title: "Requests",
				icon: <NotificationsActive />,
				link: "requests",
				component: <Requests />,
			},
			{
				title: "Messages",
				icon: <MarkChatUnread />,
				link: "messages",
				component: <Messages />,
			},
		],
		[]
	);

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
					{/* Here we iterate over the list array */}
					{list.map((item) => (
						<ListItem
							key={item.title}
							disablePadding
							sx={{ display: "block" }}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
								// Adding a onClick action:
								onClick={() => navigate(item.link)}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.title}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
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
				{/* We route to the  components */}
				<Routes>
					{/* Looping over the list array and extacting the link properties and show component */}
					{list.map((item) => (
						<Route
							key={item.title}
							path={item.link}
							element={item.component}
						/>
					))}
				</Routes>
			</Box>
		</>
	);
};

export default SideList;
