import React from 'react'
import styles from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchText } from '@/features/products/productSlice';
import Input from '@/components/common/ui/Input/Input';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value));
    };
    return (
        <Input type='text' className={styles.search} placeholder={t('search')} maxLength={40} onChange={handleChange} />
    )
}

export default SearchBar;