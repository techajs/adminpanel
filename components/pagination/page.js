import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        if (startPage > 2) {
            pageNumbers.push(1, '...');
        } else if (startPage === 2) {
            pageNumbers.push(1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages - 1) {
            pageNumbers.push('...', totalPages);
        } else if (endPage === totalPages - 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center border-stroke bg-white items-center dark:border-strokedark dark:bg-boxdark">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 mx-1 bg-gray-200  dark:bg-meta-4 rounded ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                Previous
            </button>

            {getPageNumbers().map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 mx-1  dark:bg-meta-4 rounded ${
                            currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-3 py-2 mx-1">
                        {page}
                    </span>
                )
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 mx-1 bg-gray-200  dark:bg-meta-4 rounded ${
                    currentPage === totalPages
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
