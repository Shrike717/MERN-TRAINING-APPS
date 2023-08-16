import React, { forwardRef } from "react";
import {
	AppBar,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useValue } from "../../context/ContextProvider";

import { UPDATE_ROOM } from "../../constants/actionTypes";

// This is the helper function Transition which...
// The forwardRef from react passes sth to a child component
const Transition = forwardRef((props, ref) => {
	// The Dialog will slide to top when opened and slide to bottom when closed
	return <Slide direction="up" {...props} ref={ref} />;
});

// This component ist thee single page for the room
const Room = () => {
	// Importing the room from global sttate:
	const {
		state: { room },
		dispatch,
	} = useValue();

	const handleClose = () => {
		dispatch({ type: UPDATE_ROOM, payload: null }); // Closing the room single pages
	};

	return (
		// The slider gets placed in a Dialog component
		<Dialog
			fullScreen
			open={Boolean(room)} // If it is null its false, if object its true
			onClose={handleClose}
			TransitionComponent={Transition} // The transition lets the dialog slide up and down
		>
			{/* Contains Title and Close Button on top */}
			<AppBar
				position="relative" // We need it to be aware of our container content
			>
				<Toolbar>
					<Typography
						variant="h6"
						component="h3"
						sx={{ ml: 2, flex: 1 }} // flex: 1 expands it to fill the whole Appbar and push close icon to end of the Bar
					>
						{room?.title}
					</Typography>
					<IconButton color="inherit" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Dialog>
	);
};

export default Room;
