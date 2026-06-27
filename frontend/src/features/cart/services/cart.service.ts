import api from '@/api/apiClient';
import { CartAddRemoveRequest, CartTypes, GetCartRequest } from '@/types/cart.types';

export const getCart = (payload: GetCartRequest) => api.post<CartTypes[], GetCartRequest>('/api/cart', payload);

export const addCartItem = (payload: CartAddRemoveRequest) => api.post<CartTypes[], CartAddRemoveRequest>('/api/cart/addCart', payload);

export const deleteCartItem = (payload: CartAddRemoveRequest) => api.post<CartTypes[], CartAddRemoveRequest>('/api/cart/deleteCart', payload);

export const clearCartItem = (payload: GetCartRequest) => api.post<CartTypes[], GetCartRequest>('/api/cart/clearCart', payload);
