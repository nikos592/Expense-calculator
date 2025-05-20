import { createContext, useState, ReactNode, useEffect } from 'react';
import { Expense } from '../types/expense';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  totalAmount: number;
};

const STORAGE_KEY = 'expenses';

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  totalAmount: 0,
});

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses((prev) => [
      ...prev,
      {
        ...expense,
        id: Date.now().toString(),
      },
    ]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, totalAmount }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
