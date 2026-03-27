import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios";

const AddTask = ({ handleNewTaskAdded = () => {} }) => {
    const [newTaskTitle, setNewTaskTitle] = useState(""); // State để lưu trữ tiêu đề của task mới
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", {
                    title: newTaskTitle,
                }); // Gọi API để thêm task mới vào backend
                toast.success(`Đã thêm công việc ${newTaskTitle} thành công!`); // Hiển thị thông báo thành công
                handleNewTaskAdded();
            } catch (error) {
                console.error("Lỗi khi thêm công việc mới:", error);
                toast.error("Không thể thêm công việc. Vui lòng thử lại."); // Hiển thị thông báo lỗi
            }
            setNewTaskTitle(""); // Xóa nội dung input sau khi thêm task
        } else {
            toast.error("Tiêu đề công việc không được để trống!"); // Hiển thị thông báo lỗi nếu tiêu đề rỗng
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask(); // Gọi hàm addTask khi người dùng nhấn phím Enter
        }
    };

    return (
        <Card className="p-6 boder-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Cần phải làm gì?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle} // Liên kết giá trị của input với state newTaskTitle
                    onChange={(e) => setNewTaskTitle(e.target.value)} // Cập nhật state newTaskTitle khi người dùng nhập vào input\
                    onKeyPress={handleKeyPress} // Xử lý sự kiện khi người dùng nhấn phím Enter để thêm task
                />
                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()} // Vô hiệu hóa nút thêm khi tiêu đề rỗng
                >
                    <Plus className="size-5" />
                    Thêm
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;
