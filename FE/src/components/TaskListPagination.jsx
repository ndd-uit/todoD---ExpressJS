import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "../lib/utils";

const TaskListPagination = ({
    handleNext,
    handlePrev,
    handlePageChange,
    page,
    totalPages,
}) => {
    const genaratePages = () => {
        const pages = [];

        if (totalPages < 4) {
            // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn 4
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (page <= 2) {
            // Trang ở đầu
            pages.push(1, 2, 3, "...", totalPages);
        } else if (page >= totalPages - 1) {
            // Trang ở cuối
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
            // Trang ở giữa
            pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
        }

        return pages;
    };

    const pagesToShow = genaratePages();

    return (
        <div className="flex justify-center mt-4">
            <Pagination>
                <PaginationContent>
                    {/* Trang trước */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn(
                                "cursor-pointer",
                                page === 1 && "pointer-events-none opacity-50",
                            )} // Vô hiệu hóa và làm mờ nút nếu đang ở trang đầu tiên
                        />
                    </PaginationItem>

                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page) handlePageChange(p);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Sau */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={
                                page === totalPages ? undefined : handleNext
                            }
                            className={cn(
                                "cursor-pointer",
                                page === totalPages &&
                                    "pointer-events-none opacity-50",
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TaskListPagination;
