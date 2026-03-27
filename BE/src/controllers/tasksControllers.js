import Task from "../models/Tasks.js";

// Lấy tất cả các task
export const getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query; // Lấy tham số filter từ query string, mặc định là 'today'
    const now = new Date(); // Lấy thời điểm hiện tại
    let startDate;

    switch (filter) {
        case "today":
            startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
            ); // Bắt đầu từ 00:00:00 của ngày hôm nay
            break;
        case "week":
            const mondayDate =
                now.getDate() - (now.getDay() - 1) - now.getDay() === 0 ? 7 : 0; // Tính ngày của thứ 2
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate); // Bắt đầu từ 00:00:00 của thứ 2 tuần này
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Bắt đầu từ 00:00:00 của ngày 1 tháng này
            break;
        case "all":
        default:
            startDate = "null";
    }

    const query =
        startDate !== "null" ? { createdAt: { $gte: startDate } } : {}; // Nếu startDate không phải là 'null', thì tạo query để lọc theo createdAt, ngược lại thì query rỗng để lấy tất cả

    try {
        //Sử dụng aggregate lấy dữ liệu và sắp xếp cùng lúc để tối ưu hiệu suất khi có nhiều task
        // Nếu chỉ cần lấy tất cả task mà không cần tính toán gì thêm thì có thể dùng find().sort() như trên, nhưng nếu sau này muốn thêm các phép tính phức tạp hơn (ví dụ: đếm số task theo trạng thái, lọc theo ngày tạo, v.v.) thì aggregate sẽ linh hoạt hơn.
        // Sintax: Model.aggregate([ { $facet: { tasks: [ { $sort: { createdAt: -1 } } ] } } ])
        const result = await Task.aggregate([
            { $match: query },
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
                        { $match: { status: "completed" } },
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
