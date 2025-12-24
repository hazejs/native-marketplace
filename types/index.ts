export type Category = 'Electronics' | 'Clothing' | 'Home' | 'Beauty' | 'Sports' | 'Books';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  reviewCount: number;
  stock: number;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export type SortOption = 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ProductFilters {
  search?: string;
  category?: Category;
  sortBy?: SortOption;
}

