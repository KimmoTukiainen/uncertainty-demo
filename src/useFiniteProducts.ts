import useFakeApiCall from './useFakeApiCall';
import productData from './products';

import { Product } from './useProducts';

const normalizeProduct = (product: Product): FiniteProduct => ({
  ...product,
  name: product.name,
  price: {
    amount: product.price?.amount ?? null,
    unit: product.price?.unit ?? '€',
  },
});

type FinitePrice = {
  amount: number | null;
  unit: string;
};

export type FiniteProduct = {
  name: string;
  price: FinitePrice;
};

type Success = {
  name: 'success';
  products: FiniteProduct[];
};

type Failure = {
  name: 'failure';
  error: Error;
};

type Loading = {
  name: 'loading';
};

export type FiniteApiResult = Success | Failure | Loading;

export default (): FiniteApiResult => {
  const { loading, result: products, error } = useFakeApiCall(productData);

  if (loading) {
    return {
      name: 'loading',
    };
  }

  if (products) {
    return {
      name: 'success',
      products: products.map(normalizeProduct),
    };
  }

  return {
    name: 'failure',
    error: error || new Error('No data received'),
  };
};
