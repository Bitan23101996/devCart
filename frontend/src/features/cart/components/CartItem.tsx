import React from 'react';
import styles from './CartItem.module.scss';
import { CartItemTypes } from '@/types/cart.types';
import Button from '@/components/common/ui/Button/Button';



const CartItem = ({ item, onIncrease, onDecrease }: CartItemTypes) => {
    return (
        <div className={styles.cartItem}>
            <img src={item.img} alt={item.name} className={styles.image} loading="lazy"  width="300" height="200" />

            <div className={styles.details}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
            </div>

            <div className={styles.quantity}>
                <Button type="button"  onClick={() => onDecrease(item.id)}>-</Button>
                <span>{item.quantity}</span>
                <Button type="button" onClick={() => onIncrease(item.id)} disabled={item.quantity >= 10}>+</Button>
            </div>

            <div className={styles.subTotal}>
                ₹{item.price * item.quantity}
            </div>
        </div>
    );
};

export default CartItem;