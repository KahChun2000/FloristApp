const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export const products = [
  {
    id: 'p1',
    type: 'shop',
    categoryId: 'c1',
    category: 'Indoor Plants',
    title: 'Pilea Peperomioides in White Ceramic Pot',
    description,
    price: 100,
  },
  {
    id: 'p2',
    type: 'shop',
    categoryId: 'c1',
    category: 'Indoor Plants',
    title: 'Monstera Deliciosa Medium Size Plant',
    description,
    price: 100,
    salePrice: 50,
  },
  {
    id: 'p3',
    type: 'shop',
    categoryId: 'c2',
    category: 'Seedlings',
    title: 'Basil and Mint Seedling Starter Pack',
    description,
    price: 30,
  },
  {
    id: 'p4',
    type: 'shop',
    categoryId: 'c2',
    category: 'Seedlings',
    title: 'Cherry Tomato Seedlings Set of Six',
    description,
    price: 40,
    salePrice: 20,
  },
  {
    id: 'p5',
    type: 'shop',
    categoryId: 'c3',
    category: 'Pots',
    title: 'Handmade Terracotta Pot with Saucer',
    description,
    price: 60,
  },
  {
    id: 'p6',
    type: 'shop',
    categoryId: 'c4',
    category: 'Flowers',
    title: 'Fresh Sunflower Bouquet with Eucalyptus',
    description,
    price: 120,
    salePrice: 60,
  },
  {
    id: 'p7',
    type: 'shop',
    categoryId: 'c5',
    category: 'Garden Care',
    title: 'Copper Watering Can with Long Spout',
    description,
    price: 80,
  },
  {
    id: 'p8',
    type: 'shop',
    categoryId: 'c4',
    category: 'Flowers',
    title: 'Pink Rose and Lily Mixed Bouquet',
    description,
    price: 150,
    salePrice: 75,
  },
  {
    id: 's1',
    type: 'service',
    categoryId: 'c1',
    category: 'Indoor Plants',
    title: 'Indoor Plant Health Check at Home',
    description,
    price: 10,
  },
  {
    id: 's2',
    type: 'service',
    categoryId: 'c3',
    category: 'Pots',
    title: 'Repotting Service for Large Plants',
    description,
    price: 10,
  },
  {
    id: 's3',
    type: 'service',
    categoryId: 'c4',
    category: 'Flowers',
    title: 'Flower Arrangement Workshop for Beginners',
    description,
    price: 10,
  },
  {
    id: 's4',
    type: 'service',
    categoryId: 'c5',
    category: 'Garden Care',
    title: 'Balcony Garden Setup and Consultation',
    description,
    price: 10,
  },
];

export function getProduct(productId) {
  return products.find(item => item.id === productId);
}

export function formatPrice(value) {
  return 'RM ' + value.toFixed(2);
}
