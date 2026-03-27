import axios from "axios";

// Tạo 1 instance của axios để có thể cấu hình riêng cho nó nếu cần thiết
const api = axios.create({
    baseURL: "http://localhost:3000/api", // Đặt base URL cho tất cả các request
});

export default api;
