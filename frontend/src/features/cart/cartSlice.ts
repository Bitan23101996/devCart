import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addCartItem, deleteCartItem, clearCartItem } from './services/cart.service';

import { CartAddRemoveRequest, CartState, GetCartRequest } from '@/types/cart.types';

const initialState: CartState = {
    items: [],
    loading: false,
    error: null
};

//Fetch Cart Thunk
export const fetchCart = createAsyncThunk(
    'cart/fetch',
    async (payload: GetCartRequest) => {
        return await getCart(payload);
    }
);

//Add Cart Thunk
export const addToCart = createAsyncThunk(
    'cart/add',
    async (payload: CartAddRemoveRequest) => {
        return await addCartItem(payload);
    }
);

//Remove Cart Thunk
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (payload: CartAddRemoveRequest) => {
        return await deleteCartItem(payload);
    }
);

//Clear Cart Thunk
export const clearFromCart = createAsyncThunk(
    'cart/clear',
    async (payload: GetCartRequest) => {
        return await clearCartItem(payload);
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: builder => {
        builder

            // FETCH CART
            .addCase(fetchCart.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch from cart';
            })


            // Add CART
            .addCase(addToCart.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add to cart';
            })


            // Remove CART
            .addCase(removeFromCart.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to remove from cart';
            })

            //Clear CART
            .addCase(clearFromCart.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(clearFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })

            .addCase(clearFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to clear the cart';
            })
    },
});

export default cartSlice.reducer;
export const { clearCart, clearError } = cartSlice.actions;