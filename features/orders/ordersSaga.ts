import { call, put, takeLatest, select } from 'redux-saga/effects';
import { productApi } from '../../api/productApi';
import { placeOrderRequest, placeOrderSuccess, placeOrderFailure } from './orderSlice';
import { clearCart } from '../cart/cartSlice';
import { Order } from '../../types';
import { RootState } from '../../store';

function* placeOrderWorker(): Generator<any, void, any> {
  try {
    const items = yield select((state: RootState) => state.cart.items);
    if (items.length === 0) {
      throw new Error('Cart is empty');
    }

    const order: Order = yield call(productApi.placeOrder, items);
    yield put(placeOrderSuccess(order));
    yield put(clearCart());
  } catch (error: any) {
    yield put(placeOrderFailure(error.message || 'Failed to place order'));
  }
}

export function* ordersSaga(): Generator<any, void, any> {
  yield takeLatest(placeOrderRequest.type, placeOrderWorker);
}

