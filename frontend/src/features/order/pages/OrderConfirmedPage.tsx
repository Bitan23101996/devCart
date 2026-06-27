import React from 'react'
import { RootState } from '@/store/store'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Button from '@/components/common/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './OrderConfirmedPage.module.scss';

const OrderConfirmedPage = () => {
    const { t } = useTranslation();
    const order = useSelector((state: RootState) => state.order);
    const navigate = useNavigate();
    return (
        <div className={styles.orderPage}>

            <div className={styles.successCard}>
                <h1>✅ {t('orderConfirmed')}</h1>
                <p>{t('thankYouForPurchase')}</p>
            </div>

            <div className={styles.infoGrid}>

                <div className={styles.card}>
                    <h2>{t('userInformation')}</h2>
                    <p>{t('name')}: {order.userName}</p>
                </div>

                <div className={styles.card}>
                    <h2>{t('paymentDetails')}</h2>
                    <p>
                        {t('card')}: XXXX XXXX XXXX {order.cardLastFour}
                    </p>
                </div>

            </div>

            <div className={styles.card}>
                <h2>{t('billingAddress')}</h2>

                <p>{order.billingAddress.name}</p>
                <p>{order.billingAddress.streetAddress}</p>
                <p>{order.billingAddress.city}</p>
                <p>{order.billingAddress.state}</p>
                <p>{order.billingAddress.zipCode}</p>
            </div>

            <div className={styles.card}>
                <h2>{t('purchasedProducts')}</h2>

                <div className={styles.products}>
                    {order.products.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <img src={product.img} alt={product.name} loading="lazy" width="300" height="200" />

                            <div>
                                <h4>{product.name}</h4>
                                <p>₹{product.price}</p>
                                <p>
                                    {t('quantity')}: {product.quantity}
                                </p>
                                <p>
                                    {t('subtotal')}: ₹{product.price * product.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.totalCard}>
                <h2>
                    {t('totalAmountPaid')}: ₹{order.totalAmount}
                </h2>
            </div>

            <div className={styles.buttonWrapper}>
                <Button variant="primary" onClick={() => navigate('/home')}>
                    {t('continueShopping')}
                </Button>
            </div>


        </div>

    )
}

export default OrderConfirmedPage