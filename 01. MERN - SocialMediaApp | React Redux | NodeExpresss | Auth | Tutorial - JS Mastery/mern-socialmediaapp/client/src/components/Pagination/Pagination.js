import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

function Paginate({ page }) {
	const { totalNumberOfPages } = useSelector((state) => state.posts);
	console.log(
		"This is total pagess in Pagination Component",
		totalNumberOfPages
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts(page));
	}, [page]);

	return (
		<Pagination
			sx={{
				ul: { justifyContent: "space-around" },
			}}
			count={totalNumberOfPages} // Number of pages. Now dynamic
			page={Number(page) || 1} // Current page. Now dynamic
			variant="outlined"
			color="primary"
			renderItem={(item) => (
				<Link to={`/posts?page=${item.page}`}>
					<PaginationItem {...item} />
				</Link>
			)}
		/>
	);
}

export default Paginate;
