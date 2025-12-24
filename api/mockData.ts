import { Category, Product } from '../types';

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports', 'Books'];

const ADJECTIVES = ['Premium', 'Eco-friendly', 'Modern', 'Classic', 'Luxury', 'Essential', 'Pro', 'Smart'];
const NAMES = {
  Electronics: ['Smartphone', 'Laptop', 'Headphones', 'Camera', 'Watch', 'Tablet'],
  Clothing: ['T-shirt', 'Jeans', 'Jacket', 'Dress', 'Sneakers', 'Scarf'],
  Home: ['Lamp', 'Chair', 'Table', 'Blender', 'Vacuum', 'Rug'],
  Beauty: ['Serum', 'Lipstick', 'Perfume', 'Mask', 'Cream', 'Brush'],
  Sports: ['Mat', 'Dumbbell', 'Ball', 'Racket', 'Bottle', 'Bicycle'],
  Books: ['Novel', 'Biography', 'Cookbook', 'History', 'Sci-Fi', 'Mystery'],
};

export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    const categoryNames = NAMES[category];
    const name = `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${
      categoryNames[Math.floor(Math.random() * categoryNames.length)]
    } ${i + 1}`;
    
    return {
      id: `prod-${i + 1}`,
      name,
      description: `This is a high-quality ${name.toLowerCase()} designed for maximum efficiency and style. Perfect for everyday use.`,
      price: Math.floor(Math.random() * 950) + 50,
      image: `https://picsum.photos/seed/${i + 1}/400/400`,
      category,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviewCount: Math.floor(Math.random() * 500),
      stock: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    };
  });
};

export const MOCK_PRODUCTS = generateMockProducts(2000);

