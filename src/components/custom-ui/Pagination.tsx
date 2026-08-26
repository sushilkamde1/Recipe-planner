"use client";

import { PaginationProps } from "@/types/recipe.types";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

export default function Pagination<T>({
  items,
  itemsPerPage = 6,
  renderItem,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!items.length) {
    return null;
  }

  return (
    <div>
      {/* List */}
      <div>{currentItems.map((item, index) => renderItem(item, index))}</div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between border-t border-primary-light pt-4">
          {/* Previous */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center gap-2 rounded-lg border border-yellow-100 px-3 py-2 text-sm font-medium text-secondary-200 transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaArrowLeftLong /> Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-bold transition ${
                    currentPage === page
                      ? "bg-secondary-200 text-white"
                      : "text-tertiary hover:bg-yellow-200"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center gap-2 rounded-lg border border-yellow-100 px-3 py-2 text-sm font-medium text-secondary-200 transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      )}
    </div>
  );
}
