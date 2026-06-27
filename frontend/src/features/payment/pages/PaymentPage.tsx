import React, { useEffect, useState } from 'react'
import BillingForm from '../components/BillingForm';
import PaymentForm from '../components/PaymentForm';
import Button from '@/components/common/ui/Button/Button';
import { PaymentFormData } from '@/types/payment.types';
import { validateCardNumber, validateCVV, validateExpiryDate, validateRequired, validateZipCode } from '@/utils/validation';
import { useNavigate } from 'react-router-dom';
import { setOrder } from '@/features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { OrderStateTypes } from '@/types/order.types';
import { clearCart, clearFromCart } from '@/features/cart/cartSlice';
import { useTranslation } from 'react-i18next';
import { showSuccess } from '@/utils/toast';

import styles from './PaymentPage.module.scss';

const PaymentPage = () => {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);
    
    const userId = user?.userid ?? '';

    const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    //Re-render language  in case of form invalid
    useEffect(() => {
        if (Object.values(errors).some(Boolean)) {
            validatePaymentForm();
        }
    }, [i18n.language]);

    const handleChange = (
        field: keyof typeof paymentFormData,
        value: string
    ) => {
        setPaymentFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [field]: '',
        }));
    };

    const validatePaymentForm = () => {
        const newErrors = {
            // name: validateRequired(paymentFormData.name, 'Name'),
            name: validateRequired(paymentFormData.name, t('name')),
            streetAddress: validateRequired(paymentFormData.streetAddress, t('streetAddress')),
            city: validateRequired(paymentFormData.city, t('city')),
            state: validateRequired(paymentFormData.state, t('state')),
            zipCode: validateZipCode(paymentFormData.zipCode),
            cardholderName: validateRequired(paymentFormData.cardholderName, t('cardholderName')),
            cardNumber: validateCardNumber(paymentFormData.cardNumber),
            expiryDate: validateExpiryDate(paymentFormData.expiryDate),
            cvv: validateCVV(paymentFormData.cvv),
        };

        setErrors(newErrors);

        return Object.values(newErrors).every(x => !x);
    };

    //Handle clear cart after payment
    const clearCartItem = async (username: string) => {
        try {
            await dispatch(clearFromCart({ username })).unwrap();
        } catch (err: any) {
            //if error came
        }
    }

    //Handle PayNow
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validatePaymentForm()) {
            return;
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderData: OrderStateTypes = {
            userName: user?.name ?? '',
            billingAddress: {
                name: paymentFormData.name,
                streetAddress: paymentFormData.streetAddress,
                city: paymentFormData.city,
                state: paymentFormData.state,
                zipCode: paymentFormData.zipCode,
            },
            cardLastFour: paymentFormData.cardNumber.slice(-4),
            products: items,
            totalAmount
        }
        dispatch(setOrder(orderData));
        clearCartItem(userId);
        dispatch(clearCart());
        showSuccess(t('paymentSuccess'));
        navigate('/order-confirmed');

    };

    return (
        <div className={styles.paymentPage}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <BillingForm
                            formData={paymentFormData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.card}>

                        <PaymentForm
                            formData={paymentFormData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.actions}>

                    <Button type="submit">
                        {t('payNow')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PaymentPage