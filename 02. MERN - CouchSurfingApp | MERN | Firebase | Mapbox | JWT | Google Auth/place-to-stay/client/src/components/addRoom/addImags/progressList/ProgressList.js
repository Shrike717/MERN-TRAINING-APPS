import React from "react";
import { ImageList } from "@mui/material";
import ProgressItem from "./ProgressItem";

// The component receives the files and passes them one by one to the ProgressItem component
const ProgressList = ({ files }) => {
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
			{files.map((file, index) => (
				<ProgressItem file={file} key={index} />
			))}
		</ImageList>
	);
};

export default ProgressList;
