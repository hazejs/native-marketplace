import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { productApi } from '../../api/productApi';
import { Product } from '../../types';
import { productsSaga } from './productsSaga';
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from './productsSlice';

describe('productsSaga', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Test description',
      price: 10,
      image: 'test.jpg',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 10,
      stock: 5,
      createdAt: new Date().toISOString(),
    },
  ];

  const mockResponse = {
    data: mockProducts,
    total: 1,
    page: 1,
    limit: 20,
    hasMore: false,
  };

  it('fetches products successfully', () => {
    return expectSaga(productsSaga)
      .withState({ products: { filters: {} } })
      .provide([[matchers.call.fn(productApi.fetchProducts), mockResponse]])
      .put(fetchProductsSuccess({ ...mockResponse, isRefresh: true }))
      .dispatch(fetchProductsRequest({ page: 1, isRefresh: true }))
      .run();
  });

  it('handles fetch products failure', () => {
    const error = new Error('Failed to fetch');
    return expectSaga(productsSaga)
      .withState({ products: { filters: {} } })
      .provide([
        [matchers.call.fn(productApi.fetchProducts), throwError(error)],
      ])
      .put(fetchProductsFailure('Failed to fetch'))
      .dispatch(fetchProductsRequest({ page: 1, isRefresh: true }))
      .run();
  });
});
