import Task from "../models/Tasks.js";

// Lấy tất cả các task
export const getAllTasks = async (req, res) => {
    try {
        //Sử dụng aggregate lấy dữ liệu và sắp xếp cùng lúc để tối ưu hiệu suất khi có nhiều task
        // Nếu chỉ cần lấy tất cả task mà không cần tính toán gì thêm thì có thể dùng find().sort() như trên, nhưng nếu sau này muốn thêm các phép tính phức tạp hơn (ví dụ: đếm số task theo trạng thái, lọc theo ngày tạo, v.v.) thì aggregate sẽ linh hoạt hơn.
        // Sintax: Model.aggregate([ { $facet: { tasks: [ { $sort: { createdAt: -1 } } ] } } ])
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [
                        { $sort: { createdAt: -1 } }, // Sắp xếp theo createdAt giảm dần
                    ],
                    activeCount: [
                        { $match: { status: "active" } },
                        { $count: "count" },
                    ],
                    completeCount: [
                        { $match: { status: "complete" } },
                        { $count: "count" },
                    ],
                },
            },
        ]);
        const tasks = result[0].tasks; // Mảng các task đã được sắp xếp
        const activeCount = result[0].activeCount[0]?.count || 0; // Số lượng task active, nếu không có sẽ là 0
        const completeCount = result[0].completeCount[0]?.count || 0; // Số lượng task complete, nếu không có sẽ là 0
        res.status(200).json({ tasks, activeCount, completeCount }); // Trả về task và thống kê
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// Tạo 1 task mới
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

// Cập nhật 1 task
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

// Xóa 1 task
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
