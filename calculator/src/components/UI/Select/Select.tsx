import React from 'react';
import styles from './Select.module.css';
import { CategoryOption } from '../../../types/expense';

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: CategoryOption[];
  defaultLabel: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  defaultLabel,
}) => {
  return (
    <select id={id} className={styles.select} value={value} onChange={onChange}>
      <option value="">{defaultLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
