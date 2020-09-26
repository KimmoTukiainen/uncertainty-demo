import { useEffect, useState } from 'react';

import products from './products';
import { Product, ProductApiResult } from './useProducts';

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
  const [result, setResult] = useState<ProductApiResult>({
    loading: false,
  });

  useEffect(() => {
    setResult({ ...result, loading: true });
    const timer = setTimeout(() => {
      setResult({ ...result, products, loading: false });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (result.loading) {
    return {
      name: 'loading',
    };
  }

  if (result.products) {
    return {
      name: 'success',
      products: result.products.map(normalizeProduct) || [],
    };
  }

  return {
    name: 'failure',
    error: result.error || new Error('some error'),
  };
};
