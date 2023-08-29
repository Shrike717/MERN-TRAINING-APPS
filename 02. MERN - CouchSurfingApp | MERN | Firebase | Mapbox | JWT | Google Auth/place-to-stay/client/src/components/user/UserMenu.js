import { Dashboard, Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon, MenuItem, Menu } from "@mui/material";

import { useValue } from "../../context/ContextProvider";

import Profile from "./Profile";

import {
	UPDATE_USER,
	UPDATE_ALERT,
	POST,
	UPDATE_PROFILE,
} from "../../constants/actionTypes";
import useCheckToken from "../../hooks/useCheckToken";
import { useNavigate } from "react-router-dom";

// This is the user menu when click on avatar in navbar
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
	useCheckToken(); // Checks expiry date of token
	const {
		dispatch,
		state: { currentUser },
	} = useValue();

	const handleCloseUserMenu = () => {
		setAnchorUserMenu(null);
	};

	//Using hook navigate to navigate to the Dashboard component from user menu
	const navigate = useNavigate();

	return (
		<>
			<Menu
				anchorEl={anchorUserMenu}
				// Opens when anchorUserMenu is true
				open={Boolean(anchorUserMenu)}
				onClose={handleCloseUserMenu}
				onClick={handleCloseUserMenu}
			>
				{!currentUser.google && ( // Only showing Profile menu if user is not logged in with google
					<MenuItem
						onClick={() =>
							dispatch({
								type: UPDATE_PROFILE,
								payload: {
									open: true,
									file: null,
									photoUrl: currentUser?.photoUrl,
								},
							})
						}
					>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Profile
					</MenuItem>
				)}
				<MenuItem onClick={() => navigate("dashboard")}>
					<ListItemIcon>
						<Dashboard fontSize="small" />
					</ListItemIcon>
					Dashboard
				</MenuItem>
				<MenuItem
					onClick={() =>
						dispatch({ type: UPDATE_USER, payload: null })
					}
				>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
			<Profile />
		</>
	);
};

export default UserMenu;
