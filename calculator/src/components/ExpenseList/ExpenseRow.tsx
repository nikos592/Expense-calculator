import React from 'react';
import { Expense } from '../../types/expense';
import styles from '../../styles/ExpenseList.module.css';
import trash from '../../icons/trash.png';
import { formatDate, parseDateString } from '../../utils/dateUtils';
import { getCategoryLabel } from '../../utils/categories';
import { formatCurrency } from '../../utils/currencyUtils';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseRow: React.FC<Props> = ({ expense, onDelete }) => {
  const formattedDate = formatDate(parseDateString(expense.date));

  return (
    <div className={styles.expenseRow}>
      <span>{expense.description}</span>
      <span>{formatCurrency(expense.amount)}</span>
      <span>{getCategoryLabel(expense.category)}</span>
      <span>{formattedDate}</span>
      <span
        className={styles.deleteButton}
        onClick={() => expense.id && onDelete(expense.id)}
      >
        <img src={trash} alt="Удалить" width="20" height="20" />
      </span>
    </div>
  );
};

export default ExpenseRow;
