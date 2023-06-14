import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

const StyledPaper = styled(Paper)(({ theme }) => ({
	"&.MuiPaper-root": {
		paddingTop: theme.spacing(1.25),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
}));

const Form = () => {
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const dispatch = useDispatch(); // Initialising useDispatch hook

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(createPost(postData)); // Calling the ceatePost action and sending the data from he form  field
	};

	const clear = () => {};

	return (
		<StyledPaper elevation={2}>
			<form
				autoComplete="off"
				noValidate
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				}}
				onSubmit={handleSubmit}
			>
				<Typography
					variant="h6"
					textAlign="center"
					fontWeight="600"
					sx={{ marginBottom: "5px" }}
				>
					Creating a memory
				</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
					sx={{ marginBottom: "10px", fontWeight: "600" }}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({ ...postData, title: e.target.value })
					}
					sx={{ marginBottom: "10px" }}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
					sx={{ marginBottom: "10px" }}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value })
					}
				/>
				<Box sx={{ width: "97%", margin: "10px 0" }}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
					sx={{ marginBottom: "10px" }}
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="error"
					size="small"
					onClick={clear}
					fullWidth
					// sx={{
					// 	backgroundColor: "#e53935",
					// 	"&:hover": { backgroundColor: "a51515" },
					// }}
				>
					Clear
				</Button>
			</form>
		</StyledPaper>
	);
};

export default Form;
