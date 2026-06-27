import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { AppDispatch, RootState } from '@/store/store';

import { addToCart, removeFromCart, clearError } from '../cartSlice';

import CartItem from '../components/CartItem';

import Button from '@/components/common/ui/Button/Button';

import styles from './CartPage.module.scss';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from '@/utils/toast';

const CartPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const lastErrorRef = useRef<string | null>(null);

    const { user } = useSelector((state: RootState) => state.auth);
    const { items, loading, error } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (!error) return;

        if (error === lastErrorRef.current) return;

        showError(error);
        lastErrorRef.current = error;

        dispatch(clearError());
    }, [error, dispatch]);

    //Clear error message
    /* useEffect(() => {
        if (error) {
            showError(error);
            dispatch(clearError());
        }
    }, [error, dispatch]); */

    //Handle Increase Event
    const handleIncrease = async (productId: number) => {

        try {
            const response = await dispatch(
                addToCart({
                    username: user?.userid ?? '',
                    productId: productId,
                })
            ).unwrap();
            showSuccess(t(response.message));
        } catch (err: any) {
            showError(err.message);
        }
    };


    //Handle Decrease Event
    const handleDecrease = async (productId: number) => {

        try {
            const response = await dispatch(
                removeFromCart({
                    username: user?.userid ?? '',
                    productId: productId,
                })
            ).unwrap();
            showSuccess(t(response.message));
        } catch (err: any) {
            showError(err.message);
        }
    };


    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className={styles.cartPage}>
            <h1>{t('myCart')}</h1>

            {loading && <p>Loading...</p>}

            {/* {error && <p>{error}</p>} */}

            {!loading && items.length === 0 && (
                <p>{t('cartEmpty')}</p>
            )}

            <div className={styles.cartList}>
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />
                ))}
            </div>

            {items.length > 0 && (
                <div className={styles.summary}>
                    <h2>{t('totalAmount')}: ₹{totalAmount} </h2>
                    <Button type="button" onClick={() => navigate('/payment')}>
                        {t('proceedToBuy')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;