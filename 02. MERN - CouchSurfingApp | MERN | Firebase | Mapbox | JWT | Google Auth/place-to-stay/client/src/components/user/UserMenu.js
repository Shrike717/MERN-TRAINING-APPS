import { Settings } from "@mui/icons-material";
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

	return (
		<>
			<Menu
				anchorEl={anchorUserMenu}
				// Opens when anchorUserMenu is true
				open={Boolean(anchorUserMenu)}
				onClose={handleCloseUserMenu}
				onClick={handleCloseUserMenu}
			>
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
