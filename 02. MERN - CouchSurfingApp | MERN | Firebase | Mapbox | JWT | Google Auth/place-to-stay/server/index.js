import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// MW CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT,PATCH, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With, Content-Type, Authorization"
	);
	next();
});

// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({ limit: "10mb" })); // Limit not o be blank or to big. Dangger of DoS attacks.

// MW main link welcome message
app.use("/", (req, res) => res.json({ message: "Welcome to our API" }));
// In case client accesses non available link:
app.use((req, res) =>
	res.status(404).json({ success: false, message: "Not found." })
);

// Function to mak sserver listen to requests. Async becauuse  of communiccaiion with DB
const startServer = async () => {
	try {
		// Connext to MGDB
		app.listen(port, () =>
			console.log(
				`Server listening on port: ${port} --------------------------------------`
			)
		);
	} catch (error) {
		console.log(error);
	}
};

startServer();
