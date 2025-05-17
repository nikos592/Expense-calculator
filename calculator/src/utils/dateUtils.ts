export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Парсит строку даты из формата YYYY-MM-DD в объект Date
 * @param dateString - Строка в формате YYYY-MM-DD
 * @returns Объект Date
 */
export const parseDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Проверяет, является ли строка валидной датой в формате YYYY-MM-DD
 * @param dateString - Строка для проверки
 * @returns true, если строка является валидной датой
 */
export const isValidDateString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = parseDateString(dateString);
  return !isNaN(date.getTime());
};

/**
 * Возвращает текущую дату в формате YYYY-MM-DD
 */
export const getCurrentDateFormatted = (): string => {
  return formatDate(new Date());
};

/**
 * Сравнивает две даты (без учета времени)
 * @returns 1 если date1 > date2, -1 если date1 < date2, 0 если равны
 */
export const compareDates = (date1: Date, date2: Date): number => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
};

/**
 * Добавляет указанное количество дней к дате
 * @param date - Исходная дата
 * @param days - Количество дней для добавления (может быть отрицательным)
 * @returns Новая дата
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Форматирует дату для отображения пользователю (например, "30 апреля 2023")
 */
export const formatDateForDisplay = (
  date: Date | string,
  locale = 'ru-RU'
): string => {
  const dateObj = typeof date === 'string' ? parseDateString(date) : date;
  return dateObj.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
