import { all, fork } from 'redux-saga/effects';
import { productsSaga } from '../features/products/productsSaga';
import { ordersSaga } from '../features/orders/ordersSaga';

export default function* rootSaga() {
  yield all([
    fork(productsSaga),
    fork(ordersSaga),
  ]);
}

