import React from 'react'
import { PaymentFormTypes } from '@/types/payment.types'
import Input from '@/components/common/ui/Input/Input'
import { useTranslation } from 'react-i18next';

import styles from './PaymentStyle.module.scss';

function PaymentForm({ formData, errors, onChange }: PaymentFormTypes) {
    const { t } = useTranslation();

    return (
        <>
            <h2>{t('cardDetails')}</h2>

            <Input
                id='cardholderName'
                label={t('cardholderName')}
                placeholder={t('cardholderName')}
                value={formData.cardholderName}
                onChange={e => onChange('cardholderName', e.target.value)}
                error={errors.cardholderName}
                maxLength={50}
                required
            />

            <Input
                id='cardNumber'
                label={t('cardNumber')}
                placeholder={t('cardNumber')}
                value={formData.cardNumber}
                onChange={e => onChange('cardNumber', e.target.value)
                }
                error={errors.cardNumber}
                maxLength={16}
                required
            />
            <div className={styles.row}>

                <Input
                    id="expiryDate"
                    label={t('expiryDate')}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={e => onChange('expiryDate', e.target.value)}
                    error={errors.expiryDate}
                    maxLength={5}
                    required
                />

                <Input
                    id='cvv'
                    label={t('cvv')}
                    placeholder={t('cvv')}
                    type="password"
                    value={formData.cvv}
                    onChange={e => onChange('cvv', e.target.value)}
                    error={errors.cvv}
                    maxLength={3}
                    required
                />
            </div>
        </>
    )
}

export default PaymentForm