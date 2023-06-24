import React, { useEffect } from "react";
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
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux"; // Delete 6a: importing useDispatch
import { useLocation } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts"; // Delete 6c: importing deletePost action | Like 6a

const Post = ({ post, setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId

	const dispatch = useDispatch(); // Delete 6b: initialising dispach hook

	const location = useLocation();

	// After Auth flow: Loggd in User now needed for conditional rendering of likes, edit and delete buttons
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {}, [location]); // Forces Post component to rerender after logout

	// Util component wih logic for the like functionality:
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result?.sub || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;{" "}
					{/* // This was too long for card
                    {post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${
								post.likes.length > 1 ? "s" : ""
						  }`} */}
					{/* instead i did this: */}
					{post.likes.length > 1
						? `${post.likes.length} like${"s"}`
						: `${post.likes.length} like`}
				</>
			) : (
				<>
					<ThumbUpAltOutlinedIcon fontSize="small" />
					&nbsp; {post.likes.length}{" "}
					{post.likes.length === 1 ? "like" : "likes"}
				</>
			);
		}
		return (
			<>
				{" "}
				<ThumbUpAltOutlinedIcon fontSize="small" />
				&nbsp; Like
			</>
		);
	};

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
				<Typography variant="h6">{post.name}</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).locale("en").fromNow()}
				</Typography>
			</Box>
			{/* Only creator sees element when logged in */}
			{(user?.result?.sub === post?.creator ||
				user?.result?._id === post?.creator) && (
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
			)}
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					margin: "20px",
				}}
			>
				<Typography sx={{ color: "#525252" }} variant="body2">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</Box>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{post.title}
				</Typography>
				<Typography
					sx={{
						color: "#525252",
						height: "50px",
						overflow: "scroll",
					}}
					component="p"
					variant="body2"
				>
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
				<Button
					size="small"
					color="primary"
					disabled={!user?.result}
					onClick={() => dispatch(likePost(post._id))} // Like 6b: Dispatching the action on Like button
				>
					<Likes />
				</Button>
				{/* Only creator sees element when logged in */}
				{(user?.result?.sub === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(deletePost(post._id))} // Delete 6c: Dispatching the action on Delete button
					>
						<DeleteIcon
							fontSize="small"
							sx={{ marginRight: "5px" }}
						/>
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;