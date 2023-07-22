import { useState, useRef, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import { useValue } from "../../context/ContextProvider";
import {
	CLOSE_LOGIN,
	START_LOADING,
	END_LOADING,
	UPDATE_ALERT,
} from "../../constants/actionTypes";
import PasswordField from "./PasswordField";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import { register } from "../actions/user";

const Login = () => {
	const {
		state: { openLogin },
		dispatch,
	} = useValue();
	const [title, setTitle] = useState("Login");
	const [isRegister, setIsRegister] = useState(false);
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const handleClose = () => {
		dispatch({ type: CLOSE_LOGIN });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//  Storing user input:
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		// Send login rquest if state is not register and return

		// If it is register:
		const name = nameRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;
		if (password !== confirmPassword)
			return dispatch({
				type: UPDATE_ALERT,
				payload: {
					open: true,
					severity: "error",
					message: "Passwords do not match",
				},
			});
		// Send register request:
		register({ name, email, password }, dispatch);
	};

	useEffect(() => {
		isRegister ? setTitle("Register") : setTitle("Login");
	}, [isRegister]);

	return (
		// Opens Login form when openLogin gets true
		<Dialog open={openLogin} onClose={handleClose}>
			<DialogTitle>
				{title}
				<IconButton
					sx={{
						position: "absolute",
						top: 8,
						right: 8,
						color: (theme) => theme.palette.grey[500],
					}}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent dividers>
					<DialogContentText>
						Please enter your information in the fields below:
					</DialogContentText>
					{isRegister && (
						<TextField
							autoFocus
							margin="normal"
							variant="standard"
							id="name"
							label="Name"
							type="text"
							fullWidth
							inputRef={nameRef}
							inputProps={{ minLength: 2 }}
							required
						/>
					)}
					<TextField
						autoFocus={!isRegister} // Not working for some reason
						margin="normal"
						variant="standard"
						id="email"
						label="Email"
						type="email"
						fullWidth
						inputRef={emailRef}
						required
					/>
					<PasswordField {...{ passwordRef }} />
					{isRegister && (
						<PasswordField
							passwordRef={confirmPasswordRef}
							id="confirmPassword"
							label="Confirm Password:"
						/>
					)}
				</DialogContent>
				<DialogActions sx={{ px: "19px" }}>
					<Button
						type="submit"
						variant="contained"
						endIcon={<SendIcon />}
					>
						Submit
					</Button>
				</DialogActions>
			</form>
			<DialogActions
				sx={{ justifyContent: "left", p: "5px 24px" }}
				onClick={() => setIsRegister(!isRegister)}
			>
				{isRegister
					? "Do you have an account? Sign in:"
					: "You don't have an account? Create one now:"}
				<Button>{isRegister ? "Login" : "Register"}</Button>
			</DialogActions>
			<DialogActions sx={{ justifyContent: "center", py: "24px" }}>
				<GoogleOneTapLogin />
			</DialogActions>
		</Dialog>
	);
};

export default Login;
