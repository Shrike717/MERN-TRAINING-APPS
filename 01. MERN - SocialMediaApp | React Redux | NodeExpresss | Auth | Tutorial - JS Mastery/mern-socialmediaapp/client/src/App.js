import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { themeApp } from "./appStyles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
	return (
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
	);
}

export default App;
