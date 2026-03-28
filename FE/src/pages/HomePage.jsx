import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import StatsAndFilters from "../components/StatsAndFilters";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
import DateTimeFilter from "../components/DateTimeFilter";
import Footer from "../components/Footer";
import { toast } from "sonner";
import api from "../lib/axios";
import { visibleTaskLimit } from "../lib/data";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]); //Buffer: chỗ gom data lại để xử lý tiếp trước khi đưa vào state chính

    const [activeTaskCount, setActiveTaskCount] = useState(0); // Số lượng task active
    const [completeTaskCount, setCompleteTaskCount] = useState(0); // Số lượng task completed

    const [filter, setFilter] = useState("all"); // State để lưu trữ bộ lọc hiện tại (tất cả, đang làm, đã hoàn thành)

    const [dateQuery, setDateQuery] = useState("today");

    const [page, setPage] = useState(1);

    // gọi API lấy ds công việc
    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`); // gọi API backend để lấy ds công việc
            setTaskBuffer(res.data.tasks); // hỗ trợ cả response object mới và mảng cũ
            setActiveTaskCount(res.data.activeCount); // Cập nhật số lượng task active
            setCompleteTaskCount(res.data.completeCount); // Cập nhật số lượng task completed
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất tasks:", error);
            toast.error(
                "Không thể tải danh sách công việc. Vui lòng thử lại sau.",
            );
        }
    };

    useEffect(() => {
        fetchTasks(); //chạy 1 lần duy nhất khi component được render
    }, [dateQuery]); // Mỗi khi đổi bộ lọc cần fetch data lại

    useEffect(() => {
        setPage(1); // Mỗi khi đổi bộ lọc cần reset về trang 1
    }, [filter, dateQuery]); // Mỗi khi đổi bộ lọc hoặc đổi truy vấn ngày cần reset về trang 1

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleTaskChanged = () => {
        fetchTasks(); // Gọi lại API để cập nhật danh sách công việc sau khi có sự thay đổi (thêm, sửa, xóa)
    };

    // biến filteredTasks để lưu trữ ds công việc đã được lọc theo bộ lọc hiện tại, sẽ được truyền vào component TaskList để hiển thị
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "completed";
            default:
                return true; // Hiển thị tất cả công việc nếu không có bộ lọc cụ thể
        }
    });

    // Hàm tách task
    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit,
    ); // Nếu page = 1 thì lấy từ 0 đến 3, nếu page =2 thì lấy từ 4-7

    if (visibleTasks.length === 0) {
        handlePrev(); // Nếu không còn task nào để hiển thị trên trang hiện tại sau khi lọc, tự động chuyển về trang trước đó
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit); // Tổng số trang = tổng số công việc đã lọc / số công việc hiển thị trên mỗi trang

    return (
        <div className="min-h-screen w-full relative">
            {/* Cotton Candy Sky Gradient - Opposite Direction */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* Dau trang */}
                    <Header />
                    {/* Tao nhiem vu moi */}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />
                    {/* Thong ke va bo loc */}
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTaskCount={activeTaskCount}
                        completedTaskCount={completeTaskCount}
                    />
                    {/* Danh sach nhiem vu */}
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />
                    {/* Phan trang va loc theo ngay */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter
                            dateQuery={dateQuery}
                            setDateQuery={setDateQuery}
                        />
                    </div>
                    {/* Chan trang */}
                    <Footer
                        activeTaskCount={activeTaskCount}
                        completeTaskCount={completeTaskCount}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
