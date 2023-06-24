import React from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

function Paginate() {
	return (
		<Pagination
			sx={{ ul: { justifyContent: "space-around" } }}
			count={4} // Number of pages. Will become dynamic
			page={1} // Current page. Will become dynamic
			variant="outlined"
			color="primary"
			renderItem={(item) => (
				<Link to={`/posts/page=${1}`}>
					<PaginationItem {...item} />
				</Link>
			)}
		/>
	);
}

export default Paginate;
