import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columnCount: number;
  rowCount?: number;
  showSearchBar?: boolean;
  className?: string;
}

export const TableSkeleton = ({
  columnCount,
  rowCount = 5,
  className,
}: TableSkeletonProps) => {
  const skeletonRows = Array(rowCount).fill(0);
  const columnArray = Array(columnCount).fill(0);

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="flex items-center justify-end py-4">
        <Skeleton className="h-9 w-64 max-w-sm" />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columnArray.map((_, index) => (
                <TableHead key={index} className="h-12">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columnArray.map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="h-14">
                    <Skeleton className="h-4 w-full animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
