import { Product } from '../data/products';

export type FilterOptions = {
  type?: 'shop' | 'service';
  categoryId?: string;
  search?: string;
  sort?: 'default' | 'low' | 'high';
  saleOnly?: boolean;
};

function finalPrice(product: Product) {
  if (product.salePrice !== undefined) {
    return product.salePrice;
  }
  return product.price;
}

export function filterProducts(products: Product[], options: FilterOptions) {
  let result = products;

  if (options.type) {
    result = result.filter(item => item.type === options.type);
  }

  if (options.categoryId) {
    result = result.filter(item => item.categoryId === options.categoryId);
  }

  if (options.search) {
    const text = options.search.trim().toLowerCase();
    result = result.filter(
      item =>
        item.title.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text),
    );
  }

  if (options.saleOnly) {
    result = result.filter(item => item.salePrice !== undefined);
  }

  if (options.sort === 'low') {
    result = [...result].sort((a, b) => finalPrice(a) - finalPrice(b));
  }

  if (options.sort === 'high') {
    result = [...result].sort((a, b) => finalPrice(b) - finalPrice(a));
  }

  return result;
}
