import { useEffect, useState } from 'react';

import products from './products';

export type Price = {
  amount: number | null;
  unit?: string;
};

export type Product = {
  name: string;
  price?: Price;
};

export type ProductApiResult = {
  loading: boolean;
  error?: Error;
  products?: Product[];
};

export default (): ProductApiResult => {
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

  return result;
};
