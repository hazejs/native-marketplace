import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { productApi } from '../../api/productApi';
import { RootState } from '../../store';
import { PaginatedResponse, Product } from '../../types';
import {
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from './productsSlice';

function* fetchProductsWorker(
  action: PayloadAction<{ page: number; isRefresh?: boolean }>
): Generator<any, void, any> {
  try {
    const { page, isRefresh } = action.payload;
    const filters = yield select((state: RootState) => state.products.filters);

    const response: PaginatedResponse<Product> = yield call(
      productApi.fetchProducts,
      page,
      20,
      filters
    );

    yield put(fetchProductsSuccess({ ...response, isRefresh }));
  } catch (error: any) {
    yield put(
      fetchProductsFailure(error.message || 'Failed to fetch products')
    );
  }
}

function* fetchProductByIdWorker(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const product: Product | null = yield call(
      productApi.fetchProductById,
      action.payload
    );
    if (product) {
      yield put(fetchProductByIdSuccess(product));
    } else {
      yield put(fetchProductsFailure('Product not found'));
    }
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch product'));
  }
}

export function* productsSaga(): Generator<any, void, any> {
  yield takeLatest(fetchProductsRequest.type, fetchProductsWorker);
  yield takeLatest(fetchProductByIdRequest.type, fetchProductByIdWorker);
}
