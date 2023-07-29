// import React, { useState, useCallback } from "react";
// import { Paper } from "@mui/material";

// import { useDropzone } from "react-dropzone"; // Hook for dropping images

// import ProgressList from "./progressList/ProgressList";
// import ImagesList from "./ImagesList";

// // This component provides the dropzone
// const AddImages = () => {
// 	const [files, setFiles] = useState([]);
// 	// Function that receives dropped files:
// 	const onDrop = useCallback((acceptedFiles) => {
// 		setFiles(acceptedFiles);
// 		console.log(
// 			"1.This is the file accepted in the dropzone in AddImages ",
// 			acceptedFiles
// 		);
// 	}, []);
// 	// ?
// 	const { getRootProps, getInputProps, isDragActive } = useDropzone({
// 		onDrop,
// 		accept: { "image/*": [] },
// 	});
// 	return (
// 		<>
// 			<Paper
// 				sx={{
// 					cursor: "pointer",
// 					background: "#fafafa",
// 					color: "#bdbdbd",
// 					border: "1px dashed #ccc",
// 					"&hover": { border: "1px solid #ccc" },
// 				}}
// 			>
// 				<div style={{ padding: "16px" }} {...getRootProps()}>
// 					<input {...getInputProps()} />
// 					{isDragActive ? (
// 						<p style={{ color: "green" }}>Drop the files here...</p>
// 					) : (
// 						<p>
// 							Drag and drop some files here or click to select
// 							files.
// 						</p>
// 					)}
// 					<em>
// 						(Images with *.jpeg, *.jpg, *.png extension will be
// 						accepted.)
// 					</em>
// 				</div>
// 			</Paper>
// 			{/* We pass our files from the state as props */}
// 			<ProgressList {...{ files }} />
// 			<ImagesList />
// 		</>
// 	);
// };

// export default AddImages;

// Code Tutorial
import { Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImagesList from "./ImagesList";
import ProgressList from "./progressList/ProgressList";

const AddImages = () => {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((acceptedFiles) => {
		setFiles(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
	});
	return (
		<>
			<Paper
				sx={{
					cursor: "pointer",
					background: "#fafafa",
					color: "#bdbdbd",
					border: "1px dashed #ccc",
					"&:hover": { border: "1px solid #ccc" },
				}}
			>
				<div style={{ padding: "16px" }} {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p style={{ color: "green" }}>Drop the files here...</p>
					) : (
						<p>
							Drag 'n' Drop some files here, or click to select
							files
						</p>
					)}
					<em>
						(images with *.jpeg, *.png, *.jpg extension will be
						accepted)
					</em>
				</div>
			</Paper>
			<ProgressList {...{ files }} />
			<ImagesList />
		</>
	);
};

export default AddImages;
