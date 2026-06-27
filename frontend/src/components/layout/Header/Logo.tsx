import React from 'react'
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/home' className={styles.logo}>
            <span className={styles.dev}>dev</span>
            <span className={styles.cart}>Cart</span>
        </Link>
    )
}

export default Logo;