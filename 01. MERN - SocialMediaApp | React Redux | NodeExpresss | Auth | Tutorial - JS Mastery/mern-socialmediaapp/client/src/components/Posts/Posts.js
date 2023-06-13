import React from "react";
import { useSelector } from "react-redux"; // Redux 15a: Importing useSelector hook
import Post from "./Post/Post";

const Posts = () => {
	const posts = useSelector((state) => state.posts); // Redux 15b: Inittialising hook to fetch the data from redux store

	console.log(posts);
	return (
		<>
			<h1>POSTS</h1>
			<Post />
			<Post />
		</>
	);
};

export default Posts;
