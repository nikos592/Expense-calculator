import React from 'react';
import styles from '../../styles/ExpenseList.module.css';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => (
  <div className={styles.pagination}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &#8592;
    </button>
    {Array.from({ length: totalPages }, (_, idx) => (
      <button
        key={idx + 1}
        className={currentPage === idx + 1 ? styles.activePage : ''}
        onClick={() => onPageChange(idx + 1)}
      >
        {idx + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &#8594;
    </button>
  </div>
);

export default Pagination;
