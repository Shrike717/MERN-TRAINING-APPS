import React, { useState, useEffect } from "react"; // Redux 9. Import useEffect | Edit 3. impprt useState
import { Container, AppBar, Typography, Grow } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux"; // Redux 7. Import this hook

import "./App.css";
import { themeApp } from "./appStyles";

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
		<ThemeProvider theme={themeApp}>
			{/* Container centers everything */}
			<Container maxWidth="laptop">
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
			</Container>
		</ThemeProvider>
	);
}

export default App;
