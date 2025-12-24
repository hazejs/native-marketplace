import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters, PaginatedResponse } from '../../types';

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  filters: ProductFilters;
  hasMore: boolean;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  loading: false,
  refreshing: false,
  error: null,
  filters: {
    sortBy: 'newest',
  },
  hasMore: true,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state, action: PayloadAction<{ page: number; isRefresh?: boolean }>) => {
      state.loading = !action.payload.isRefresh;
      state.refreshing = !!action.payload.isRefresh;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<PaginatedResponse<Product> & { isRefresh?: boolean }>) => {
      state.loading = false;
      state.refreshing = false;
      state.items = action.payload.isRefresh 
        ? action.payload.data 
        : [...state.items, ...action.payload.data];
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.refreshing = false;
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.items = [];
    },
    fetchProductByIdRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { 
  fetchProductsRequest, 
  fetchProductsSuccess, 
  fetchProductsFailure, 
  setFilters,
  fetchProductByIdRequest,
  fetchProductByIdSuccess
} = productsSlice.actions;

export default productsSlice.reducer;

