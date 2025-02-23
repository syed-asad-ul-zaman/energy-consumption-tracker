'use client';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalCount, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <>
            <div className="flex justify-center items-center mt-4">
                <div className="btn-group space-x-2">
                    <button
                        className="btn shadow-lg"
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`btn ${currentPage === page ? 'btn-active bg-primary text-white shadow-lg' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn shadow-lg"
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="text-center mt-1">
                Page {currentPage} of {totalPages} | {totalCount} Records
            </div>
        </>
    );
};

export default Pagination;
