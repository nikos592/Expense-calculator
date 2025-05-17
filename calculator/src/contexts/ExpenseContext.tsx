import { createContext, useState, ReactNode } from 'react';
import { Expense } from '../types/expense';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  totalAmount: number;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  totalAmount: 0,
});

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
