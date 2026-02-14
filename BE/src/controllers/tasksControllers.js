import Task from "../models/Tasks.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // Sắp xếp theo createdAt giảm dần để hiển thị task mới nhất ở trên cùng
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

export const createTasks = async (req, res) => {
    try {
        const { title } = req.body;
        //Tạo một task mới với title từ request body
        const task = new Task({ title });
        // Lưu task vào database
        const newTask = await task.save();
        res.status(201).json(newTask); // 201 là mã trạng thái cho "Created"
    } catch (error) {
        console.error("Lỗi khi gọi createTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" }); // 500 là mã trạng thái cho "Internal Server Error"
    }
};

export const updateTasks = async (req, res) => {
    try {
        const { title, status, completeAt } = req.body;
        //Tạo một biến để lấy nhiệm vụ sau khi update
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id, // Cách lấy id từ URL
            { title, status, completeAt }, // lấy các trường cần update từ request body
            { new: true }, // trả về giá trị sau được cập nhật
        );
        //Kiểm tra nếu không tìm thấy task nào với id đó
        if (!updateTask) {
            return res.status(404).json({ message: "Task không tồn tại!" }); // 404 là mã trạng thái cho "Not Found"
        }
        res.status(200).json(updateTask); // 200 là mã trạng thái cho "OK"
    } catch (error) {
        console.error("Lỗi khi gọi updateTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

export const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Task không tồn tại!" });
        }
        res.status(200).json({ message: "Task đã được xóa!" });
    } catch (error) {
        console.error("Lỗi khi gọi deleteTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};
