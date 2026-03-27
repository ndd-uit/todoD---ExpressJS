import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL })); // Middleware để cho phép CORS (Cross-Origin Resource Sharing)

app.use(express.json()); // Middleware để parse JSON request body

app.use("/api/tasks", tasksRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
});
