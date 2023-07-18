import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleOneTapLogin = () => {
	return (
		<Button variant="outlined" startIcon={<GoogleIcon />}>
			Login with Google
		</Button>
	);
};

export default GoogleOneTapLogin;
