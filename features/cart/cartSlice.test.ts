import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from './cartSlice';
import { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 100,
  description: 'Test Description',
  image: 'test.jpg',
  category: 'Electronics',
  rating: 4.5,
  reviewCount: 10,
  stock: 5,
  createdAt: new Date().toISOString(),
};

describe('cartSlice', () => {
  const initialState = { items: [] };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const actual = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 2 }));
    expect(actual.items.length).toBe(1);
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.items[0].id).toBe('1');
  });

  it('should increment quantity if item already in cart', () => {
    const stateWithItem = { items: [{ ...mockProduct, quantity: 1 }] };
    const actual = cartReducer(stateWithItem, addToCart({ product: mockProduct, quantity: 2 }));
    expect(actual.items.length).toBe(1);
    expect(actual.items[0].quantity).toBe(3);
  });

  it('should remove item from cart', () => {
    const stateWithItem = { items: [{ ...mockProduct, quantity: 1 }] };
    const actual = cartReducer(stateWithItem, removeFromCart('1'));
    expect(actual.items.length).toBe(0);
  });

  it('should update quantity', () => {
    const stateWithItem = { items: [{ ...mockProduct, quantity: 1 }] };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: '1', quantity: 5 }));
    expect(actual.items[0].quantity).toBe(5);
  });

  it('should remove item if quantity set to 0', () => {
    const stateWithItem = { items: [{ ...mockProduct, quantity: 1 }] };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: '1', quantity: 0 }));
    expect(actual.items.length).toBe(0);
  });

  it('should clear cart', () => {
    const stateWithItems = { items: [{ ...mockProduct, quantity: 1 }] };
    const actual = cartReducer(stateWithItems, clearCart());
    expect(actual.items.length).toBe(0);
  });
});

