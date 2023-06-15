import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); // Data from formfield sent to BE
export const updatePost = (id, updatedPost) =>
	axios.patch(`${url}/${id}`, updatedPost); // Edit 11: Dynamic url with id and updatedPost data as body sent to BE
export const deletePost = (id) => axios.delete(`${url}/${id}`); // Delete 3: Dynamic url with id. Nothing else needed..
