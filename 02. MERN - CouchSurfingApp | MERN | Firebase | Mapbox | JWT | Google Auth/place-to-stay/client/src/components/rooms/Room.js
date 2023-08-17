import React, { forwardRef } from "react";
import {
	AppBar,
	Avatar,
	Container,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// This are the imports for the slider:
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Autoplay,
	EffectCoverflow,
	// Lazy,
	Zoom,
} from "swiper/modules"; // This are the modules we need from swiper
// These are the styles:
import "swiper/css"; // Main style
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
// import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css"; // This is our custom styles

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
			<Container
				sx={{ pt: 5 }} // Padding top to push container away from AppBar
			>
				<Swiper
					modules={[
						Navigation, // Navigation for the icons
						Autoplay,
						EffectCoverflow,
						Zoom,
					]} // Adding modules inside Array
					// Props:
					centeredSlides
					slidesPerView={2}
					grabCursor // This shows user its grabaple
					navigation
					autoplay
					lazy
					zoom
					effect="coverflow"
					// Configuring thee effect:
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}}
				>
					{/* Looping through the room images. */}
					{room?.images?.map((url) => (
						<SwiperSlide key={url}>
							{/* Adding div container for the zoom */}
							<div className="swiper-zoom-container" lazy="true">
								<img src={url} alt={room} loading="lazy" />
							</div>
						</SwiperSlide>
					))}
					{/* Tis is tthe avatar for the user */}
					<Tooltip
						title={room?.uName || ""}
						sx={{
							position: "absolute",
							bottom: "8px",
							left: "8px",
							zIndex: 2, // Avatar image must be on top of the slider
						}}
					>
						<Avatar src={room?.uPhoto} />
					</Tooltip>
				</Swiper>
			</Container>
		</Dialog>
	);
};

export default Room;
