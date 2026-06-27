import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStateTypes } from '@/types/order.types';

const initialState: OrderStateTypes = {
    userName: '',
    billingAddress: {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    },
    cardLastFour: '',
    products: [],
    totalAmount: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action: PayloadAction<OrderStateTypes>) {
            return action.payload;
        },
        resetOrder: () => initialState

    },
});

export const { setOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;