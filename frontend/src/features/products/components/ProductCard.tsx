

import React from 'react';
import { ProductTypes } from '@/types/product.types';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/ui/Button/Button';
import { useTranslation } from 'react-i18next';

type ProductCardProps = {
    product: ProductTypes;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const shortDescription = product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description;

    return (
        <div className={styles.productCard}>

            <div className={styles.imageContainer}>
                <img
                    src={product.img}
                    alt={product.name}
                    className={styles.image}
                    loading="lazy"
                    width="300" height="200"
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    {product.name}
                </h3>

                <p className={styles.price}>
                    ₹{product.price}
                </p>

                <p className={styles.description}>
                    {shortDescription}
                </p>
                <Button
                    variant="primary"
                    type="button"
                    className={styles.button}
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    {t('showDetails')}
                </Button>
            </div>



        </div>
    );
};

export default ProductCard;