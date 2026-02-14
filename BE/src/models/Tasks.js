import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // Loại bỏ khoảng trắng ở đầu và cuối
        },
        status: {
            type: String,
            enum: ["active", "completed"], // Chỉ cho phép hai giá trị này
            default: "active", // Mặc định là "active"
        },
        completeAt: {
            type: Date,
            default: null, // Mặc định là null, sẽ được cập nhật khi task hoàn thành
        },
    },
    { timestamps: true },
); // Tự động thêm createdAt và updatedAt

const Task = mongoose.model("Task", taskSchema);

export default Task;
