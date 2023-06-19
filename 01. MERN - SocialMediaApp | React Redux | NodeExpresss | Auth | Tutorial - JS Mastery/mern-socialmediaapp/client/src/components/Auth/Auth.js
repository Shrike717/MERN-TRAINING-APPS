import React, { useState } from "react";
import {
	Box,
	Container,
	Button,
	Typography,
	Paper,
	Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import Input from "./Input";

import { themeApp } from "../../appStyles";

const Auth = () => {
	const [isSignup, setIsSignUp] = useState(false); // PoS what input fields are shown with conditional rendering
	const [showPassword, setShowPassword] = useState(false); // Sets if password is visible or redacted

	// const isSignup = false; // Dummy variable during construcion of component

	const handleSubmit = () => {};

	const handleChange = () => {};

	// Toggles PoS to show or hide password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// Toggles PoS to show either Sign In or Sign Up functionality
	const switchMode = () => {
		setIsSignUp(!isSignup);
		setShowPassword(false);
	};

	return (
		<Container component="main" maxWidth="xm">
			<Paper
				elevation={3}
				sx={{
					marginTop: themeApp.spacing(8),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: themeApp.spacing(2),
				}}
			>
				<Avatar // Makes a round form to show icon inside
					sx={{
						margin: themeApp.spacing(1),
						backgroundColor: themeApp.palette.secondary.main,
					}}
				>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">
					{isSignup ? "Sign up" : "Sign In"}
				</Typography>
				<Box
					sx={{
						width: "100%", // Fix IE 11 issue.
						marginTop: themeApp.spacing(3),
					}}
				>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							{isSignup && (
								<>
									<Input
										name="firstName"
										label=" First Name"
										handleChange={handleChange}
										autoFocus
										half
									/>
									<Input
										name="LastName"
										label=" Last Name"
										handleChange={handleChange}
										half
									/>
								</>
							)}
							<Input
								name="email"
								label="Email Address"
								handleChange={handleChange}
								autoFocus
								type="email"
							/>
							<Input
								name="password"
								label="Password"
								handleChange={handleChange}
								type={showPassword ? "text" : "password"} // Passes PoS to Input wether to show pw or not
								handleShowPassword={handleShowPassword}
							/>
							{isSignup && (
								<Input
									name="confirmPassword"
									label="Repeat Passsword"
									handleChange={handleChange}
									type="password"
								/>
							)}
						</Grid>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							sx={{ margin: themeApp.spacing(3, 0, 2) }}
						>
							{isSignup ? "SIGN UP" : "SIGN IN"}
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid>
								{/* Toggles PoS isSignup */}
								<Button onClick={switchMode}>
									{isSignup
										? "Already have an account? Sign In"
										: "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Paper>
		</Container>
	);
};

export default Auth;
