import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon, MenuItem, Menu } from "@mui/material";

import { useValue } from "../../context/ContextProvider";

import { UPDATE_USER } from "../../constants/actionTypes";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
	const { dispatch } = useValue();

	const handleCloseUserMenu = () => {
		setAnchorUserMenu(null);
	};
	return (
		<Menu
			anchorEl={anchorUserMenu}
			// Opens when anchorUserMenu is true
			open={Boolean(anchorUserMenu)}
			onClose={handleCloseUserMenu}
			onClick={handleCloseUserMenu}
		>
			<MenuItem>
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
