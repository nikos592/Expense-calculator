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
  const [errors, setErrors] = useState<{
    description?: string;
    amount?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'description' && value.trim()) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
    if (id === 'amount' && value.trim()) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Это поле обязательно для заполнения';
    }

    const amountValue = parseFloat(formData.amount);
    if (!formData.amount.trim()) {
      newErrors.amount = 'Введите сумму';
    } else if (isNaN(amountValue)) {
      newErrors.amount = 'Введите корректное число';
    } else if (amountValue <= 0) {
      newErrors.amount = 'Сумма должна быть больше 0';
    }

    if (!formData.category) {
      alert('Выберите категорию');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expenseData = {
      description: formData.description.trim(),
      amount: amountValue,
      category: formData.category,
      date: formData.date || formatDate(new Date()),
    };

    addExpense(expenseData);

    setFormData({
      description: '',
      amount: '',
      category: '',
      date: formatDate(new Date()),
    });
    setErrors({});
  };

  return {
    ...formData,
    categories: categories as CategoryOption[],
    errors,
    handleChange,
    handleSubmit,
  };
};
