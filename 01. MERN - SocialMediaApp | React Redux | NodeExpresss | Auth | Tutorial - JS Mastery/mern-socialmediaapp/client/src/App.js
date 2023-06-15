import React, { useState, useEffect } from "react"; // Redux 9. Import useEffect | Edit 3. impprt useState

import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux"; // Redux 7. Import this hook

import "./App.css";

import { getPosts } from "./actions/posts"; // Redux 11. Import action file to dispatch
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
// import memories from "./assets/images/memories.png";
import memories from "./assets/images/photography-icon-png-2392.png";

function App() {
	const [currentId, setCurrentId] = useState(null); // Edit 4. State Keeping track of currentId for post editing. It begins here with null
	const dispatch = useDispatch(); // Redux 8. Create hook

	useEffect(() => {
		// Redux 10. Setup useEffect
		dispatch(getPosts()); // Redux 12. Evoke action in dispatch
	}, [dispatch]);

	return (
		// Container centers everything
		<Container maxWidth="lg">
			<AppBar
				position="static"
				color="inherit"
				sx={{
					borderRadius: 15,
					margin: "30px 0",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h2"
					align="center"
					sx={{ color: "#1665C0", marginRight: "15px" }}
				>
					Memories
				</Typography>
				<img src={memories} alt="memories" height="60" />
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent="space-between"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							{/* Edit 5. Give State Setter for currentId as prop */}
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={12} sm={4}>
							{/* Edit 5. Give State Setter for currentId and currentId as prop */}
							<Form
								currentId={currentId}
								setCurrentId={setCurrentId}
							/>
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
