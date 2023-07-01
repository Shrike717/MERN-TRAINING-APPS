import React, { useState, useEffect } from "react"; // Edit 14c: import useEffect
import { useRef } from "react"; // Needed for resetting file Input field
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux"; // Edit 14a: Import useSelector
import { createPost, updatePost } from "../../actions/posts"; // Edit 10: importing postCreate action

const StyledPaper = styled(Paper)(({ theme }) => ({
	"&.MuiPaper-root": {
		paddingTop: theme.spacing(1.25),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
}));

// For updating a post: we have to get the current Id of this post to this component

const Form = ({ currentId, setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId and currentId
	const [postData, setPostData] = useState({
		// creator: "", // Was needed before Auth flow
		title: "",
		message: "",
		tags: "",
		fileName: "",
		// selectedFile: "",
	});

	const [file, setFile] = useState();
	console.log("This is the PoS file in Form", file);

	// After Auth flow: User now neded to pass the user name of logged in user to the BE
	const user = JSON.parse(localStorage.getItem("profile"));

	const dispatch = useDispatch(); // Initialising useDispatch hook
	const inputFile = useRef(null); // Initialising ref hook to reset file input

	const postToUpdate = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	); // Edit 14b: Fetch the post that will be updated fron store
	console.log(
		"This is the post we want to update at beginning Form",
		postToUpdate
	);

	useEffect(() => {
		// edit 14d: Populate fields with data of post the user wants to edt (the postToUpdate)
		if (postToUpdate) setPostData(postToUpdate);
	}, [postToUpdate, currentId]); // here ERROR: with location edit is working, with currentId search display is working

	const handleSubmit = (e) => {
		e.preventDefault();

		// Form Data with multiple fields
		const formData = new FormData();

		//Basic form info
		formData.append("title", postData.title);
		formData.append("message", postData.message);
		formData.append("tags", postData.tags);
		formData.append("name", user?.result?.name);

		if (!postToUpdate) {
			formData.append("image", file); // If we don't have a currentId we need to add the file to formData
		} else if (postToUpdate.fileName === file.name) {
			formData.append("image", null); // User didn't change the file no file was uploaded
		}

		if (currentId) {
			// Edit 9: If we have a currentId we dispatch an updatePost action with id and updated post data. Oherwise createPost
			dispatch(
				// updatePost(currentId, { ...postData, name: user?.result?.name }) // After Auth flow: Passing logged in user name to BE
				updatePost(currentId, formData) // After Auth flow: Passing logged in user name to BE
			);
		} else {
			dispatch(createPost(formData)); // Calling the ceatePost action and sending the data from he form field
		}
		clear();
	};

	const clear = () => {
		// CAUTION! This is my construction. Delays rerender so that updated post has time to get in store first
		// setTimeout(() => {
		// 	setPostData({
		// 		// creator: "",
		// 		title: "",
		// 		message: "",
		// 		tags: "",
		// 		selectedFile: "",
		// 	});
		// 	setCurrentId(null);
		// }, "600");

		setPostData({
			// creator: "",
			title: "",
			message: "",
			tags: "",
		});
		inputFile.current.value = null;
		setCurrentId(null);
	};

	return (
		<>
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
						{/* Edit 15: Dynamic change of Headline above form field */}
						{currentId ? "Edit your memory" : "Create a memory"}
					</Typography>
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
							setPostData({
								...postData,
								message: e.target.value,
							})
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
							setPostData({
								...postData,
								tags: e.target.value.split(","), // Splitting tags for search later
							})
						}
					/>
					<Box sx={{ width: "97%", margin: "10px 0" }}>
						<input
							ref={inputFile}
							filename={file}
							onChange={(e) => setFile(e.target.files[0])}
							type="file"
							accept="image/*"
						></input>
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
					>
						Clear
					</Button>
				</form>
			</StyledPaper>
		</>
	);
};

export default Form;
