import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/store/store';

import styles from './Header.module.scss';

const CartBadge = () => {
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <Link to="/cart" className={styles.cartWrapper}>
            <span className={styles.cartIcon}>
                🛒
            </span>

            {cartCount > 0 && (
                <span  key={cartCount} className={styles.badge}>
                    {cartCount}
                </span>
            )}
        </Link>
    );
};

export default CartBadge;