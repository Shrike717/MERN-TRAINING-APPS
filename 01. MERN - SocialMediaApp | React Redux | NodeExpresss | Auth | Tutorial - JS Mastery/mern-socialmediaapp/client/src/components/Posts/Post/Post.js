import React from "react";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux"; // Delete 6a: importng useDispatch

import { deletePost } from "../../../actions/posts"; // Delete 6c: importing deletePost action

const Post = ({ post, setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId

	const dispatch = useDispatch(); // Delete 6b: initialising dispach hook

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				borderRadius: "15px",
				height: "100%",
				position: "relative",
			}}
		>
			<CardMedia
				image={post.selectedFile}
				title={post.title}
				sx={{
					height: 0,
					paddingTop: "56.25%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					backgroundBlendMode: "darken",
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					top: "20px",
					left: "20px",
					color: "white",
				}}
			>
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).locale("en").fromNow()}
				</Typography>
			</Box>
			<Box
				sx={{
					position: "absolute",
					top: "25px",
					right: "20px",
					color: "white",
				}}
			>
				{/* Edit 8: Sending the currentId up to App component. State changes from null tto id */}
				<Button
					size="small"
					sx={{ color: "white" }}
					onClick={() => setCurrentId(post._id)}
				>
					<MoreHorizIcon />
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					margin: "20px",
				}}
			>
				<Typography variant="body2" color="text-secondary">
					{post.tags.map((tag) => `#${tag}`)}
				</Typography>
			</Box>
			<CardContent>
				<Typography
					// sx={{ padding: "0 16px" }}
					variant="h5"
					gutterBottom
				>
					{post.title}
				</Typography>
				<Typography variant="body1" gutterBottom>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					padding: "0 16px 8px 16px",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Button size="small" color="primary" onClick={() => {}}>
					<ThumbUpAltIcon
						fontSize="small"
						sx={{ marginRight: "5px" }}
					/>
					Like
					{post.likeCount}
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(deletePost(post._id))} // Delete 6c: Dispatching the action on Delete button
				>
					<DeleteIcon fontSize="small" sx={{ marginRight: "5px" }} />
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
