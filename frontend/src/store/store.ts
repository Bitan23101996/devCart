import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        theme: themeReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;