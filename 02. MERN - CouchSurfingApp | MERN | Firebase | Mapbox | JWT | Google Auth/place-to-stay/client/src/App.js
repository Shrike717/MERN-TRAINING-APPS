import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";

const App = () => {
	return (
		<>
			<GoogleOAuthProvider
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			>
				<BrowserRouter>
					<Routes>
						{/* Any link after /dashboard is forwarded to /dashboard because of asterix */}
						<Route path="dashboard/*" element={<Dashboard />} />
						{/* Any link  is forwarded to Home component because of asterix */}
						<Route path="*" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</GoogleOAuthProvider>
		</>
	);
};

export default App;
