import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
	passwordRef,
	id = "password",
	label = "Password",
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClick = () => {
		setShowPassword(!showPassword);
	};

	// With preventDefault the focus will stay on password field and is not switching to following button when visibility icon is clicked
	const handleMouseDown = (e) => {
		e.preventDefault();
	};

	return (
		<TextField
			margin="normal"
			variant="standard"
			id={id}
			label={label}
			type={showPassword ? "text" : "password"}
			fullWidth
			inputRef={passwordRef}
			inputProps={{ minLength: 6 }}
			required
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							onClick={handleClick}
							onMouseDown={handleMouseDown}
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PasswordField;
