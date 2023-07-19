import React from "react";
import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Notification from "./components/Notification";
import Loading from "./components/Loading";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
	return (
		<>
			<GoogleOAuthProvider
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			>
				<Loading />
				<Notification />
				<Login />
				<NavBar />
			</GoogleOAuthProvider>
		</>
	);
};

export default App;
