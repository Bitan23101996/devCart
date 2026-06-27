import React, { useEffect } from 'react'

import styles from './Header.module.scss';
import { logout } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartBadge from './CartBadge';
import LanguageDropdown from './LanguageDropdown';
import ThemeToggle from './ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearCart } from '@/features/cart/cartSlice';
import { resetProductState } from '@/features/products/productSlice';
import { resetOrder } from '@/features/order/orderSlice';
import { useTranslation } from 'react-i18next';
import Button from '@/components/common/ui/Button/Button';
import { showSuccess } from '@/utils/toast';

const Header = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(clearCart());
        dispatch(resetProductState());
        dispatch(resetOrder());
        dispatch(logout());
        showSuccess(t('logoutSuccess'));
        navigate('/');
    }



    return (
        <div className={styles.header}>
            {/* Header - Left */}
            <div className={styles.left}>
                <Logo />
            </div>

            {/* Header - Middle */}
            <div className={styles.center}>
                <SearchBar />
            </div>

            {/* Header Right */}
            <div className={styles.right}>
                <LanguageDropdown />
                <ThemeToggle />
                <CartBadge />

                <div className={styles.userInfo}>
                    <span className={styles.greeting}>
                        {t('welcome')}, {user?.name}
                    </span>
                </div>

                <Button variant="primary" type='button' onClick={handleLogout}>
                    {t('logout')}
                </Button>
            </div>

        </div>


    )
}

export default Header;
