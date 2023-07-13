import React from "react";

import {
	AppBar,
	Toolbar,
	Box,
	IconButton,
	Typography,
	Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { Menu, Lock } from "@mui/icons-material";

const NavBar = () => {
	return (
		<AppBar>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box sx={{ mr: 1 }}>
						<IconButton size="large" color="inherit">
							<Menu />
						</IconButton>
					</Box>
					<Typography // Big screen
						variant="h6"
						component="h1"
						noWrap
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						You Are Welcome
					</Typography>
					<Typography // Small screen
						variant="h6"
						component="h1"
						noWrap
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						YRW
					</Typography>
					<Button color="inherit" startIcon={<Lock />}>
						Login
					</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
