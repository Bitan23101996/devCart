import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', children, loading = false, disabled, className, ...props }: ButtonProps) {
    return (
        <button className={`${styles.button} ${styles[variant]} ${className ?? ''}`} disabled={disabled || loading} {...props}>
            {loading ? 'Loading...' : children}
        </button>
    );
}