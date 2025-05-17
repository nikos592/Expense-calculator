import { createContext, useState, ReactNode } from 'react';
import { Expense } from '../types/expense';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
});

type ExpenseProviderProps = {
  children: ReactNode;
};

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, { ...expense, id: Date.now().toString() }]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
