import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon, MenuItem, Menu } from "@mui/material";

import { useValue } from "../../context/ContextProvider";

import { UPDATE_USER, UPDATE_ALERT, POST } from "../../constants/actionTypes";

// This is the user menu when click on avatar in navbar
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
	const {
		dispatch,
		state: { currentUser },
	} = useValue();

	const handleCloseUserMenu = () => {
		setAnchorUserMenu(null);
	};

	// Testing authorization by fetchin dummy room ressource on click user profile:
	const testAuthorization = async () => {
		const url = process.env.REACT_APP_SERVER_URL + "/room";
		try {
			const response = await fetch(url, {
				method: POST,
				headers: {
					"Content-Type": "application/json}",
					authorization: `Bearer ${currentUser.token}`,
				},
			});
			const data = await response.json();
			console.log(data);
			if (!data.success) {
				throw new Error(data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch({
				type: UPDATE_ALERT,
				payload: {
					open: true,
					severity: "error",
					message: error.message,
				},
			});
		}
	};

	return (
		<Menu
			anchorEl={anchorUserMenu}
			// Opens when anchorUserMenu is true
			open={Boolean(anchorUserMenu)}
			onClose={handleCloseUserMenu}
			onClick={handleCloseUserMenu}
		>
			<MenuItem onClick={testAuthorization}>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem
				onClick={() => dispatch({ type: UPDATE_USER, payload: null })}
			>
				<ListItemIcon>
					<LogoutIcon fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);
};

export default UserMenu;
