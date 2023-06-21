import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost); // Data from formfield sent to BE
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost); // Edit 11: Dynamic url with id and updatedPost data as body sent to BE
export const deletePost = (id) => API.delete(`/posts/${id}`); // Delete 3: Dynamic url with id. Nothing else needed.
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // Like 3: Only Id and route needed.

export const signIn = (formData) => API.post("/user/signin", formData); // Man Auth 14: Signin credentials sent to BE
export const signUp = (formData) => API.post("/user/signup", formData); // Man Auth 14: Signin credentials sent to BE
