import { useExpenseForm } from '../../hooks/useExpenseForm';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import styles from '../../styles/ExpenseForm.module.css';

const ExpenseForm: React.FC = () => {
  const {
    description,
    amount,
    category,
    date,
    categories,
    errors,
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
          className={errors.description ? styles.errorInput : ''}
          title={errors.description || ''}
        />
        {errors.description && (
          <span className={styles.errorMessage}>{errors.description}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="amount">Сумма (₽)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleChange}
          className={errors.amount ? styles.errorInput : ''}
          title={errors.amount || ''}
        />
        {errors.amount && (
          <span className={styles.errorMessage}>{errors.amount}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Категория</label>
        <Select
          id="category"
          value={category}
          onChange={handleChange}
          options={categories}
          defaultLabel="Выберите категорию"
          className={errors.category ? styles.errorInput : ''}
          title={errors.category || ''}
        />
        {errors.category && (
          <span className={styles.errorMessage}>{errors.category}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Дата</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleChange}
          className={errors.date ? styles.errorInput : ''}
          title={errors.date || ''}
        />
        {errors.date && (
          <span className={styles.errorMessage}>{errors.date}</span>
        )}
      </div>

      <Button type="submit">Добавить затрату</Button>
    </form>
  );
};

export default ExpenseForm;
