import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux"; // Redux 15a: Importing useSelector hook

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId
	const posts = useSelector((state) => state.posts); // Redux 15b: Initialising hook to fetch the data from redux store

	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			container
			alignItems="stretch"
			spacing={3}
			sx={{ display: "flex", alignItems: "center" }}
		>
			{posts.map((post) => {
				return (
					<Grid item key={post._id} xs={12} sm={6}>
						{/* Edit 7: Pass State Setter for currentId */}
						<Post post={post} setCurrentId={setCurrentId} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Posts;
