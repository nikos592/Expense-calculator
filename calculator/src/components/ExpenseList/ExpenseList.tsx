import React, { useContext } from 'react';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import styles from './ExpenseList.module.css';
import { Expense } from '../../types/expense';

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, totalAmount } = useContext(ExpenseContext);

  return (
    <div className={styles.expenseList}>
      <h2>Список затрат</h2>

      <div className={styles.listContainer}>
        {expenses.length > 0 ? (
          <>
            {/* Шапка */}
            <div className={styles.expenseHeader}>
              <span>Описание</span>
              <span>Сумма</span>
              <span>Категория</span>
              <span>Дата</span>
              <span>Действия</span>
            </div>

            {/* Строки с данными */}
            {expenses.map((expense: Expense) => (
              <div key={expense.id} className={styles.expenseRow}>
                <span>{expense.description}</span>
                <span>{expense.amount.toLocaleString('ru-RU')} ₽</span>
                <span>{expense.category}</span>
                <span>
                  {new Date(expense.date).toLocaleDateString('ru-RU')}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteExpense(expense.id!)}
                >
                  Удалить
                </button>
              </div>
            ))}

            {/* Итоговая сумма */}
            <div className={styles.total}>
              <span>Итого:</span>
              <span className={styles.totalAmount}>
                {totalAmount.toLocaleString('ru-RU')} ₽
              </span>
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
