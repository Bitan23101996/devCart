import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, id, required, ...props }: InputProps) {
    return (
        <div className={styles.inputWrapper}>
            {
                label && (<label htmlFor={id} className={styles.label}>
                    {label}
                    {
                        required && (
                            <span className={styles.required}  aria-hidden="true">
                                *
                            </span>
                        )}
                </label>)
            }
          
            <input  id={id} {...props} required={required} className={`${styles.input} ${props.className ?? ''}`} />
            {error && (<p className={styles.error}>{error}</p>)}
        </div>
    );
}