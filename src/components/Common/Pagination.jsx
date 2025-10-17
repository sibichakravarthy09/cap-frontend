import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="text-muted">
        Page {currentPage} of {totalPages}
      </div>
      
      <BsPagination className="mb-0">
        <BsPagination.Prev 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </BsPagination.Prev>
        
        {getPageNumbers().map((page) => (
          <BsPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BsPagination.Item>
        ))}
        
        <BsPagination.Next 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </BsPagination.Next>
      </BsPagination>
    </div>
  );
};

export default Pagination;