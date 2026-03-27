import React from "react";
import { Card } from "./ui/card";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
    Calendar,
    CheckCircle2,
    Circle,
    Shrink,
    SquarePen,
    Trash2,
} from "lucide-react";
import { Input } from "./ui/input";

const TaskCard = ({ task, index }) => {
    let isEditing = false;
    return (
        <Card
            className={cn(
                "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group", //group để áp dụng hiệu ứng hover cho các phần tử con khi hover vào card
                task.status === "completed" && "opacity-75", // Nếu task đã hoàn thành, giảm độ mờ để tạo hiệu ứng mờ dần
            )}
            style={{ animationDelay: `${index * 50}ms` }} // Mỗi item sẽ render chậm hơn 50ms so với item trước đó tạo hiệu ứng xuất hiện lần lượt
        >
            <div className="flex items-center gap-4 ">
                {/* Nút tròn */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounder-full transition-all duration-200",
                        task.status === "completed"
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary",
                    )}
                >
                    {task.status === "completed" ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>
                {/* hiển thị hoặc chỉnh sửa tiêu đề */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            type="text"
                            placeholder="Cần phải làm gì?"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        />
                    ) : (
                        <p
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === "completed"
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground",
                            )}
                        >
                            {task.title}
                        </p>
                    )}

                    {/* Ngày tạo và ngày hoàn  thành */}
                    <div className="flex items-center gap-2 mt-1">
                        {/* Thêm icon lịch nhìn trực quan hơn */}
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {/* Thêm hàm toLocaleString để đổi thành ngày giờ Việt Nam */}
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground">
                                    {" "}
                                    -{" "}
                                </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(
                                        task.completedAt,
                                    ).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Nút sửa và xóa*/}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* nút edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                    >
                        <SquarePen className="size-4" />
                    </Button>
                    {/* nút delete */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;
