import { MOCK_PRODUCTS } from './mockData';
import { Product, PaginatedResponse, ProductFilters, Order, CartItem } from '../types';

const DELAY = 500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productApi = {
  fetchProducts: async (
    page: number = 1,
    limit: number = 20,
    filters: ProductFilters = {}
  ): Promise<PaginatedResponse<Product>> => {
    await sleep(DELAY);

    let filtered = [...MOCK_PRODUCTS];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating_desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return {
      data,
      total: filtered.length,
      page,
      limit,
      hasMore: end < filtered.length,
    };
  },

  fetchProductById: async (id: string): Promise<Product | null> => {
    await sleep(DELAY);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  },

  placeOrder: async (items: CartItem[]): Promise<Order> => {
    await sleep(DELAY * 2);
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      id: `order-${Math.random().toString(36).substr(2, 9)}`,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  }
};

