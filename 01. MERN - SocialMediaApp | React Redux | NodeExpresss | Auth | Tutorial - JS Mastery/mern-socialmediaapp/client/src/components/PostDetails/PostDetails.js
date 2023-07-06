import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";

import { getPost, getPostsBySearch } from "../../actions/posts";

import {
	Box,
	Paper,
	Typography,
	CircularProgress,
	Divider,
	CardMedia,
} from "@mui/material";
import { themeApp } from "../../appStyles";

const BASE_URL = "http://localhost:5000/";

function PostDetails() {
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const location = useLocation();
	const { id } = useParams();
	// console.log(
	// 	"This is the postId in PostDetail component before dispatching:",
	// 	id
	// );

	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	useEffect(() => {
		dispatch(
			getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
		);
	}, [post]);

	if (!post) return null;

	if (isLoading) {
		return (
			<Paper
				elevation={6}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
					borderRadius: "15px",
					height: "39vh",
				}}
			>
				<CircularProgress size="7em" />
			</Paper>
		);
	}

	// Filters out the post that is featured. Should not be in recommendedPosts. Keeps all other posts.
	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

	return (
		<>
			<Paper
				elevation={6}
				sx={{ padding: "0.8rem", borderRadius: "20px" }}
			>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						borderRadius: "20px",
						[themeApp.breakpoints.down("sm")]: {
							flexWrap: "wrap",
							flexDirection: "column",
						},
					}}
				>
					<Box
						sx={{
							borderRadius: "20px",
							margin: "1rem 1rem 1rem 1rem",
							flex: 1,
						}}
					>
						<Typography
							variant="h5"
							component="h2"
							sx={{ marginBottom: "1rem", fontSize: "1.7rem" }}
						>
							<strong>{post.title}</strong>
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							color="textSecondary"
							component="h2"
							sx={{ marginBottom: "1rem" }}
						>
							{post.tags.map((tag) => `#${tag} `)}
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							component="p"
							sx={{ marginBottom: "1rem" }}
						>
							{post.message}
						</Typography>
						<Typography variant="body1" sx={{}}>
							Created by: {post.name}
						</Typography>
						<Typography variant="body1">
							{moment(post.createdAt).fromNow()}
						</Typography>
						<Divider style={{ margin: "20px 0" }} />
						<Typography variant="body1">
							<strong>Realtime Chat - coming soon!</strong>
						</Typography>
						<Divider style={{ margin: "20px 0" }} />
						<Typography variant="body1">
							<strong>Comments - coming soon!</strong>
						</Typography>
						<Divider style={{ margin: "20px 0" }} />
					</Box>
					<CardMedia
						component="img"
						image={`${BASE_URL}${post.imageUrl}`}
						title={post.title}
						sx={{
							borderRadius: "2rem",
							padding: "20px",
							objectFit: "cover",
							width: "50%",
							maxHeight: "600px",
							marginLeft: "20px",
							[themeApp.breakpoints.down("sm")]: {
								marginLeft: 0,
							},
						}}
					></CardMedia>
				</Box>
				{recommendedPosts.length > 0 && (
					<Box
						sx={{
							borderRadius: "20px",
							margin: "1rem 1rem 1rem 1rem",
							flex: 1,
						}}
					>
						<Typography variant="h6" gutterBottom>
							You might also like:
						</Typography>
						<Divider />
						<Box
							sx={{
								display: "flex",
								[themeApp.breakpoints.down("sm")]: {
									flexDirection: "column",
								},
							}}
						>
							{recommendedPosts.map(
								({
									title,
									message,
									name,
									likes,
									imageUrl,
									_id,
								}) => {
									return <Box>{title}</Box>;
								}
							)}
						</Box>
					</Box>
				)}
			</Paper>
		</>
	);
}

export default PostDetails;
