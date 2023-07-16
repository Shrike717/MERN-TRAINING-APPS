import { Box, IconButton, Badge, Tooltip, Avatar } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useValue } from "../../context/ContextProvider";

import React from "react";

const UserIcons = () => {
	const {
		state: { currentUser },
	} = useValue();

	return (
		<Box>
			<IconButton size="large" color="inherit">
				<Badge color="error" badgeContent={5}>
					<MailIcon />
				</Badge>
			</IconButton>
			<IconButton size="large" color="inherit">
				<Badge color="error" badgeContent={20}>
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<Tooltip title="Open User Settings">
				<IconButton>
					<Avatar src={currentUser?.photoUrl} alt={currentUser?.name}>
						{currentUser?.name?.charAt(0).toUpperCase()}
					</Avatar>
				</IconButton>
			</Tooltip>
		</Box>
	);
};

export default UserIcons;
