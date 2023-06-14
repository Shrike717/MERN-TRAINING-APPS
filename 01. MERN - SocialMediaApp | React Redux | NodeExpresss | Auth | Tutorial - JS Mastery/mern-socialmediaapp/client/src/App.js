import React, { useEffect } from "react"; // Redux 9. Import useEffect

import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux"; // Redux 7. Import this hook

import "./App.css";

import { getPosts } from "./actions/posts"; // Redux 11. Import action file to dispatch
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
// import memories from "./assets/images/memories.png";
import memories from "./assets/images/photography-icon-png-2392.png";

function App() {
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
							<Posts />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
