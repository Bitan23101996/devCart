import Input from '@/components/common/ui/Input/Input';
import { BillingFormTypes } from '@/types/payment.types';
import { useTranslation } from 'react-i18next';
import styles from './PaymentStyle.module.scss';
import Select from '@/components/common/ui/Select/Select';

function BillingForm({ formData, errors, onChange }: BillingFormTypes) {
    const { t } = useTranslation();
    const cityList = [
        { label: t('selectCity'), value: '' },
        { label: 'Kolkata', value: 'Kolkata' },
        { label: 'Howrah', value: 'Howrah' },
        { label: 'Durgapur', value: 'Durgapur' },
        { label: 'Asansol', value: 'Asansol' },
        { label: 'Siliguri', value: 'Siliguri' },
        { label: 'Kharagpur', value: 'Kharagpur' },
        { label: 'Bardhaman', value: 'Bardhaman' },
        { label: 'Malda', value: 'Malda' },
        { label: 'Haldia', value: 'Haldia' },
        { label: 'Darjeeling', value: 'Darjeeling' }
    ]

    const stateList = [
        { label: t('selectState'), value: '' },
        { label: 'West Bengal', value: 'West Bengal' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Karnataka', value: 'Karnataka' },
        { label: 'Tamil Nadu', value: 'Tamil Nadu' },
        { label: 'Delhi', value: 'Delhi' }
    ]
    return (
        <>
            <h2>{t('billingAddress')}</h2>

            <Input
                id='name'
                label={t('name')}
                placeholder={t('name')}
                value={formData.name}
                onChange={e => onChange('name', e.target.value)}
                error={errors.name}
                maxLength={50}
                required
            />

            <div className={styles.row}>

                <Input
                    id='streetAddress'
                    label={t('streetAddress')}
                    placeholder={t('streetAddress')}
                    value={formData.streetAddress}
                    onChange={e => onChange('streetAddress', e.target.value)
                    }
                    error={errors.streetAddress}
                    maxLength={100}
                    required
                />

                {/*  <Input
                    label={t('city')}
                    placeholder={t('city')}
                    value={formData.city}
                    onChange={e => onChange('city', e.target.value)}
                    error={errors.city}
                    maxLength={50}
                    required
                /> */}

                <Select label={t('city')}
                    value={formData.city}
                    onChange={e => onChange('city', e.target.value)}
                    error={errors.city}
                    required
                    options={cityList} />
            </div>

            <div className={styles.row}>

                {/* <Input
                    label={t('state')}
                    placeholder={t('state')}
                    value={formData.state}
                    onChange={e => onChange('state', e.target.value)}
                    error={errors.state}
                    maxLength={50}
                    required
                /> */}
                <Select label={t('state')}
                    value={formData.state}
                    onChange={e => onChange('state', e.target.value)}
                    error={errors.state}
                    required
                    options={stateList} />

                <Input
                    id='zipCode'
                    label={t('zipCode')}
                    placeholder={t('zipCode')}
                    value={formData.zipCode}
                    onChange={e => onChange('zipCode', e.target.value)}
                    error={errors.zipCode}
                    maxLength={6}
                    required
                />
            </div>
        </>
    );
}

export default BillingForm;