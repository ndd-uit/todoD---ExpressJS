import React from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import StatsAndFilters from "../components/StatsAndFilters";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
import DateTimeFilter from "../components/DateTimeFilter";
import Footer from "../components/Footer";

const HomePage = () => {
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
                    <AddTask />
                    {/* Thong ke va bo loc */}
                    <StatsAndFilters />
                    {/* Danh sach nhiem vu */}
                    <TaskList />
                    {/* Phan trang va loc theo ngay */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>
                    {/* Chan trang */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
