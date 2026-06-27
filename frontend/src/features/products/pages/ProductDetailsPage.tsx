import { AppDispatch, RootState } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../productSlice';
import Button from '@/components/common/ui/Button/Button';
import { addToCart } from '@/features/cart/cartSlice';
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';

import styles from './ProductHome.module.scss';


function ProductDetailsPage() {
  const { t } = useTranslation();

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await dispatch(addToCart({
        username: user?.userid ?? '',
        productId: selectedProduct.id,
      })
      ).unwrap();

      setIsAddedToCart(true);
      showSuccess(t('productAddedToCart'));
    } catch (err: any) {
      console.error(err);
      showError(err.message);
    }
  };

  return (
    <div className={styles.detailsPage}>
      {loading && (<p>Loading...</p>)}

      {/* {error && (<p>{error}</p>)} */}

      {!loading && !error && !selectedProduct && (
        <p>{t('productNotFound')}</p>
      )}

      {!loading && selectedProduct && (
        <div className={styles.detailsCard}>
          <img src={selectedProduct.img} alt={selectedProduct.name} loading="lazy" width="300" height="200" />
          <div className={styles.content}>

            <h1>{selectedProduct.name}</h1>
            <p className={styles.description}> {selectedProduct.description}</p>
            <h3 className={styles.price}> {t('price')}: ₹{selectedProduct.price}</h3>

            <Button variant='secondary' type="button" disabled={isAddedToCart} onClick={handleAddToCart}>
              {isAddedToCart ? t('addedToCart') : t('addToCart')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage
