import { products, formatPrice } from '../src/data/products';
import { filterProducts } from '../src/utils/filterProducts';

test('filters by type', () => {
  const result = filterProducts(products, { type: 'service' });
  expect(result.length).toBeGreaterThan(0);
  expect(result.every(item => item.type === 'service')).toBe(true);
});

test('filters by category', () => {
  const result = filterProducts(products, { categoryId: 'c1' });
  expect(result.length).toBeGreaterThan(0);
  expect(result.every(item => item.categoryId === 'c1')).toBe(true);
});

test('search is case-insensitive on title and category', () => {
  const first = products[0];
  const byTitle = filterProducts(products, {
    search: first.title.toUpperCase(),
  });
  expect(byTitle.map(item => item.id)).toContain(first.id);
  const byCategory = filterProducts(products, {
    search: first.category.toLowerCase(),
  });
  expect(byCategory.map(item => item.id)).toContain(first.id);
});

test('search with no match returns an empty list', () => {
  expect(filterProducts(products, { search: 'zzzz' })).toEqual([]);
});

test('saleOnly keeps only items with a sale price', () => {
  const result = filterProducts(products, { saleOnly: true });
  expect(result.length).toBeGreaterThan(0);
  expect(result.every(item => item.salePrice !== undefined)).toBe(true);
});

test('sort low uses the sale price', () => {
  const list = [
    { ...products[0], id: 'a', price: 100, salePrice: 20 },
    { ...products[0], id: 'b', price: 50, salePrice: undefined },
  ];
  const result = filterProducts(list, { sort: 'low' });
  expect(result.map(item => item.id)).toEqual(['a', 'b']);
});

test('sort high puts the most expensive first', () => {
  const list = [
    { ...products[0], id: 'a', price: 10, salePrice: undefined },
    { ...products[0], id: 'b', price: 50, salePrice: undefined },
  ];
  const result = filterProducts(list, { sort: 'high' });
  expect(result.map(item => item.id)).toEqual(['b', 'a']);
});

test('formatPrice shows RM with two decimals', () => {
  expect(formatPrice(10)).toBe('RM 10.00');
});
