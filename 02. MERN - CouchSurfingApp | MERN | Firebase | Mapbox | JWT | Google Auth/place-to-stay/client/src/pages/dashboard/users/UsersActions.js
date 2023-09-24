import { Box, CircularProgress, Fab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { green, grey } from "@mui/material/colors";
import React, { useState } from "react";

const UsersActions = ({ params, rowId, setRowId }) => {
	// This state is needed for the loading:
	const [loading, setLoading] = useState(false);
	// This state is needed for successful loading:
	const [success, setSuccess] = useState(false);

	// The handleSubmit function. Async because we communicate with the server
	const handleSubmit = async () => {};

	return (
		// We need position relative for our loading
		<Box sx={{ m: 1, position: "relative" }}>
			{success ? (
				<Fab
					color="primary"
					sx={{
						width: 40,
						height: 40,
						bgcolor: green[500],
						"&:hover": { bgcolor: green[700] },
					}}
				>
					<CheckIcon />
				</Fab>
			) : (
				<Fab
					color="primary"
					sx={{
						width: 40,
						height: 40,
						bgcolor: grey[500],
						"&:hover": { bgcolor: grey[700] },
					}}
					// Now we have to check the inactive rows in order to disable the icons there.. Or if loading is true:
					disabled={params.id !== rowId || loading}
					// Here we cchane the active rowId with a submit function:
					onClick={handleSubmit}
				>
					<SaveIcon />
				</Fab>
			)}
			{/* If loading is true we load the loading icon */}
			{loading && (
				<CircularProgress
					size={52}
					sx={{
						color: green[500],
						position: "absolute",
						top: -6,
						left: -6,
						zIndex: 1,
					}}
				/>
			)}
		</Box>
	);
};

export default UsersActions;
