import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./database.js";
import router from "./routes/routes.js";
import { fileURLToPath } from "url";
import path from "path";

// Configure environment variables
dotenv.config();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors({ origin: `https://mern-todo-app-efzt.onrender.com/` }));
app.use(express.json());

// Serve static files from 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Route setup
app.use("/api", router);

// Start server
const port = process.env.PORT || 3000;
async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
