import { useExpenseForm } from '../../hooks/useExpenseForm';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import styles from './ExpenseForm.module.css';

const ExpenseForm: React.FC = () => {
  const {
    description,
    amount,
    category,
    date,
    categories,
    handleSubmit,
    handleChange,
  } = useExpenseForm();

  return (
    <form className={styles.expenseForm} onSubmit={handleSubmit}>
      <h2>Добавить новую затрату</h2>

      <div className={styles.formGroup}>
        <label htmlFor="description">Описание</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="amount">Сумма (Р)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Категория</label>
        <Select
          id="category"
          value={category}
          onChange={handleChange}
          options={categories}
          defaultLabel="Выберите категорию"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Дата</label>
        <input type="date" id="date" value={date} onChange={handleChange} />
      </div>

      <Button type="submit">Добавить затрату</Button>
    </form>
  );
};

export default ExpenseForm;
