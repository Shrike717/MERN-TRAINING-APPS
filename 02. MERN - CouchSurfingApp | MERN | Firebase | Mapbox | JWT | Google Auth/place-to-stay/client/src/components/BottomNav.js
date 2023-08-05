import React, { useState, useRef, useEffect } from "react";
import {
	Box,
	Paper,
	BottomNavigation,
	BottomNavigationAction,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ClusterMap from "./map/ClusterMap";
import Room from "./rooms/Rooms";
import AddRoom from "./addRoom/AddRoom";
import Protected from "./protected/Protected";

const BottomNav = () => {
	// This is the state controlling which page/component is shown in the main section of our site
	const [value, setValue] = useState(0);
	const ref = useRef(); // If we change section it scrolls up to top

	useEffect(() => {
		ref.current.ownerDocument.body.scrollTop = 0; // If we change section it scrolls up to top
	}, [value]);

	return (
		<Box ref={ref}>
			{
				{
					// This is a switch inside JSX. Shows component when click on icon
					0: <ClusterMap />,
					1: <Room />,
					2: (
						// We wrap components which should be protected. These are the children of the  Protected component
						<Protected>
							{/* We pass the setter function to change the component from there as prop */}
							<AddRoom setPage={setValue} />,
						</Protected>
					),
				}[value]
			}
			<Paper
				elevation={3}
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 2,
				}}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(e, newValue) => setValue(newValue)} // Changes active value on clicks on icons
				>
					<BottomNavigationAction
						label="Map"
						icon={<LocationOnIcon />}
					></BottomNavigationAction>
					<BottomNavigationAction
						label="Rooms"
						icon={<BedIcon />}
					></BottomNavigationAction>
					<BottomNavigationAction
						label="Add"
						icon={<AddLocationIcon />}
					></BottomNavigationAction>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default BottomNav;
