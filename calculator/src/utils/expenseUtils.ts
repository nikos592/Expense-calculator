import { Expense } from '../types/expense';

export function getSortedExpenses(
  expenses: Expense[],
  sort: 'date' | 'amount'
) {
  return [...expenses].sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.amount - a.amount;
    }
  });
}

export function getFilteredExpenses(expenses: Expense[], category: string) {
  return category && category !== 'all'
    ? expenses.filter((e) => e.category === category)
    : expenses;
}
