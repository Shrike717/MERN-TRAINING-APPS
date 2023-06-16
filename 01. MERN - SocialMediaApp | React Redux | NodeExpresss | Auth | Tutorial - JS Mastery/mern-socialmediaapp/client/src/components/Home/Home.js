import React, { useState, useEffect } from "react"; // Redux 9. Import useEffect | Edit 3. impprt useState
import { useDispatch } from "react-redux"; // Redux 7. Import this hook

import { Container, Grow } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { themeApp } from "../../appStyles";

import { getPosts } from "../../actions/posts"; // Redux 11. Import action file to dispatch

function Home() {
	const [currentId, setCurrentId] = useState(null); // Edit 4. State Keeping track of currentId for post editing. It begins here with null
	const dispatch = useDispatch(); // Redux 8. Create hook

	useEffect(() => {
		// Redux 10. Setup useEffect
		dispatch(getPosts()); // Redux 12. Evoke action in dispatch
	}, [dispatch]);

	return (
		<Grow in>
			<Container
				sx={{
					"& .MuiGrid2-container": {
						[themeApp.breakpoints.down("tablet")]: {
							flexDirection: "column-reverse",
						},
					},
				}}
			>
				<Grid
					container
					// flexDirection="column-reverse"
					justifyContent="space-between"
					alignItems="stretch"
					spacing={{ mobile: 2, tablet: 2, laptop: 3 }}
				>
					{/* No more Grid items => Grid 2 */}
					<Grid mobile={12} tablet={7}>
						{/* Edit 5. Give State Setter for currentId as prop */}
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid mobile={12} tablet={4}>
						{/* Edit 5. Give State Setter for currentId and currentId as prop */}
						<Form
							currentId={currentId}
							setCurrentId={setCurrentId}
						/>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
}

export default Home;
