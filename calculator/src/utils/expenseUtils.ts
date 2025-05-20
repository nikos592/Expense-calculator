import { Expense } from '../types/expense';

export function getSortedExpenses(
  expenses: Expense[],
  sort: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'
) {
  return [...expenses].sort((a, b) => {
    switch (sort) {
      case 'date_desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date_asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'amount_desc':
        return b.amount - a.amount;
      case 'amount_asc':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });
}

export function getFilteredExpenses(expenses: Expense[], category: string) {
  return category && category !== 'all'
    ? expenses.filter((e) => e.category === category)
    : expenses;
}
