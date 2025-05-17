interface Expense {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface ExpenseFormData {
  description: string;
  amount: string;
  category: string;
  date: string;
}

export { Expense, CategoryOption, ExpenseFormData };
