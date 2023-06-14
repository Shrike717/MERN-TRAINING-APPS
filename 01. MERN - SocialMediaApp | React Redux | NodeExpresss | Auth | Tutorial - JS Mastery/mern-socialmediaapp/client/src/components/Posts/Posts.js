import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux"; // Redux 15a: Importing useSelector hook

import Post from "./Post/Post";

const Posts = () => {
	const posts = useSelector((state) => state.posts); // Redux 15b: Initialising hook to fetch the data from redux store

	console.log(posts);
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
					<>
						<Grid item key={post._id} xs={12} sm={6}>
							<Post post={post} />
						</Grid>
					</>
				);
			})}
		</Grid>
	);
};

export default Posts;
