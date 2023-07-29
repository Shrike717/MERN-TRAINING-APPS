import React from "react";
import { useValue } from "../../../context/ContextProvider";
import {
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const ImagesList = () => {
	// Importing the already uuploaded images from state.
	//  currenUser is needed for the id which is included in the image path. Needed to delete images
	const {
		state: { images, currrentUser },
		dispatch,
	} = useValue();

	// async because wee communicate with firbase
	const handleDelete = async (image) => {};
	return (
		<ImageList
			rowHeight={250}
			sx={{
				// Overwriting styling so that ImageList is responsive
				"&.MuiImageList-root": {
					gridTemplateColumns:
						"repeat(auto-fill, minmax(250px, 1fr))!important",
				},
			}}
		>
			{/* image is the imageUrl */}
			{images.map((image, index) => (
				<ImageListItem key={index} cols={1} rows={1}>
					<img
						src={image}
						alt="rooms"
						loading="lazy"
						style={{ height: "100%" }}
					/>
					{/* Is oon top of the image  so closing icoon can  be added */}
					<ImageListItemBar
						position="top"
						sx={{
							background:
								"linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
						}}
						actionIcon={
							<IconButton
								sx={{ color: "white" }}
								onClick={() => handleDelete(image)}
							>
								<CancelIcon />
							</IconButton>
						}
					></ImageListItemBar>
				</ImageListItem>
			))}
		</ImageList>
	);
};

export default ImagesList;

// //  Code Tutorial
// import { Cancel } from "@mui/icons-material";
// import {
// 	IconButton,
// 	ImageList,
// 	ImageListItem,
// 	ImageListItemBar,
// } from "@mui/material";
// import React from "react";
// import { useValue } from "../../src/context/ContextProvider";
// // import deleteFile from "../../../firebase/deleteFile";

// const ImagesList = () => {
// 	const {
// 		state: { images, currentUser },
// 		dispatch,
// 	} = useValue();

// 	const handleDelete = async (image) => {
// 		dispatch({ type: "DELETE_IMAGE", payload: image });
// 		const imageName = image
// 			?.split(`${currentUser?.id}%2F`)[1]
// 			?.split("?")[0];
// 		try {
// 			// await deleteFile(`rooms/${currentUser?.id}/${imageName}`);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	return (
// 		<ImageList
// 			rowHeight={250}
// 			sx={{
// 				"&.MuiImageList-root": {
// 					gridTemplateColumns:
// 						"repeat(auto-fill, minmax(250px, 1fr))!important",
// 				},
// 			}}
// 		>
// 			{images.map((image, index) => (
// 				<ImageListItem key={index} cols={1} rows={1}>
// 					<img
// 						src={image}
// 						alt="rooms"
// 						loading="lazy"
// 						style={{ height: "100%" }}
// 					/>
// 					<ImageListItemBar
// 						position="top"
// 						sx={{
// 							background:
// 								"linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
// 						}}
// 						actionIcon={
// 							<IconButton
// 								sx={{ color: "white" }}
// 								onClick={() => handleDelete(image)}
// 							>
// 								<Cancel />
// 							</IconButton>
// 						}
// 					></ImageListItemBar>
// 				</ImageListItem>
// 			))}
// 		</ImageList>
// 	);
// };

// export default ImagesList;
