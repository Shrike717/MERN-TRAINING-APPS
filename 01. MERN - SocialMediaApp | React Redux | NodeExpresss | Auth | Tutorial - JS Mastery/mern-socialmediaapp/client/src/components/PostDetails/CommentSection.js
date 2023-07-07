import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";

import { commentPost } from "../../actions/posts";

function CommentSection({ post }) {
	const user = JSON.parse(localStorage.getItem("profile")); // Needed to send  wiith a comment
	const [comments, setComments] = useState([1, 2, 3, 4, 5]);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const handleClickComment = () => {
		// Setting comment with useername
		const finalComment = `${user.result.name}: ${comment}`;

		dispatch(commentPost(finalComment, post._id));
	};
	return (
		<Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box
					sx={{
						height: "200px",
						overflowY: "auto", // Makes div scrollable
						marginRight: "30px",
					}}
				>
					<Typography variant="h6" gutterBottom>
						Comments:
					</Typography>
					{comments.map((comment, index) => {
						return (
							<Typography
								key={index}
								variant="subtitle1"
								gutterBottom
							>
								Comment {index + 1}
							</Typography>
						);
					})}
				</Box>
				{user?.result?.name && (
					<Box
						style={{ width: "70%" }}
						sx={{ display: "flex", flexDirection: "column" }}
					>
						<Typography variant="h6" gutterBottom>
							Write a Comment:
						</Typography>
						<TextField
							fullWidth
							rows={4}
							variant="outlined"
							label="Your Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: "10px" }}
							fullWidth
							disabled={!comment}
							variant="contained"
							onClick={handleClickComment}
						>
							Comment
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default CommentSection;
