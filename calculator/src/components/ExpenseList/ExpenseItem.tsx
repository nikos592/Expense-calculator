import React from 'react';
import { Expense } from '../../types/expense';
import styles from './ExpenseItem.module.css';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const formatExpenseDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('ru-RU') + ' ₽';
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  const handleDelete = () => {
    if (expense.id) {
      onDelete(expense.id);
    }
  };

  return (
    <article className={styles.expenseItem}>
      <section className={styles.expenseInfo}>
        <span className={styles.description} title={expense.description}>
          {expense.description}
        </span>
        <span className={styles.amount}>{formatCurrency(expense.amount)}</span>
      </section>

      <section className={styles.expenseMeta}>
        <span className={styles.category} data-testid="expense-category">
          {expense.category}
        </span>
        <time className={styles.date} dateTime={expense.date}>
          {formatExpenseDate(expense.date)}
        </time>
      </section>

      <button
        type="button"
        onClick={handleDelete}
        className={styles.deleteButton}
        aria-label={`Удалить расход "${expense.description}"`}
      >
        Удалить
      </button>
    </article>
  );
};

export default React.memo(ExpenseItem);
