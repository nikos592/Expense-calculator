import React from 'react';
import styles from '../../../styles/Select.module.css';
import { CategoryOption } from '../../../types/expense';

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: CategoryOption[];
  defaultLabel: string;
  className?: string;
  title?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  defaultLabel,
  className,
  title,
}) => {
  return (
    <select
      id={id}
      className={className ? `${styles.select} ${className}` : styles.select}
      value={value}
      onChange={onChange}
      title={title}
    >
      <option value="" disabled hidden>
        {defaultLabel}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
