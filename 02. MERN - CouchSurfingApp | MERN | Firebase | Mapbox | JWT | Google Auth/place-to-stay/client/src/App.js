import React from "react";
import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Notification from "./components/Notification";
import Loading from "./components/Loading";
import BottomNav from "./components/BottomNav";

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
				<BottomNav />
			</GoogleOAuthProvider>
		</>
	);
};

export default App;
