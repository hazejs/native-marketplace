import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderHistory: Order[];
}

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null,
  orderHistory: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orderHistory.unshift(action.payload);
    },
    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetOrderState: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },
});

export const { placeOrderRequest, placeOrderSuccess, placeOrderFailure, resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;

