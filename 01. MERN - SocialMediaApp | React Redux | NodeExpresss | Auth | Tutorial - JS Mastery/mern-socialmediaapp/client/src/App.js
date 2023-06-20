import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import env from "react-dotenv";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";
import { themeApp } from "./appStyles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
	return (
		// Google 2. and 3.: Getting clientId and wrapping App in GoogleOAuthProvider
		<GoogleOAuthProvider clientId={env.REACT_PUBLIC_GOOGLE_API_TOKEN}>
			<Router>
				<ThemeProvider theme={themeApp}>
					{/* Container centers everything */}
					<Container maxWidth="laptop">
						<Navbar />
						<Routes>
							<Route path="/" exact element={<Home />} />
							<Route path="/auth" exact element={<Auth />} />
						</Routes>
					</Container>
				</ThemeProvider>
			</Router>
		</GoogleOAuthProvider>
	);
}

export default App;
