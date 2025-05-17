import { useState, useContext } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { categories } from '../utils/categories';
import { formatDate } from '../utils/dateUtils';
import { ExpenseFormData, CategoryOption } from '../types/expense';

export const useExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: '',
    date: formatDate(new Date()),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.description.trim()) {
      alert('Введите описание затраты');
      return;
    }

    const amountValue = parseFloat(formData.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Введите корректную сумму (больше 0)');
      return;
    }

    if (!formData.category) {
      alert('Выберите категорию');
      return;
    }

    // Подготовка данных
    const expenseData = {
      description: formData.description.trim(),
      amount: amountValue,
      category: formData.category,
      date: formData.date || formatDate(new Date()),
    };

    // Добавление в контекст
    addExpense(expenseData);

    // Сброс формы
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: formatDate(new Date()),
    });
  };

  return {
    ...formData,
    categories: categories as CategoryOption[],
    handleChange,
    handleSubmit,
  };
};
