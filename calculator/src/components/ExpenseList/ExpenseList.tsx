import React, { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import styles from '../../styles/ExpenseList.module.css';
import { categories } from '../../utils/categories';
import Select from '../UI/Select/Select';
import Pagination from './Pagination';
import ExpenseRow from '../ExpenseList/ExpenseRow';
import {
  getSortedExpenses,
  getFilteredExpenses,
} from '../../utils/expenseUtils';
import { formatCurrency } from '../../utils/currencyUtils';

const ITEMS_PER_PAGE = 6;

const sortOptions = [
  { value: 'date', label: 'Сортировать по дате' },
  { value: 'amount', label: 'Сортировать по сумме' },
];

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, totalAmount } = useContext(ExpenseContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<'date' | 'amount'>('date');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const sortedExpenses = useMemo(
    () => getSortedExpenses(expenses, sort),
    [expenses, sort]
  );

  const filteredExpenses = useMemo(
    () => getFilteredExpenses(sortedExpenses, categoryFilter),
    [sortedExpenses, categoryFilter]
  );

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExpenses = filteredExpenses.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className={styles.expenseList}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Список затрат</h2>
        <div className={styles.controls}>
          <Select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'date' | 'amount')}
            options={sortOptions}
            defaultLabel="Сортировка"
          />
          <Select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[{ value: 'all', label: 'Все категории' }, ...categories]}
            defaultLabel="Категория"
          />
        </div>
      </div>
      <div className={styles.listContainer}>
        {filteredExpenses.length > 0 ? (
          <>
            <div className={styles.expenseHeader}>
              <span>Описание</span>
              <span>Сумма</span>
              <span>Категория</span>
              <span>Дата</span>
              <span>Действия</span>
            </div>
            {currentExpenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
              />
            ))}
            <div className={styles.totalRow}>
              <div className={styles.total}>
                <span>Итого:</span>
                <span className={styles.totalAmount}>
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>Нет добавленных затрат</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
