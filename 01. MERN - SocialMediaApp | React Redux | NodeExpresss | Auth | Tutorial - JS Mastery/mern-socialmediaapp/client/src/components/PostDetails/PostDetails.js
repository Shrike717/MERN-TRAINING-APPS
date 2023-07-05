import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";

import { getPost } from "../../actions/posts";

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
	// 	postId
	// );
	// const params = useParams();
	// console.log(
	// 	"This is are the params in PostDetail component before dispatching:",
	// 	params
	// );

	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

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

	return (
		<Paper
			elevation={6}
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
			<Box sx={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
				<Typography variant="h3" component="h2">
					{post.title}
				</Typography>
				<Typography
					gutterBottom
					variant="h6"
					color="textSecondary"
					component="h2"
				>
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
				<Typography gutterBottom variant="body1" component="p">
					{post.message}
				</Typography>
				<Typography variant="h6">Created by: {post.name}</Typography>
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
				alt={post.title}
				sx={{
					borderRadius: "20px",
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
		</Paper>

		// <div className={classes.card}>
		// 	<div className={classes.section}>
		// 		<Typography variant="h3" component="h2">
		// 			{post.title}
		// 		</Typography>
		// 		<Typography
		// 			gutterBottom
		// 			variant="h6"
		// 			color="textSecondary"
		// 			component="h2"
		// 		>
		// 			{post.tags.map((tag) => `#${tag} `)}
		// 		</Typography>
		// 		<Typography gutterBottom variant="body1" component="p">
		// 			{post.message}
		// 		</Typography>
		// 		<Typography variant="h6">Created by: {post.name}</Typography>
		// 		<Typography variant="body1">
		// 			{moment(post.createdAt).fromNow()}
		// 		</Typography>
		// 		<Divider style={{ margin: "20px 0" }} />
		// 		<Typography variant="body1">
		// 			<strong>Realtime Chat - coming soon!</strong>
		// 		</Typography>
		// 		<Divider style={{ margin: "20px 0" }} />
		// 		<Typography variant="body1">
		// 			<strong>Comments - coming soon!</strong>
		// 		</Typography>
		// 		<Divider style={{ margin: "20px 0" }} />
		// 	</div>
		// 	<div className={classes.imageSection}>
		// 		<img
		// 			className={classes.media}
		// 			src={
		// 				post.selectedFile ||
		// 				"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
		// 			}
		// 			alt={post.title}
		// 		/>
		// 	</div>
		// </div>
	);
}

export default PostDetails;
