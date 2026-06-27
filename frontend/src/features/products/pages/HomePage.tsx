import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store/store';
import { clearError, fetchProducts, selectFilteredProducts, setCategory } from '../productSlice';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showError } from '@/utils/toast';

import styles from './ProductHome.module.scss';

const HomePage = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();

    const { category } = useParams();

    const products = useSelector(selectFilteredProducts);

    const { loading, error } = useSelector((state: RootState) => state.products);



    //Clear error message
    useEffect(() => {
        if (error) {
            showError(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    //Get Tab wise product
    useEffect(() => {
        dispatch(setCategory(category || 'home'));
    }, [category]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className={styles.productPage}>
            {
                products.length === 0 ? (
                    <p>{t('noProductFound')}</p>
                ) : (
                    <div className={styles.grid}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default HomePage;