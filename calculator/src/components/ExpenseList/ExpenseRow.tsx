import React from 'react';
import { Expense } from '../../types/expense';
import styles from './ExpenseList.module.css';
import trash from '../../icons/trash.png';
import { categories } from '../../utils/categories';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseRow: React.FC<Props> = ({ expense, onDelete }) => (
  <div className={styles.expenseRow}>
    <span>{expense.description}</span>
    <span>{expense.amount.toLocaleString('ru-RU')} ₽</span>
    <span>
      {categories.find((c) => c.value === expense.category)?.label ||
        expense.category}
    </span>
    <span>{new Date(expense.date).toLocaleDateString('ru-RU')}</span>
    <span className={styles.deleteButton} onClick={() => onDelete(expense.id!)}>
      <img src={trash} alt="Кнопка удалить" width="20px" height="20px" />
    </span>
  </div>
);

export default ExpenseRow;
