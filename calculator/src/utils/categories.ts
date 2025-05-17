import { CategoryOption } from '../types/expense';

// Массив категорий с типами
export const categories: CategoryOption[] = [
  {
    value: 'food',
    label: '🍔 Еда',
  },
  {
    value: 'transport',
    label: '🚗 Транспорт',
  },
  {
    value: 'housing',
    label: '🏠 Жилье',
  },
  {
    value: 'utilities',
    label: '💡 Коммунальные услуги',
  },
  {
    value: 'health',
    label: '🏥 Здоровье',
  },
  {
    value: 'education',
    label: '📚 Образование',
  },
  {
    value: 'entertainment',
    label: '🎬 Развлечения',
  },
  {
    value: 'clothing',
    label: '👕 Одежда',
  },
  {
    value: 'salary',
    label: '💰 Зарплата',
  },
  {
    value: 'other',
    label: '❔ Другое',
  },
];

// Вспомогательная функция для получения названия категории по значению
export const getCategoryLabel = (value: string): string => {
  const category = categories.find((cat) => cat.value === value);
  return category ? category.label : 'Неизвестная категория';
};
