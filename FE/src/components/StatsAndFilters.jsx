import { Filter } from "lucide-react";
import React from "react";
import { FilterType } from "../lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const StatsAndFilters = ({
    completedTaskCount = 0,
    activeTaskCount = 0,
    filter = "all",
    setFilter,
}) => {
    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* Phan thong ke */}
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-accent-foreground border-info/20"
                >
                    {activeTaskCount} {FilterType.active}
                </Badge>
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-success border-info/20"
                >
                    {completedTaskCount} {FilterType.completed}
                </Badge>
            </div>
            {/* Phan filter */}
            <div className="flex flex-col gap-2 sm:flex-row">
                {
                    // Vi FilterType la 1 object nen ta su dung Object.keys de lay ra mang chua cac key cua object do, sau do map qua tung key de tao button
                    Object.keys(FilterType).map((type) => (
                        <Button
                            variant={filter === type ? "gradient" : "ghost"} // Neu filter dang duoc chon thi se la gradient, nguoc lai se la secondary
                            key={type}
                            size="sm"
                            className="capitalize"
                            onClick={() => setFilter(type)} // Khi click vao button thi se goi ham setFilter de cap nhat filter hien tai
                        >
                            <Filter className="size-4" />
                            {FilterType[type]}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default StatsAndFilters;
