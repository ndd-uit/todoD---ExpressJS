import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/api"
        : "/api"; // Đặt base URL tùy thuộc vào môi trường (development hoặc production)

// Tạo 1 instance của axios để có thể cấu hình riêng cho nó nếu cần thiết
const api = axios.create({
    baseURL: baseURL, // Đặt base URL cho tất cả các request
});

export default api;
