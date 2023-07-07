import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";

function CommentSection({ post }) {
	console.log(post);
	const [comments, setComments] = useState([1, 2, 3, 4, 5]);
	const [comment, setComment] = useState("");

	const handleClickComment = () => {};
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
			</Box>
		</Box>
	);
}

export default CommentSection;
