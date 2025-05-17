import { useState } from 'react';
import { categories } from '../utils/categories';
import { formatDate } from '../utils/dateUtils';
import { ExpenseFormData, CategoryOption } from '../types/expense';

export const useExpenseForm = () => {
  // Состояние формы с начальными значениями
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: '',
    date: formatDate(new Date()), // Текущая дата в формате YYYY-MM-DD
  });

  // Обработчик изменений для всех полей ввода
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация данных
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Подготовка данных для отправки
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount), // Конвертация строки в число
      date: formData.date || formatDate(new Date()), // Дата по умолчанию
    };

    // Здесь будет логика отправки данных (например, в API или контекст)
    console.log('Данные для отправки:', expenseData);

    // Можно добавить сброс формы после отправки
    // setFormData({
    //   description: '',
    //   amount: '',
    //   category: '',
    //   date: formatDate(new Date()),
    // });
  };

  // Возвращаем все необходимые данные и функции
  return {
    ...formData,
    categories: categories as CategoryOption[],
    handleChange,
    handleSubmit,
  };
};
