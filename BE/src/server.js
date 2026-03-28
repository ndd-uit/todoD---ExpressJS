import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: process.env.CLIENT_URL })); // Middleware để cho phép CORS (Cross-Origin Resource Sharing)
}

app.use(express.json()); // Middleware để parse JSON request body

app.use("/api/tasks", tasksRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../FE/dist"))); // Middleware để phục vụ các file tĩnh từ thư mục build của React

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../FE/dist/index.html")); // Trả về file index.html cho tất cả các route không được định nghĩa ở trên (để React Router có thể xử lý routing phía client)
    });
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
});
