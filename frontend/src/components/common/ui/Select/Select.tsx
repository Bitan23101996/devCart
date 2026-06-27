import React from 'react';
import styles from './Select.module.scss';
import { SelectOption } from '@/types/selectOption.types';


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    variant?: 'default' | 'compact';
}

const Select = ({ label, error, options, className, variant = 'default', ...props }: SelectProps) => {
    return (
        <div className={styles.selectWrapper}>
            {/* Label */}
            {label && (
                <label className={styles.label}>
                    {label}

                    {props.required && (
                        <span className={styles.required}>
                            *
                        </span>
                    )}
                </label>
            )}

            {/* Select dropdown */}
            <select {...props} className={`${styles.select}  ${styles[variant ?? 'default']} ${className ?? ''} `}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Error */}
            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Select;