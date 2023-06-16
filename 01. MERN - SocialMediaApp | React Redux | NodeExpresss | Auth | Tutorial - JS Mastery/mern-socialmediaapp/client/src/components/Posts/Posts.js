import React from "react";
// import { Grid, CircularProgress, createTheme } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux"; // Redux 15a: Importing useSelector hook

import { themeApp } from "../../appStyles";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId
	const posts = useSelector((state) => state.posts); // Redux 15b: Initialising hook to fetch the data from redux store

	return !posts.length ? (
		<CircularProgress />
	) : (
		<ThemeProvider theme={themeApp}>
			<Grid
				container
				alignItems="stretch"
				spacing={{ mobile: 2, tablet: 2, laptop: 3 }}
				sx={{ display: "flex", alignItems: "center" }}
			>
				{posts.map((post) => {
					return (
						// No Grid item anymore => Grid version 2
						<Grid key={post._id} mobile={12} tablet={6}>
							{/* Edit 7: Pass State Setter for currentId */}
							<Post post={post} setCurrentId={setCurrentId} />
						</Grid>
					);
				})}
			</Grid>
		</ThemeProvider>
	);
};

export default Posts;
